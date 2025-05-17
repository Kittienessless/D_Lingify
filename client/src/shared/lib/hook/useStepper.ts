import { useContext } from "react";
import {StepperContext} from '../../ui/stepper/ui/StepperContext.tsx'


export interface IStepperContext<T, S> {
  activeStep: number;
  setActiveStep: (newStep: number) => void;
  navigateTo: (id: IStep<S>["label"]) => void;
  handleSetData: (partial: Partial<T>) => void;
  data: T;
  steps: IStep<S>[];
}
export interface IStep<S> {
  label: S;
  content: React.ReactNode;
}

export const useStepper = <T, S>(): IStepperContext<T, S> => {
  const context = useContext(StepperContext);
  if (context === undefined) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};