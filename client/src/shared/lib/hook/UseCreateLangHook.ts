import { useStepper } from "./useStepper.ts";

export interface DataType {
  title: string;
  description: string | null;
  author: string;
}

export type StepType = 
| "Introduction"
| "LangInfo"
|"CreateLangNeural"
| "Confirmation";

export const UseCreateLangHook = () => useStepper<DataType, StepType>();
