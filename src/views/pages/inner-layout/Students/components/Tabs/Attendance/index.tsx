import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../../../../design-system";
import { getAttendance } from "../../../../../../../services/inner-layout/attendance";
import DatePicker from "../../../../../../../components/DatePicker";
import { Language } from "../../../../../../../types";
import { IColumn, DataType } from "../../../../../../../design-system/types/Table";

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

  const { data: attendanceData = [], isLoading } = useQuery(
    ["fetchStudentAttendance", id, selectedMonth],
    () => {
      const payload: any = { student_id: id };
      if (selectedMonth) {
        const year = selectedMonth.getFullYear();
        const month = String(selectedMonth.getMonth() + 1).padStart(2, '0');
        const monthValue = `${year}-${month}`;
        payload.month = monthValue;
      }
      return getAttendance(payload);
    },
    { enabled: !!id }
  );

  const handleMonthChange = (date: Date | null) => {
    setSelectedMonth(date);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', maxWidth: '300px' }}>
        <DatePicker
          selectedDate={selectedMonth}
          onDateChange={handleMonthChange}
          label="Select Month"
          disabled={isLoading}
          type="month"
        />
      </div>
      
      <Table
        language={lang}
        columns={columns}
        data={attendanceData}
      />
    </div>
  );
};

export default Attendance;
