import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button } from '../../../../../../../design-system'
import FormWrapper from '../../../../../../../components/FormWrapper';
import { createStudent } from '../../../../../../../services/inner-layout/students';
import { getPlans } from '../../../../../../../services/inner-layout/plans';
import { useClassesStore } from '../../../../../../../store/classes';
import { formConfig } from '../studentConfig';

const CreateStudent = () => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

   const { classes } = useClassesStore();
  
  const { data: plans = [] } = useQuery('fetchPlans', getPlans);

  // Update the form configuration with classroom and billing plan options
  const updatedFormConfig = formConfig.map((field) => {
    if (field.name === 'classroom') {
      return {
        ...field,
        options: classes?.map((classroom: any) => ({
          label: { en: classroom.name, ar: classroom.name },
          value: classroom.id,
        })),
      };
    }
    if (field.name === 'plan_id') {
      return {
        ...field,
        options: plans?.map((plan: any) => ({
          label: { en: plan.name, ar: plan.name },
          value: plan.id,
        })),
      };
    }
    return field;
  });

  return (
    <div>
      <Button
        size="lg"
        color="primary"
        variant="contained"
        text={t("innerLayout.form.titles.createStudent")}
        onClickHandler={handlePopupOpen}
      />
      <FormWrapper
        mode="popup"
        title={t("innerLayout.form.titles.createStudent")}
        fieldsConfig={updatedFormConfig}
        submitFn={createStudent}
        successMessage={t("innerLayout.form.successMessage.created")}
        onClose={handlePopupClose}
        isOpen={isPopupOpen}
      />
    </div>
  );
};

export default CreateStudent;