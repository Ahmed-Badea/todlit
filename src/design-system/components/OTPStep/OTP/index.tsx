import { useState, useEffect, useMemo } from 'react';

import styles from './otp.module.scss';
import { IOTPProps } from '../../../types/OTP';

export function OTP(props: IOTPProps) {
  const { length, customStyle, otpValue, onComplete, onValid, isError, setOtp } = props;
  const [value, setValue] = useState(otpValue ?? '');

  const RExp_DIGIT = new RegExp(/^\d+$/);

  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];
    for (let i = 0; i < length; i++) {
      const char = valueArray[i];

      if (RExp_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, length]);

  useEffect(() => {
    setValue(otpValue ?? '');
    setOtp(otpValue ?? '');
  }, [otpValue]);

  useEffect(() => {
    if (value.length === length) onValid(true);
    else onValid(false);
  }, [value, length]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RExp_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      let newValue = '';
      if (!isTargetValueDigit) {
        newValue = value.substring(0, idx);
        setValue(newValue);
        setOtp(newValue);
        return;
      }
      newValue = value.substring(0, idx) + targetValue;
      setValue(newValue);
      setOtp(newValue);
      if (idx == length - 1) {
        onComplete(newValue);
        target.blur();
      } else {
        focusToNextInput(target);
        const nextElementSibling =
          target.nextElementSibling as HTMLInputElement | null;

        if (nextElementSibling) {
          nextElementSibling.focus();
        }
      }
    } else if (targetValueLength === length) {
      setValue(targetValue);
      setOtp(targetValue);
      onComplete(targetValue);
      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }

    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;
    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className={styles['container']}>
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          pattern="\d{1}"
          maxLength={length}
          className={styles['otp-input']}
          data-input-error={isError}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onFocus={inputOnFocus}
          onKeyDown={inputOnKeyDown}
          placeholder="•"
          style={customStyle}
        />
      ))}
    </div>
  );
}

export default OTP;
