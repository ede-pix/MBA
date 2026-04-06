'use client';

import React, { useState } from 'react';
import styles from './Tabs.module.css';

export interface TabType {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabType[];
  defaultTabId?: string;
  className?: string;
}

export default function Tabs({ tabs, defaultTabId, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || (tabs[0] && tabs[0].id));

  return (
    <div className={`${styles.tabsContainer} ${className}`}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.tabContent}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={styles.tabPanel}
            style={{ display: activeTab === tab.id ? 'block' : 'none' }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
