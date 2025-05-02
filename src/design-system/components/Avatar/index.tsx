// import { User } from "../icons/index";
import type { IAvatar, IImgAvatar, INameAvatar } from "../../types/Avatar";
import styles from "./avatar.module.scss";

export const Avatar = (props: IAvatar) => {

  const { size = "lg", type = "placeholder", focusable = true } = props;

  let content = <></>;

  if (type === 'img') {
    const { imgUrl, name } = props as IImgAvatar;

    content = <img src={imgUrl} alt={name || "user image"} />
  } else if (type === 'text') {
    const { shortName } = props as INameAvatar;

    content = <div>{shortName}</div>
  } else {
    // content = User;
  }

  return (
    <div
      className={styles["avatar"]}
      data-avatar-size={size}
      data-avatar-type={type}
      {...(focusable ? { tabIndex: 0 } : {})}
    >
      {content}
    </div>
  )
}
