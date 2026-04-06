'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus, UserCircle, X } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import Select from '@/components/ui/Select/Select';
import { mockTurmas } from '@/data/mockTurmas';

export default function AlunosPage() {
  const router = useRouter();
  const { user } = useAuth();
  const canCreate = ['diretor', 'coordenador'].includes(user.role);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [mockData, setMockData] = useState([
    { id: '1', nome: 'Matheus Almeida', turma: '5º Ano B', laudo: 'TEA' },
    { id: '2', nome: 'Mariana Souza', turma: '1º Ano A', laudo: 'Dislexia' },
    { id: '3', nome: 'Carlos Silva', turma: '3º Ano (Médio)', laudo: 'Aguardando Neurologista' }
  ]);

  const [newNome, setNewNome] = useState('');
  const [newTurma, setNewTurma] = useState('');
  const [newLaudo, setNewLaudo] = useState('Sem Laudo Clínico');

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2xl)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>Alunos Matriculados</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Painel de secretaria. Lista de todos os alunos elegíveis na Bloomy.</p>
        </div>
        {canCreate && (
          <Button variant="primary" leftIcon={<UserPlus size={16}/>} onClick={() => setIsModalOpen(true)}>Nova Matrícula</Button>
        )}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {/* Mocking generic list */}
        {mockData.map(a => (
          <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-md) var(--space-xl)', background: 'var(--bg-card)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
               <UserCircle size={28} color="var(--text-tertiary)"/>
               <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{a.nome}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>RA: {202600 + parseInt(a.id)}</div>
               </div>
            </div>
            <div style={{ color: 'var(--text-secondary)', width: '150px' }}>{a.turma}</div>
            <div style={{ color: 'var(--accent-primary)' }}>CID / {a.laudo}</div>
            <Button variant="ghost" onClick={() => router.push('/pei')}>Ver PEIs do Aluno</Button>
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--space-sm)' }}>Cadastrar Aluno</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Secretaria: Forneça os dados de base do estudante.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Nome Completo *</label>
                  <input style={{ width: '100%', padding: '12px', border: '1px solid var(--surface-border-strong)', borderRadius: '8px', background: 'var(--bg-tertiary)' }}
                         value={newNome} onChange={e => setNewNome(e.target.value)} placeholder="Ex: Ana Luísa..." />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Turma Alocada *</label>
                  <Select fullWidth value={newTurma} onChange={e => setNewTurma(e.target.value)}>
                    <option value="" disabled>Selecione...</option>
                    {mockTurmas.map(t => <option key={t.id} value={t.name}>{t.name} ({t.period})</option>)}
                  </Select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Diagnóstico Base / CID (Opcional)</label>
                  <input style={{ width: '100%', padding: '12px', border: '1px solid var(--surface-border-strong)', borderRadius: '8px', background: 'var(--bg-tertiary)' }}
                         value={newLaudo} onChange={e => setNewLaudo(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button variant="primary" disabled={!newNome || !newTurma} onClick={() => {
                   setMockData([...mockData, { id: '99', nome: newNome, turma: newTurma, laudo: newLaudo }]);
                   setIsModalOpen(false);
                }}>Confirmar Matrícula</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
