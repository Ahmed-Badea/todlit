import React, { useRef } from "react";
import { DatePicker as RsuiteDP, DateRangePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/DateRangePicker/styles/index.css";
import { Label } from "../../design-system";
import styles from "./datePicker.module.scss";

type Value = Date | null;

interface DatePickerProps {
  selectedDate?: Value;
  onDateChange?: (date: Value) => void;
  range?: boolean;
  startDate?: Value;
  endDate?: Value;
  onRangeChange?: (start: Value, end: Value) => void;
  label?: string;
  disabled: boolean;
  isEditable?: boolean;
  type?: "date" | "time" | "month";
  placement?: 'bottomStart' | 'bottomEnd' | 'topStart' | 'topEnd' | 'leftStart' | 'rightStart' | 'leftEnd' | 'rightEnd' | 'auto' | 'autoVerticalStart' | 'autoVerticalEnd' | 'autoHorizontalStart' | 'autoHorizontalEnd';
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
  placement = "autoVerticalStart",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const format =
    type === "month" ? "yyyy-MM" :
    type === "time"  ? "HH:mm" :
                       "yyyy-MM-dd";

  const wrapperClass = `${styles["date-picker-container"]}${!isEditable ? ` ${styles["no-border"]}` : ""}`;

  const handlePickerClick = () => {
    // Scroll the modal body to make space for the picker dropdown
    setTimeout(() => {
      const modalBody = wrapperRef.current?.closest('[class*="popup-body"]');
      if (modalBody && modalBody instanceof HTMLElement) {
        // Scroll to show this field at the top of the visible area
        const elementRect = wrapperRef.current?.getBoundingClientRect();
        if (elementRect && elementRect.bottom > window.innerHeight - 300) {
          modalBody.scrollTop += elementRect.bottom - (window.innerHeight - 400);
        }
      }
    }, 0);
  };

  return (
    <div className={wrapperClass} ref={wrapperRef} onClick={handlePickerClick}>
      {label && <Label text={label} inputName="date-picker" />}

      {range ? (
        <DateRangePicker
          value={startDate && endDate ? [startDate, endDate] : null}
          onChange={(val) => {
            onRangeChange?.(val?.[0] ?? null, val?.[1] ?? null);
          }}
          disabled={disabled}
          format="yyyy-MM-dd"
          className={styles["picker"]}
          cleanable={false}
          placement={placement}
        />
      ) : (
        <RsuiteDP
          value={selectedDate}
          onChange={(val) => onDateChange?.(val)}
          disabled={disabled}
          format={format}
          className={styles["picker"]}
          cleanable={false}
          caretAs={() => null}
          placement={placement}
        />
      )}
    </div>
  );
};

export default DatePicker;
