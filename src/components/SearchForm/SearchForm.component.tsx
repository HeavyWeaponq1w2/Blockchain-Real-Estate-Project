import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ethers } from "ethers";
import ClientRegistryArtifact from "../../assets/ClientRegistry.json";
import DeploymentAddress from "../../assets/deploymentAddress.json";
import { ClientLandDetails } from "@/types/ClientRegistry.type";
import { useToast } from "../ui/use-toast";

type Inputs = {
  FileNumber: string;
  SecurityKey: string;
};

const SearchForm = (props: {
  updater: (clientLandDetails: ClientLandDetails, fileNumber: string) => void;
}) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const address = DeploymentAddress.deploymentAddress;
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!window.ethereum) {
      console.log("Metamask not found");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      address,
      ClientRegistryArtifact.abi,
      signer
    );

    try {
      console.log("here");
      console.log(data);
      const result = await contract.getClientLandDetails(
        data.FileNumber,
        data.SecurityKey
      );

      console.log(result);

      Object.keys(result).forEach((key) => {
        if (result[key] === "") throw "Incorrect data";
      });

      props.updater(
        {
          No_of_floors: Number(result[0]),
          Built_Up_Area: Number(result[1]),
          Net_Plot_Area: Number(result[2]),
          Parking_Area: Number(result[3]),
          No_of_Dwelling_Units: Number(result[4]),
          Height_of_the_Building: Number(result[5]),
          FileUpload: result[6],
          SecurityKey: data.SecurityKey,
        },
        data.FileNumber
      );
    } catch (error) {
      console.error("Error calling getClientID:", error);
      toast({ title: "Data not found" });
    }
  };

  return (
    <>
      <h3 className="mb-6 text-lg font-bold text-green-500 text-left">
        DCR Details
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-end">
        <div className="space-y-2">
          <Label>File Number</Label>
          <Input {...register("FileNumber")} />
        </div>
        <div className="space-y-2">
          <Label>Security Key</Label>
          <Input {...register("SecurityKey")} />
        </div>
        <Button className="bg-green-500 space-y-2">Get Info</Button>
      </form>
    </>
  );
};

export default SearchForm;
