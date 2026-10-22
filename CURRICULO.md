# Currículo

335 labs em 12 níveis. Estimativa: 18–30 meses a 8–10h/semana.

## Mapa

| Nível | Foco | Labs | Certificação no fim |
|---|---|---|---|
| 0 | Fundamentos: Linux, rede, HTTP, código | 15 | — |
| 1 | Web clássico (OWASP Top 10) | 25 | — |
| 2 | APIs e auth moderna | 45 | eJPT |
| 3 | Lógica de negócio e falhas de fluxo | 25 | — |
| 4 | Cloud e containers | 45 | BSCP |
| 5 | Supply chain | 20 | — |
| 6 | Active Directory e rede interna | 40 | CPTS |
| 7 | Mobile e thick client | 20 | — |
| 8 | LLM e segurança de IA | 20 | — |
| 9 | Detecção e purple team | 30 | — |
| 10 | Exploit development | 30 | OSCP |
| 11 | Mundo real: bug bounty e relatório | 20 | — |

## Critério de aprovação (todos os labs)

1. Flag capturada.
2. Writeup com: contexto, hipótese, evidência, causa raiz e correção.
3. Tempo anotado (para medir evolução).
4. Nenhuma consulta à solução antes de 40 minutos de tentativa real.

---

## Nível 0 — Fundamentos (15)

| # | Lab | O que prova |
|---|---|---|
| 001 | linux-sobrevivencia | permissões, processos, usuários, arquivos |
| 002 | shell-pipelines | grep, sed, awk, jq, xargs |
| 003 | rede-do-zero | IP, DNS, TCP/UDP, rotas, portas |
| 004 | http-a-fundo | métodos, status, headers, cookies, cache |
| 005 | tls-na-pratica | handshake, certificado, SNI, openssl |
| 006 | python-para-ofensiva | requests, parsing, script de recon |
| 007 | javascript-e-o-browser | DOM, fetch, storage, same-origin |
| 008 | git-sem-medo | branch, diff, bisect, recuperar commit |
| 009 | docker-essencial | imagem, volume, rede, compose |
| 010 | logs-e-processos | ss, lsof, journalctl, /proc |
| 011 | cripto-util | hash, HMAC, base64, JWT decode |
| 012 | encoding-e-ofuscacao | URL, hex, unicode, duplo encode |
| 013 | proxy-e-burp | interceptar, repetir, intruder, scope |
| 014 | recon-passivo | whois, dig, crt.sh, headers, bundle JS |
| 015 | escrever-achado | template de finding com evidência |

## Nível 1 — Web clássico (25)

| # | Lab | O que prova |
|---|---|---|
| 016 | sqli-basico | union, erro, booleano |
| 017 | sqli-blind | time-based, extração sem saída |
| 018 | xss-refletido | contexto HTML, atributo, JS |
| 019 | xss-armazenado | persistência e roubo de sessão |
| 020 | xss-dom | sink, source, bypass de filtro |
| 021 | csrf | token ausente, SameSite, método |
| 022 | ssrf-basico | acesso a serviço interno |
| 023 | ssrf-metadata | 169.254.169.254 e credencial de nuvem |
| 024 | lfi | path traversal, wrapper, log poisoning |
| 025 | rfi | inclusão remota e execução |
| 026 | upload-simples | upload de webshell |
| 027 | upload-bypass | MIME, magic bytes, extensão |
| 028 | command-injection | separadores, blind, out-of-band |
| 029 | ssti | detecção e RCE por template |
| 030 | xxe | leitura de arquivo e SSRF |
| 031 | deserialization | gadget chain simples |
| 032 | idor-basico | troca de ID em recurso |
| 033 | auth-bypass | lógica de login, força bruta contida |
| 034 | jwt-none | algoritmo none |
| 035 | jwt-confusao | RS256 → HS256 |
| 036 | cors | reflexão de Origin com credentials |
| 037 | open-redirect | cadeia para roubo de token |
| 038 | clickjacking | frame + UI falsa |
| 039 | information-disclosure | stack trace, backup, source map |
| 040 | headers-e-csp | bypass de CSP e política correta |
