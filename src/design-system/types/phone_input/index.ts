import { FocusEventHandler, Ref } from 'react';

export interface IPhoneInputProps {
  id?: string;
  name: string;
  label?: string;
  labelHint?: string;
  defaultPhoneNumber?: string;
  onChangeHandler: (phone: string) => void;
  onCountryChange?: (code: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: string;
  defaultCountry?: string;
  disableSelectCountry?: boolean;
  canToggleToTextInput?: boolean
}

export interface ICountries {
  [key: string]: ICountry;
}

export interface ICountry {
  name: string;
  countryIso2: string;
  countryIso3: string;
  countryCode: string;
  phoneLength: number;
  icon: JSX.Element;
}
