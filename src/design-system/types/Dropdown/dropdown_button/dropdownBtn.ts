import { MouseEventHandler, FocusEventHandler, ReactElement, ReactNode } from "react";

export interface IDropdownButtonInternalProps {
    toggleDropdown?: () => void,
    closeDropdown?: () => void
};

export interface IDropdownButton {
    type?: 'button' | 'input',
    color?: 'primary' | 'secondary',
    leadingIcon?: ReactElement<'svg'>,
    trailingIcon?: ReactElement<'svg'>,
    hideDropdownChevron?: boolean,
    placeholder?: string,
    label?: string,
    text?: string,
    disabled?: boolean,
    isEditable?: boolean,
    onClickHandler?: MouseEventHandler,
    onBlurHandler?: FocusEventHandler<HTMLButtonElement>
    onClearHandler?: MouseEventHandler,
    renderAs?: ReactNode
};
