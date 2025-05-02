import { ReactElement } from "react";

export interface IBadge {
    leadingIcon?: ReactElement<'img'> | ReactElement<'svg'>,
    trailingIcon?: ReactElement<'img'> | ReactElement<'svg'>,
    type?: 'default' | 'country' | 'avatar',
    color?: 'primary' | 'gray' | 'grey' | 'green' | 'yellow' | 'red',
    size?: 'sm' | 'md' | 'lg',
    text?: string
}
