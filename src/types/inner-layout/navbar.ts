import { TSupportActions } from "./nav-links";

export interface INavbar {
  onTestToggleChange: (checked: boolean) => void,
  isWidgetsLoaded: { [key in TSupportActions]: boolean }
};