import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownMenu, DropdownMenuItem } from"../../design-system";
import { langLinks } from "../../services/inner-layout/navbar";
import { LangActions } from "../../types/inner-layout";
import useLangChange, { handleChangeLanguage } from "../../hooks/useLangChange";
import { useClickOutside } from "../../hooks/useClickOutside";
import { LangSwitcherProps } from "../../types";
import styles from "./lang-switcher.module.scss";

const LangSwitcher = ({ layout, mobView = false }: LangSwitcherProps ) => {
  const { t } = useTranslation();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useLangChange();

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useClickOutside(langDropdownRef, closeDropdown, isOpen);

  const langHandler: { [key in LangActions]: () => void } = {
    ar: () => handleChangeLanguage("ar"),
    en: () => handleChangeLanguage("en"),
  };

  return layout === "outer" ? (
    <div
      className={styles["lang-switcher"]}
      onClick={() => handleChangeLanguage()}
    >
      <FontAwesomeIcon icon={faGlobe} />
      <span>{t("outerLayout.language")}</span>
    </div>
  ) : (
    <div className={`${styles["lang-switcher"]} ${styles["inner"]}`}>
      <Dropdown status="default" ref={langDropdownRef}>
        <div className={styles["lang-button"]} onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faGlobe} />
          <span>{t("innerLayout.language")}</span>
        </div>
        <DropdownMenu
          open={isOpen}
          horizontalPlacement="end"
          verticalPlacement= {mobView ? "top" : "bottom"}
          width="fit-content"
        >
          {langLinks(t).map((item, i: number) => {
            return (
              <DropdownMenuItem
                key={`lang-item-${i}`}
                text={item.label}
                icon={item.icon}
                onClickHandler={langHandler[item.lang]}
              />
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default LangSwitcher;
