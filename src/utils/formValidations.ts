import { type Dispatch } from "react";
import i18n from "../tools/i18n";
import type { IValidation, Country, IField } from "../types/outer-layout";

const { t } = i18n;

export const COUNTRIES: { [key in Country]: Country } = {
  EGY: "EGY",
  SAU: "SAU",
  ARE: "ARE",
  OMN: "OMN",
  JOR: "JOR",
  PAK: "PAK",
};

export const COUNTRIES_INFO = {
  [COUNTRIES.EGY]: {
    phone_number_length: {
      min: 11,
      max: 11,
    },
    phone_country_code: "+2",
    country_code: "EGY",
    country_code_iso2: "EG",
    currency: "EGP",
    // flag: EGYFlag,
    time_zone: "Africa/Cairo",
    phone_regex: /^1[0125][0-9]{8}$/,
  },
  [COUNTRIES.SAU]: {
    phone_number_length: {
      min: 9,
      max: 9,
    },
    phone_country_code: "+966",
    country_code: "SAU",
    country_code_iso2: "SA",
    currency: "SAR",
    // flag: SAUFlag,
    time_zone: "Asia/Riyadh",
    phone_regex: /^[0-9]{9}$/,
  },
  [COUNTRIES.ARE]: {
    phone_number_length: {
      min: 9,
      max: 9,
    },
    phone_country_code: "+971",
    country_code: "ARE",
    country_code_iso2: "AE",
    currency: "AED",
    // flag: AREFlag,
    time_zone: "Asia/Dubai",
    phone_regex: /^(5)\d{8}$/,
  },
  [COUNTRIES.OMN]: {
    phone_number_length: {
      min: 8,
      max: 10,
    },
    phone_country_code: "+968",
    country_code: "OMN",
    country_code_iso2: "OM",
    currency: "OMR",
    // flag: OMNFlag,
    time_zone: "Asia/Muscat",
    phone_regex: /^[0-9]{8}$/,
  },
  [COUNTRIES.JOR]: {
    phone_number_length: {
      min: 8,
      max: 9,
    },
    phone_country_code: "+962",
    country_code: "JOR",
    country_code_iso2: "JO",
    currency: "JOD",
    // flag: OMNFlag,
    time_zone: "Asia/Amman",
    phone_regex: /^[0-9]{5,9}$/,
  },
  [COUNTRIES.PAK]: {
    phone_number_length: {
      min: 10,
      max: 10,
    },
    phone_country_code: "+92",
    country_code: "PAK",
    country_code_iso2: "PK",
    currency: "PKR",
    // flag: PAKFlag,
    time_zone: "Asia/Karachi",
    phone_regex: /^[0-9]{10}$/,
  },
};

export const isFormValid = (fields: object): boolean => {
  const valid = Object.values(fields).every((field) => field.isValid);
  return valid;
};

export const validateField = (
  fields: IField,
  setFields: Dispatch<(prevState: IField) => IField>,
  fieldName: string,
  value: string
) => {
  for (const validation of fields[fieldName].validations) {
    if (!validation.pattern.test(value)) {
      setFields((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          isValid: false,
          errorMsg: validation.error_msg,
        },
      }));
      return;
    }
    setFields((prevState) => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        isValid: true,
        errorMsg: "",
      },
    }));
  }
};

export const onFieldChangeHandler = (
  fields: IField,
  setFields: Dispatch<(prevState: IField) => IField>,
  fieldName: string,
  value: string,
  setServerErrMsg: Dispatch<string>
) => {
  setServerErrMsg("");

  setFields((prevState) => {
    return {
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        value: value,
      },
    };
  });

  validateField(fields, setFields, fieldName, value);
};

export const required: IValidation = {
  pattern: /^.+$/,
  error_msg: t("outerLayout.form.errors.required"),
};

export const requiredDropdown: IValidation = {
  pattern: /^.+$/,
  error_msg: t("outerLayout.form.errors.required"),
};

export const emailValidation: IValidation = {
  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  error_msg: t("outerLayout.form.errors.invalidEmail"),
};

export const passwordValidation = {
  atleastXCharacters: (numberOfCharacters: number) => ({
    pattern: new RegExp(`.{${numberOfCharacters},}$`),
    error_msg: t("outerLayout.form.errors.atleastXCharacters").replace(
      "{{number}}",
      numberOfCharacters.toString()
    ),
  }),
  atleastLowerCaseLetter: {
    pattern: /[a-z]/,
    error_msg: t("outerLayout.form.errors.atleastLowerCaseLetter"),
  },
  atleastUpperCaseLetter: {
    pattern: /[A-Z]/,
    error_msg: t("outerLayout.form.errors.atleastUpperCaseLetter"),
  },
  atleast1Number: {
    pattern: /\d/,
    error_msg: t("outerLayout.form.errors.atleast1Number"),
  },
  atleast1SpecialCharacter: {
    pattern: /[\W_]/,
    error_msg: t("outerLayout.form.errors.atleast1SpecialCharacter"),
  },
};

const MIN_CHARS_LENGTH = 8;

export const passwordValidations = [
  passwordValidation.atleastXCharacters(MIN_CHARS_LENGTH),
  passwordValidation.atleastUpperCaseLetter,
  passwordValidation.atleastLowerCaseLetter,
  passwordValidation.atleast1Number,
  passwordValidation.atleast1SpecialCharacter,
];

export const passwordValidationRules = passwordValidations.map(
  (validationRule) => ({
    pattern: validationRule.pattern,
    label: validationRule.error_msg,
  })
);

const equalityLiteral = "===equality_literal===";

export const passwordsComparisonLiteral = (
  password: string,
  confirmPassword: string
) => `${password}${equalityLiteral}${confirmPassword}`;

export const passwordMatchValidation = {
  pattern: new RegExp(`^(.+)${equalityLiteral}\\1$`),
  error_msg: t("outerLayout.form.errors.matchPassword"),
};

export const phoneNumberValidation = (country: Country): IValidation => {
  const minLength = COUNTRIES_INFO[country].phone_number_length.min;
  const maxLength = COUNTRIES_INFO[country].phone_number_length.max;

  return {
    pattern:
      country === COUNTRIES.EGY
        ? new RegExp(
            `^(010|011|012|015)\\d{${minLength - 3},${maxLength - 3}}$`
          )
        : new RegExp(`^\\d{${minLength},${maxLength}}$`),
    error_msg: t("outerLayout.form.errors.invalidPhone"),
  };
};

export const isPhoneNumber = (value: string) => {
  const MIN_PHONE_LENGTH = 6;

  const REGEXS = {
    IS_NUMERIC: /^\d+$/,
    FIRST_SIX_NUMERIC: /^\d{6,}/,
  };

  const hasMinLength = value.length > 0;
  const hasMinNumericLength = value.length >= MIN_PHONE_LENGTH;

  const isNumeric = REGEXS.IS_NUMERIC.test(value);
  const isFirstSixNumeric = REGEXS.FIRST_SIX_NUMERIC.test(value);

  const hasValidPhoneNumber =
    (hasMinLength && isNumeric) ||
    (hasMinNumericLength && !isNumeric && isFirstSixNumeric);
  return hasValidPhoneNumber;
};

export const optionalButHasValidation = (
  validation: IValidation
): IValidation => {
  const stringifiedPattern = validation.pattern.toString().slice(1, -1);
  const optionalPattern = stringifiedPattern
    .replace("^", "^(|")
    .replace("$", ")$");

  const modifiedRegex = new RegExp(optionalPattern);

  return {
    pattern: modifiedRegex,
    error_msg: validation.error_msg,
  };
};
