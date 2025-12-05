import { useTranslation } from "react-i18next";
import { ActivityTemplate } from "../../../../services/inner-layout/activityTemplates";
import { submitStudentActivity, FieldResponse } from "../../../../services/inner-layout/studentActivities";
import { required } from "../../../../utils/formValidations";
import FormWrapper from "../../../../components/FormWrapper";
import styles from "./activities.module.scss";

interface ActivityFormProps {
  template: ActivityTemplate;
  students: any[];
  onBack: () => void;
}

export const ActivityForm = ({ template, students, onBack }: ActivityFormProps) => {
  const { t } = useTranslation();



  const handleSubmit = async (formData: any) => {
    const fieldResponses: FieldResponse[] = template.custom_fields.map(field => {
      const value = formData[field.field_name] || "";
      const response: FieldResponse = { field: field.id, value };
      
      if (field.field_type === "select" && value) {
        const option = field.values.find(v => v.value === value);
        if (option) response.option = option.id;
      }
      
      return response;
    });

    const payload = {
      student_ids: students.map(s => s.id),
      teacher: Number(localStorage.getItem("teacher_id")),
      activity_template: template.id,
      notes: formData.notes || "",
      media_ids: [],
      notify_parent: formData.notify_parent || false,
      field_responses: fieldResponses
    };

    return await submitStudentActivity(payload);
  };

  return (
    <div className={styles["form-container"]}>
      <FormWrapper
        mode="normal"
        title={`${template.name} Form`}
        fieldsConfig={[
          ...template.custom_fields.map(field => ({
            name: field.field_name,
            label: { en: field.field_name, ar: field.field_name },
            type: field.field_type === "select" ? "dropdown" : field.field_type,
            value: "",
            isValid: undefined,
            errorMsg: "",
            validations: [required],
            options: field.values?.map(v => ({
              label: { en: v.value, ar: v.value },
              value: v.value
            })) || []
          })),
          {
            name: "notes",
            label: { en: "Notes", ar: "ملاحظات" },
            type: "textarea",
            value: "",
            isValid: true,
            errorMsg: "",
            validations: []
          },
          {
            name: "media",
            label: { en: "Media", ar: "الوسائط" },
            type: "file",
            value: "",
            isValid: true,
            errorMsg: "",
            validations: [],
            allowedFormats: ["jpeg", "jpg", "png", "webp", "heic", "mp4", "mov", "avi", "webm"]
          }
        ]}
        isFormValid={students.length > 0}
        submitFn={handleSubmit}
        successMessage={t("Activity submitted successfully!")}
        onClose={onBack}
      />
    </div>
  );
};