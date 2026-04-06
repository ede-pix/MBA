'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { mockPeis } from '@/data/mockPei';
import ClickerTracker from '@/components/ui/ClickerTracker/ClickerTracker';
import Button from '@/components/ui/Button/Button';
import { ArrowLeft, Clock, Target, Smile, AlertCircle, Save, CheckCircle } from 'lucide-react';
import styles from './daily-tracker.module.css';

export default function DailyTrackerPage() {
  const router = useRouter();
  const params = useParams();
  const [student] = useState(mockPeis.find(p => p.id === params.id));
  const [mood, setMood] = useState<number | null>(null);
  const [completedGoals, setCompletedGoals] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Simple session timer
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!student) {
    return <div style={{ padding: '40px' }}>Aluno não encontrado.</div>;
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleGoal = (index: number) => {
    if (completedGoals.includes(index)) {
      setCompletedGoals(completedGoals.filter(i => i !== index));
    } else {
      setCompletedGoals([...completedGoals, index]);
    }
  };

  const parseGoals = (text: string) => {
    if (!text) return [];
    // Split by newlines and remove leading numbers "1. "
    return text.split('\n').filter(g => g.trim().length > 0).map(g => g.replace(/^\d+\.\s*/, ''));
  };

  const goalsList = parseGoals(student.metas.curtoPrazo);

  const moods = [
    { id: 1, icon: '😎', label: 'Excelente' },
    { id: 2, icon: '😊', label: 'Calmo' },
    { id: 3, icon: '😐', label: 'Disperso' },
    { id: 4, icon: '😠', label: 'Agitado' },
    { id: 5, icon: '😭', label: 'Disfórico' },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Sticky Header with Timer */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/acompanhamento" className={styles.backBtn}>
            <ArrowLeft size={16} /> Voltar
          </Link>
          <h1 className={styles.title}>{student.studentName}</h1>
          <div className={styles.subtitle}>{student.classRoom} • Sessão de Acompanhamento</div>
        </div>
        
        <div className={styles.headerRight}>
          <Clock size={20} />
          {formatTime(elapsedTime)}
        </div>
      </header>

      {/* Thermometer */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Smile size={20} color="var(--accent-primary)" /> Estado de Carga (Humor Inicial)
        </h2>
        <div className={styles.moodList}>
          {moods.map((m) => (
            <button
              key={m.id}
              className={`${styles.moodBtn} ${mood === m.id ? styles.active : ''}`}
              onClick={() => setMood(m.id)}
            >
              <span className={styles.moodIcon}>{m.icon}</span>
              <span className={styles.moodLabel}>{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PEI Goals (Checklist) */}
      {goalsList.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Target size={20} color="var(--accent-success)" /> Metas do Dia (PEI)
          </h2>
          <div className={styles.goalList}>
            {goalsList.map((goalText, index) => {
              const isChecked = completedGoals.includes(index);
              return (
                <label key={index} className={`${styles.goalItem} ${isChecked ? styles.completed : ''}`}>
                  <input 
                    type="checkbox" 
                    className={styles.goalCheckbox}
                    checked={isChecked}
                    onChange={() => toggleGoal(index)}
                  />
                  <span className={styles.goalText}>{goalText}</span>
                </label>
              );
            })}
          </div>
        </section>
      )}

      {/* Trackers / Clickers */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <AlertCircle size={20} color="var(--accent-warning)" /> Resumo Tático
        </h2>
        <div className={styles.trackersGrid}>
          {/* Suporte na Tarefa Escrita */}
          <ClickerTracker 
            title="Nível de Mediação p/ Atividade Foco" 
            type="scale" 
          />
          {/* Suporte na Interação Social */}
          <ClickerTracker 
            title="Mediação em Interação com Pares" 
            type="scale" 
          />
          {/* Saídas da Sala */}
          <ClickerTracker 
            title="Quantas vezes se desorganizou? (Necessitou pausa)" 
            type="counter" 
          />
        </div>
      </section>

      {/* Qualitative Notes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <CheckCircle size={20} color="var(--text-tertiary)" /> Ocorrências Qualitativas
        </h2>
        <textarea 
          className={styles.textarea} 
          placeholder="Toque aqui para digitar observações sobre o dia do aluno..."
        />
        
        <div className={styles.saveArea}>
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            leftIcon={<Save size={20} />}
            onClick={() => {
              alert('Acompanhamento salvo com sucesso!');
              router.push('/acompanhamento');
            }}
          >
            Finalizar Acompanhamento
          </Button>
        </div>
      </section>
    </div>
  );
}
