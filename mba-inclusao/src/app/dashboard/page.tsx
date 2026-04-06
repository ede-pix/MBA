'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  ClipboardList,
  Activity,
  TrendingUp,
  FileCheck,
  Sparkles,
  BarChart3,
  BookOpen,
  School,
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '@/types/auth';
import styles from '../page.module.css';

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const roleColor = ROLE_COLORS[user.role];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getStatsForRole = (): StatCard[] => {
    switch (user.role) {
      case 'super_admin':
        return [
          { label: 'Escolas Ativas', value: '24', change: '+3 este mês', icon: <School size={20} />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
          { label: 'Usuários Totais', value: '1.247', change: '+89 este mês', icon: <Users size={20} />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
          { label: 'Alunos com PEI', value: '386', change: '+12 este mês', icon: <ClipboardList size={20} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
          { label: 'MRR', value: 'R$ 18.4k', change: '+15% vs mês anterior', icon: <TrendingUp size={20} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
        ];
      case 'diretor':
        return [
          { label: 'Total de Alunos', value: '342', change: '+8 matrículas', icon: <GraduationCap size={20} />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
          { label: 'Professores Ativos', value: '28', change: '3 AEE, 25 regentes', icon: <Users size={20} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
          { label: 'Taxa de Evolução', value: '78%', change: '+5% Trimestre', icon: <TrendingUp size={20} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
          { label: 'Evadiram', value: '2', change: '-1 vs Semestre', icon: <Activity size={20} />, color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #f97316)' },
        ];
      case 'coordenador':
        return [
          { label: 'PEIs Pendentes', value: '12', change: '5 aguardando aprovação', icon: <ClipboardList size={20} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
          { label: 'Laudos para Validar', value: '4', change: '2 novos hoje', icon: <FileCheck size={20} />, color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #f97316)' },
          { label: 'Acompanhamentos Hoje', value: '89%', change: '42 de 47 preenchidos', icon: <Activity size={20} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
          { label: 'Relatórios Trimestrais', value: '38', change: '9 pendentes', icon: <BarChart3 size={20} />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
        ];
      case 'professor_aee':
        return [
          { label: 'Meus Alunos', value: '15', change: '3 novos este mês', icon: <GraduationCap size={20} />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
          { label: 'PEIs em Edição', value: '7', change: '2 prontos para revisão', icon: <ClipboardList size={20} />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
          { label: 'Metas Atingidas', value: '64%', change: '+8% este mês', icon: <TrendingUp size={20} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
          { label: 'Relatórios Pendentes', value: '3', change: 'Prazo: 15/04', icon: <BarChart3 size={20} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
        ];
      case 'professor_regente':
        return [
          { label: 'Alunos na Turma', value: '32', change: '4 com PEI ativo', icon: <GraduationCap size={20} />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
          { label: 'Acompanhamentos Hoje', value: '3/4', change: '1 pendente', icon: <Activity size={20} />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
          { label: 'Conteúdos Gerados', value: '18', change: '+5 esta semana', icon: <Sparkles size={20} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
          { label: 'PEIs para Visualizar', value: '4', change: 'Atualizados recentemente', icon: <ClipboardList size={20} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
        ];
      case 'professor_reforco':
        return [
          { label: 'Alunos Acompanhados', value: '3', change: 'Sessão agora: Lucas', icon: <GraduationCap size={20} />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
          { label: 'Registros Hoje', value: '2/3', change: '1 pendente', icon: <Activity size={20} />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
          { label: 'Metas do Dia', value: '5', change: '3 em autonomia', icon: <TrendingUp size={20} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
          { label: 'Autonomia Média', value: '72%', change: '+4% esta semana', icon: <ArrowUpRight size={20} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
        ];
      case 'aluno':
        return [
          { label: 'Atividades Novas', value: '3', change: 'Português, Matemática', icon: <BookOpen size={20} />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
          { label: 'Concluídas', value: '12', change: 'Esta semana', icon: <TrendingUp size={20} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
        ];
      default:
        return [];
    }
  };

  const getQuickActionsForRole = (): QuickAction[] => {
    switch (user.role) {
      case 'super_admin':
        return [
          { label: 'Nova Escola', description: 'Criar instância', href: '/escolas', icon: <School size={18} />, color: '#6366f1' },
          { label: 'Gerenciar Planos', description: 'Assinaturas', href: '/planos', icon: <TrendingUp size={18} />, color: '#06b6d4' },
          { label: 'Configurações', description: 'Sistema global', href: '/configuracoes', icon: <BarChart3 size={18} />, color: '#10b981' },
        ];
      case 'diretor':
        return [
          { label: 'Ver Turmas', description: 'Gerenciar turmas', href: '/turmas', icon: <Users size={18} />, color: '#6366f1' },
          { label: 'Relatórios', description: 'Métricas gerais', href: '/relatorios', icon: <BarChart3 size={18} />, color: '#06b6d4' },
          { label: 'Alunos', description: 'Cadastro geral', href: '/alunos', icon: <GraduationCap size={18} />, color: '#10b981' },
        ];
      case 'coordenador':
        return [
          { label: 'Aprovar PEIs', description: '5 pendentes', href: '/pei', icon: <ClipboardList size={18} />, color: '#f59e0b' },
          { label: 'Validar Laudos', description: '2 novos', href: '/laudos', icon: <FileCheck size={18} />, color: '#ef4444' },
          { label: 'Acompanhamentos', description: 'Monitorar registros', href: '/acompanhamento', icon: <Activity size={18} />, color: '#10b981' },
          { label: 'Relatórios', description: 'Visão consolidada', href: '/relatorios', icon: <BarChart3 size={18} />, color: '#6366f1' },
        ];
      case 'professor_aee':
        return [
          { label: 'Editar PEI', description: 'Metas e adaptações', href: '/pei', icon: <ClipboardList size={18} />, color: '#6366f1' },
          { label: 'Upload Laudo', description: 'Novo documento', href: '/laudos', icon: <FileCheck size={18} />, color: '#06b6d4' },
          { label: 'Gerar Conteúdo', description: 'BNCC adaptado', href: '/gerador-bncc', icon: <Sparkles size={18} />, color: '#10b981' },
          { label: 'Acompanhamento', description: 'Registrar evolução', href: '/acompanhamento', icon: <Activity size={18} />, color: '#f59e0b' },
        ];
      case 'professor_regente':
        return [
          { label: 'Acompanhamento', description: 'Registrar dia', href: '/acompanhamento', icon: <Activity size={18} />, color: '#6366f1' },
          { label: 'Gerar Conteúdo', description: 'BNCC adaptado', href: '/gerador-bncc', icon: <Sparkles size={18} />, color: '#10b981' },
          { label: 'Ver PEIs', description: 'Das minhas turmas', href: '/pei', icon: <ClipboardList size={18} />, color: '#06b6d4' },
        ];
      case 'professor_reforco':
        return [
          { label: 'Registrar Agora', description: 'Acompanhamento rápido', href: '/acompanhamento', icon: <Activity size={18} />, color: '#6366f1' },
        ];
      case 'aluno':
        return [
          { label: 'Minhas Atividades', description: 'Ver e responder', href: '/atividades', icon: <BookOpen size={18} />, color: '#6366f1' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();
  const quickActions = getQuickActionsForRole();

  return (
    <div className={styles.dashboardPage} id="dashboard-page">
      {/* Greeting */}
      <div className={styles.dashboardGreeting}>
        <h1 className={styles.greetingText}>
          {getGreeting()}, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className={styles.greetingSubtext}>
          {user.role === 'aluno'
            ? 'Confira suas atividades de hoje.'
            : `Confira o resumo da sua ${user.role === 'super_admin' ? 'plataforma' : 'escola'} hoje.`}
        </p>
      </div>

      {/* Dynamic Render: Director Layout vs Generics */}
      {user.role === 'diretor' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          <section>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: 'var(--space-md)' }}>Infraestrutura (Secretaria)</h2>
            <div className={styles.statsGrid}>
               {stats.map((stat, index) => (
                 <div key={index} className={styles.statCard} style={{ animationDelay: `${index * 0.1}s` }}>
                   <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: stat.gradient, borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }} />
                   <div className={styles.statCardHeader}>
                     <span className={styles.statCardLabel}>{stat.label}</span>
                     <div className={styles.statCardIcon} style={{ background: `${stat.color}18`, color: stat.color }}>{stat.icon}</div>
                   </div>
                   <div className={styles.statCardValue}>{stat.value}</div>
                 </div>
               ))}
            </div>
          </section>
          
          <section>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: 'var(--space-md)' }}>Métricas do AEE (Núcleo de Inclusão)</h2>
             <div className={styles.statsGrid}>
               <div className={styles.statCard}><div className={styles.statCardHeader}><span className={styles.statCardLabel}>Alunos com PEI Ativo</span><div className={styles.statCardIcon} style={{ color: '#06b6d4', background: '#06b6d418' }}><ClipboardList size={20}/></div></div><div className={styles.statCardValue}>47</div></div>
               <div className={styles.statCard}><div className={styles.statCardHeader}><span className={styles.statCardLabel}>Laudos Psiquiátricos (Base)</span><div className={styles.statCardIcon} style={{ color: '#f59e0b', background: '#f59e0b18' }}><FileCheck size={20}/></div></div><div className={styles.statCardValue}>39</div></div>
               <div className={styles.statCard}><div className={styles.statCardHeader}><span className={styles.statCardLabel}>Reuniões Avaliativas (Bimestre)</span><div className={styles.statCardIcon} style={{ color: '#10b981', background: '#10b98118' }}><Users size={20}/></div></div><div className={styles.statCardValue}>12</div></div>
             </div>
          </section>

           <section>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: 'var(--space-md)' }}>Tracking Diário (Prof. Reforço)</h2>
            <div className={styles.statsGrid}>
               <div className={styles.statCard}><div className={styles.statCardHeader}><span className={styles.statCardLabel}>Taxa de Autonomia Geral</span><div className={styles.statCardIcon} style={{ color: '#3b82f6', background: '#3b82f618' }}><TrendingUp size={20}/></div></div><div className={styles.statCardValue}>82%</div></div>
               <div className={styles.statCard}><div className={styles.statCardHeader}><span className={styles.statCardLabel}>Crises Controladas</span><div className={styles.statCardIcon} style={{ color: '#ef4444', background: '#ef444418' }}><Activity size={20}/></div></div><div className={styles.statCardValue}>4</div></div>
               <div className={styles.statCard}><div className={styles.statCardHeader}><span className={styles.statCardLabel}>Interações Cadastradas</span><div className={styles.statCardIcon} style={{ color: '#8b5cf6', background: '#8b5cf618' }}><BarChart3 size={20}/></div></div><div className={styles.statCardValue}>183</div></div>
            </div>
          </section>
        </div>
      ) : (
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={styles.statCard}
              style={{ animationDelay: `${index * 0.1}s` }}
              id={`stat-card-${index}`}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: stat.gradient,
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                }}
              />
              <div className={styles.statCardHeader}>
                <span className={styles.statCardLabel}>{stat.label}</span>
                <div
                  className={styles.statCardIcon}
                  style={{ background: `${stat.color}18`, color: stat.color }}
                >
                  {stat.icon}
                </div>
              </div>
              <div className={styles.statCardValue}>{stat.value}</div>
              <span className={`${styles.statCardChange} ${styles.positive}`}>
                <ArrowUpRight size={12} />
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className={styles.quickActions}>
          <h2 className={styles.quickActionsTitle}>Ações Rápidas</h2>
          <div className={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={styles.quickActionCard}
                id={`quick-action-${index}`}
              >
                <div
                  className={styles.quickActionIcon}
                  style={{ background: `${action.color}18`, color: action.color }}
                >
                  {action.icon}
                </div>
                <div>
                  <div className={styles.quickActionLabel}>{action.label}</div>
                  <div className={styles.quickActionDesc}>{action.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
