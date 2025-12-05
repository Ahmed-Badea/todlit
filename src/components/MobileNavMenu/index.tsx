import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bars, Xmark } from "../../design-system/assets/Icons/index";
import TODLIT from "../../assets/images/outerLayout/todlit.png";
import type { ISubLink } from "../../types/inner-layout/nav-links";
import { useNavigationStore } from "../../store/navigation";
// import { useUserInfoStore } from "../../store/userInfo";
import { INNER_ROUTES } from "../../routes/inner-routes";
import { navLinks } from "../../services/inner-layout/navbar";
import LangSwitcher from "../../components/LangSwitcher";
import BusinessInfoBox from "../BusinessInfoBox";
import NavItem from "../NavItem";
import ThemeToggle from "../ThemeToggle";
import styles from "./mobile-nav-menu.module.scss";
import ProfileMenu from "../ProfileMenu";

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const { activeLink } = useNavigationStore();
  const navigate = useNavigate();

  // const { userInfo } = useUserInfoStore();
  // const { logo, firstName, shortName, profileType } = userInfo;

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const expandBtnHandler = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const logoClickHandler = () => {
    navigate(INNER_ROUTES.DASHBOARD);
  };

  return (
    <>
      <nav className={styles["mobile-nav-container"]} data-mobile-nav-expanded={isMenuExpanded}>
        <div className={styles["mobile-nav-container__mobile-nav-menu"]}>
          <div className={styles["mobile-nav-container__mobile-nav-menu__logo"]} onClick={logoClickHandler}>
            <img src={TODLIT} alt="TODLIT" />
          </div>

          {
            !isMenuExpanded &&
            <div className={styles["mobile-nav-container__mobile-nav-menu__current-page"]}>
              {activeLink.sub || activeLink.nav}
            </div>
          }

          <div className={styles["mobile-nav-container__mobile-nav-menu__collapse-btn"]} onClick={expandBtnHandler}>
            {isMenuExpanded ? Xmark : Bars}
          </div>
        </div>

        {
          isMenuExpanded &&
          <>
            <div className={styles["mobile-nav-container__business-box"]}>
              <BusinessInfoBox />
            </div>

            <div className={styles["mobile-nav-container__nav-links"]}>
              {
                navLinks(t)
                  .filter(navLink => !navLink.hasSpecialAction)
                  .map((navLink, i: number) => {
                    return (
                      <NavItem
                        key={`nav-link-${i}`}
                        icon={navLink.icon}
                        label={navLink.label}
                        active={activeLink.nav === navLink.label}
                        route={navLink.route}
                        subItems={
                          navLink?.subLinks?.map((subLink: ISubLink) => ({
                            icon: subLink.icon,
                            label: subLink.label,
                            route: subLink.route,
                            active: activeLink.sub === subLink.label
                          }))
                        }
                        hasSubLinks={!!navLink?.subLinks}
                      />
                    )
                  })
              }
            </div>

            <div className={styles["mobile-nav-container__actions-box"]}>
              <ThemeToggle />
              <ProfileMenu mobView={true} />
              <LangSwitcher layout="inner" mobView={true} />
            </div>
          </>
        }
      </nav>
    </>
  )
}

export default MobileNavMenu;