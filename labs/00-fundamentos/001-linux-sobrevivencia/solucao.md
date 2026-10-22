# Solução — 001 linux-sobrevivencia

> Abra só depois de 40 minutos de tentativa real.

## Caminho

**Parte A — permissão de grupo**

```bash
id
# uid=1000(aluno) gid=1000(aluno) groups=101(guardiao)

ls -l /srv/cofre/parte-a
# -rw-r----- 1 root guardiao ... parte-a

cat /srv/cofre/parte-a
# LAB{permissao_
```

O arquivo é `640` e pertence ao grupo `guardiao`, do qual `aluno` faz parte. Sem o grupo, seria `Permission denied`.

**Parte B — ambiente de processo**

```bash
for f in /proc/[0-9]*/environ; do
  tr '\0' '\n' < "$f" 2>/dev/null | grep FLAG_PARTE_B && echo "  <- $f"
done
# FLAG_PARTE_B=de_grupo_e_
```

**Parte C — arquivo apagado ainda aberto**

```bash
ls -l /proc/*/fd/* 2>/dev/null | grep deleted
# /proc/1/fd/3 -> /tmp/.segredo (deleted)

cat /proc/1/fd/3
# proc_inspecionado}
```

## Flag

`LAB{permissao_de_grupo_e_proc_inspecionado}`

## Por que funciona

O Linux não esconde o que o seu usuário já pode acessar: permissões de grupo liberam leitura, `/proc/<pid>/environ` expõe o ambiente do processo e `/proc/<pid>/fd` mantém vivo um arquivo removido enquanto houver descritor aberto.

## Correção (o que isso ensina de defesa)

- Não colocar segredo em variável de ambiente de processo: `/proc` entrega.
- Não confiar em "apaguei o arquivo": enquanto o fd estiver aberto, o conteúdo existe.
- Permissão de grupo é acesso: revise `chown :grupo` e `640`.

## O que aprender

- `id`, `ls -l`, `stat`
- `/proc/<pid>/environ`, `/proc/<pid>/fd`
- `tr '\0' '\n'` para ler ambiente
