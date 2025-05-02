import React, { useState } from 'react';
import { ITabsProps } from '../../types/Tabs/tabs';
import styles from './tabs.module.scss';

export const Tabs: React.FC<ITabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className={styles['tabs-container']}>
      <div className={styles['tabs-header']}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`${styles['tab-button']} ${activeTab === tab.label ? styles['active'] : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles['tab-content']}>
        {tabs.map((tab) => (
          <div key={tab.label} className={`${styles['tab-panel']} ${activeTab === tab.label ? styles['active'] : ''}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
