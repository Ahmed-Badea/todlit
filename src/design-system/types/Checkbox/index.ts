import { IChechboxBase } from "./checkbox_base";

export interface ICheckbox {
  id: string,
  size?: IChechboxBase['size'],
  checkboxIcon?: IChechboxBase['icon'],
  text?: string,
  hintText?: string,
  disabled?: boolean,
  checked?: boolean,
  onChangeHandler?: IChechboxBase['onChangeHandler'],
  onClickHandler?: (checked: boolean, value?: string) => void
}