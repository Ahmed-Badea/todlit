import type { IAccountBar } from "../../../types/inner-layout";
import styles from "./profile-button.module.scss";

const ProfileButton = ({
  handlers,
  userInfo = { avatarType: 'name' }
}: IAccountBar) => {
  const { avatarType, userName, userShortName, role, imgUrl } = userInfo;
  const { toggleAccountBox } = handlers;

  return (
    <div className={styles["account-bar"]} onClick={toggleAccountBox}>
      <div
        className={styles["account-bar__avatar"]}
        data-account-bar-avatar-type={avatarType}
        aria-label="Toggle user menu"
      >
        {avatarType === 'image' ? (
          <img
            src={imgUrl}
            alt={`${userName || userShortName}'s avatar`}
          />
        ) : (
          <span>{userShortName}</span>
        )}
      </div>

      <div
        className={styles["account-bar__info"]}
        aria-label="Edit profile"
      >
        <div className={styles["account-bar__info__name"]}>{userName}</div>
        <div className={styles["account-bar__info__role"]}>{role}</div>
      </div>
    </div>
  );
};

export default ProfileButton;