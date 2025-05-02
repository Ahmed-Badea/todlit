import { Dispatch, ReactNode } from "react";

export interface IValidation {
  pattern: RegExp;
  error_msg: string;
};

export interface IField {
  [x: string]: {
    value?: string;
    isValid?: boolean;
    errorMsg: string;
    validations: { pattern: RegExp; error_msg: string; }[];
  }
};

export type Country = 'EGY' | 'SAU' | 'ARE' | 'OMN' | 'JOR' | 'PAK';

export type LabelValuePair = { label: string, value: string };

export type PublicKeyType = "login" | "register" | "resend" | "verify" | "forget_password";

// components

interface IOtpStep {
  loading: boolean,
  setLoading: Dispatch<boolean>,
};

interface IPhoneNumberVerification {
  setPhoneNumber: Dispatch<string>,
  validateField: (fields: IField, setFields: Dispatch<(prevState: IField) => IField>, fieldName: string, value: string) => void,
  loading: boolean,
  setLoading: Dispatch<boolean>,
  setCurrentStep: Dispatch<number>,
};

export interface IOuterLayout {
  renderUsps?: boolean,
  formLegend: string,
  formSubTitle?: string,
  children: ReactNode
};


export interface IUserCheck {
  setPhoneNumber: Dispatch<string>,
  validateField: (fields: IField, setFields: Dispatch<(prevState: IField) => IField>, fieldName: string, value: string) => void,
  loading: boolean,
  setLoading: Dispatch<boolean>,
  setCurrentStep: Dispatch<number>,
  STEPS: { USER_NAME_OR_PHONE_NUMBER: number, PHONE_NUMBER_VERIFICATION: number, OTP: number, RESET_PASSWORD: number },
  redirectToRegister: () => void,
  country: Country
};

export interface IForgetPasswordOtpStep extends IOtpStep {
  setCurrentStep: Dispatch<number>,
  STEPS: { USER_NAME_OR_PHONE_NUMBER: number, PHONE_NUMBER_VERIFICATION: number, OTP: number, RESET_PASSWORD: number },
  redirectToRegister: () => void
};

export interface IForgetPasswordPhoneNumberVerification extends IPhoneNumberVerification {
  STEPS: { USER_NAME_OR_PHONE_NUMBER: number, PHONE_NUMBER_VERIFICATION: number, OTP: number, RESET_PASSWORD: number },
  redirectToRegister: () => void,
  country: Country
};

export interface IResetPassword {
  validateField: (fields: IField, setFields: Dispatch<(prevState: IField) => IField>, fieldName: string, value: string) => void,
  loading: boolean,
  setLoading: Dispatch<boolean>
};


export interface ILoginOtpStep extends IOtpStep {
  redirectToRegister: () => void,
  otpToken: string
};

export interface ILoginForm {
  loading: boolean,
  setLoading: Dispatch<boolean>,
  setCurrentStep: Dispatch<number>,
  STEPS: { LOGIN: number, OTP: number },
  redirectToRegister: () => void,
};


export interface IRegisterPhoneNumberVerification extends IPhoneNumberVerification {
  STEPS: { PHONE_NUMBER_VERIFICATION: number, OTP: number, REGISTER: number, SUCCESSFUL_REGISTER: number },
  replacedServerErrMsg: (text: string) => any,
  redirectToLogin: () => void,
  leadToken: string
};

export interface IRegisterOtpStep extends IOtpStep {
  redirectToLogin: () => void,
  setCurrentStep: Dispatch<number>,
  STEPS: { PHONE_NUMBER_VERIFICATION: number; OTP: number; REGISTER: number; SUCCESSFUL_REGISTER: number; },
  phoneNumber: string,
  replacedServerErrMsg: (text: string) => any,
  leadToken: string
};

export interface IRegisterForm {
  validateField: (fields: IField, setFields: Dispatch<(prevState: IField) => IField>, fieldName: string, value: string) => void,
  loading: boolean,
  setLoading: Dispatch<boolean>,
  redirectToLogin: () => void,
  setCurrentStep: Dispatch<number>,
  STEPS: { PHONE_NUMBER_VERIFICATION: number; OTP: number; REGISTER: number; SUCCESSFUL_REGISTER: number; },
};

export interface ISubMerchantActivationOtpStep extends IOtpStep {
  setCurrentStep: Dispatch<number>,
  token: string | null,
  STEPS: { SUB_MERCHANT_ACTIVATION: number, OTP: number, SUCCESSFUL_ACTIVATION: number, ACCOUNT_ALREADY_ACTIVATED: number },
  fields: IField,
  FieldNames: { EMAIL: string; USERNAME_OR_PHONE: string; PASSWORD: string; CONFIRM_PASSWORD: string; },
  redirectToLogin: () => void,
  LOGIN_REDIRECT_TIMEOUT: number
};

export interface ISubMerchantActivationForm {
  validateField: (fields: IField, setFields: Dispatch<(prevState: IField) => IField>, fieldName: string, value: string) => void,
  loading: boolean,
  setLoading: Dispatch<boolean>,
  redirectToLogin: () => void,
  setCurrentStep: Dispatch<number>,
  STEPS: { SUB_MERCHANT_ACTIVATION: number; OTP: number; SUCCESSFUL_ACTIVATION: number, ACCOUNT_ALREADY_ACTIVATED: number },
  country: Country,
  setPhoneNumber: Dispatch<string>,
  setToken: Dispatch<string | null>,
  fields: IField,
  setFields: Dispatch<(prevState: IField) => IField>,
  FieldNames: { EMAIL: string; USERNAME_OR_PHONE: string; PASSWORD: string; CONFIRM_PASSWORD: string; },
  LOGIN_REDIRECT_TIMEOUT: number
};