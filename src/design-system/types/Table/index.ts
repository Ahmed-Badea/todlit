export type DataType =
  | "string"
  | "name"
  | "num"
  | "date"
  | "boolean"
  | "button"
  | "array"
  | "multi_field";

export interface IColumn {
  title_en: string;
  title_ar: string;
  value: string; // dot-path key like "check_in_details"
  dataType: DataType;
  fields?: {
    key: string;                // nested key inside value object
    label?: string;             // optional prefix label
    format?: string;   // optional formatter
  }[]; // only used if dataType === 'multi_field'
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
}

