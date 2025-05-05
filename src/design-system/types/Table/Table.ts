export enum DataType {
  String = 'string',
  Name = 'name',
  Num = 'num',
  Date = 'date',
  Boolean = 'boolean',
  Button = 'button',
  Array = 'array',
}

export interface IColumn {
  title_en: string;
  title_ar: string;
  value: string;
  dataType: DataType;
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