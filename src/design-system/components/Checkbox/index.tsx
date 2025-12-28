import { useState, useEffect, cloneElement, type FocusEvent, isValidElement } from "react";
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

  const safeChecked = typeof checked === 'boolean' ? checked : false;

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(safeChecked);

  useEffect(() => {
    setIsChecked(safeChecked);
  }, [safeChecked]);

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
      const textValue = typeof text === 'string' ? text : undefined;
      const hintValue = typeof hintText === 'string' ? hintText : undefined;
      const value = textValue || hintValue;
      onClickHandler?.(!prevState, value);
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
            onChangeHandler={(checked) => {
              const textValue = typeof text === 'string' ? text : undefined;
              const hintValue = typeof hintText === 'string' ? hintText : undefined;
              const value = textValue || hintValue;
              onChangeHandler?.(checked, value);
            }}
          />, { hovered: isHovered, focused: isFocused }
        )
      }

      {
        (text || hintText) &&
        <div className={styles["checkbox-wrapper__text-box"]}>
          {
            text &&
            <div className={styles["checkbox-wrapper__text-box__text"]}>
              {typeof text === 'string' ? text : ''}
            </div>
          }
          {
            hintText &&
            <div className={styles["checkbox-wrapper__text-box__hint-text"]}>
              {typeof hintText === 'string' || isValidElement(hintText) ? hintText : ''}
            </div>
          }
        </div>
      }
    </div>
  )
}
