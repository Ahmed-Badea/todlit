export type TNavLinks = { nav: string, sub?: string };

export interface INavigationStore {
  activeLink: TNavLinks,
  setActiveLink: (newLink: TNavLinks) => void,
};