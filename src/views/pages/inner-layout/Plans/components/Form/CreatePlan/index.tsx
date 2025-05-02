import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../../../../design-system'
import FormWrapper from '../../../../../../../components/FormWrapper';
import { createPlan } from '../../../../../../../services/inner-layout/plans';
import { formConfig } from '../planConfig';

const CreatePlan = () => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  return (
    <div>
      <Button
        size="lg"
        color="primary"
        variant="contained"
        text={t("innerLayout.plans.form.titles.createPlan")}
        onClickHandler={handlePopupOpen}
      />
      <FormWrapper
        mode="popup"
        title={t("innerLayout.plans.form.titles.createPlan")}
        fieldsConfig={formConfig}
        submitFn={createPlan}
        successMessage={t("innerLayout.form.successMessage.created")}
        onClose={handlePopupClose}
        isOpen={isPopupOpen}
      />
    </div>
  );
};

export default CreatePlan;