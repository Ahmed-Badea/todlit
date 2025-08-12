import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Loading } from '../../../../../../../design-system';
import FormWrapper from '../../../../../../../components/FormWrapper';
import { updateStudent } from '../../../../../../../services/inner-layout/students';
import { getPlans } from '../../../../../../../services/inner-layout/plans';
import { IClass } from '../../../../../../../types/inner-layout/classes/classes';
import { IFieldConfig } from '../../../../../../../types/inner-layout/form';
import { useClassesStore } from '../../../../../../../store/classes';
import { formConfig } from '../studentConfig';
import { IStudent } from '../../../../../../../types/inner-layout/students/student';

const studentConfig: IFieldConfig[] = formConfig as unknown as IFieldConfig[];

interface FormData {
  id: string;
  classroom: string;
  [key: string]: any;
}

const EditStudent = ({ formData }: { formData: FormData }) => {
  const { t } = useTranslation();
  const { classes } = useClassesStore() as unknown as { classes: IClass[] };
  const { data: plans = [] } = useQuery('fetchPlans', getPlans);

  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState<IFieldConfig[]>(studentConfig);

  useEffect(() => {
    if (classes && formData) {
      const newFormConfig: IFieldConfig[] = studentConfig.map((field) => {
        const fieldValue = formData[field.name] || '';
        
        if (field.name === 'classroom') {
          const selectedClassroom = classes.find(
            (classroom: IClass) => classroom.name === formData.classroom
          );

          return {
            ...field,
            type: field.type,
            options: classes.map((classroom: IClass) => ({
              label: { en: classroom.name, ar: classroom.name },
              value: classroom.name,
            })),
            value: selectedClassroom ? selectedClassroom.name : '',
            isValid: selectedClassroom ? true : undefined,
          };
        }

        if (field.name === 'plan_id') {
          return {
            ...field,
            type: field.type,
            options: plans.map((plan: any) => ({
              label: { en: plan.name, ar: plan.name },
              value: plan.id,
            })),
            value: fieldValue,
            isValid: true, // Always valid since it's optional
            validations: [], // Ensure no validations
          };
        }

        return {
          ...field,
          type: field.type,
          value: fieldValue,
          isValid: fieldValue ? true : undefined,
        };
      });

      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [classes, formData, plans]);

  const updateMutation = useMutation(
    (data: Partial<IStudent>) => {
      // Ensure all required fields are present and not undefined
      const studentData = {
        ...formData,
        ...data,
        first_name: data.first_name ?? formData.first_name,
        last_name: data.last_name ?? formData.last_name,
        date_of_birth: data.date_of_birth ?? formData.date_of_birth,
        gender: data.gender ?? formData.gender,
        status: data.status ?? formData.status,
        classroom: data.classroom ?? formData.classroom,
        plan_id: data.plan_id ?? formData.plan_id ?? null,
      };
      return updateStudent(formData.id, studentData);
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
      mode="table"
      title={t('innerLayout.form.titles.studentDetails')}
      fieldsConfig={updatedFormConfig}
      submitFn={updateMutation.mutateAsync}
      successMessage={t('innerLayout.form.successMessage.created')}
      canEdit={true}
    />
  );
};

export default EditStudent;
