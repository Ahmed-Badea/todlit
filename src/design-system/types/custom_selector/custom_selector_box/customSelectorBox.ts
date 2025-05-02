import { MouseEventHandler, ReactElement } from "react";

export interface ICustomSelectorBox {
    title?: string,
    icon?: ReactElement<'svg'>,
    selected?: boolean,
    onClickHandler?: MouseEventHandler
}