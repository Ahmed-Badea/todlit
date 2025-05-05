export type TFieldType = 'text' | 'dropdown' | 'date' | 'select'; // Adjust types as needed

export interface IFieldConfig {
  name: string;
  label: { en: string; ar: string };
  type: TFieldType;
  value: any;
  isValid: boolean | null;
  errorMsg: string;
  validations?: ((value: string | Date) => string | undefined)[];
  options?: { label: { en: string; ar: string }; value: string }[];
  selectedColor?: string;
}

export interface IField {
  value?: string | string[] | Date;
  isValid?: boolean;
  errorMsg: string;
  validations?: ((value: string | Date) => string | undefined)[];

}

export interface IFields {
  [key: string]: IField;
}

export interface DynamicFormProps {
  fieldsConfig: IFieldConfig[];
  mode: 'popup' | 'table';
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
