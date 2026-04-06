export type UserRole =
  | 'super_admin'
  | 'diretor'
  | 'coordenador'
  | 'professor_aee'
  | 'professor_regente'
  | 'professor_reforco'
  | 'aluno';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  schoolName?: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  diretor: 'Diretor(a)',
  coordenador: 'Coordenador(a) Pedagógico',
  professor_aee: 'Professor(a) AEE',
  professor_regente: 'Professor(a) Regente',
  professor_reforco: 'Prof. Reforço / Mediador',
  aluno: 'Aluno(a)',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: '#e74cff',
  diretor: '#4c9aff',
  coordenador: '#36d399',
  professor_aee: '#ff9f43',
  professor_regente: '#00d2d3',
  professor_reforco: '#feca57',
  aluno: '#a29bfe',
};

export const MOCK_USERS: Record<UserRole, User> = {
  super_admin: {
    id: '1',
    name: 'Carlos Admin',
    email: 'admin@mbainclusao.com',
    role: 'super_admin',
    schoolName: 'Plataforma Global',
  },
  diretor: {
    id: '2',
    name: 'Maria Diretora',
    email: 'maria@escola.com',
    role: 'diretor',
    schoolName: 'Escola Municipal Horizonte',
  },
  coordenador: {
    id: '3',
    name: 'Ana Coordenadora',
    email: 'ana@escola.com',
    role: 'coordenador',
    schoolName: 'Escola Municipal Horizonte',
  },
  professor_aee: {
    id: '4',
    name: 'Prof. Juliana AEE',
    email: 'juliana@escola.com',
    role: 'professor_aee',
    schoolName: 'Escola Municipal Horizonte',
  },
  professor_regente: {
    id: '5',
    name: 'Prof. Roberto',
    email: 'roberto@escola.com',
    role: 'professor_regente',
    schoolName: 'Escola Municipal Horizonte',
  },
  professor_reforco: {
    id: '6',
    name: 'Prof. Lucas Mediador',
    email: 'lucas@escola.com',
    role: 'professor_reforco',
    schoolName: 'Escola Municipal Horizonte',
  },
  aluno: {
    id: '7',
    name: 'Pedro Aluno',
    email: 'pedro@escola.com',
    role: 'aluno',
    schoolName: 'Escola Municipal Horizonte',
  },
};
