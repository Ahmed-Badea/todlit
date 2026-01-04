import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Loading } from '../../../../../../../design-system';
import FormWrapper from '../../../../../../../components/FormWrapper';
import { updateStudent } from '../../../../../../../services/inner-layout/students';
import { IClass } from '../../../../../../../types/inner-layout/classes/classes';
import { IFieldConfig } from '../../../../../../../types/inner-layout/form';
import { useClassesStore } from '../../../../../../../store/classes';
import { formConfig } from '../studentConfig';
import { IStudent } from '../../../../../../../types/inner-layout/students/student';

const studentConfig: IFieldConfig[] = formConfig as unknown as IFieldConfig[];

interface FormData {
  id: string;
  classroom: string | { id: string; name: string };
  [key: string]: any;
}

const EditStudent = ({ formData }: { formData: FormData }) => {
  const { t } = useTranslation();
  const { classes } = useClassesStore() as unknown as { classes: IClass[] };

  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState<IFieldConfig[]>(studentConfig);

  useEffect(() => {
    if (classes && formData) {
      const newFormConfig: IFieldConfig[] = studentConfig.map((field) => {
        const fieldValue = formData[field.name] || '';
        
        if (field.name === 'classroom_id') {
          return {
            ...field,
            type: field.type,
            options: classes.map((classroom: IClass) => ({
              label: { en: classroom.name, ar: classroom.name },
              value: classroom.id,
            })),
            value: typeof formData.classroom === 'object' ? formData.classroom?.id : formData.classroom,
            isValid: (typeof formData.classroom === 'object' ? formData.classroom?.id : formData.classroom) ? true : undefined,
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
  }, [classes, formData]);

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
        classroom_id: data.classroom_id ?? (typeof formData.classroom === 'object' ? formData.classroom?.id : formData.classroom),
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
