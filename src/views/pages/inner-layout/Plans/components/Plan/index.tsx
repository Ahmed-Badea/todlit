import React from "react";
import styles from "./plan.module.scss";

interface PlanProps {
  name: string;
  fees: string;
  start_shift: string;
  end_shift: string;
  program_color: string;
  late_checkout_time: string;
  late_checkout_fees: string;
}

const PlanCard: React.FC<PlanProps> = ({
  name,
  fees,
  start_shift,
  end_shift,
  program_color,
  late_checkout_time,
  late_checkout_fees,
}) => {
  return (
    <div className={styles["plan-card"]} style={{ borderLeftColor: program_color }}>
      <h3 className={styles["plan-name"]}>{name}</h3>
      <p className={styles["plan-fees"]}>Fees: EGP {fees}</p>
      <p className={styles["plan-shift"]}>
        Shift: {start_shift} - {end_shift}
      </p>
      <p className={styles["plan-late-checkout"]}>
        Late Checkout: {late_checkout_time} (EGP {late_checkout_fees})
      </p>
    </div>
  );
};

export default PlanCard;
