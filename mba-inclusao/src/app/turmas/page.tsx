'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Plus, CheckCircle2, X } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import { mockTurmas } from '@/data/mockTurmas';

export default function TurmasPage() {
  const router = useRouter();
  const { user } = useAuth();
  const canCreate = ['diretor', 'coordenador'].includes(user.role);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(mockTurmas);
  
  const [newName, setNewName] = useState('');
  const [newPeriod, setNewPeriod] = useState('Matutino');
  const [newLevel, setNewLevel] = useState('Ensino Fundamental I');

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2xl)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>Governança de Turmas</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Visualize e gerencie a infraestrutura acadêmica de {new Date().getFullYear()}.</p>
        </div>
        {canCreate && (
          <Button variant="primary" leftIcon={<Plus size={16}/>} onClick={() => setIsModalOpen(true)}>Nova Turma</Button>
        )}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {data.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-md) var(--space-xl)', background: 'var(--bg-card)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
               <Users size={28} color="var(--accent-primary)"/>
               <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t.level} - {t.period}</div>
               </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-success)' }}><CheckCircle2 size={16} /> Ativa ({t.year})</div>
            <Button variant="ghost" onClick={() => router.push('/alunos')}>Ver Alunos</Button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
           <div style={{ background: 'var(--bg-card)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)', width: '90%', maxWidth: '500px', position: 'relative' }}>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20}/>
              </button>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--space-sm)' }}>Abrir Nova Turma</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Secretaria: Infraestrutura Acadêmica.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Nomenclatura *</label>
                  <input style={{ width: '100%', padding: '12px', border: '1px solid var(--surface-border-strong)', borderRadius: '8px', background: 'var(--bg-tertiary)' }}
                         value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ex: 8º Ano A" />
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Turno</label>
                    <select style={{ width: '100%', padding: '12px', border: '1px solid var(--surface-border-strong)', borderRadius: '8px', background: 'var(--bg-tertiary)' }}
                           value={newPeriod} onChange={e => setNewPeriod(e.target.value)}>
                      <option>Matutino</option>
                      <option>Vespertino</option>
                      <option>Noturno</option>
                      <option>Integral</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Nível de Ensino</label>
                     <select style={{ width: '100%', padding: '12px', border: '1px solid var(--surface-border-strong)', borderRadius: '8px', background: 'var(--bg-tertiary)' }}
                           value={newLevel} onChange={e => setNewLevel(e.target.value)}>
                      <option>Ensino Infantil</option>
                      <option>Ensino Fundamental I</option>
                      <option>Ensino Fundamental II</option>
                      <option>Ensino Médio</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button variant="primary" disabled={!newName} onClick={() => {
                   setData([...data, { id: Date.now().toString(), name: newName, period: newPeriod as any, level: newLevel, year: 2026 }]);
                   setIsModalOpen(false);
                }}>Adicionar à Rede</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
