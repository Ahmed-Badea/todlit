import React from "react";
import { Button } from "../../Button";
import { IPaginationProps } from "../../../types/Table/pagination";
import styles from "./pagination.module.scss";

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={styles.pagination}>
      <Button
        id="prev-page-btn"
        size="md"
        color="primary"
        variant="contained"
        text="Previous"
        disabled={currentPage === 1}
        onClickHandler={() => onPageChange(currentPage - 1)}
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
        onClickHandler={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
