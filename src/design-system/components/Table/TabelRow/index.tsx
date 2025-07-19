import React from "react";
import { IColumn, IRow } from "../../../types/Table";
import { TableCell } from "./TabelCell";
import { TableActionButton } from "./TabelCell/TabelActionButton";
import { Checkbox } from "../../Checkbox";
import styles from "../table.module.scss";

interface TableRowProps {
  row: IRow;
  columns: IColumn[];
  language: "en" | "ar";
  isSelected: boolean;
  enableMultiSelect: boolean;
  onCheckboxChange: (id: number) => void;
  onRowClick: (row: IRow) => void;
  actionHandlers?: {
    [key: string]: (row: IRow) => void | Promise<void>;
  };
}

export const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  language,
  isSelected,
  enableMultiSelect,
  onCheckboxChange,
  onRowClick,
  actionHandlers = {},
}) => {
  return (
    <tr
      className={`${styles["table-tr"]} ${
        enableMultiSelect && isSelected ? styles["selected-row"] : ""
      }`}
      onClick={() => onRowClick(row)}
    >
      {enableMultiSelect && (
        <td className={styles["checkbox-cell"]}>
          <Checkbox
            id={`row-${row.student_id}`}
            checked={isSelected}
            onClickHandler={() => onCheckboxChange(row.student_id)}
          />
        </td>
      )}

      {columns.map((column, colIndex) => {
        if (column.dataType === "actions" && column.buttons) {
          return (
            <td key={colIndex} className={styles["table-td"]}>
              <div className={styles["action-buttons-row"]}>
                {column.buttons.map((btn, i) => (
                  <TableActionButton
                    key={i}
                    row={row}
                    label={btn.label}
                    actionKey={btn.action}
                    color={btn.color}
                    size={btn.size}
                    variant={btn.variant}
                    leadingIcon={btn.leadingIcon}
                    trailingIcon={btn.trailingIcon}
                    actionHandlers={actionHandlers}
                  />
                ))}
              </div>
            </td>
          );
        }

        return (
          <td key={colIndex} className={styles["table-td"]}>
            <TableCell
              row={row}
              column={column}
              keyPath={column.value}
              type={column.dataType}
            />
          </td>
        );
      })}
    </tr>
  );
};
