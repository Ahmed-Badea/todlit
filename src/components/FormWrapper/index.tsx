import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faTimes, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button, Popup } from "../../design-system";
import successIcon from "../../assets/Icons/successIcon.png";
import { FormWrapperProps, CustomFormRef } from "../../types/inner-layout/form";
import DynamicForm from "./DynamicForm";
import styles from "./formWrapper.module.scss";

const FormWrapper: React.FC<FormWrapperProps> = ({
  fieldsConfig,
  submitFn,
  successMessage,
  mode = "popup",
  title,
  isOpen = false,
  onClose = () => {},
  canEdit = false,
  canDelete = false,
  isFormValid,
  params
}) => {
  const { t } = useTranslation();
  const formRef = useRef<CustomFormRef>(null);
  const [serverErrMsg, setServerErrMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formFieldsValid, setFormFieldsValid] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const formValid = isFormValid !== undefined ? formFieldsValid && isFormValid : formFieldsValid;

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  }

  // Use React Query's useMutation to handle form submission
  const mutation = useMutation(submitFn, {
    onSuccess: () => {
      console.log("success")
      setShowSuccess(true);
      setTimeout(() => {
        if (mode === "popup") {
          onClose?.(); // Close the popup after success
        }
        window.location.reload();
      }, 3000);
    },
    onError: (error: any) => {
      console.log("error")
      const errorMsg = error.response?.data?.error || "Something went wrong. Please try again.";
      setServerErrMsg(errorMsg);
    },
  });

  const handleFormSubmit = () => {
    const formData = formRef.current?.submitForm();
    if (formData && formValid) {
      console.log("Submitting form data:", formData);
      mutation.mutate(formData); // Trigger the mutation
    }
  };

  const renderSuccessMessage = () => (
    <div className={styles["success-message"]}>
      <img src={successIcon} alt="Success" />
      {successMessage}
    </div>
  );

  const renderFormContent = () => (
    <DynamicForm
      ref={formRef}
      mode={mode}
      fieldsConfig={fieldsConfig}
      setFormValid={setFormFieldsValid}
      isLoading={mutation.isLoading}
      setServerErrMsg={setServerErrMsg} // Ensure error message reset on field change
      isEditable={canEdit ? isEditable : true}
      params={params}
    />
  );

  const renderPopup = () => (
    <Popup isOpen={isOpen} onClose={onClose} title={title || "Default Title"}>
      {showSuccess ? 
        renderSuccessMessage() 
      :
        <>
          {renderFormContent()}
          <div className={styles["buttons-container"]}>
            <Button
              size="lg"
              color="primary"
              variant="contained"
              text={mutation.isLoading ? "Loading..." : mode === "popup" ? t("innerLayout.form.submit") : t("innerLayout.form.update")}
              // leadingIcon={mutation.isLoading ? "Loading" : undefined}
              onClickHandler={handleFormSubmit}
              disabled={mutation.isLoading || !formValid}
            />
            <Button
              size="lg"
              color="secondary"
              variant="contained"
              text={t("innerLayout.form.cancel")}
              onClickHandler={onClose}
              disabled={mutation.isLoading}
            />

          </div>
          {serverErrMsg && <p className={styles["error"]}>{serverErrMsg}</p>}
        </>
      }
    </Popup>
  )

  const renderTable = () => (
    <div className={styles["table"]}>
      <div className={styles["table-header"]}>
        <h4>{title}</h4>
        <div className={styles["table-header__buttons-container"]}>
          {canEdit &&
            <>
              {isEditable &&
                <Button
                  size="sm"
                  color="primary"
                  variant="link"
                  trailingIcon={<FontAwesomeIcon icon={mutation.isLoading ? faSpinner : faSave} />}
                  onClickHandler={handleFormSubmit}
                  disabled={mutation.isLoading || !formValid}
                />
              }
              <Button
                size="sm"
                color="primary"
                variant="link"
                trailingIcon={<FontAwesomeIcon icon={isEditable ? faTimes : faEdit} />}
                onClickHandler={toggleEdit}
              />
            </>
          }
          {canDelete &&
            <Button
              size="sm"
              color="danger"
              variant="link"
              trailingIcon={<FontAwesomeIcon icon={faTrash} />}
              // onClickHandler={handlePopupOpen}
            />
          }
        </div>
      </div>
      {renderFormContent()}
    </div>
  )

  const renderNormal = () => (
    <div className={styles["normal"]}>
      {showSuccess ? 
        renderSuccessMessage() 
      :
        <>
          {renderFormContent()}
          <div className={styles["buttons-container"]}>
            <Button
              size="lg"
              color="primary"
              variant="contained"
              text={mutation.isLoading ? "Loading..." : t("innerLayout.form.submit")}
              onClickHandler={handleFormSubmit}
              disabled={mutation.isLoading || !formValid}
            />
            <Button
              size="lg"
              color="secondary"
              variant="contained"
              text={t("innerLayout.form.cancel")}
              onClickHandler={onClose}
              disabled={mutation.isLoading}
            />
          </div>
          {serverErrMsg && <p className={styles["error"]}>{serverErrMsg}</p>}
        </>
      }
    </div>
  )

  return (
    <>
      {mode === "popup" && renderPopup()}
      {mode === "table" && renderTable()}
      {mode === "normal" && renderNormal()}
    </>
  );
};

export default FormWrapper;
