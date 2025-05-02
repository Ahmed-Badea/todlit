import { FocusEventHandler, Ref, ChangeEvent } from 'react';

export interface IRadioButton {
  id?: string;
  name: string;
  value: string;
  text: string;
  hint?: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'outlined';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  ref?: Ref<HTMLInputElement>;
}
