import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../../design-system"; // Adjust if needed
import styles from "./datePicker.module.scss";

interface DatePickerProps {
  selectedDate?: Date | null;
  onDateChange?: (date: Date | null) => void;

  // For range mode
  range?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  onRangeChange?: (start: Date | null, end: Date | null) => void;

  label?: string;
  disabled: boolean;
  isEditable?: boolean;
  type?: "date" | "time";
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  range = false,
  startDate = null,
  endDate = null,
  onRangeChange,
  label,
  disabled,
  isEditable = true,
  type = "date",
}) => {
  const handleStartChange = (date: Date | null) => {
    onRangeChange?.(date, endDate);
  };

  const handleEndChange = (date: Date | null) => {
    onRangeChange?.(startDate, date);
  };

  const maxDate = new Date();

  return (
    <div className={styles["date-picker-container"]}>
      {label && <Label text={label} inputName="date-picker" />}

      {range ? (
        <div className={styles["range-wrapper"]}>
          <ReactDatePicker
            selected={startDate}
            onChange={handleStartChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={maxDate} // Prevent selecting future dates
            dateFormat={type === "time" ? "HH:mm" : "yyyy-MM-dd"}
            timeFormat="HH:mm"
            timeIntervals={15}
            showTimeSelect={type === "time"}
            showTimeSelectOnly={type === "time"}
            className={`${styles["date-picker"]} ${
              !isEditable ? styles["no-border"] : ""
            }`}
            placeholderText="Start"
            disabled={disabled}
          />
          <ReactDatePicker
            selected={endDate}
            onChange={handleEndChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate ?? undefined}
            maxDate={maxDate} // Prevent selecting future dates
            dateFormat={type === "time" ? "HH:mm" : "yyyy-MM-dd"}
            timeFormat="HH:mm"
            timeIntervals={15}
            showTimeSelect={type === "time"}
            showTimeSelectOnly={type === "time"}
            className={`${styles["date-picker"]} ${
              !isEditable ? styles["no-border"] : ""
            }`}
            placeholderText="End"
            disabled={disabled}
          />
        </div>
      ) : (
        <ReactDatePicker
          selected={selectedDate}
          onChange={onDateChange}
          maxDate={maxDate} // Prevent selecting future dates
          showTimeSelect={type === "time"}
          showTimeSelectOnly={type === "time"}
          dateFormat={type === "time" ? "HH:mm" : "yyyy-MM-dd"}
          timeIntervals={15}
          timeFormat="HH:mm"
          className={`${styles["date-picker"]} ${
            !isEditable ? styles["no-border"] : ""
          }`}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default DatePicker;
