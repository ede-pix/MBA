'use client';

import { BookOpen } from 'lucide-react';
import PageStub from '@/components/ui/PageStub/PageStub';

export default function AtividadesPage() {
  return (
    <PageStub
      title="Minhas Atividades"
      description="Visualize e responda às atividades adaptadas criadas pelos seus professores. Foque no aprendizado!"
      icon={<BookOpen size={36} />}
      iconColor="#a29bfe"
    />
  );
}
