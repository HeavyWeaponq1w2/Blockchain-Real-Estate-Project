import Details from "@/components/Details/Details.component";
import SearchForm from "@/components/SearchForm/SearchForm.component";
import { Toaster } from "@/components/ui/toaster";
import { ClientLandDetails } from "@/types/ClientRegistry.type";
import { useEffect, useState } from "react";

const Index = () => {
  const [clientRegistry, setClientRegistry] = useState<
    ClientLandDetails | undefined
  >(undefined);
  const [fileNumber, setFileNumber] = useState("");

  const updateData = (
    clientLandDetails: ClientLandDetails,
    fileNumber: string
  ) => {
    setClientRegistry(clientLandDetails);
    setFileNumber(fileNumber);
  };

  useEffect(() => {
    console.log(fileNumber);
  }, [fileNumber]);

  return (
    <div>
      <Toaster />
      {clientRegistry ? (
        <Details clientLandDetails={clientRegistry} fileNumber={fileNumber} />
      ) : (
        <SearchForm updater={updateData} />
      )}
    </div>
  );
};
export default Index;
