# Convenções — Referência rápida

> [README](../README.md) · [Arquitetura](architecture.md) · [React Router](react-router.md) · [Playbook](playbook.md)

Consulta rápida de padrões do projeto.

## Nomenclatura

| Tipo | Padrão | Exemplo |
| ---- | ------ | ------- |
| Componentes (arquivo) | PascalCase | `LoginForm.tsx`, `Button.tsx` |
| Hooks | use + PascalCase | `useAuth.ts`, `useFormData.ts` |
| Utilitários (arquivo) | camelCase | `utils.ts`, `session.server.ts` |
| Classes CSS (modules) | camelCase | `.headerRow`, `.emptyState` |
| Rotas (arquivo) | kebab-case ou _ | `_index.tsx`, `login.tsx`, `ui-kit-docs.tsx` |

## Estrutura de pastas (resumo)

```
app/
├── components/ui/   → Um componente = uma pasta (Component.tsx + .module.css + index.ts)
├── lib/             → Utils genéricos; .server.ts = só servidor
├── modules/         → Um módulo = pasta com componentes, schema, types, hooks
├── routes/          → Um arquivo = uma rota
└── styles/          → tokens.css, globals.css, app.css
```

## Imports

Sempre use o alias `~/` = `app/`:

```ts
import { Button } from "~/components/ui/Button";
import { getAuth } from "~/lib/session.server";
import { HomePage } from "~/modules/home";
```

## CSS

- **Arquivos**: `Componente.module.css` ao lado do `.tsx`
- **Classes**: camelCase (`headerRow`, `cardGrid`)
- **Tokens**: `--space-*`, `--primary`, `--radius-*`, `--text-*` (ver `tokens.css`)
- **Blocos típicos**: `container`, `header`, `content`, `footer`, `row`, `column`, `title`, `subtitle`

## TypeScript

- Tipos do módulo em `modules/<m>/types.ts`
- Evitar `any`
- Usar `z.infer<typeof schema>` para tipos de formulário

## Ferramentas

| Comando | Uso |
| ------- | --- |
| `pnpm dev` | Desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm typecheck` | Verificar tipos |
| `pnpm lint` | Linter |
| `pnpm lint:fix` | Linter + correção automática |
| `pnpm format` | Formatar com Prettier |

## Faça

- Use **loader** para dados que vêm do servidor
- Use **action** para formulários e mutações
- Use **CSS Modules** para estilos
- Use **Zod** para validação de formulários
- Coloque lógica em **hooks** quando fizer sentido
- Use **tokens** de `tokens.css` em vez de valores fixos
- Siga a direção de dependências: routes → modules → components → lib

## Não faça

- **Fetch no componente** quando já existe loader
- **Inline styles** (`style={{ color: "red" }}`)
- **`!important`** em CSS
- **`any`** em TypeScript
- **Módulos importando de routes**
- **Abstrações prematuras** — só crie camadas quando houver repetição real
