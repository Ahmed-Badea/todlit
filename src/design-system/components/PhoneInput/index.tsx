import { ChangeEvent, useState, forwardRef } from 'react';

import {
  DropdownChevronIcon,
  EGIcon,
  AEIcon,
  OMIcon,
  PKIcon,
  SAIcon,
  DropdownCheckMarkIcon,
} from '../../assets/Icons';
import styles from './index.module.scss';
import { ICountries, ICountry, IPhoneInputProps } from '../../types/phone_input';
import { Label } from '../Label';

export const Countries: ICountries = {
  eg: {
    name: 'Egypt',
    countryIso2: 'eg',
    countryIso3: 'EGY',
    countryCode: '+2',
    phoneLength: 11,
    icon: EGIcon,
  },
  pk: {
    name: 'Pakistan',
    countryIso2: 'pk',
    countryIso3: 'PAK',
    countryCode: '+92',
    phoneLength: 10,
    icon: PKIcon,
  },
  ae: {
    name: 'United Arab Emirates',
    countryIso2: 'ae',
    countryIso3: 'ARE',
    countryCode: '+971',
    phoneLength: 9,
    icon: AEIcon,
  },
  sa: {
    name: 'Saudi Arabia',
    countryIso2: 'sa',
    countryIso3: 'SAU',
    countryCode: '+966',
    phoneLength: 9,
    icon: SAIcon,
  },
  om: {
    name: 'Oman',
    countryIso2: 'om',
    countryIso3: 'OMN',
    countryCode: '+968',
    phoneLength: 8,
    icon: OMIcon,
  },
};

export const PhoneInput = forwardRef<HTMLInputElement, IPhoneInputProps>(
  (props, ref) => {
    const {
      id,
      name,
      label,
      labelHint,
      defaultPhoneNumber,
      placeholder,
      disabled,
      autoFocus = false,
      error,
      onChangeHandler,
      onCountryChange,
      defaultCountry = 'eg',
      disableSelectCountry,
      onBlur,
      canToggleToTextInput = false,
    } = props;
    const [selectedCountry, setSelectedCountry] = useState(
      Countries[defaultCountry] || Countries.eg
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const [value, setValue] = useState(defaultPhoneNumber || '');

    const toggleDropdown = () => {
      setShowDropdown((prevState) => !prevState);
    };

    const selectCountry = (country: ICountry) => {
      setSelectedCountry(country);
      setShowDropdown(false);
      onChangeHandler(country.countryCode + value);
      onCountryChange && onCountryChange(country.countryIso2);
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === '') {
        setValue('');
        onChangeHandler('');
        return;
      }

      if (!/^[0-9]+$/.test(value) && !canToggleToTextInput) return;

      setValue(value);
      onChangeHandler(selectedCountry.countryCode + value);
    };

    return (
      <div className={`${styles['container']}`}>
        {(label || labelHint) && <Label text={label} hintText={labelHint} />}
        <div
          data-input-invalid={!!error}
          className={styles['container__controller']}
          data-input-disabled={disabled}
          tabIndex={0}
        >
          <button
            type="button"
            className={styles['container__controller__button']}
            onClick={toggleDropdown}
            disabled={disableSelectCountry}
            data-btn-toggle={showDropdown}
          >
            <div
              className={styles['container__controller__button__country-icon']}
            >
              {selectedCountry?.icon}
            </div>
            <label>{selectedCountry?.countryCode}</label>
            <div
              className={styles['container__controller__button__chevron-icon']}
            >
              {!disableSelectCountry && DropdownChevronIcon}
            </div>
          </button>
          <input
            id={id}
            name={name}
            onChange={handlePhoneChange}
            value={value}
            className={styles['container__controller__input']}
            placeholder={placeholder}
            maxLength={Countries[selectedCountry.countryIso2].phoneLength}
            autoComplete="off"
            type="tel"
            inputMode="tel"
            disabled={disabled}
            autoFocus={autoFocus}
            onBlur={onBlur}
            ref={ref}
          />
        </div>
        {showDropdown && (
          <div className={styles['container__dropdown']}>
            {Object.values(Countries).map((country) => (
              <div
                key={country.countryCode}
                className={styles['container__dropdown__country']}
                data-country-active={
                  selectedCountry.countryCode === country.countryCode
                }
                onClick={() => selectCountry(country)}
              >
                <div
                  className={styles['container__dropdown__country__details']}
                >
                  <div
                    className={
                      styles['container__dropdown__country__details__icon']
                    }
                  >
                    {country.icon}
                  </div>
                  <div
                    className={
                      styles['container__dropdown__country__details__info']
                    }
                  >
                    <div>{country.name}</div>
                    <div>{country.countryCode}</div>
                  </div>
                </div>
                <div
                  className={
                    styles['container__dropdown__country__trailing__info']
                  }
                >
                  {selectedCountry.countryCode === country.countryCode &&
                    DropdownCheckMarkIcon}
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <span className={styles['container__error']}>{error}</span>}
      </div>
    );
  }
);
