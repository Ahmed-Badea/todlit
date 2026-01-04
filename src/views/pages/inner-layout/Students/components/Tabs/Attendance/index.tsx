import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Table, Loading } from "../../../../../../../design-system";
import { getMonthlyAttendance } from "../../../../../../../services/inner-layout/attendance";
import DatePicker from "../../../../../../../components/DatePicker";
import AttendanceStats from "./AttendanceStats";
import { Language } from "../../../../../../../types";
import { IColumn, DataType } from "../../../../../../../design-system/types/Table";
import styles from "./attendance.module.scss";

const columns: IColumn[] = [
  {
    title_en: "Date",
    title_ar: "التاريخ",
    value: "date",
    dataType: "string" as DataType,
  },
  {
    title_en: "Check In",
    title_ar: "الحضور",
    value: "check_in_details",
    dataType: "multi_field" as DataType,
    fields: [
      { key: "time", label: "", format: "time" },
      { key: "name", label: "By" },
    ],
  },
  {
    title_en: "Check Out",
    title_ar: "الانصراف",
    value: "check_out_details",
    dataType: "multi_field" as DataType,
    fields: [
      { key: "time", label: "", format: "time" },
      { key: "name", label: "By" },
    ],
  },
];

const Attendance = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as Language;
  const { id } = useParams<{ id: string }>();
  
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());

  const { data: monthlyData, isLoading } = useQuery(
    ["monthlyAttendance", id, selectedMonth],
    () => {
      if (!id || !selectedMonth) return null;
      const year = selectedMonth.getFullYear();
      const month = String(selectedMonth.getMonth() + 1).padStart(2, '0');
      const monthValue = `${year}-${month}`;
      return getMonthlyAttendance(parseInt(id), monthValue);
    },
    { enabled: !!id && !!selectedMonth }
  );

  const handleMonthChange = (date: Date | null) => {
    setSelectedMonth(date);
  };

  const datePickerElement = (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        selectedDate={selectedMonth}
        onDateChange={handleMonthChange}
        label="Select Month"
        disabled={isLoading}
        type="month"
      />
    </div>
  );

  return (
    <div>
      {datePickerElement}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AttendanceStats monthlyData={monthlyData || null} />
          <Table
            language={lang}
            columns={columns}
            data={monthlyData?.attendance || []}
          />
        </>
      )}
    </div>
  );
};

export default Attendance;
