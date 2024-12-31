import { ethers } from "ethers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ClientRegistryArtifact from "../assets/ClientRegistry.json";
import DeploymentAddress from "../assets/deploymentAddress.json";
import "../App.css";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Toaster } from "../components/ui/toaster";
import {
  ClientIDForm,
  ClientRegistryForm,
} from "../types/ClientRegistryForm.type";
import { Button } from "../components/ui/button";
import { modifyString } from "@/lib/utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

function Admin() {
  const deployAddress = DeploymentAddress.deploymentAddress;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientRegistryForm>();

  const { toast } = useToast();

  // async function TestGet() {
  //   if (!window.ethereum) {
  //     console.log("Metamask not found");
  //     return;
  //   }

  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const signer = await provider.getSigner();

  //   const contract = new ethers.Contract(
  //     test,
  //     ClientRegistryArtifact.abi,
  //     signer
  //   );

  //   try {
  //     const result = await contract.getClientLandDetails("File231", "Testkey4");

  //     console.log("Raw result:", result);
  //   } catch (error) {
  //     console.error("Error calling getClientID:", error);
  //   }
  // }

  type FieldConfig = {
    name: string;
    label: string;
    type: string;
  };

  const createFieldConfigs = (obj: any, prefix = ""): FieldConfig[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        return createFieldConfigs(value, fullKey);
      }
      return {
        name: fullKey,
        label: key.replace(/([A-Z])/g, " $1").trim(),
        type: typeof value === "number" ? "number" : "text",
      };
    });
  };

  const fieldConfigs = [
    createFieldConfigs({
      clientIDForm: {
        FileNumber: "",
        SecurityKey: "",
        No_of_floors: 0,
        Built_Up_Area: 0,
        Net_Plot_Area: 0,
        Parking_Area: 0,
        No_of_Dwelling_Units: 0,
        Height_of_the_Building: 0,
      } as ClientIDForm,
    }),
  ];

  const onSubmit = async (data: ClientRegistryForm) => {
    try {
      const storageRef = ref(
        storage,
        `files/${new Date().getTime()}-${data.fileUpload[0].name}`
      );
      const uploadTask = await uploadBytesResumable(
        storageRef,
        data.fileUpload[0]
      );
      const fileURL = await getDownloadURL(uploadTask.ref);

      if (!window.ethereum) {
        console.log("Metamask not found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // const { gasPrice } = await provider.getFeeData();

      const iface = new ethers.Interface(ClientRegistryArtifact.abi);

      console.log(iface);

      const contract = new ethers.Contract(
        deployAddress,
        ClientRegistryArtifact.abi,
        signer
      );

      const tx1 = await contract.addClientLandDetails(
        data.clientIDForm.FileNumber,
        data.clientIDForm.SecurityKey,
        data.clientIDForm.No_of_floors,
        data.clientIDForm.Built_Up_Area,
        data.clientIDForm.Net_Plot_Area,
        data.clientIDForm.Parking_Area,
        data.clientIDForm.No_of_Dwelling_Units,
        data.clientIDForm.Height_of_the_Building,
        fileURL
      );
      console.log(data.clientIDForm);

      await tx1.wait();
      console.log(tx1);
      toast({ title: "Transaction successful" });
    } catch (error) {
      console.log(error);
      toast({ title: "File Number already in use" });
    }
  };

  useEffect(() => {
    console.log("This is your deployment address: " + deployAddress);
  });

  return (
    <>
      <Toaster />
      <div className="mt-5">
        {/* <button onClick={() => TestGet()}>Test</button> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {fieldConfigs.map((fieldConfig) => (
            <div className="mb-5">
              <h3 className="mb-3 text-lg font-bold">Client Details</h3>
              <div className="grid grid-cols-2 gap-3">
                {fieldConfig.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>
                      {modifyString(field.label)}
                    </Label>
                    <Input
                      id={field.name}
                      type={field.type}
                      {...register(field.name as any)}
                    />
                    {errors[field.name as keyof ClientRegistryForm] && (
                      <p className="text-red-500 text-sm">
                        This field is required
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Input type="file" {...register("fileUpload")} />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default Admin;
