import { ITabBase } from "../tab_base";

export interface ITabsGroup {
  type?: 'line' | 'contained',
  orientation?: 'horizontal' | 'vertical',
  tabsProps?: Omit<ITabBase, 'type'>[],
  fullWidth?: boolean,
};