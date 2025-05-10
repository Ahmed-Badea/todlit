import { Avatar } from "../../design-system";
import { ArrowRightFromBracket } from "../../design-system/assets/Icons/index";
import type { IAccountBar, IImgAccountBar, ITextAccountBar } from "../../types/inner-layout/account-bar";
import styles from "./account-bar.module.scss";

export const AccountBar = (props: IAccountBar) => {

  const { collapsed = false, handlers, role, type = "placeholder", userName } = props;

  const { logout, editProfile, toggleAccountBox } = handlers;

  let content = <></>;

  if (type === 'img') {
    const { imgUrl } = props as IImgAccountBar;

    content = <Avatar
      type="img"
      imgUrl={imgUrl}
      name={userName}
      focusable={collapsed}
    />
  } else if (type === 'text') {
    const { userShortName } = props as ITextAccountBar;

    content = <Avatar
      type="text"
      shortName={userShortName}
      focusable={collapsed}
    />
  } else {
    content = <Avatar
      focusable={collapsed}
    />
  }

  return (
    <div className={styles["account-bar"]}>
      <div className={styles["account-bar__avatar"]}
        data-account-bar-avatar-type={type}
        onClick={collapsed ? toggleAccountBox : editProfile}
      >
        {content}
      </div>

      {
        !collapsed &&
        <>
          <div className={styles["account-bar__info"]} onClick={editProfile}>
            <div className={styles["account-bar__info__name"]}>{userName}</div>
            <div className={styles["account-bar__info__role"]}>{role}</div>
          </div>

          <div className={styles["account-bar__logout"]} onClick={logout}>
            {ArrowRightFromBracket}
          </div>
        </>
      }
    </div>
  )
};