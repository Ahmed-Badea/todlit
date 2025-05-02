import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../../../../design-system'
import FormWrapper from '../../../../../../../components/FormWrapper';
import { createClass } from '../../../../../../../services/inner-layout/classes';
import { formConfig } from '../classConfig';

const CreateStudent = () => {
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
        text={t("innerLayout.form.titles.createClass")}
        onClickHandler={handlePopupOpen}
      />
      <FormWrapper
        mode="popup"
        title={t("innerLayout.form.titles.createClass")}
        fieldsConfig={formConfig}
        submitFn={createClass}
        successMessage={t("innerLayout.form.successMessage.created")}
        onClose={handlePopupClose}
        isOpen={isPopupOpen}
      />
    </div>
  );
};

export default CreateStudent;