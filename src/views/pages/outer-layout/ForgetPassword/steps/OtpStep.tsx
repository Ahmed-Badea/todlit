import { Dispatch, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, OTPStep } from '@design-system';
import { useEnterKeyPress } from '@app/hooks/useEnterKeyPress';
import { Spinner } from '@app/assets/icons';
import { IForgetPasswordOtpStep } from '@app/types/outerLayout';
import { forgetPasswordVerifyOtp } from '@app/services/outer-layout/forget-password';
import styles from "../forget-password.module.scss";


const SUBMIT_BTN_ID = 'forget-password-otp-submit-btn';

const OtpStep = (
  {
    loading,
    setLoading,
    setCurrentStep,
    STEPS,
    redirectToRegister
  }: IForgetPasswordOtpStep
) => {
  const { t } = useTranslation();
  useEnterKeyPress(SUBMIT_BTN_ID);

  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [serverErrMsg, setServerErrMsg] = useState('');
  const [serverSuccessMsg, setServerSuccessMsg] = useState('');
  const [resetOtpTimer, setResetOtpTimer] = useState(false);

  useEffect(() => {
    setServerErrMsg("");
    setServerSuccessMsg("");
  }, [otp]);

  const onValidHandler = (valid: boolean) => {
    setIsValid(valid);
  };

  const onResendOTP = () => {
    setServerErrMsg("");
    setServerSuccessMsg("");
    setLoading(true);

    forgetPasswordResendOtp("forget_password")
      .then(() => {
        setResetOtpTimer(true);
        setIsValid(false);
        setServerSuccessMsg(t('outerLayout.form.otpResent'));
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        setServerErrMsg(message || t('outerLayout.form.errors.somethingWentWrong'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOtpSubmit = () => {
    setServerErrMsg("");
    setServerSuccessMsg("");
    setLoading(true);


    forgetPasswordVerifyOtp(otp)
      .then(() => {
        setCurrentStep(STEPS.RESET_PASSWORD);
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        setServerErrMsg(message ? t('outerLayout.form.errors.wrongOtp') : t('outerLayout.form.errors.somethingWentWrong'));
      })
      .finally(() => {
        setLoading(false);
      });


  };

  return (
    <>
      <OTPStep
        otp={otp}
        setOtp={setOtp}
        resetOtpTimer={resetOtpTimer}
        setResetOtpTimer={setResetOtpTimer}
        onValid={onValidHandler}
        onResendOTP={onResendOTP}
        resendText={t('outerLayout.form.resendCodeIn')}
        resendBtnText={t('outerLayout.form.resend')}
        resendTimer={150}
        length={6}
      />
      <div className='form__submit'>
        {serverErrMsg && !serverSuccessMsg && <div className='form__submit__server-err'>{serverErrMsg}</div>}
        {serverSuccessMsg && !serverErrMsg && <div className='form__submit__server-success'>{serverSuccessMsg}</div>}

        <Button
          id={SUBMIT_BTN_ID}
          size='md'
          color='primary'
          variant='contained'
          text={loading ? undefined : t('outerLayout.form.next')}
          leadingIcon={loading ? Spinner : undefined}
          disabled={!isValid || loading}
          onClickHandler={handleOtpSubmit}
        />
      </div>

      <div className={styles["forget-password-form__dont-have-account"]}>
        <span className={styles["forget-password-form__dont-have-account__text"]}>{t('outerLayout.form.dontHaveAcc')}</span>
        <div className={styles["forget-password-form__dont-have-account__action"]}>
          <Button
            size='sm'
            color='primary'
            variant='link'
            text={t('outerLayout.form.signUp')}
            onClickHandler={redirectToRegister}
          />
        </div>
      </div>
    </>
  )
}

export default OtpStep;