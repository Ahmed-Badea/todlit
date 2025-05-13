import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import NoData from "../../../../design-system/components/NoData";
import InnerLayout from "../../../../views/layout/InnerLayout";
import PlanCard from "./components/Plan";
import { getPlans } from "../../../../services/inner-layout/plans";
import { Plan } from "../../../../types/inner-layout/plans";
import CreatePlan from "./components/Form/CreatePlan";
import styles from "./Plans.module.scss";

const Plans: React.FC = () => {
  const { t } = useTranslation();

  const { data: plans, error, isLoading, isFetching } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    onError: (err: Error) => console.error(err)
  });

  return (
    <InnerLayout isLoading={isLoading || isFetching} error={!!error} errorMessage={(error as Error)?.message}>
      <div className={styles.header}>
        <h3>{t("innerLayout.plans.title")}</h3>
        <CreatePlan />
      </div>
      <div className={styles.plansContainer}>
        {plans && plans.length > 0 ? (
          plans.map((plan: Plan) => <PlanCard key={plan.name} {...plan} />)
        ) : (
          <NoData />
        )}
      </div>
    </InnerLayout>
  );
};

export default Plans;
