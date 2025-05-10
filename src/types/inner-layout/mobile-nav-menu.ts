import { TSupportActions } from "./nav-links";

export interface IMobileNavMenu {
  onTestToggleChange: (checked: boolean) => void,
  editProfileHandler: () => void,
  logoutHandler: () => void,
};