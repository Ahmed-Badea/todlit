import { DatePicker } from "rsuite";
import { Label } from "../../design-system";
import "rsuite/DatePicker/styles/index.css";
import styles from "./timePicker.module.scss";

interface TimePickerProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TimePicker = ({ label, name, value, onChange, disabled }: TimePickerProps) => {
  const dateValue = value ? new Date(`1970-01-01T${value}`) : null;

  const handleChange = (date: Date | null) => {
    if (!date) return onChange("");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    onChange(`${hh}:${mm}`);
  };

  return (
    <div className={styles["time-picker-container"]}>
      {label && <Label text={label} inputName={name} />}
      <DatePicker
        format="HH:mm"
        value={dateValue}
        onChange={handleChange}
        disabled={disabled}
        caretAs={() => null}
        cleanable={false}
        className={styles["time-picker"]}
      />
    </div>
  );
};

export default TimePicker;
