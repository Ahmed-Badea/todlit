import type { ReactElement } from "react";
export interface ITabBase {
  type?: 'line' | 'contained',
  active?: boolean,
  disabled?: boolean,
  leadingIcon?: ReactElement<'svg'>,
  tabName?: string,
  tabLabel?: string,
  counter?: number,
  onClickHandler?: (tabLabel?: string, tabName?: string) => void,
  fullWidth?: boolean,
};