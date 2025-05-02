import { useState } from 'react';
import styles from './custom-selector.module.scss';
import { ICustomSelector } from '../../types/custom_selector/customSelector';
import { CustomSelectorBox } from './CustomSelectorBox';
import { ICustomSelectorBox } from '../../types/custom_selector/custom_selector_box/customSelectorBox';

export const CustomSelector = ({
  boxesProps,
  selected = ""
}: ICustomSelector) => {

  const [selectedOption, setSelectedOption] = useState<React.SetStateAction<string | null | undefined>>(selected);

  const handleBoxClick = (optionTitle: string | null | undefined, onClickHandler: any) => {
    setSelectedOption(optionTitle);
    onClickHandler && onClickHandler();
  };

  return (
    <div className={styles['custom-selector']}>
      {boxesProps?.length && boxesProps.map((box: ICustomSelectorBox, i: number) => {
        return (
          <CustomSelectorBox title={box.title} icon={box.icon} selected={selectedOption === box.title}
            onClickHandler={() => handleBoxClick(box.title, box.onClickHandler && box.onClickHandler)} key={`custom-selector-box-${i}`} />
        )
      })
      }
    </div>
  )
}
