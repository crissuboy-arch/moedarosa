# Arquitetura

Next.js App Router renderiza páginas institucionais e protege o layout da comunidade com `auth.getUser()`. O proxy renova cookies. Clientes browser/server compartilham tipos gerados do banco.

A interface usa a chave publishable. Autorização de dados pertence ao PostgreSQL RLS, independentemente de botões ou URLs. Credenciais privilegiadas são usadas somente no servidor para eventos de cobrança assinados.

`private` contém helpers de autorização sem acesso anônimo; funções SECURITY DEFINER têm search_path vazio, permissões explícitas e verificação de auth.uid, exceto triggers internos que não são executáveis pelo cliente. A RPC de cobrança é SECURITY INVOKER e só service_role recebe EXECUTE.

Mensagens usam duas participantes por conversa. Isso evita uma tabela de membros mutável pelo cliente, reduzindo a superfície para inclusão de intrusas. Criação requer amizade aceita; bloqueio em qualquer sentido encerra leitura e envio. RLS restringe Realtime.

Planos em subscriptions são somente leitura para a cliente. O webhook consulta o estado Stripe atual, valida preço conhecido, identifica a conta por metadata da assinatura e aplica evento de forma transacional/idempotente. Status ativo exige data futura. O retorno do checkout nunca concede acesso.

Storage privado de avatares aceita JPEG/PNG/WebP até 5 MB. Os paths começam pelo UUID proprietário. URLs assinadas expiram em 1 hora. Links já emitidos podem continuar válidos até expirar; revogação imediata de URLs assinadas não está implementada.

O service worker intercepta navegação somente para fallback em falha de rede e NÃO grava respostas de páginas autenticadas, APIs ou mensagens.

Limitações: descoberta de perfis tem paginação inicial de 100, feed 50, mensagens 200. Paginação completa, busca indexada, moderação operacional, processamento de direitos e antifraude avançado são próximos incrementos. Rate limiting atual cobre posts e mensagens por minuto.
