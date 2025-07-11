import React from "react";
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
  return (
    <div
      className={styles["stat-card"]}
      style={{ borderLeftColor: color }} // Apply dynamic border color
    >
      <span className={styles["count"]}>{count}</span>
      <span className={styles["label"]}>{label}</span>
    </div>
  );
};

export default StatCard;
