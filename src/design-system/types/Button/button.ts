import { MouseEventHandler, FocusEventHandler, ReactElement } from 'react';

export interface IButton {
  id?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  leadingIcon?: ReactElement<'img'> | ReactElement<'svg'>;
  trailingIcon?: ReactElement<'img'> | ReactElement<'svg'>;
  color?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'link';
  text?: string;
  label?: string;
  disabled?: boolean | undefined;
  onClickHandler?: MouseEventHandler;
  onBlurHandler?: FocusEventHandler<HTMLButtonElement>;
}
