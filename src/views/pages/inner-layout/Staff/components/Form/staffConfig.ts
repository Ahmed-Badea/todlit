// studentConfig.ts
import { required } from "../../../../../../utils/formValidations";

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
    name: "email",
    label: { en: "Email", ar: "البريد الإلكترونى" },
    type: "text",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "phone",
    label: { en: "Phone", ar: "الهاتف" },
    type: "text",
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
    name: "classroom",
    label: { en: "Classroom", ar: "الفصل" },
    type: "multi-dropdown",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [required],
    options: [], // Populated dynamically
  },
];