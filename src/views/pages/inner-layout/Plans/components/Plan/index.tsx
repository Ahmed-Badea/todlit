import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import FormWrapper from "../../../../../../components/FormWrapper";
import { updatePlan } from "../../../../../../services/inner-layout/plans";
import { formConfig } from "../Form/planConfig";
import { formatTime } from "../../../../../../utils/dateFormats";
import { Plan } from "../../../../../../types/inner-layout/plans";
import styles from "./plan.module.scss";

const PlanCard: React.FC<Plan> = ({
  id,
  name,
  monthly_fee,
  start_shift,
  end_shift,
  program_color,
  late_checkout_time,
  late_checkout_fees,
}) => {
  const { t } = useTranslation();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleEditPopupOpen = () => {
    setIsEditPopupOpen(true);
  };

  const handleEditPopupClose = () => {
    setIsEditPopupOpen(false);
  };

  const formatTimeForForm = (timeString: string | null | undefined) => {
    if (!timeString) return new Date();
    
    // If it's already a time string like "14:30", convert to Date
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours) || 0, parseInt(minutes) || 0, 0, 0);
    return date;
  };

  const formData = {
    id,
    name,
    monthly_fee: monthly_fee?.toString() || '',
    start_shift: formatTimeForForm(start_shift),
    end_shift: formatTimeForForm(end_shift),
    program_color: program_color || '#ffffff',
    late_checkout_time: late_checkout_time ? formatTimeForForm(late_checkout_time) : new Date(),
    late_checkout_fees: late_checkout_fees?.toString() || '',
  };

  const updatedFormConfig = formConfig.map((field) => ({
    ...field,
    value: formData[field.name as keyof typeof formData] || '',
    isValid: formData[field.name as keyof typeof formData] ? true : undefined,
  }));
  return (
    <>
      <div
        className={styles["plan-card"]}
        style={{ borderLeftColor: program_color }}
      >
        <div className={styles["plan-header"]}>
          <h3 className={styles["plan-name"]}>{name}</h3>
          <FontAwesomeIcon
            icon={faEdit}
            className={styles["edit-icon"]}
            onClick={handleEditPopupOpen}
          />
        </div>
        <p className={styles["plan-fees"]}>{t('innerLayout.plans.fees')}: {monthly_fee || "-"} EGP</p>
        <p className={styles["plan-shift"]}>
          {t('innerLayout.plans.shift')}: {formatTime(start_shift)} - {formatTime(end_shift)}
        </p>
        {late_checkout_time && late_checkout_fees && (
          <p className={styles["plan-late-checkout"]}>
            {t('innerLayout.plans.lateCheckout')}: {formatTime(late_checkout_time)} ({late_checkout_fees} EGP)
          </p>
        )}
      </div>

      <FormWrapper
        mode="popup"
        title={t('innerLayout.plans.updatePlan')}
        fieldsConfig={updatedFormConfig}
        submitFn={(data) => updatePlan(id!, data)}
        successMessage={t('innerLayout.plans.planUpdated')}
        onClose={handleEditPopupClose}
        isOpen={isEditPopupOpen}
      />
    </>
  );
};

export default PlanCard;
