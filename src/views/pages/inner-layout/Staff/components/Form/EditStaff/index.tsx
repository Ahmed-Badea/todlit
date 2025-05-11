import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Loading } from '../../../../../../../design-system';
import FormWrapper from '../../../../../../../components/FormWrapper';
import { updateStaff } from '../../../../../../../services/inner-layout/staff';
import { useClassesStore } from '../../../../../../../store/classes';
import { formConfig } from '../staffConfig';

import { IClass } from '../../../../../../../types/inner-layout/classes/classes';
import { StaffMember } from '../../../../../../../types/inner-layout/staff/staff';
// import { IFieldConfig } from '../../../../../../../types/inner-layout/form';

// Define props type
type EditStaffProps = {
  formData: StaffMember;
};

const EditStaff: React.FC<EditStaffProps> = ({ formData }) => {
  const { t } = useTranslation();
  const { classes } = useClassesStore() as unknown as { classes: IClass[] };

  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState(formConfig);

  useEffect(() => {
    if (classes && formData) {
      const newFormConfig = formConfig.map((field) => {
        if (field.name === 'classroom') {
          const selectedClassroom = classes.find(
            (classroom: IClass) => Array.isArray(formData.classrooms) && formData.classrooms.includes(classroom.name)
          );

          return {
            ...field,
            options: (classes as IClass[]).map((classroom) => ({
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
      submitFn={updateMutation.mutateAsync}
      successMessage={t("innerLayout.form.successMessage.created")}
      canEdit={true}
    />
  );
};

export default EditStaff;
