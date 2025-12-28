import { MouseEventHandler, FocusEventHandler } from "react";
import { IButtonStyleProps } from './common';

export interface IButton extends IButtonStyleProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  label?: string;
  disabled?: boolean;
  onClickHandler?: MouseEventHandler;
  onBlurHandler?: FocusEventHandler<HTMLButtonElement>;
  loading?: boolean;
  style?: React.CSSProperties;
}
