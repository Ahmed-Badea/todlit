import { useState } from 'react';
import styles from './toggle-box.module.scss';
import { Toggle } from '../index'
import { IToggleBox } from '../../../types/Toggle/toggle_box/toggleBox';

export const ToggleBox = ({
    size = "md",
    text,
    value,
    hintText,
    type,
    icon, // 'type' must be 'bordered box' to render this icon
    isToggleChecked = false,
    disabled = false,
    onToggleChangeHandler
}: IToggleBox) => {

    const [isToggleBoxHovered, setIsToggleBoxHovered] = useState(false);
    const [isToggleBoxFocused, setIsToggleBoxFocused] = useState(false);
    const [isToggleBoxChecked, setIsToggleBoxChecked] = useState(isToggleChecked);

    const onMouseOverHandler = () => {
        !disabled && setIsToggleBoxHovered(true);
    }
    const onMouseOutHandler = () => {
        !disabled && setIsToggleBoxHovered(false);
    }
    const onFocusHandler = () => {
        !disabled && setIsToggleBoxFocused(true);
    }
    const onBlurHandler = () => {
        !disabled && setIsToggleBoxFocused(false);
    }
    const onClickHandler = (e: any) => {
      // in-case of the "type" is "bordered box" or "transparent box" 
      // we check that the target element is not the child toggle to prevent firing the action twice
        if (e.target.id !== 'toggle-base' && e.target.id !== 'toggle-base-slider' && !disabled) {
            setIsToggleBoxChecked(!isToggleBoxChecked);
        }
    }

    return (
        <div tabIndex={0} data-toggle-box-size={size} data-toggle-box-disabled={disabled} data-toggle-box-hovered={isToggleBoxHovered}
            data-toggle-box-focused={isToggleBoxFocused}
            data-toggle-box-type={type} onClick={onClickHandler}
            onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler} onFocusCapture={onFocusHandler} onBlurCapture={onBlurHandler}
            className={styles['toggle-box']}
        >
            <Toggle size={size} disabled={disabled} isHovered={isToggleBoxHovered} isChecked={isToggleBoxChecked} value={value}
                isFocused={isToggleBoxFocused} onChangeHandler={onToggleChangeHandler} />

            {
                (text || hintText)
                && <div className={styles['toggle-box__text-box']}>
                    {text && <div className={styles['toggle-box__text-box__text']}>{text}</div>}
                    {hintText && <div className={styles['toggle-box__text-box__hint-text']}>{hintText}</div>}
                </div>
            }

            {(icon && type === 'bordered box') &&
                <div className={styles['toggle-box__icon']}>
                    {icon}
                </div>
            }
        </div>
    )
}