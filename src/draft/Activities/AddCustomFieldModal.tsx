import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Popup } from "../../../../design-system/components/Popup";
import { Input } from "../../../../design-system/components/Input";
import { Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem } from "../../../../design-system";
import { Checkbox } from "../../../../design-system/components/Checkbox";
import { Toggle } from "../../../../design-system/components/Toggle";
import { TagsInput } from "../../../../design-system/components/Input/TagsInput";
import { Button } from "../../../../design-system/components/Button";
import { updateActivity } from "../../../../services/inner-layout/activities";
import { required, validateField, isFormValid } from "../../../../utils/formValidations";
import { IFields } from "../../../../types/inner-layout/form";
import styles from "./add-custom-field-modal.module.scss";

interface AddCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  onSuccess?: () => void;
}

export const AddCustomFieldModal = ({ isOpen, onClose, activityId, onSuccess }: AddCustomFieldModalProps) => {
  const { t } = useTranslation();
  const initialFormFields: IFields = {
    fieldName: { value: "", isValid: undefined, errorMsg: "", validations: [required] },
    fieldType: { value: "text", isValid: true, errorMsg: "", validations: [] },
    fieldValue: { value: "", isValid: undefined, errorMsg: "", validations: [required] }
  };
  
  const [formFields, setFormFields] = useState<IFields>(initialFormFields);
  const [isFormValidState, setIsFormValidState] = useState(false);

  useEffect(() => {
    setIsFormValidState(isFormValid(formFields));
  }, [formFields, setIsFormValidState]);

  const fieldTypeOptions = [
    { label: t("innerLayout.activities.fieldTypes.input"), value: "text" },
    { label: t("innerLayout.activities.fieldTypes.checkbox"), value: "checkbox" },
    { label: t("innerLayout.activities.fieldTypes.toggle"), value: "toggle" },
    { label: t("innerLayout.activities.fieldTypes.dropdown"), value: "dropdown" }
  ];

  const updateActivityMutation = useMutation(updateActivity, {
    onSuccess: () => {
      onSuccess?.();
      handleClose();
    },
    onError: (error) => {
      console.error("Error updating activity:", error);
    }
  });

  const handleInputChange = (fieldName: string, value: string) => {
    const updatedFields = {
      ...formFields,
      [fieldName]: {
        ...formFields[fieldName],
        value,
      },
    };
    setFormFields(updatedFields);
    validateField(updatedFields, setFormFields, fieldName, value);
  };

  const handleClose = () => {
    setFormFields(initialFormFields);
    onClose();
  };

  const handleFieldTypeChange = (type: string) => {
    handleInputChange("fieldType", type);
    
    // Reset field value based on type
    const newValue = type === "checkbox" || type === "toggle" ? "false" : type === "dropdown" ? [] : "";
    setFormFields(prev => ({
      ...prev,
      fieldValue: {
        ...prev.fieldValue,
        value: newValue,
        isValid: true,
        errorMsg: ""
      }
    }));
  };

  const renderFieldValue = () => {
    const fieldType = formFields.fieldType.value as string;
    const fieldValue = formFields.fieldValue.value;
    
    switch (fieldType) {
      case "checkbox":
      case "toggle":
        return (
          <div>
            <label>{t(fieldType === "checkbox" ? "innerLayout.activities.checkboxValue" : "innerLayout.activities.toggleValue")}</label>
            {fieldType === "checkbox" ? (
              <Checkbox
                id="fieldValue"
                text={t("innerLayout.activities.checkboxValue")}
                checked={fieldValue === "true"}
                onChangeHandler={(checked) => setFormFields(prev => ({
                  ...prev,
                  fieldValue: { ...prev.fieldValue, value: checked.toString(), isValid: true, errorMsg: "" }
                }))}
              />
            ) : (
              <Toggle
                size="md"
                isChecked={fieldValue === "true"}
                onChangeHandler={(checked) => setFormFields(prev => ({
                  ...prev,
                  fieldValue: { ...prev.fieldValue, value: checked.toString(), isValid: true, errorMsg: "" }
                }))}
              />
            )}
          </div>
        );
      case "dropdown":
        return (
          <TagsInput
            tags={fieldValue as string[]}
            onTagAdd={(tag) => {
              const newTags = [...(fieldValue as string[]), tag];
              setFormFields(prev => ({
                ...prev,
                fieldValue: { ...prev.fieldValue, value: newTags, isValid: newTags.length > 0, errorMsg: "" }
              }));
            }}
            onTagRemove={(tag) => {
              const newTags = (fieldValue as string[]).filter(t => t !== tag);
              setFormFields(prev => ({
                ...prev,
                fieldValue: { ...prev.fieldValue, value: newTags, isValid: newTags.length > 0, errorMsg: "" }
              }));
            }}
            placeholder={t("innerLayout.activities.enterDropdownOptions")}
            showAddButton={true}
          />
        );
      case "text":
      default:
        return (
          <Input
            name="fieldValue"
            label={t("innerLayout.activities.fieldValue")}
            value={fieldValue as string}
            placeholder={t("innerLayout.activities.enterFieldValue")}
            required
            onChange={(e) => handleInputChange("fieldValue", e.target.value)}
            status={formFields.fieldValue.isValid === false ? "error" : "default"}
            error={formFields.fieldValue.errorMsg}
          />
        );
    }
  };

  const handleSubmit = () => {
    if (!isFormValidState) return;
    
    const payload = {
      activity_id: activityId,
      custom_name: formFields.fieldName.value as string,
      custom_field: {
        field_type: formFields.fieldType.value as string,
        field_name: formFields.fieldName.value as string,
        value: Array.isArray(formFields.fieldValue.value) ? formFields.fieldValue.value.join(",") : formFields.fieldValue.value?.toString() || ""
      }
    };

    updateActivityMutation.mutate(payload);
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      title={t("innerLayout.activities.addCustomField")}
    >
      <div className={styles.form}>
        <Input
          name="fieldName"
          label={t("innerLayout.activities.fieldName")}
          value={formFields.fieldName.value}
          placeholder={t("innerLayout.activities.enterFieldName")}
          required
          onChange={(e) => handleInputChange("fieldName", e.target.value)}
          status={formFields.fieldName.isValid === false ? "error" : "default"}
          error={formFields.fieldName.errorMsg}
        />

        <Dropdown label={t("innerLayout.activities.fieldType")}>
          <DropdownButton
            text={fieldTypeOptions.find(opt => opt.value === formFields.fieldType.value)?.label || t("innerLayout.activities.selectType")}
          />
          <DropdownMenu>
            {fieldTypeOptions.map(option => (
              <DropdownMenuItem
                key={option.value}
                text={option.label}
                onClickHandler={() => handleFieldTypeChange(option.value)}
                selected={formFields.fieldType.value === option.value}
              />
            ))}
          </DropdownMenu>
        </Dropdown>

        {renderFieldValue()}

        <div className={styles.buttons}>
          <Button
            size="lg"
            color="secondary"
            variant="outlined"
            text={t("common.cancel")}
            onClickHandler={handleClose}
          />
          <Button
            size="lg"
            color="primary"
            variant="contained"
            text={t("common.add")}
            loading={updateActivityMutation.isLoading}
            disabled={!isFormValidState}
            onClickHandler={handleSubmit}
          />
        </div>
      </div>
    </Popup>
  );
};