import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LeftToLine, RightToLine } from '../../design-system/assets/Icons/index';
import TODLIT from "../../assets/images/outerLayout/todlit.png";
import { INNER_ROUTES } from '../../routes/inner-routes';
import { useNavigationStore } from '../../store/navigation';
import { navLinks } from '../../services/inner-layout/navbar';
import type { ISideMenu } from '../../types/inner-layout/side-menu';
import type { ISubLink } from '../../types/inner-layout/nav-links';
import NavItem from '../NavItem';
import styles from "./side-menu.module.scss";


const SideMenu = (
  { isSideMenuCollpased, setIsSideMenuCollpased }
    : ISideMenu
) => {
  const { t } = useTranslation();
  const { activeLink } = useNavigationStore();
  const navigate = useNavigate();

  const collapseBtnClickHandler = () => {
    setIsSideMenuCollpased(!isSideMenuCollpased)
  };

  const logoClickHandler = () => {
    navigate(INNER_ROUTES.DASHBOARD);
  };

  return (
    <aside
      className={styles["side-menu"]}
      data-side-menu-collapsed={isSideMenuCollpased}
    >

      <div className={styles["side-menu__collapse-expand-btn"]} onClick={collapseBtnClickHandler}>
        {isSideMenuCollpased ? RightToLine : LeftToLine}
      </div>

      <div className={styles["side-menu__logo"]} onClick={logoClickHandler}>
        {!isSideMenuCollpased && <img src={TODLIT} alt="TODLIT" />}
      </div>

      <div className={styles["side-menu__nav-links"]}>
        {
          navLinks(t)
            .filter(navLink => !navLink.mobileOnlyLinks)
            .map((navLink, i: number) => {
              return (
                <NavItem
                  key={`nav-link-${i}`}
                  icon={navLink.icon}
                  label={navLink.label}
                  route={navLink.route}
                  active={activeLink.nav === navLink.label}
                  subItems={
                    navLink?.subLinks?.map((subLink: ISubLink) => ({
                      icon: subLink.icon,
                      label: subLink.label,
                      route: subLink.route,
                      active: activeLink.sub === subLink.label
                    }))
                  }
                  collapsed={isSideMenuCollpased}
                  hasSubLinks={!!navLink?.subLinks}
                />
              )
            })
        }
      </div>

    </aside>
  )
}

export default SideMenu;