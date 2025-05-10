import { Avatar } from "../../design-system";
import { useUserInfoStore } from "../../store/userInfo";
import styles from "./business-info-box.module.scss";

const BusinessInfoBox = () => {
  const { userInfo } = useUserInfoStore();

  const { logo, name, shortName } = userInfo;

  return (
    <div className={styles['business-info']}>
      <Avatar
        {
        ...(
          logo ?
            {
              type: 'img',
              imgUrl: logo
            }
            :
            {
              type: 'text',
              shortName: shortName
            }
        )
        }
        focusable={false}
      />
      <span>{name}</span>
    </div>
  )
};

export default BusinessInfoBox;