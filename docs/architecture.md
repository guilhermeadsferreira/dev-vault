# Arquitetura do Projeto

> [README](../README.md) · [React Router](react-router.md) · [Playbook](playbook.md) · [Convenções](conventions.md)

## Visão geral

O projeto segue uma estrutura em camadas: **rotas** conectam URLs a **módulos** e **componentes**, que usam **lib** para utilitários.

## Mapa de pastas

```
app/
├── components/ui/     # Componentes UI reutilizáveis (Button, Card, Form, etc.)
├── lib/              # Utilitários genéricos (session.server.ts, utils.ts)
├── modules/          # Domínio por feature (home, login)
├── routes/           # Arquivos de rota (uma URL = um arquivo)
├── styles/           # Tokens globais, reset, app.css
├── root.tsx          # Layout HTML base e ErrorBoundary
└── routes.ts         # Registro de todas as rotas
```

## As 4 camadas

| Camada | Onde | Responsabilidade |
| ------ | ---- | ----------------- |
| **Rotas** | `app/routes/` | Conectar URL → loader/action → componente. Só "cola". |
| **Módulos** | `app/modules/` | Lógica de negócio, componentes específicos da feature. |
| **Componentes** | `app/components/ui/` | UI reutilizável, "burra". Button, Card, Form, etc. |
| **Lib** | `app/lib/` | Funções genéricas, fetch, helpers. |

## Regra de ouro: direção das dependências

```
routes/ ──importa──► modules/
routes/ ──importa──► components/ui/
modules/ ──importa──► components/
modules/ ──importa──► lib/
routes/ ──importa──► lib/
```

**Módulos NUNCA importam de routes.** Isso evita acoplamento. Rotas importam módulos e componentes; módulos importam componentes e lib.

## Fluxo de uma requisição

```
Browser ──► Route ──► Loader (getAuth, fetch...) ──► dados
                                                      │
Route ◄───────────────────────────────────────────────┘
  │
  └──► Component (useLoaderData) ──► HTML ──► Browser
```

1. Usuário acessa URL → React Router encontra o arquivo da rota.
2. **Loader** roda no servidor e busca dados (ex: sessão, API).
3. O componente renderiza com `useLoaderData()`.
4. Em formulários, **action** processa o POST e retorna redirect ou dados.

## Exemplo real: rota index

O arquivo `app/routes/_index.tsx`:

- **loader**: lê `getAuth(cookie)` e retorna `{ isAuthenticated }`.
- **action**: trata login (valida com Zod) e logout; redireciona ou define cookie.
- **componente**: se autenticado → `<HomePage />`, senão → `<LoginForm />`.

Os módulos `modules/home/` e `modules/login/` não sabem nada de rotas. A rota só importa e compõe.
