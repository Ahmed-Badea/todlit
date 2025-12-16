import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "../../../../../../../design-system";
import { dateOnlyFormat } from "../../../../../../../utils/dateFormats";
import { getAttendance, checkInAttendance, checkOutAttendance } from "../../../../../../../services/inner-layout/attendance";
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
  {
    title_en: "",
    title_ar: "",
    value: "actions",
    dataType: "actions" as DataType,
    buttons: [
      {
        label: "Check In",
        action: "check_in",
        color: "primary",
        leadingIcon: <FontAwesomeIcon icon={faSignInAlt} />,
      },
      {
        label: "Check Out",
        action: "check_out",
        color: "primary",
        leadingIcon: <FontAwesomeIcon icon={faSignOutAlt} />,
      },
    ],
  },
];

const Attendance = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const { id } = useParams<{ id: string }>();
  
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { data: attendanceData = [], isLoading, refetch } = useQuery(
    ["fetchStudentAttendance", id, startDate, endDate],
    () => {
      const payload: any = { student_id: id };
      if (startDate) payload.start_date = dateOnlyFormat(startDate);
      if (endDate) payload.end_date = dateOnlyFormat(endDate);
      return getAttendance(payload);
    },
    { enabled: !!id }
  );

  const checkInMutation = useMutation(checkInAttendance, {
    onSuccess: () => {
      refetch();
      toast.success(t("innerLayout.attendance.checkInSuccess", { count: 1 }));
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    }
  });

  const checkOutMutation = useMutation(checkOutAttendance, {
    onSuccess: () => {
      refetch();
      toast.success(t("innerLayout.attendance.checkOutSuccess", { count: 1 }));
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    },
  });

  const tableActionHandlers = {
    check_in: async (row: any) => {
      const teacherId = localStorage.getItem("teacher_id");
      if (!teacherId) {
        toast.error(t("innerLayout.attendance.teacherNotFound"));
        return;
      }
      
      if (row.check_in_details?.time) {
        toast.info(t("innerLayout.attendance.alreadyCheckedIn"));
        return;
      }

      if (!id) {
        toast.error("Student ID not found");
        return;
      }

      const payload = {
        student: id,
        teacher: teacherId
      };
      await checkInMutation.mutateAsync(payload);
    },
    check_out: async (row: any) => {
      const teacherId = localStorage.getItem("teacher_id");
      if (!teacherId) {
        toast.error(t("innerLayout.attendance.teacherNotFound"));
        return;
      }
      
      if (!row.check_in_details?.time) {
        toast.warning(t("innerLayout.attendance.mustCheckInFirst"));
        return;
      }
      
      if (row.check_out_details?.time) {
        toast.info(t("innerLayout.attendance.alreadyCheckedOut"));
        return;
      }

      if (!id) {
        toast.error("Student ID not found");
        return;
      }

      const payload = {
        student: id,
        teacher: teacherId
      };
      await checkOutMutation.mutateAsync(payload);
    }
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          range
          startDate={startDate}
          endDate={endDate}
          onRangeChange={handleDateRangeChange}
          label="Date Range"
          disabled={isLoading}
          type="month"
        />
      </div>
      
      <Table
        language={lang}
        columns={columns}
        data={attendanceData}
        actionHandlers={tableActionHandlers}
      />
    </div>
  );
};

export default Attendance;
