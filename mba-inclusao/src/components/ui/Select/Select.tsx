import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', fullWidth = false, children, ...props }, ref) => {
    return (
      <div className={`${styles.selectWrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
        <select ref={ref} className={styles.select} {...props}>
          {children}
        </select>
        <div className={styles.iconWrapper}>
          <ChevronDown size={16} />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
