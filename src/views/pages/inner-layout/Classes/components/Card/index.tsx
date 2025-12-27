import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import FormWrapper from "../../../../../../components/FormWrapper";
import { updateClass } from "../../../../../../services/inner-layout/classes";
import { formConfig } from "../Form/classConfig";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.scss";

interface CardProps {
  id: string;
  roomName: string;
  students: number;
  staff: number;
  capacity?: number;
  minAge?: string;
  maxAge?: string;
  branch?: string;
  status?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  roomName,
  students,
  staff,
  capacity,
  minAge,
  maxAge,
  branch,
  status,
}) => {
  const { t } = useTranslation();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditPopupOpen = () => {
    setIsEditPopupOpen(true);
  };

  const handleEditPopupClose = () => {
    setIsEditPopupOpen(false);
  };

  const formData = {
    id,
    name: roomName,
    capacity: capacity?.toString() || '',
    min_age: minAge || '',
    max_age: maxAge || '',
    branch: branch || '',
    status: status || '',
  };

  const updatedFormConfig = formConfig.map((field) => ({
    ...field,
    value: formData[field.name as keyof typeof formData] || '',
    isValid: formData[field.name as keyof typeof formData] ? true : undefined,
  }));

  // Navigate to students page with class filter
  const handleNavigateToStudents = () => {
    navigate(`/students?class=${roomName}`); // Adjust the route as needed
  };

  // Navigate to staff page with class filter
  const handleNavigateToStaff = () => {
    navigate(`/staff?class=${roomName}`); // Adjust the route as needed
  };

  return (
    <div className={styles["card"]}>
      <div className={styles["card-header"]}>
        <h3>{roomName}</h3>
        <div className={styles["buttons-container"]}>
          <FontAwesomeIcon
            icon={faEdit}
            className={styles["edit-icon"]}
            onClick={handleEditPopupOpen}
          />
        </div>
      </div>
      <p onClick={handleNavigateToStudents} className={styles["clickable"]}>
        {t("innerLayout.classes.students")}: {students}
      </p>
      <p onClick={handleNavigateToStaff} className={styles["clickable"]}>
        {t("innerLayout.classes.staff")}: {staff}
      </p>
      <p>{t("innerLayout.classes.capacity")}: {capacity}</p>
      <p>{t("innerLayout.classes.minAge")}: {minAge}</p>
      <p>{t("innerLayout.classes.maxAge")}: {maxAge}</p>
      <p>{t("innerLayout.classes.status")}: {status}</p>

      <FormWrapper
        mode="popup"
        title="Update Class"
        fieldsConfig={updatedFormConfig}
        submitFn={(data) => updateClass(id, data)}
        successMessage="Class updated successfully"
        onClose={handleEditPopupClose}
        isOpen={isEditPopupOpen}
      />
    </div>
  );
};

export default Card;
