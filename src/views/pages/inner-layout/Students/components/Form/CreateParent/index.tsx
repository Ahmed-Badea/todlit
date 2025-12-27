import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from"../../../../../../../design-system";
import {CirclePlus} from "../../../../../../../design-system/assets/Icons";
import FormWrapper from "../../../../../../../components/FormWrapper";
import { createParent } from "../../../../../../../services/inner-layout/students";
import { formConfig } from "../parentConfig";

const CreateParent: React.FC<{ type: "father" | "mother", student_id: string }> = ({ type, student_id }) => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  const titleKey = type === "father" ? "innerLayout.form.titles.createFather" : "innerLayout.form.titles.createMother";

  const submitParent = (parentData: any) => {
    return createParent(parentData, type);
  };

  return (
    <div>
      <Button
        size="lg"
        color="primary"
        variant="link"
        leadingIcon={CirclePlus}
        text={t(titleKey)}
        onClickHandler={handlePopupOpen}
      />
      <FormWrapper
        mode="popup"
        title={t(titleKey)}
        fieldsConfig={formConfig}
        submitFn={submitParent}
        successMessage={t("innerLayout.form.successMessage.created")}
        onClose={handlePopupClose}
        isOpen={isPopupOpen}
        params={{ student_id: student_id }}
      />
    </div>
  );
};

export default CreateParent;
