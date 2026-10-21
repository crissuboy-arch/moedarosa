# Moeda Rosa Global

PWA de comunidade para mulheres adultas, com Next.js App Router, TypeScript strict e Supabase. Identidade rosa metálica, lótus, rosé gold e grafite. A moeda é simbólica, sem função financeira.

## Executar

Node.js 22+.

```bash
npm ci
cp .env.example .env.local
# Preencher URL e chave publishable do Supabase, e a URL pública.
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

Nunca colocar uma secret/service role key em variável NEXT_PUBLIC_. `.env.local` é ignorado pelo Git.

## Implementado

- Landing responsiva, cadastro, login, recuperação, redefinição e callback PKCE.
- Perfil, foto privada por URL assinada, país/idioma, consentimento de IA e pedidos de dados.
- Feed, comentários, reações e remoção de publicações próprias.
- Pedidos de amizade, aceite, recusa e conversas somente após amizade aceita.
- Mensagens privadas com Supabase Realtime; políticas aplicadas também a leituras.
- Grupos com restrição de plano no banco, adesão e publicações.
- Business: perfil profissional, contato externo e catálogo, restritos a Business ativo.
- Bloqueio bidirecional, denúncias, painel administrativo de leitura com papel protegido.
- Planos Free / Global US$2.99 / Pro US$5.99 / Business US$19.90.
- Checkout/portal/webhook Stripe preparados; evento idempotente e atualização transacional.
- PWA, ícones, manifest e fallback offline sem cache de dados privados.
- Recursos oficiais de apoio em Portugal e Brasil, com origem e data de verificação.
- 26 tabelas com RLS, 51 políticas públicas, políticas de Storage e tipos gerados do banco.

## Integrações reais e limites

O Supabase `tovxkcrigxnsyrkcjevr` recebeu as migrations. GitHub: `crissuboy-arch/moedarosa`.

Stripe NÃO está ativo: falta conta/chaves/preços e validação completa com eventos de teste. Nenhuma cobrança real foi iniciada. O código bloqueia checkout sem configuração.

IA NÃO está ativa: a rota verifica autenticação, consentimento e plano e retorna indisponibilidade explícita. Ainda faltam o fornecedor, execução, quotas atômicas, cache e controle de custos; não há chamadas externas simuladas como reais.

O painel admin é de leitura nesta etapa. Atribuir administradora exige confirmar o UUID de uma utilizadora real e uma operação segura no banco; nenhuma conta recebeu esse papel automaticamente.

Exportação/eliminação são pedidos registrados; o processamento administrativo ainda precisa ser implementado. Não há push, SOS automatizado, carteira, checkout de produtos, identidade verificada ou criptografia ponta a ponta.

Interface inicial em português; preferência de idioma é persistida, mas a localização completa da interface é pendente. Biblioteca de cursos, eventos e estatísticas avançadas aguardam implementação/conteúdo. Não se apresenta material vazio como curso entregue.

## Deploy Vercel

1. Importar o repositório e selecionar a branch aprovada.
2. Framework Next.js; `npm ci`, `npm run build`.
3. Configurar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL` com o domínio final.
4. No Supabase Auth, configurar Site URL e autorizar `https://DOMINIO/auth/callback` e `https://DOMINIO/auth/callback?next=/redefinir` nos redirects. Validar confirmação de email, recuperação e SMTP antes do lançamento.
5. Para cobrança em TESTE, preencher as chaves Stripe test, preços recorrentes USD e a secret key do Supabase no servidor. Registrar webhook `/api/billing/webhook` para eventos `customer.subscription.created`, `.updated`, `.deleted`. Configurar portal Stripe para troca/cancelamento.
6. Executar smoke de cadastro, login, recuperação, dois usuários, bloqueio, pagamento e cancelamento. Não liberar cobrança real antes disso.

Nenhum deploy público foi realizado por esta entrega; apenas preparação e verificação local.

## Testes

`tests/permissions.test.ts`: limites comerciais e redirecionamentos seguros.

`tests/rls.sql`: testes transacionais com fixtures revertidas por ROLLBACK. Verifica criação de perfil, isolamento de assinatura, impedimento de escalada de plano/admin, restrições Business/Pro, conversas entre desconhecidas, aceite de amizade, leitura dos participantes, isolamento de terceiros e bloqueio bidirecional.

O relatório e o checkpoint estão em `docs/DELIVERY.md`. Documentos de privacidade e termos no app são rascunhos, não revisão jurídica.
