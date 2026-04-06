'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Select from '@/components/ui/Select/Select';
import { mockPeis } from '@/data/mockPei';
import { mockTurmas } from '@/data/mockTurmas';
import { FilePlus, ArrowRight } from 'lucide-react';
import styles from './novo-pei.module.css';

export default function NovoPeiPage() {
  const router = useRouter();
  
  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');
  const [idade, setIdade] = useState('');

  const handleCreate = () => {
    // Basic validation
    if (!nome || !turma || !idade) return;

    // Simulate pushing to mock database
    const newId = `pei-new-${Date.now()}`;
    
    // In a real app this would call an API. Here we just mutate the imported array 
    // temporarily since it's an MVP showcase, to allow the user to view it.
    mockPeis.push({
      id: newId,
      studentName: nome,
      studentId: `AL-${Math.floor(Math.random() * 9000) + 1000}`,
      age: parseInt(idade),
      classRoom: turma,
      diagnostics: ['Aguardando Diagnóstico Final'],
      status: 'draft',
      lastUpdated: new Date().toLocaleDateString('pt-BR'),
      aeeTeacher: 'Atual Professor',
      identificacao: { necessidadesMedicas: '', terapiasExtracurriculares: '' },
      habilidades: { potencialidades: '', barreiras: '' },
      metas: { curtoPrazo: '', longoPrazo: '' },
      adaptacoes: { materiais: '', avaliativas: '' }
    });

    // Navigate to the newly created blank form
    router.push(`/pei/${newId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <FilePlus size={48} color="var(--accent-primary)" style={{ margin: '0 auto var(--space-md)' }} />
        <h1>Iniciar Plano Educacional</h1>
        <p>Preencha os dados base do aluno para gerar o documento oficial de Rascunho.</p>
      </header>

      <div className={styles.formCard}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome Completo do Aluno</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Ex: Carlos Eduardo Pereira..."
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <div className={styles.formGroup} style={{ flex: 2 }}>
            <label className={styles.label}>Turma / Ano Vigente (2026)</label>
            <Select 
              fullWidth
              value={turma}
              onChange={e => setTurma(e.target.value)}
            >
              <option value="" disabled>Selecione a turma...</option>
              {mockTurmas.filter(t => t.year === 2026).map(t => (
                <option key={t.id} value={t.name}>
                  {t.name} ({t.period})
                </option>
              ))}
            </Select>
          </div>
          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label className={styles.label}>Idade</label>
            <input 
              type="number" 
              className={styles.input} 
              placeholder="Ex: 10"
              value={idade}
              onChange={e => setIdade(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={() => router.push('/pei')}>Cancelar</Button>
          <Button 
            variant="primary" 
            rightIcon={<ArrowRight size={16} />}
            onClick={handleCreate}
            disabled={!nome || !turma || !idade}
          >
            Gerar Documento
          </Button>
        </div>
      </div>
    </div>
  );
}
