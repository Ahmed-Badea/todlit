import { ReactElement } from "react";

export interface IToggleBox {
    size?: 'sm' | 'md',
    text?: string,
    value?: string,
    hintText?: string,
    type?: 'transparent box' | 'bordered box',
    icon?: ReactElement<'img'> | ReactElement<'svg'>,
    isToggleChecked?: boolean,
    disabled?: boolean,
    onToggleChangeHandler?: (checked: boolean, value: string) => void
}
