import { AngelList } from "@design-system/assets/icons/digital_platforms/other";
import { getFromLocalStorage } from "@app/utils/manageLocalStorage";
import styles from "./business-info.module.scss";

const BusinessInfo = () => {
  return (
    <div className={styles["business-info"]}>
      {AngelList}
      <span>{getFromLocalStorage("nursery_name")}</span>
    </div>
  );
};

export default BusinessInfo;
