import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./noData.module.scss";
import EmptyStateIcon from "../../assets/icons/no-data.svg";

interface NoDataProps {
  messageKey?: string;
}

const NoData: React.FC<NoDataProps> = ({ messageKey = "innerLayout.noData" }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img src={EmptyStateIcon} alt="No data available" className={styles.icon} />
      <p className={styles.emptyMessage}>{t(messageKey)}</p>
    </div>
  );
};

export default NoData;
