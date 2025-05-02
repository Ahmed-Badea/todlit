import { CSSProperties, Dispatch, SetStateAction } from 'react';

export interface IOTPStepProps {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  onValid: (valid: boolean) => void;
  onResendOTP?: () => void;
  length?: number;
  resendText?: string;
  resendBtnText?: string;
  resendTimer?: number;
  resetOtpTimer?: boolean;
  setResetOtpTimer?: Dispatch<SetStateAction<boolean>>;
  error?: string;
  customStyle?: { [key: string]: CSSProperties };
}

export interface IOTPProps {
  setOtp: Dispatch<SetStateAction<string>>;
  length: number;
  customStyle?: CSSProperties;
  otpValue?: string;
  onComplete: (value: string) => void;
  onValid: (valid: boolean) => void;
  isError?: boolean;
}

export interface IResendOTPProps {
  time: number;
  onSubmit: () => void;
  text: string;
  resendBtnText?: string;
  customStyle?: { [key: string]: CSSProperties };
  resetOtpTimer?: boolean;
  setResetOtpTimer?: Dispatch<SetStateAction<boolean>>;
}
