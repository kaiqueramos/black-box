/* Currículo do black-box — dados do mapa vertical.
   Total de labs é a soma de todos os marcos. */

window.CURRICULO = {
  phases: [
    { id: "base", num: "00", name: "Base", sub: "pré-requisitos", color: "#c9ff3f",
      desc: "O que ninguém ensina porque assume que você já sabe." },
    { id: "beginner", num: "01", name: "Iniciante", sub: "as primeiras falhas", color: "#3fe0ff",
      desc: "Web, proxy e recon. Aqui você faz barulho pela primeira vez." },
    { id: "inter", num: "02", name: "Intermediário", sub: "escolha um caminho", color: "#ffb020",
      desc: "Aqui o mapa bifurca: web, infra ou produto/IA." },
    { id: "advanced", num: "03", name: "Avançado", sub: "quando não existe receita", color: "#ff2e63",
      desc: "Memória, evasão, pesquisa. O material começa a ficar escasso." },
    { id: "expert", num: "04", name: "Especialista", sub: "produzir conhecimento", color: "#6dffb0",
      desc: "Bug bounty, pesquisa própria e um projeto que é só seu." }
  ],
  nodes: {},
  flow: []
};

Object.assign(window.CURRICULO.nodes, {
  "00": {
    num: "00", phase: "base", title: "Alfabetização digital", labs: 180, weeks: 4,
    tags: ["sistema", "arquivos", "terminal", "ambiente"],
    summary: "Antes de atacar, entender onde as coisas moram: processo, arquivo, usuário e ambiente.",
    proof: [
      "Navegar por diretórios e entender caminhos absolutos e relativos",
      "Criar, mover, copiar e apagar arquivos com segurança",
      "Ler permissões e saber quem pode o quê",
      "Inspecionar processos e portas abertas",
      "Editar arquivos no terminal (vim ou nano)",
      "Variáveis de ambiente e PATH",
      "Compactar e descompactar formatos comuns",
      "Redirecionamento, pipes e exit codes",
      "Instalar e remover pacotes",
      "Conectar em outra máquina por SSH",
      "Ler logs do sistema",
      "Projeto: montar uma VM e documentar a configuração"
    ],
    res: [
      ["livro", "The Linux Command Line", "https://linuxcommand.org/tlcl.php"],
      ["curso", "MIT Missing Semester", "https://missing.csail.mit.edu/"],
      ["lab", "OverTheWire Bandit", "https://overthewire.org/wargames/bandit/"],
      ["doc", "Linux Journey", "https://explainshell.com/"]
    ]
  },
  "01": {
    num: "01", phase: "base", title: "Linux essencial", labs: 300, weeks: 6,
    tags: ["usuários", "permissões", "processos", "systemd"],
    summary: "O sistema operacional é o campo de batalha. Saber onde olhar vale mais que qualquer ferramenta.",
    proof: [
      "Usuários, grupos e arquivos de conta",
      "Permissões rwx, SUID, SGID e sticky bit",
      "Processos, sinais e jobs",
      "systemd: units, serviços e timers",
      "cron e agendamento",
      "Mounts, filesystem e espaço em disco",
      "/proc, /sys e o que o kernel expõe",
      "Pacotes e repositórios",
      "Shell scripting com variáveis e funções",
      "tmux e fluxo de trabalho",
      "journalctl e logs",
      "Projeto: hardening básico de uma VM"
    ],
    res: [
      ["lab", "OverTheWire Bandit", "https://overthewire.org/wargames/bandit/"],
      ["livro", "Advanced Bash-Scripting Guide", "https://tldp.org/LDP/abs/html/"],
      ["doc", "Arch Wiki", "https://wiki.archlinux.org/"],
      ["doc", "man pages", "https://man7.org/linux/man-pages/"]
    ]
  },
  "02": {
    num: "02", phase: "base", title: "Rede e HTTP", labs: 340, weeks: 6,
    tags: ["IP", "DNS", "TCP", "TLS", "HTTP"],
    summary: "Toda falha web é uma falha de protocolo em algum nível. Desenhar o caminho é o exercício.",
    proof: [
      "Modelo OSI aplicado a um request real",
      "IP, máscara, gateway e rotas",
      "DNS: registro, resolução e cache",
      "TCP, UDP e portas",
      "Handshake TLS e certificados",
      "HTTP/1.1, HTTP/2 e HTTP/3",
      "Headers, cookies, cache e compressão",
      "Proxy, reverse proxy e CDN",
      "NAT e firewall",
      "Captura com tcpdump e Wireshark",
      "curl e httpie a fundo",
      "Projeto: desenhar o caminho de uma URL até a resposta"
    ],
    res: [
      ["livro", "Beej's Guide to Network Programming", "https://beej.us/guide/bgnet/"],
      ["doc", "MDN — HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP"],
      ["doc", "RFC 9110 — HTTP Semantics", "https://www.rfc-editor.org/rfc/rfc9110.html"],
      ["livro", "Nmap Network Scanning", "https://nmap.org/book/"],
      ["doc", "Wireshark User's Guide", "https://www.wireshark.org/docs/"]
    ]
  },
  "03": {
    num: "03", phase: "base", title: "Código e automação", labs: 320, weeks: 6,
    tags: ["Python", "JS", "SQL", "Git"],
    summary: "Você não precisa ser engenheiro, mas precisa ler e escrever o suficiente para não depender de script alheio.",
    proof: [
      "Python: tipos, funções, módulos e erros",
      "requests, JSON e parsing de HTML",
      "JavaScript no browser: DOM e eventos",
      "SQL: select, join, subquery e índice",
      "Git: branch, diff, merge e bisect",
      "Regex na prática",
      "Testes e debug",
      "CLI com argparse",
      "Logging e tratamento de erro",
      "Leitura de código de terceiros",
      "Projeto: script de recon que gera relatório"
    ],
    res: [
      ["doc", "Python Tutorial", "https://docs.python.org/3/tutorial/"],
      ["livro", "Automate the Boring Stuff", "https://automatetheboringstuff.com/"],
      ["curso", "JavaScript.info", "https://javascript.info/"],
      ["lab", "Learn Git Branching", "https://learngitbranching.js.org/"],
      ["livro", "Pro Git", "https://git-scm.com/book/en/v2"]
    ]
  },
  "04": {
    num: "04", phase: "base", title: "Laboratório e Docker", labs: 240, weeks: 4,
    tags: ["Docker", "compose", "rede", "isolamento"],
    summary: "Um lab que sobe em um comando é a diferença entre estudar e perder a tarde configurando.",
    proof: [
      "Imagem, container e camadas",
      "Volumes e persistência",
      "Redes e portas",
      "Dockerfile e build",
      "Compose e múltiplos serviços",
      "Limites de CPU e memória",
      "Logs, exec e inspeção",
      "Registry e imagens oficiais",
      "Projeto: subir um alvo vulnerável local"
    ],
    res: [
      ["doc", "Docker — Get Started", "https://docs.docker.com/get-started/"],
      ["lab", "Play with Docker", "https://labs.play-with-docker.com/"],
      ["doc", "Kubernetes Tutorials", "https://kubernetes.io/docs/tutorials/"],
      ["repo", "Awesome Docker", "https://github.com/veggiemonk/awesome-docker"]
    ]
  },
  "05": {
    num: "05", phase: "beginner", title: "Web fundamentals", labs: 280, weeks: 5,
    tags: ["HTML", "DOM", "cookies", "same-origin"],
    summary: "A web é um monte de estado escondido no browser. Quem entende o estado entende a falha.",
    proof: [
      "HTML, formulários e validação",
      "CSS e seletores (o suficiente para XSS)",
      "JavaScript no browser",
      "DOM, eventos e sinks",
      "Cookies, localStorage e sessionStorage",
      "Same-origin policy e CORS",
      "DevTools: network, storage e console",
      "Service workers e cache",
      "Projeto: clonar um fluxo e mapear o estado"
    ],
    res: [
      ["curso", "MDN — Learn Web Development", "https://developer.mozilla.org/en-US/docs/Learn"],
      ["curso", "web.dev — Learn", "https://web.dev/learn"],
      ["curso", "JavaScript.info", "https://javascript.info/"],
      ["lab", "PortSwigger Academy", "https://portswigger.net/web-security"]
    ]
  },
  "06": {
    num: "06", phase: "beginner", title: "Burp e interceptação", labs: 220, weeks: 4,
    tags: ["proxy", "repeater", "intruder", "scope"],
    summary: "A ferramenta não acha nada sozinha. Ela só deixa você repetir e comparar mais rápido.",
    proof: [
      "Proxy e instalação da CA",
      "Intercept e histórico",
      "Repeater e comparação",
      "Intruder e Turbo Intruder",
      "Decoder e Comparer",
      "Scope e sitemap",
      "Extensões essenciais",
      "Proxy em mobile e CLI",
      "Projeto: mapear uma aplicação inteira"
    ],
    res: [
      ["doc", "Burp Suite Documentation", "https://portswigger.net/burp/documentation"],
      ["lab", "PortSwigger Academy", "https://portswigger.net/web-security"],
      ["doc", "Burp Community", "https://portswigger.net/burp/communitydownload"]
    ]
  },
  "07": {
    num: "07", phase: "beginner", title: "OWASP Top 10", labs: 520, weeks: 10,
    tags: ["SQLi", "XSS", "SSRF", "upload", "JWT"],
    summary: "As falhas que ainda derrubam sistema em 2026, uma por uma, com e sem filtro.",
    proof: [
      "SQL injection: union, boolean e time-based",
      "XSS refletido, armazenado e DOM",
      "CSRF com e sem SameSite",
      "SSRF para serviço interno e metadata",
      "LFI, path traversal e wrappers",
      "Upload com bypass de MIME e magic bytes",
      "Command injection blind e out-of-band",
      "SSTI até execução de código",
      "XXE com leitura de arquivo",
      "Deserialização insegura",
      "JWT none e confusão RS256 para HS256",
      "CORS refletivo com credentials",
      "Open redirect encadeado com roubo de token",
      "Projeto: writeup com causa raiz e correção"
    ],
    res: [
      ["lab", "PortSwigger Web Security Academy", "https://portswigger.net/web-security"],
      ["doc", "OWASP WSTG", "https://owasp.org/www-project-web-security-testing-guide/"],
      ["repo", "PayloadsAllTheThings", "https://github.com/swisskyrepo/PayloadsAllTheThings"],
      ["doc", "HackTricks", "https://book.hacktricks.wiki/"],
      ["lab", "OWASP Juice Shop", "https://owasp.org/www-project-juice-shop/"]
    ]
  },
  "08": {
    num: "08", phase: "beginner", title: "Recon e OSINT", labs: 320, weeks: 6,
    tags: ["DNS", "subdomínio", "Shodan", "dorks"],
    summary: "O alvo começa antes do login. Superfície esquecida é o achado mais barato que existe.",
    proof: [
      "whois e DNS",
      "Certificate Transparency",
      "Enumeração de subdomínios",
      "Portas e serviços",
      "Fingerprint de tecnologia",
      "Headers e TLS",
      "Google dorks",
      "GitHub dorks",
      "Shodan e Censys",
      "Segredos em bundle JS",
      "ASN e faixas de IP",
      "Projeto: mapa de superfície de um domínio"
    ],
    res: [
      ["repo", "SecLists", "https://github.com/danielmiessler/SecLists"],
      ["doc", "OSINT Framework", "https://osintframework.com/"],
      ["doc", "crt.sh", "https://crt.sh/"],
      ["repo", "ProjectDiscovery", "https://github.com/projectdiscovery"],
      ["doc", "Shodan", "https://www.shodan.io/"]
    ]
  },
  "09": {
    num: "09", phase: "beginner", title: "Configuração e exposição", labs: 300, weeks: 5,
    tags: ["Actuator", "S3", ".git", "headers"],
    summary: "Antes de injetar, olhe o que já está aberto. Metade dos achados reais mora aqui.",
    proof: [
      "Actuator e endpoints de debug",
      "Buckets S3 e storage exposto",
      ".git, .env e backups",
      "Directory listing",
      "Stack traces e mensagens de erro",
      "Source maps",
      "Credenciais padrão",
      "Painéis administrativos",
      "CORS e headers de segurança",
      "Projeto: três achados com evidência"
    ],
    res: [
      ["doc", "OWASP WSTG — Configuration", "https://owasp.org/www-project-web-security-testing-guide/"],
      ["doc", "HackTricks — Cloud", "https://cloud.hacktricks.wiki/"],
      ["repo", "PayloadsAllTheThings", "https://github.com/swisskyrepo/PayloadsAllTheThings"],
      ["lab", "PortSwigger — Info Disclosure", "https://portswigger.net/web-security/information-disclosure"]
    ]
  }
});

Object.assign(window.CURRICULO.nodes, {
  "10": {
    num: "10", phase: "inter", title: "APIs e autorização", labs: 820, weeks: 12,
    tags: ["BOLA", "BFLA", "GraphQL", "mass assignment"],
    summary: "Onde a maioria dos programas reais falha. A pergunta não é se existe auth, é o que cada usuário pode fazer.",
    proof: [
      "REST: verbos, status e idempotência",
      "BOLA: recurso de outro usuário",
      "BFLA: função de outro papel",
      "BOPLA e mass assignment",
      "IDOR em IDs previsíveis e UUIDs",
      "GraphQL: introspection e query abusiva",
      "Rate limit e força bruta contida",
      "Paginação, filtros e ordenação",
      "Versionamento de API",
      "Erros que vazam estrutura",
      "API keys e escopos",
      "Webhooks e callback",
      "Projeto: duas contas, um recurso, impacto provado"
    ],
    res: [
      ["doc", "OWASP API Security Top 10", "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"],
      ["lab", "PortSwigger — API Testing", "https://portswigger.net/web-security/api-testing"],
      ["doc", "OAuth 2.0", "https://oauth.net/2/"],
      ["doc", "JWT Introduction", "https://jwt.io/introduction"],
      ["doc", "HackTricks — APIs", "https://book.hacktricks.wiki/"]
    ]
  },
  "11": {
    num: "11", phase: "inter", title: "Autenticação e sessão", labs: 440, weeks: 7,
    tags: ["JWT", "OAuth", "OIDC", "SAML", "MFA"],
    summary: "Login é o portão. Sessão é o que continua aberto depois que você entra.",
    proof: [
      "Sessão em cookie: atributos e sequestro",
      "JWT: header, payload e assinatura",
      "JWT none e confusão de algoritmo",
      "OAuth: authorization code e implicit",
      "OIDC e claims",
      "PKCE e redirect_uri",
      "SAML e XML signature",
      "MFA e bypass por lógica",
      "Reset de senha e token previsível",
      "OTP e janela de tempo",
      "Session fixation",
      "Projeto: quebrar um fluxo de login completo"
    ],
    res: [
      ["doc", "OAuth 2.0", "https://oauth.net/2/"],
      ["doc", "OpenID Connect", "https://openid.net/connect/"],
      ["lab", "PortSwigger — Authentication", "https://portswigger.net/web-security/authentication"],
      ["doc", "JWT Introduction", "https://jwt.io/introduction"],
      ["doc", "OWASP Cheat Sheets", "https://cheatsheetseries.owasp.org/"]
    ]
  },
  "12": {
    num: "12", phase: "inter", title: "Lógica de negócio", labs: 340, weeks: 5,
    tags: ["race condition", "cupom", "preço", "estoque"],
    summary: "O bug não está no código, está na regra. Nenhuma ferramenta automática acha isso.",
    proof: [
      "Race condition em requisições paralelas",
      "Cupom reutilizado e acumulado",
      "Preço negativo e arredondamento",
      "Estoque e reserva",
      "Fluxo fora de ordem",
      "Idempotência de pagamento",
      "Limite e quota por conta",
      "Refund e chargeback",
      "Projeto: quebrar a regra sem injection"
    ],
    res: [
      ["lab", "PortSwigger — Business Logic", "https://portswigger.net/web-security/logic-flaws"],
      ["doc", "OWASP Top 10", "https://owasp.org/www-project-top-ten/"],
      ["repo", "HowToHunt", "https://github.com/KathanP19/HowToHunt"]
    ]
  },
  "13": {
    num: "13", phase: "inter", title: "Cloud e containers", labs: 780, weeks: 11,
    tags: ["AWS", "IAM", "S3", "K8s", "CI/CD"],
    summary: "O que vaza quando a aplicação está tecnicamente correta: identidade, metadata e permissão.",
    proof: [
      "IAM: usuário, role e política",
      "Metadata service e SSRF",
      "S3 e permissões de bucket",
      "Kubernetes: RBAC e service account",
      "Secrets em IaC e repositório",
      "CI/CD e token de pipeline",
      "Container escape",
      "Logging e detecção em cloud",
      "Projeto: de uma SSRF a credencial de nuvem"
    ],
    res: [
      ["curso", "AWS Skill Builder", "https://explore.skillbuilder.aws/"],
      ["doc", "Kubernetes Tutorials", "https://kubernetes.io/docs/tutorials/"],
      ["doc", "HackTricks Cloud", "https://cloud.hacktricks.wiki/"],
      ["repo", "Pacu", "https://github.com/RhinoSecurityLabs/pacu"],
      ["doc", "AWS IAM Guide", "https://docs.aws.amazon.com/IAM/latest/UserGuide/"]
    ]
  },
  "14": {
    num: "14", phase: "inter", title: "Active Directory", labs: 500, weeks: 8,
    tags: ["Kerberos", "LDAP", "NTLM", "ADCS"],
    summary: "Sair do web e chegar no domínio. É aqui que o teste deixa de ser sobre um site.",
    proof: [
      "Kerberos: TGT, TGS e tickets",
      "LDAP e enumeração",
      "NTLM e relay",
      "Kerberoasting",
      "AS-REP roasting",
      "ACL abuse",
      "ADCS e ESC1",
      "BloodHound na prática",
      "Trusts entre domínios",
      "Projeto: de usuário comum a Domain Admin"
    ],
    res: [
      ["doc", "The Hacker Recipes", "https://www.thehacker.recipes/"],
      ["doc", "ADSecurity", "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services"],
      ["doc", "BloodHound Docs", "https://bloodhound.readthedocs.io/"],
      ["repo", "Certipy", "https://github.com/ly4k/Certipy"],
      ["doc", "HackTricks — AD", "https://book.hacktricks.wiki/en/windows-hardening/active-directory-methodology/"]
    ]
  },
  "15": {
    num: "15", phase: "inter", title: "Rede interna e pivoting", labs: 380, weeks: 6,
    tags: ["túnel", "SOCKS", "lateral", "credencial"],
    summary: "Uma credencial vale pouco se você não consegue chegar onde ela funciona.",
    proof: [
      "Túneis SSH e port forwarding",
      "SOCKS e proxy chain",
      "Chisel e Ligolo",
      "Movimento lateral",
      "Reuso de credencial",
      "Enumeração interna",
      "Segmentação de rede",
      "Projeto: atravessar três redes"
    ],
    res: [
      ["doc", "HackTricks — Pivoting", "https://book.hacktricks.wiki/en/generic-hacking/tunneling-and-pivoting.html"],
      ["repo", "Chisel", "https://github.com/jpillora/chisel"],
      ["repo", "Ligolo-ng", "https://github.com/nicocha30/ligolo-ng"],
      ["doc", "Metasploit Unleashed", "https://docs.metasploit.com/"]
    ]
  },
  "16": {
    num: "16", phase: "inter", title: "Mobile e thick client", labs: 380, weeks: 6,
    tags: ["APK", "Frida", "pinning", "storage"],
    summary: "O app mente sobre o que está no servidor. E o cliente confia no que o app diz.",
    proof: [
      "Estrutura de um APK",
      "Decompilação e leitura de código",
      "Frida e hooking",
      "Bypass de certificate pinning",
      "Storage inseguro",
      "Deep link e intent",
      "WebView e bridge",
      "Projeto: bypass de pinning e extração de segredo"
    ],
    res: [
      ["doc", "OWASP MASTG", "https://mas.owasp.org/MASTG/"],
      ["doc", "Frida Docs", "https://frida.re/docs/home/"],
      ["doc", "Android Security", "https://developer.android.com/privacy-and-security/security-tips"],
      ["repo", "Mobile Security Testing Guide", "https://github.com/OWASP/owasp-mastg"]
    ]
  },
  "17": {
    num: "17", phase: "inter", title: "LLM e agentes", labs: 360, weeks: 6,
    tags: ["prompt injection", "RAG", "agentes", "tools"],
    summary: "Prompt injection é a nova SQLi: entra por texto, sai como ação.",
    proof: [
      "Prompt injection direta",
      "Injection indireta via documento",
      "System prompt leak",
      "RAG poisoning",
      "Tool abuse e function calling",
      "Agentes com memória",
      "Jailbreak x injection",
      "Defesa e avaliação",
      "Projeto: fazer o bot entregar o segredo"
    ],
    res: [
      ["doc", "OWASP LLM Top 10", "https://genai.owasp.org/llm-top-10/"],
      ["doc", "Simon Willison — Prompt Injection", "https://simonwillison.net/tags/prompt-injection/"],
      ["curso", "Learn Prompting", "https://learnprompting.org/"],
      ["doc", "Prompting Guide", "https://www.promptingguide.ai/"]
    ]
  },
  "18": {
    num: "18", phase: "inter", title: "Supply chain", labs: 320, weeks: 5,
    tags: ["npm", "postinstall", "artifact", "SBOM"],
    summary: "O ataque que começa antes do seu código: dependência, build, artefato e assinatura.",
    proof: [
      "Dependência direta e transitiva",
      "postinstall e scripts",
      "Typosquatting",
      "Dependency confusion",
      "Artifact poisoning",
      "Token de pipeline",
      "Assinatura e proveniência",
      "SBOM",
      "Projeto: comprometer a build sem tocar no repo"
    ],
    res: [
      ["doc", "SLSA", "https://slsa.dev/"],
      ["doc", "OWASP CI/CD Top 10", "https://owasp.org/www-project-top-10-ci-cd-security-risks/"],
      ["repo", "OpenSSF Scorecard", "https://github.com/ossf/scorecard"],
      ["doc", "npm scripts", "https://docs.npmjs.com/cli/v10/using-npm/scripts"]
    ]
  },
  "19": {
    num: "19", phase: "inter", title: "Consolidação", labs: 340, weeks: 5,
    tags: ["alvo", "relatório", "reteste"],
    summary: "Juntar tudo em um caso só. Sem relatório, o achado não existe para ninguém.",
    proof: [
      "Escolher um alvo de treino",
      "Recon completo",
      "Três achados encadeados",
      "Exploração com evidência",
      "Relatório executivo e técnico",
      "Reteste",
      "Apresentação de 10 minutos",
      "Projeto: relatório de 10 páginas"
    ],
    res: [
      ["lab", "PortSwigger Academy", "https://portswigger.net/web-security"],
      ["doc", "HackerOne Hacktivity", "https://www.hackerone.com/hacktivity"],
      ["curso", "Bugcrowd University", "https://www.bugcrowd.com/university/"],
      ["doc", "OWASP WSTG", "https://owasp.org/www-project-web-security-testing-guide/"]
    ]
  }
});

Object.assign(window.CURRICULO.nodes, {
  "20": {
    num: "20", phase: "advanced", title: "Exploit dev: memória", labs: 800, weeks: 12,
    tags: ["stack", "ROP", "heap", "ASLR"],
    summary: "Quando não existe CVE pronto. Memória, registrador e uma boa noite de sono.",
    proof: [
      "Stack overflow clássico",
      "Canary e bypass",
      "NX e ROP",
      "ASLR e leak",
      "ret2libc",
      "Heap UAF",
      "Format string",
      "pwntools",
      "Mitigações e checksec",
      "Projeto: exploit com mitigação ligada"
    ],
    res: [
      ["curso", "pwn.college", "https://pwn.college/"],
      ["livro", "Nightmare", "https://guyinatuxedo.github.io/"],
      ["lab", "ROP Emporium", "https://ropemporium.com/"],
      ["lab", "Exploit Education", "https://exploit.education/"],
      ["repo", "pwntools", "https://github.com/Gallopsled/pwntools"]
    ]
  },
  "21": {
    num: "21", phase: "advanced", title: "Exploit dev: web e browser", labs: 460, weeks: 7,
    tags: ["XSS", "CSP", "prototype", "smuggling"],
    summary: "O browser é um sistema operacional com bugs de sistema operacional.",
    proof: [
      "XSS avançado e bypass de filtro",
      "CSP e bypass",
      "Prototype pollution",
      "Deserialização",
      "SSRF avançado",
      "Request smuggling",
      "Cache poisoning",
      "Projeto: cadeia de três falhas"
    ],
    res: [
      ["lab", "PortSwigger — XSS", "https://portswigger.net/web-security/cross-site-scripting"],
      ["doc", "MDN — Web Security", "https://developer.mozilla.org/en-US/docs/Web/Security"],
      ["lab", "PortSwigger Academy", "https://portswigger.net/web-security"],
      ["doc", "PortSwigger Research", "https://portswigger.net/research"]
    ]
  },
  "22": {
    num: "22", phase: "advanced", title: "Evasão e red team", labs: 400, weeks: 6,
    tags: ["EDR", "AMSI", "LOLBAS", "C2", "OPSEC"],
    summary: "Achar a falha é metade. A outra metade é não ser visto no caminho.",
    proof: [
      "AV e EDR: o que detectam",
      "Ofuscação e empacotamento",
      "AMSI",
      "LOLBAS",
      "C2 e canais",
      "OPSEC",
      "Logging e telemetria",
      "Projeto: operação purple documentada"
    ],
    res: [
      ["repo", "LOLBAS", "https://lolbas-project.github.io/"],
      ["repo", "Sigma", "https://github.com/SigmaHQ/sigma"],
      ["doc", "MITRE ATT&CK", "https://attack.mitre.org/"],
      ["doc", "The DFIR Report", "https://thedfirreport.com/"]
    ]
  },
  "23": {
    num: "23", phase: "advanced", title: "Fuzzing e reverse", labs: 480, weeks: 8,
    tags: ["AFL++", "Ghidra", "assembly", "crash"],
    summary: "Quando o código é fechado, você conversa com o binário. Fuzzing é perguntar em escala.",
    proof: [
      "AFL++",
      "libFuzzer",
      "Harness e corpus",
      "Triagem de crash",
      "Ghidra",
      "Assembly x86-64",
      "Debugger",
      "Projeto: achar um crash novo em alvo de treino"
    ],
    res: [
      ["doc", "Ghidra", "https://ghidra-sre.org/"],
      ["repo", "radare2", "https://github.com/radareorg/radare2"],
      ["curso", "Malware Unicorn RE101", "https://malwareunicorn.org/workshops/re101.html"],
      ["curso", "begin.re", "https://cutter.re/"]
    ]
  },
  "24": {
    num: "24", phase: "advanced", title: "Pesquisa e CVE", labs: 340, weeks: 5,
    tags: ["patch", "diff", "PoC", "divulgação"],
    summary: "A diferença entre usar CVE e entender CVE é ler o patch.",
    proof: [
      "Ler um patch e achar a causa",
      "Diff de versão",
      "Escrever PoC mínimo",
      "Divulgação responsável",
      "Pedido de CVE",
      "Writeup original",
      "Projeto: um CVE ou writeup inédito"
    ],
    res: [
      ["doc", "PortSwigger Research", "https://portswigger.net/research"],
      ["repo", "Exploit-DB", "https://www.exploit-db.com/"],
      ["doc", "MITRE CVE", "https://www.cve.org/"],
      ["doc", "Google Project Zero", "https://googleprojectzero.blogspot.com/"]
    ]
  },
  "25": {
    num: "25", phase: "expert", title: "Bug bounty", labs: 360, weeks: 6,
    tags: ["escopo", "triagem", "relatório", "reteste"],
    summary: "O mundo real não tem flag. Tem prazo, escopo e um triager cansado.",
    proof: [
      "Escolher programa e escopo",
      "Recon contínuo",
      "Triagem e duplicata",
      "Relatório aceito",
      "Comunicação com o time",
      "Reteste",
      "Projeto: um relatório aceito"
    ],
    res: [
      ["doc", "HackerOne Hacktivity", "https://www.hackerone.com/hacktivity"],
      ["curso", "Bugcrowd University", "https://www.bugcrowd.com/university/"],
      ["repo", "Bug Bounty Cheatsheet", "https://github.com/EdOverflow/bugbounty-cheatsheet"],
      ["doc", "PortSwigger Research", "https://portswigger.net/research"]
    ]
  },
  "26": {
    num: "26", phase: "expert", title: "Cloud research", labs: 380, weeks: 6,
    tags: ["IAM", "K8s", "serverless", "containers"],
    summary: "Nuvem é um labirinto de identidade. O caminho de escalada é o produto.",
    proof: [
      "IAM avançado e policy",
      "Kubernetes e escape",
      "Serverless",
      "Containers e runtime",
      "Logging e detecção",
      "Projeto: caminho de escalada documentado"
    ],
    res: [
      ["doc", "HackTricks Cloud", "https://cloud.hacktricks.wiki/"],
      ["doc", "AWS IAM Guide", "https://docs.aws.amazon.com/IAM/latest/UserGuide/"],
      ["doc", "Kubernetes Security", "https://kubernetes.io/docs/concepts/security/"],
      ["repo", "Pacu", "https://github.com/RhinoSecurityLabs/pacu"]
    ]
  },
  "27": {
    num: "27", phase: "expert", title: "Kernel e hardware", labs: 720, weeks: 12,
    tags: ["kernel", "eBPF", "IoT", "mitigações"],
    summary: "O último nível do software antes do silício. Aqui o debugger é a única testemunha.",
    proof: [
      "Kernel: módulos e syscalls",
      "eBPF",
      "Heap do kernel",
      "Mitigações",
      "Hardware e IoT",
      "Firmware",
      "Projeto: PoC de pesquisa próprio"
    ],
    res: [
      ["doc", "Kernel Newbies", "https://kernelnewbies.org/"],
      ["doc", "LWN", "https://lwn.net/"],
      ["repo", "Linux Kernel Exploitation", "https://github.com/xairy/linux-kernel-exploitation"],
      ["doc", "Kernel Docs", "https://www.kernel.org/doc/html/latest/"]
    ]
  },
  "28": {
    num: "28", phase: "expert", title: "IA ofensiva", labs: 360, weeks: 6,
    tags: ["agentes", "RAG", "tools", "avaliação"],
    summary: "Modelos não são mágica. São entrada, contexto e ferramenta — e os três podem ser enganados.",
    proof: [
      "Agentes e planejamento",
      "RAG e contexto",
      "Tool calling",
      "Avaliação de robustez",
      "Defesa e monitoramento",
      "Projeto: ataque a um agente real"
    ],
    res: [
      ["doc", "OWASP LLM Top 10", "https://genai.owasp.org/llm-top-10/"],
      ["doc", "Simon Willison", "https://simonwillison.net/tags/prompt-injection/"],
      ["curso", "Learn Prompting", "https://learnprompting.org/"],
      ["doc", "Prompting Guide", "https://www.promptingguide.ai/"]
    ]
  },
  "29": {
    num: "29", phase: "expert", title: "Projeto final", labs: 500, weeks: 12,
    tags: ["pesquisa", "writeup", "defesa"],
    summary: "Não é um curso. É uma pesquisa que só você faria, com o método que você construiu.",
    proof: [
      "Escolher um tema próprio",
      "Levantar estado da arte",
      "Construir o laboratório",
      "Executar e validar",
      "Escrever o writeup",
      "Apresentar e defender",
      "Projeto: pesquisa original publicada"
    ],
    res: [
      ["repo", "Awesome Pentest", "https://github.com/enaqx/awesome-pentest"],
      ["doc", "PortSwigger Research", "https://portswigger.net/research"],
      ["doc", "Google Project Zero", "https://googleprojectzero.blogspot.com/"],
      ["doc", "HackerOne Hacktivity", "https://www.hackerone.com/hacktivity"]
    ]
  }
});

/* Sub-marcos: o que compõe cada marco. */
const SUBS = {
  "00": ["Sistema e arquivos", "Permissões e processos", "Terminal e automação"],
  "01": ["Usuários e permissões", "Processos e serviços", "Shell e logs"],
  "02": ["Endereçamento e DNS", "TCP, TLS e HTTP", "Captura e proxy"],
  "03": ["Python e scripts", "Web e SQL", "Git e debug"],
  "04": ["Imagem e container", "Compose e rede", "Laboratório local"],
  "05": ["HTML e DOM", "Estado no browser", "DevTools"],
  "06": ["Proxy e CA", "Repeater e Intruder", "Extensões e escopo"],
  "07": ["Injection", "Client-side", "Server-side", "Auth e token"],
  "08": ["DNS e domínio", "Serviços e tech", "OSINT e vazamento"],
  "09": ["Debug e admin", "Storage e backup", "Headers e CORS"],
  "10": ["REST e verbos", "Autorização", "GraphQL e limites"],
  "11": ["Sessão e cookie", "JWT e OAuth", "MFA e reset"],
  "12": ["Race e concorrência", "Preço e cupom", "Fluxo e idempotência"],
  "13": ["IAM e metadata", "Storage e K8s", "CI/CD e escape"],
  "14": ["Kerberos e LDAP", "Roasting e ACL", "ADCS e trusts"],
  "15": ["Túneis", "Movimento lateral", "Enumeração interna"],
  "16": ["APK e código", "Frida e pinning", "Storage e deep link"],
  "17": ["Injection direta", "RAG e indireta", "Agentes e tools"],
  "18": ["Dependência", "Build e artefato", "Assinatura e SBOM"],
  "19": ["Alvo e recon", "Exploração", "Relatório e reteste"],
  "20": ["Stack e canary", "ROP e ASLR", "Heap e format string"],
  "21": ["XSS e CSP", "Prototype e deserialização", "Smuggling e cache"],
  "22": ["AV e EDR", "Ofuscação e C2", "OPSEC e detecção"],
  "23": ["Fuzzing", "Reverse", "Triagem"],
  "24": ["Patch e diff", "PoC", "Divulgação"],
  "25": ["Programa e escopo", "Recon e triagem", "Relatório e reteste"],
  "26": ["IAM", "K8s e runtime", "Serverless"],
  "27": ["Kernel", "eBPF e mitigação", "Hardware e firmware"],
  "28": ["Agentes", "RAG e tools", "Avaliação"],
  "29": ["Tema", "Pesquisa", "Publicação"]
};

for (const [id, sub] of Object.entries(SUBS)) {
  if (window.CURRICULO.nodes[id]) window.CURRICULO.nodes[id].sub = sub;
}

window.CURRICULO.flow = [
  { type: "phase", id: "base" },
  { type: "node", id: "00" },
  { type: "check", text: "explico o que é um processo e onde ficam meus arquivos" },
  { type: "node", id: "01" },
  { type: "check", text: "resolvo Bandit 0–15 sem colar" },
  { type: "node", id: "02" },
  { type: "check", text: "desenho o caminho de uma URL até a resposta" },
  { type: "node", id: "03" },
  { type: "check", text: "escrevo um script de recon que gera relatório" },
  { type: "node", id: "04" },
  { type: "check", text: "subo e derrubo um alvo sem sujar a máquina" },
  { type: "node", id: "30" },
  { type: "check", text: "compilo C, leio assembly e explico uma mitigação" },

  { type: "phase", id: "beginner" },
  { type: "node", id: "05" },
  { type: "node", id: "06" },
  { type: "check", text: "intercepto e repito uma requisição autenticada" },
  { type: "node", id: "07" },
  { type: "check", text: "passo 40 labs do PortSwigger, 10 sem solução" },
  { type: "node", id: "08" },
  { type: "check", text: "monto um mapa de superfície de um domínio" },
  { type: "node", id: "09" },
  { type: "check", text: "acho três achados de configuração com evidência" },
  { type: "node", id: "31" },
  { type: "check", text: "acho três persistências no Windows e provo qual sobrevive ao reboot" },
  { type: "node", id: "33" },
  { type: "check", text: "rodo uma campanha de phishing em lab com métricas e debrief" },

  { type: "phase", id: "inter" },
  { type: "fork", title: "Aqui o caminho bifurca.", desc: "Escolha por onde aprofundar primeiro. As três trilhas continuam abertas; nenhuma é obrigatória para seguir.",
    lanes: [
      { key: "web", name: "Web & API", color: "#3fe0ff", nodes: ["11", "10", "12"] },
      { key: "infra", name: "Infra & Cloud", color: "#ffb020", nodes: ["13", "14", "32", "15"] },
      { key: "produto", name: "Produto & IA", color: "#ff2e63", nodes: ["16", "17", "18"] }
    ] },
  { type: "node", id: "19" },
  { type: "check", text: "entrego um relatório completo com impacto e correção" },

  { type: "phase", id: "advanced" },
  { type: "node", id: "20" },
  { type: "check", text: "escrevo um exploit que funciona sem copiar PoC" },
  { type: "node", id: "21" },
  { type: "node", id: "22" },
  { type: "node", id: "34" },
  { type: "node", id: "35" },
  { type: "check", text: "reconstruo um incidente em timeline e detecto a minha operação" },
  { type: "node", id: "23" },
  { type: "node", id: "36" },
  { type: "node", id: "39" },
  { type: "check", text: "publico um writeup e um advisory em inglês" },
  { type: "node", id: "24" },
  { type: "check", text: "publico um CVE ou writeup original" },

  { type: "phase", id: "expert" },
  { type: "node", id: "25" },
  { type: "node", id: "26" },
  { type: "node", id: "27" },
  { type: "check", text: "escrevo um PoC próprio para um alvo de pesquisa" },
  { type: "node", id: "37" },
  { type: "node", id: "38" },
  { type: "node", id: "28" },
  { type: "node", id: "29" },
  { type: "check", text: "defendo a minha pesquisa numa conversa técnica" }
];

Object.assign(window.CURRICULO.nodes, {
  "30": {
    num: "30", phase: "base", title: "C, assembly e internals", labs: 300, weeks: 6,
    tags: ["C", "x86-64", "gdb", "ELF", "mitigações"],
    summary: "Sem entender memória, exploit vira cópia de PoC. Esta é a base que falta em quase todo curso de web.",
    proof: [
      "Compilar C com gcc/clang e explicar pré-processamento, compilação, assembly e link",
      "Implementar lista ligada, vetor dinâmico e parser com malloc/free",
      "Reproduzir use-after-free e double-free sob ASan",
      "Ler assembly x86-64 de uma função e identificar prólogo, argumentos e ret",
      "Usar gdb: breakpoint, memória, backtrace e alteração de registrador",
      "Explicar o layout de processo (text/data/bss/heap/stack)",
      "Compilar com PIE, canary, RELRO e explicar cada mitigação no checksec",
      "Escrever utilitário em C que lê ELF e lista seções, strings e imports"
    ],
    sub: ["C e memória", "Assembly x86-64", "GDB e binário", "Mitigações"],
    res: [
      ["livro", "CS:APP3e", "https://csapp.cs.cmu.edu/"],
      ["lab", "pwn.college", "https://pwn.college/"],
      ["doc", "Compiler Explorer", "https://godbolt.org/"],
      ["doc", "man7 — Linux man pages", "https://man7.org/linux/man-pages/"]
    ]
  },
  "31": {
    num: "31", phase: "beginner", title: "Windows, PowerShell e endpoint", labs: 260, weeks: 5,
    tags: ["Windows", "PowerShell", "SMB", "Sysinternals"],
    summary: "Metade do mundo corporativo roda Windows. AD sem Windows é decorar nome de ferramenta.",
    proof: [
      "Enumerar usuários, grupos, serviços e tarefas via PowerShell/CIM",
      "Explicar token de acesso e UAC; provar que admin elevado não é SYSTEM",
      "Mapear autorun, serviços e COM hijack no registry",
      "Enumerar shares SMB e explicar signing e null session",
      "Habilitar WinRM, autenticar e executar comando",
      "Escrever script PowerShell com pipeline, erro e logging",
      "Ler 4624, 4625, 4688 e 7045 e montar timeline",
      "Achar persistência com Procmon, Process Explorer e Autoruns"
    ],
    sub: ["Tokens e UAC", "Registry, serviços e WMI", "SMB e WinRM", "Logs e Sysinternals"],
    res: [
      ["doc", "PowerShell Overview", "https://learn.microsoft.com/en-us/powershell/scripting/overview"],
      ["doc", "Sysinternals", "https://learn.microsoft.com/en-us/sysinternals/"],
      ["doc", "Windows Security Log Encyclopedia", "https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/"]
    ]
  },
  "32": {
    num: "32", phase: "inter", title: "Identidade híbrida: Entra ID", labs: 280, weeks: 5,
    tags: ["Entra", "device code", "consent", "PRT"],
    summary: "O AD moderno não está só no domínio. Está no token, no consent e no dispositivo.",
    proof: [
      "Mapear tenant de teste via Graph e ROADtools",
      "Executar device code flow e obter token sem MFA",
      "Fazer consent grant de app e ler mailbox de teste",
      "Replay de access/refresh token e explicar Conditional Access",
      "Identificar conta de sync do Entra Connect e modo PHS/PTA",
      "Explicar PRT, device join e reutilização",
      "Testar gap de Conditional Access e documentar evidência",
      "Entregar attack path híbrido com detecção em sign-in logs"
    ],
    sub: ["Tenant e Graph", "Device code e token theft", "Consent e aplicações", "Híbrido, PRT e CA"],
    res: [
      ["doc", "Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/"],
      ["repo", "ROADtools", "https://github.com/dirkjanm/ROADtools"],
      ["doc", "AADInternals", "https://aadinternals.com/"]
    ]
  },
  "33": {
    num: "33", phase: "beginner", title: "Engenharia social e phishing", labs: 200, weeks: 4,
    tags: ["phishing", "AiTM", "SPF", "DMARC"],
    summary: "O vetor inicial mais comum não é um bug de software. É uma pessoa com pressa.",
    proof: [
      "Construir pretexto e lista de alvos a partir de OSINT",
      "Clonar fluxo de login em lab e capturar credencial e cookie",
      "Montar AiTM com Evilginx e contornar MFA em lab",
      "Verificar SPF, DKIM e DMARC de um domínio",
      "Testar entrega por link, anexo, LNK e HTA",
      "Rodar campanha com GoPhish e medir abertura e clique",
      "Entregar debrief com IOCs e três melhorias",
      "Documentar autorização e destruição de credenciais capturadas"
    ],
    sub: ["Pretexto e OSINT", "Kit e landing page", "AiTM e MFA", "Métricas, debrief e legal"],
    res: [
      ["repo", "GoPhish", "https://github.com/gophish/gophish"],
      ["repo", "Evilginx2", "https://github.com/kgretzky/evilginx2"],
      ["doc", "MITRE ATT&CK T1566", "https://attack.mitre.org/techniques/T1566/"]
    ]
  },
  "34": {
    num: "34", phase: "advanced", title: "DFIR: resposta a incidentes", labs: 300, weeks: 6,
    tags: ["DFIR", "Volatility", "timeline", "custódia"],
    summary: "Saber atacar inclui saber reconstruir o que aconteceu. Sem timeline, não existe incidente.",
    proof: [
      "Adquirir memória e disco com hash e cadeia de custódia",
      "Usar Volatility 3 para processos, rede e hives",
      "Montar timeline com plaso e localizar a primeira execução",
      "Analisar MFT, USN, prefetch, amcache e shimcache",
      "Analisar auth.log, journal, bash history e cron",
      "Executar contenção, erradicação e recuperação",
      "Escrever relatório com timeline, causa raiz e IOCs",
      "Fazer tabletop com detection engineer e propor regras"
    ],
    sub: ["Aquisição e custódia", "Memória e disco", "Timeline e artefatos", "Contenção e relatório"],
    res: [
      ["repo", "Volatility 3", "https://github.com/volatilityfoundation/volatility3"],
      ["doc", "SANS Posters e Cheat Sheets", "https://www.sans.org/posters/"],
      ["doc", "Eric Zimmerman Tools", "https://ericzimmerman.github.io/"]
    ]
  },
  "35": {
    num: "35", phase: "advanced", title: "Wireless, RF e Bluetooth", labs: 200, weeks: 4,
    tags: ["WPA2", "WPA3", "802.1X", "BLE", "SDR"],
    summary: "O cabo é só uma das redes. O ar é compartilhado, invisível e quase sempre mal monitorado.",
    proof: [
      "Capturar handshake WPA2 e quebrar PSK fraca em lab",
      "Executar PMKID e explicar quando funciona",
      "Explicar WPA3/SAE e testar transition mode",
      "Montar evil twin 802.1X e capturar EAP",
      "Testar deauth e explicar 802.11w",
      "Enumerar GATT de BLE e ler/escrever characteristic",
      "Capturar e reproduzir sinal 433 MHz com RTL-SDR",
      "Entregar survey de APs, canais e riscos, sem jamming"
    ],
    sub: ["WPA2/WPA3", "802.1X e evil twin", "BLE", "SDR e replay"],
    res: [
      ["doc", "Aircrack-ng", "https://aircrack-ng.org/"],
      ["doc", "Wi-Fi Alliance Security", "https://www.wi-fi.org/discover-wi-fi/security"],
      ["doc", "RTL-SDR", "https://www.rtl-sdr.com/about-rtl-sdr/"]
    ]
  },
  "36": {
    num: "36", phase: "advanced", title: "Análise de malware", labs: 280, weeks: 5,
    tags: ["malware", "YARA", "sandbox", "C2"],
    summary: "Nem todo ataque é um bug. Às vezes é um executável que faz exatamente o que promete.",
    proof: [
      "Triagem estática: hash, strings, imports, entropia e packer",
      "Analisar PE/ELF: seções, entrypoint e anomalias",
      "Rodar amostra em VM isolada e registrar comportamento",
      "Desempacotar packer simples e dumpar payload",
      "Extrair configuração de C2 e escrever YARA",
      "Emular com CAPA e mapear capacidades no ATT&CK",
      "Escrever relatório com capacidades, IOCs e detecção",
      "Montar lab seguro com snapshot e rede isolada"
    ],
    sub: ["Triagem estática", "Dinâmica e sandbox", "Unpacking e C2", "YARA e relatório"],
    res: [
      ["repo", "FLARE VM", "https://github.com/mandiant/flare-vm"],
      ["repo", "YARA", "https://github.com/VirusTotal/yara"],
      ["doc", "Malware Traffic Analysis", "https://www.malware-traffic-analysis.net/"]
    ]
  },
  "37": {
    num: "37", phase: "expert", title: "OT/ICS e sistemas críticos", labs: 220, weeks: 5,
    tags: ["Purdue", "Modbus", "PLC", "62443"],
    summary: "Em hospital, o ativo não é o dado. É o equipamento que mantém alguém vivo.",
    proof: [
      "Desenhar Purdue e zonas/conduits de um hospital",
      "Ler coils e registers Modbus com pymodbus",
      "Alterar setpoint em PLC (OpenPLC) e ver o efeito simulado",
      "Fazer descoberta passiva com Zeek e explicar por que scan ativo é proibido",
      "Mapear 62443 SL para a arquitetura e listar gaps",
      "Traçar caminho IT→OT via historian e propor segmentação",
      "Escrever regras de detecção para write não autorizado",
      "Montar plano de incidente que preserve segurança do paciente"
    ],
    sub: ["Purdue e 62443", "Modbus e PLC", "IT→OT", "Detecção e resposta"],
    res: [
      ["doc", "NIST SP 800-82r3", "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf"],
      ["doc", "ISA/IEC 62443", "https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards"],
      ["repo", "GRFICSv3", "https://github.com/Fortiphyd/GRFICSv3"]
    ]
  },
  "38": {
    num: "38", phase: "expert", title: "SAP e sistemas corporativos", labs: 240, weeks: 5,
    tags: ["SAP", "NetWeaver", "RFC", "ABAP"],
    summary: "O ERP que ninguém quer testar é o que guarda o dinheiro. E quase nunca está no escopo.",
    proof: [
      "Desenhar NetWeaver: ICM, dispatcher, message server e SAProuter",
      "Enumerar serviços e clientes SAP em lab",
      "Explicar route string de SAProuter e o risco de exposição",
      "Testar usuários padrão e política de senha em lab",
      "Chamar função remote-enabled via RFC e inspecionar auth check",
      "Demonstrar role/profile e S_TCODE ausente em lab",
      "Mapear nota de segurança faltante e validar correção",
      "Entregar relatório de superfície SAP sem tocar produção"
    ],
    sub: ["Arquitetura NetWeaver", "SAProuter e serviços", "RFC/ABAP e autorização", "Patch e relatório"],
    res: [
      ["doc", "SAP Security Notes", "https://support.sap.com/en/my-support/knowledge-base/security-notes-news.html"],
      ["doc", "SAP Help NetWeaver", "https://help.sap.com/docs/SAP_NETWEAVER"],
      ["doc", "Exploit-DB — SAP", "https://www.exploit-db.com/search?q=sap"]
    ]
  },
  "39": {
    num: "39", phase: "advanced", title: "Escrita técnica e pesquisa", labs: 120, weeks: 12,
    tags: ["paper", "advisory", "inglês", "CFP"],
    summary: "Pesquisa que ninguém entende não existe. Escrever é parte do trabalho, não o final dele.",
    proof: [
      "Ler três papers e escrever uma página de resumo crítico",
      "Escrever advisory estilo CVE com versões, causa e PoC",
      "Publicar lab reproduzível que roda em menos de uma hora",
      "Escrever abstract de 150 palavras em inglês",
      "Submeter um CFP e registrar o feedback",
      "Revisar o writeup de um par com rubric",
      "Publicar post técnico com diagrama e timeline",
      "Manter research log com hipóteses e resultados negativos"
    ],
    sub: ["Leitura crítica", "Advisory e writeup", "Reprodutibilidade", "Inglês e CFP"],
    res: [
      ["doc", "Google Technical Writing", "https://developers.google.com/tech-writing"],
      ["doc", "USENIX Author Resources", "https://www.usenix.org/conferences/author-resources"],
      ["doc", "PortSwigger Research", "https://portswigger.net/research"]
    ]
  }
});
