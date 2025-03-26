import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

interface StepperProps {
  currentStep: number;
  steps: any;
}

const StepperComponent = (props: StepperProps) => {
  const { currentStep, steps } = props;
  return (
    <Stepper activeStep={currentStep - 1} alternativeLabel>
      {steps.map((label: string) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;
