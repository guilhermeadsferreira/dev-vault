# Pre-Commit Review (React Senior)

## Objetivo

Revisar as mudanças do repositório usando a persona de engenheiro React sênior (regras em `.cursor/rules/main.mdc`) antes de commitar. **Não executa git add/commit/push** — apenas analisa e reporta.

## Passos (executar em ordem)

1. **Obter mudanças**
   - Execute `git status` e `git diff` (ou `git diff --staged` se já houver arquivos staged)
   - Identifique todos os arquivos modificados, adicionados ou removidos

2. **Revisar com checklist React Senior**

   Para cada arquivo/diff relevante (TS, TSX, CSS, rotas), avalie:

   **Arquitetura & convenções**
   - [ ] Arquivos no lugar certo? (routes vs features vs components vs lib)
   - [ ] features não importam de routes?
   - [ ] Rotas só fazem wiring (loaders/actions), sem lógica de negócio?

   **Componentes**
   - [ ] Componentes pequenos e puros?
   - [ ] Hooks com prefixo useX, em features/<f>/hooks?
   - [ ] Page components em routes, feature components em features?

   **Estilos**
   - [ ] CSS Modules (sem inline styles)?
   - [ ] Classes camelCase, poucos blocos?
   - [ ] Tokens/variáveis de `tokens.css` quando aplicável?
   - [ ] Sem `!important`?

   **Tipagem & dados**
   - [ ] Tipos coerentes, sem `any`?
   - [ ] API/erros padronizados?

   **Qualidade**
   - [ ] Acessibilidade mínima (aria/label quando necessário)?
   - [ ] loading/error/empty tratados em loaders/páginas?
   - [ ] Sem duplicação óbvia?

3. **Gerar relatório**

   Formato sugerido:

   ```
   ## Pre-Commit Review

   **Arquivos:** [lista]
   **Escopo:** [feat/fix/refactor/...]

   ### Checklist
   ✅ / ❌ por item relevante
   (omitir itens N/A, ex.: tipos em arquivos puramente CSS)

   ### Issues (se houver)
   - [arquivo:linha] Descrição sucinta + sugestão

   ### Conclusão
   [OK para commit] ou [Recomendo corrigir X antes de commitar]
   ```

4. **Entregar resultado**
   - Se tudo OK: informe que pode prosseguir com `commit-and-push`
   - Se houver issues: liste e sugira correções; pergunte se quer corrigir agora ou commitar mesmo assim

## Regras

- Seja direto e pragmático — não exagere em críticas por detalhes menores
- Foque em: quebrar rotas, acoplamento incorreto, violações de convenção do projeto
- Se não houver mudanças: informe e pare
