'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '@/types/auth';
import styles from '@/app/page.module.css';

interface PageStubProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
}

export default function PageStub({ title, description, icon, iconColor }: PageStubProps) {
  const { user } = useAuth();
  const roleColor = ROLE_COLORS[user.role];

  return (
    <div className={styles.pageStub} id={`page-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div
        className={styles.stubIcon}
        style={{ background: `${iconColor}20`, color: iconColor }}
      >
        {icon}
      </div>
      <h1 className={styles.stubTitle}>{title}</h1>
      <p className={styles.stubDescription}>{description}</p>
      <div className={styles.stubRoleBadge}>
        <span className={styles.stubRoleDot} style={{ background: roleColor }} />
        <span>Acessando como <strong>{ROLE_LABELS[user.role]}</strong></span>
      </div>
    </div>
  );
}
