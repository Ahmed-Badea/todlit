// Extend the allowed data types
export type DataType =
  | "string"
  | "name"
  | "num"
  | "date"
  | "boolean"
  | "button"
  | "array"
  | "multi_field"
  | "actions"
  | "badge";

// Define the structure of a single button action
export interface ButtonAction {
  label: string;
  action: string;
  color?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

// Column type definition
export interface IColumn {
  title_en: string;
  title_ar: string;
  value: string; // dot-path key like "check_in_details"
  dataType: DataType;

  fields?: {
    key: string;         // nested key inside value object
    label?: string;      // optional prefix label
    format?: string;     // optional formatter (e.g., date/time)
  }[];

  // Used only if dataType === 'actions'
  buttons?: ButtonAction[];

  // Used only if dataType === 'badge'
  badgeConfig?: {
    textField: string;    // field name for display text
    colorField: string;   // field name for background color
  };
}



export interface IRow {
  [key: string]: any;
}

export interface ITableProps {
  language: "en" | "ar";
  columns: IColumn[];
  data: IRow[];
  rowClickHandler?: (row: IRow) => void;
  rowsPerPage?: number;
  enableMultiSelect?: boolean;
  onSelectChange?: (selectedIds: number[]) => void;
  actionHandlers?: {
    [action: string]: (row: IRow) => void;
  };
}
