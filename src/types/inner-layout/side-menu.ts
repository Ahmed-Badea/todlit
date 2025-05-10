import { Dispatch } from "react";

export interface ISideMenu {
  isSideMenuCollpased: boolean,
  setIsSideMenuCollpased: Dispatch<boolean>,
  editProfileHandler: () => void,
  logoutHandler: () => void,
};