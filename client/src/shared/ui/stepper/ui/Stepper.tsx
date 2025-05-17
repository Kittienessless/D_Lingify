 import { useStepper } from "shared/lib/hook/useStepper";
import styled from "styled-components";
import { StepperWrapper } from "./StepperWrapper";
import { Divider } from "shared/ui/divider";

 
export const Stepper = <T, S extends string>() => {
  const { activeStep, steps } = useStepper<T, S>();

  return (
    <div>
      <StepperWrapper numberOfSteps={steps.length -1} currentStep={activeStep} />
     
      <div>{steps[activeStep]?.content}</div>
    </div>
  );
};
