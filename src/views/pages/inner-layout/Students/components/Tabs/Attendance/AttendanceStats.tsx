import React from "react";
import { useTranslation } from "react-i18next";
import { MonthlyAttendance } from "../../../../../../../services/inner-layout/attendance";
import styles from "./attendanceStats.module.scss";

interface AttendanceStatsProps {
  monthlyData: MonthlyAttendance | null;
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ monthlyData }) => {
  const { t } = useTranslation();

  if (!monthlyData) return null;

  const present = monthlyData.attendance.filter(r => r.check_in_details?.time).length;
  const absent = monthlyData.attendance.filter(r => !r.check_in_details?.time).length;
  const total = monthlyData.attendance.length;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stat}>
        <span className={styles.label}>{t("innerLayout.attendance.present")}</span>
        <span className={`${styles.value} ${styles.present}`}>{present}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.label}>{t("innerLayout.attendance.absent")}</span>
        <span className={`${styles.value} ${styles.absent}`}>{absent}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.label}>{t("innerLayout.attendance.totalDays")}</span>
        <span className={styles.value}>{total}</span>
      </div>
    </div>
  );
};

export default AttendanceStats;
