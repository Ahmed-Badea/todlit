// planAssociationConfig.ts
import { requiredDropdown } from "../../../../../../utils/formValidations";

export const planAssociationConfig = [
  {
    name: "plan",
    label: { en: "Payment Plan", ar: "خطة الدفع" },
    type: "dropdown",
    value: "",
    isValid: undefined,
    errorMsg: "",
    validations: [requiredDropdown],
    options: [], // Populated dynamically
  },
];