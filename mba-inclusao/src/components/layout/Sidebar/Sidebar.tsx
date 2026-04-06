'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  School,
  CreditCard,
  Settings,
  Users,
  GraduationCap,
  ClipboardList,
  FileCheck,
  Activity,
  BarChart3,
  Sparkles,
  BookOpen,
  LogOut,
  Accessibility,
  Layers,
  Moon,
  Sun,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getNavigationForRole } from '@/config/navigation';
import { ROLE_LABELS, ROLE_COLORS } from '@/types/auth';
import styles from './Sidebar.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutDashboard,
  School,
  CreditCard,
  Settings,
  Users,
  GraduationCap,
  ClipboardList,
  FileCheck,
  Activity,
  BarChart3,
  Sparkles,
  BookOpen,
  Layers,
  FileText,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const sections = getNavigationForRole(user.role);
  const roleColor = ROLE_COLORS[user.role];

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [themeMode]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} id="main-sidebar">
        {/* Logo / Branding */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon} style={{ width: '48px', height: '48px', background: 'transparent', boxShadow: 'none' }}>
            <img src="/logo.svg" alt="Logo Bloomy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle} style={{ fontSize: '1.2rem', color: 'var(--accent-primary)' }}>Bloomy</span>
            <span className={styles.logoSubtitle}>Saúde Mental Inclusiva</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.navContainer} aria-label="Menu principal">
          {sections.map((section) => (
            <div key={section.title} className={styles.navSection}>
              <div className={styles.navSectionTitle}>{section.title}</div>
              {section.items.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    onClick={onClose}
                    title={item.description}
                    id={`nav-${item.href.replace(/\//g, '-').slice(1)}`}
                  >
                    {Icon && (
                      <span className={styles.navItemIcon}>
                        <Icon size={20} />
                      </span>
                    )}
                    <span className={styles.navItemLabel}>{item.label}</span>
                    {item.badge && (
                      <span className={styles.navItemBadge}>{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div 
          className={styles.userSection} 
          style={{ cursor: 'pointer', position: 'relative' }} 
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          {isUserMenuOpen && (
             <>
               <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={(e) => { e.stopPropagation(); setIsUserMenuOpen(false); }} />
               <div style={{ position: 'absolute', bottom: '100%', left: '16px', right: '16px', marginBottom: '8px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', border: '1px solid var(--surface-border-strong)', boxShadow: 'var(--shadow-xl)', zIndex: 50 }} onClick={e => e.stopPropagation()}>
                 <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid var(--surface-border)', paddingBottom: '8px', marginBottom: '8px' }}>Minha Conta</div>
                 <button 
                   onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} 
                   style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '6px', fontSize: '14px', color: 'var(--text-primary)', textAlign: 'left' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {themeMode === 'light' ? <Moon size={16}/> : <Sun size={16}/>} Tema Visual
                    </span>
                 </button>
                 <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '6px', fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }} onClick={() => alert('Troca de senha (Mock)')}>
                    <Settings size={16}/> Redefinir Senha
                 </button>
                 <div style={{ margin: '8px 0', borderTop: '1px solid var(--surface-border)' }} />
                 <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '6px', fontSize: '14px', color: 'var(--accent-danger)' }}>
                    <LogOut size={16}/> Sair do Sistema
                 </button>
               </div>
             </>
          )}

          <div className={styles.userInfo}>
            <div
              className={styles.userAvatar}
              style={{ background: roleColor }}
            >
              {getInitials(user.name)}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user.name}</div>
              <span
                className={styles.userRole}
                style={{
                  background: `${roleColor}22`,
                  color: roleColor,
                }}
              >
                {ROLE_LABELS[user.role]}
              </span>
            </div>
            <button
              className={styles.logoutBtn}
              title="Sair"
              id="logout-button"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
