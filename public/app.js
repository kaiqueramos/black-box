/* black-box — mapa interativo
   Sem listeners de scroll. Canvas, SVG e pointer events. */

const NS = "http://www.w3.org/2000/svg";
const DESIGN = { w: 1500, h: 840 };
const BOUNDS = { x: 55, y: 150, w: 1445, h: 590 };
const STORE = "blackbox.done";

const LEVELS = [
  {
    id: 0, num: "00", name: "Fundamentos", label: "fundamentos",
    x: 120, y: 420, labs: 15, weeks: 3,
    tags: ["Linux", "HTTP", "TLS", "Git", "Docker", "Python"],
    focus: "Linux, rede e código antes de qualquer exploit. Sem isso, o resto vira decoreba.",
    proof: "Navegar, ler permissão e entender uma requisição sem depender de ferramenta mágica. Termina com um recon passivo completo de um domínio.",
    examples: ["001 linux-sobrevivencia", "004 http-a-fundo", "009 docker-essencial", "014 recon-passivo"],
  },
  {
    id: 1, num: "01", name: "Web clássico", label: "web clássico",
    x: 320, y: 420, labs: 25, weeks: 6,
    tags: ["SQLi", "XSS", "CSRF", "SSRF", "LFI", "Upload", "JWT"],
    focus: "As falhas que ainda derrubam sistema em 2026, uma por uma, com e sem filtro.",
    proof: "Explorar e explicar cada categoria do OWASP Top 10 sem copiar payload. O critério é escrever a correção antes de olhar a solução.",
    examples: ["017 sqli-blind", "023 ssrf-metadata", "027 upload-bypass", "035 jwt-confusao"],
  },
  {
    id: 2, num: "02", name: "APIs e autenticação", label: "apis & auth",
    x: 520, y: 420, labs: 45, weeks: 8,
    tags: ["BOLA", "BFLA", "OAuth", "OIDC", "JWT", "Rate limit"],
    focus: "Onde a maioria dos programas reais falha: autorização, sessão e fluxo de token.",
    proof: "Tomar recurso de outro usuário e demonstrar o impacto com duas contas. É o teste que separa o relatório bom do achado teórico.",
    examples: ["042 bola-usuario", "048 bfla-admin", "055 oauth-redirect", "061 jwt-confusao"],
  },
  {
    id: 3, num: "03", name: "Lógica de negócio", label: "negócio",
    x: 720, y: 420, labs: 25, weeks: 5,
    tags: ["Race condition", "Cupom", "Estoque", "Preço", "Fluxo"],
    focus: "O bug não está no código, está na regra. Nenhuma ferramenta automática acha isso.",
    proof: "Quebrar uma regra de negócio sem usar injection: cupom reutilizado, saldo negativo, pedido fora de ordem.",
    examples: ["070 race-cupom", "074 preco-negativo", "078 fluxo-pagamento", "082 estoque"],
  },
  {
    id: 4, num: "04", name: "Cloud e containers", label: "cloud",
    x: 930, y: 230, labs: 45, weeks: 8,
    tags: ["AWS", "S3", "Kubernetes", "Metadata", "IaC", "CI/CD"],
    focus: "O que vaza quando a aplicação está tecnicamente correta: identidade, metadata e permissão.",
    proof: "Partir de uma SSRF e chegar em credencial de nuvem, ou de um pod e chegar no nó. Sempre com o caminho de correção.",
    examples: ["090 metadata-ssrf", "096 s3-bucket", "104 k8s-rbac", "112 iac-secret"],
  },
  {
    id: 5, num: "05", name: "Supply chain", label: "supply chain",
    x: 1100, y: 230, labs: 20, weeks: 4,
    tags: ["npm", "postinstall", "Artifact", "Assinatura", "Pipeline"],
    focus: "O ataque que começa antes do seu código: dependência, build, artefato e assinatura.",
    proof: "Comprometer a build sem tocar no repositório, e depois detectar o comprometimento do lado de fora.",
    examples: ["120 npm-postinstall", "124 dependency-confusion", "128 artifact-poisoning", "132 pipeline-token"],
  },
  {
    id: 6, num: "06", name: "Active Directory", label: "active directory",
    x: 930, y: 420, labs: 40, weeks: 8,
    tags: ["Kerberos", "LDAP", "NTLM", "ADCS", "BloodHound", "Pivoting"],
    focus: "Sair do web e chegar no domínio. É aqui que o teste deixa de ser sobre um site.",
    proof: "Ir de uma conta comum a Domain Admin em um lab com três redes, documentando cada salto.",
    examples: ["140 kerberoasting", "146 ntlm-relay", "152 adcs-esc1", "160 pivoting"],
  },
  {
    id: 7, num: "07", name: "Mobile e thick client", label: "mobile",
    x: 930, y: 610, labs: 20, weeks: 4,
    tags: ["APK", "Frida", "Pinning", "Storage", "Deep link"],
    focus: "O app mente sobre o que está no servidor. E o cliente confia no que o app diz.",
    proof: "Bypass de certificate pinning, extração de segredo do storage e abuso de deep link para fluxo indevido.",
    examples: ["170 apk-recon", "174 frida-bypass", "178 deep-link", "182 insecure-storage"],
  },
  {
    id: 8, num: "08", name: "LLM e segurança de IA", label: "llm",
    x: 1100, y: 610, labs: 20, weeks: 4,
    tags: ["Prompt injection", "RAG", "Agentes", "Tool abuse", "Vazamento"],
    focus: "Prompt injection é a nova SQLi: entra por texto, sai como ação.",
    proof: "Fazer o bot entregar o que não devia sem tocar no modelo: instrução indireta, envenenamento de contexto e abuso de ferramenta.",
    examples: ["190 system-prompt-leak", "194 indirect-injection", "198 tool-abuse", "202 rag-poisoning"],
  },
  {
    id: 9, num: "09", name: "Detecção e purple team", label: "detecção",
    x: 1100, y: 420, labs: 30, weeks: 6,
    tags: ["Logs", "Sigma", "SIEM", "Hunting", "MITRE"],
    focus: "Saber atacar inclui saber ser visto. Ataque sem detecção é só sorte.",
    proof: "Detectar o meu próprio ataque, escrever a regra e medir o que passou batido.",
    examples: ["210 sigma-rule", "214 log-pipeline", "218 hunting", "222 evasao-basica"],
  },
  {
    id: 10, num: "10", name: "Exploit development", label: "exploit dev",
    x: 1270, y: 610, labs: 30, weeks: 8,
    tags: ["Buffer overflow", "ROP", "Heap", "ASLR", "Browser"],
    focus: "Quando não existe CVE pronto. Memória, registrador e uma boa noite de sono.",
    proof: "Escrever um exploit que funciona sem copiar PoC: da falha ao controle de instrução, com mitigação ligada.",
    examples: ["230 stack-overflow", "235 ret2libc", "240 aslr-leak", "246 heap-uaf"],
  },
  {
    id: 11, num: "11", name: "Mundo real", label: "mundo real",
    x: 1430, y: 420, labs: 20, weeks: 4,
    tags: ["Bug bounty", "Escopo", "Relatório", "Negociação", "Reteste"],
    focus: "Escopo, prazo e relatório. O achado que ninguém entende não vale nada.",
    proof: "Entregar um relatório que o cliente consegue corrigir: impacto em uma frase, evidência reproduzível e prioridade honesta.",
    examples: ["250 escopo", "254 relatorio", "258 triagem", "262 reteste"],
  },
];

const EDGES = [
  [0, 1], [1, 2], [2, 3],
  [3, 4], [4, 5], [5, 11],
  [3, 6], [6, 9], [9, 11],
  [3, 7], [7, 8], [8, 10], [10, 11],
];

const byId = new Map(LEVELS.map((l) => [l.id, l]));

/* ------------------------------------------------------------------ */
/* canvas de fundo                                                     */
/* ------------------------------------------------------------------ */

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

(function background() {
  const canvas = document.getElementById("bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1, raf = 0, pts = [], alive = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      if (!reduce) {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;
      }
      const a = 0.05 + p.z * 0.16;
      ctx.fillStyle = p.z > 0.75
        ? `rgba(201,255,63,${(a * 0.9).toFixed(3)})`
        : `rgba(233,236,230,${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.z * 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduce && alive) raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", () => { resize(); if (reduce) draw(); });
  document.addEventListener("visibilitychange", () => {
    alive = !document.hidden;
    cancelAnimationFrame(raf);
    if (alive && !reduce) raf = requestAnimationFrame(draw);
  });
})();

/* ------------------------------------------------------------------ */
/* mapa                                                                */
/* ------------------------------------------------------------------ */

const stage = document.querySelector(".stage");
const svg = document.getElementById("map");
const zoomIn = document.getElementById("z-in");
const zoomOut = document.getElementById("z-out");
const zoomReset = document.getElementById("z-reset");
const hint = document.getElementById("hint");

let vw = 1, vh = 1;
const cam = { x: 0, y: 0, k: 1 };
let camTween = 0;

const camG = document.createElementNS(NS, "g");
camG.setAttribute("id", "cam");
svg.appendChild(camG);

const edgeEls = new Map();
const nodeEls = new Map();

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function hexPoints(r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(`${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(" ");
}

function edgePath(a, b) {
  const A = byId.get(a), B = byId.get(b);
  if (A.y === B.y) return `M${A.x},${A.y} L${B.x},${B.y}`;
  if (a === 3 && b === 4) return `M${A.x},${A.y} C790,420 860,230 ${B.x},${B.y}`;
  if (a === 5 && b === 11) return `M${A.x},${A.y} C1220,230 1300,420 ${B.x},${B.y}`;
  if (a === 3 && b === 7) return `M${A.x},${A.y} C790,420 860,610 ${B.x},${B.y}`;
  if (a === 10 && b === 11) return `M${A.x},${A.y} C1330,610 1370,420 ${B.x},${B.y}`;
  return `M${A.x},${A.y} L${B.x},${B.y}`;
}

function buildMap() {
  const lanes = [
    { y: 170, label: "web & api" },
    { y: 360 },
    { y: 550, label: "especialista" },
  ];

  for (const lane of lanes) {
    camG.appendChild(svgEl("rect", {
      class: "lane", x: 856, y: lane.y, width: 600, height: 120,
    }));
    if (lane.label) {
      const t = svgEl("text", { class: "branch", x: 1450, y: lane.y + 20 });
      t.textContent = lane.label;
      camG.appendChild(t);
    }
  }

  for (const [a, b] of EDGES) {
    const d = edgePath(a, b);
    const p = svgEl("path", { class: "edge", d, "data-a": a, "data-b": b });
    edgeEls.set(`${a}-${b}`, p);
    camG.appendChild(p);

    if (!reduce) {
      const dot = svgEl("circle", { class: "pulse", r: "2.4", "data-a": a, "data-b": b });
      dot.appendChild(svgEl("animateMotion", {
        dur: `${4 + (a + b) * 0.23}s`,
        begin: `${(a * 0.31).toFixed(2)}s`,
        repeatCount: "indefinite",
        path: d,
      }));
      edgeEls.get(`${a}-${b}`).pulse = dot;
      camG.appendChild(dot);
    }
  }

  for (const lv of LEVELS) {
    const g = svgEl("g", {
      class: "node",
      transform: `translate(${lv.x},${lv.y})`,
      tabindex: "0",
      role: "button",
      "aria-label": `Nível ${lv.num} — ${lv.name}. ${lv.labs} labs.`,
      "data-id": lv.id,
    });

    g.appendChild(svgEl("polygon", { class: "ring", points: hexPoints(50) }));
    g.appendChild(svgEl("circle", { class: "orbit", r: "58" }));

    const inner = svgEl("g", { class: "inner" });
    inner.appendChild(svgEl("polygon", { class: "shape", points: hexPoints(38) }));

    const num = svgEl("text", { class: "num", y: "1" });
    num.textContent = lv.num;
    const label = svgEl("text", { class: "label", y: "62" });
    label.textContent = lv.label;
    inner.append(num, label);
    g.appendChild(inner);

    camG.appendChild(g);
    nodeEls.set(lv.id, g);

    g.addEventListener("click", (e) => { e.stopPropagation(); select(lv.id); });
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(lv.id);
      }
    });
    g.addEventListener("mouseenter", () => highlight(lv.id, true));
    g.addEventListener("mouseleave", () => highlight(lv.id, false));
    g.addEventListener("focus", () => highlight(lv.id, true));
    g.addEventListener("blur", () => highlight(lv.id, false));
  }
}

function highlight(id, on) {
  for (const [a, b] of EDGES) {
    if (a !== id && b !== id) continue;
    const e = edgeEls.get(`${a}-${b}`);
    if (e) e.classList.toggle("active", on);
  }
}

/* ------------------------------- câmera ------------------------------- */

function applyCam() {
  camG.setAttribute("transform", `translate(${cam.x} ${cam.y}) scale(${cam.k})`);
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function fit(instant = true) {
  const mobile = vw < 700;
  const k = mobile ? 0.72 : Math.min(vw / BOUNDS.w, vh / BOUNDS.h) * 0.96;
  const target = mobile
    ? { k, x: vw / 2 - 400 * k, y: vh / 2 - 420 * k }
    : {
        k,
        x: (vw - BOUNDS.w * k) / 2 - BOUNDS.x * k,
        y: (vh - BOUNDS.h * k) / 2 - BOUNDS.y * k,
      };
  if (instant) {
    Object.assign(cam, target);
    applyCam();
  } else {
    tweenCam(target, 480);
  }
}

function tweenCam(target, ms) {
  cancelAnimationFrame(camTween);
  const from = { ...cam };
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  function step(now) {
    const p = Math.min(1, (now - start) / ms);
    const e = ease(p);
    cam.x = from.x + (target.x - from.x) * e;
    cam.y = from.y + (target.y - from.y) * e;
    cam.k = from.k + (target.k - from.k) * e;
    applyCam();
    if (p < 1) camTween = requestAnimationFrame(step);
  }
  camTween = requestAnimationFrame(step);
}

function zoomAt(cx, cy, factor) {
  const k2 = clamp(cam.k * factor, 0.45, 2.6);
  const ratio = k2 / cam.k;
  cam.x = cx - (cx - cam.x) * ratio;
  cam.y = cy - (cy - cam.y) * ratio;
  cam.k = k2;
  applyCam();
}

function focusOn(lv, instant = false) {
  const mobile = window.matchMedia("(max-width: 820px)").matches;
  const availW = mobile ? vw : vw - 430;
  const availH = mobile ? vh * 0.38 : vh;
  const k = Math.max(cam.k, mobile ? 1.05 : 1.08);
  const target = { k, x: availW / 2 - lv.x * k, y: availH / 2 - lv.y * k };
  if (instant) { Object.assign(cam, target); applyCam(); }
  else tweenCam(target, 520);
}

/* ------------------------------- interação ------------------------------- */

const pointers = new Map();
let drag = null;
let pinch = null;
let moved = 0;

svg.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".node")) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (pointers.size === 1) {
    drag = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y };
    moved = 0;
    svg.classList.add("dragging");
  } else if (pointers.size === 2) {
    drag = null;
    const [a, b] = [...pointers.values()];
    pinch = {
      d: Math.hypot(a.x - b.x, a.y - b.y),
      k: cam.k,
      x: cam.x,
      y: cam.y,
      mx: (a.x + b.x) / 2,
      my: (a.y + b.y) / 2,
    };
  }
  svg.setPointerCapture(e.pointerId);
});

svg.addEventListener("pointermove", (e) => {
  if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (pinch && pointers.size >= 2) {
    const [a, b] = [...pointers.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (pinch.d > 0 && d > 0) {
      const r = svg.getBoundingClientRect();
      const cx = pinch.mx - r.left;
      const cy = pinch.my - r.top;
      const k = clamp(pinch.k * (d / pinch.d), 0.45, 2.6);
      cam.k = k;
      cam.x = cx - (cx - pinch.x) * (k / pinch.k);
      cam.y = cy - (cy - pinch.y) * (k / pinch.k);
      applyCam();
    }
    return;
  }

  if (!drag) return;
  const dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
  cam.x = drag.cx + dx;
  cam.y = drag.cy + dy;
  applyCam();
});

function endDrag(e) {
  pointers.delete(e.pointerId);
  if (pointers.size < 2) pinch = null;
  if (!drag) return;
  drag = null;
  svg.classList.remove("dragging");
  if (svg.hasPointerCapture?.(e.pointerId)) svg.releasePointerCapture(e.pointerId);
  if (moved < 6 && document.body.classList.contains("panel-open")) closePanel();
}
svg.addEventListener("pointerup", endDrag);
svg.addEventListener("pointercancel", endDrag);

svg.addEventListener("wheel", (e) => {
  e.preventDefault();
  dismissHint();
  const r = svg.getBoundingClientRect();
  zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 0.89);
}, { passive: false });

zoomIn.addEventListener("click", () => zoomAt(vw / 2, vh / 2, 1.22));
zoomOut.addEventListener("click", () => zoomAt(vw / 2, vh / 2, 0.82));
zoomReset.addEventListener("click", () => fit(false));

/* ------------------------------- painel ------------------------------- */

const panel = document.getElementById("panel");
const pKicker = document.getElementById("p-kicker");
const pTitle = document.getElementById("p-title");
const pMeta = document.getElementById("p-meta");
const pFocus = document.getElementById("p-focus");
const pTags = document.getElementById("p-tags");
const pProof = document.getElementById("p-proof");
const pLabs = document.getElementById("p-labs");
const pMore = document.getElementById("p-more");
const pDone = document.getElementById("p-done");
const pPrev = document.getElementById("p-prev");
const pNext = document.getElementById("p-next");
const pClose = document.getElementById("p-close");
const doneEl = document.getElementById("done");

let current = null;
let done = new Set();

try {
  const raw = JSON.parse(localStorage.getItem(STORE) || "[]");
  if (Array.isArray(raw)) done = new Set(raw.filter((n) => Number.isInteger(n)));
} catch { /* storage indisponível */ }

function save() {
  try { localStorage.setItem(STORE, JSON.stringify([...done])); } catch { /* noop */ }
}

function renderPanel(lv) {
  pKicker.textContent = `nível ${lv.num}`;
  pTitle.textContent = lv.name;
  pMeta.textContent = `${lv.labs} labs · ${lv.weeks} semanas`;
  pFocus.textContent = lv.focus;
  pProof.textContent = lv.proof;
  pTags.replaceChildren(...lv.tags.map((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    return li;
  }));
  pLabs.replaceChildren(...lv.examples.map((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    return li;
  }));
  pMore.open = true;

  const isDone = done.has(lv.id);
  pDone.textContent = isDone ? "feito ✓" : "marcar como feito";
  pDone.setAttribute("aria-pressed", String(isDone));

  pPrev.disabled = lv.id <= 0;
  pNext.disabled = lv.id >= LEVELS.length - 1;
}

function select(id) {
  const lv = byId.get(id);
  if (!lv) return;
  current = lv;

  nodeEls.forEach((n) => n.classList.remove("sel"));
  nodeEls.get(id)?.classList.add("sel");

  renderPanel(lv);
  document.body.classList.add("panel-open");
  panel.setAttribute("aria-hidden", "false");
  pTitle.focus({ preventScroll: true });
  focusOn(lv);
  dismissHint();
  history.replaceState(null, "", `#level-${id}`);
}

function closePanel() {
  document.body.classList.remove("panel-open");
  history.replaceState(null, "", location.pathname + location.search);
  panel.setAttribute("aria-hidden", "true");
  nodeEls.forEach((n) => n.classList.remove("sel"));
  const id = current?.id;
  current = null;
  if (id != null) nodeEls.get(id)?.focus({ preventScroll: true });
}

function refresh() {
  doneEl.textContent = String(done.size);

  let next = null;
  for (const lv of LEVELS) {
    if (!done.has(lv.id)) { next = lv.id; break; }
  }

  for (const lv of LEVELS) {
    const el = nodeEls.get(lv.id);
    if (!el) continue;
    el.classList.toggle("done", done.has(lv.id));
    el.classList.toggle("next", lv.id === next);
  }

  for (const [a, b] of EDGES) {
    const el = edgeEls.get(`${a}-${b}`);
    if (!el) continue;
    el.classList.toggle("done", done.has(a) && done.has(b));
    if (el.pulse) el.pulse.classList.toggle("on", a === next && !done.has(a));
  }

  const status = document.getElementById("status");
  if (status) {
    status.innerHTML = next == null
      ? "<b>tudo feito.</b>"
      : `próximo · <b>${byId.get(next).num} ${byId.get(next).name.toLowerCase()}</b>`;
  }
}

pClose.addEventListener("click", closePanel);
pDone.addEventListener("click", () => {
  if (!current) return;
  const id = current.id;
  if (done.has(id)) done.delete(id);
  else done.add(id);
  save();
  renderPanel(current);
  refresh();
  if (done.has(id)) {
    const el = nodeEls.get(id);
    el?.classList.add("burst");
    setTimeout(() => el?.classList.remove("burst"), 520);
  }
});

/* holofote que segue o ponteiro */
(function spotlight() {
  const spot = document.getElementById("spot");
  if (!spot || reduce) return;
  let raf = 0;
  let mx = 0, my = 0;
  window.addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    document.body.classList.add("pointer");
    if (raf) return;
    raf = requestAnimationFrame(() => {
      spot.style.setProperty("--mx", `${mx}px`);
      spot.style.setProperty("--my", `${my}px`);
      raf = 0;
    });
  }, { passive: true });
})();
pPrev.addEventListener("click", () => current && select(Math.max(0, current.id - 1)));
pNext.addEventListener("click", () => current && select(Math.min(LEVELS.length - 1, current.id + 1)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("panel-open")) {
    e.preventDefault();
    closePanel();
  }
});

/* ------------------------------- hint ------------------------------- */

let hintGone = false;
function dismissHint() {
  if (hintGone || !hint) return;
  hintGone = true;
  hint.classList.add("gone");
}

/* ------------------------------- boot ------------------------------- */

function resize() {
  const r = stage.getBoundingClientRect();
  vw = Math.max(1, r.width);
  vh = Math.max(1, r.height);
  svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
  fit(true);
  if (document.body.classList.contains("panel-open") && current) focusOn(current, true);
}

buildMap();
refresh();
resize();
window.addEventListener("resize", resize);

const deep = location.hash.match(/^#level-(\d+)$/);
if (deep) {
  const id = Number(deep[1]);
  if (byId.has(id)) setTimeout(() => select(id), 120);
}
