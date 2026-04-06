'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { mockPeis } from '@/data/mockPei';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import { Play } from 'lucide-react';
import styles from './acompanhamento-list.module.css';

export default function AcompanhamentoListPage() {
  const { user, isRole } = useAuth();
  const router = useRouter();

  // For this mock, if you're "professor_reforco" we just show the first few students 
  // to simulate "meus alunos de hoje".
  const myStudents = mockPeis.filter(p => p.status !== 'draft');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('');
  };

  const handleStartTracking = (id: string) => {
    router.push(`/acompanhamento/${id}`);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Acompanhamento Diário</h1>
        <p>Selecione o aluno para iniciar o registro da sessão de hoje.</p>
      </header>

      <div className={styles.grid}>
        {myStudents.map((student) => (
          <Card
            key={student.id}
            title={student.studentName}
            subtitle={`${student.classRoom} • ${student.age} anos`}
            avatarText={getInitials(student.studentName)}
            onClick={() => handleStartTracking(student.id)}
            content={
              <div className={styles.cardContent}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Metas a monitorar</span>
                  <span className={styles.infoValue}>2 Ativas</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Último registro</span>
                  <span className={styles.infoValue}>Ontem</span>
                </div>
              </div>
            }
            footer={
              <Button 
                variant="primary" 
                fullWidth 
                leftIcon={<Play size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartTracking(student.id);
                }}
              >
                Iniciar Sessão
              </Button>
            }
          />
        ))}
      </div>
      
      {myStudents.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
          Você não tem alunos com planos vigentes atribuídos hoje.
        </div>
      )}
    </div>
  );
}
