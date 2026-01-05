import React from "react";
import { format } from "date-fns";
import { Avatar } from "../../design-system";
import { getServerUrl } from "../../utils/serverUrls";
import styles from "./activityPost.module.scss";

interface FieldResponse {
  id: number;
  field: number;
  value: string;
  field_name: string;
}

interface MediaItem {
  id: number;
  file: string;
  is_video: boolean;
  uploaded_at: string;
}

interface ActivityPostProps {
  performed_at: string;
  notes: string;
  field_responses: FieldResponse[];
  media: MediaItem[];
  teacher_name?: string;
  teacher_avatar?: string;
}

const ActivityPost: React.FC<ActivityPostProps> = ({
  performed_at,
  notes,
  field_responses = [],
  media = [],
  teacher_name = "Teacher",
  teacher_avatar,
}) => {
  const formattedDate = format(new Date(performed_at), "MMM dd, yyyy 'at' HH:mm");

  const getMediaUrl = (file: string) => {
    return file.startsWith('http') ? file : `${getServerUrl()}${file}`;
  };

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
          </div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
      </div>

      <div className={styles.content}>
        {media && media.length > 0 && (
          <div className={styles.mediaSection}>
            {media.length === 1 ? (
              <div className={styles.firstMediaItem}>
                {media[0].is_video ? (
                  <video
                    src={getMediaUrl(media[0].file)}
                    controls
                    className={styles.mediaContent}
                  />
                ) : (
                  <img
                    src={getMediaUrl(media[0].file)}
                    alt="Activity media"
                    className={styles.mediaContent}
                  />
                )}
              </div>
            ) : (
              <div className={styles.mediaGrid}>
                {media.map((item) => (
                  <div key={item.id} className={styles.mediaItem}>
                    {item.is_video ? (
                      <video
                        src={getMediaUrl(item.file)}
                        controls
                        className={styles.mediaContent}
                      />
                    ) : (
                      <img
                        src={getMediaUrl(item.file)}
                        alt="Activity media"
                        className={styles.mediaContent}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {notes && (
          <div className={styles.notes}>
            <p>{notes}</p>
          </div>
        )}

        {field_responses && field_responses.length > 0 && (
          <div className={styles.activityDetails}>
            {field_responses.map((field) => (
              <div key={field.id} className={styles.detailItem}>
                <span className={styles.label}>{field.field_name}</span>
                <span className={styles.value}>{field.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityPost;
