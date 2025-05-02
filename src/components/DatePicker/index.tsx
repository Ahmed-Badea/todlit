import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../../design-system"; // Adjust import path if needed
import styles from "./datePicker.module.scss";

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  label?: string;
  disabled: boolean;
  isEditable?: boolean;
  type?: "date" | "time"; // New prop for selecting mode
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  label,
  disabled,
  isEditable = true,
  type = "date", // Default to "date"
}) => {
  return (
    <div className={styles["date-picker-container"]}>
      {label && <Label text={label} inputName="date-picker" />}
      <ReactDatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showTimeSelect={type === "time"}
        showTimeSelectOnly={type === "time"}
        dateFormat={type === "time" ? "HH:mm" : "yyyy-MM-dd"}
        timeIntervals={15} // Adjust as needed
        timeFormat="HH:mm"
        className={`${styles["date-picker"]} ${
          !isEditable ? styles["no-border"] : ""
        }`}
        disabled={disabled}
      />
    </div>
  );
};

export default DatePicker;
