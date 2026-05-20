import { useNavigate } from "react-router-dom";
import { IBreadcrumbsProps } from "../../types/Breadcrumbs/breadcrumbs";
import styles from "./breadcrumbs.module.scss";

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isClickable = !isLast && (item.path || item.onClick);
        return (
          <span key={index} className={styles.item}>
            {isClickable ? (
              <button
                className={styles.link}
                onClick={() => item.onClick ? item.onClick() : navigate(item.path!)}
              >
                {item.label}
              </button>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
            {!isLast && <span className={styles.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
};
