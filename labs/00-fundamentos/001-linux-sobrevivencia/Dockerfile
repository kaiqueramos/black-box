FROM alpine:3.20

# dois usuários: aluno (você) e guardiao (dono do cofre)
RUN addgroup -S guardiao \
 && adduser -D aluno \
 && adduser -D -G guardiao guardiao \
 && addgroup aluno guardiao

# PARTE A — só o grupo guardiao lê
RUN mkdir -p /srv/cofre \
 && printf 'LAB{permissao_' > /srv/cofre/parte-a \
 && chown root:guardiao /srv/cofre/parte-a \
 && chmod 640 /srv/cofre/parte-a

# isca
RUN printf 'LAB{quase_la}\n' > /home/aluno/flag_falsa.txt \
 && chown aluno:aluno /home/aluno/flag_falsa.txt

COPY entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

USER aluno
WORKDIR /home/aluno

ENTRYPOINT ["/entrypoint.sh"]
