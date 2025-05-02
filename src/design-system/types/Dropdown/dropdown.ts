import { ReactNode } from "react";

export interface IDropdown {
    children?: ReactNode,
    id?: string,
    status?: 'default' | 'warning' | 'error' | 'success',
    label?: string,
    labelHint?: string,
    hintText?: string,
    width?: 'full' | 'fit-content' | string,
    closeOnClickOutside?: boolean,
    focusOnMenuOpen?: boolean
}