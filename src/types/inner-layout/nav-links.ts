import type { ReactElement, ReactNode } from "react";


export type TAccountBarActions = 'edit-profile' | 'logout';

export type TSupportActions = 'live-chat' | 'support';

export interface INavLinks {
  mobileOnlyLinks?: boolean,
  hasSpecialAction?: boolean,
  label: string,
  icon: ReactElement<'svg'>,
  route?: string,
  subLinks?: ISubLink[]
};

export interface ISubLink {
  icon?: ReactElement<'svg'>,
  label: string,
  route: string,
  specialAction?: TSupportActions
};

export interface IAccountBarLinks {
  label: string,
  icon: ReactElement<'svg'>,
  action: TAccountBarActions
};


export interface ISupportLinks {
  label: string,
  icon: ReactElement<'svg'>,
  action: TSupportActions
};

export interface ICreateBtnLinks {
  text: string,
  icon: ReactElement<'svg'>,
  route: string
};
export interface ILangLinks {
  label: string;
  icon: ReactNode; // For SVG components or any React element
  lang: "ar" | "en"; // Assuming these are your supported languages
}