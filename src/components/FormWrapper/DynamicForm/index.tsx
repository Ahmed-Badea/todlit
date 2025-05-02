import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownMenuItem,
  ColorInput
} from"../../../design-system";
import DatePicker from "../../../components/DatePicker";
import { isFormValid, validateField } from "../../../utils/formValidations";
import { DynamicFormProps, FieldConfig, Fields } from "../../../types/inner-layout/form";
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
    const lang = i18n.language;
    const [fields, setFields] = useState<Fields>(
      fieldsConfig.reduce((acc, field) => {
        acc[field.name] = {
          value: field.value || "",
          isValid: field.isValid || undefined,
          errorMsg: field.errorMsg || "",
          validations: field.validations || [],
        };
        return acc;
      }, {} as Fields)
    );

    useEffect(() => {
      setFormValid(isFormValid(fields));
    }, [fields, setFormValid]);

    const handleInputChange = (fieldName: string, value: string | Date) => {
      setServerErrMsg("");
      const updatedFields = {
        ...fields,
        [fieldName]: {
          ...fields[fieldName],
          value,
        },
      };
      setFields(updatedFields);
      validateField(updatedFields, setFields, fieldName, value);
    };

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        const formData = Object.fromEntries(
          Object.entries(fields).map(([key, field]) => [key, field.value])
        );
        
        return { ...formData, ...params };
      },
    }));

    const renderTextInput = (field: FieldConfig) => (
      <Input
        id={field.name}
        name={field.name}
        label={mode === "table" ? undefined : field.label[lang]} // Hide label in table mode
        value={fields[field.name]?.value || ""}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        status={fields[field.name]?.isValid === false ? "error" : "default"}
        error={fields[field.name]?.errorMsg}
        disabled={isLoading || !isEditable}
        isEditable={isEditable}
      />
    );

    const renderDatePicker = (field: FieldConfig) => (
      <DatePicker
        selectedDate={
          fields[field.name]?.value
            ? new Date(fields[field.name]?.value as string)
            : null
        }
        onDateChange={(date) => handleInputChange(field.name, date)}
        label={mode === "table" ? undefined : field.label[lang]} // Hide label in table mode
        disabled={isLoading || !isEditable}
        isEditable={isEditable}
        type={field.type} // Pass 'date' or 'time' dynamically
      />
    );
    
    const renderDropdown = (field: FieldConfig) => (
      <Dropdown label={mode === "table" ? undefined : field.label[lang]}>
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

    const renderMultiDropdown = (field: FieldConfig) => {
      // Compute dropdown button text dynamically
      const getDropdownBtnText = () => {
        const selectedValues = fields[field.name]?.value || [];
        if (selectedValues.length === field.options?.length) {
          return t('innerLayout.all'); // All options selected
        } else if (selectedValues.length === 0) {
          return t('innerLayout.none'); // No options selected
        } else if (selectedValues.length === 1) {
          return field.options?.find((opt) => opt.value === selectedValues[0])?.label[lang] || '';
        } else {
          const firstSelected = field.options?.find((opt) => opt.value === selectedValues[0])?.label[lang];
          return `${firstSelected}, +${selectedValues.length - 1}`;
        }
      };
    
      // Unified function to handle both "Select All" and individual option changes
      const handleFieldChange = (checked: boolean, optionValue?: string) => {
        setServerErrMsg(""); // Clear any existing server error messages
    
        // Compute the new field values
        const updatedFieldValues = optionValue
          ? checked
            ? [...(fields[field.name]?.value || []), optionValue] // Add single option
            : fields[field.name]?.value.filter((val) => val !== optionValue) // Remove single option
          : checked
          ? field.options?.map((option) => option.value) || [] // "Select All"
          : []; // Clear all options
    
        // Create the updated fields object
        const updatedFields = {
          ...fields,
          [field.name]: {
            ...fields[field.name],
            value: updatedFieldValues,
          },
        };
    
        // Update the fields state
        setFields(updatedFields);
    
        // Validate the updated field
        validateField(updatedFields, setFields, field.name, updatedFieldValues);
      };
    
      return (
        <Dropdown 
          key={`field-dropdown-${field.name}`}
          label={mode === "table" ? undefined : field.label[lang]}
        >
          <DropdownButton
            text={getDropdownBtnText()}
            onClearHandler={() =>
              setFields((prevFields) => ({
                ...prevFields,
                [field.name]: {
                  ...prevFields[field.name],
                  value: [],
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
              key={`select-all-${field.name}`}
              type="checkbox"
              text={t('innerLayout.selectAll')}
              checked={fields[field.name]?.value?.length === field.options?.length}
              onCheckboxItemClickHandler={(checked) => handleFieldChange(checked)}
              closeOnItemClick={false}
            />
            {/* Individual Options */}
            {field.options?.map((option, index) => (
              <DropdownMenuItem
                key={`${field.name}-option-${index}`}
                type="checkbox"
                text={option.label[lang]}
                checked={!!fields[field.name]?.value?.includes(option.value)}
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
    
    const renderColorInput = (field: FieldConfig) => (
      <ColorInput
        label={mode === "table" ? undefined : field.label[lang]}
        name={field.name}
        selectedColor={fields[field.name]?.value || "#ffffff"}
        onChange={handleInputChange}
        disabled={isLoading || !isEditable}
      />
    );
    
    
    
    const renderInput = (field: FieldConfig) => {
      switch (field.type) {
        case "text":
          return renderTextInput(field);
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
                <div className={styles["table-cell"]}>{field.label[lang]}</div>
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
