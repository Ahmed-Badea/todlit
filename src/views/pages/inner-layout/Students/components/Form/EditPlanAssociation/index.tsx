import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Loading } from '../../../../../../../design-system';
import FormWrapper from '../../../../../../../components/FormWrapper';
import { getPlans } from '../../../../../../../services/inner-layout/plans';
import { IFieldConfig } from '../../../../../../../types/inner-layout/form';
import { planAssociationConfig } from '../planAssociationConfig';
import { Axios } from '../../../../../../../tools/axios/axiosInstance';

const planConfig: IFieldConfig[] = planAssociationConfig as unknown as IFieldConfig[];

interface PlanAssociationData {
  id: number;
  plan: number;
  student: number;
  created_at: string;
}

interface FormData {
  id: string;
  plan: number;
  [key: string]: any;
}

const EditPlanAssociation = ({ formData, studentId }: { formData: PlanAssociationData; studentId: string }) => {
  const { t } = useTranslation();
  const { data: plans = [] } = useQuery('fetchPlans', getPlans);

  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState<IFieldConfig[]>(planConfig);

  useEffect(() => {
    if (plans && formData) {
      const newFormConfig: IFieldConfig[] = planConfig.map((field) => {
        if (field.name === 'plan') {
          return {
            ...field,
            type: field.type,
            options: plans.map((plan: any) => ({
              label: { en: plan.name, ar: plan.name },
              value: plan.id.toString(),
            })),
            value: formData.plan?.toString() || '',
            isValid: formData.plan ? true : undefined,
          };
        }

        return {
          ...field,
          type: field.type,
          value: (formData as any)[field.name] || '',
          isValid: (formData as any)[field.name] ? true : undefined,
        };
      });

      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [plans, formData]);

  const updateMutation = useMutation(
    (data: Partial<FormData>) => {
      const planData = {
        student: parseInt(studentId),
        plan: parseInt(data.plan as unknown as string),
      };
      return Axios.post('/settings/plan/association', planData);
    },
    {
      onSuccess: () => {
        toast.success(t('innerLayout.form.successMessage.updated'));
      },
      onError: (error: any) => {
        const errorMsg = error.response?.data?.error || t('innerLayout.form.errors.somethingWentWrong');
        toast.error(errorMsg);
      },
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormWrapper
      fieldsConfig={updatedFormConfig}
      submitFn={(data: any) => updateMutation.mutateAsync(data)}
      successMessage={t('innerLayout.form.successMessage.updated')}
      mode="table"
      title={t('innerLayout.billing.paymentPlan')}
      canEdit={true}
    />
  );
};

export default EditPlanAssociation;