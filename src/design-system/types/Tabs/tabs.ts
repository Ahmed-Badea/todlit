interface ITab {
  label: string;
  content: React.ReactNode;
}

export interface ITabsProps {
  tabs: ITab[];
}