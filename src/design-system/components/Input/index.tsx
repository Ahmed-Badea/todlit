import styles from './input.module.scss';
import { Label } from '../Label';
import { Button } from '../Button';
import { IInput } from '../../types/Input/input';

import {
  CircleCheckIcon,
  CircleExclamationIcon,
  OpenedEyeIcon,
  ClosedEyeIcon,
  LockIcon,
} from '../../assets/Icons';
import { forwardRef, useState } from 'react';

const isMatch = ({
  value = '',
  pattern,
}: {
  value?: string;
  pattern?: RegExp;
}) => pattern?.test(value);

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      id,
      name,
      value,
      label,
      labelText,
      hintText,
      required,
      placeholder,
      type = 'text',
      status = 'default',
      disabled,
      autoFocus = false,
      leadingIcon,
      rules,
      onChange,
      onBlur,
      forgetPasswordHandler,
      forgetPasswordText = 'Forgot password?',
      error,
      extra,
      preventAutoComplete,
      isEditable = true,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShow) => !prevShow);

    return (
      <div className={styles['container']} data-input-status={status}>
        {(label || labelText) && <Label text={label} hintText={labelText} inputName={id} />}

        <div className={styles['container__wrapper']}>
          {leadingIcon && type !== 'password' &&
            <span className={styles['container__wrapper__leading-icon']}>
              {leadingIcon}
            </span>
          }
          {/* {type === 'password' &&
            <span className={styles['container__wrapper__leading-icon']}>
              {LockIcon}
            </span>
          } */}
          <input
            id={id}
            name={name}
            value={value}
            className={`${styles['container__wrapper__input']} ${
              !isEditable ? styles['no-border'] : ''
            }`}
            placeholder={placeholder}
            type={showPassword ? 'text' : type}
            disabled={disabled}
            autoFocus={autoFocus}
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            autoComplete={preventAutoComplete ? 'one-time-code' : 'on'}
          />
          {type === 'password' &&
            <span
              className={styles['container__wrapper__trailing-icon']}
              onClick={handleShowPassword}
            >
              {!showPassword && OpenedEyeIcon}
              {showPassword && ClosedEyeIcon}
            </span>}
        </div>

        {hintText && (
          <span className={styles['container__hintText']}>{hintText}</span>
        )}

        {error && (
          <span className={styles['container__hintText']}>{error}</span>
        )}

        {type === 'password' && forgetPasswordHandler &&
          <div className={styles['container__forget-password']}>
            <Button size='sm' color='primary' variant='link' text={forgetPasswordText} onClickHandler={forgetPasswordHandler} />
          </div>
        }

        {type === 'password' && rules && (
          <div className={styles['container__rules']}>
            {rules?.map((rule) => (
              <div
                key={rule.label}
                className={styles['container__rules__rule']}
                data-input-rule={
                  !value
                    ? 'default'
                    : isMatch({ value, pattern: rule.pattern })
                      ? 'success'
                      : 'default'
                }
              >
                {CircleCheckIcon}
                <span>{rule.label}</span>
              </div>
            ))}
          </div>
        )}

        {extra}
      </div>
    );
  }
);
