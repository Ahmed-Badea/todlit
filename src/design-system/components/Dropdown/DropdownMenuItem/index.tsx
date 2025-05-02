import type {
  ICheckboxDropdownMenuItem,
  IDefaultDropdownMenuItem,
  IDropdownMenuItem,
  IDropdownMenuItemInternalProps
} from '../../../types/Dropdown/dropdown_menu_item/dropdownMenuItem';
import { DropdownCheckMarkIcon } from '../../../assets/Icons';
import { Checkbox } from '../../Checkbox';
import styles from './dropdown-menu-item.module.scss';

export const DropdownMenuItem = (props: IDropdownMenuItem) => {

  const {
    type = 'default',
    text,
    hintText,
    disabled = false,
    closeOnItemClick = true,
    ...internalProps
  } = props as IDropdownMenuItem;

  const { icon, selected, hideCheckMarks = true, onClickHandler } = props as IDefaultDropdownMenuItem;
  const { id, checked, checkboxIcon, onChangeHandler, onCheckboxItemClickHandler } = props as ICheckboxDropdownMenuItem;
  const { closeDropdown } = (internalProps as IDropdownMenuItemInternalProps);
  
  const handleClick = (e: any) => {
    onClickHandler?.(e);
    closeOnItemClick && closeDropdown?.();
  };

  return (
    <div
      className={styles['dropdown-menu-item']}
      data-dropdown-menu-disabled={disabled}
      data-dropdown-menu-selected={selected}
      onClick={handleClick}
    >
      {
        type === 'default' && icon &&
        <div className={styles['dropdown-menu-item__featured-icon']}>{icon}</div>
      }

      {
        type === 'checkbox' &&
        <div className={styles['dropdown-menu-item__checkbox']}>
          <Checkbox
            id={id}
            size='md'
            checkboxIcon={checkboxIcon}
            text={text}
            hintText={hintText}
            disabled={disabled}
            checked={checked}
            onChangeHandler={onChangeHandler}
            onClickHandler={onCheckboxItemClickHandler}
          />
        </div>
      }

      {
        type === 'default' && (text || hintText) &&
        <div className={styles['dropdown-menu-item__text-box']}>
          {text && <div className={styles['dropdown-menu-item__text-box__text']} title={text}>{text}</div>}
          {hintText && <div className={styles['dropdown-menu-item__text-box__hint-text']} title={hintText}>{hintText}</div>}
        </div>
      }

      {
        type === 'default' && selected && !hideCheckMarks &&
        <div className={styles['dropdown-menu-item__tick-icon']}>{DropdownCheckMarkIcon}</div>
      }
    </div>
  )
}
