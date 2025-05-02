import { useEffect, useState } from 'react';

import styles from './resend-otp.module.scss';
import { IResendOTPProps } from '../../../types/OTP';
import { Button } from '../../Button';

const timerFormater = (timeInMinutes: number, timeInSeconds: number) =>
  ` ${String(timeInMinutes).padStart(2, '0')}:${String(timeInSeconds).padStart(
    2,
    '0'
  )}${timeInMinutes <= 0 ? 's' : ''}`;

export function ResendOTP(props: IResendOTPProps) {
  const { time, onSubmit, text, customStyle, resetOtpTimer, setResetOtpTimer, resendBtnText } = props;
  const [currentTime, setCurrentTime] = useState<number>(time);
  const timeInMinutes = Math.floor(currentTime / 60);
  const timeInSeconds = currentTime % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime === 0) {
        clearInterval(interval);
      } else {
        setCurrentTime(currentTime - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  useEffect(() => {
    if (resetOtpTimer) {
      setCurrentTime(time);
      setResetOtpTimer && setResetOtpTimer(false);
    }
  }, [resetOtpTimer]);


  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className={styles['container']}>
      <div className={styles['resend-otp-msg']}>
        {currentTime ? (
          <span className={styles['timer']} style={customStyle?.resendAction}>
            {text}
            {timerFormater(timeInMinutes, timeInSeconds)}
          </span>
        ) : (
          <Button
            text={resendBtnText}
            onClickHandler={handleSubmit}
            variant="link"
            size="sm"
          />
        )}
      </div>
    </div>
  );
}

export default ResendOTP;
