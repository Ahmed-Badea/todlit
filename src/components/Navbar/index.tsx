import BusinessInfoBox from "../BusinessInfoBox";
import ProfileMenu from "../ProfileMenu";
import LangSwitcher from "../LangSwitcher";
import ThemeToggle from "../ThemeToggle";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <BusinessInfoBox />
      <div className={styles["__actions-box"]}>
        <ThemeToggle />
        <ProfileMenu />
        <LangSwitcher layout="inner" />
      </div>
    </nav>
  );
};

export default Navbar;
