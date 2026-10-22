# black-box

Mapa: https://kaiqueramos.github.io/black-box/

Laboratório de segurança ofensiva com alvos locais.

**40 marcos, 14.880 labs e 19 checkpoints.** A fonte de verdade é [`public/data.js`](public/data.js).

Cada lab é um alvo isolado, com uma flag `LAB{...}`, um critério de aprovação e uma solução.

## Como funciona

```bash
cd labs/00-fundamentos/001-linux-sobrevivencia
docker compose up -d
docker exec -it lab-001 sh
```

Alvo sempre em `127.0.0.1`. Nada exposto na rede.

Ao terminar:

```bash
docker compose down -v
```

## Regras

1. Só alvo próprio ou com autorização escrita.
2. Flag sem writeup não conta: precisa de causa raiz e correção.
3. `solucao.md` depois de 40 minutos de tentativa.
4. Um lab por vez.

## Estrutura

```
CURRICULO.md    os 40 marcos e os 14.880 labs
PROGRESSO.md    checklist do que já foi feito
labs/           um diretório por lab, autocontido
ferramentas/    scripts de apoio e cheatsheets
writeups/       um relatório por lab
```

## Pré-requisitos

Docker + Compose, Python 3, Burp Suite Community, um editor.

## Progresso

Ver [PROGRESSO.md](PROGRESSO.md).
