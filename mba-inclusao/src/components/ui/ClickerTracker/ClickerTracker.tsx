'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './ClickerTracker.module.css';

interface ClickerTrackerProps {
  title: string;
  type: 'counter' | 'scale';
  icon?: React.ReactNode;
}

export default function ClickerTracker({ title, type, icon }: ClickerTrackerProps) {
  const [count, setCount] = useState(0);
  const [activeScale, setActiveScale] = useState<number | null>(null);

  const scales = [
    { label: 'Indepen.', level: 0 },
    { label: 'Visual', level: 1 },
    { label: 'Verbal', level: 2 },
    { label: 'Físico', level: 3 },
  ];

  if (type === 'counter') {
    return (
      <div className={styles.trackerContainer}>
        <div className={styles.trackerHeader}>
          <span className={styles.trackerTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {icon} {title}
          </span>
        </div>
        <div className={styles.counterControls}>
          <button 
            className={styles.counterBtn} 
            onClick={() => setCount(Math.max(0, count - 1))}
            aria-label="Diminuir"
          >
            <Minus size={20} />
          </button>
          <span className={styles.counterValue}>{count}</span>
          <button 
            className={styles.counterBtn} 
            onClick={() => setCount(count + 1)}
            aria-label="Aumentar"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.trackerHeader}>
        <span className={styles.trackerTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon} {title}
        </span>
      </div>
      <div className={styles.scaleContainer}>
        {scales.map((scale, i) => (
          <button
            key={i}
            className={`${styles.scaleBtn} ${styles[`level-${scale.level}`]} ${activeScale === scale.level ? styles.active : ''}`}
            onClick={() => setActiveScale(scale.level)}
          >
            {scale.label}
          </button>
        ))}
      </div>
    </div>
  );
}
