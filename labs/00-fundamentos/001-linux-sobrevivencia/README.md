# 001 — linux-sobrevivencia

**Nível:** 0
**Tempo alvo:** 45 min
**Dificuldade:** 1/5

## Objetivo

Encontrar as três partes da flag usando só o que o Linux mostra: permissões, processos e descritores de arquivo.

## Setup

```bash
docker compose up -d --build
docker exec -it lab-001 sh
```

Você entra como `aluno`. Não é root. Tudo que importa está acessível ao seu usuário — só não está onde parece.

## Tarefas

1. Descobrir em quais grupos você está e o que isso te permite ler.
2. Encontrar a parte da flag que está no ambiente de um processo.
3. Encontrar a parte que está em um arquivo que já foi apagado, mas continua aberto.
4. Juntar as três e capturar `LAB{...}`.

## Critério de aprovação

- [ ] Flag capturada
- [ ] Writeup em `writeups/001-linux-sobrevivencia.md` com o comando de cada parte
- [ ] Tempo anotado em `PROGRESSO.md`

## Dicas

<details>
<summary>Dica 1 (só depois de 15 min)</summary>

`id` mostra seus grupos. `ls -l` mostra dono, grupo e modo. Compare o grupo do arquivo com os seus.

</details>

<details>
<summary>Dica 2 (só depois de 30 min)</summary>

Cada processo tem `/proc/<pid>/environ`. Cada processo também tem `/proc/<pid>/fd/`, com links para os arquivos que ele mantém abertos — inclusive os que já foram removidos do disco.

</details>
