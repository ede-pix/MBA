'use client';

import React, { useState, useCallback, ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Header from '@/components/layout/Header/Header';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className={styles.layoutWrapper}>
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      <Header onMenuToggle={handleMenuToggle} />
      <main className={styles.mainContent} id="main-content">
        <div className={styles.contentInner}>
          {children}
        </div>
      </main>
    </div>
  );
}
