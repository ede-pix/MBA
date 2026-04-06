export interface Turma {
  id: string;
  name: string;
  year: number;
  period: 'Matutino' | 'Vespertino' | 'Integral';
  level: string; // Ensino Infantil, Ensino Fundamental I, etc.
}

export const mockTurmas: Turma[] = [
  { id: 't-01', name: 'Maternal II', year: 2026, period: 'Matutino', level: 'Ensino Infantil' },
  { id: 't-02', name: '1º Ano A', year: 2026, period: 'Matutino', level: 'Ensino Fundamental I' },
  { id: 't-03', name: '1º Ano B', year: 2026, period: 'Vespertino', level: 'Ensino Fundamental I' },
  { id: 't-04', name: '2º Ano A', year: 2026, period: 'Matutino', level: 'Ensino Fundamental I' },
  { id: 't-05', name: '5º Ano B', year: 2026, period: 'Matutino', level: 'Ensino Fundamental I' },
  { id: 't-06', name: '6º Ano A', year: 2026, period: 'Vespertino', level: 'Ensino Fundamental II' },
  { id: 't-07', name: '9º Ano C', year: 2026, period: 'Matutino', level: 'Ensino Fundamental II' },
  { id: 't-08', name: '1º Ano Médio Integrado', year: 2026, period: 'Integral', level: 'Ensino Médio' },
];
