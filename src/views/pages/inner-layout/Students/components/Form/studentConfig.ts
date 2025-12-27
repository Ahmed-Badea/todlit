// studentConfig.ts
import { required, requiredDropdown } from "../../../../../../utils/formValidations";

export const formConfig = [
  {
    name: "first_name", // Match API response key
    label: { en: "First Name", ar: "الاسم الأول" },
    type: "text",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "last_name",
    label: { en: "Last Name", ar: "اسم العائلة" },
    type: "text",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "date_of_birth",
    label: { en: "Date of Birth", ar: "تاريخ الميلاد" },
    type: "date",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "gender",
    label: { en: "Gender", ar: "الجنس" },
    type: "dropdown",
    value: "",
    isValid: undefined,
    validations: [required],
    errorMsg: "",
    options: [
      { label: { en: "Male", ar: "ذكر" }, value: "male" },
      { label: { en: "Female", ar: "أنثى" }, value: "female" },
    ],
  },
  {
    name: "status",
    label: { en: "Status", ar: "الحالة" },
    type: "dropdown",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [required],
    options: [
      { label: { en: "Active", ar: "نشط" }, value: "active" },
      { label: { en: "Inactive", ar: "غير نشط" }, value: "inactive" },
    ],
  },
  {
    name: "classroom",
    label: { en: "Classroom", ar: "الفصل" },
    type: "dropdown",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [requiredDropdown],
    options: [], // Populated dynamically
  },
  {
    name: "plan_id",
    label: { en: "Payment Plan", ar: "خطة الدفع" },
    type: "dropdown",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [requiredDropdown],
    options: [], // Populated dynamically from API
  },
];