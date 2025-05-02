import styles from './custom-selector-box.module.scss';
import { ICustomSelectorBox } from 'libs/design-system/src/types/custom_selector/custom_selector_box/customSelectorBox';

export const CustomSelectorBox = ({
  title,
  icon,
  selected = false,
  onClickHandler,
}: ICustomSelectorBox) => {
  return (
    <div className={`${styles['custom-selector-box']} ${selected && styles['custom-selector-box--selected']}`}
      onClick={onClickHandler}>
      {icon && icon}
      {title && <div>{title}</div>}
    </div>
  )
}
