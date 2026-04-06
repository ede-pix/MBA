export interface PeiData {
  id: string;
  studentName: string;
  studentId: string;
  age: number;
  classRoom: string;
  diagnostics: string[];
  status: 'draft' | 'review' | 'approved' | 'active' | 'completed';
  lastUpdated: string;
  aeeTeacher: string;
  identificacao: {
    necessidadesMedicas: string;
    terapiasExtracurriculares: string;
  };
  historicoEscolar: {
    trajetóriaPręvia: string;
    interacoesSociais: string;
  };
  habilidades: {
    potencialidades: string;
    barreiras: string;
  };
  metas: {
    curtoPrazo: string;
    longoPrazo: string;
  };
  adaptacoes: {
    materiais: string;
    avaliativas: string;
  };
  recursosAssistivos: {
    tecnologiaAssistiva: string;
    mobiliario: string;
  };
}

export const mockPeis: PeiData[] = [
  {
    id: 'pei-1',
    studentName: 'Matheus Almeida',
    studentId: 'AL-202601',
    age: 10,
    classRoom: '5º Ano B',
    diagnostics: ['TEA (Transtorno do Espectro Autista)', 'TDAH'],
    status: 'review',
    lastUpdated: '15/03/2026',
    aeeTeacher: 'Juliana Costa',
    identificacao: { necessidadesMedicas: 'Nenhuma reportada', terapiasExtracurriculares: 'Fonoaudióloga 2x semana' },
    historicoEscolar: { trajetóriaPręvia: 'Retenção no 2º ano. Dificuldade de alfabetização inicial.', interacoesSociais: 'Prefere interagir com adultos.' },
    habilidades: { potencialidades: 'Ótima memória visual, gosta de desenhar', barreiras: 'Dificuldade motora fina e de manter foco' },
    metas: { curtoPrazo: 'Segurar o lápis corretamente, escrever 10 palavras simples', longoPrazo: 'Escrever pequenos textos e interpretar histórias' },
    adaptacoes: { materiais: 'Lápis engrossado', avaliativas: 'Provas orais para leitura' },
    recursosAssistivos: { tecnologiaAssistiva: 'Tablet com app de comunicação', mobiliario: 'Cadeira com encosto adaptado' },
  },
  {
    id: 'pei-2',
    studentName: 'Mariana Souza',
    studentId: 'AL-202602',
    age: 7,
    classRoom: '1º Ano A',
    diagnostics: ['Dislexia', 'Apraxia de Fala'],
    status: 'active',
    lastUpdated: '10/02/2026',
    aeeTeacher: 'Juliana Costa',
    identificacao: { necessidadesMedicas: 'Uso de Ritalina 10mg (Manhã)', terapiasExtracurriculares: 'Psicologia Cognitiva' },
    historicoEscolar: { trajetóriaPręvia: 'Sempre estudou na escola. Bom rendimento até o 5º ano.', interacoesSociais: 'Sociável mas facilmente distraída por colegas.' },
    habilidades: { potencialidades: 'Excelente leitura em voz alta', barreiras: 'Déficit de atenção afeta compreensão matemática' },
    metas: { curtoPrazo: 'Prestar atenção por 15 min contínuos', longoPrazo: 'Fazer lições de casa matematicas sozinha' },
    adaptacoes: { materiais: 'Sentar na primeira fileira', avaliativas: 'Tempo estendido de prova (+30min)' },
    recursosAssistivos: { tecnologiaAssistiva: 'Calculadora de botões grandes', mobiliario: 'Mesa antiruído' },
  },
  {
    id: 'pei-3',
    studentName: 'Carlos Silva',
    studentId: 'AL-202603',
    age: 15,
    classRoom: '3º Ano (Médio)',
    diagnostics: ['Aguardando Neurologista', 'Ansiedade Generalizada'],
    status: 'completed',
    lastUpdated: '01/12/2025',
    aeeTeacher: 'Carlos Admin',
    identificacao: { necessidadesMedicas: 'Sem necessidade no momento', terapiasExtracurriculares: 'Terapia Ocupacional' },
    historicoEscolar: { trajetóriaPręvia: 'Transferido ano atual devido a bullying.', interacoesSociais: 'Retraído, evita contato visual.' },
    habilidades: { potencialidades: 'Alta habilidade lógica', barreiras: 'Bloqueio na comunicação verbal com o regente' },
    metas: { curtoPrazo: 'Erguer a mão para tirar dúvidas', longoPrazo: 'Apresentar trabalhos ao lado de 1 colega' },
    adaptacoes: { materiais: 'Fones abafadores', avaliativas: 'Avaliações baseadas em projetos paralelos' },
    recursosAssistivos: { tecnologiaAssistiva: 'Prancha de Comunicação PCS Avançada', mobiliario: 'Carteira em canto isolado' },
  }
];
