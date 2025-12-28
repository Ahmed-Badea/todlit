import styles from "./button.module.scss";
import { IButton } from "../../types/Button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
  style,
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
      style={style}
    >
      <>
        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : leadingIcon}
        {label && <span className={styles["btn__label"]}>{label}</span>}
        {text && <span>{text}</span>}
        {!loading && trailingIcon && trailingIcon}
      </>
    </button>
  );
};
