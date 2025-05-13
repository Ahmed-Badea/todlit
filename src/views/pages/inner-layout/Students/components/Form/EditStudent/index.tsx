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

const studentConfig: IFieldConfig[] = formConfig as unknown as IFieldConfig[];

interface FormData {
  id: string;
  classroom: string;
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
          };
        }

        return {
          ...field,
          type: field.type,
          value: formData[field.name] || '',
          isValid: formData[field.name] ? true : undefined,
        };
      });

      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [classes, formData]);

  const updateMutation = useMutation(
    (data: Record<string, any>) => updateStudent(formData.id, data),
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
