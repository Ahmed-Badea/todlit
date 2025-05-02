import { useState, useEffect, Children, type ChangeEvent } from 'react';
import { Avatar } from '../../Avatar';
import type {
  IDropdownMenuInternalProps,
  IDropdownMenu,
  IAccountDropdownMenu,
  ITextFieldDropdownMenu,
  IPhoneFieldDropdownMenu,
  ICheckboxesDropdownMenu
} from '../../../types/Dropdown/dropdown_menu/dropdown-menu';
import { getDir, getHorizontalPlacement, getVerticalPlacement } from '../../../utils/getPlacement';
import { cloneNestedComponent } from '../../../utils/cloneNestedComponent';
import { DropdownMenuItem } from '../DropdownMenuItem';
import { Input } from '../../Input';
import { PhoneInput } from '../../PhoneInput';
import { Button } from '../../Button';
import styles from './dropdown-menu.module.scss';

export const DropdownMenu = (props: IDropdownMenu) => {

  const { closeDropdown, isOpen = false, dropdownRef } = (props as IDropdownMenuInternalProps);
  const {
    children,
    open,
    type = 'default',
    horizontalPlacement = 'start',
    verticalPlacement = 'bottom',
    width = 'full',
    maxHeight = '20rem',
    onToggleHandler
  } = props;


  let content = <></>;
  let additionalContent = <></>;
  const [inputValue, setInputValue] = useState("");

  if (type === 'account') {
    const { avatarType = "placeholder", userName, userShortName, role, imgUrl } = props as IAccountDropdownMenu;

    let avatar = <></>;

    if (avatarType === 'img') {

      avatar = <Avatar
        type="img"
        imgUrl={imgUrl || ""}
        name={userName}
        focusable={false}
      />
    } else if (avatarType === 'text') {

      avatar = <Avatar
        type="text"
        shortName={userShortName || ""}
        focusable={false}
      />
    } else {
      avatar = <Avatar
        focusable={false}
      />
    }

    content = <div className={styles['dropdown-menu__user-info-box']}>
      {avatar}
      <div className={styles['dropdown-menu__user-info-box__user-info']}>
        {userName && <div className={styles['dropdown-menu__user-info-box__user-info__name']}>{userName}</div>}
        {role && <div className={styles['dropdown-menu__user-info-box__user-info__role']}>{role}</div>}
      </div>
    </div>;
  } else if (type === 'text_field') {
    const {
      lang, fieldName, placeholder,
      onChangeHandler, onApplyHandler,
      applyBtnText, errorMsg
    } = props as ITextFieldDropdownMenu;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeHandler?.(e);
      setInputValue(e.target.value);
    };

    const handleApply = () => {
      closeDropdown?.();
      onApplyHandler?.(inputValue);
    };

    content = <div className={styles['dropdown-menu__filter-field-box']}>
      <Input
        name={fieldName}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus
        error={errorMsg}
        status={errorMsg ? 'error' : 'default'}
      />

      <Button
        size='md'
        text={applyBtnText || (lang === 'ar' ? "تطبيق" : "Apply")}
        disabled={!inputValue || !!errorMsg}
        onClickHandler={handleApply}
      />
    </div>;
  } else if (type === 'phone_field') {
    const {
      lang, fieldName, placeholder,
      onChangeHandler, onApplyHandler, onCountryChange,
      defaultCountry, applyBtnText, errorMsg
    } = props as IPhoneFieldDropdownMenu;

    const handleChange = (phone: string) => {
      onChangeHandler?.(phone);
      setInputValue(phone);
    };

    const handleApply = () => {
      closeDropdown?.();
      onApplyHandler?.(inputValue);
    };

    content = <div className={styles['dropdown-menu__filter-field-box']}>
      <PhoneInput
        name={fieldName}
        placeholder={placeholder}
        defaultCountry={defaultCountry}
        onChangeHandler={handleChange}
        onCountryChange={onCountryChange}
        autoFocus
        error={errorMsg}
      />

      <Button
        size='md'
        text={applyBtnText || (lang === 'ar' ? "تطبيق" : "Apply")}
        disabled={!inputValue || !!errorMsg}
        onClickHandler={handleApply}
      />
    </div>;
  } else if (type === 'checkboxes') {
    const { applyBtnText, onApplyHandler, lang, applyBtnDisabled } = props as ICheckboxesDropdownMenu;

    additionalContent = <div className={styles['dropdown-menu__apply-btn-wrapper']}>
      <Button
        size='sm'
        text={applyBtnText || (lang === 'ar' ? "تطبيق" : "Apply")}
        disabled={applyBtnDisabled}
        onClickHandler={() => {
          onApplyHandler?.();
          closeDropdown?.();
        }}
      />
    </div>;
  };

  const autoHorizontalPlacement = typeof dropdownRef?.current === 'object' && getHorizontalPlacement(dropdownRef, getDir());
  const autoVerticalPlacement = typeof dropdownRef?.current === 'object' && getVerticalPlacement(dropdownRef);

  let horizontal_placement: IDropdownMenu['horizontalPlacement'] = horizontalPlacement;
  let vertical_placement: IDropdownMenu['verticalPlacement'] = verticalPlacement;

  if (horizontalPlacement === 'auto') {
    horizontal_placement = autoHorizontalPlacement ? autoHorizontalPlacement : 'start';
  } else if (horizontalPlacement === 'inline_auto') {
    const auto_horizontal_placement = autoHorizontalPlacement === "start" ? "end" : "start";
    horizontal_placement = autoHorizontalPlacement ? `inline_${auto_horizontal_placement}` : 'inline_start';
  };

  if (vertical_placement === 'auto') {
    vertical_placement = autoVerticalPlacement ? autoVerticalPlacement : 'bottom';
  };

  useEffect(() => {
    onToggleHandler?.(open ?? isOpen);
  }, [open, isOpen]);

  return (
    open ?? isOpen ?
      <div className={styles['dropdown-menu']}
        data-dropdown-menu-horizontal={horizontal_placement}
        data-dropdown-menu-vertical={vertical_placement}
        data-dropdown-menu-width={width}
        style={{
          maxHeight: maxHeight,
          overflowY: maxHeight === 'fit-content' ? "visible" : "auto",
          width: (width === 'full' || width === 'fit-content') ? "" : width
        }}
      >
        {content}

        {
          type !== 'text_field' &&
          Children.map(children, (child: any) => {
            const childDropdownMenuItem = cloneNestedComponent(child, DropdownMenuItem, {
              closeDropdown: closeDropdown
            });

            return childDropdownMenuItem ? childDropdownMenuItem : child
          })
        }

        {additionalContent}

      </div>
      :
      <> </>
  )
};