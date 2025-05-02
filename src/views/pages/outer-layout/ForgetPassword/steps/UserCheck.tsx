import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button } from '../../../../../design-system'
import type { IField, IUserCheck } from '../../../../../types/outer-layout';
import { COUNTRIES_INFO, isFormValid, required, emailValidation } from '../../../../../utils/formValidations';
import { Spinner } from '../../../../../assets/icons';
import { checkUser } from '../../../../../services/outer-layout/forget-password';
import { useEnterKeyPress } from '../../../../../hooks/useEnterKeyPress';
import { addToLocalStorage } from '../../../../../utils/manageLocalStorage';
import styles from "../forget-password.module.scss";

const FieldNames = {
  EMAIL: "username_or_phonenumber"
};

const fieldsInitialState = {
  [FieldNames.EMAIL]: {
    value: '',
    isValid: undefined,
    errorMsg: '',
    validations: [required, emailValidation]
  },
};

const SUBMIT_BTN_ID = 'forget-password-user-check-submit-btn';

const UserCheck = (
  {
    setPhoneNumber,
    validateField,
    loading,
    setLoading,
    setCurrentStep,
    STEPS,
    redirectToRegister,
    country
  }: IUserCheck
) => {
  const { t } = useTranslation();
  useEnterKeyPress(SUBMIT_BTN_ID);

  const [fields, setFields] = useState<IField>(fieldsInitialState);
  const [serverErrMsg, setServerErrMsg] = useState('');

  const handlePhoneChange = (number: string) => {
    setServerErrMsg("");
    const numWithoutPhoneCountryCode = number.replace(COUNTRIES_INFO[country].phone_country_code, '');

    const newState = fields;
    newState[FieldNames.EMAIL].value = numWithoutPhoneCountryCode;

    setFields(newState);
    validateField(fields, setFields, FieldNames.EMAIL, numWithoutPhoneCountryCode);
  };

  const handleSubmit = () => {
    setServerErrMsg("");
    setLoading(true);

    const usernameOrPhone = fields[FieldNames.EMAIL].value as string;

    checkUser(usernameOrPhone)
      .then((response) => {
        const { data: { old_user, token, otp_sent_to } } = response;

        addToLocalStorage("signup_by_phone_token", token);

        if (old_user) {
          setCurrentStep(STEPS.PHONE_NUMBER_VERIFICATION);
        } else {
          setPhoneNumber(otp_sent_to);
          setCurrentStep(STEPS.OTP);
        }

      })
      .catch((error) => {
        const message = error.response?.data?.message;
        setServerErrMsg(message ? t('outerLayout.form.forgetPassword.errors.checkUserNameOrPhone') : t('outerLayout.form.errors.somethingWentWrong'))
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Input
        id={FieldNames.EMAIL}
        name={FieldNames.EMAIL}
        type='text'
        label={t('outerLayout.form.labels.emailAddress')}
        placeholder={t('outerLayout.form.labels.enterEmail')}
        value={fields[FieldNames.EMAIL].value}
        required
        onChange={(e) => { handlePhoneChange(e.target.value) }}
        status={fields[FieldNames.EMAIL].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.EMAIL].errorMsg}
        preventAutoComplete
      />
      <div className='form__submit'>
        {serverErrMsg && <div className='form__submit__server-err'>{serverErrMsg}</div>}
        <Button
          id={SUBMIT_BTN_ID}
          size='lg'
          color='primary'
          variant='contained'
          text={loading ? undefined : t('outerLayout.form.forgetPassword.continue')}
          leadingIcon={loading ? Spinner : undefined}
          disabled={!isFormValid(fields) || loading}
          onClickHandler={handleSubmit}
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

export default UserCheck;