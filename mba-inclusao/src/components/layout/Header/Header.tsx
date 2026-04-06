'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  Bug,
  Accessibility,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, ROLE_LABELS } from '@/types/auth';
import { navigation } from '@/config/navigation';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

const ALL_ROLES: UserRole[] = [
  'super_admin',
  'diretor',
  'coordenador',
  'professor_aee',
  'professor_regente',
  'professor_reforco',
  'aluno',
];

export default function Header({ onMenuToggle }: HeaderProps) {
  const { user, switchRole } = useAuth();
  const [highContrast, setHighContrast] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [highContrast]);

  const getCurrentPageLabel = (): string => {
    for (const section of navigation) {
      for (const item of section.items) {
        if (pathname === item.href || pathname.startsWith(item.href + '/')) {
          return item.label;
        }
      }
    }
    return 'Dashboard';
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switchRole(e.target.value as UserRole);
  };

  return (
    <header className={styles.header} id="main-header">
      <div className={styles.leftSection}>
        <button
          className={styles.menuButton}
          onClick={onMenuToggle}
          aria-label="Abrir menu"
          id="menu-toggle"
        >
          <Menu size={22} />
        </button>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <span>{user.schoolName || 'Plataforma'}</span>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>
            {getCurrentPageLabel()}
          </span>
        </nav>
      </div>

      <div className={styles.rightSection}>
        {/* Dev Role Switcher */}
        <div className={styles.roleSwitcher} id="role-switcher">
          <Bug size={14} style={{ color: 'var(--accent-warning)' }} />
          <span className={styles.roleSwitcherLabel}>Dev</span>
          <select
            className={styles.roleSwitcherSelect}
            value={user.role}
            onChange={handleRoleChange}
            aria-label="Trocar perfil de usuário"
            id="role-switcher-select"
          >
            {ALL_ROLES.map((role) => (
              <option key={role} value={role}>
                {ROLE_LABELS[role]}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar alunos, turmas..."
            aria-label="Buscar"
            id="global-search"
          />
        </div>

        {/* Accessibility Toggle */}
        <button 
          className={styles.iconBtn} 
          onClick={() => setHighContrast(!highContrast)}
          aria-label="Alternar modo de alto contraste"
          title="Alto Contraste p/ Baixa Visão"
          style={highContrast ? { color: 'var(--accent-primary)' } : {}}
        >
          <Accessibility size={20} />
        </button>

        {/* Notifications */}
        <button
          className={styles.notifButton}
          aria-label="Notificações"
          id="notifications-button"
        >
          <Bell size={20} />
          <span className={styles.notifDot} />
        </button>
      </div>
    </header>
  );
}
