# React Router v7 — Como usamos no projeto

> [README](../README.md) · [Arquitetura](architecture.md) · [Playbook](playbook.md) · [Convenções](conventions.md)

Guia prático de como o React Router v7 funciona **neste projeto**. Cada conceito com exemplo real.

## Registro de rotas

Rotas são definidas em `app/routes.ts`:

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),       // /
  route("login", "routes/login.tsx"), // /login
  route("ui-kit-docs", "routes/ui-kit-docs.tsx"),
] satisfies RouteConfig;
```

- `index()` = rota raiz (`/`).
- `route("slug", "arquivo")` = rota em `/slug`.

## Anatomia de um arquivo de rota

Um arquivo em `app/routes/` pode exportar:

| Export | O que faz |
| ------ | --------- |
| `default` | Componente da página (obrigatório) |
| `meta` | Título, description (SEO) |
| `loader` | Busca dados no servidor antes de renderizar |
| `action` | Processa formulários e mutações (POST) |
| `ErrorBoundary` | Trata erros da rota |

Exemplo mínimo:

```tsx
export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function Login() {
  return <div>...</div>;
}
```

## Loader: buscar dados no servidor

O **loader** roda no servidor antes de renderizar. Use para: sessão, APIs, dados iniciais.

Exemplo real de `_index.tsx`:

```tsx
export async function loader({ request }: { request: Request }) {
  const auth = await getAuth(request.headers.get("Cookie"));
  return { isAuthenticated: "loggedIn" in auth };
}
```

No componente:

```tsx
const { isAuthenticated } = useLoaderData<typeof loader>();
```

A tipagem `typeof loader` vem automaticamente do loader. Nunca faça `fetch` dentro do componente se já existe loader para aqueles dados.

## Action: processar formulários e mutações

A **action** recebe POSTs (formulários, `fetcher.submit()`). Use para login, cadastro, deletar, etc.

Exemplo real de `_index.tsx`:

```tsx
export async function action({ request }: { request: Request }) {
  if (request.method !== "POST") return null;

  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "logout") {
    return redirect("/", {
      headers: { "Set-Cookie": await clearAuth() },
    });
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const result = loginSchema.safeParse({ email, password });

  if (!result.success) return { error: "Dados inválidos" };

  return redirect("/", {
    headers: { "Set-Cookie": await serializeAuth({ loggedIn: true }) },
  });
}
```

Para submeter sem navegar (ex: formulário inline):

```tsx
const fetcher = useFetcher();

fetcher.submit(
  { email: data.email, password: data.password },
  { method: "post", action: "/?index" }
);
```

`action: "/?index"` envia para a action da rota index.

## Arquivos `.server.ts`

Arquivos que terminam em `.server.ts` (ex: `session.server.ts`) rodam **apenas no servidor**. Não vão para o bundle do cliente. Use para:

- Cookies, sessão
- Chamadas a APIs secretas
- Banco de dados

O `session.server.ts` usa `createCookie` do React Router e funções como `getAuth`, `serializeAuth`, `clearAuth`.

## Tipagem automática

React Router gera tipos em `.react-router/types/`. Use `Route.X` para props tipadas:

```tsx
import type { Route } from "./+types/_index";

export function meta(): Route.MetaFunction {
  return [{ title: "Dev Vault" }];
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // error já tipado
}
```

## ErrorBoundary

O `root.tsx` define um ErrorBoundary global. Cada rota pode ter o seu. O global trata 404 e erros genéricos:

```tsx
if (isRouteErrorResponse(error)) {
  message = error.status === 404 ? "404" : "Error";
  details = error.status === 404
    ? "The requested page could not be found."
    : error.statusText || details;
}
```

## Resumo rápido

| Conceito | Onde usar |
| -------- | --------- |
| loader | Dados que vêm do servidor antes de renderizar |
| action | Formulários, logout, mutações |
| useLoaderData | Acessar dados do loader no componente |
| useFetcher | Submeter formulário sem navegar |
| redirect | Voltar da action com nova URL |
| .server.ts | Código que só roda no servidor |

**Erro comum:** fazer `fetch` dentro do componente quando já existe loader. Prefira sempre o loader.

## Referência oficial

- [React Router v7 — Documentação](https://reactrouter.com/)
