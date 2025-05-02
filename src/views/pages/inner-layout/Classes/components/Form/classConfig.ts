import { required } from "@app/utils/formValidations";

export const formConfig = [
  {
    name: "name", // Match API response key
    label: { en: "Name", ar: "الاسم" },
    type: "text",
    value: "",
    isValid: null,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "branch",
    label: { en: "Branch", ar: "الفرع" },
    type: "text",
    value: "",
    isValid: null,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "min_age",
    label: { en: "Min Age", ar: "أقل عمر" },
    type: "text",
    value: "",
    isValid: null,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "max_age",
    label: { en: "Max Age", ar: "أكبر عمر" },
    type: "text",
    value: "",
    isValid: null,
    errorMsg: "",
    validations: [required],
  },
  {
    name: "capacity",
    label: { en: "Capacity", ar: "السعة" },
    type: "text",
    value: "",
    isValid: null,
    errorMsg: "",
    validations: [required],
  },
];