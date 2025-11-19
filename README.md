diff --git a/README.md b/README.md
index 9aa298b67ef0fe7c1378dc69c5cb5864c8876be5..c5f77167aedac009eba3daabb0b3ba9d03e0d873 100644
--- a/README.md
+++ b/README.md
@@ -1,3 +1,41 @@
-# Pet App
-# pet-app
-# pet-app
+# Super App Pet – MVP
+
+Estrutura inicial para o marketplace pet com backend Node/Prisma, painel web em React e app mobile (Expo) para o tutor.
+
+## Backend (Node + TypeScript + Prisma)
+
+- Código em `backend/`
+- Principais scripts: `npm run dev` (ts-node-dev), `npm run build`, `npm run prisma:migrate`
+- Configuração do banco via variável `DATABASE_URL` (PostgreSQL)
+- Prisma schema em `backend/prisma/schema.prisma` e SQL em `backend/prisma/migrations/000_init/migration.sql`
+
+### Endpoints resumidos
+- Autenticação: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/me`
+- Pets: CRUD em `/pets`
+- Parceiros: `/partners`
+- Produtos: `/products`
+- Serviços: `/services`
+- Pedidos: `/orders`
+- Agendamentos: `/appointments`
+- Avaliações: `/reviews`
+- Admin: `/admin/*`
+
+### Rodando localmente
+1. `cd backend`
+2. `npm install`
+3. Configure `.env` com `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`
+4. `npm run prisma:migrate` para criar o schema
+5. `npm run dev` para iniciar em `http://localhost:3000`
+
+## Web (React + Vite)
+- Código em `web/`
+- Scripts: `npm install`, `npm run dev`
+- Consome a API do backend para login, listagem de produtos, serviços e telas de admin/parceiro básicas.
+
+## Mobile (Expo + React Native)
+- Código em `mobile/`
+- Scripts: `npm install`, `npm run start`
+- Telas iniciais de login, home, listagem de produtos/serviços e atalhos de agendamento/checkout.
+
+## Coleção de chamadas
+- Exemplos de requisições no arquivo `backend/api.http` para uso com extensões REST Client ou Hoppscotch.
