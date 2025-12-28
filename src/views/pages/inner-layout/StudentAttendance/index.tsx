import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClassesStore } from "../../../../store/classes";
import {
  Table,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownMenuItem,
  Button,
  Popup,
} from "../../../../design-system";
import { dateOnlyFormat } from "../../../../utils/dateFormats";
import {
  getAttendance,
  checkInAttendance,
  checkOutAttendance,
} from "../../../../services/inner-layout/attendance";
import { useAttendanceTimeSelection } from "../../../../hooks/useAttendanceTimeSelection";
import InnerLayout from "../../../../views/layout/InnerLayout";
import DatePicker from "../../../../components/DatePicker";
import StatCard from "../../../../components/StatCard";
import rawColumns from "./attendanceTableStruc";
import { Language } from "../../../../types";
import { IColumn, DataType } from "../../../../design-system/types/Table";

import styles from "./attendance.module.scss";

const columns: IColumn[] = rawColumns.map((col) => ({
  ...col,
  dataType: col.dataType as DataType,
}));

const StudentAttendance = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { classes } = useClassesStore();

  const searchParams = new URLSearchParams(location.search);
  const initialClassFilter = searchParams.get("class") || "";
  const initialStart = searchParams.get("start_date");
  const initialEnd = searchParams.get("end_date");

  const [classFilter, setClassFilter] = useState(initialClassFilter);
  const [startDate, setStartDate] = useState<Date | null>(
    initialStart ? new Date(initialStart) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialEnd ? new Date(initialEnd) : new Date()
  );

  const [studentsIds, setStudentsIds] = useState<string[]>([]);

  const {
    data: staffData = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ["fetchAttendance", classFilter, startDate, endDate],
    () => {
      const selectedClass = classes.find((cls) => cls.name === classFilter);
      const payload: any = {};

      if (selectedClass) payload.class_id = selectedClass.id;
      if (startDate) payload.start_date = dateOnlyFormat(startDate);
      if (endDate) payload.end_date = dateOnlyFormat(endDate);

      return getAttendance(payload);
    },
    { keepPreviousData: true }
  );

  const {
    isTimePopupOpen,
    selectedTime,
    currentAction,
    currentRow,
    setSelectedTime,
    handleTimeSelection,
    openTimePopup,
    closeTimePopup,
  } = useAttendanceTimeSelection(refetch);

  const stats = useMemo(() => {
    const checkedIn = staffData.filter((student: any) => student.check_in_details?.time).length;
    const checkedOut = staffData.filter((student: any) => student.check_out_details?.time).length;
    const pending = staffData.filter((student: any) => !student.check_in_details?.time).length;
    const absent = staffData.filter((student: any) => !student.check_in_details?.time && !student.check_out_details?.time).length;

    return [
      {
        key: "total",
        label: t("innerLayout.attendance.total"),
        count: staffData.length,
        color: "#007bff",
      },
      {
        key: "pending",
        label: t("innerLayout.attendance.pending"),
        count: pending,
        color: "#ffc107",
      },
      {
        key: "checkin",
        label: t("innerLayout.attendance.checkIn"),
        count: checkedIn,
        color: "#28a745",
      },
      {
        key: "checkout",
        label: t("innerLayout.attendance.checkOut"),
        count: checkedOut,
        color: "#17a2b8",
      },
      {
        key: "absent",
        label: t("innerLayout.attendance.absent"),
        count: absent,
        color: "#dc3545",
      },
    ];
  }, [staffData, t]);

  const bulkCheckInMutation = useMutation(checkInAttendance, {
    onSuccess: (_, variables) => {
      refetch();
      const count = Array.isArray(variables) ? variables.length : 1;
      toast.success(t("innerLayout.attendance.checkInSuccess", { count }));
      setStudentsIds([]);
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    }
  });

  const bulkCheckOutMutation = useMutation(checkOutAttendance, {
    onSuccess: (_, variables) => {
      refetch();
      const count = Array.isArray(variables) ? variables.length : 1;
      toast.success(t("innerLayout.attendance.checkOutSuccess", { count }));
      setStudentsIds([]);
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    },
  });

  const submitCheckIn = () => {
    if (studentsIds.length === 0) {
      toast.warning(t("innerLayout.attendance.selectStudents"));
      return;
    }
    
    const teacherId = localStorage.getItem("teacher_id");
    if (!teacherId) {
      toast.error(t("innerLayout.attendance.teacherNotFound"));
      return;
    }

    const payload = studentsIds.map(studentId => ({
      student: studentId,
      parent: teacherId,
      checkin_time: new Date().toISOString()
    }));
    bulkCheckInMutation.mutate(payload);
  };

  const submitCheckOut = () => {
    if (studentsIds.length === 0) {
      toast.warning(t("innerLayout.attendance.selectStudents"));
      return;
    }
    
    const teacherId = localStorage.getItem("teacher_id");
    if (!teacherId) {
      toast.error(t("innerLayout.attendance.teacherNotFound"));
      return;
    }

    const payload = studentsIds.map(studentId => ({
      student: studentId,
      parent: teacherId,
      checkout_time: new Date().toISOString()
    }));
    bulkCheckOutMutation.mutate(payload);
  };

  useEffect(() => {
    refetch();
  }, [classFilter, startDate, endDate, refetch]);

  const handleClassFilterChange = (selectedName: string) => {
    setClassFilter(selectedName);

    const params = new URLSearchParams(location.search);
    if (selectedName) params.set("class", selectedName);
    else params.delete("class");

    if (startDate) params.set("start_date", dateOnlyFormat(startDate));
    if (endDate) params.set("end_date", dateOnlyFormat(endDate));

    navigate(`${location.pathname}?${params.toString()}`);
    queryClient.invalidateQueries("fetchAttendance");
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);

    const params = new URLSearchParams(location.search);
    if (classFilter) params.set("class", classFilter);
    if (start) params.set("start_date", dateOnlyFormat(start));
    else params.delete("start_date");
    if (end) params.set("end_date", dateOnlyFormat(end));
    else params.delete("end_date");

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const selectedClassName = useMemo(() => {
    return classFilter || t("innerLayout.staff.allClasses");
  }, [classFilter, t]);

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

      openTimePopup('check_in', row);
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

      openTimePopup('check_out', row);
    }
  };
  

  return (
    <InnerLayout
      isLoading={isLoading || isFetching}
      error={!!error}
      errorMessage={(error as Error)?.message}
    >
      <div className={styles.header}>
        <h3>{t("innerLayout.attendance.title")}</h3>
        <div className={styles.filters_container}>
          <Dropdown label="Class">
            <DropdownButton
              text={selectedClassName}
              onClickHandler={() => {}} // toggle removed as menu is managed internally
            />
            <DropdownMenu>
              <DropdownMenuItem
                key="all"
                text={t("innerLayout.staff.allClasses")}
                onClickHandler={() => handleClassFilterChange("")}
                selected={classFilter === ""}
              />
              {classes?.map(({ id, name }) => (
                <DropdownMenuItem
                  key={id}
                  text={name}
                  onClickHandler={() => handleClassFilterChange(name)}
                  selected={classFilter === name}
                />
              ))}
            </DropdownMenu>
          </Dropdown>

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
      </div>

      <div className={styles.stat_cards_container}>
        {stats.map(({ key, label, count, color }) => (
          <StatCard key={key} label={label} count={count} color={color} />
        ))}
      </div>

      <div className={styles.actions_container}>
        <Button
          id="check-in"
          text={`${t("innerLayout.attendance.checkIn")} ${
            studentsIds.length > 0 ? `(${studentsIds.length})` : ""
          }`}
          leadingIcon={<FontAwesomeIcon icon={faSignInAlt} />}
          onClickHandler={submitCheckIn}
          disabled={
            isLoading ||
            isFetching ||
            bulkCheckInMutation.isLoading ||
            studentsIds.length < 1
          }
          loading={bulkCheckInMutation.isLoading}
        />
        <Button
          id="check-out"
          text={`${t("innerLayout.attendance.checkOut")} ${
            studentsIds.length > 0 ? `(${studentsIds.length})` : ""
          }`}
          leadingIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
          onClickHandler={submitCheckOut}
          disabled={
            isLoading ||
            isFetching ||
            bulkCheckOutMutation.isLoading ||
            studentsIds.length < 1
          }
          loading={bulkCheckOutMutation.isLoading}
        />
      </div>

      <Table
        language={lang}
        columns={columns}
        data={staffData}
        enableMultiSelect={true}
        onSelectChange={(selectedIds: number[]) =>
          setStudentsIds(selectedIds.map(String))
        }
        actionHandlers={tableActionHandlers}
      />

      <Popup
        isOpen={isTimePopupOpen}
        onClose={closeTimePopup}
        title={`Select ${currentAction === 'check_in' ? 'Check In' : 'Check Out'} Time`}
      >
        <div style={{ padding: '20px' }}>
          <DatePicker
            selectedDate={selectedTime}
            onDateChange={setSelectedTime}
            label="Select Time"
            type="time"
            disabled={false}
          />
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button
              size="md"
              color="primary"
              variant="contained"
              text="Confirm"
              onClickHandler={() => handleTimeSelection(currentRow?.student_id)}
              style={{ width: '100%' }}
            />
            <Button
              size="md"
              color="secondary"
              variant="outlined"
              text="Cancel"
              onClickHandler={closeTimePopup}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Popup>
    </InnerLayout>
  );
};

export default StudentAttendance;
