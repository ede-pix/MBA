import React from 'react';
import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '@/utils/markdownParser';

export default function DocumentacaoPage() {
  const filePath = path.join(process.cwd(), 'README.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Projeto & Documentação Técnica</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Visão transparente da arquitetura e decisões de negócio do SaaS Bloomy.</p>
      </header>

      <div 
        style={{ 
          background: 'var(--bg-card)', 
          padding: '32px 40px', 
          borderRadius: '16px', 
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-lg)'
        }}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(fileContent) }}
      />
    </div>
  );
}
