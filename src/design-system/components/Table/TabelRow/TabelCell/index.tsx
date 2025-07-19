import React from "react";
import { IRow, IColumn } from "../../../../types/Table";

// Helper to get nested values from dot-path strings (e.g., "check_in_details.time")
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[key];
  }, obj);
};

interface TableCellProps {
  row: IRow;
  keyPath: string;
  type: IColumn["dataType"];
  column: IColumn;
}

export const TableCell: React.FC<TableCellProps> = ({
  row,
  column,
  keyPath,
  type,
}) => {
  const cellValue = getNestedValue(row, keyPath);

  // Common fallback check
  const isEmpty =
    cellValue === null ||
    cellValue === undefined ||
    (Array.isArray(cellValue) && cellValue.length === 0);

  if (isEmpty && type !== "multi_field") {
    return <>-</>;
  }

  switch (type) {
    case "string":
      return <>{cellValue}</>;

    case "name":
      return <>{`${row.first_name ?? ""} ${row.last_name ?? ""}`}</>;

    case "num":
      return <>{Number(cellValue)}</>;

    case "date":
      return <>{new Date(cellValue).toLocaleDateString()}</>;

    case "boolean":
      return <>{cellValue ? "Yes" : "No"}</>;

    case "button":
      return <button>{cellValue}</button>;

    case "array":
      if (Array.isArray(cellValue)) {
        return <>{cellValue.join(", ")}</>;
      }
      return <>{cellValue}</>;

    case "multi_field": {
      const obj = getNestedValue(row, keyPath);
      if (!obj || typeof obj !== "object") return <>-</>;

      return (
        <div>
          {column.fields?.map((field, index) => {
            const val = obj[field.key];

            let displayValue: React.ReactNode = "-";
            if (val !== null && val !== undefined) {
              if (field.format === "time") {
                const date = new Date(val);
                displayValue = date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              } else if (field.format === "date") {
                const date = new Date(val);
                displayValue = date.toLocaleDateString();
              } else {
                displayValue = val;
              }
            }

            return (
              <div key={index}>
                {field.label ? (
                  <span>
                    {field.label} {displayValue}
                  </span>
                ) : (
                  <strong>{displayValue}</strong>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    default:
      return <>{cellValue}</>;
  }
};
