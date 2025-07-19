import { ReactElement } from "react";

export interface IButtonStyleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  leadingIcon?: ReactElement<'img'> | ReactElement<'svg'>;
  trailingIcon?: ReactElement<'img'> | ReactElement<'svg'>;
  color?: 'primary' | 'secondary' | 'danger';
  variant?: 'contained' | 'outlined' | 'link';
}
