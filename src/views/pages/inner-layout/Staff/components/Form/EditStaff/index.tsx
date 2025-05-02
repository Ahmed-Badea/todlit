import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Loading } from '../../../../../../../design-system';
import FormWrapper from '../../../../../../../components/FormWrapper';
import { updateStaff } from '../../../../../../../services/inner-layout/staff';
import { useClassesStore } from '../../../../../../../store/classes';
import { formConfig } from '../staffConfig';

import { Classroom } from '../../../../../../../types/inner-layout/classes';
import { StaffMember } from '../../../../../../../types/inner-layout/staff';
import { FieldConfig } from '../../../../../../../types/inner-layout/form';

// Define props type
type EditStaffProps = {
  formData: StaffMember;
};

const EditStaff: React.FC<EditStaffProps> = ({ formData }) => {
  const { t } = useTranslation();
  const { classes } = useClassesStore();

  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState<FieldConfig[]>(formConfig);

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
          value: formData[field.name as keyof StaffMember] || '',
          isValid: formData[field.name as keyof StaffMember] ? true : null,
        };
      });

      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [classes, formData]);

  const updateMutation = useMutation(
    (data: Partial<StaffMember>) => updateStaff(formData.id, data),
    {
      onSuccess: () => {
        toast.success(t("innerLayout.form.successMessage.updated"));
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
        toast.error(errorMsg);
      },
    }
  );

  if (isLoading) return <Loading />;

  return (
    <FormWrapper
      mode="table"
      title={t("innerLayout.form.titles.staffDetails")}
      fieldsConfig={updatedFormConfig}
      submitFn={updateMutation.mutate}
      successMessage={t("innerLayout.form.successMessage.created")}
      canEdit={true}
    />
  );
};

export default EditStaff;
