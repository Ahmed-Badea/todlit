import { DropdownChevronIcon, Xmark } from '../../../assets/Icons';
import type {
  IDropdownButton,
  IDropdownButtonInternalProps
} from '../../../types/Dropdown/dropdown_button/dropdownBtn';
import styles from './dropdown-button.module.scss';

export const DropdownButton = ({
  type = 'button',
  color = 'secondary',
  leadingIcon,
  trailingIcon,
  hideDropdownChevron = false,
  placeholder,
  label,
  text,
  disabled = false,
  onClickHandler,
  onBlurHandler,
  isEditable = true, // Add isEditable prop
  onClearHandler,
  renderAs,
  ...internalProps
}: IDropdownButton) => {

  const { toggleDropdown, closeDropdown } = (internalProps as IDropdownButtonInternalProps);

  const handleClick = (e: any) => {
    onClickHandler?.(e);
    toggleDropdown?.();
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    closeDropdown?.();
    onClearHandler?.(e);
  };

  return (
    renderAs ?
      <div onClick={toggleDropdown}>
        {renderAs}
      </div>
      :
      <button
      className={`${styles['dropdown-btn']} ${
        !isEditable ? styles['no-border'] : ''
      }`} // Conditionally apply no-border class
        type="button"
        disabled={disabled}
        onClick={(e) => handleClick(e)}
        onBlur={onBlurHandler}
        data-dropdown-btn-type={type}
        data-dropdown-btn-color={color}
        {...(label ? { "data-dropdown-btn-label": label } : {})}
      >
        {leadingIcon && <div className={styles['dropdown-btn__leading-icon']}>{leadingIcon}</div>}

        {
          label &&
          <div className={styles['dropdown-btn__label']}>{label}</div>
        }

        {
          (text || placeholder) &&
          <div className={`${styles['dropdown-btn__text']} ${!text ? styles['dropdown-btn__text--placeholder'] : ''}`}>{text || placeholder}</div>
        }

        {trailingIcon && <div className={styles['dropdown-btn__trailing-icon']}>{trailingIcon}</div>}

        {!hideDropdownChevron && <div className={styles['dropdown-btn__dropdown-chevron']}>{DropdownChevronIcon}</div>}

        {onClearHandler && <div className={styles['dropdown-btn__clear']} onClick={handleClear}>{Xmark}</div>}
      </button>
  )
};