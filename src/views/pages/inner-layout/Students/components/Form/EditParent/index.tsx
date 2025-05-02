import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Loading } from"../../../../../../../design-system";
import FormWrapper from "../../../../../../../components/FormWrapper";
import { updateParent } from "../../../../../../../services/inner-layout/students";
import { formConfig } from "../parentConfig"; // Parent-specific configuration

const EditParent = ({ formData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState(formConfig);

  useEffect(() => {
    if (formData) {
      const newFormConfig = formConfig.map((field) => ({
        ...field,
        value: formData[field.name] || "",
        isValid: Boolean(formData[field.name]),
      }));
      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [formData]);

  const updateMutation = useMutation(
    (data) => updateParent(formData.id, data),
    {
      onSuccess: () => {
        toast.success(t("innerLayout.form.successMessage.updated"));
      },
      onError: (error) => {
        const errorMsg =
          (error as any)?.response?.data?.error ||
          t("innerLayout.form.errors.somethingWentWrong");
        toast.error(errorMsg);
      },
    }
  );

  // Dynamic title based on the `gender` field inside formData
  const getTitle = () => {
    if (formData.gender === "male") {
      return t("innerLayout.form.titles.fatherDetails");
    }
    if (formData.gender === "female") {
      return t("innerLayout.form.titles.motherDetails");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormWrapper
      mode="table"
      title={getTitle()} // Dynamically determined title
      fieldsConfig={updatedFormConfig}
      submitFn={updateMutation.mutate}
      successMessage={t("innerLayout.form.successMessage.updated")}
      canEdit={true}
    />
  );
};

export default EditParent;
