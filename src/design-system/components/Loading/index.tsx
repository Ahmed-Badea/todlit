import React from "react";
import { Spinner } from "./Spinner";
import styles from "./loading.module.scss";

export const Loading: React.FC = () => {
  return (
    <div className={styles["loading"]}>
      <Spinner />
    </div>
  );
};