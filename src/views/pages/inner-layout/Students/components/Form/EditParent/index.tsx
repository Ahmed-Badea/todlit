import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Loading } from "../../../../../../../design-system";
import FormWrapper from "../../../../../../../components/FormWrapper";
import { updateParent } from "../../../../../../../services/inner-layout/students";
import { IFieldConfig } from "../../../../../../../types/inner-layout/form";
import { formConfig } from "../parentConfig";

const parentConfig: IFieldConfig[] = formConfig as unknown as IFieldConfig[];

interface FormData {
  id: string;
  gender?: string;
  [key: string]: any;
}

const EditParent = ({ formData }: { formData: FormData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [updatedFormConfig, setUpdatedFormConfig] = useState<IFieldConfig[]>(parentConfig);

  useEffect(() => {
    if (formData) {
      const newFormConfig: IFieldConfig[] = parentConfig.map((field) => ({
        ...field,
        value: formData[field.name] || "",
        isValid: formData[field.name] ? true : undefined,
      }));

      setUpdatedFormConfig(newFormConfig);
      setIsLoading(false);
    }
  }, [formData]);

  const updateMutation = useMutation(
    (data: Record<string, any>) => updateParent(formData.id, data),
    {
      onSuccess: () => {
        toast.success(t("innerLayout.form.successMessage.updated"));
      },
      onError: (error: any) => {
        const errorMsg =
          (error as any)?.response?.data?.error ||
          t("innerLayout.form.errors.somethingWentWrong");
        toast.error(errorMsg);
      },
    }
  );

  const getTitle = () => {
    if (formData.gender === "male") return t("innerLayout.form.titles.fatherDetails");
    if (formData.gender === "female") return t("innerLayout.form.titles.motherDetails");
    return t("innerLayout.form.titles.defaultParentTitle"); // Fallback title
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormWrapper
      mode="table"
      title={getTitle()}
      fieldsConfig={updatedFormConfig}
      submitFn={updateMutation.mutateAsync}
      successMessage={t("innerLayout.form.successMessage.updated")}
      canEdit={true}
    />
  );
};

export default EditParent;
