import { useState, useCallback, useMemo, type ChangeEvent } from 'react';
import type { ITextArea } from '../../types/text_area';
import { Label } from '../Label';
import styles from './text-area.module.scss';

const localeMessages = {
  en: {
    characterLimitReached: 'Character limit reached',
    characters: 'characters',
  },
  ar: {
    characterLimitReached: 'تم الوصول إلى الحد المسموح به من الأحرف',
    characters: 'حرف',
  },
};

const TextArea = ({
  name,
  lang = 'en',
  variant = 'default',
  maxLength = 500,
  minLength,
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  resize = 'none',
  label,
  optionalText,
  placeholder,
  defaultValue,
  value,
  helperText,
  errorMessage,
  showCharactersCount = false,
  onChange,
}: ITextArea) => {
  const characterCountDefault = value?.length || defaultValue?.length || 0;
  const [charactersCount, setCharactersCount] = useState(characterCountDefault);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value.trim();

      if (maxLength && newValue.length > maxLength) {
        return;
      } else {
        setCharactersCount(newValue.length);
        onChange?.(event);
      }
    },
    [maxLength, onChange]
  );

  const isReachedLimit = useMemo(
    () => !!(maxLength && charactersCount >= maxLength),
    [maxLength, charactersCount]
  );

  return (
    <div
      className={styles['textarea-container']}
      data-textarea-variant={variant}
    >

      {label && <Label text={label} hintText={optionalText && `(${optionalText})`} />}

      <div className={styles['textarea-container__textarea-wrapper']}>
        <textarea
          name={name}
          style={{ resize }}
          placeholder={placeholder}
          value={value || defaultValue}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          onChange={handleChange}
        />
      </div>

      <div className={styles['textarea-container__bottom-text']}>

        {
          !!(isReachedLimit || errorMessage || helperText) &&
          <span
            className={
              (isReachedLimit || errorMessage) &&
              styles['textarea-container__bottom-text--error']}
          >
            {
              isReachedLimit ?
                localeMessages[lang].characterLimitReached
                :
                errorMessage || helperText
            }
          </span>
        }

        {
          showCharactersCount &&
          <div className={styles['textarea-container__bottom-text--fixed-end']}>
            {
              lang === 'en' ?
                `${charactersCount}/${maxLength}`
                :
                `${maxLength}/${charactersCount}`
            }
            {` ${localeMessages[lang].characters}`}
          </div>
        }
      </div>

    </div>
  );
};

export default TextArea;
