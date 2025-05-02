import { ISubItemsList } from "../../../types/inner-layout";
import styles from "../nav-item.module.scss";
import SubItem from "../SubItem";

const SubItemsList = ({
  title,
  subItems,
  closeDropdown
}: ISubItemsList) => {
  return (
    <div className={styles["sub-items-list"]}>
      {title && <div className={styles["sub-items-list__title"]}>{title}</div>}
      {subItems?.map((_, index: number) => {
        return (
          <SubItem
            subItems={subItems}
            index={index}
            navItemLabel={title as string}
            closeDropdown={closeDropdown}
          />
        );
      })}
    </div>
  );
};

export default SubItemsList;
