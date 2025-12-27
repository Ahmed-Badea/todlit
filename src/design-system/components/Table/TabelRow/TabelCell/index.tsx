import React from "react";
import { IRow, IColumn } from "../../../../types/Table";
import styles from "../../table.module.scss";

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
        // Handle array of objects (extract name property)
        if (cellValue.length > 0 && typeof cellValue[0] === 'object' && cellValue[0].name) {
          return <>{cellValue.map(item => item.name).join(", ")}</>;
        }
        // Handle array of strings
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

    case "badge": {
      if (!cellValue || typeof cellValue !== "object") return <>-</>;
      
      const textField = column.badgeConfig?.textField || "name";
      const colorField = column.badgeConfig?.colorField || "color";
      
      const badgeText = cellValue[textField] || "-";
      const badgeColor = cellValue[colorField] || "gray";
      
      return (
        <span 
          className={styles["plan-badge"]} 
          style={{ 
            backgroundColor: badgeColor,
            padding: "4px 12px",
            borderRadius: "8px"
          }}
        >
          {badgeText}
        </span>
      );
    }

    default:
      return <>{cellValue}</>;
  }
};
