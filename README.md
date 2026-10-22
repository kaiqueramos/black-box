# black-box

Mapa: https://kaiqueramos.github.io/black-box/

Laboratório pessoal de segurança ofensiva: do zero ao nível de pesquisar sozinho.

Cada lab é um alvo isolado, com uma flag `LAB{...}`, um critério de aprovação e uma solução que só deve ser aberta depois de tentar.

## Como funciona

```bash
cd labs/00-fundamentos/001-linux-sobrevivencia
docker compose up -d
./alvo            # imprime o endereço/porta
```

Alvo sempre em `127.0.0.1`. Nada exposto na rede.

Ao terminar:

```bash
docker compose down -v
```

## Regras

1. Só se ataca alvo próprio ou com autorização escrita.
2. Flag capturada não é aprovação: precisa do writeup com causa raiz e correção.
3. `solucao.md` é último recurso. Tentou 40 minutos? Pode abrir.
4. Um lab por vez. Terminar vale mais que começar.

## Estrutura

```
CURRICULO.md    os 12 níveis e os 335 labs
PROGRESSO.md    checklist do que já foi feito
labs/           um diretório por lab, autocontido
ferramentas/    scripts de apoio e cheatsheets
writeups/       relatórios no padrão de consultoria
```

## Pré-requisitos

Docker + Compose, Python 3, Burp Suite Community, um editor. Nada além disso.

## Progresso

Ver [PROGRESSO.md](PROGRESSO.md).
