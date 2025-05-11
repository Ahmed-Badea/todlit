import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Tabs } from"../../../../../../design-system";
import InnerLayout from "../../../../../../views/layout/InnerLayout";
import Profile from "../Tabs/Profile";
import Attendance from "../Tabs/Attendance";
import Billing from "../Tabs/Billing";
import Documents from "../Tabs/Documents";
import { getStudents } from "../../../../../../services/inner-layout/students";

const StudentsDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isFetching, error } = useQuery(
    ["fetchStudent", id],
    () => getStudents({ student_id: id! }),
    {
      enabled: !!id,
    }
  );

  const fullName = data ? `${data.first_name} ${data.last_name}` : "";

  const tabs = [
    { label: t("innerLayout.students.tabs.profile"), content: <Profile formData={data} id={id ?? null} />},
    { label: t("innerLayout.students.tabs.attendance"), content: <Attendance /> },
    { label: t("innerLayout.students.tabs.billing"), content: <Billing /> },
    { label: t("innerLayout.students.tabs.documents"), content: <Documents /> },
  ];

  return (
    <InnerLayout isLoading={isLoading || isFetching} error={!!error} errorMessage={(error as Error)?.message}>
      <h3>{fullName}</h3>
      <Tabs tabs={tabs} />
    </InnerLayout>
  );
};

export default StudentsDetails;
