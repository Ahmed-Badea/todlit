import { PopupProps } from "../../types/Popup/popup";
import { Button } from"../Button";
import styles from "./popup.module.scss";

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles["popup-overlay"]} onClick={onClose}>
      <div
        className={styles["popup-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["popup-header"]}>
          <h2>{title}</h2>
          <Button
            id="closeButton"
            size="md"
            color="secondary"
            variant="outlined"
            text="×"
            onClickHandler={onClose}
          />
        </div>
        <div className={styles["popup-body"]}>{children}</div>
      </div>
    </div>
  );
};
