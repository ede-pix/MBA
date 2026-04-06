'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FileBadge, Plus, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';

export default function LaudosPage() {
  const { user } = useAuth();
  const canUpload = ['professor_aee', 'coordenador', 'diretor'].includes(user.role);

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2xl)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>Laudos Clínicos e Documentação</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Repositório visual e legal de exames Neurologistas e Fonoaudiólogos.</p>
        </div>
        {canUpload && (
          <Button variant="primary" leftIcon={<Plus size={16}/>}>Novo Documento</Button>
        )}
      </header>

      <div style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        <Card 
          title="Matheus Almeida"
          subtitle="Laudo TEA (Dr. Augusto CID-10 F84.0)"
          avatarText="MA"
          avatarColor="var(--accent-info)"
          content={
            <div style={{ padding: 'var(--space-xl)', background: 'var(--bg-secondary)', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <FileBadge size={48} color="var(--text-tertiary)" style={{ margin: '0 auto var(--space-sm)' }}/>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>PDF Assinado Digitalmente</div>
            </div>
          }
          footer={<Button variant="outline" fullWidth>Ver Original</Button>}
        />
        <Card 
          title="Mariana Souza"
          subtitle="Avaliação Fonoaudiologia"
          avatarText="MS"
          avatarColor="var(--accent-tertiary)"
          content={
            <div style={{ padding: 'var(--space-xl)', background: 'var(--bg-secondary)', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
               <FileBadge size={48} color="var(--text-tertiary)" style={{ margin: '0 auto var(--space-sm)' }}/>
               <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>2 Imagens JPEG</div>
            </div>
          }
          footer={<Button variant="outline" fullWidth>Ver Original</Button>}
        />
        <Card 
          title="Carlos Silva"
          subtitle="Sem laudo até o momento"
          avatarText="CS"
          avatarColor="var(--surface-border-strong)"
          content={
            <div style={{ display: 'flex', gap: 'var(--space-sm)', color: 'var(--accent-warning)', padding: 'var(--space-md) 0' }}>
               <AlertCircle size={24}/> Em investigação clínica com pais.
            </div>
          }
          footer={<Button variant="ghost" fullWidth disabled>Ver Original</Button>}
        />
      </div>
    </div>
  );
}
