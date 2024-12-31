import { modifyString } from "@/lib/utils";
import { ClientLandDetails } from "@/types/ClientRegistry.type";
import DetailForm from "./DetailForm.component";
import { Button } from "../ui/button";

const Details = (props: {
  clientLandDetails: ClientLandDetails;
  fileNumber: string;
}) => {
  function downloadFile() {
    window.open(props.clientLandDetails.FileUpload, "_blank")?.focus();
  }

  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-green-500 text-left">
        Project Info
      </h3>
      <div className="grid grid-cols-2 gap-x-12">
        {Object.keys(props.clientLandDetails).map((key) => (
          <div className="flex justify-between">
            <p>{modifyString(key)}</p>
            {key !== "FileUpload" && (
              <p className="font-bold">
                {props.clientLandDetails[key as keyof ClientLandDetails]}
              </p>
            )}
            {key === "FileUpload" && (
              <Button onClick={() => downloadFile()}>Download File</Button>
            )}
          </div>
        ))}
      </div>
      <h3 className="my-6 text-lg font-bold text-green-500 text-left">
        Applicant Info
      </h3>
      <DetailForm fileNumber={props.fileNumber} />
    </div>
  );
};

export default Details;
