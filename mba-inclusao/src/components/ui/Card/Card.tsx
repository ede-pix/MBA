import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  subtitle?: string;
  avatarText?: string;
  avatarColor?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  title,
  subtitle,
  avatarText,
  avatarColor = 'var(--accent-primary)',
  content,
  footer,
  onClick,
  className = '',
}: CardProps) {
  const classNames = [
    styles.card,
    onClick ? styles.clickable : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      <div className={styles.header}>
        {avatarText && (
          <div className={styles.avatar} style={{ background: avatarColor }}>
            {avatarText}
          </div>
        )}
        <div className={styles.titleArea}>
          <div className={styles.title}>{title}</div>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
      </div>
      
      {content && <div className={styles.content}>{content}</div>}
      
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
