# Dev Vault

Projeto frontend com React Router v7 (SSR), TypeScript, CSS Modules e Tailwind.

## Stack

- **React 19** + **React Router v7** (server-side rendering)
- **TypeScript**
- **CSS Modules** + tokens globais + Tailwind CSS
- **React Hook Form** + **Zod** (formulários e validação)
- **Lucide React** (ícones)

## Pré-requisitos

- **Node.js 18+** (recomendado: LTS)
- **PNPM**

Instalar PNPM globalmente:

```bash
npm install -g pnpm
```

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
| `pnpm start` | Executar build de produção |
| `pnpm typecheck` | Verificar tipos    |
| `pnpm lint` | Linter                   |
| `pnpm lint:fix` | Linter + auto-fix   |
| `pnpm format` | Formatar código     |
| `pnpm format:check` | Validar formatação |

## Estrutura principal

```text
app/
├─ routes/          # rotas e composição de páginas
├─ modules/         # módulos de domínio (home, login, etc.)
├─ components/ui/   # componentes reutilizáveis de UI
├─ lib/             # utilitários
└─ styles/          # tokens e estilos globais
```

## Estado atual

- Autenticação em modo de esboço (sem backend real).
- Painel administrativo implementado como layout base (estrutura visual).

## Documentação

Toda a documentação para desenvolvedores está em **[docs/](docs/)**:

- [Arquitetura do projeto](docs/architecture.md) – mapa de pastas e fluxo
- [React Router v7](docs/react-router.md) – como usamos loaders, actions, etc.
- [Playbook](docs/playbook.md) – receitas passo a passo para tarefas comuns
- [Convenções](docs/conventions.md) – referência rápida de padrões

## Troubleshooting (Windows)

### `npm install` falha com `Cannot read properties of null (reading 'matches')`

Este projeto usa `pnpm-lock.yaml`, então prefira PNPM.

### `pnpm` não reconhecido ou erro `EPERM` no corepack

Sem permissões de administrador, rode:

```bash
npx --yes pnpm@latest install
```

Para adicionar dependências:

```bash
npx --yes pnpm@latest add <pacote>
```
