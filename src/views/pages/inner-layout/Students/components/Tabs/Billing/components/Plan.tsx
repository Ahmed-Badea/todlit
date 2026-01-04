import { useQuery, useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Loading } from "../../../../../../../../design-system";
import FormWrapper from "../../../../../../../../components/FormWrapper";
import { getPlanAssociations } from "../../../../../../../../services/inner-layout/planAssociations";
import { getPlans } from "../../../../../../../../services/inner-layout/plans";
import { Axios } from "../../../../../../../../tools/axios/axiosInstance";
import { IFieldConfig } from "../../../../../../../../types/inner-layout/form";

interface PlanProps {
  studentId: string;
}

const Plan = ({ studentId }: PlanProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: associations, isLoading: associationsLoading } = useQuery(
    ["planAssociations", studentId],
    () => getPlanAssociations(Number(studentId)),
    { enabled: !!studentId }
  );

  const { data: plans = [], isLoading: plansLoading } = useQuery(
    "fetchPlans",
    getPlans
  );

  const updateMutation = useMutation(
    (data: { plan_id: number }) => {
      return Axios.post(`/settings/plan/association`, {
        student: Number(studentId),
        plan: data.plan_id,
      });
    },
    {
      onSuccess: () => {
        toast.success(t("innerLayout.billing.planUpdated"));
        queryClient.invalidateQueries(["planAssociations", studentId]);
      },
      onError: () => {
        toast.error(t("innerLayout.form.errors.somethingWentWrong"));
      },
    }
  );

  if (associationsLoading || plansLoading) {
    return <Loading />;
  }

  const selectedPlanId = associations?.[0]?.plan;

  const formConfig: IFieldConfig[] = [
    {
      name: "plan_id",
      label: { en: "Payment Plan", ar: "خطة الدفع" },
      type: "dropdown",
      value: selectedPlanId || "",
      isValid: selectedPlanId ? true : undefined,
      errorMsg: "",
      validations: [],
      optional: true,
      options: plans.map((plan: any) => ({
        label: { en: plan.name, ar: plan.name },
        value: plan.id,
      })),
    },
  ];

  return (
    <FormWrapper
      mode="table"
      title={t("innerLayout.billing.currentPlan")}
      fieldsConfig={formConfig}
      submitFn={updateMutation.mutateAsync}
      successMessage={t("innerLayout.billing.planUpdated")}
      canEdit={true}
    />
  );
};

export default Plan;
