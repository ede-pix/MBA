'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Power } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

export default function EscolasPage() {
  const { user } = useAuth();
  
  if (user.role !== 'super_admin') {
    return <div style={{ padding: 'var(--space-xl)' }}>Acesso bloqueado. Apenas Desenvolvedores SaaS visualizam métricas da Bloomy Multi-Tenancy.</div>;
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>Tenants Globais (Escolas)</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Master Console: Visualização de MRR, licenças ativas e armazenamento por Instituição Cliente.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-md) var(--space-xl)', background: 'var(--bg-card)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
               <Building2 size={28} color="var(--accent-primary)"/>
               <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Escola Municipal Horizonte</div>
                  <div style={{ fontSize: '12px', color: 'var(--accent-success)' }}>Plano Ilimitado Premium</div>
               </div>
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>284 PEIs na nuvem (4GB)</div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>R$ 1.250 / Mês</div>
            <button style={{ color: 'var(--accent-danger)' }}><Power size={20}/></button>
        </div>
      </div>
    </div>
  );
}
