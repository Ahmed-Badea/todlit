import { IChechboxBase } from "./checkbox_base";
import type { IBadge } from '../Badge/badge';

export interface ICheckbox {
  id: string,
  size?: IChechboxBase['size'],
  checkboxIcon?: IChechboxBase['icon'],
  text?: string,
  hintText?: string | JSX.Element,
  disabled?: boolean,
  checked?: boolean,
  onChangeHandler?: IChechboxBase['onChangeHandler'],
  onClickHandler?: (checked: boolean, value?: string) => void
}


export interface ICheckboxInternalProps {
  hovered?: boolean;
  focused?: boolean;
}
export interface IBaseProps {
  id: string;
  size?: IChechboxBase['size'];
  checkboxIcon?: IChechboxBase['icon'];
  type?: 'checkbox' | 'radio';
  text?: string;
  hintText?: string | JSX.Element;
  disabled?: boolean;
  onChangeHandler?: IChechboxBase['onChangeHandler'];
  onClickHandler?: (checked: boolean, value?: string) => void;
  badgeProps?: IBadge;
}
export interface ICheckboxVariant extends IBaseProps, ICheckboxInternalProps {
  type?: 'checkbox';
  checked?: boolean;
  checkboxIcon?: IChechboxBase['icon'];
}
export interface IRadioVariant extends IBaseProps, ICheckboxInternalProps {
  type?: 'radio';
  selected?: boolean;
}
export type TCheckbox = ICheckboxVariant | IRadioVariant;