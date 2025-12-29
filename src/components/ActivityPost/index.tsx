import React from "react";
import { format } from "date-fns";
import { Avatar } from "../../design-system";
import styles from "./activityPost.module.scss";

interface ActivityField {
  field_name: string;
  field_type: string;
  value: string;
}

interface ActivityPostProps {
  id: number;
  student_name: string;
  teacher_name: string;
  activity_name: string;
  created_at: string;
  fields: ActivityField[];
  teacher_avatar?: string;
}

const ActivityPost: React.FC<ActivityPostProps> = ({
  student_name,
  teacher_name,
  activity_name,
  created_at,
  fields,
  teacher_avatar,
}) => {
  // Extract meal-related fields
  const getFieldValue = (fieldName: string) => {
    const field = fields.find(f =>
      f.field_name.toLowerCase().includes(fieldName.toLowerCase())
    );
    return field?.value || "-";
  };

  const mealType = getFieldValue("meal type");
  const mealTime = getFieldValue("meal time");
  const quantityEaten = getFieldValue("quantity eaten");
  const count = getFieldValue("count");

  // Format the date
  const formattedDate = format(new Date(created_at), "MMM dd, yyyy 'at' HH:mm");

  return (
    <div className={styles.activityPost}>
      <div className={styles.header}>
        <div className={styles.avatarSection}>
          {teacher_avatar ? (
            <Avatar
              type="img"
              imgUrl={teacher_avatar}
              name={teacher_name}
              size="md"
            />
          ) : (
            <Avatar
              type="text"
              shortName={teacher_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              size="md"
            />
          )}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.names}>
            <span className={styles.teacherName}>{teacher_name}</span>
            <span className={styles.activityType}>logged {activity_name} for</span>
            <span className={styles.studentName}>{student_name}</span>
          </div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.activityDetails}>
          {mealType !== "-" && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Meal Type:</span>
              <span className={styles.value}>{mealType}</span>
            </div>
          )}
          {mealTime !== "-" && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Meal Time:</span>
              <span className={styles.value}>{mealTime}</span>
            </div>
          )}
          {quantityEaten !== "-" && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Quantity Eaten:</span>
              <span className={styles.value}>{quantityEaten}</span>
            </div>
          )}
          {count !== "-" && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Count:</span>
              <span className={styles.value}>{count}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPost;