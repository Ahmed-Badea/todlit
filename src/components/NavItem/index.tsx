import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@design-system/assets/icons/index";
import { Dropdown, DropdownMenu } from "@design-system";
import { INavItem } from "@app/types/innerLayout";
import { useNavigationStore } from "@app/store/navigation";
import { useClickOutside } from "@app/hooks/useClickOutside";
import { getVerticalPlacement } from "@app/utils/getPlacement";
import SubItem from "./SubItem";
import SubItemsList from "./SubItemsList";
import styles from "./nav-item.module.scss";

const NavItem = ({
  icon,
  label,
  active = false,
  route,
  subItems,
  collapsed,
  hasSubLinks,
}: INavItem) => {
  const navItemRef = useRef<any>();
  const { setActiveLink } = useNavigationStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(active);

  const dropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleNavItemClick = (label: string, hasSubLinks: boolean, route?: string) => {
    !hasSubLinks && setActiveLink({ nav: label, sub: "" });

    route && !hasSubLinks && navigate(route);
    dropdownToggle();
  };

  const NavItemInstance = () => <div className={styles["nav-item"]}
    data-nav-item-active={active}
    data-nav-item-open={isOpen}
    data-nav-item-collapsed={collapsed}
    tabIndex={0}
    onClick={() => handleNavItemClick(label, !!subItems, route)}
  >

    <div className={styles["nav-item__featured-icon"]}>{icon}</div>

    {label && !collapsed && <div className={styles["nav-item__label"]}>{label}</div>}

    {
      (hasSubLinks && !collapsed) &&
      <div className={styles["nav-item__chevron"]}>
        {ChevronRight}
      </div>
    }
  </div>;

  useClickOutside(navItemRef, closeDropdown, isOpen);

  return (
    <>
      {
        collapsed ?
          (
            subItems ?
              <Dropdown width="fit-content" closeOnClickOutside={false} ref={navItemRef} id={`navitem-dropdown-${label}`}>
                <NavItemInstance />
                <DropdownMenu
                  open={isOpen}
                  width="fit-content"
                  horizontalPlacement="start"
                  verticalPlacement={getVerticalPlacement(`navitem-dropdown-${label}`)}
                >
                  <SubItemsList
                    title={label}
                    subItems={subItems}
                    closeDropdown={closeDropdown}
                  />
                </DropdownMenu>
              </Dropdown>
              :
              <NavItemInstance />
          )
          :
          <NavItemInstance />
      }

      {
        isOpen && !collapsed && subItems?.map((_, index: number) => {
          return (
            <SubItem
              key={`sub-item-${index}`}
              subItems={subItems}
              index={index}
              navItemLabel={label}
            />
          )
        })
      }
    </>
  )
}

export default NavItem;