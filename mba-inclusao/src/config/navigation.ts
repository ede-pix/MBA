import { UserRole } from '@/types/auth';

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles: UserRole[];
  badge?: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: 'Geral',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        roles: ['super_admin', 'diretor', 'coordenador', 'professor_aee', 'professor_regente', 'professor_reforco'],
        description: 'Visão geral e métricas',
      },
    ],
  },
  {
    title: 'Administração',
    items: [
      {
        label: 'Escolas',
        href: '/escolas',
        icon: 'School',
        roles: ['super_admin'],
        description: 'Gerenciar instâncias de escolas',
      },
      {
        label: 'Planos e Assinaturas',
        href: '/planos',
        icon: 'CreditCard',
        roles: ['super_admin'],
        description: 'Gerenciar planos do SaaS',
      },
      {
        label: 'Configurações',
        href: '/configuracoes',
        icon: 'Settings',
        roles: ['super_admin', 'diretor'],
        description: 'Configurações da plataforma',
      },
    ],
  },
  {
    title: 'Acadêmico',
    items: [
      {
        label: 'Turmas',
        href: '/turmas',
        icon: 'Users',
        roles: ['diretor', 'coordenador', 'professor_aee', 'professor_regente'],
        description: 'Gerenciar turmas e matrículas',
      },
      {
        label: 'Alunos',
        href: '/alunos',
        icon: 'GraduationCap',
        roles: ['diretor', 'coordenador', 'professor_aee'],
        description: 'Cadastro e perfil de alunos',
      },
    ],
  },
  {
    title: 'Inclusão',
    items: [
      {
        label: 'PEI',
        href: '/pei',
        icon: 'ClipboardList',
        roles: ['coordenador', 'professor_aee', 'professor_regente'],
        badge: 'Plano Ed.',
        description: 'Plano Educacional Individualizado',
      },
      {
        label: 'Laudos',
        href: '/laudos',
        icon: 'FileCheck',
        roles: ['coordenador', 'professor_aee'],
        description: 'Upload e validação de laudos',
      },
      {
        label: 'Acompanhamento',
        href: '/acompanhamento',
        icon: 'Activity',
        roles: ['coordenador', 'professor_aee', 'professor_regente', 'professor_reforco'],
        description: 'Registro diário de evolução',
      },
      {
        label: 'Relatórios',
        href: '/relatorios',
        icon: 'BarChart3',
        roles: ['diretor', 'coordenador', 'professor_aee'],
        description: 'Relatórios trimestrais de evolução',
      },
    ],
  },
  {
    title: 'Conteúdo',
    items: [
      {
        label: 'Gerador BNCC',
        href: '/gerador-bncc',
        icon: 'Sparkles',
        roles: ['professor_aee', 'professor_regente'],
        description: 'Gerar conteúdo adaptado pela BNCC',
      },
      {
        label: 'Materiais (Rede)',
        href: '/marketplace',
        icon: 'Layers',
        roles: ['super_admin', 'diretor', 'coordenador', 'professor_aee', 'professor_regente'],
        badge: 'Novo',
        description: 'Marketplace de conteúdos inclusivos comunitários',
      },
      {
        label: 'Atividades',
        href: '/atividades',
        icon: 'BookOpen',
        roles: ['aluno'],
        description: 'Atividades adaptadas para você',
      },
    ],
  },
];

export function getNavigationForRole(role: UserRole): NavSection[] {
  return navigation
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((section) => section.items.length > 0);
}
