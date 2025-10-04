import type { ChangeEvent } from "react";

export interface ITextArea {
  name?: string;
  lang?: 'en' | 'ar';
  variant?: 'default' | 'success' | 'warning' | 'error';
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  label?: string;
  optionalText?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  helperText?: string;
  errorMessage?: string;
  showCharactersCount?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}