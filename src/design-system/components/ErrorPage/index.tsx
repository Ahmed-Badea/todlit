import React from "react";
import { IErrorPage } from "../../types/PageLoading/errorPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./error.module.scss";

export const ErrorPage: React.FC<IErrorPage> = ({ text }) => {
  return (
    <div className={styles["error"]}>
      <FontAwesomeIcon icon={faTriangleExclamation} size="5x" />
      {text && <span className={styles["error__text"]}>{text}</span>}
    </div>
  );
};
