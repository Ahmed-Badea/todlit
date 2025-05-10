import { useState, useEffect, cloneElement, type FocusEvent } from "react";
import type { ICheckbox } from "../../types/Checkbox";
import { CheckboxBase } from "./CheckboxBase";
import styles from "./checkbox.module.scss";

export const Checkbox = ({
  id,
  size = "sm",
  checkboxIcon = "tick",
  text,
  hintText,
  disabled = false,
  checked = false,
  onChangeHandler,
  onClickHandler
}: ICheckbox) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const onMouseOverHandler = () => {
    setIsHovered(true);
  };

  const onMouseOutHandler = () => {
    setIsHovered(false);
  };

  const onFocusHandler = (e: FocusEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsFocused(true);
  };

  const onBlurHandler = (e: FocusEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsFocused(false);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsChecked((prevState: any) => {
      onClickHandler?.(!prevState, text || hintText);
      return !prevState;
    });
  };

  return (
    <div
      className={styles["checkbox-wrapper"]}
      data-checkbox-disabled={disabled}
      data-checkbox-size={size}
      data-checkbox-aligned-center={Boolean(text) !== Boolean(hintText)}
      onClick={handleClick}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      onFocusCapture={onFocusHandler}
      onBlurCapture={onBlurHandler}
      tabIndex={0}
    >
      {
        cloneElement(
          <CheckboxBase
            id={id}
            size={size}
            icon={checkboxIcon}
            checked={isChecked}
            disabled={disabled}
            onChangeHandler={(checked) => onChangeHandler?.(checked, text || hintText)}
          />, { hovered: isHovered, focused: isFocused }
        )
      }

      {
        (text || hintText) &&
        <div className={styles["checkbox-wrapper__text-box"]}>
          {
            text &&
            <div className={styles["checkbox-wrapper__text-box__text"]}>
              {text}
            </div>
          }
          {
            hintText &&
            <div className={styles["checkbox-wrapper__text-box__hint-text"]}>
              {hintText}
            </div>
          }
        </div>
      }
    </div>
  )
}
