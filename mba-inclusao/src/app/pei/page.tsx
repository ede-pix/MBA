'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { mockPeis } from '@/data/mockPei';
import { Search, Plus, Filter, FileText, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import styles from './pei-list.module.css';

export default function PeiListPage() {
  const { user, isRole } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering based on role for realism
  const filteredPeis = mockPeis.filter((pei) => {
    // If Regente, they would only see Active or Completed ones usually
    if (isRole('professor_regente') && (pei.status === 'draft' || pei.status === 'review')) return false;
    
    // Search filter
    if (searchTerm && !pei.studentName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  const handleOpenPei = (id: string) => {
    router.push(`/pei/${id}`);
  };

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

  const pendingApproval = mockPeis.filter(p => p.status === 'review').length;
  const needActionMsg = isRole('coordenador') 
    ? `${pendingApproval} PEIs aguardam sua aprovação.` 
    : 'Acompanhe a documentação de inclusão.';

  const canCreate = isRole('professor_aee');

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Planos Educacionais Individualizados</h1>
          <p>{needActionMsg}</p>
        </div>
        
        <div className={styles.actions}>
          {canCreate && (
            <Button leftIcon={<Plus size={16} />} onClick={() => router.push('/pei/novo')}>
              Novo PEI
            </Button>
          )}
        </div>
      </header>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Total de PEIs</span>
          <span className={styles.metricValue}>{mockPeis.length}</span>
        </div>
        {isRole('coordenador') && (
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Aguardando Aprovação</span>
            <span className={styles.metricValue} style={{ color: 'var(--accent-warning)' }}>{pendingApproval}</span>
          </div>
        )}
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={16} color="var(--text-tertiary)" />
            <input 
              type="text" 
              placeholder="Buscar aluno..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="sm" leftIcon={<Filter size={14} />}>
            Filtrar
          </Button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Diagnósticos</th>
              <th>Última Atualização</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeis.map((pei) => (
              <tr key={pei.id} className={styles.tableRow}>
                <td className={styles.studentCell}>
                  <span className={styles.studentName}>{pei.studentName}</span>
                  <span className={styles.studentId}>{pei.studentId}</span>
                </td>
                <td>{pei.classRoom}</td>
                <td>
                  <div className={styles.diagList}>
                    {pei.diagnostics.map((d, i) => (
                      <span key={i} className={styles.diagItem}>{d}</span>
                    ))}
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{pei.lastUpdated}</td>
                <td>
                  <Badge status={pei.status as any}>
                    {getStatusLabel(pei.status)}
                  </Badge>
                </td>
                <td className={styles.actionCell}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenPei(pei.id)}
                  >
                    {isRole('professor_regente') ? 'Visualizar' : 'Detalhes'}
                  </Button>
                </td>
              </tr>
            ))}
            {filteredPeis.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)' }}>
                  Nenhum PEI encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
