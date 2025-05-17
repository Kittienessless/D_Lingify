import { documentType } from "entities/documentType";
export interface file  {
  title: string;
  type : documentType;
  size: number;
  path: string;

  }