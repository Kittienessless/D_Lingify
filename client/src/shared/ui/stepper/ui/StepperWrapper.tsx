import styled from "styled-components";
import React from "react";
import { centerContent } from "shared/lib/centerContent";
import { transition } from "shared/lib/transition";

const Container = styled.div`
  ${centerContent};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.bg};
   
`;
const Round = styled.div`
  border-radius: 100%;
  background-color: rgb(173, 173, 173);
  width: 24px;
  height: 24px;
  &.active {
    background-color: #0091ff;
  };
  ${transition};
`;
const Line = styled.span`
  height: 0.12em;
  width: 10em;
  margin: auto 0.6em;
  background-color: rgb(173, 173, 173);
  &.active {
    background-color: #0091ff;
  };
  ${transition};
`;

interface StProps {
  currentStep: number;
  numberOfSteps: number;
}

export const StepperWrapper = ({ currentStep, numberOfSteps }: StProps) => {
  const isFinalStep = (index: number) => index === numberOfSteps - 1;
  console.log(currentStep);
  return (
    <Container>
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <Round className={currentStep === index ? `active` : ""}></Round>
          <Line className={currentStep === index ? `active` : ""}></Line>
          {isFinalStep(index) && (
            <Round
              className={currentStep === index + 1 ? `active` : ""}
            ></Round>
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};
