'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';

export default function PlanosPage() {
  const { user } = useAuth();
  
  if (user.role !== 'super_admin') {
    return <div style={{ padding: 'var(--space-xl)' }}>Acesso bloqueado. Apenas Administradores verificam infraestrutura de pagamentos Bloomy.</div>;
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>Planos e Upgrade</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Controle os pacotes B2B oferecidos para novas escolas que utilizam a API.</p>
      </header>

      <div style={{ display: 'flex', gap: 'var(--space-xl)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Card 
          title="Plano Inclusão Base"
          subtitle="Escolas pequenas"
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', fontSize: 'var(--font-size-sm)' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)' }}>R$ 399<span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>/mês</span></div>
              <div style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-success)"/> Até 15 Alunos com PEI</div>
              <div style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-success)"/> Gerador BNCC Ilimitado</div>
              <div style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-success)"/> Track Diário</div>
            </div>
          }
          footer={<Button variant="outline" fullWidth>Desativado (0 instâncias)</Button>}
        />

        <Card 
          title="Plano Premium"
          subtitle="Rede de Ensino"
          content={
             <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', fontSize: 'var(--font-size-sm)' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)' }}>R$ 1.250<span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>/mês</span></div>
              <div style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-success)"/> Alunos Ilimitados</div>
              <div style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-success)"/> Exportação em Rede para PDF</div>
              <div style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-success)"/> Marca própria D-Whitelabel</div>
            </div>
          }
          footer={<Button variant="primary" fullWidth>Ativo (1 instância)</Button>}
        />
      </div>
    </div>
  );
}
