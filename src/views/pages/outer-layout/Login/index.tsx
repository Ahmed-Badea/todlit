import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { googleTagManagerInitializer } from '@app/utils/googleTagManager';
import OuterLayout from '@app/views/layout/outerLayout';
import LoginForm from './steps/LoginForm';
import { OUTER_ROUTES } from '@app/routes/outer-routes';


const STEPS = {
  LOGIN: 1
}

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // googleTagManagerInitializer();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.LOGIN);

  const redirectToRegister = () => {
    navigate(OUTER_ROUTES.REGISTER);
  };

  const formSubTitles = {
    [STEPS.LOGIN]: ''
  }

  return (
    <OuterLayout
      formLegend={t('outerLayout.form.login.signIn')}
      formSubTitle={formSubTitles[currentStep]}
    >
      {
        currentStep === STEPS.LOGIN &&
        <>
          <LoginForm
            loading={loading}
            setLoading={setLoading}
            setCurrentStep={setCurrentStep}
            STEPS={STEPS}
            redirectToRegister={redirectToRegister}
          />
        </>
      }
    </OuterLayout>
  )
}

export default Login;