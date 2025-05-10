import { ReactNode } from "react";

export interface IInnerLayout {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: boolean;
  errorMessage?: string;
};

export type LangActions = "ar" | "en";

export type ProfileActions = "edit-profile" | "logout";

export interface UserInfo {
  userName: string;
  userShortName: string;
  role: string;
  imgUrl?: string;
  avatarType: "image" | "name";
};

export interface IAccountBar {
  collapsed?: boolean;
  handlers: {
    // logout: () => void;
    // editProfile: () => void;
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
