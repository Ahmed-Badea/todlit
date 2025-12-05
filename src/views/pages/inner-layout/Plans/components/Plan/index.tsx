import React from "react";
import { formatTime } from "../../../../../../utils/dateFormats";
import { Plan } from "../../../../../../types/inner-layout/plans";
import styles from "./plan.module.scss";

const PlanCard: React.FC<Plan> = ({
  name,
  fees,
  start_shift,
  end_shift,
  program_color,
  late_checkout_time,
  late_checkout_fees,
}) => {
  return (
    <div
      className={styles["plan-card"]}
      style={{ borderLeftColor: program_color }}
    >
      <h3 className={styles["plan-name"]}>{name}</h3>
      <p className={styles["plan-fees"]}>Fees: EGP {fees}</p>
      <p className={styles["plan-shift"]}>
        Shift: {formatTime(start_shift)} - {formatTime(end_shift)}
      </p>
      {late_checkout_time && late_checkout_fees && (
        <p className={styles["plan-late-checkout"]}>
          Late Checkout: {formatTime(late_checkout_time)} (EGP {late_checkout_fees})
        </p>
      )}
    </div>
  );
};

export default PlanCard;
