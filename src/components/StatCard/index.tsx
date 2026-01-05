import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./statCard.module.scss";

interface StatCardProps {
  count: number;
  label: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  count,
  label,
  color,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={styles["stat-card"]}
      style={{
        [isRTL ? "borderRightColor" : "borderLeftColor"]: color,
      }}
    >
      <span className={styles["count"]}>{count}</span>
      <span className={styles["label"]}>{label}</span>
    </div>
  );
};

export default StatCard;
