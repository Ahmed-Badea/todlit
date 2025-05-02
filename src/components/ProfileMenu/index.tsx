import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownMenu, DropdownMenuItem } from"../../design-system";
import { useClickOutside } from "../../hooks/useClickOutside";
import { accountBarLinks } from "../../services/inner-layout/navbar";
import { ProfileActions } from "../../types/inner-layout";
import { getFromLocalStorage } from "../../utils/manageLocalStorage";
import { UserInfo } from "../../types/inner-layout";
import { logout } from "../../utils/auth/logout";
import ProfileButton from "../ProfileMenu/ProfileButton";
import styles from "./profile-menu.module.scss";

const ProfileMenu = ({ mobView = false }: { mobView?: boolean }) => {
  const { t } = useTranslation();
  const profileDropdownRef = useRef<any>("profileDropdownRef");

  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userName: "",
    userShortName: "",
    role: "",
    imgUrl: "",
    avatarType: "name",
  });

  useEffect(() => {
    const firstName = getFromLocalStorage("first_name") || "";
    const lastName = getFromLocalStorage("last_name") || "";
    const userName = `${firstName} ${lastName}`;
    const userShortName = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;

    setUserInfo((prev) => ({
      ...prev,
      userName,
      userShortName,
      role: "Admin",
    //   imgUrl: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
    //   avatarType: imgUrl ? "image" : "name",
    avatarType: "name",
    }));
  }, []);

  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const editProfileHandler = () => {
    console.log("Edit profile");
  };

  const logoutHandler = () => {
    console.log("Log out");
    logout();
  };

  const profileHandler: { [key in ProfileActions]: () => void } = {
    "edit-profile": editProfileHandler,
    logout: logoutHandler,
  };

  useClickOutside(profileDropdownRef, closeDropdown, isOpen);

  return (
    <>
      <div className={styles["profile-menu"]}>
        <Dropdown status="default" ref={profileDropdownRef}>
          <ProfileButton
            handlers={{ toggleAccountBox: toggleDropdown }}
            userInfo={userInfo}
          />
          <DropdownMenu
            open={isOpen}
            // type="account"
            // userInfo={userInfo}
            horizontalPlacement="end"
            verticalPlacement={mobView ? "top" : "bottom"}
            width="fit-content"
          >
            {accountBarLinks(t).map((item, i: number) => (
              <DropdownMenuItem
                text={item.label}
                icon={item.icon}
                onClickHandler={profileHandler[item.action]}
                key={`profile-item-${i}`}
              />
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default ProfileMenu;
