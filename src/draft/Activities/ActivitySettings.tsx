import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Toggle } from "../../../../design-system/components/Toggle";
import { Checkbox } from "../../../../design-system/components/Checkbox";
import { Input } from "../../../../design-system/components/Input";
import { Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem } from "../../../../design-system";

import { Button } from "../../../../design-system/components/Button";
import { FileUploader } from "../../../../design-system/components/FileUploader";
import { Plus } from "../../../../design-system/assets/Icons";
import { AddCustomFieldModal } from "./AddCustomFieldModal";
import { updateActivitySettings } from "../../../../services/inner-layout/activities";
import { activityFormConfig } from "./activityConfig";
import { isFormValid } from "../../../../utils/formValidations";
import styles from "./activity-settings.module.scss";

interface CustomField {
  id: number;
  field_type: string;
  field_name: string;
}

interface ActivityData {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  custom_fields: CustomField[];
}

interface ActivitySettingsProps {
  activityName: string;
  activityData?: ActivityData;
}

export const ActivitySettings = ({ activityName, activityData }: ActivitySettingsProps) => {
  const { t } = useTranslation();
  
  const [formFields, setFormFields] = useState(() => {
    const initialFields: any = {};
    activityFormConfig.forEach(field => {
      initialFields[field.name] = { ...field };
    });
    return initialFields;
  });

  const [customFieldValues, setCustomFieldValues] = useState<Record<number, string>>({});
  const [customFieldTypes, setCustomFieldTypes] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityImage, setActivityImage] = useState<File | null>(null);

  const updateMutation = useMutation(updateActivitySettings, {
    onSuccess: () => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
      console.error('Update failed:', error);
    }
  });

  const handleSubmit = () => {
    if (!activityData) return;
    
    // Validate custom field names are not empty
    const hasEmptyFieldNames = Object.values(customFieldValues).some(name => !name.trim());
    if (hasEmptyFieldNames) return;
    
    const settings = {
      activity_status: formFields.activity_status.value,
      notify_parents: formFields.notify_parents.value,
      enable_file_upload: formFields.enable_file_upload.value,
      enable_photo_video: formFields.enable_photo_video.value,
      enable_draft_mode: formFields.enable_draft_mode.value,
      enable_comments: formFields.enable_comments.value,
      requires_approval: formFields.requires_approval.value,
      custom_fields: Object.entries(customFieldValues).map(([id, name]) => ({
        id: parseInt(id),
        field_name: name,
        field_type: customFieldTypes[parseInt(id)]
      }))
    };
    
    updateMutation.mutate(activityData.id, settings);
  };

  const fieldTypeOptions = [
    { label: "Input", value: "text" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Toggle", value: "toggle" },
    { label: "Dropdown", value: "dropdown" }
  ];

  const renderCustomField = (field: CustomField) => {
    const fieldValue = customFieldValues[field.id] || field.field_name;
    const fieldType = customFieldTypes[field.id] || field.field_type;
    
    return (
      <div key={field.id} className={styles["custom-field-item"]}>
        <Input
          name={`field_name_${field.id}`}
          label="Field Name"
          value={fieldValue}
          placeholder="Enter field name"
          required
          onChange={(e) => setCustomFieldValues(prev => ({
            ...prev,
            [field.id]: e.target.value
          }))}
        />
        <Dropdown label="Field Type">
          <DropdownButton
            text={fieldTypeOptions.find(opt => opt.value === fieldType)?.label || "Select Type"}
          />
          <DropdownMenu>
            {fieldTypeOptions.map(option => (
              <DropdownMenuItem
                key={option.value}
                text={option.label}
                onClickHandler={() => setCustomFieldTypes(prev => ({
                  ...prev,
                  [field.id]: option.value
                }))}
                selected={fieldType === option.value}
              />
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles["toggle-item"]}>
          <span className={styles.label}>{t("innerLayout.activities.activityStatus")}</span>
          <Toggle
            size="md"
            isChecked={formFields.activity_status.value}
            onChangeHandler={(checked) => setFormFields(prev => ({
              ...prev,
              activity_status: { ...prev.activity_status, value: checked }
            }))}
          />
        </div>
        
        <div className={styles["toggle-item"]}>
          <span className={styles.label}>{t("innerLayout.activities.notifyParents")}</span>
          <Toggle
            size="md"
            isChecked={formFields.notify_parents.value}
            onChangeHandler={(checked) => setFormFields(prev => ({
              ...prev,
              notify_parents: { ...prev.notify_parents, value: checked }
            }))}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h5 className={styles["section-title"]}>{t("innerLayout.activities.enableStatus")}</h5>
        
        <div className={styles["checkbox-group"]}>
          <Checkbox
            id="enableFileUpload"
            text={t("innerLayout.activities.enableFileUpload")}
            checked={formFields.enable_file_upload.value}
            onChangeHandler={(checked) => setFormFields(prev => ({
              ...prev,
              enable_file_upload: { ...prev.enable_file_upload, value: checked }
            }))}
          />
          
          <Checkbox
            id="enablePhotoVideo"
            text={t("innerLayout.activities.enablePhotoVideo")}
            checked={formFields.enable_photo_video.value}
            onChangeHandler={(checked) => setFormFields(prev => ({
              ...prev,
              enable_photo_video: { ...prev.enable_photo_video, value: checked }
            }))}
          />
          
          <Checkbox
            id="enableDraftMode"
            text={t("innerLayout.activities.enableDraftMode")}
            checked={formFields.enable_draft_mode.value}
            onChangeHandler={(checked) => setFormFields(prev => ({
              ...prev,
              enable_draft_mode: { ...prev.enable_draft_mode, value: checked }
            }))}
          />
          
          <Checkbox
            id="enableComments"
            text={t("innerLayout.activities.enableComments")}
            checked={formFields.enable_comments.value}
            onChangeHandler={(checked) => setFormFields(prev => ({
              ...prev,
              enable_comments: { ...prev.enable_comments, value: checked }
            }))}
          />
          
          <Checkbox
            id="requiresApproval"
            text={t("innerLayout.activities.doesntRequireApproval")}
            checked={!formFields.requires_approval.value}
            onChangeHandler={(checked) => setFormFields(prev => ({
              ...prev,
              requires_approval: { ...prev.requires_approval, value: !checked }
            }))}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h5 className={styles["section-title"]}>Activity Image</h5>
        <FileUploader
          label="Upload Activity Image"
          allowedFormats={["png", "jpg", "jpeg", "webp"]}
          allowedSize={5}
          onUploadHandler={(file) => setActivityImage(file || null)}
        />
      </div>

      {activityData?.custom_fields && activityData.custom_fields.length > 0 && (
        <div className={styles.section}>
          <h5 className={styles["section-title"]}>{t("innerLayout.activities.customFields")}</h5>
          
          <div className={styles["tag-input-group"]}>
            {activityData.custom_fields.map(renderCustomField)}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h5 className={styles["section-title"]}>{t("innerLayout.activities.formFields")}</h5>
        <p className={styles["section-message"]}>
          {t("innerLayout.activities.defaultFieldsMessage")}
        </p>
        <Button
          size="md"
          color="primary"
          variant="outlined"
          leadingIcon={Plus}
          text={t("innerLayout.activities.addCustomField")}
          onClickHandler={() => setIsModalOpen(true)}
        />
      </div>
      
      {activityData && (
        <AddCustomFieldModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          activityId={activityData.id}
          onSuccess={() => {
            // Optionally refresh data or show success message
          }}
        />
      )}
      
      <div className={`${styles.section} ${styles['button-section']}`}>
        <Button
          size="lg"
          color="primary"
          variant="contained"
          text={t("common.save")}
          onClickHandler={handleSubmit}
          isLoading={updateMutation.isLoading}
          disabled={!activityData || Object.values(customFieldValues).some(name => !name.trim())}
        />
      </div>
    </div>
  );
};