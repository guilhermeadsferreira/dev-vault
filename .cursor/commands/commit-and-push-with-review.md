# Commit e Push com Review

## Objetivo

Revisar as mudanças com a persona React sênior e, após aprovação, preparar commit com mensagem sucinta e enviar para o remote.

## Fluxo (executar em ordem)

### Fase 1: Pre-Commit Review

Execute os passos de `.cursor/commands/pre-commit-review.md`:

1. `git status` e `git diff` para obter mudanças
2. Aplicar checklist React Senior (arquitetura, componentes, estilos, tipagem, qualidade)
3. Gerar relatório com ✅/❌ e issues (se houver)
4. **Parar aqui** e apresentar o relatório ao usuário

**Decisão do usuário:**
- Se "OK" ou "prosseguir": ir para Fase 2
- Se "corrigir": ajudar com as correções; ao final, perguntar se quer rodar o review de novo ou ir direto para Fase 2

### Fase 2: Commit e Push

Só executar se o usuário aprovar. Seguir `.cursor/commands/commit-and-push.md`:

1. `git add .`
2. `git diff --cached` para contexto
3. Criar mensagem: `tipo(escopo): descrição` (máx 72 chars, imperativo)
4. `git commit -m "mensagem"`
5. `git push -u origin HEAD` (ou `git push`)

## Resumo

| Comando                      | Uso                                        |
|-----------------------------|--------------------------------------------|
| `pre-commit-review`         | Só revisar, não commitar                   |
| `commit-and-push`           | Commit direto, sem review                 |
| `commit-and-push-with-review` | Review primeiro, depois commit (este)  |

## Notas

- Mesmas regras de mensagem e push do `commit-and-push.md`
- Se não houver mudanças após `git add .`, informe e não prossiga
- Push falhou (remote ahead): sugerir `git pull --rebase` e tentar novamente
- `git push --force`: perguntar ao usuário antes
