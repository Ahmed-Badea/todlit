export interface IFieldConfig {
  name: string;
  label: { en: string; ar: string };
  type: string;
  value: any;
  isValid: boolean | undefined;
  errorMsg: string;
  validations: { pattern: RegExp; error_msg: string; }[];
  options?: { label: { en: string; ar: string }; value: string }[];
  selectedColor?: string;
  allowedFormats?: string[];
  allowedSize?: number;
  optional?: boolean;
  multiple?: boolean;
}

export interface IField {
  value?: string | string[] ;
  isValid?: boolean;
  errorMsg: string;
  validations: { pattern: RegExp; error_msg: string; }[];
}


export interface IFields {
  [key: string]: IField;
}

export interface DynamicFormProps {
  fieldsConfig: IFieldConfig[];
  mode: 'popup' | 'table' | 'normal';
  setFormValid: (valid: boolean) => void;
  isLoading: boolean;
  setServerErrMsg: (msg: string) => void;
  isEditable?: boolean;
  params?: Record<string, any>;
}

export interface FormWrapperProps {
  fieldsConfig: IFieldConfig[];
  submitFn: (data: any) => Promise<any>;
  successMessage: string;
  mode?: "popup" | "table" | "normal";
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
