/* black-box — render do caminho, progresso e motion */

const C = window.CURRICULO;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = (n) => new Intl.NumberFormat("pt-BR").format(n);

const flowEl = document.getElementById("flow");
const statLabs = document.getElementById("stat-labs");
const statDone = document.getElementById("stat-done");
const statTotal = document.getElementById("stat-total");
const hudFill = document.getElementById("hud-fill");
const expandAllBtn = document.getElementById("expand-all");
const introSub = document.getElementById("intro-sub");

const totalLabs = Object.values(C.nodes).reduce((a, n) => a + n.labs, 0);
const totalNodes = Object.keys(C.nodes).length;
const totalChecks = C.flow.filter((f) => f.type === "check").length;
if (statTotal) statTotal.textContent = `/${totalNodes}`;

statLabs.textContent = fmt(totalLabs);
if (introSub) {
  introSub.textContent = `${totalNodes} marcos, ${fmt(totalLabs)} labs e ${totalChecks} checkpoints. Sem atalho e sem prazo.`;
}

const TYPE_LABEL = { doc: "doc", repo: "repo", livro: "livro", video: "vídeo", lab: "lab", curso: "curso" };
const ORDER = [];
const byId = C.nodes;
let seq = 0;

/* ------------------------------------------------------------------ */
/* render                                                              */
/* ------------------------------------------------------------------ */

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function renderNode(node, compact = false) {
  const id = node.num;
  const num = String(++seq).padStart(2, "0");
  ORDER.push(id);

  const art = el("article", `node reveal${compact ? " compact" : ""}`);
  art.id = `n-${id}`;
  art.dataset.id = id;

  const marker = el("div", "node-marker");
  marker.appendChild(el("span", null, num));

  const card = el("div", "node-card");
  const top = el("div", "node-top");
  const titles = el("div", "node-titles");
  titles.appendChild(el("span", "node-num", num));
  titles.appendChild(el("h3", null, node.title));
  const meta = el("span", "node-meta mono", `${fmt(node.labs)} labs · ${node.weeks} sem`);
  top.append(titles, meta);

  const summary = el("p", "node-summary", node.summary);

  const tags = el("ul", "tags");
  for (const t of node.tags) tags.appendChild(el("li", null, t));

  const subs = el("ul", "subs");
  for (const s of node.sub || []) subs.appendChild(el("li", null, s));

  const expand = el("button", "expand");
  expand.type = "button";
  expand.setAttribute("aria-expanded", "false");
  expand.setAttribute("aria-controls", `d-${id}`);
  const label = el("span");
  label.innerHTML = `o que eu preciso provar <span class="count">(${node.proof.length})</span>`;
  const sign = el("span", "sign", "+");
  sign.setAttribute("aria-hidden", "true");
  expand.append(label, sign);

  const detail = el("div", "detail");
  detail.id = `d-${id}`;
  const wrap = el("div");
  const inner = el("div", "detail-inner");

  inner.appendChild(el("h4", null, "o que eu preciso provar"));
  const proof = el("ul", "proof");
  for (const item of node.proof) {
    const li = el("li");
    li.appendChild(el("span", null, item));
    const isProject = /^projeto:/i.test(item);
    li.appendChild(el("span", "p-tag", isProject ? "projeto" : "lab"));
    proof.appendChild(li);
  }
  inner.appendChild(proof);

  inner.appendChild(el("h4", null, "para estudar"));
  const res = el("ul", "resources");
  for (const [type, title, url] of node.res) {
    const li = el("li");
    const a = el("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.appendChild(el("span", "r-type", TYPE_LABEL[type] || type));
    a.appendChild(el("span", null, title));
    li.appendChild(a);
    res.appendChild(li);
  }
  inner.appendChild(res);

  const doneRow = el("label", "done-row");
  const check = el("input");
  check.type = "checkbox";
  check.dataset.done = id;
  doneRow.append(check, el("span", null, "marcar como feito"));
  inner.appendChild(doneRow);

  wrap.appendChild(inner);
  detail.appendChild(wrap);

  card.append(top, summary, tags, subs, expand, detail);
  art.append(marker, card);

  expand.addEventListener("click", () => {
    const open = art.classList.toggle("open");
    expand.setAttribute("aria-expanded", String(open));
  });

  check.addEventListener("change", () => {
    if (check.checked) done.add(id); else done.delete(id);
    save();
    refresh();
  });

  return art;
}

function renderCheck(text) {
  const row = el("div", "check reveal");
  const d = el("span", "check-diamond");
  const p = el("p");
  p.innerHTML = `<b>checkpoint</b> — ${text}`;
  row.append(d, p);
  return row;
}

function renderPhase(ph) {
  const sec = el("header", "phase reveal");
  sec.id = `phase-${ph.id}`;
  sec.appendChild(el("span", "phase-num", ph.num));
  const h = el("h2", null, ph.name);
  h.appendChild(el("span", null, ph.sub));
  sec.appendChild(h);
  sec.appendChild(el("p", null, ph.desc));
  return sec;
}

function renderFork(item) {
  const box = el("section", "fork reveal");
  const head = el("div", "fork-head");
  head.appendChild(el("h3", null, item.title));
  head.appendChild(el("p", null, item.desc));
  box.appendChild(head);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "fork-svg");
  svg.setAttribute("viewBox", "0 0 1000 74");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  const paths = [
    "M500,0 C500,40 166,30 166,74",
    "M500,0 L500,74",
    "M500,0 C500,40 834,30 834,74",
  ];
  for (const d of paths) {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d);
    p.classList.add("flow");
    svg.appendChild(p);
  }
  box.appendChild(svg);

  const lanes = el("div", "lanes");
  for (const lane of item.lanes) {
    const div = el("div", "lane");
    div.style.setProperty("--lane", lane.color);
    div.style.setProperty("--phase", lane.color);
    const lh = el("div", "lane-head");
    lh.appendChild(el("h4", null, lane.name));
    const count = lane.nodes.reduce((a, id) => a + byId[id].labs, 0);
    lh.appendChild(el("span", null, `${fmt(count)} labs`));
    div.appendChild(lh);
    for (const id of lane.nodes) div.appendChild(renderNode(byId[id], true));
    lanes.appendChild(div);
  }
  box.appendChild(lanes);

  const join = el("div", "join");
  join.appendChild(el("span", null, "as três trilhas convergem"));
  box.appendChild(join);
  return box;
}

/* ------------------------------------------------------------------ */
/* montar                                                              */
/* ------------------------------------------------------------------ */

let block = null;
for (const item of C.flow) {
  if (item.type === "phase") {
    const ph = C.phases.find((p) => p.id === item.id);
    block = el("section", "phase-block");
    block.dataset.phase = ph.id;
    block.style.setProperty("--phase", ph.color);
    block.appendChild(renderPhase(ph));
    flowEl.appendChild(block);
  } else if (item.type === "node" && block) {
    block.appendChild(renderNode(byId[item.id]));
  } else if (item.type === "check" && block) {
    block.appendChild(renderCheck(item.text));
  } else if (item.type === "fork" && block) {
    block.appendChild(renderFork(item));
  }
}

/* ------------------------------------------------------------------ */
/* progresso                                                           */
/* ------------------------------------------------------------------ */

const STORE = "blackbox.done.v2";
let done = new Set();
try {
  const raw = JSON.parse(localStorage.getItem(STORE) || "[]");
  if (Array.isArray(raw)) done = new Set(raw.map(String));
} catch { /* storage indisponível */ }

function save() {
  try { localStorage.setItem(STORE, JSON.stringify([...done])); } catch { /* noop */ }
}

function refresh() {
  const nodes = ORDER.map((id) => document.querySelector(`.node[data-id="${id}"]`)).filter(Boolean);
  let next = null;

  for (const id of ORDER) {
    if (!done.has(id)) { next = id; break; }
  }

  for (const node of nodes) {
    const id = node.dataset.id;
    node.classList.toggle("done", done.has(id));
    node.classList.toggle("next", id === next);
    const box = node.querySelector('input[data-done]');
    if (box) box.checked = done.has(id);
  }

  const count = ORDER.filter((id) => done.has(id)).length;
  statDone.textContent = String(count);
  hudFill.style.width = `${(count / totalNodes) * 100}%`;
}

/* ------------------------------------------------------------------ */
/* expandir tudo                                                       */
/* ------------------------------------------------------------------ */

if (expandAllBtn) {
  expandAllBtn.addEventListener("click", () => {
    const open = expandAllBtn.getAttribute("aria-pressed") !== "true";
    expandAllBtn.setAttribute("aria-pressed", String(open));
    expandAllBtn.textContent = open ? "recolher tudo" : "expandir tudo";
    document.querySelectorAll(".node").forEach((n) => {
      n.classList.toggle("open", open);
      n.querySelector(".expand")?.setAttribute("aria-expanded", String(open));
    });
  });
}

/* ------------------------------------------------------------------ */
/* reveal + fase ativa + cor ambiente                                  */
/* ------------------------------------------------------------------ */

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

let ambient = hexToRgb("#c9ff3f");

const revealIO = new IntersectionObserver((entries) => {
  let i = 0;
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.style.transitionDelay = `${(i++ % 5) * 45}ms`;
    e.target.classList.add("in");
    revealIO.unobserve(e.target);
  }
}, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

document.querySelectorAll(".reveal").forEach((n) => revealIO.observe(n));

const phaseIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const id = e.target.dataset.phase;
    if (!id) continue;
    const ph = C.phases.find((p) => p.id === id);
    if (!ph) continue;
    ambient = hexToRgb(ph.color);
    document.documentElement.style.setProperty("--phase", ph.color);
    document.querySelectorAll(".rail a").forEach((a) => {
      a.classList.toggle("active", a.dataset.phase === id);
    });
  }
}, { rootMargin: "-42% 0px -50% 0px" });

document.querySelectorAll(".phase-block").forEach((b) => phaseIO.observe(b));

/* ------------------------------------------------------------------ */
/* canvas: fluxos verticais e partículas                               */
/* ------------------------------------------------------------------ */

(function background() {
  const canvas = document.getElementById("bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1, raf = 0, alive = true;
  let streams = [], dots = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    streams = Array.from({ length: 22 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: 40 + Math.random() * 160,
      speed: 0.2 + Math.random() * 0.7,
      alpha: 0.03 + Math.random() * 0.06,
    }));
    dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      v: 0.05 + Math.random() * 0.15,
      a: 0.04 + Math.random() * 0.12,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of streams) {
      if (!reduce) {
        s.y -= s.speed;
        if (s.y + s.len < 0) { s.y = h + s.len; s.x = Math.random() * w; }
      }
      const g = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
      g.addColorStop(0, `rgba(${ambient},0)`);
      g.addColorStop(0.5, `rgba(${ambient},${s.alpha})`);
      g.addColorStop(1, `rgba(${ambient},0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x, s.y + s.len);
      ctx.stroke();
    }

    for (const d of dots) {
      if (!reduce) {
        d.y -= d.v;
        if (d.y < -4) { d.y = h + 4; d.x = Math.random() * w; }
      }
      ctx.fillStyle = `rgba(233,236,230,${d.a})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
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

/* holofote que segue o ponteiro */
(function spotlight() {
  const spot = document.getElementById("spot");
  if (!spot || reduce) return;
  let raf = 0, mx = 0, my = 0;
  window.addEventListener("pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    document.body.classList.add("pointer");
    if (raf) return;
    raf = requestAnimationFrame(() => {
      spot.style.setProperty("--mx", `${mx}px`);
      spot.style.setProperty("--my", `${my}px`);
      raf = 0;
    });
  }, { passive: true });
})();

/* ------------------------------------------------------------------ */
/* boot                                                                */
/* ------------------------------------------------------------------ */

refresh();

const params = new URLSearchParams(location.search);

if (params.has("open")) {
  const t = document.querySelector(`.node[data-id="${params.get("open")}"]`);
  if (t) { t.classList.add("open"); t.querySelector(".expand")?.setAttribute("aria-expanded", "true"); }
}

if (params.has("y")) {
  const y = Number(params.get("y")) || 0;
  setTimeout(() => window.scrollTo(0, y), 300);
}

const hash = location.hash.match(/^#n-(\d+)$/);
if (hash) {
  const target = document.querySelector(`.node[data-id="${hash[1]}"]`);
  if (target) {
    target.classList.add("open");
    target.querySelector(".expand")?.setAttribute("aria-expanded", "true");
    setTimeout(() => target.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }), 150);
  }
}
