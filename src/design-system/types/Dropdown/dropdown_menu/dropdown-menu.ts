import { ChangeEventHandler, ReactNode, RefObject } from "react";

export interface IDropdownMenuInternalProps {
  closeDropdown?: () => void,
  isOpen?: boolean,
  dropdownRef?: RefObject<HTMLDivElement>
};

interface IDropdownMenuShared {
  children?: ReactNode,
  open?: boolean,
  horizontalPlacement?: 'start' | 'end' | 'center' | 'auto' | 'inline_start' | 'inline_end' | 'inline_auto',
  verticalPlacement?: 'top' | 'bottom' | 'auto',
  width?: 'full' | 'fit-content' | string,
  maxHeight?: 'fit-content' | string,
  onToggleHandler?: (open: boolean) => void
};

export interface IDefaultDropdownMenu {
  type?: 'default'
};

export interface IAccountDropdownMenu {
  type?: 'account',
  avatarType?: 'img' | 'text' | 'placeholder',
  userName?: string,
  userShortName?: string,
  role?: string,
  imgUrl?: string,
};

export interface IFilterFieldDropdownMenu {
  lang?: 'en' | 'ar',
  fieldName: string,
  placeholder?: string,
  applyBtnText?: string,
  onApplyHandler?: (value: string) => void,
  errorMsg?: string
};

export interface ITextFieldDropdownMenu extends IFilterFieldDropdownMenu {
  type?: 'text_field',
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>
};

export interface IPhoneFieldDropdownMenu extends IFilterFieldDropdownMenu {
  type?: 'phone_field',
  onCountryChange?: (country: string) => void,
  onChangeHandler?: (phone: string) => void,
  defaultCountry?: string
};

export interface ICheckboxesDropdownMenu {
  type?: 'checkboxes',
  lang?: 'en' | 'ar',
  applyBtnText?: string,
  onApplyHandler?: () => void,
  applyBtnDisabled?: boolean
};

export type IDropdownMenu = IDropdownMenuShared & (
  IDefaultDropdownMenu |
  IAccountDropdownMenu |
  ITextFieldDropdownMenu |
  IPhoneFieldDropdownMenu |
  ICheckboxesDropdownMenu
);