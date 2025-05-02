import { ICustomSelectorBox } from "./custom_selector_box/customSelectorBox";

export interface ICustomSelector {
    boxesProps?: Omit<ICustomSelectorBox, 'selected'>[],
    selected?: string
}