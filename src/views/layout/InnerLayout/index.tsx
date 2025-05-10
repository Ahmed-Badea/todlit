import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { IInnerLayout } from '../../../types/inner-layout';
import { MOBILE_BREAKPOINT } from '../../../constants/break-points';
import useScreenWidth from '../../../hooks/useScreenWidth';
import MobileNavMenu from '../../../components/MobileNavMenu';
import SideMenu from '../../../components/SideMenu';
import Navbar from '../../../components/Navbar';
import { Loading, ErrorPage } from '../../../design-system'
import { getClasses } from "../../../services/inner-layout/classes";
import { useClassesStore } from '../../../store/classes';
import { useUserInfoStore } from '../../../store/userInfo';
import { userInfo as userData } from "../../../utils/auth/userInfo";
import styles from './inner-layout.module.scss';

const InnerLayout: React.FC<IInnerLayout> = ({ children, isLoading, error, errorMessage }) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < MOBILE_BREAKPOINT;
  const [isSideMenuCollpased, setIsSideMenuCollpased] = useState(false);

  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    setUserInfo({ ...userData() });
  }, [setUserInfo]);

  const { data: classrooms, isLoading: isLoadingClassrooms } = useQuery('classrooms', getClasses);
  
  const { setClasses } = useClassesStore();

  useEffect(() => {
    if (classrooms) {
      setClasses(classrooms);
    }
  }, [classrooms, setClasses]);

  

  const renderContent = () => {
    if (isLoadingClassrooms || isLoading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorPage text={errorMessage || "Something went wrong!"} />;
    }

    return children;
  };

  return (
    <div className={styles['inner-layout']} data-is-side-menu-collapsed={isSideMenuCollpased}>
      {!isMobile ? (
        <>
          <SideMenu
            isSideMenuCollpased={isSideMenuCollpased}
            setIsSideMenuCollpased={setIsSideMenuCollpased}
          />
          <div className={styles['inner-layout__main-wrapper']}>
            <Navbar />
            <main>{renderContent()}</main>
          </div>
        </>
      ) : (
        <>
          <MobileNavMenu />
          <main className={styles['inner-layout__mob-wrapper']}>{renderContent()}</main>
        </>
      )}
    </div>
  );
};

export default InnerLayout;
