export interface FieldConfig {
  name: string;
  type: "text" | "date" | "dropdown";
  value: string | Date;
  errorMsg: string;
  label?: { en: string; ar: string };
  validations?: ((value: string | Date) => string | undefined)[];
  options?: { label: { en: string; ar: string }; value: string }[];
}

export interface Field {
  value: string | Date;
  isValid: boolean | undefined;
  errorMsg: string;
  validations: ((value: string | Date) => string | undefined)[];
}

export interface Fields {
  [key: string]: Field;
}

export interface DynamicFormProps {
  fieldsConfig: FieldConfig[];
  lang: 'en' | 'ar';
  mode: 'popup' | 'table';
  setFormValid: (valid: boolean) => void;
  isLoading: boolean;
  setServerErrMsg: (msg: string) => void;
  isEditable?: boolean;
  params?: Record<string, any>;
}

export interface FormWrapperProps {
  lang: "en" | "ar";
  fieldsConfig: FieldConfig[];
  submitFn: (data: any) => Promise<any>; // Function for form submission (POST/PUT)
  successMessage: string; // Success message to display,
  mode?: "popup" | "table";
  title?: string; // Title for the popup
  isOpen?: boolean; // Controls popup visibility
  isEditable?: boolean; // Determines if the form is for editing
  isFormValid?: boolean; // Pass form validity to FormWrapper
}
