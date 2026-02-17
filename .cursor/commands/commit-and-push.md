# Commit e Push

## Objetivo

Analisar as mudanças do repositório, preparar um commit com mensagem sucinta e enviar para o remote.

## Passos (executar em ordem)

1. **Analisar mudanças**
   - Execute `git status` e `git diff` para ver o que mudou
   - Identifique arquivos modificados, adicionados ou removidos

2. **Adicionar tudo**
   - Execute `git add .` para preparar todas as alterações

3. **Analisar o contexto**
   - Revise o diff completo (`git diff --cached`) para entender o contexto
   - Considere: que tipo de alteração é? (fix, feat, refactor, docs, style, chore)
   - Considere o escopo: qual área do projeto foi afetada?

4. **Criar mensagem de commit sucinta**
   - Formato: `tipo(escopo): descrição curta` (ex.: `feat(ui): add doc page for components`)
   - Máximo 72 caracteres
   - Modo imperativo: "add", "fix", "update" (não "added", "fixed")
   - Primeira letra maiúscula, sem ponto no final
   - Descrever o que mudou de forma clara, não genérica

5. **Commitar**
   - `git commit -m "sua mensagem"`
   - Use a mensagem que você criou no passo 4

6. **Push**
   - `git push -u origin HEAD` (ou `git push` se o tracking já existir)

## Regras da mensagem

- **tipos comuns:** feat, fix, docs, style, refactor, chore
- **Não use:** mensagens genéricas como "update", "changes", "fix stuff"
- **Sucinto:** uma linha que capture a essência das mudanças
- Se muitas áreas afetadas: priorize a principal ou use escopo amplo (ex.: `chore: design tokens and UI doc`)

## Notas

- Se não houver mudanças staged após `git add .`, informe o usuário e não prossiga
- Se o push falhar (remote ahead): sugira `git pull --rebase` e tente novamente
- Pergunte ao usuário antes de fazer `git push --force` ou `--force-with-lease`
