'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { mockMarketplaceItems } from '@/data/mockMarketplace';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import Select from '@/components/ui/Select/Select';
import { Search, Upload, Download, Heart, Layers, ArrowRight, X, Image as ImageIcon } from 'lucide-react';
import styles from './marketplace.module.css';

const FILTER_TAGS = ['Todos', 'TEA', 'TDAH', 'Dislexia', 'Visual', 'Comunicação Alternativa'];

export default function MarketplacePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'likes'>('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = mockMarketplaceItems.filter((item) => {
    // Filter by Tag
    if (activeFilter !== 'Todos' && !item.tags.includes(activeFilter)) {
      return false;
    }
    // Filter by Search
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) && !item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    return 0; // keeps original chronological order
  });

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1><Layers size={28} color="var(--accent-primary)" /> Materiais e Rede</h1>
          <p>Acesse rotinas visuais, apostilas adaptadas e jogos submetidos pela rede. O poder da inteligência coletiva a favor da Inclusão.</p>
        </div>
        <Button 
          variant="primary" 
          leftIcon={<Upload size={16} />} 
          onClick={() => setIsModalOpen(true)}
        >
          Enviar Material
        </Button>
      </header>

      {/* Global Search */}
      <div className={styles.searchArea}>
        <div className={styles.searchBox}>
          <Search size={20} color="var(--text-tertiary)" />
          <input 
            type="text" 
            placeholder="Buscar por títulos, autores, matérias..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tags Filter */}
      <div className={styles.filtersRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span className={styles.filterLabel}>Filtrar por:</span>
          {FILTER_TAGS.map(tag => (
            <button
              key={tag}
              className={`${styles.pill} ${activeFilter === tag ? styles.active : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <span className={styles.filterLabel}>Ordenar:</span>
           <div style={{ width: '180px' }}>
             <Select fullWidth value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
               <option value="recent">Mais Recentes</option>
               <option value="likes">Mais Relevantes</option>
             </Select>
           </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className={styles.grid}>
        {filteredItems.map(item => (
          <Card
            key={item.id}
            title={item.authorName}
            subtitle={item.schoolName}
            avatarText={item.authorAvatar}
            avatarColor="var(--surface-secondary)"
            content={
              <div className={styles.cardInner}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{item.title}</div>
                
                <div className={styles.tagList}>
                  <span className={styles.tag} style={{ background: 'var(--surface-secondary)', color: 'var(--text-secondary)' }}>
                    {item.level}
                  </span>
                  {item.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.description}>{item.description}</div>

                <div className={styles.metrics}>
                  <div className={styles.metricItem}>
                    <Download size={14} /> {item.downloads} downloads
                  </div>
                  <div className={styles.metricItem}>
                    <Heart size={14} /> {item.likes} likes
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    {item.fileType.toUpperCase()}
                  </div>
                </div>
              </div>
            }
            footer={
              <Button variant="outline" fullWidth rightIcon={<ArrowRight size={16} />}>
                Baixar Material
              </Button>
            }
            onClick={() => {}} /* Could open a preview modal */
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' }}>
          <Layers size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          Nenhum material adaptado encontrado para esse filtro.
        </div>
      )}

      {/* Upload Modal Overlay */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>
            <h2 className={styles.modalTitle}>Compartilhar Recurso</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              Ajude a comunidade compartilhando o que deu certo com seus alunos.
            </p>

            <div className={styles.modalFormGroup}>
              <label className={styles.modalLabel}>Título da Atividade</label>
              <input type="text" className={styles.modalInput} placeholder="Ex: Dominó de Sinais em Libras" />
            </div>

            <div className={styles.modalFormGroup} style={{ flexDirection: 'row', gap: 'var(--space-md)' }}>
              <div style={{ flex: 1 }}>
                <label className={styles.modalLabel}>Público Alvo (Nível)</label>
                <Select fullWidth>
                  <option>Educação Infantil</option>
                  <option>Ensino Fundamental I</option>
                  <option>Ensino Fundamental II</option>
                  <option>Ensino Médio</option>
                </Select>
              </div>
              <div style={{ flex: 1 }}>
                <label className={styles.modalLabel}>Foco (Neurodivergência)</label>
                <Select fullWidth>
                  <option>TEA (Autismo)</option>
                  <option>TDAH</option>
                  <option>Dislexia</option>
                  <option>Deficiência Visual</option>
                  <option>Surdez / Libras</option>
                </Select>
              </div>
            </div>

            <div className={styles.fileDropArea}>
              <ImageIcon size={48} style={{ margin: '0 auto var(--space-sm)' }} />
              <p>Clique ou arraste o arquivo PDF/Doc aqui.</p>
              <span style={{ fontSize: '12px' }}>Max 10MB</span>
            </div>

            <div className={styles.modalActions}>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" onClick={() => {
                alert('Material enviado com sucesso!'); 
                setIsModalOpen(false);
              }}>
                Publicar no Marketplace
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
