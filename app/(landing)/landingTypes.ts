export type Feature = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  sequence: number;
  createdAt: Date;
};

export type FeatureProps = {
  features: Feature[];
};

export type Step = {
  id: string;
  step: string;
  sequence: number;
};

export interface StepProps {
  steps: Step[];
}
