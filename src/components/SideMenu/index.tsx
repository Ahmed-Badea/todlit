import { useTranslation } from "react-i18next";
import { LeftToLine, RightToLine } from "../../design-system/assets/Icons/index";
import TODLIT from "../../assets/images/outerLayout/todlit.png";
import { navLinks } from "../../services/inner-layout/navbar";
import { ISideMenu } from "../../types/inner-layout";
import { useNavigationStore } from "../../store/navigation";
import NavItem from "../NavItem";
import styles from "./side-menu.module.scss";

const SideMenu = ({
  isSideMenuCollpased,
  setIsSideMenuCollpased
}: ISideMenu) => {
  const { t } = useTranslation();
  const { activeLink } = useNavigationStore();

  const collapseBtnClickHandler = () => {
    setIsSideMenuCollpased(!isSideMenuCollpased);
  };

  return (
    <aside
      className={styles["side-menu"]}
      data-side-menu-collapsed={isSideMenuCollpased}
    >
      <div
        className={styles["side-menu__collapse-expand-btn"]}
        onClick={collapseBtnClickHandler}
      >
        {isSideMenuCollpased ? RightToLine : LeftToLine}
      </div>

      <div className={styles["side-menu__logo"]}>
        {!isSideMenuCollpased && (
          <img src={TODLIT} alt="TODLIT" />
        )}
      </div>

      <div className={styles["side-menu__nav-links"]}>
        {navLinks(t)
          .filter((navLink) => !navLink.mobileOnlyLinks)
          .map((navLink, i: number) => (
            <NavItem
              key={`nav-link-${i}`}
              icon={navLink.icon}
              label={navLink.label}
              active={activeLink.nav === navLink.label}
              route={navLink.route}
              subItems={navLink?.subLinks?.map((subLink) => ({
                icon: subLink.icon as React.ReactElement<"svg"> | undefined,
                label: subLink.label,
                route: subLink.route,
                active: activeLink.sub === subLink.label
              }))}
              collapsed={isSideMenuCollpased}
              hasSubLinks={!!navLink?.subLinks}
            />
          ))}
      </div>

      <div className={styles["side-menu__footer"]}></div>
    </aside>
  );
};

export default SideMenu;
