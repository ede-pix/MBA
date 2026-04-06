'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { mockPeis } from '@/data/mockPei';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import Tabs, { TabType } from '@/components/ui/Tabs/Tabs';
import { ArrowLeft, Brain, Target, Shield, Stethoscope, Lock, CheckCircle2, Save, History, Laptop } from 'lucide-react';
import styles from './pei-details.module.css';

export default function PeiDetailsPage() {
  const { user, isRole } = useAuth();
  const router = useRouter();
  const params = useParams();
  
  // Find PEI
  const [peiData, setPeiData] = useState(mockPeis.find(p => p.id === params.id));
  
  if (!peiData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>PEI não encontrado.</h2>
        <Link href="/pei">Voltar para listagem</Link>
      </div>
    );
  }

  // Access control
  const isReadOnly = isRole('professor_regente') || peiData.status === 'completed' || peiData.status === 'active';
  const canApprove = isRole('coordenador') && peiData.status === 'review';
  const canEdit = isRole('professor_aee') && (peiData.status === 'draft' || peiData.status === 'review');

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'draft': return 'Rascunho';
      case 'review': return 'Em Revisão';
      case 'approved': return 'Aprovado';
      case 'active': return 'Vigente';
      case 'completed': return 'Finalizado';
      default: return status;
    }
  };

  const handleApprove = () => {
    setPeiData({ ...peiData, status: 'active', lastUpdated: new Date().toLocaleDateString('pt-BR') });
  };

  const handleChangeForm = (section: string, field: string, value: string) => {
    // In a real app this would be a deep clone or managed by react-hook-form
    setPeiData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // TABS CONTENT REUSABLE MAKER
  const renderTabContent = (
    title: string, 
    icon: React.ReactNode, 
    sectionKey: string, 
    fields: { key: string, label: string }[]
  ) => (
    <div className={styles.formSection}>
      <h2>{icon} {title}</h2>
      {fields.map(field => (
        <div key={field.key} className={styles.formGroup}>
          <label className={styles.label}>{field.label}</label>
          <textarea 
            className={styles.textarea} 
            value={(peiData as any)[sectionKey][field.key]} 
            disabled={isReadOnly}
            onChange={(e) => handleChangeForm(sectionKey, field.key, e.target.value)}
            placeholder={isReadOnly ? "Nenhum dado informado." : `Preencha sobre: ${field.label.toLowerCase()}`}
          />
        </div>
      ))}
    </div>
  );

  const tabs: TabType[] = [
    {
      id: 'history',
      label: 'Histórico',
      content: renderTabContent(
        'Histórico Escolar e Familiar', 
        <History size={20} color="var(--accent-info)" />, 
        'historicoEscolar',
        [
          { key: 'trajetóriaPręvia', label: 'Trajetória Prévia (Retenções, transferências, adaptações anteriores)' },
          { key: 'interacoesSociais', label: 'Interações e Habilidades Sociais no Ecossistema Familiar' }
        ]
      )
    },
    {
      id: 'clinic',
      label: 'Saúde Clínica',
      content: renderTabContent(
        'Informações Clínicas e Terapêuticas', 
        <Stethoscope size={20} color="var(--accent-secondary)" />, 
        'identificacao',
        [
          { key: 'necessidadesMedicas', label: 'Necessidades Médicas (CIDs, Medicamentos, Restrições Motoras)' },
          { key: 'terapiasExtracurriculares', label: 'Terapias Extracurriculares Relatadas (Fono, T.O, Neuro)' }
        ]
      )
    },
    {
      id: 'skills',
      label: 'Habilidades',
      content: renderTabContent(
        'Observação Pedagógica Atual', 
        <Brain size={20} color="var(--accent-primary)" />, 
        'habilidades',
        [
          { key: 'potencialidades', label: 'Potencialidades Sensoriais (O que o aluno domina e demonstra interesse visceral)' },
          { key: 'barreiras', label: 'Barreiras de Aprendizagem (Desafios encontrados na rotina diária para alfabetização)' }
        ]
      )
    },
    {
      id: 'goals',
      label: 'Metas Estipuladas',
      content: renderTabContent(
        'Metas do Plano Educacional', 
        <Target size={20} color="var(--accent-success)" />, 
        'metas',
        [
          { key: 'curtoPrazo', label: 'Metas a Curto/Médio Prazo (Escopo Semestral)' },
          { key: 'longoPrazo', label: 'Metas a Longo Prazo (Escopo Anual Integrado à BNCC)' }
        ]
      )
    },
    {
      id: 'adaptations',
      label: 'Adaptações',
      content: renderTabContent(
        'Estratégias de Adaptação Necessárias', 
        <Shield size={20} color="var(--accent-warning)" />, 
        'adaptacoes',
        [
          { key: 'materiais', label: 'Adaptações de Material Curricular (Textos ampliados, redução de enunciados)' },
          { key: 'avaliativas', label: 'Adaptações Avaliativas (Métrica diferenciada, auxílio leitor, tempo estendido)' }
        ]
      )
    },
    {
      id: 'resources',
      label: 'Recursos',
      content: renderTabContent(
        'Recursos de Tecnologia Assistiva', 
        <Laptop size={20} color="var(--accent-tertiary)" />, 
        'recursosAssistivos',
        [
          { key: 'tecnologiaAssistiva', label: 'T.A. Aplicáveis (Pranchas PCS, softwares, leitores de tela, soroban)' },
          { key: 'mobiliario', label: 'Adaptações Espaciais/Mobiliário (Carteira inclinada, abafadores de ruído, quadro prox)' }
        ]
      )
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/pei" className={styles.backBtn}>
            <ArrowLeft size={16} /> Voltar para lista
          </Link>
          <div className={styles.titleRow}>
            <h1>{peiData.studentName}</h1>
            <Badge status={peiData.status as any}>{getStatusLabel(peiData.status)}</Badge>
          </div>
          <span className={styles.subtitle}>{peiData.classRoom} • {peiData.age} anos</span>
        </div>
        
        <div className={styles.headerActions}>
          {canEdit && (
            <Button variant="secondary" leftIcon={<Save size={16} />}>
              Salvar Rascunho
            </Button>
          )}
          {canApprove ? (
            <Button variant="primary" leftIcon={<CheckCircle2 size={16} />} onClick={handleApprove}>
              Aprovar PEI
            </Button>
          ) : canEdit && peiData.status === 'draft' ? (
            <Button variant="primary">
              Enviar para Revisão
            </Button>
          ) : null}
        </div>
      </header>

      {isReadOnly && (
        <div className={styles.readOnlyNotice}>
          <Lock size={20} color="var(--accent-info)" />
          <div>
            <strong>Modo de Leitura Ativo. </strong>
            Seu perfil pode apenas visualizar este documento para aplicação em sala, ou o documento já está finalizado.
          </div>
        </div>
      )}

      <div className={styles.layoutGrid}>
        <div className={styles.mainArea}>
          <Tabs tabs={tabs} />
        </div>
        
        <aside className={styles.infoPanel}>
          <div className={styles.infoSection}>
            <div className={styles.infoLabel}>ID do Aluno</div>
            <div className={styles.infoValue}>{peiData.studentId}</div>
          </div>
          
          <div className={styles.infoSection}>
            <div className={styles.infoLabel}>Diagnósticos (CID)</div>
            <div className={styles.infoValue}>
              {peiData.diagnostics.map(d => <div key={d}>• {d}</div>)}
            </div>
          </div>
          
          <div className={styles.infoSection}>
            <div className={styles.infoLabel}>Prof. Responsável (AEE)</div>
            <div className={styles.infoValue}>{peiData.aeeTeacher}</div>
          </div>
          
          <div className={styles.infoSection}>
            <div className={styles.infoLabel}>Última Atualização</div>
            <div className={styles.infoValue}>{peiData.lastUpdated}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
