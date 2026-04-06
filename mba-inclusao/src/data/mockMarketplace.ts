export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  schoolName: string;
  tags: string[];         // e.g. ["TEA", "Autismo", "Matemática"]
  level: string;          // e.g. "Ensino Fundamental I"
  fileType: 'pdf' | 'doc' | 'image' | 'video';
  downloads: number;
  likes: number;
  createdAt: string;
}

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: 'mk-001',
    title: 'Roteiros Visuais para Rotina Matemática',
    description: 'Conjunto de rotinas visuais desenhadas focado no aluno com TEA Nível 1. Ajuda a reduzir a frustração na troca de matérias usando suportes visuais de tempo.',
    authorName: 'Juliana Fernandes',
    authorAvatar: 'JF',
    schoolName: 'Escola Municipal Horizonte',
    tags: ['TEA', 'Matemática', 'Roteiro Visual', 'Regulação'],
    level: 'Ensino Fundamental I',
    fileType: 'pdf',
    downloads: 145,
    likes: 42,
    createdAt: '01/04/2026'
  },
  {
    id: 'mk-002',
    title: 'Cartões Fonéticos Ampliados (Dislexia)',
    description: 'Borda com alto contraste e pautas espaçadas. Projetado para alunos com dislexia confundindo b/p/d/q. Inclui guia de impressão.',
    authorName: 'Roberto Alves',
    authorAvatar: 'RA',
    schoolName: 'Colégio Estadual do Sol',
    tags: ['Dislexia', 'Alfabetização', 'Contraste'],
    level: 'Ensino Fundamental I',
    fileType: 'pdf',
    downloads: 302,
    likes: 89,
    createdAt: '22/03/2026'
  },
  {
    id: 'mk-003',
    title: 'História Divertida: Revolução Industrial Rápida',
    description: 'Material particionado (TDAH). Textos curtos com imagens que quebram blocos maciços de leitura, focando em manter a dopamina do aluno ativa durante a leitura focada.',
    authorName: 'Carla Dias',
    authorAvatar: 'CD',
    schoolName: 'Escola Municipal Horizonte',
    tags: ['TDAH', 'História', 'Textos Curtos'],
    level: 'Ensino Fundamental II',
    fileType: 'doc',
    downloads: 67,
    likes: 12,
    createdAt: '03/04/2026'
  },
  {
    id: 'mk-004',
    title: 'Dado das Emoções - Comunicação Alternativa',
    description: 'Molde em papel para os mediadores construírem em formato 3D e auxiliarem crianças com atraso na fala/pragmática a demonstrarem o que sentem no início da sessão.',
    authorName: 'Marcos AEE',
    authorAvatar: 'M',
    schoolName: 'Plataforma Global',
    tags: ['TEA', 'Comunicação Alternativa', 'CAA'],
    level: 'Educação Infantil',
    fileType: 'image',
    downloads: 512,
    likes: 180,
    createdAt: '15/02/2026'
  }
];
