import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, ReactNode, Ref } from 'react';

export interface ITagsInput {
  tags?: string[];
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  tagValidator?: (tag: string) => boolean;
  maxTags?: number;
  allowDuplicates?: boolean;
  tagDelimiters?: string[];
  placeholder?: string;
  disabled?: boolean;
  showAddButton?: boolean;
  addButtonIcon?: ReactNode;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface IInput {
  id?: string;
  name: string;
  value?: string | string[];
  label?: string;
  labelText?: string;
  hintText?: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  status?: 'default' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  autoFocus?: boolean;
  leadingIcon?: ReactNode;
  rules?: { label: string; pattern: RegExp }[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  forgetPasswordHandler?: MouseEventHandler;
  forgetPasswordText?: string;
  ref?: Ref<HTMLInputElement>;
  error?: string;
  extra?: ReactNode;
  preventAutoComplete?: boolean;
  isEditable?: boolean;
}
