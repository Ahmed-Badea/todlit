import { useNavigate } from "react-router-dom";
import { ISubItem } from "../../../types/innerLayout";
import { useNavigationStore } from "../../../store/navigation";
import styles from "../nav-item.module.scss";

const SubItem = ({
  subItems,
  index,
  navItemLabel,
  closeDropdown
}: ISubItem) => {
  const navigate = useNavigate();
  const { setActiveLink }  = useNavigationStore();
  const item = subItems[index];

  const handleSubItemClick = (
    label: string,
    route: string,
  ) => {
    setActiveLink({ nav: navItemLabel, sub: label });
    closeDropdown?.();
    route && navigate(route);
  };

  return (
    <div
      className={`${styles["sub-item"]} ${
        index === subItems.length - 1 ? styles["sub-item--last"] : ""
      }`}
      data-sub-item-active={item.active}
      key={`sub-item-${index}`}
      tabIndex={index + 1}
      onClick={() =>
        handleSubItemClick(
          item.label,
          item.route
        )
      }
    >
      {item.icon}
      {item.label}
    </div>
  );
};

export default SubItem;
