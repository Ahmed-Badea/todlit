import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Popup } from"../../../../../../design-system";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Card.module.scss";

interface CardProps {
  roomName: string;
  students: number;
  activeStudents: number;
  staff: number;
  activeStaff: number;
  capacity?: number;
  minAge?: string;
  maxAge?: string;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  roomName,
  students,
  activeStudents,
  staff,
  activeStaff,
  capacity,
  minAge,
  maxAge,
  onDelete,
}) => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDeletePopupOpen = () => {
    setIsDeletePopupOpen(true);
  };

  const handleDeletePopupClose = () => {
    setIsDeletePopupOpen(false);
  };

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
            icon={faTrash}
            className={styles["delete-icon"]}
            onClick={handleDeletePopupOpen}
          />
        </div>
      </div>
      <p onClick={handleNavigateToStudents} className={styles["clickable"]}>
        {students} Students | {activeStudents} Active
      </p>
      <p onClick={handleNavigateToStaff} className={styles["clickable"]}>
        {staff} Staff | {activeStaff} Active
      </p>
      <p>Capacity: {capacity}</p>
      <p>Min Age: {minAge}</p>
      <p>Max Age: {maxAge}</p>

      <Popup
        isOpen={isDeletePopupOpen}
        onClose={handleDeletePopupClose}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete {roomName}?</p>
        <div className={styles["popup-buttons"]}>
          <Button
            size="md"
            color="primary"
            variant="contained"
            text="Yes, Delete"
            onClickHandler={() => {
              onDelete();
              handleDeletePopupClose();
            }}
          />
          <Button
            size="md"
            color="secondary"
            variant="outlined"
            text="Cancel"
            onClickHandler={handleDeletePopupClose}
          />
        </div>
      </Popup>
    </div>
  );
};

export default Card;
