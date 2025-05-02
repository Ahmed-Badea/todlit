import { useState } from "react";
import styles from "./color-input.module.scss";
import { Label } from "../Label";
import { Input } from "../Input";

interface ColorInputProps {
  label?: string;
  name: string;
  initialColor?: string;
  onChange: (name: string, color: string, isValid: boolean) => void;
  disabled?: boolean;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  label,
  name,
  initialColor = "#4E45C4",
  onChange,
  disabled,
}) => {
  const [color, setColor] = useState(initialColor);
  const [error, setError] = useState<string | null>(null);

  const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setError(null); // Reset error
    onChange(name, newColor, true); // Always valid for color picker
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value.toUpperCase(); // Normalize input
    const isValid = hexRegex.test(hexValue);

    setColor(hexValue);
    setError(isValid ? null : "Invalid hex code. Use format #FFF or #FFFFFF.");
    onChange(name, hexValue, isValid);
  };

  return (
    <div className={styles["color-input-container"]}>
      {label && <Label text={label} inputName={name} />}
      <div className={styles["color-wrapper"]}>
        <Input
          id={name}
          name={name}
          value={color}
          label=""
          placeholder="#FFFFFF"
          type="text"
          required
          disabled={disabled}
          onChange={handleHexChange}
          status={error ? "error" : "default"}
          isEditable={!disabled}
          error={error}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className={styles["color-picker"]}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
