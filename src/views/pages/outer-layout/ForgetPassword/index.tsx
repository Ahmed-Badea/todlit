import { Country, IField } from "../../../../types/outer-layout";
import { getCountryFromDomain } from "../../../../utils/getCountryFromDomain";
import OuterLayout from "../../../../views/layout/OuterLayout";
import { Dispatch, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { passwordsComparisonLiteral, validateField as fieldValidator } from '../../../../utils/formValidations';
import UserCheck from "./steps/UserCheck";
import { OUTER_ROUTES } from "../../../../routes/outer-routes";
import ResetPassword from "./steps/ResetPassword";
import OtpStep from "./steps/OtpStep";

const STEPS = {
  EMAIL: 1,
  OTP: 2,
  RESET_PASSWORD: 3,
};

const country: Country = getCountryFromDomain();

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.EMAIL);
  const [phoneNumber, setPhoneNumber] = useState('');

  const validateField = (fields: IField, setFields: Dispatch<(prevState: IField) => IField>, fieldName: string, value: string) => {

    let valueToValidate = value;

    if (fieldName === 'confirm_password') {
      const passwordValue = fields["password"].value as string;
      const confirmPasswordValue = fields["confirm_password"].value as string;

      const passwordsLiteral = passwordsComparisonLiteral(passwordValue, confirmPasswordValue);
      valueToValidate = passwordsLiteral;
    };

    fieldValidator(fields, setFields, fieldName, valueToValidate);
  };

  const redirectToRegister = () => {
    navigate(OUTER_ROUTES.REGISTER);
  };

  const formSubTitles = {
    [STEPS.EMAIL]: t('outerLayout.form.forgetPassword.enterEmail'),
    [STEPS.OTP]: t('outerLayout.form.enterTheCode').replace('{{phoneNum}}', phoneNumber),
    [STEPS.RESET_PASSWORD]: ""
  }

  return (
    <OuterLayout
      formLegend={currentStep === STEPS.RESET_PASSWORD ? t('outerLayout.form.forgetPassword.createNewPassword') : t('outerLayout.form.forgetPassword.forgotPassword')}
      formSubTitle={formSubTitles[currentStep]}>
      {
        currentStep === STEPS.EMAIL &&
        <UserCheck
          setPhoneNumber={setPhoneNumber}
          validateField={validateField}
          loading={loading}
          setLoading={setLoading}
          setCurrentStep={setCurrentStep}
          STEPS={STEPS}
          redirectToRegister={redirectToRegister}
          country={country}
        />
      }
      {
        currentStep === STEPS.OTP &&
        <OtpStep
          loading={loading}
          setLoading={setLoading}
          setCurrentStep={setCurrentStep}
          STEPS={STEPS}
          redirectToRegister={redirectToRegister}
        />
      }
      {
        currentStep === STEPS.RESET_PASSWORD &&
        <ResetPassword
          validateField={validateField}
          loading={loading}
          setLoading={setLoading}
        />
      }
    </OuterLayout>
  )
}

export default ForgetPassword;