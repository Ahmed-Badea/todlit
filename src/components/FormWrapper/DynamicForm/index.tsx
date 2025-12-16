import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownMenuItem,
  ColorInput,
  TextArea,
  FileUploader
} from"../../../design-system";
import DatePicker from "../../../components/DatePicker";
import { isFormValid, validateField } from "../../../utils/formValidations";
import { DynamicFormProps, IFieldConfig, IFields } from "../../../types/inner-layout/form";
import styles from "./customForm.module.scss";

const DynamicForm = forwardRef(
  (
    {
      fieldsConfig,
      mode,
      setFormValid,
      isLoading,
      setServerErrMsg,
      isEditable,
      params
    }: DynamicFormProps,
    ref
  ) => {
    const { t, i18n  } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';
    const [fields, setFields] = useState<IFields>(
      fieldsConfig.reduce((acc, field) => {
        const hasValidations = field.validations && field.validations.length > 0;
        const initialValue = field.value ?? (field.type === "date" ? new Date() : field.type === "file" ? [] : "");
        
        acc[field.name] = {
          value: initialValue,
          isValid: field.isValid ?? (hasValidations ? undefined : true),
          errorMsg: field.errorMsg ?? "",
          validations: field.validations ?? [],
        };        
        return acc;
      }, {} as IFields)
    );

    useEffect(() => {
      const valid = isFormValid(fields);
      setFormValid(valid);
    }, [fields, setFormValid]);
    
    const handleInputChange = (fieldName: string, value: any) => {
      setServerErrMsg("");
      
      const fieldConfig = fieldsConfig.find(f => f.name === fieldName);
      let isValid: boolean | undefined = undefined;
      
      if (fieldConfig?.type === 'file') {
        const hasFiles = Array.isArray(value) ? value.length > 0 : !!value;
        const hasValidations = fieldConfig.validations && fieldConfig.validations.length > 0;
        isValid = hasValidations ? hasFiles : true;
      }
      
      const updatedFields = {
        ...fields,
        [fieldName]: {
          ...fields[fieldName],
          value,
          ...(isValid !== undefined && { isValid })
        },
      };
      setFields(updatedFields);
      
      if (fieldConfig?.type !== 'file' && typeof value === 'string') {
        validateField(updatedFields, setFields, fieldName, value);
      }
    };

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        const formData = Object.fromEntries(
          Object.entries(fields).map(([key, field]) => [key, field.value])
        );
        
        return { ...formData, ...params };
      },
    }));

    const getFieldLabel = (field: IFieldConfig) => {
      if (mode === "table") return undefined;
      const baseLabel = field.label?.[lang] ?? "Default Label";
      return field.optional ? `${baseLabel} (${t('outerLayout.form.labels.optional')})` : baseLabel;
    };

    const renderTextInput = (field: IFieldConfig) => (
      <Input
        id={field.name}
        name={field.name}
        label={getFieldLabel(field)}
        value={fields[field.name]?.value?.toString() || ""}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        status={fields[field.name]?.isValid === false ? "error" : "default"}
        error={fields[field.name]?.errorMsg}
        disabled={isLoading || !isEditable}
        isEditable={isEditable}
      />
    );

    const renderDatePicker = (field: IFieldConfig) => (
      <DatePicker
        selectedDate={
          fields[field.name]?.value
            ? new Date(fields[field.name]?.value as string)
            : null
        }
        onDateChange={(date) => date && handleInputChange(field.name, date.toISOString())}
        label={getFieldLabel(field)}
        disabled={isLoading || !isEditable}
        isEditable={isEditable}
        type={["date", "time"].includes(field.type as string) ? (field.type as "date" | "time") : undefined} // Pass 'date' or 'time' dynamically
      />
    );
    
    const renderDropdown = (field: IFieldConfig) => (
      <Dropdown label={getFieldLabel(field)}>
        <DropdownButton
          text={
            fields[field.name]?.value
              ? field.options?.find(
                  (g) => g.value === fields[field.name]?.value
                )?.label[lang]
              : t('innerLayout.select')
          }
          disabled={isLoading || !isEditable}
          isEditable={isEditable}
        />
        {field.options && (
          <DropdownMenu>
            {field.options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                text={option.label[lang]}
                onClickHandler={() => handleInputChange(field.name, option.value)}
                selected={fields[field.name]?.value === option.value}
              />
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    );

    const renderMultiDropdown = (field: IFieldConfig) => {
      // Compute dropdown button text dynamically
      const getDropdownBtnText = () => {
        const rawValue = fields[field.name]?.value || '';
        const selectedValues = typeof rawValue === 'string' ? rawValue.split(',').filter(v => v) : [];
        if (selectedValues.length === field.options?.length) {
          return t('innerLayout.all'); // All options selected
        } else if (selectedValues.length === 0) {
          return t('innerLayout.none'); // No options selected
        } else if (selectedValues.length === 1) {
          return field.options?.find((opt) => opt.value === selectedValues[0])?.label[lang] || '';
        } else {
          const firstSelected = field.options?.find((opt) => opt.value === selectedValues[0])?.label[lang] || '';
          return `${firstSelected}, +${selectedValues.length - 1}`;
        }
      };
    
      // Unified function to handle both "Select All" and individual option changes
      const handleFieldChange = (checked: boolean, optionValue?: string) => {
        setServerErrMsg(""); // Clear any existing server error messages
      
        // Get current selected values as array
        const currentValue = fields[field.name]?.value || '';
        const currentArray = typeof currentValue === 'string' ? currentValue.split(',').filter(v => v) : [];
        
        const updatedFieldValues = optionValue
          ? checked
            ? [...currentArray, optionValue] // Add single option
            : currentArray.filter((val) => val !== optionValue) // Remove single option
          : checked
            ? field.options?.map((option) => option.value) || [] // "Select All"
            : []; // Clear all options
        
        const normalizedValue = updatedFieldValues.join(",");

        // Create the updated fields object
        const updatedFields = {
          ...fields,
          [field.name]: {
            ...fields[field.name],
            value: normalizedValue
          },
        };
        
        setFields(updatedFields);
      
        validateField(updatedFields, setFields, field.name, normalizedValue);
      };
      
      const rawValue = fields[field.name]?.value || '';
      const selectedValues = typeof rawValue === 'string' ? rawValue.split(',').filter(v => v) : [];
    
      return (
        <Dropdown 
          key={`field-dropdown-${field.name}`}
          label={getFieldLabel(field)}
        >
          <DropdownButton
            text={getDropdownBtnText()}
            onClearHandler={() =>
              setFields((prevFields) => ({
                ...prevFields,
                [field.name]: {
                  ...prevFields[field.name],
                  value: "",
                },
              }))
            }
            disabled={isLoading || !isEditable}
            isEditable={isEditable}
          />
          <DropdownMenu
            width="full"
            horizontalPlacement="auto"
            type="checkboxes"
          >
            {/* "Select All" Option */}
            <DropdownMenuItem
              id="all"
              key={`select-all-${field.name}`}
              type="checkbox"
              text={t('innerLayout.selectAll')}
              checked={selectedValues.length === field.options?.length}
              onCheckboxItemClickHandler={(checked) => handleFieldChange(checked)}
              closeOnItemClick={false}
            />
            {/* Individual Options */}
            {field.options?.map((option, index) => (
              <DropdownMenuItem
                id={index.toString()}
                key={`${field.name}-option-${index}`}
                type="checkbox"
                text={option.label[lang]}
                checked={selectedValues.includes(option.value)}
                onCheckboxItemClickHandler={(checked) =>
                  handleFieldChange(checked, option.value)
                }
                closeOnItemClick={false}
              />
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    };
    
    const renderColorInput = (field: IFieldConfig) => (
      <ColorInput
        label={getFieldLabel(field)}
        name={field.name}
        // selectedColor={fields[field.name]?.value || "#ffffff"}
        onChange={handleInputChange}
        disabled={isLoading || !isEditable}
      />
    );

    const renderTextArea = (field: IFieldConfig) => (
      <TextArea
        name={field.name}
        label={getFieldLabel(field)}
        value={fields[field.name]?.value?.toString() || ""}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        disabled={isLoading || !isEditable}
        placeholder={field.label?.[lang] ?? ""}
      />
    );

    const renderFileInput = (field: IFieldConfig) => (
      <FileUploader
        label={getFieldLabel(field)}
        onUploadHandler={(file) => {
          if (file) {
            handleInputChange(field.name, file);
          }
        }}
        disabled={isLoading || !isEditable}
        allowedFormats={field.allowedFormats}
        allowedSize={field.allowedSize}
        multiple={field.multiple}
      />
    );
    
    const renderInput = (field: IFieldConfig) => {
      switch (field.type) {
        case "text":
          return renderTextInput(field);
        case "textarea":
          return renderTextArea(field);
        case "file":
          return renderFileInput(field);
        case "date":
        case "time":
          return renderDatePicker(field);
        case "dropdown":
          return renderDropdown(field);
        case "multi-dropdown":
          return renderMultiDropdown(field);
        case "color":
          return renderColorInput(field);
        default:
          return null;
      }
    };

    return (
      <form
        className={
          mode === "table" ? styles["table-form"] : styles["form-wrapper"]
        }
      >
        {fieldsConfig.map((field) => (
          <div
            key={field.name}
            className={mode === "table" ? styles["table-row"] : ""}
          >
            {mode === "table" ? (
              <>
                <div className={styles["table-cell"]}>{field.label?.[lang] ?? "Default Label"}</div>
                <div className={styles["table-cell"]}>{renderInput(field)}</div>
              </>
            ) : (
              renderInput(field)
            )}
          </div>
        ))}
      </form>
    );
  }
);

export default DynamicForm;
