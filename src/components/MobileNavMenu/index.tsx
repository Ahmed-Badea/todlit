import { useState } from "react";
import { useTranslation } from "react-i18next";
import TODLIT from "@app/assets/images/outerLayout/todlit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { navLinks } from "@app/services/inner-layout/navbar";
import { IMobileNavMenu } from "@app/types/innerLayout";
import BusinessInfo from "@app/components/BusinessInfo";
import ProfileMenu from "@app/components/ProfileMenu";
import LangSwitcher from "@app/components/LangSwitcher";
import NavItem from "../NavItem";
import styles from "./mobile-nav-menu.module.scss";

const MobileNavMenu = ({
  activeNavLink,
  activeSubLink,
  handleNavLinkClick,
  handleSubLinkClick
}: IMobileNavMenu) => {
  const { t } = useTranslation();

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const expandBtnHandler = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <>
      <nav
        className={styles["mobile-nav-container"]}
        data-mobile-nav-expanded={isMenuExpanded}
      >
        <div className={styles["mobile-nav-container__mobile-nav-menu"]}>
          <div className={styles["mobile-nav-container__mobile-nav-menu__logo"]}>
            <img src={TODLIT} alt="TODLIT" />
          </div>

          {!isMenuExpanded && (
            <div className={styles["mobile-nav-container__mobile-nav-menu__current-page"]}>
              {activeSubLink || activeNavLink}
            </div>
          )}

          <div className={styles["mobile-nav-container__mobile-nav-menu__collapse-btn"]} onClick={expandBtnHandler}>
            {isMenuExpanded ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </div>
        </div>

        {isMenuExpanded && (
          <>
            <div className={styles["mobile-nav-container__business-box"]}>
              <BusinessInfo />
            </div>

            <div className={styles["mobile-nav-container__nav-links"]}>
              {navLinks(t)
                .filter((navLink) => !navLink.hasSpecialAction)
                .map((navLink, i: number) => {
                  return (
                    <NavItem
                      key={`nav-link-${i}`}
                      icon={navLink.icon}
                      label={navLink.label}
                      active={activeNavLink === navLink.label}
                      route={navLink.route}
                      subItems={navLink?.subLinks?.map((subLink) => ({
                        icon: subLink.icon,
                        label: subLink.label,
                        route: subLink.route,
                        active: activeSubLink === subLink.label
                      }))}
                      hasSubLinks={!!navLink?.subLinks}
                      navLinkClickHandler={handleNavLinkClick}
                      subLinkClickHandler={handleSubLinkClick}
                    />
                  );
                })}
            </div>

            <div className={styles["mobile-nav-container__actions-box"]}>
              <ProfileMenu mobView={true} />
              <LangSwitcher layout="inner" mobView={true} />
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default MobileNavMenu;
