import React, { useState } from "react";
import { ITableProps } from "../../types/Table";
import NoData from "../NoData";
import { TableCell } from "./TabelCell";
import { Pagination } from "./Pagination";
import { Checkbox } from "../Checkbox";
import styles from "./table.module.scss";

export const Table: React.FC<ITableProps> = ({
  language,
  columns,
  data,
  rowClickHandler = () => {},
  rowsPerPage = 10,
  enableMultiSelect = false,
  onSelectChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];

      onSelectChange?.(newSelected);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    const currentIds = currentRows.map((row) => row.student_id);
    const allSelected = currentIds.every((id) => selectedRows.includes(id));

    if (allSelected) {
      const newSelected = selectedRows.filter((id) => !currentIds.includes(id));
      setSelectedRows(newSelected);
      onSelectChange?.(newSelected);
    } else {
      const newSelected = [...new Set([...selectedRows, ...currentIds])];
      setSelectedRows(newSelected);
      onSelectChange?.(newSelected);
    }
  };

  const isAllSelected =
    currentRows.length > 0 &&
    currentRows.every((row) => selectedRows.includes(row.student_id));

  return (
    <div className={styles["table-container"]}>
      {data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <table className={styles["table"]}>
            <thead className={styles["table-thead"]}>
              <tr>
                {enableMultiSelect && (
                  <td className={styles["checkbox-cell"]}>
                    <Checkbox
                      id="select-all"
                      checked={isAllSelected}
                      onClickHandler={handleSelectAll}
                    />
                  </td>
                )}
                {columns.map((column, index) => (
                  <th key={index} className={styles["table-th"]}>
                    {language === "en" ? column.title_en : column.title_ar}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles["table-tbody"]}>
              {currentRows.map((row, rowIndex) => {
                const isSelected = selectedRows.includes(row.student_id);
                return (
                  <tr
                    key={rowIndex}
                    className={`${styles["table-tr"]} ${
                      enableMultiSelect && isSelected
                        ? styles["selected-row"]
                        : ""
                    }`}
                    onClick={() => rowClickHandler(row)}
                  >
                    {enableMultiSelect && (
                      <td className={styles["checkbox-cell"]}>
                        <Checkbox
                          id={`row-${row.student_id}`}
                          checked={isSelected}
                          onClickHandler={() =>
                            handleCheckboxChange(row.student_id)
                          }
                        />
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className={styles["table-td"]}>
                        <TableCell
                          row={row}
                          column={column}
                          keyPath={column.value}
                          type={column.dataType}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
