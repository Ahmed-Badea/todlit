import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Button, Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem } from "../../../../../../../design-system";
import { getPlans } from "../../../../../../../services/inner-layout/plans";
import PlanCard from "../../../../Plans/components/Plan";
import { Axios } from "../../../../../../../tools/axios/axiosInstance";
import styles from "./billing.module.scss";

interface Plan {
  id: string;
  name: string;
  fees: string;
  start_shift: string;
  end_shift: string;
  program_color: string;
  late_checkout_time: string;
  late_checkout_fees: string;
}

interface Association {
  plan_id: string;
}

const Billing = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  // Fetch available plans
  const { data: plans = [] } = useQuery<Plan[]>('fetchPlans', getPlans);

  // Fetch current student plan association
  const { data: currentAssociation, isLoading } = useQuery<Association>(
    ['fetchStudentPlan', id],
    () => Axios.get(`/settings/plan/association?student_id=${id}`).then(res => res.data),
    { enabled: !!id }
  );

  // Update plan association
  const updatePlanMutation = useMutation(
    (planId: string) => 
      Axios.post('/settings/plan/association', {
        student: id,
        plan: planId
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['fetchStudentPlan', id]);
        toast.success(t("innerLayout.billing.planUpdated"));
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
        toast.error(errorMsg);
      }
    }
  );

  // Remove plan association
  const removePlanMutation = useMutation(
    () => Axios.delete(`/settings/plan/association/${id}`, {
      data: {
        plan_id: selectedPlan
      }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['fetchStudentPlan', id]);
        setSelectedPlan("");
        toast.success(t("innerLayout.billing.planRemoved"));
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
        toast.error(errorMsg);
      }
    }
  );

  useEffect(() => {
    if (currentAssociation?.plan_id) {
      setSelectedPlan(currentAssociation.plan_id);
    }
  }, [currentAssociation]);

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    updatePlanMutation.mutate(planId);
  };

  const handleRemovePlan = () => {
    removePlanMutation.mutate();
  };

  const selectedPlanData = plans.find((plan: Plan) => plan.id === selectedPlan);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>Current {t("innerLayout.billing.paymentPlan")}</h4>
      
      {selectedPlan && selectedPlanData ? (
        <div>
          <div className={styles["plan-container"]}>
            <PlanCard {...selectedPlanData} />
          </div>
          
          <Button
            text={t("innerLayout.billing.removePlan")}
            color="danger"
            variant="outlined"
            onClickHandler={handleRemovePlan}
            loading={removePlanMutation.isLoading}
            disabled={removePlanMutation.isLoading}
          />
        </div>
      ) : (
        <div>
          <p className={styles["no-plan-message"]}>No plan selected</p>
          
          <Dropdown label={t("innerLayout.billing.selectPlan")}>
            <DropdownButton
              text={t("innerLayout.billing.selectPlan")}
              onClickHandler={() => {}}
            />
            <DropdownMenu>
              {plans.map((plan: Plan) => (
                <DropdownMenuItem
                  key={plan.id}
                  text={plan.name}
                  onClickHandler={() => handlePlanChange(plan.id)}
                  selected={false}
                />
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Billing;
