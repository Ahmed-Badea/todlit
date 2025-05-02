import { Dispatch, ReactElement, ReactNode } from "react";

export type ProfileActions = "edit-profile" | "logout";

export type LangActions = "ar" | "en";

export interface NavLinks {
  mobileOnlyLinks?: boolean;
  label: string;
  icon: any;
  route?: string;
  subLinks?: {
    icon?: ReactNode;
    label: string;
    route: string;
  }[];
}

export interface AccountBarLinks {
  label: string;
  icon: ReactElement<"svg">;
  action: ProfileActions;
}

export interface LangLinks {
  label: string;
  icon: ReactElement<"svg">;
  lang: string;
}

export interface UserInfo {
  userName: string;
  userShortName: string;
  role: string;
  imgUrl?: string;
  avatarType: "image" | "name";
};

// Components

export interface IInnerLayout {
  children: ReactNode;
  isLoading?: boolean;
  error?: any;
}

export interface IAccountBar {
  collapsed?: boolean;
  handlers: {
    logout: () => void;
    editProfile: () => void;
    toggleAccountBox?: () => void;
  };
  userInfo?: {
    avatarType?: "image" | "name";
    userName?: string;
    userShortName?: string;
    role?: string;
    imgUrl?: string;
  };
}

export interface IInfoBar {
  status: "default" | "warning" | "success" | "error";
  text: string;
}

export interface IMobileNavMenu {
  activeNavLink: string;
  activeSubLink: string;
  handleNavLinkClick: (
    label: string,
    hasSubLinks: boolean,
    route?: string
  ) => void;
  handleSubLinkClick: (
    label: string,
    route: string,
    navLinkLabel: string
  ) => void;
}

export interface ISideMenu {
  isSideMenuCollpased: boolean;
  setIsSideMenuCollpased: Dispatch<boolean>;
}

export interface INavbar {
  editProfileHandler: () => void;
  logoutHandler: () => void;
}

export interface INavItem {
  icon?: ReactElement<"svg">;
  label: string;
  active: boolean;
  route?: string;
  subItems?: {
    icon?: ReactElement<"svg">;
    label: string;
    active: boolean;
    route: string;
  }[];
  collapsed?: boolean;
  hasSubLinks: boolean;
  navLinkClickHandler: (
    label: string,
    hasSubLinks: boolean,
    route?: string
  ) => void;
  subLinkClickHandler: (
    label: string,
    route: string,
    navLinkLabel: string
  ) => void;
}

export interface ISubItem {
  subItems: {
    icon?: ReactElement<"svg">;
    label: string;
    active: boolean;
    route: string;
  }[];
  index: number;
  navItemLabel: string;
  subLinkClickHandler: (
    label: string,
    route: string,
    navLinkLabel: string
  ) => void;
  closeDropdown?: () => void;
}

export interface ISubItemsList {
  title?: string;
  subItems?: {
    icon?: ReactElement<"svg">;
    label: string;
    active: boolean;
    route: string;
  }[];
  subLinkClickHandler: (
    label: string,
    route: string,
    navLinkLabel: string
  ) => void;
  closeDropdown?: () => void;
}