#!/bin/sh
set -e

# PARTE B — no ambiente de um processo seu
export FLAG_PARTE_B='de_grupo_e_'
sleep 100000 &

# PARTE C — arquivo apagado, mas ainda aberto por um descritor
printf 'proc_inspecionado}' > /tmp/.segredo
exec 3< /tmp/.segredo
rm -f /tmp/.segredo

printf 'alvo no ar. Voce e o usuario aluno.\n'
printf 'Ha tres partes da flag. Comece olhando o que voce pode ler e o que esta rodando.\n'

# mantem o fd 3 aberto no processo principal
sleep 100000
