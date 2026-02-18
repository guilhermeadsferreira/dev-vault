# Playbook — Receitas passo a passo

> [README](../README.md) · [Arquitetura](architecture.md) · [React Router](react-router.md) · [Convenções](conventions.md)

Receitas práticas para tarefas comuns. Abra este doc sempre que for implementar algo novo.

---

## Receita 1: Criar uma nova página/rota

### Passos

1. Criar arquivo em `app/routes/nome-da-rota.tsx`.

2. Registrar em `app/routes.ts`:
   ```ts
   route("nome-da-rota", "routes/nome-da-rota.tsx"),
   ```

3. Exportar pelo menos `default` (componente) e `meta`:
   ```tsx
   export function meta() {
     return [
       { title: "Título da Página" },
       { name: "description", content: "Descrição para SEO" },
     ];
   }

   export default function NomeDaRota() {
     return <main>...</main>;
   }
   ```

4. Se precisar de dados do servidor, adicionar `loader` e usar `useLoaderData` no componente.

5. Se for formulário ou mutação, adicionar `action`.

### Exemplo mínimo completo

```tsx
// app/routes/sobre.tsx
export function meta() {
  return [
    { title: "Sobre" },
    { name: "description", content: "Sobre o Dev Vault" },
  ];
}

export default function Sobre() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Sobre</h1>
      <p>Conteúdo da página.</p>
    </main>
  );
}
```

```ts
// app/routes.ts — adicionar
route("sobre", "routes/sobre.tsx"),
```

### Checklist

- [ ] Arquivo criado em `app/routes/`
- [ ] Rota registrada em `app/routes.ts`
- [ ] `meta` e `default` exportados
- [ ] URL acessível em `/nome-da-rota`

---

## Receita 2: Criar um componente UI reutilizável

### Passos

1. Criar pasta em `app/components/ui/NomeDoComponente/`.

2. Criar os arquivos:
   - `NomeDoComponente.tsx` — componente
   - `NomeDoComponente.module.css` — estilos
   - `index.ts` — barrel export

3. Usar CSS variables de `app/styles/tokens.css` para cores e espaçamento.

4. Exportar via barrel:
   ```ts
   // index.ts
   export { NomeDoComponente } from "./NomeDoComponente";
   ```

### Exemplo: estrutura do Button

```
app/components/ui/Button/
├── Button.tsx
├── Button.module.css
└── index.ts
```

**Button.module.css** — usar tokens:

```css
.button {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-md);
  border-radius: var(--radius-md);
  background-color: var(--primary);
  color: var(--primaryFg);
}
```

**Button.tsx** — importar estilos:

```tsx
import styles from "./Button.module.css";

export function Button({ children, className, ...props }) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
```

### Checklist

- [ ] Pasta em `components/ui/NomeDoComponente/`
- [ ] `Componente.tsx`, `Componente.module.css`, `index.ts`
- [ ] Tokens (`--space-*`, `--primary`, etc.) no CSS
- [ ] Nomes de classes em camelCase

---

## Receita 3: Criar um módulo de domínio

### Passos

1. Criar pasta `app/modules/nome-modulo/`.

2. Estrutura típica:
   - `NomeModuloPage.tsx` ou componente principal
   - `NomeModuloPage.module.css`
   - `schema.ts` (se tiver formulário com Zod)
   - `types.ts` (se tiver tipos específicos)
   - `hooks/useX.ts` (se tiver lógica extraível)
   - `index.ts` — barrel

3. **Regra**: módulos nunca importam de `app/routes/`.

### Exemplo: módulo login

```
app/modules/login/
├── LoginForm.tsx
├── LoginForm.module.css
├── schema.ts
└── index.ts
```

O `LoginForm` é usado pela rota `_index.tsx` e `login.tsx`. A rota passa `onSubmit` e o módulo não sabe nada de URLs.

### Checklist

- [ ] Pasta em `app/modules/nome-modulo/`
- [ ] Componente + CSS + index
- [ ] Schema Zod (se form) em `schema.ts`
- [ ] Nenhum import de `routes/`

---

## Receita 4: Adicionar um formulário com validação

### Passos

1. Criar schema Zod em `modules/nome/schema.ts`:
   ```ts
   import { z } from "zod";

   export const meuSchema = z.object({
     email: z.string().min(1, "Email obrigatório").email("Email inválido"),
     nome: z.string().min(2, "Mínimo 2 caracteres"),
   });

   export type MeuFormValues = z.infer<typeof meuSchema>;
   ```

2. No componente, usar `react-hook-form` + `zodResolver`:
   ```tsx
   import { useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";
   import { meuSchema, type MeuFormValues } from "./schema";
   import { FormField } from "~/components/ui/FormField";
   ```

   ```tsx
   const { control, handleSubmit } = useForm<MeuFormValues>({
     resolver: zodResolver(meuSchema),
     defaultValues: { email: "", nome: "" },
   });
   ```

3. Usar `FormField` para cada campo com label e validação:
   ```tsx
   <FormField control={control} name="email" label="Email" type="email" required />
   ```

4. Na rota, criar `action` que recebe `formData` e processa (ex: valida com o mesmo schema, redireciona ou retorna erro).

5. Para submeter sem recarregar a página:
   ```tsx
   const fetcher = useFetcher();
   fetcher.submit(dados, { method: "post", action: "/?index" });
   ```

### Exemplo real: LoginForm

O `modules/login/LoginForm.tsx` usa:
- `loginSchema` em `schema.ts`
- `FormField` para email e senha
- `onSubmit` callback — a rota passa uma função que chama `fetcher.submit()`.

### Checklist

- [ ] Schema Zod criado
- [ ] `useForm` com `zodResolver(schema)`
- [ ] `FormField` em cada campo
- [ ] Action na rota para processar server-side
- [ ] `fetcher.submit` ou `Form` com `action` para enviar

---

## Receita 5: Estilizar com CSS Modules

### Passos

1. Criar `Componente.module.css` na mesma pasta do componente.

2. Importar e usar:
   ```tsx
   import styles from "./Componente.module.css";

   <div className={styles.container}>...</div>
   ```

3. Usar tokens em vez de valores fixos:
   ```css
   .container {
     padding: var(--space-4);
     border-radius: var(--radius-md);
     background: var(--bg);
     color: var(--fg);
   }
   ```

4. Nomes de classes em **camelCase**: `headerRow`, `emptyState`, `cardGrid`.

### Tokens principais (`app/styles/tokens.css`)

| Categoria | Tokens |
| --------- | ------ |
| Cores | `--bg`, `--fg`, `--muted`, `--mutedFg`, `--border`, `--primary`, `--danger` |
| Espaço | `--space-1` a `--space-8` (4px a 32px) |
| Raio | `--radius-sm`, `--radius-md`, `--radius-lg` |
| Tipografia | `--font-sans`, `--text-sm`, `--text-md`, `--text-lg`, `--font-weight-bold` |
| Outros | `--focusRing`, `--container-sm/md/lg/xl` |

### Exemplo real: LoginForm.module.css

```css
.cardGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 400px;
}

.imagePanel {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Checklist

- [ ] Arquivo `.module.css` ao lado do componente
- [ ] Import: `import styles from "./X.module.css"`
- [ ] `className={styles.nomeDaClasse}` (camelCase)
- [ ] Tokens em vez de `#fff`, `16px`, etc.
- [ ] Sem `!important`
