import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../../../../design-system'
import FormWrapper from '../../../../../../../components/FormWrapper';
import { createStaff } from '../../../../../../../services/inner-layout/staff';
import { useClassesStore } from '../../../../../../../store/classes';
import { formConfig } from '../staffConfig';

const CreateStaffPopup = () => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  const { classes } = useClassesStore();

  // Update the form configuration with classroom options
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
    return field;
  });

  return (
    <div>
      <Button
        size="lg"
        color="primary"
        variant="contained"
        text={t("innerLayout.form.titles.createStaff")}
        onClickHandler={handlePopupOpen}
      />
      <FormWrapper
        mode="popup"
        title={t("innerLayout.form.titles.createStaff")}
        fieldsConfig={updatedFormConfig}
        submitFn={createStaff}
        successMessage={t("innerLayout.form.successMessage.created")}
        onClose={handlePopupClose}
        isOpen={isPopupOpen}
      />
    </div>
  );
};

export default CreateStaffPopup;