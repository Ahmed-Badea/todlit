import { TabBase } from '../TabBase/index';
import type { ITabsGroup } from "../../../types/tabs/tabs_group";
import styles from "./tabs-group.module.scss";

export const TabsGroup = ({
  type = 'line',
  orientation,
  tabsProps,
  fullWidth
}: ITabsGroup) => {
  return (
    <>
      {
        tabsProps &&
        <div
          className={styles["tabs-group"]}
          data-tabs-group-orientation={orientation}
          data-tabs-group-type={type}
          data-tabs-group-full-width={fullWidth}
        >
          {tabsProps.map((tab, index) => {
            return (
              <TabBase
                type={type}
                fullWidth={fullWidth}
                {...tab}
                key={`tabs-group-tab-${index}`}
              />
            )
          })}
        </div>
      }
    </>
  )
};