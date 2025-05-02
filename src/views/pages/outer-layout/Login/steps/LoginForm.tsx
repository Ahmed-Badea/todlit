import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Input, Button } from '../../../../../design-system'
import {
  required,
  isFormValid,
  validateField,
  emailValidation
} from '../../../../../utils/formValidations';
import { useEnterKeyPress } from '../../../../../hooks/useEnterKeyPress';
import type { IField, ILoginForm } from '../../../../../types/outer-layout';
import { Spinner } from '../../../../../assets/icons';
import { login } from '../../../../../services/outer-layout/login';
import { handleAfterLogin } from '../utils';
import styles from "../login.module.scss";
import { OUTER_ROUTES } from '../../../../../routes/outer-routes';


const FieldNames = {
  EMAIL: "email",
  PASSWORD: "password",
};

const fieldsInitialState = {
  [FieldNames.EMAIL]: {
    value: '',
    isValid: undefined,
    errorMsg: '',
    validations: [required, emailValidation]
  },
  [FieldNames.PASSWORD]: {
    value: '',
    isValid: undefined,
    errorMsg: '',
    validations: [required]
  }
};

const SUBMIT_BTN_ID = 'login-form-submit-btn';

const LoginForm = (
  {
    loading,
    setLoading,
    // setCurrentStep,
    // STEPS,
    redirectToRegister,
  }: ILoginForm
) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEnterKeyPress(SUBMIT_BTN_ID);

  const [serverErrMsg, setServerErrMsg] = useState('');
  const [fields, setFields] = useState<IField>(fieldsInitialState);
  const [focusedElement, setFocusedElement] = useState<string | undefined>();

  const onChangeHandler = (fieldName: string, value: string) => {
    setServerErrMsg("");
    setFocusedElement(fieldName === FieldNames.EMAIL ? FieldNames.EMAIL : FieldNames.PASSWORD);

    setFields(prevState => {
      return ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          value: value
        }
      })
    });

    validateField(fields, setFields, fieldName, value);
  };

  const handleForgetPassword = () => {
    navigate(OUTER_ROUTES.FORGET_PASSWORD);
  };

  const handleLogin = () => {
    setLoading(true);
    setServerErrMsg("");

    const args = {
      "email": fields[FieldNames.EMAIL].value as string,
      "password": fields[FieldNames.PASSWORD].value as string,
    };

    login(args)
      .then((response) => {
        handleAfterLogin(response, navigate);
      })
      .catch((error) => {
        const errorMsg = error.response?.data.error;

        setServerErrMsg(errorMsg || t('outerLayout.form.errors.somethingWentWrong'));
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
        value={fields[FieldNames.EMAIL].value}
        required
        autoFocus={focusedElement === FieldNames.EMAIL}
        onChange={(e) => { onChangeHandler(FieldNames.EMAIL, e.target.value) }}
        status={fields[FieldNames.EMAIL].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.EMAIL].errorMsg}
        // preventAutoComplete
      />

      <Input
        id={FieldNames.PASSWORD}
        name={FieldNames.PASSWORD}
        type='password'
        label={t('outerLayout.form.labels.password')}
        value={fields[FieldNames.PASSWORD].value}
        required
        onChange={(e) => { onChangeHandler(FieldNames.PASSWORD, e.target.value) }}
        forgetPasswordHandler={handleForgetPassword}
        forgetPasswordText={t('outerLayout.form.login.forgotPassword')}
        status={fields[FieldNames.PASSWORD].isValid === false ? 'error' : 'default'}
        error={fields[FieldNames.PASSWORD].errorMsg}
        // preventAutoComplete
        autoFocus={focusedElement === FieldNames.PASSWORD}
      />
      <div className='form__submit'>
        {serverErrMsg && <div className='form__submit__server-err'>{serverErrMsg}</div>}
        <Button
          id={SUBMIT_BTN_ID}
          size='lg'
          color='primary'
          variant='contained'
          text={loading ? undefined : t('outerLayout.form.login.signIn')}
          leadingIcon={loading ? Spinner : undefined}
          disabled={!isFormValid(fields) || loading}
          onClickHandler={handleLogin}
        />
      </div>

      <div className={styles["login-form__dont-have-account"]}>
        <span className={styles["login-form__dont-have-account__text"]}>{t('outerLayout.form.dontHaveAcc')}</span>
        <div className={styles["login-form__dont-have-account__action"]}>
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

export default LoginForm;