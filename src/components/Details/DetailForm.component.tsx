import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";

type DetailInputs = {
  ownerName: string;
  representedBy: string;
  address: string;
  email: string;
  aadharID: string;
  relationship: {
    relative: string;
    relation: string;
  };
  pinCode: string;
  mobileNumber: string;
};

const DetailForm = (props: { fileNumber: string }) => {
  const { register, handleSubmit, reset } = useForm<DetailInputs>();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<DetailInputs> = (data) => {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(props.fileNumber, serializedData);
    toast({ title: "Updated data" });
  };

  const loadFromLocal = () => {
    const serializedData = localStorage.getItem(props.fileNumber);
    if (!serializedData) return;

    const data = JSON.parse(serializedData) as DetailInputs;
    toast({ title: "Loaded from storage" });

    reset(data);
  };

  useEffect(() => {
    loadFromLocal();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-x-10"
    >
      <div className="space-y-2 text-left">
        <Label>Owner Name</Label>
        <Input {...register("ownerName")} />
      </div>
      <div className="space-y-2 text-left">
        <Label>Represented By</Label>
        <Input {...register("representedBy")} />
      </div>
      <div className="space-y-2 text-left">
        <Label>Address</Label>
        <Input {...register("address")} />
      </div>
      <div className="space-y-2 text-left">
        <Label>Email</Label>
        <Input {...register("email")} />
      </div>
      <div className="space-y-2 text-left">
        <Label>Aadhar ID</Label>
        <Input {...register("aadharID")} />
      </div>
      <div className="space-y-2 text-left">
        <Label>Relationship</Label>
        <div className="flex">
          <select {...register("relationship.relation")}>
            <option value="s/O">s/O</option>
            <option value="w/O">w/O</option>
          </select>

          <Input {...register("relationship.relative")} />
        </div>
      </div>
      <div className="space-y-2 text-left">
        <Label>Pin Code</Label>
        <Input {...register("pinCode")} />
      </div>
      <div className="space-y-2 text-left">
        <Label>Mobile Number</Label>
        <Input {...register("mobileNumber")} />
      </div>
      <Button type="submit" className="mt-6">
        Submit
      </Button>
    </form>
  );
};

export default DetailForm;
