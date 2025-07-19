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
} from "../../../../design-system";
import { dateOnlyFormat } from "../../../../utils/dateFormats";
import {
  getAttendance,
  checkInAttendance,
  checkOutAttendance,
} from "../../../../services/inner-layout/attendance";
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

  const stats = [
    {
      key: "total",
      label: t("innerLayout.attendance.total"),
      count: staffData.length,
      color: "#007bff", // Blue
    },
    {
      key: "pending",
      label: t("innerLayout.attendance.pending"),
      count: 12, // TODO: replace with actual logic if needed
      color: "#ffc107", // Amber
    },
    {
      key: "checkin",
      label: t("innerLayout.attendance.checkIn"),
      count: 24, // TODO: replace with actual logic if needed
      color: "#28a745", // Green
    },
    {
      key: "checkout",
      label: t("innerLayout.attendance.checkOut"),
      count: 18, // TODO: replace with actual logic if needed
      color: "#17a2b8", // Teal
    },
    {
      key: "absent",
      label: t("innerLayout.attendance.absent"),
      count: 6, // TODO: replace with actual logic if needed
      color: "#dc3545", // Red
    },
  ];
  

  const checkInMutation = useMutation(checkInAttendance, {
    onSuccess: () => refetch(),
    onError: (error) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    }
  });

  const checkOutMutation = useMutation(checkOutAttendance, {
    onSuccess: () => refetch(),
    onError: (error) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    },
  });

  const submitCheckIn = () => {
    if (studentsIds.length > 0) {
      checkInMutation.mutate({ student_ids: studentsIds });
    }
  };

  const submitCheckOut = () => {
    if (studentsIds.length > 0) {
      checkOutMutation.mutate({ student_ids: studentsIds });
    }
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
    checkIn: async (row) => {
      await checkInMutation.mutateAsync({ student_ids: [row.student_id] });
    },
    checkIOut: async (row) => {
      await checkOutMutation.mutateAsync({ student_ids: [row.student_id] });
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
            type="date"
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
          text={t("innerLayout.attendance.checkIn")}
          leadingIcon= {<FontAwesomeIcon icon={faSignInAlt} />}
          onClickHandler={submitCheckIn}
          disabled={
            isLoading ||
            isFetching ||
            checkInMutation.isLoading ||
            studentsIds.length < 1
          }
          loading={checkInMutation.isLoading}
        />
        <Button
          id="check-out"
          text={t("innerLayout.attendance.checkOut")}
          leadingIcon= {<FontAwesomeIcon icon={faSignOutAlt} />}
          onClickHandler={submitCheckOut}
          disabled={
            isLoading ||
            isFetching ||
            checkOutMutation.isLoading ||
            studentsIds.length < 1
          }
          loading={checkOutMutation.isLoading}
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
    </InnerLayout>
  );
};

export default StudentAttendance;
