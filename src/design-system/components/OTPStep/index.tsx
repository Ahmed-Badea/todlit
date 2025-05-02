import styles from './otp-step.module.scss';
import { IOTPStepProps } from '../../types/OTP';
import OTP from './OTP';
import ResendOTP from './ResendOTP';

export function OTPStep(props: IOTPStepProps) {
  const {
    otp,
    setOtp,
    onResendOTP,
    onValid,
    resendText = 'Resend code in',
    resendBtnText = "Re-send",
    resendTimer = 60,
    resetOtpTimer,
    setResetOtpTimer,
    error,
    customStyle,
    length = 4,
  } = props;

  const handleResend = () => {
    if (onResendOTP) {
      onResendOTP();
      setOtp('');
    }
  };

  const onComplete = (otp: any) => {
    setOtp(otp);
  };

  return (
    <div className={styles['container']}>
      <div>
        <OTP
          setOtp={setOtp}
          length={length}
          otpValue={otp}
          onComplete={onComplete}
          customStyle={customStyle?.input}
          onValid={onValid}
          isError={!!error}
        />
      </div>

      {error && <div className={styles['error-message']}>{error}</div>}

      {onResendOTP && (
        <ResendOTP
          time={resendTimer}
          onSubmit={handleResend}
          customStyle={customStyle}
          text={resendText}
          resetOtpTimer={resetOtpTimer}
          setResetOtpTimer={setResetOtpTimer}
          resendBtnText={resendBtnText}
        />
      )}
    </div>
  );
}

export default OTPStep;
