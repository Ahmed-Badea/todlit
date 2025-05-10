import type { ReactElement } from "react";
import { TSupportActions } from "./nav-links";

export interface INavItem {
  icon?: ReactElement<'svg'>,
  label: string,
  active: boolean,
  route?: string,
  subItems?: { icon?: ReactElement<'svg'>, label: string, active: boolean, route: string, specialAction?: TSupportActions }[],
  hasSubLinks: boolean,
  collapsed?: boolean
};

export interface ISubItem {
  subItems: { icon?: ReactElement<'svg'>, label: string, active: boolean, route: string, specialAction?: TSupportActions }[],
  index: number,
  navItemLabel: string,
  closeDropdown?: () => void
};
export interface ISubItemsList {
  title?: string,
  subItems?: { icon?: ReactElement<'svg'>, label: string, active: boolean, route: string }[],
  closeDropdown?: () => void
};