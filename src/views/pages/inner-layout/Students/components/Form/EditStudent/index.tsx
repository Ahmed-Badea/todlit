import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Loading } from '../../../../../../../design-system'
import FormWrapper from '../../../../../../../components/FormWrapper';
import { updateStudent } from '../../../../../../../services/inner-layout/students';
import { Classroom } from '../../../../../../../types/inner-layout/classes';
import { useClassesStore } from '../../../../../../../store/classes';
import { formConfig } from '../studentConfig';

interface FormData {
  id: string;
  classroom: string;
  [key: string]: any; // Adjust this as needed to match the structure of formData
}

const EditStudent = ({ formData }: { formData: FormData }) => {
  const { t } = useTranslation();
  const { classes } = useClassesStore();

  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState(formConfig);

  useEffect(() => {
    if (classes && formData) {
      const newFormConfig = formConfig.map((field) => {
        if (field.name === 'classroom') {
            const selectedClassroom = classes.find(
            (classroom: Classroom) => classroom.name === formData.classroom
            );

            return {
            ...field,
            options: classes.map((classroom: Classroom) => ({
              label: { en: classroom.name, ar: classroom.name },
              value: classroom.name,
            })),
            value: selectedClassroom ? selectedClassroom.name : '',
            };
        }
        return {
          ...field,
          value: formData[field.name] || '',
          isValid: formData[field.name] ? true : null,
        };
      });
      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [classes, formData]);

  const updateMutation = useMutation(
    (data: any) => updateStudent(formData.id, data),
    {
      onSuccess: () => {
        const message = t("innerLayout.form.successMessage.updated");
        toast.success(message);
      },
      onError: (error: any) => {
        const errorMsg = error.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
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
      title={t("innerLayout.form.titles.studentDetails")}
      fieldsConfig={updatedFormConfig}
      submitFn={updateMutation.mutate}
      successMessage={t("innerLayout.form.successMessage.created")}
      canEdit={true}
    />
  );
};

export default EditStudent;
