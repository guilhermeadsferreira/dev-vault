# Dev Vault

Projeto frontend com React Router v7 (SSR), TypeScript, CSS Modules e Tailwind.

## Stack

- **React 19** + **React Router v7** (server-side rendering)
- **TypeScript**
- **CSS Modules** + tokens globais + Tailwind CSS
- **React Hook Form** + **Zod** (formulários e validação)

## Como rodar

```bash
pnpm install
pnpm dev
```

App em `http://localhost:5173`.

## Scripts

| Script       | Descrição                |
| ----------- | ------------------------ |
| `pnpm dev`  | Servidor de desenvolvimento |
| `pnpm build`| Build de produção        |
| `pnpm typecheck` | Verificar tipos    |
| `pnpm lint` | Linter                   |
| `pnpm lint:fix` | Linter + auto-fix   |
| `pnpm format` | Formatar código     |

## Documentação

Toda a documentação para desenvolvedores está em **[docs/](docs/)**:

- [Arquitetura do projeto](docs/architecture.md) – mapa de pastas e fluxo
- [React Router v7](docs/react-router.md) – como usamos loaders, actions, etc.
- [Playbook](docs/playbook.md) – receitas passo a passo para tarefas comuns
- [Convenções](docs/conventions.md) – referência rápida de padrões
