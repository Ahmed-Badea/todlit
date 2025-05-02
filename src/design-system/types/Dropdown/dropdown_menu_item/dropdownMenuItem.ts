import type { ReactElement, MouseEventHandler } from "react";

export interface IDropdownMenuItemInternalProps {
    closeDropdown?: () => void
};

export interface IDropdownMenuItemSharedProps {
    text?: string,
    hintText?: string,
    disabled?: boolean,
    closeOnItemClick?: boolean
};

export interface IDefaultDropdownMenuItem {
    type?: 'default',
    icon?: ReactElement<'svg'>,
    selected?: boolean,
    hideCheckMarks?: boolean,
    onClickHandler?: MouseEventHandler
};

export interface ICheckboxDropdownMenuItem extends IDropdownMenuItemSharedProps {
    type?: 'checkbox',
    id: string,
    checkboxIcon?: "tick" | "dash",
    checked?: boolean,
    onChangeHandler?: (checked: boolean, value?: string) => void,
    onCheckboxItemClickHandler?: (checked: boolean, value?: string) => void,
};

export type IDropdownMenuItem = IDropdownMenuItemSharedProps & (
    IDefaultDropdownMenuItem |
    ICheckboxDropdownMenuItem
);