import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import InnerLayout from "../../../../views/layout/InnerLayout";
import PlanCard from "./components/Plan";
import { getPlans } from "../../../../services/inner-layout/plans";
import CreatePlan from "./components/Form/CreatePlan";
import styles from "./Plans.module.scss";

const Plans: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const { data: plans, error, isLoading, isFetching } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans
  });

  return (
    <InnerLayout isLoading={isLoading || isFetching} error={error} errorMessage={error?.message}>
      <div className={styles.header}>
        <h3>{t("innerLayout.plans.title")}</h3>
        <CreatePlan />
      </div>
      <div className={styles.plansContainer}>
        {plans?.map((plan) => (
          <PlanCard key={plan.name} {...plan} />
        ))}
      </div>
    </InnerLayout>
  );
};

export default Plans;
