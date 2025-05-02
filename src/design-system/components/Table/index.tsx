import React, { useState } from "react";
import { ITableProps, IRow, IColumn } from "../../types/Table/table";
import { Button } from"../Button";
import styles from "./table.module.scss";

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[key];
  }, obj);
};

const renderCellContent = (
  dataType: IColumn["dataType"],
  value: string,
  row: IRow
) => {
  const cellValue = getNestedValue(row, value);

  if (
    cellValue === null ||
    cellValue === undefined ||
    (Array.isArray(cellValue) && cellValue.length === 0)
  ) {
    return "-";
  }

  switch (dataType) {
    case "string":
      return cellValue;
    case "name":
      return `${row.first_name} ${row.last_name}`;
    case "num":
      return Number(cellValue);
    case "date":
      return new Date(cellValue).toLocaleDateString();
    case "boolean":
      return cellValue ? "Yes" : "No";
    case "button":
      return <button>{cellValue}</button>;
    case "array":
      if (Array.isArray(row.classrooms)) {
        return row.classrooms.length > 0
          ? row.classrooms.map((classroom) => classroom.name).join(", ")
          : "-";
      }
      return cellValue;
    default:
      return cellValue;
  }
};


export const Table: React.FC<ITableProps> = ({
  language,
  columns,
  data,
  rowClickHandler = () => {},
  rowsPerPage = 10, // Default rows per page
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={styles["table-container"]}>
      {data.length === 0 ? (
        <div className={styles["no-data"]}>No data available</div>
      ) : (
        <>
          <table className={styles["table"]}>
            <thead className={styles["table-thead"]}>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className={styles["table-th"]}>
                    {language === "en" ? column.title_en : column.title_ar}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles["table-tbody"]}>
              {currentRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={styles["table-tr"]}
                  onClick={() => rowClickHandler(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={styles["table-td"]}>
                      {renderCellContent(column.dataType, column.value, row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles["pagination"]}>
            <Button
              id="prev-page-btn"
              size="md"
              color="primary"
              variant="contained"
              text="Previous"
              disabled={currentPage === 1}
              onClickHandler={() => handlePageChange(currentPage - 1)}
            />
            <span className={styles["pagination-info"]}>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              id="next-page-btn"
              size="md"
              color="primary"
              variant="contained"
              text="Next"
              disabled={currentPage === totalPages}
              onClickHandler={() => handlePageChange(currentPage + 1)}
            />
          </div>
        </>
      )}
    </div>
  );
};
