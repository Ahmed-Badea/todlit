import styles from "./badge.module.scss";
import { IBadge } from "../../types/Badge/badge";

export const Badge = ({
  leadingIcon,
  trailingIcon,
  type = "default",
  color = "primary",
  size = "sm",
  text
}: IBadge) => {
  return (
    <div className={styles["badge"]} data-badge-type={type} data-badge-color={color} data-badge-size={size}>
      {leadingIcon && leadingIcon}
      {text && text}
      {trailingIcon && trailingIcon}
    </div>
  )
}
