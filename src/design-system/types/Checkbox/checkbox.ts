import { ChangeEventHandler, FocusEventHandler, ReactNode, Ref } from 'react';

export interface ICheckbox {
  id?: string;
  name: string;
  text: string;
  hint?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
  checked?: boolean;
  variant?: 'default' | 'outlined';
}
