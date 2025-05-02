import { useState, useRef, forwardRef, Children, cloneElement } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { IDropdown } from '../../types/Dropdown/dropdown';
import { cloneNestedComponent } from '../../utils/cloneNestedComponent';
import { Label } from '../Label';
import { DropdownButton } from './DropdownButton';
import { DropdownMenu } from './DropdownMenu';
import styles from './dropdown.module.scss';

export const Dropdown = forwardRef<HTMLDivElement, IDropdown>((
  {
    id,
    status = 'default',
    label,
    labelHint,
    hintText,
    children,
    width = 'full',
    closeOnClickOutside = true,
    focusOnMenuOpen = false
  },
  ref?
) => {

  const dropdownRef = useRef<any>();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  closeOnClickOutside && useClickOutside(dropdownRef, closeDropdown, isOpen);

  return (
    <div
      id={id}
      className={styles['dropdown']}
      {...(width === 'full' || width === 'fit-content' ? { 'data-dropdown-width': width } : { style: { width: width } })}
      data-dropdown-focused={focusOnMenuOpen}
    >
      {(label || labelHint) && <Label text={label} hintText={labelHint} />}

      <div className={styles['dropdown__children-wrapper']} ref={ref || dropdownRef}>
        {
          Children.map(children, (child: any) => {

            const childDropdownMenu = cloneNestedComponent(child, DropdownMenu, {
              isOpen: isOpen,
              closeDropdown: closeDropdown,
              dropdownRef: ref || dropdownRef
            });

            const childDropdownButton = cloneNestedComponent(child, DropdownButton, {
              toggleDropdown: toggleDropdown,
              closeDropdown: closeDropdown
            });

            if (childDropdownMenu) {
              return childDropdownMenu;
            } else if (childDropdownButton) {
              return childDropdownButton;
            } else {
              return child;
            }
          })
        }
      </div>

      {hintText && <div className={styles['dropdown__hint-text']} data-dropdown-status={status}>{hintText}</div>}
    </div>
  )
});