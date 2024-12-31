export interface ClientRegistryForm {
  clientIDForm: ClientIDForm;
  fileUpload: FileList;
}

export interface ClientIDForm {
  FileNumber: string;
  SecurityKey: string;
  No_of_floors: number;
  Built_Up_Area: number;
  Net_Plot_Area: number;
  Parking_Area: number;
  No_of_Dwelling_Units: number;
  Height_of_the_Building: number;
}
