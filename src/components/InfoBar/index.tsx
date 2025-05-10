import type{ IInfoBar } from "../../types/inner-layout/info-bar";
import styles from "./info-bar.module.scss";

export const InfoBar = (
  { status = 'default', text }
    : IInfoBar
) => {
  return (
    text
    &&
    <div className={styles["info-bar"]} data-info-bar={status}>
      {text}
    </div>
  )
};