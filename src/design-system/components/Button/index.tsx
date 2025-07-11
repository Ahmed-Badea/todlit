import styles from "./button.module.scss";
import { IButton } from "../../types/Button/button";

export const Button = ({
  id,
  size = "lg",
  leadingIcon,
  trailingIcon,
  color = "primary",
  type = "button",
  variant = "contained",
  text,
  label,
  disabled = false,
  onClickHandler,
  onBlurHandler,
  loading = false,
}: IButton) => {
  return (
    <button
      id={id}
      className={styles["btn"]}
      data-btn-size={size}
      data-btn-color={color}
      data-btn-variant={variant}
      disabled={disabled || loading}
      onClick={onClickHandler}
      onBlur={onBlurHandler}
      type={type}
    >
      {loading ? (
        <span className={styles["btn__loading"]}>
          <span className={styles["spinner"]} />
          Loading...
        </span>
      ) : (
        <>
          {leadingIcon && leadingIcon}
          {label && <span className={styles["btn__label"]}>{label}</span>}
          {text && <span>{text}</span>}
          {trailingIcon && trailingIcon}
        </>
      )}
    </button>
  );
};
