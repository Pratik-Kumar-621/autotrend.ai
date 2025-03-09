export interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  error: string;
}

export interface AdminDetailsProps {
  onLogout: () => void;
}

export type FeatureInput = {
  title: string;
  description: string;
  image: string | null;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: Date;
};

export interface FeaturesProps {
  features: Feature[];
  loading: boolean;
  onAdd: (feature: FeatureInput) => Promise<void>;
  onEdit: (id: string, feature: FeatureInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export interface FeatureForm {
  title: string;
  description: string;
  image: string | null;
}

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export interface StepsProps {
  steps: Step[];
  loading: boolean;
  onAdd: (step: Omit<Step, "id">) => Promise<void>;
  onEdit: (id: string, step: Omit<Step, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export interface StepForm {
  step: string;
}

export type Step = {
  id: string;
  step: string;
};
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
