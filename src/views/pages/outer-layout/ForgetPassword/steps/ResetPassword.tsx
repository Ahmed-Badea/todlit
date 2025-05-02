import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@design-system";
import {
  isFormValid,
  passwordMatchValidation,
  passwordValidationRules,
  passwordValidations,
  required
} from "@app/utils/formValidations";
import { Spinner } from "@app/assets/icons";
import { useEnterKeyPress } from "@app/hooks/useEnterKeyPress";
import { resetPassword } from "@app/services/outer-layout/forget-password";
import { IField, IResetPassword } from "@app/types/outerLayout";
import { OUTER_ROUTES } from "@app/routes/outer-routes";


const SUBMIT_BTN_ID = 'reset-password-submit-btn';

const FieldNames = {
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirm_password",
};

const fieldsInitialState = {
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
  },
};

const ResetPassword = ({
  validateField,
  loading,
  setLoading
}: IResetPassword
) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEnterKeyPress(SUBMIT_BTN_ID);

  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [fields, setFields] = useState<IField>(fieldsInitialState);
  const [serverErrMsg, setServerErrMsg] = useState('');

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

  const onChangeHandler = (fieldName: string, value: string) => {
    setServerErrMsg("");

    setFields(prevState => {
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

    const password = fields[FieldNames.PASSWORD].value as string;

    resetPassword(password)
      .then(() => {
        navigate(OUTER_ROUTES.LOGIN);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        setServerErrMsg(message || t('outerLayout.form.errors.somethingWentWrong'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
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
          size='md'
          color='primary'
          variant='contained'
          text={loading ? undefined : t('outerLayout.form.forgetPassword.submitNewPassword')}
          leadingIcon={loading ? Spinner : undefined}
          disabled={!isFormValid(fields) || loading}
          onClickHandler={handleSubmit}
        />
      </div>
    </>
  )
}

export default ResetPassword;