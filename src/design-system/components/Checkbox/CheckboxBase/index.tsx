import { useEffect, useState, type FocusEvent } from "react";
import type { IChechboxBase, IChechboxBaseInternalProps } from "libs/design-system/src/types/checkbox/checkbox_base";
import styles from "./checkbox-base.module.scss";

export const CheckboxBase = ({
  id,
  size = "sm",
  icon = "dash",
  checked = false,
  disabled = false,
  onChangeHandler,
  ...internalProps
}: IChechboxBase) => {

  const { hovered = false, focused = false } = internalProps as IChechboxBaseInternalProps;

  const [isHovered, setIsHovered] = useState(hovered);
  const [isFocused, setIsFocused] = useState(focused);
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsHovered(hovered);
  }, [hovered]);

  useEffect(() => {
    setIsFocused(focused);
  }, [focused]);

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

  useEffect(() => {
    onChangeHandler?.(isChecked);
  }, [isChecked]);

  return (
    <div
      className={styles["checkbox-base"]}
      data-checkbox-base-size={size}
      data-checkbox-base-icon={icon}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      onFocusCapture={onFocusHandler}
      onBlurCapture={onBlurHandler}
      tabIndex={0}
    >
      <input
        id={id}
        type="checkbox"
        className={styles["checkbox-base__input"]}
        checked={isChecked}
        disabled={disabled}
        onChange={() => { }}
      />
      <label
        htmlFor={id}
        className={styles["checkbox-base__checkbox"]}
        data-checkbox-base-hovered={isHovered}
        data-checkbox-base-focused={isFocused}
        tabIndex={0}
      ></label>
    </div>
  )
}
