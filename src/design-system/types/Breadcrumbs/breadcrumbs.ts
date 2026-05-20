export interface IBreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

export interface IBreadcrumbsProps {
  items: IBreadcrumbItem[];
}
