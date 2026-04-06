'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, ShieldCheck, Database, Bell } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

export default function ConfiguracoesPage() {
  const { user } = useAuth();
  
  // Conditionally render options based on RBAC logic
  const isSuperAdmin = user.role === 'super_admin';
  const isDiretor = user.role === 'diretor';
  // Nobody else should even see this route per navigation.ts

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <Settings color="var(--accent-primary)" /> Configurações
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {isSuperAdmin ? 'Ajustes globais do Servidor SaaS Cloud' : 'Termos, Preferências e Setup da sua Instituição Escolar'}
        </p>
      </header>

      <div style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
        
        {/* Diretor specific Setting */}
        {(isDiretor || isSuperAdmin) && (
          <Card 
            title="Políticas da Instituição"
            content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Forçar assinatura em PEIs</span>
                  <input type="checkbox" defaultChecked style={{ scale: '1.2' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Permitir acesso de Pais aos Acompanhamentos</span>
                  <input type="checkbox" style={{ scale: '1.2' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Bell size={16}/> Enviar SMS Clínico </span>
                  <input type="checkbox" defaultChecked style={{ scale: '1.2' }} />
                </div>
              </div>
            }
          />
        )}

        {/* SuperAdmin Specific */}
        {isSuperAdmin && (
          <>
            <Card 
              title="Infraestrutura (Cloud)"
              content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Database size={16} color="var(--accent-danger)"/> Rotina de Backup Cloud </span>
                    <button style={{ padding: '4px 12px', background: 'var(--surface-border)', borderRadius: '4px' }}>Forçar</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><ShieldCheck size={16} color="var(--accent-success)"/> Criptografia LGPD Ativa</span>
                    <span style={{ color: 'var(--accent-success)', fontWeight: 'bold' }}>Sim</span>
                  </div>
                </div>
              }
            />
          </>
        )}

      </div>
    </div>
  );
}
