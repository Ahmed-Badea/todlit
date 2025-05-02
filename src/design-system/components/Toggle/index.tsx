/* eslint-disable no-console */
import { useState, useEffect, FocusEvent, MouseEvent } from 'react';
import styles from './toggle.module.scss';
import { IToggle } from '../../types/Toggle/toggle';

export const Toggle = ({
    size = "md",
    disabled = false,
    isHovered = false,
    isFocused = false,
    isChecked = false,
    value,
    onChangeHandler
}: IToggle) => {

    const [isToggleHovered, setIsToggleHovered] = useState(isHovered);
    const [isToggleFocused, setIsToggleFocused] = useState(isFocused);
    const [isToggleChecked, setIsToggleChecked] = useState(isChecked);

    const onMouseOverHandler = () => {
        setIsToggleHovered(true);
    }
    const onMouseOutHandler = () => {
        setIsToggleHovered(false);
    }
    const onFocusHandler = (event: FocusEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsToggleFocused(true);
    }
    const onBlurHandler = (event: FocusEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsToggleFocused(false);
    }

    useEffect(() => {
        setIsToggleHovered(isHovered);
    }, [isHovered]);

    useEffect(() => {
        setIsToggleFocused(isFocused);
    }, [isFocused]);

    useEffect(() => {
        setIsToggleChecked(isChecked);
    }, [isChecked]);

    const onClickHandler = (e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsToggleChecked(!isToggleChecked);
    };

    useEffect(() => {
        onChangeHandler && onChangeHandler(isToggleChecked, value || '');
    }, [isToggleChecked]);

    return (
        <label className={styles['toggle']} data-toggle-size={size} onClick={onClickHandler} id="toggle-base"
            data-toggle-is-hovered={isToggleHovered} data-toggle-is-focused={isToggleFocused} data-toggle-is-disabled={disabled}
            onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler} onFocusCapture={onFocusHandler} onBlurCapture={onBlurHandler}
        >
            <input type="checkbox" checked={isToggleChecked} />
            <div className={styles['toggle__slider']} id="toggle-base-slider"></div>
        </label>
    )
}