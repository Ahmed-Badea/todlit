export interface FieldConfig {
  [x: string]: undefined;
  name: string;
  type: "text" | "date" | "dropdown" | "multi-dropdown" | "color" | "time";
  value: string | Date;
  errorMsg: string;
  label?: { en: string; ar: string };
  validations?: ((value: string | Date) => string | undefined)[];
  options?: { label: { en: string; ar: string }; value: string }[];
  selectedColor?: string;
}

export interface IField {
  value?: string | string[] | Date;
  isValid?: boolean;
  errorMsg: string;
  validations: {
    pattern: RegExp;
    error_msg: string;
  }[];
}



export interface Fields {
  [key: string]: Field;
}

export interface DynamicFormProps {
  fieldsConfig: FieldConfig[];
  mode: 'popup' | 'table';
  setFormValid: (valid: boolean) => void;
  isLoading: boolean;
  setServerErrMsg: (msg: string) => void;
  isEditable?: boolean;
  params?: Record<string, any>;
}

export interface FormWrapperProps {
  fieldsConfig: FieldConfig[];
  submitFn: (data: any) => Promise<any>;
  successMessage: string;
  mode?: "popup" | "table";
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  isFormValid?: boolean;
  params?: Record<string, any>;
}

export interface CustomFormRef {
  // Add existing properties here
  submitForm: () => any; // Define the return type of submitForm appropriately
}
