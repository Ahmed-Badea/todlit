import React from "react";
import styles from "./index.module.scss";

interface DetailsBoxProps {
  title: string;
  children: React.ReactNode;
}

const DetailsBox: React.FC<DetailsBoxProps> = ({ title, children }) => {
  return (
    <div className={styles["details-box"]}>
      <div className={styles["details-box__header"]}>
        <h4>{title}</h4>
      </div>
      <div className={styles["details-box__content"]}>
        {children}
      </div>
    </div>
  );
};

export default DetailsBox;
