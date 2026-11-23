---
name: contribuir
description: Guia uma pessoa não técnica a propor uma mudança no site (texto, foto, preço, link, seção) via fork + pull request, pra que o mantenedor (fontineli) revise antes de ir ao ar. Use quando alguém disser "quero mudar o site", "quero trocar um texto/foto", "como eu contribuo", "manda pra revisão", "abre um PR", ou quando a pessoa não for dona do repo e pedir qualquer alteração.
---

# Contribuir via fork (pra pessoa não técnica)

Quem está pedindo **não sabe git** e não precisa saber. Você faz toda a parte
técnica; a pessoa só diz o que quer mudar, olha o resultado e confirma. O
mantenedor (`fontineli`) revisa e publica. Nada vai ao ar sem a revisão dele.

Repo oficial: `fontineli/physiotherapy-landingpage`. Branch principal: `main`.

## Regras de ouro

- **Nunca** dar push na `main`, nem no repo oficial. Tudo vai pro fork da pessoa
  e chega via pull request.
- **Nunca** fazer merge do PR. Quem aprova é o mantenedor.
- Fale português simples. Nada de jargão sem explicar em uma frase
  ("fork = sua cópia do site no GitHub").
- Siga o `CLAUDE.md` do projeto pra editar (texto em `messages/pt.json` **e**
  `en.json`, links só em `lib/config.ts`, cores por token).
- Uma mudança por PR. Se a pessoa pedir várias coisas sem relação, ofereça PRs
  separados.

## Passo a passo

### 1. Preparar (só na primeira vez)

1. `gh auth status`. Se não estiver logado, peça pra pessoa rodar
   `! gh auth login` e escolher *GitHub.com → HTTPS → Login with a web browser*.
2. Descubra o usuário: `gh api user --jq .login`.
   - Se for `fontineli`, essa skill não se aplica: é o dono, pode trabalhar
     direto num branch.
3. Garanta o fork e os remotes:
   ```bash
   gh repo fork fontineli/physiotherapy-landingpage --remote --remote-name origin
   ```
   Depois `git remote -v` deve mostrar `origin` = fork da pessoa e
   `upstream` = `fontineli/...`. Se não clonou ainda, use
   `gh repo fork fontineli/physiotherapy-landingpage --clone`.
4. `pnpm install` (precisa Node 22+ e pnpm). Se faltar, explique e ajude a
   instalar (`brew install node pnpm` no Mac).

### 2. Começar a mudança

```bash
git fetch upstream
git switch -c <tipo>/<descricao-curta> upstream/main
```
`<tipo>`: `texto`, `foto`, `preco`, `secao`, `ajuste`. Ex.: `texto/horario-atendimento`.

### 3. Entender o pedido

Repita com suas palavras o que vai mudar e **onde** no site (página + seção),
antes de editar. Se faltar algo (texto em inglês, foto nova), pergunte. Fotos
novas: peça o arquivo e coloque em `public/`, de preferência `.webp`.

### 4. Editar e mostrar

1. Faça a edição seguindo o `CLAUDE.md`. Se a pessoa só escreveu em
   português, traduza pro `en.json` e avise que fez isso.
2. Rode `pnpm dev` em background e mande o link
   (`http://localhost:3000`, ou `/en`, `/guia`, `/quiropraxia`) pra pessoa
   conferir no navegador.
3. Ajuste até a pessoa dizer que está bom.

### 5. Checar antes de enviar

Rode o mesmo que o CI do repo (`.github/workflows/ci.yml`):
```bash
pnpm lint && pnpm typecheck && pnpm build
```
Se falhar, corrija. Não envie com erro. Pare o `pnpm dev` no fim.

### 6. Enviar pra revisão

```bash
git add <arquivos alterados>
git commit -m "<tipo>: <o que mudou, em português>"
git push -u origin HEAD
gh pr create --repo fontineli/physiotherapy-landingpage --base main \
  --head <usuario>:<branch> --title "<mesmo do commit>" --body-file <arquivo>
```

Corpo do PR (curto, pro mantenedor entender sem abrir o código):

```markdown
**Pedido.** <o que a pessoa queria e por quê, nas palavras dela>

**O que mudou.** <página/seção e o antes → depois>

**Conferido.** Visto no navegador em <rotas>. `pnpm lint`, `typecheck` e `build` passaram.

**Pra revisar.** <dúvidas, tradução feita por IA, foto sem crédito, etc. ou "nada">
```

Mande o link do PR pra pessoa e explique: "O mantenedor do site vai revisar. Se ele pedir
algum ajuste, é só me chamar de novo com o link."

### 7. Quando o mantenedor pedir ajustes

1. `gh pr view <link> --comments` pra ler o que foi pedido. Explique em
   português simples.
2. Volte pro branch (`git switch <branch>`), corrija, repita o passo 5,
   `git commit` e `git push`. O PR atualiza sozinho.

### 8. Próxima mudança

Sempre parta de um branch novo do `upstream/main` atualizado (passo 2). Não
reaproveite branch de PR antigo.

## Problemas comuns

| Sintoma | O que fazer |
|---|---|
| `permission denied` no push | `origin` aponta pro repo oficial. Rode o passo 1.3 de novo. |
| Conflito ao atualizar | `git fetch upstream && git rebase upstream/main`, resolva, `git push --force-with-lease`. Explique que é normal. |
| Porta 3000 ocupada | Ver *Troubleshooting local* no `CLAUDE.md`. |
| `[reviews] REQUEST_DENIED` no log | Não é erro, ignore (ver `CLAUDE.md`). |
| CI vermelho no PR | `gh pr checks <link>`, leia o erro, corrija e dê push. |
