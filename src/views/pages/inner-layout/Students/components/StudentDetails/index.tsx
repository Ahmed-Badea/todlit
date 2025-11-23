import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { TabsGroup } from "../../../../../../design-system/components/Tabs/TabsGroup";
import InnerLayout from "../../../../../../views/layout/InnerLayout";
import Profile from "../Tabs/Profile";
import Attendance from "../Tabs/Attendance";
import Billing from "../Tabs/Billing";
import Documents from "../Tabs/Documents";
import { getStudents } from "../../../../../../services/inner-layout/students";
import styles from "./student-details.module.scss";
import { Button } from "../../../../../../design-system";

const StudentsDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState(0);

  const { data, isLoading, isFetching, error } = useQuery(
    ["fetchStudent", id],
    () => getStudents({ student_id: id! }),
    {
      enabled: !!id,
    }
  );

  const fullName = data ? `${data.first_name} ${data.last_name}` : "";

  const tabsProps = [
    { tabLabel: t("innerLayout.students.tabs.profile"), active: activeTab === 0, onClickHandler: () => setActiveTab(0) },
    { tabLabel: t("innerLayout.students.tabs.attendance"), active: activeTab === 1, onClickHandler: () => setActiveTab(1) },
    { tabLabel: t("innerLayout.students.tabs.billing"), active: activeTab === 2, onClickHandler: () => setActiveTab(2) },
    { tabLabel: t("innerLayout.students.tabs.documents"), active: activeTab === 3, onClickHandler: () => setActiveTab(3) },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Profile formData={data} id={id ?? null} />;
      case 1:
        return <Attendance />;
      case 2:
        return <Billing />;
      case 3:
        return <Documents />;
      default:
        return <Profile formData={data} id={id ?? null} />;
    }
  };

  return (
    <InnerLayout
      isLoading={isLoading || isFetching}
      error={!!error}
      errorMessage={(error as Error)?.message}
    >
      <div className={styles["header"]}>
        <Button
          variant="link"
          text={t("innerLayout.students.title")}
          onClickHandler={() => window.location.assign('/students')}
        />
        <span>/</span>
        <h4>{fullName}</h4>
      </div>

      <TabsGroup type="line" orientation="horizontal" tabsProps={tabsProps} />

      <div className={styles["tab-content"]}>{renderTabContent()}</div>
    </InnerLayout>
  );
};

export default StudentsDetails;
