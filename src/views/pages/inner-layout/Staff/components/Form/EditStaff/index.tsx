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
import { IFieldConfig } from '../../../../../../../types/inner-layout/form';

const staffConfig: IFieldConfig[] = formConfig as unknown as IFieldConfig[];


// Define props type
type EditStaffProps = {
  formData: StaffMember;
};

const EditStaff: React.FC<EditStaffProps> = ({ formData }) => {
  const { t } = useTranslation();
  const { classes } = useClassesStore() as unknown as { classes: IClass[] };

  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState<IFieldConfig[]>(staffConfig);
  

  useEffect(() => {
    if (classes && formData) {
      const newFormConfig = staffConfig.map((field) => {
        if (field.name === 'classroom') {
          const selectedClassrooms = Array.isArray(formData.classrooms) 
            ? formData.classrooms.join(',') 
            : '';

          return {
            ...field,
            options: (classes as IClass[]).map((classroom) => ({
              label: { en: classroom.name, ar: classroom.name },
              value: classroom.name,
            })),
            value: selectedClassrooms,
          };
        }

        return {
          ...field,
          value: formData[field.name as keyof StaffMember] || '',
          isValid: formData[field.name as keyof StaffMember] ? true : undefined,
        };
      });

      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [classes, formData]);

  const updateMutation = useMutation(
    (data: any) => {
      console.log(data)
      // Ensure all required fields are present and not undefined
      const staffData = {
        ...formData,
        ...data,
        first_name: data.first_name ?? formData.first_name,
        last_name: data.last_name ?? formData.last_name,
        email: data.email ?? formData.email,
        phone: data.phone ?? formData.phone,
        gender: data.gender ?? formData.gender,
        classroom: data.classroom ? data.classroom.split(',').filter(v => v) : formData.classrooms,
      };
      return updateStaff(formData.id, staffData);
    },
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
