# EduCare (Agregado ao Projeto Mídia 'Bloomy')
**Plataforma Integrada de Saúde Mental, Inclusão Educacional e Gestão de PEI**

Este projeto é um MVP funcional em formato de SaaS multi-tenancy para acompanhamento pedagógico integrado ao desenvolvimento neuroatípico, estruturando as documentações legais de Educação Especial.

---

## 🚀 Arquitetura e Engenharia:
- **Framework Otimizado:** Construído e estabilizado em Next.js (App Router, *Server e Client Components misturados para SEO e reatividade*).
- **TypeScript & CSS Modules:** Estilização purista focada em performance; sem bibliotecas pesadas de terceiros (como Material UI ou Bootstrap). Toda hierarquia é modular `(.module.css)`.
- **Tema Híbrido & Acessibilidade:** Um Design System Light-Premium (Tons "EduCare"), estruturado centralmente em `globals.css` que inclui conversão bruta por CSS Data-Theme para **Alto Contraste Visual**, protegendo usuários com discromatopsia (Daltônicos e portadores de baixa visão).

## 🛡️ Gestão de Permissões (Role-Based Access Control - RBAC)
O Sistema garante Governança Clínica e Educacional aderente às diretrizes brasileiras de dados (LGPD):
1. **Super Admin**: Domina as licenças SaaS de software e cadastra Escolas/Tenants (`/escolas`, `/planos`).
2. **Diretor(a)**: Mantém o ambiente escolar, cadastra novas matrículas de alunos (`/alunos`) e cria a malha de Classes/Turmas (`/turmas`).
3. **Coordenador(a) Pedagógico**: Lê todos os PEIs ativos, assina validações e exporta relatórios gerais (`/relatorios`).
4. **Professor(a) AEE**: Proprietário legal e escritor das minutas clínicas dos alunos (PEIs). Puxa laudos, redaciona diretrizes e avalia o desenvolvimento mensal.
5. **Professor(a) Regente**: Apenas Leitor. Utiliza-se das orientações contidas pela equipe AEE para aplicar na aula regular as adaptações curriculares, e usa as ferramentas como o *Gerador BNCC*.
6. **Professor(a) Reforço / Mediador**: Ator Tático. Detém as ferramentas de acompanhamento diário (`/acompanhamento`) focadas em UI *Mobile First*, onde alimentam índices como "Termômetro de Ansiedade" e Contadores de "Comportamento Estereotipado".
7. **Aluno(a)**: Consome atividades adaptadas e games baseados em seu quadro.

## 📦 Features Elaboradas até o Momento:

✅ **1. Motor PEI Interativo**
Página em Wizard Multifaixas (Abas) onde a gestão e escrita do Plano Educacional Individualizado foi abstraída de longos e enfadonhos PDFs para "Sprints de Saúde" rápidas e dinâmicas, com AutoSave dinâmico em tela separada (via Mock).

✅ **2. Clickers e Tracker de Metas (Mediadores)**
Na aba `Acompanhamento`, desenvolvemos a interface estritamente pautada na Rotina. Contadores de tela inteira (`+1` ou `-1`) que dispensam teclado, feitos pro celular do estagiário de pedagogia clicar livremente enquanto interage fisicamente com a criança neuroatípica.

✅ **3. Gerador Analítico Baseado na BNCC**
Emulada uma inteligência capaz de processar as necessidades cadastradas no PEI de um aluno e as cruzar contra as habilidades e exigências documentadas de competências da BNCC (Gov. BR), devolvendo ao professor uma "Cola de Mestre" com dicas de formatação, provas orais ou tempo estendido de avaliação.

✅ **4. Bloomy "Marketplace" de Atividades Inclusivas**
Hub comunitário onde o sistema exibe PDFs/Atividades com taggeamentos como `TEA` ou `Dislexia`. Aqui inserimos fortemente a **Gamificação Profissional**, ostentando Avatares/Conquistas na testa do autor da atividade validada para incentivar a comunidade Escolar/SaaS.

✅ **5. Padronização Global do Fluxo de Banco de Dados de "Turmas"**
Para evitar lixo relacional (Turmas digitadas livremente com nomes aleatórios quebrando cruzamentos SQL locais), passamos a restringir todo CRUD de aluno unicamente via Selects/Comboboxes populadas em listas reais no banco (`mockTurmas.ts`). 

---

### 💻 Como rodar e interagir
O banco roda através dos MockStates dentro da pasta `src/data/`.
1. Rode `npm run dev`.
2. Acesse `http://localhost:3000`.
3. Utilize a função revolucionária no cabeçalho: **"DEV ROLE SWITCHER"**. Com 1 único clique no icone de **Inseto (Bug)** lá em cima, você pode *se transformar em outro profissional* do RBAC na mesma hora! Brinque de ser "Administrador" e ter a liberdade da tela cheia, mude para "Regente" e veja o painel inteiro sumir da sua visão por privacidade, experimentando totalmente os muros protetivos que construímos!
