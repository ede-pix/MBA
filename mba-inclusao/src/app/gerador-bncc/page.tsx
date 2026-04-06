'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockPeis } from '@/data/mockPei';
import Button from '@/components/ui/Button/Button';
import Select from '@/components/ui/Select/Select';
import { Sparkles, Save, Download, BookOpen, Layers, Target, AlertCircle } from 'lucide-react';
import styles from './gerador.module.css';

export default function GeradorBNCCPage() {
  const { isRole } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [topic, setTopic] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const studentsWithPei = mockPeis.filter(p => p.status !== 'draft');

  const handleGenerate = () => {
    if (!selectedStudent || !selectedSubject || !topic) return;
    
    setIsGenerating(true);
    setResult(null);

    // Find student to fake a smart answer based on their PEI data
    const student = studentsWithPei.find(s => s.id === selectedStudent);
    
    // Fake Network Request Timeout - "AI Thinking"
    setTimeout(() => {
      setResult({
        studentName: student?.studentName,
        subject: selectedSubject,
        topic: topic,
        barriers: student?.habilidades.barreiras,
        materials: `Considerando o diagnóstico de ${student?.diagnostics.join(', ')}, recomendamos o uso de ${student?.adaptacoes.materiais.toLowerCase() || 'apoios visuais maiores'}. Fragmente o conteúdo '${topic}' em blocos de no máximo 10 minutos para evitar a sobrecarga sensorial relatada no documento.`,
        mediation: `Mantenha as instruções curtas. Segundo o PEI, o foco atual a médio prazo é: "${student?.metas.curtoPrazo.replace(/\n\d\.\s*/g, ' e ').substring(0, 80)}...". Valide a compreensão pedindo para que ele repita a orientação antes de iniciar.`,
        evaluation: `Não foque na quantidade de exercícios de ${selectedSubject}. Avalie se houve absorção do conceito usando recursos alternativos previstos no plano, como: ${student?.adaptacoes.avaliativas.toLowerCase() || 'respostas orais ou associação de imagens'}.`
      });
      setIsGenerating(false);
    }, 1800);
  };

  const isComplete = selectedStudent && selectedSubject && topic;

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Gerador de Plano de Aula Adaptado (BNCC)</h1>
        <p>A inteligência da plataforma cruza os objetivos descritos no PEI com a matéria lecionada, sugerindo estratégias ativas para o docente em sala.</p>
      </header>

      <div className={styles.layoutGrid}>
        
        {/* Left Column: Form Setup */}
        <aside className={styles.formPanel}>
          <div className={styles.formGroup}>
            <label className={styles.label}>1. Aluno Alvo (Base PEI)</label>
            <Select 
              value={selectedStudent} 
              onChange={(e) => setSelectedStudent(e.target.value)}
              fullWidth
            >
              <option value="" disabled>Selecione um aluno da turma</option>
              {studentsWithPei.map(s => (
                <option key={s.id} value={s.id}>{s.studentName} ({s.classRoom})</option>
              ))}
            </Select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>2. Componente Curricular</label>
            <Select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
              fullWidth
            >
              <option value="" disabled>Selecione a matéria</option>
              <option value="Língua Portuguesa">Língua Portuguesa</option>
              <option value="Matemática">Matemática</option>
              <option value="História">História</option>
              <option value="Geografia">Geografia</option>
              <option value="Ciências">Ciências / Natureza</option>
              <option value="Artes">Artes</option>
            </Select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>3. Habilidade/Tema da Aula</label>
            <textarea 
              className={styles.textarea} 
              placeholder="Descreva o que será ensinado. Ex: 'Frações Equivalentes e resolução de problemas básicos.' ou traga o código BNCC ex: 'EF03MA04'."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className={styles.submitArea}>
            <Button 
              variant="primary" 
              fullWidth 
              size="lg"
              leftIcon={<Sparkles size={18} />}
              onClick={handleGenerate}
              disabled={!isComplete || isGenerating}
            >
              {isGenerating ? 'Analisando perfil...' : 'Gerar Adaptação'}
            </Button>
          </div>
        </aside>

        {/* Right Column: Output / Assistant */}
        <main className={styles.resultPanel}>
          {/* Empty State */}
          {!isGenerating && !result && (
            <div className={styles.emptyState}>
              <Sparkles size={48} />
              <p>Preencha os dados e clique em "Gerar Adaptação" para receber <br/>guias práticos condicionados ao PEI do estudante.</p>
            </div>
          )}

          {/* Loading Skeleton */}
          {isGenerating && (
            <div className={styles.loadingState}>
              <div className={styles.skeletonTitle} />
              <br/>
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
              <br/>
              <div className={styles.skeletonTitle} style={{ width: '30%' }} />
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
            </div>
          )}

          {/* Actual Result */}
          {!isGenerating && result && (
            <div className={styles.resultContent}>
              <div className={styles.resultHeader}>
                <div className={styles.resultTitle}>
                  <Sparkles size={24} color="var(--accent-primary)" /> 
                  Adaptações Sugeridas
                </div>
                <div className={styles.resultActions}>
                  <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>PDF</Button>
                  <Button variant="secondary" size="sm" leftIcon={<Save size={14} />}>Salvar Modelo</Button>
                </div>
              </div>

              <div className={styles.suggestionBlock}>
                <div className={styles.suggestionTitle}>
                  <Layers size={18} color="var(--accent-primary)" /> Adaptação de Materiais
                </div>
                <div className={styles.suggestionText}>{result.materials}</div>
              </div>

              <div className={styles.suggestionBlock} style={{ borderLeftColor: 'var(--accent-warning)' }}>
                <div className={styles.suggestionTitle}>
                  <BookOpen size={18} color="var(--accent-warning)" /> Abordagem e Mediação
                </div>
                <div className={styles.suggestionText}>{result.mediation}</div>
              </div>

              <div className={styles.suggestionBlock} style={{ borderLeftColor: 'var(--accent-success)' }}>
                <div className={styles.suggestionTitle}>
                  <Target size={18} color="var(--accent-success)" /> Foco Avaliativo
                </div>
                <div className={styles.suggestionText}>{result.evaluation}</div>
              </div>
              
              <div style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', gap: '8px' }}>
                <AlertCircle size={14} />
                <span>Estas orientações foram cruzadas com as Barreiras e Metas aprovadas por {result.studentName} no PEI. Apenas o professor que conhece o dia-a-dia na turma dita a aplicação final do currículo adaptado.</span>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
