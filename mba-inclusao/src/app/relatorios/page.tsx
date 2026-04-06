'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Download, TrendingUp, Presentation } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';

export default function RelatoriosPage() {
  const { user } = useAuth();
  const canExportLocal = ['diretor', 'coordenador', 'professor_aee'].includes(user.role);

  if (!canExportLocal) {
    return <div style={{ padding: 'var(--space-xl)' }}>Acesso restrito. Suas permissões não validam exportação de métricas globais.</div>;
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>Relatórios Clínico-Pedagógicos</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Métricas do AEE e do Acompanhamento Diário tabuladas em PDF para a secretaria e pais.</p>
      </header>

      <div style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        <Card 
          title="Consolidado BIMESTRAL"
          subtitle="Taxa de Autonomia e Crises"
          avatarText="BM"
          avatarColor="var(--accent-primary)"
          content={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', color: 'var(--text-secondary)' }}>
              <TrendingUp size={32} color="var(--accent-success)"/>
              <span>Alunos apresentaram 12% a menos de crises (Bimestre passado).</span>
            </div>
          }
          footer={<Button variant="outline" fullWidth rightIcon={<Download size={16}/>}>Gerar PDF Sintético</Button>}
        />
        <Card 
          title="Exportar Sala Específica"
          subtitle="Para Professores Regentes"
          avatarText="SL"
          avatarColor="var(--accent-secondary)"
          content={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', color: 'var(--text-secondary)' }}>
              <Presentation size={32} color="var(--text-tertiary)"/>
              <span>Extraia resumos de adaptação metodológica para enviar no conselho.</span>
            </div>
          }
          footer={<Button variant="outline" fullWidth rightIcon={<Download size={16}/>}>Gerar Fichas (Regência)</Button>}
        />
      </div>
    </div>
  );
}
