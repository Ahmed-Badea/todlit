import BusinessInfo from "@app/components/BusinessInfo";
import ProfileMenu from "@app/components/ProfileMenu";
import LangSwitcher from "@app/components/LangSwitcher";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <BusinessInfo />
      <div className={styles["__actions-box"]}>
        <ProfileMenu />
        <LangSwitcher layout="inner" />
      </div>
    </nav>
  );
};

export default Navbar;
