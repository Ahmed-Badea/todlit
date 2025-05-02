export interface IColumn {
  title_en: string;
  title_ar: string;
  value: string;
  dataType: 'text' | 'name' | 'num' | 'date' | 'boolean' | 'button' | 'array';
  combinedName?: boolean;
}

export interface IRow {
  [key: string]: any;
}

export interface ITableProps {
  language: 'en' | 'ar';
  columns: IColumn[];
  data: IRow[];
  rowClickHandler?: (row: IRow) => void;
  rowsPerPage?: number; // Optional, default value is provided in the Table component
}