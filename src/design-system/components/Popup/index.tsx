import { PopupProps } from "../../types/Popup/popup";
import { Button } from"../Button";
import styles from "./popup.module.scss";
import { useEffect } from "react";

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent scroll on body when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll when modal closes
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        <div className={styles["popup-body-wrapper"]}>
          <div className={styles["popup-body"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};
