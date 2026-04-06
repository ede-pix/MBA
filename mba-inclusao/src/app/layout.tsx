import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout/MainLayout';

export const metadata: Metadata = {
  title: 'Bloomy — Neurodivergência & Saúde Mental',
  description: 'Plataforma SaaS de gestão educacional focada em inclusão. Gerencie PEIs, laudos, acompanhamento diário e desenvolvimento adaptado da BNCC.',
  keywords: ['educação inclusiva', 'saúde mental', 'Bloomy', 'neurodivergencia', 'PEI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
