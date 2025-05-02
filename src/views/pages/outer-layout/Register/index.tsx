import { Dispatch, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@design-system';
import { addToLocalStorage, deleteFromLocalStorage } from '@app/utils/manageLocalStorage';
import { passwordsComparisonLiteral, validateField as fieldValidator } from '@app/utils/formValidations';
import { successIcon } from "@app/assets/icons";
import FinalStepInfo from '@app/components/FinalStepInfo';
import type { IField } from '@app/types/outerLayout';
import OuterLayout from '@app/views/layout/outerLayout';
import { OUTER_ROUTES } from '@app/routes/outer-routes';
import RegisterForm from './steps/RegisterForm';

const STEPS = {
  REGISTER: 1,
  SUCCESSFUL_REGISTER: 2
}

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.REGISTER);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('leads')) {
      const pathSegments = path.split("/");
      const leadToken = pathSegments[pathSegments.length - 1];

      setLeadToken(leadToken);
    }
  }, []);

  useEffect(() => {
    const searchParams = window.location.search;
    const flash = new URLSearchParams(searchParams).get("flash");

    flash === "true" ?
      addToLocalStorage("flash_redirect", "true")
      :
      deleteFromLocalStorage("flash_redirect");
  }, []);

  const formSubTitles = {
    [STEPS.REGISTER]: t('outerLayout.form.register.fillBelowFields'),
    [STEPS.SUCCESSFUL_REGISTER]: '',
  }

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

  const redirectToLogin = () => {
    navigate(OUTER_ROUTES.LOGIN);
  };


  return (
    <OuterLayout
      renderUsps={true}
      formLegend={currentStep !== STEPS.SUCCESSFUL_REGISTER && t('outerLayout.form.register.signUp')}
      formSubTitle={formSubTitles[currentStep]}
    >
      {
        currentStep === STEPS.REGISTER &&
        <RegisterForm
          validateField={validateField}
          loading={loading}
          setLoading={setLoading}
          redirectToLogin={redirectToLogin}
          setCurrentStep={setCurrentStep}
          STEPS={STEPS}
        />
      }
      {
        currentStep === STEPS.SUCCESSFUL_REGISTER &&
        <FinalStepInfo
          text={t('outerLayout.form.register.success')}
          img={successIcon}
        />
      }
    </OuterLayout >
  )
}

export default Register;