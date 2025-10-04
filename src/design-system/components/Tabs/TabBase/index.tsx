import { useState, useEffect } from 'react';
import { Badge } from "../../Badge";
import type { ITabBase } from '../../../types/tabs/tab_base';
import styles from "./tab-base.module.scss";

export const TabBase = ({
  type = 'line',
  active = false,
  disabled = false,
  leadingIcon,
  tabName,
  tabLabel,
  counter,
  onClickHandler,
  fullWidth,
}: ITabBase) => {
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const clickHandler = ({ tabLabel, tabName }: { tabLabel?: string, tabName?: string }) => {
    setIsActive(true);
    onClickHandler?.(tabLabel, tabName);
  };

  return (
    <button
      className={styles["tab-base"]}
      data-tabs-tab-base-type={type}
      data-tabs-tab-base-active={isActive}
      data-tabs-tab-base-full-width={fullWidth}
      disabled={disabled}
      onClick={() => clickHandler({ tabLabel, tabName })}
    >
      {leadingIcon}
      {
        tabLabel &&
        <span className={styles["tab-base__tab-name"]}>{tabLabel}</span>
      }
      {
        typeof counter === 'number' ?
          <Badge type='default' size='sm' text={counter.toString()} color={isActive ? 'primary' : 'gray'} />
          :
          <></>
      }
    </button>
  )
};