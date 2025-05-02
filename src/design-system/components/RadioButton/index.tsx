import { forwardRef } from 'react';

import styles from './radioButton.module.scss';
import { IRadioButton } from '../../types/radio_button/radioButton';

export const RadioButton = forwardRef<HTMLInputElement, IRadioButton>(
  (
    {
      id,
      name,
      value,
      text,
      hint,
      size = 'sm',
      onChange,
      onBlur,
      defaultChecked,
      checked,
      disabled,
      variant = 'default',
    },
    ref
  ) => {
    return (
      <label
        className={`${styles['control']} ${styles['control__radio']}`}
        data-radio-variant={variant}
      >
        <div className={styles['control__text__wrapper']}>
          <div className={styles['control__text']}>{text}</div>
          {hint && <div className={styles['control__hint']}>{hint}</div>}
        </div>
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          defaultChecked={defaultChecked}
          checked={checked}
          disabled={disabled}
          ref={ref}
        />
        <div
          className={styles['control__indicator']}
          data-radio-size={size}
        ></div>
      </label>
    );
  }
);
