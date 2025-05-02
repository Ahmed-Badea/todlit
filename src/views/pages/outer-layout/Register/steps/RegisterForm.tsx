import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Input,
  Button,
  // Dropdown,
  // DropdownButton,
  // DropdownMenuItem,
  // DropdownMenu,
} from '@design-system';
import {
  required,
  emailValidation,
  isFormValid,
  passwordMatchValidation,
  phoneNumberValidation,
  passwordValidations,
  passwordValidationRules
} from '@app/utils/formValidations';
import type { IField, IRegisterForm } from '@app/types/outerLayout';
import { useEnterKeyPress } from '@app/hooks/useEnterKeyPress';
import { register } from '@app/services/outer-layout/register';
import { Spinner } from '@app/assets/icons';
// import {
//   getRelatedLabel,
//   gender
// } from '../utils';
import styles from "../register.module.scss";

const ONE_SECOND_TIMEOUT = 1000;
const THREE_SECONDS = 3 * ONE_SECOND_TIMEOUT;
const LOGIN_REDIRECT_TIMEOUT = THREE_SECONDS;

const SUBMIT_BTN_ID = 'register-form-submit-btn';

const FieldNames = {
  FIRST_NAME: "first_name",
  LAST_NAME: "last_name",
  // GENDER: "gender",
  EMAIL: "email",
  PHONE: "phone",
  NURSERY_NAME: "Nursery Name",
  // ADDRESS: "Address",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirm_password"
};

const RegisterForm = ({
  validateField,
  loading,
  setLoading,
  redirectToLogin,
  setCurrentStep,
  STEPS
}: IRegisterForm
) => {
  const { t } = useTranslation();
  useEnterKeyPress(SUBMIT_BTN_ID);

  const fieldsInitialState = {
    [FieldNames.FIRST_NAME]: {
      value: '',
      isValid: undefined,
      errorMsg: '',
      validations: [required]
    },
    [FieldNames.LAST_NAME]: {
      value: '',
      isValid: undefined,
      errorMsg: '',
      validations: [required]
    },
    // [FieldNames.GENDER]: {
    //   value: '',
    //   isValid: undefined,
    //   errorMsg: '',
    //   validations: [required]
    // },
    [FieldNames.EMAIL]: {
      value: '',
      isValid: undefined,
      errorMsg: '',
      validations: [required, emailValidation]
    },
    [FieldNames.PHONE]: {
      value: '',
      isValid: undefined,
      errorMsg: '',
      validations: [required, phoneNumberValidation]
    },
    [FieldNames.NURSERY_NAME]: {
      value: '',
      isValid: undefined,
      errorMsg: '',
      validations: [required]
    },
    // [FieldNames.ADDRESS]: {
    //   value: '',
    //   isValid: undefined,
    //   errorMsg: '',
    //   validations: [required]
    // },
    [FieldNames.PASSWORD]: {
      value: undefined,
      isValid: undefined,
      errorMsg: '',
      validations: passwordValidations
    },
    [FieldNames.CONFIRM_PASSWORD]: {
      value: undefined,
      isValid: undefined,
      errorMsg: '',
      validations: [required, passwordMatchValidation]
    }
  };

  const [fields, setFields] = useState<IField>(fieldsInitialState);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [serverErrMsg, setServerErrMsg] = useState('');
  // const [isOpen, setIsOpen] = useState({
  //   [FieldNames.GENDER]: false
  // });

  useEffect(() => {
    const passwordValue = fields[FieldNames.PASSWORD].value;
    const confirmPasswordValue = fields[FieldNames.CONFIRM_PASSWORD].value;

    typeof passwordValue === 'string' &&
      (validateField(fields, setFields, FieldNames.PASSWORD, passwordValue), setShowPasswordRules(true));

    typeof confirmPasswordValue === 'string' && validateField(fields, setFields, FieldNames.CONFIRM_PASSWORD, confirmPasswordValue);

  }, [fields[FieldNames.PASSWORD].value]);

  useEffect(() => {
    const confirmPasswordValue = fields[FieldNames.CONFIRM_PASSWORD].value;
    typeof confirmPasswordValue === 'string' && validateField(fields, setFields, FieldNames.CONFIRM_PASSWORD, confirmPasswordValue);

  }, [fields[FieldNames.CONFIRM_PASSWORD].value]);

  // const toggleDropdown = (fieldName: string) => {
  //   setIsOpen(prevState => ({
  //     ...prevState,
  //     [fieldName]: !prevState[fieldName]
  //   }))
  // };

  // const handleDropDownClick = (fieldName: string, value: string) => {
  //   onChangeHandler(fieldName, value);
  //   toggleDropdown(fieldName);
  // };

  const onChangeHandler = (fieldName: string, value: string) => {
    setServerErrMsg("");

    setFields((prevState: any) => {
      return ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          value: value,
        }
      })
    });

    validateField(fields, setFields, fieldName, value);
  };

  const handleSubmit = () => {
    setServerErrMsg("");
    setLoading(true);

    const args = {
      "firstName": fields[FieldNames.FIRST_NAME].value as string,
      "lastName": fields[FieldNames.LAST_NAME].value as string,
      // "gender": fields[FieldNames.GENDER].value as string,
      "email": fields[FieldNames.EMAIL].value as string,
      "phone": fields[FieldNames.PHONE].value as string,
      "nurseryName": fields[FieldNames.NURSERY_NAME].value as string,
      // "address": fields[FieldNames.ADDRESS].value as string,
      "password": fields[FieldNames.PASSWORD].value as string
    };

    register(args)
      .then(() => {
        setCurrentStep(STEPS.SUCCESSFUL_REGISTER);

        setTimeout(() => {
          redirectToLogin();
        }, LOGIN_REDIRECT_TIMEOUT);
      })
      .catch((error: any) => {
        const message = error.response?.data?.error;

        setServerErrMsg(message || t('outerLayout.form.errors.somethingWentWrong'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Input
        id={FieldNames.FIRST_NAME}
        name={FieldNames.FIRST_NAME}
        type='text'
        label={t('outerLayout.form.register.labels.firstName')}
        value={fields[FieldNames.FIRST_NAME].value}
        required
        onChange={(e) => { onChangeHandler(FieldNames.FIRST_NAME, e.target.value) }}
        status={fields[FieldNames.FIRST_NAME].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.FIRST_NAME].errorMsg}
        preventAutoComplete
      />
      <Input
        id={FieldNames.LAST_NAME}
        name={FieldNames.LAST_NAME}
        type='text'
        label={t('outerLayout.form.register.labels.lastName')}
        value={fields[FieldNames.LAST_NAME].value}
        required
        onChange={(e) => { onChangeHandler(FieldNames.LAST_NAME, e.target.value) }}
        status={fields[FieldNames.LAST_NAME].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.LAST_NAME].errorMsg}
        preventAutoComplete
      />
      <Input
        id={FieldNames.EMAIL}
        name={FieldNames.EMAIL}
        type='email'
        label={t('outerLayout.form.labels.emailAddress')}
        value={fields[FieldNames.EMAIL].value}
        required
        onChange={(e) => { onChangeHandler(FieldNames.EMAIL, e.target.value) }}
        status={fields[FieldNames.EMAIL].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.EMAIL].errorMsg}
        preventAutoComplete
      />
      <Input
        id={FieldNames.PHONE}
        name={FieldNames.PHONE}
        type='email'
        label={t('outerLayout.form.labels.phoneNumber')}
        value={fields[FieldNames.PHONE].value}
        required
        onChange={(e) => { onChangeHandler(FieldNames.PHONE, e.target.value) }}
        status={fields[FieldNames.PHONE].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.PHONE].errorMsg}
        preventAutoComplete
      />
      <Input
        id={FieldNames.NURSERY_NAME}
        name={FieldNames.NURSERY_NAME}
        type='email'
        label={t('outerLayout.form.register.labels.nurseryName')}
        value={fields[FieldNames.NURSERY_NAME].value}
        required
        onChange={(e) => { onChangeHandler(FieldNames.NURSERY_NAME, e.target.value) }}
        status={fields[FieldNames.NURSERY_NAME].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.NURSERY_NAME].errorMsg}
        preventAutoComplete
      />
      {/* <Input
        id={FieldNames.ADDRESS}
        name={FieldNames.ADDRESS}
        type='email'
        label={t('outerLayout.form.register.labels.address')}
        value={fields[FieldNames.ADDRESS].value}
        required
        onChange={(e) => { onChangeHandler(FieldNames.ADDRESS, e.target.value) }}
        status={fields[FieldNames.ADDRESS].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.ADDRESS].errorMsg}
        preventAutoComplete
      /> */}
      <Input
        id={FieldNames.PASSWORD}
        name={FieldNames.PASSWORD}
        type='password'
        label={t('outerLayout.form.labels.password')}
        value={fields[FieldNames.PASSWORD].value}
        {...(showPasswordRules ? { rules: passwordValidationRules } : {})}
        onChange={(e) => { onChangeHandler(FieldNames.PASSWORD, e.target.value) }}
        status={fields[FieldNames.PASSWORD].isValid === false ? 'error' : 'default'}
        preventAutoComplete
      />
      <Input
        id={FieldNames.CONFIRM_PASSWORD}
        name={FieldNames.CONFIRM_PASSWORD}
        type='password'
        label={t('outerLayout.form.labels.confirmPassword')}
        value={fields[FieldNames.CONFIRM_PASSWORD].value}
        onChange={(e) => { onChangeHandler(FieldNames.CONFIRM_PASSWORD, e.target.value) }}
        status={fields[FieldNames.CONFIRM_PASSWORD].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.CONFIRM_PASSWORD].errorMsg}
        preventAutoComplete
      />
      <div className='form__submit'>
        {serverErrMsg && <div className='form__submit__server-err'>{serverErrMsg}</div>}

        <Button
          id={SUBMIT_BTN_ID}
          size='lg'
          color='primary'
          variant='contained'
          text={loading ? undefined : t('outerLayout.form.register.signUp')}
          leadingIcon={loading ? Spinner : undefined}
          disabled={!isFormValid(fields) || loading}
          onClickHandler={handleSubmit}
        />
      </div>
      <div className={styles["register-form__already-have-account"]}>
        <span className={styles["register-form__already-have-account__text"]}>{t('outerLayout.form.register.alreadyHaveAcc')}</span>
        <div className={styles["register-form__already-have-account__action"]}>
          <Button
            size='sm'
            color='primary'
            variant='link'
            text={t('outerLayout.form.register.signIn')}
            onClickHandler={redirectToLogin}
          />
        </div>
      </div>
    </>
  )
}

export default RegisterForm;