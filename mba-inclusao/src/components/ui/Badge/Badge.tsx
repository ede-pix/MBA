import React from 'react';
import styles from './Badge.module.css';

export type StatusType = 'draft' | 'review' | 'approved' | 'active' | 'completed' | 'neutral';

interface BadgeProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ status, children, className = '' }: BadgeProps) {
  const classNames = [styles.badge, styles[status], className].filter(Boolean).join(' ');
  
  return (
    <span className={classNames}>
      {children}
    </span>
  );
}
