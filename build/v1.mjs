// v1 — RushTranslate 1:1 structure, Andromeda content. Run: node build/v1.mjs
import fs from 'node:fs';
import path from 'node:path';
import { lc, BRAND, SERVICES, svc, PROCESS, TRUST, CREDENTIALS, DOCS, USE_CASES, LANGS, INDUSTRIES, REQUIREMENTS, FAQ_HOME, CTA_FEATURES } from './data.mjs';
import { ic, UC_ICON, social } from './icons.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'v1');
const BUILD = Date.now().toString(36);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DOC_ICON = { 'file-text': 'file-text', flask: 'flask', pill: 'pill', chart: 'chart', book: 'book', bulb: 'bulb', signature: 'signature', coins: 'coins', cog: 'cog', stamp: 'stamp' };

// ---------- shared chrome ----------
function head({ title, desc, depth }) {
  const a = '../'.repeat(depth + 1); // to site root (assets)
  return `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="${a}assets/img/certificados.jpg">
<link rel="icon" href="${a}assets/brand/icon.svg"><meta name="theme-color" content="#fafaf7">
<link rel="preload" href="${a}assets/brand/AvantGardeBook.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="${a}assets/css/lead.css?v=${BUILD}"><link rel="stylesheet" href="${a}assets/css/v1.css?v=${BUILD}">
<script>window.ASSET_ROOT=${JSON.stringify(a)}</script></head><body>
<a class="skip" href="#main">Saltar al contenido</a>`;
}

function nav(depth, onDark = false) {
  const a = '../'.repeat(depth + 1), r = '../'.repeat(depth); // r = v1 root
  const offer = (s) => `<a class="offer-card" href="${r}index.html#soluciones" style="background-image:url('${a}assets/img/sm/${{ tradmagia: 'equipo', tradiah: 'revisor', expertos: 'uc-clinica', perito: 'hero-seal' }[s.id]}.jpg')"><div><p class="t">${s.name}</p><p class="d">${s.kind}</p></div><div class="f"><p class="mb-0">$${s.price} <span>/ ${s.unit}</span></p><span class="ico">${ic('arrow-right', 16)}</span></div></a>`;
  const langLinks = LANGS.map((l) => `<li><a href="${r}idiomas/${l.slug}.html"><span class="flag">${l.flag}</span>${l.name}</a></li>`).join('');
  const ucLinks = USE_CASES.map((u) => `<li><a href="${r}casos/${u.slug}.html">${u.card}</a></li>`).join('');
  const docLinks = DOCS.map((d) => `<li><a href="${r}casos/${d.uc}.html">${d.t}</a></li>`).join('');
  const indLinks = INDUSTRIES.map((n, i) => `<li><a href="${r}casos/${['investigacion-clinica', 'registros-cofepris', 'legal-pericial', 'financiera-auditoria', 'manuales-tecnicos', 'licitaciones-gobierno'][i]}.html">${n}</a></li>`).join('');
  const rail = [['idiomas', 'Idiomas', 'Inglés, portugués y 6 más'], ['documentos', 'Documentos', 'Documentos que traducimos'], ['casos', 'Casos de uso', 'Cómo se usan nuestras traducciones'], ['industrias', 'Industrias', 'Traducción especializada por sector']];
  return `<nav class="navbar${onDark ? ' on-dark' : ''}" aria-label="Principal"><div class="nav-wrap">
  <a class="brand" href="${r}index.html" aria-label="Andromeda — inicio"><img class="logo-c" src="${a}assets/brand/logo-color.svg" alt="Andromeda" width="150" height="23"><img class="logo-w" src="${a}assets/brand/logo-white.svg" alt="" width="150" height="23"></a>
  <ul class="nav-main">
    <li class="nav-item has-menu"><button class="nav-link" aria-expanded="false" aria-haspopup="true">Servicios <span class="chev">${ic('chev', 16)}</span></button>
      <div class="dropdown mega-services"><div class="split"><p class="col-head">Soluciones de traducción</p><div class="offer-grid">${SERVICES.map(offer).join('')}</div></div>
      <div class="split"><p class="col-head">Para corporativos</p><ul class="icon-list">
        <li><a href="#" data-lead data-lead-need="Otro"><span class="ib">${ic('briefcase', 22)}</span><span><p class="tt">Cuentas recurrentes</p><p class="dd">Glosario, prioridad y acuerdos marco</p></span></a></li>
        <li><a href="${r}index.html#proceso"><span class="ib">${ic('shield', 22)}</span><span><p class="tt">Proceso y control de calidad</p><p class="dd">Doble revisión y validación terminológica</p></span></a></li>
        <li><a href="#" data-lead data-lead-svc="Perito"><span class="ib">${ic('gavel', 22)}</span><span><p class="tt">Traducción pericial</p><p class="dd">Perito autorizado por el CJF o el TSJ CDMX</p></span></a></li>
      </ul></div></div></li>
    <li class="nav-item has-menu"><button class="nav-link" aria-expanded="false" aria-haspopup="true">Soluciones <span class="chev">${ic('chev', 16)}</span></button>
      <div class="dropdown mega-solutions"><div class="sol-rail">${rail.map((x, i) => `<button type="button" class="${i ? '' : 'is-active'}" data-pane="${x[0]}"><span><span class="tt">${x[1]}</span><span class="dd">${x[2]}</span></span><i>${ic('chev-right', 18)}</i></button>`).join('')}</div>
        <div><div class="sol-pane is-active" data-pane="idiomas"><p class="col-head">Idiomas</p><ul>${langLinks}</ul><a class="all" href="${r}idiomas/index.html">Ver todos los idiomas ${ic('arrow-right', 16)}</a></div>
        <div class="sol-pane" data-pane="documentos"><p class="col-head">Documentos</p><ul>${docLinks}</ul><a class="all" href="${r}casos/index.html">Ver todos los casos de uso ${ic('arrow-right', 16)}</a></div>
        <div class="sol-pane" data-pane="casos"><p class="col-head">Casos de uso</p><ul>${ucLinks}</ul><a class="all" href="${r}casos/index.html">Ver todos los casos de uso ${ic('arrow-right', 16)}</a></div>
        <div class="sol-pane" data-pane="industrias"><p class="col-head">Industrias</p><ul>${indLinks}</ul><a class="all" href="${r}casos/index.html">Ver todas las industrias ${ic('arrow-right', 16)}</a></div></div></div></li>
    <li class="nav-item has-menu"><button class="nav-link" aria-expanded="false" aria-haspopup="true">Recursos <span class="chev">${ic('chev', 16)}</span></button>
      <div class="dropdown mega-resources"><ul class="icon-list">
        <li><a href="${r}index.html#nosotros"><span class="ib">${ic('building', 22)}</span><span><p class="tt">Sobre Andromeda</p><p class="dd">Desde 2002 en la Ciudad de México</p></span></a></li>
        <li><a href="${r}index.html#proceso"><span class="ib">${ic('refresh', 22)}</span><span><p class="tt">Cómo trabajamos</p><p class="dd">Del documento al entregable</p></span></a></li>
        <li><a href="${r}index.html#preguntas"><span class="ib">${ic('shield', 22)}</span><span><p class="tt">Garantía de calidad</p><p class="dd">Corrección o reembolso</p></span></a></li>
        <li><a href="${r}index.html#soluciones"><span class="ib">${ic('tag', 22)}</span><span><p class="tt">Tarifas</p><p class="dd">Precio por palabra y descuentos</p></span></a></li>
      </ul></div></li>
    <li class="nav-item"><a class="nav-link" href="${r}index.html#soluciones">Tarifas</a></li>
    <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
  </ul>
  <div class="nav-cta"><a class="btn btn-outline" href="#" data-lead>Cotizar</a><a class="btn btn-primary" href="#" data-lead>Agenda una cita</a></div>
  <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" data-open='${ic('menu', 24)}' data-close='${ic('x', 24)}'>${ic('menu', 24)}</button>
</div></nav>
<div class="m-nav" id="m-nav">
  <details><summary>Servicios <span class="chev">${ic('chev', 18)}</span></summary><div class="m-sub">${SERVICES.map((s) => `<a href="${r}index.html#soluciones">${s.name} · $${s.price}/palabra</a>`).join('')}<a href="#" data-lead>Cuentas recurrentes</a></div></details>
  <details><summary>Idiomas <span class="chev">${ic('chev', 18)}</span></summary><div class="m-sub">${LANGS.map((l) => `<a href="${r}idiomas/${l.slug}.html">${l.flag} ${l.name}</a>`).join('')}<a href="${r}idiomas/index.html">Ver todos</a></div></details>
  <details><summary>Casos de uso <span class="chev">${ic('chev', 18)}</span></summary><div class="m-sub">${USE_CASES.map((u) => `<a href="${r}casos/${u.slug}.html">${u.card}</a>`).join('')}<a href="${r}casos/index.html">Ver todos</a></div></details>
  <a href="${r}index.html#soluciones">Tarifas</a><a href="${r}index.html#preguntas">Preguntas frecuentes</a><a href="#contacto">Contacto</a>
  <div class="m-cta"><a class="btn btn-outline" href="#" data-lead>Cotizar</a><a class="btn btn-primary" href="#" data-lead>Agenda una cita</a></div>
</div>`;
}

const ctaBtns = (o = {}) => `<div class="btn-row"><a class="btn btn-primary btn-lg btn-arrow" href="#" data-lead ${o.attrs || ''}>${o.primary || 'Agenda una cita'}<i>${ic('arrow-right', 18)}</i></a><a class="btn btn-outline btn-arrow${o.darkOutline ? ' btn-ghost-dark' : ''}" href="#" data-lead ${o.attrs || ''}>${ic('file-text', 16)} Cotizar<i>${ic('arrow-right', 16)}</i></a></div>`;
const rating = () => `<div class="rating"><span class="stamp">${ic('gavel', 16)} Peritos autorizados</span><span class="sep"></span><span>${BRAND.years} años · desde ${BRAND.since}</span></div>`;
const trustRow = () => `<div class="container"><div class="trust-row"><ul>${TRUST.map((t) => `<li><span class="ti">${ic(t.icon, 26, 1.3)}</span>${t.t}</li>`).join('')}</ul></div></div>`;

function servicesSection(depth) {
  const card = (s) => `<a class="svc t-${s.tone}" href="#" data-lead data-lead-svc="${esc(s.name.split(' ')[0])}"><div class="wrap">
    <div class="top"><div><h3 class="name">${s.name}</h3><p class="kind">${s.kind}</p><p class="desc">${s.short}</p></div>
    <div class="price"><b>$${s.price}</b><span>MXN por ${s.unit}</span><br><em>$${s.first} en tu primer proyecto</em></div></div>
    <div class="btn-row"><span class="btn btn-white">Agenda una cita</span><span class="btn btn-ghost-dark">Cotizar</span></div>
    <ul>${s.bullets.map((b) => `<li><span class="ck">${ic('check', 12, 2.4)}</span>${b}</li>`).join('')}</ul></div></a>`;
  return `<section class="sec-services" id="soluciones"><div class="container">
  <div class="sec-head"><p class="overline">Nuestras soluciones</p><h2 class="h3">Traducción exacta.<br>Entregas a tiempo.</h2><p>Cuatro soluciones de traducción escrita, de la híbrida optimizada a la pericial certificada, con tarifa por palabra y garantía de calidad.</p></div>
  <div class="svc-grid">${SERVICES.map(card).join('')}</div>
  <a class="business-link" href="#" data-lead><div><h3>Cuentas recurrentes para corporativos</h3><p>Glosarios y consistencia entre documentos, prioridad en urgencias y descuentos por volumen de 10% a 30% para equipos que traducen todos los días.</p></div><span class="go">Conocer más <span>${ic('arrow-right', 16)}</span></span></a>
  </div></section>`;
}

// rushtranslate "Trusted by top companies" — real client logos from Andromeda's own deck (slide "Clientes principales")
const LOGOS = [['roche', 'Roche'], ['novartis', 'Novartis'], ['bayer', 'Bayer'], ['sanofi', 'Sanofi'], ['gsk', 'GSK'], ['msd', 'MSD'], ['abbvie', 'AbbVie'], ['lilly', 'Lilly'], ['jnj', 'Johnson & Johnson']];
function brandTrust(depth = 0) {
  const a = '../'.repeat(depth + 1);
  return `<section class="brand-trust" id="nosotros"><div class="container"><div class="wrapper"><div class="trust-headline"><p>Con la confianza de empresas líderes</p></div>
  <div class="trust-icons"><ul>${LOGOS.map(([f, n]) => `<li><img src="${a}assets/logos/${f}.png" alt="${n}" loading="lazy"></li>`).join('')}</ul></div></div></div></section>`;
}

const DOC_SHORT = { 'Dosieres de registro sanitario': 'Dosieres sanitarios', 'Consentimientos informados': 'Consentimientos' };
function docCard(r, cloud = false) {
  const pills = DOCS.map((d) => `<a class="pill" href="${r}casos/${d.uc}.html"><i>${ic(DOC_ICON[d.i], 14)}</i>${DOC_SHORT[d.t] || d.t}</a>`).join('');
  return cloud ? `<div class="doc-cloud">${pills}</div>` : `<div class="doc-card"><div class="grid">${pills}</div></div>`;
}
function casesRail(r, a) {
  return `<div class="cases-shell"><ul class="cases">${USE_CASES.map((u) => `<li><a href="${r}casos/${u.slug}.html"><img src="${a}assets/img/sm/${u.img}.jpg" alt="" loading="lazy"><span class="cap">${u.card}</span></a></li>`).join('')}</ul></div>`;
}

function whatWeOffer(depth) {
  const r = '../'.repeat(depth), a = '../'.repeat(depth + 1);
  return `<section class="what-we-offer"><div class="container">
  <div class="offer-row"><div class="txt"><h2>Traducción entre 8 idiomas y el español</h2><p>Inglés es nuestro par principal, con traducción pericial. También traducimos portugués, francés, italiano, alemán, japonés, chino y ruso, con revisión de un segundo traductor especialista.</p><a class="link-arrow" href="${r}idiomas/index.html">Ver todos los idiomas <span class="dot">${ic('arrow-right', 13, 2)}</span></a></div>
    <div class="vis"><div class="lang-card"><div class="map"></div><div class="pills">${LANGS.map((l) => `<a class="pill" href="${r}idiomas/${l.slug}.html"><span class="flag">${l.flag}</span>${l.name}</a>`).join('')}</div></div></div></div>
  <div class="offer-row rev"><div class="txt"><h2>Traduce cualquier documento corporativo</h2><p>Asignamos tus documentos a traductores con experiencia en tu industria, con atención al detalle en terminología, significado y formato.</p><a class="link-arrow" href="${r}casos/index.html">Ver documentos comunes <span class="dot">${ic('arrow-right', 13, 2)}</span></a></div>
    <div class="vis">${docCard(r)}</div></div>
  <div class="uc-wrap"><h2>Traducción para cada caso de uso</h2><p>Legal, regulatorio, clínico, financiero y técnico: traducciones exactas para documentos que no admiten errores.</p><a class="link-arrow" href="${r}casos/index.html">Explorar casos de uso <span class="dot">${ic('arrow-right', 13, 2)}</span></a></div>
  ${casesRail(r, a)}
  </div></section>`;
}

const callout = () => `<section class="brand-callout"><div class="container"><p class="headline-gradient">Exacta. Certificada. A tiempo.</p></div></section>`;

function howItWorks(depth = 0) {
  const a = '../'.repeat(depth + 1);
  const mocks = [
    `<div class="mock mock-up"><div class="h">Tu documento</div><div class="drop">${ic('upload', 18)}<br>Arrastra tus archivos aquí<b>Subir documento</b></div></div>`,
    `<div class="mock mock-prog"><span class="ib">${ic('refresh', 18)}</span><div style="flex:1"><div>Traducción en revisión</div><div style="color:var(--muted);font-size:11px">Segundo traductor especialista</div><div class="bar"><i></i></div></div></div>`,
    `<div class="mock mock-done" style="position:relative"><div class="r"><span class="ok">${ic('check', 11, 3)}</span>Tu traducción está lista</div><div class="f"><span>${ic('file-text', 14)} Contrato_ES.pdf</span><b>Descargar</b></div><span class="seal">PERITO</span></div>`,
  ];
  return `<section class="how-it-works" id="proceso"><div class="container"><div class="sec-head"><h2 class="h3">Cómo funciona</h2><p>Envía tu documento, nosotros traducimos y revisamos, y recibes tu entregable listo para usar.</p></div>
  <div class="steps">${PROCESS.map((s, i) => `<div class="step step-${i + 1}"><div><span class="num">${s.n}</span><p class="h6">${s.t}</p><p>${s.d}</p></div><div class="t-card"><div class="bg" style="background-image:url('${a}assets/img/sm/hiw-${i + 1}.jpg')"></div><div class="anim">${mocks[i]}</div></div></div>`).join('')}</div></div></section>`;
}

function reviews(depth) {
  const card = ([q, w]) => `<div class="req"><div class="q">“</div><p>${q}</p><div class="who"><span>${ic('briefcase', 14)}</span>${w}</div></div>`;
  const RQ = REQUIREMENTS, col = (arr, cls = '') => `<div class="faded ${cls}"><div class="col-track">${arr.map(card).join('')}</div></div>`;
  return `<section class="reviews"><div class="reviews-wide"><div class="grid">
  <div class="side">${col([RQ[8], RQ[9], RQ[10], RQ[11]], 'outer')}${col(RQ.slice(0, 4))}</div>
  <div class="review-info"><p class="overline">Lo que exige un corporativo</p><h2 class="h3">Aliados de <span class="headline-gradient">16 de las 20</span> farmacéuticas líderes</h2><p class="mt-3">Desde 2002 traducimos desde comunicados internos hasta contratos, patentes y proyectos regulatorios y de investigación clínica. Esto es lo que nos piden antes de aprobarnos como proveedor, y cómo lo cubrimos.</p>
    <div class="snip">${ic('gavel', 15)} Peritos autorizados <span class="sep"></span> ${BRAND.years} años</div><br><a class="btn btn-outline btn-lg btn-arrow" href="#" data-lead>Agenda una cita<i>${ic('arrow-right', 18)}</i></a>
    <div class="reviews-mobile">${REQUIREMENTS.slice(0, 8).map(card).join('')}</div></div>
  <div class="side">${col(RQ.slice(4, 8))}${col([RQ[3], RQ[1], RQ[9], RQ[6]], 'outer')}</div>
  </div></div></section>`;
}

function faq(items, title = 'Preguntas frecuentes', sub = 'Respuestas sobre cómo trabajamos, tarifas, tiempos de entrega, validez pericial y garantía de calidad.') {
  return `<section class="faq" id="preguntas"><div class="container"><div class="row"><div class="l"><h2>${title}</h2><p>${sub}</p></div>
  <div class="r">${items.map(([q, a], i) => `<div class="faq-card"><button aria-expanded="false" aria-controls="fq${i}">${q}${ic('chev', 18)}</button><div class="faq-body" id="fq${i}"><div><p>${a}</p></div></div></div>`).join('')}</div></div></div></section>`;
}

function darkFooter(depth, attrs = '') {
  const r = '../'.repeat(depth), a = '../'.repeat(depth + 1);
  return `<section class="dark-sec" id="contacto"><div class="container">
  <h2>Comienza hoy<br>tu traducción</h2>${ctaBtns({ darkOutline: true, attrs })}
  <div class="feat-row">${CTA_FEATURES.map(([i, t, d]) => `<div class="feat"><div class="t"><span>${ic(i, 15)}</span>${t}</div><p>${d}</p></div>`).join('')}</div>
  <hr class="fade-hr">
  <footer class="footer"><div class="brand-col"><img src="${a}assets/brand/logo-white.svg" alt="Andromeda" width="160" height="25"><p>Traducción especializada y pericial.<br>Exacta, certificada y a tiempo.</p>
    <div class="contact"><a href="tel:${BRAND.phoneHref}">${ic('phone', 13)} ${BRAND.phone}</a><a href="mailto:${BRAND.email}">${ic('mail', 13)} ${BRAND.email}</a></div>
    <div class="socials">${BRAND.socials.map(([k, n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${social(k, 18)}</a>`).join("")}</div>
    <p class="legal-links"><a href="#" data-lead>Contacto</a> | <a href="${r}index.html#preguntas">Garantía</a> | <a href="${r}index.html#soluciones">Tarifas</a></p>
    <p class="copy">© ${new Date().getFullYear()} ${BRAND.legal}</p></div>
  <div><h4>Servicios</h4><ul>${SERVICES.map((s) => `<li><a href="${r}index.html#soluciones">${s.name}</a></li>`).join('')}</ul><h4>Para corporativos</h4><ul><li><a href="#" data-lead>Cuentas recurrentes</a></li><li><a href="${r}index.html#proceso">Control de calidad</a></li><li><a href="${r}casos/legal-pericial.html">Traducción pericial</a></li></ul></div>
  <div><h4>Soluciones</h4><ul><li><a href="${r}idiomas/index.html">Por idioma</a></li><li><a href="${r}casos/index.html">Por documento</a></li><li><a href="${r}casos/index.html">Por caso de uso</a></li><li><a href="${r}casos/index.html">Por industria</a></li></ul><h4>Recursos</h4><ul><li><a href="${r}index.html#proceso">Cómo trabajamos</a></li><li><a href="${r}index.html#preguntas">Preguntas frecuentes</a></li><li><a href="https://wa.me/${BRAND.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
  <div><h4>Andromeda</h4><ul><li><a href="${r}index.html#nosotros">Nosotros</a></li><li><a href="#" data-lead>Agenda una cita</a></li>${BRAND.sites.map((s) => `<li><a href="https://${s}" target="_blank" rel="noopener">${s}</a></li>`).join('')}<li><a href="https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}" target="_blank" rel="noopener">Vértiz Narvarte, CDMX</a></li></ul></div>
  </footer>
  </div></section>
<script src="${a}assets/js/lead.js?v=${BUILD}" defer></script><script src="${a}assets/js/v1.js?v=${BUILD}" defer></script></body></html>`;
}

function serviceCompare(ids, intro) {
  const list = ids.map(svc);
  const col = (s) => `<div class="cmp-col"><div class="cmp-head t-${s.tone}"><p class="n">${s.name}</p><p class="d">${s.short}</p><p class="p">$${s.price} <small>MXN / palabra</small></p>
    <a class="btn btn-white" href="#" data-lead data-lead-svc="${esc(s.name.split(' ')[0])}">Agenda una cita</a><div class="sub"><a class="btn btn-ghost-dark" href="#" data-lead>Cotizar</a><a class="btn btn-ghost-dark" href="#soluciones-detalle">Detalles</a></div></div>
    <div class="cmp-box"><p class="lbl">Estilo y formato</p><ul><li><span class="ck">${ic('layers', 15)}</span>${s.style}</li><li><span class="ck">${ic('file-text', 15)}</span>${s.format}</li></ul></div>
    <div class="cmp-box"><p class="lbl">Incluye</p><ul>${s.included.map((x) => `<li><span class="ck">${ic('check', 15, 2)}</span>${x}</li>`).join('')}</ul></div>
    <div class="cmp-box"><p class="lbl">Opcional</p><ul>${s.addons.map((x) => `<li><span class="pl">${ic('plus', 15)}</span>${x}</li>`).join('')}</ul></div></div>`;
  const cls = list.length === 4 ? ' four' : list.length === 3 ? ' three' : '';
  return `<section class="svc-compare" id="soluciones-detalle"><div class="container"><div class="cmp-shell${cls}"><div class="cmp-intro"><h2>Nuestras soluciones</h2><p>${intro}</p><p>Las tarifas corresponden a inglés → español en servicio regular. Si no sabes qué solución necesitas, <a href="#" data-lead>agenda una cita</a> y te recomendamos la correcta.</p></div>${list.map(col).join('')}</div></div></section>`;
}

const write = (rel, html) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };

// ---------- HOME ----------
function home() {
  const d = 0, a = '../';
  return head({ title: 'Andromeda — Traducción pericial y especializada para corporativos', desc: 'Traducción pericial y especializada para legal, farmacéutica, financiera y técnica. Peritos autorizados por el CJF y el TSJ CDMX. 24 años de experiencia.', depth: d }) + nav(d) + `<main id="main">
<header class="page-lead"><div class="container"><div class="lead-row">
  <div class="lead-copy"><h1>Traducción especializada <span class="headline-gradient">y certificada</span></h1>
    <p class="lead">Legal, regulatorio, financiero y técnico, con validez cuando se requiere y terminología consistente. Opción 100% humana o híbrida (IA + revisión experta). Desde $0.15 MXN por palabra y 30% de descuento en tu primer proyecto.</p>
    ${ctaBtns()}${rating()}</div>
  <div class="collage"><div class="tile t1"><img src="${a}assets/img/hero-perito.jpg" alt="Perito traductora revisando un contrato bilingüe" fetchpriority="high"></div><div class="tile t2"><img src="${a}assets/img/hero-seal.jpg" alt="Sello oficial sobre un documento traducido"></div><div class="tile t3"><img src="${a}assets/img/hero-cdmx.jpg" alt="Paseo de la Reforma, Ciudad de México"></div></div>
</div></div>${trustRow()}</header>
${servicesSection(d)}${brandTrust(d)}${whatWeOffer(d)}${callout()}${howItWorks(d)}${reviews(d)}${faq(FAQ_HOME)}</main>${darkFooter(d)}`;
}

// ---------- USE CASE ----------
function useCase(u) {
  const d = 1, a = '../../', r = '../';
  const attrs = `data-lead-need="${esc(u.card)}"`;
  const why = [
    ['Especialistas por industria', 'Traductores con experiencia en tu sector y un segundo revisor con más de 15 años de experiencia.'],
    ['Capacidad y rapidez', 'Hasta 500,000 palabras en 24 horas con Tradmagia® y servicio urgente en todas las soluciones.'],
    ['Terminología consistente', 'Glosarios y bases terminológicas creados con expertos del sector, y apego a tus glosarios.'],
    ['Confidencialidad', 'Manejo controlado de información sensible para que Legal, Cumplimiento y Finanzas aprueben sin fricción.'],
    ['Garantía de calidad', 'Corrección de cualquier error sin costo o reembolso ante una inconformidad persistente.'],
  ];
  return head({ title: `${u.name} — Andromeda`, desc: u.lead, depth: d }) + nav(d, true) + `<main id="main">
<header class="page-lead dark"><div class="container"><div class="lead-row">
  <div class="lead-copy"><a class="back-link" href="${r}casos/index.html">${ic('arrow-left', 16)} Todos los casos de uso</a><h1><span class="headline-gradient">${u.h1a}</span><br>${u.h1b}</h1><p class="lead">${u.lead}</p>${ctaBtns({ darkOutline: true, attrs })}${rating()}</div>
  <div class="collage collage-stagger"><div class="tile t1"><img src="${a}assets/img/${u.img}.jpg" alt="" fetchpriority="high"></div><div class="tile t2"><img src="${a}assets/img/sm/${u.img2}.jpg" alt=""></div><div class="tile t3"><img src="${a}assets/img/sm/${u.img3}.jpg" alt=""></div></div>
</div></div>${trustRow()}</header>
<section class="split-content"><div class="container"><div class="split"><div class="l"><h2>${u.sTitle}</h2>${u.sParas.map((p) => `<p>${p}</p>`).join('')}</div>
  <div class="r"><div class="check-cards">${u.checks.map(([t, dd]) => `<div class="check-card"><span class="ck">${ic('check', 13, 2.4)}</span><div><h3>${t}</h3><p>${dd}</p></div></div>`).join('')}</div></div></div></div></section>
<section class="split-content"><div class="container"><div class="split img-left"><div class="l"><div class="split-img"><img src="${a}assets/img/${u.split === u.img ? u.img2 : u.split}.jpg" alt="" loading="lazy"></div></div>
  <div class="r"><h2>${u.dTitle}</h2><p>${u.dPara}</p><ul class="doc-list">${u.docs.map((x) => `<li><span>${ic('file-text', 15)}</span>${x}</li>`).join('')}</ul></div></div></div></section>
<section class="why"><div class="container"><div class="why-grid"><div class="title"><h2>¿Por qué elegir Andromeda para ${lc(u.card)}?</h2></div>${why.map(([t, dd]) => `<div class="why-card"><span class="ck">${ic('check', 14, 2)}</span><h3>${t}</h3><p>${dd}</p></div>`).join('')}</div></div></section>
${serviceCompare(u.services, `Las dos soluciones que más recomendamos para ${lc(u.card)}. Ambas incluyen traducción profesional, revisión y formato.`)}
${howItWorks(d)}${reviews(d)}${faq(u.faq, 'Preguntas frecuentes', `Respuestas sobre ${lc(u.card)}: validez, tiempos, formatos y garantía de calidad.`)}</main>${darkFooter(d, attrs)}`;
}

// ---------- LANGUAGE ----------
function language(l) {
  const d = 1, a = '../../', r = '../';
  const attrs = `data-lead-lang="${esc(l.name)}"`;
  const strip = [l.img, 'hero-perito', 'revisor', 'certificados', 'hero-seal'];
  const h1a = l.perito ? `Traducción certificada de ${l.adj}` : `Traducción profesional de ${l.adj}`;
  const certTitle = l.perito ? 'Así luce una traducción pericial certificada' : 'Certificado interno de traducción';
  const certIntro = l.perito
    ? 'Tu traducción pericial se entrega lista para uso oficial, con sello y firma de perito traductor autorizado por el Consejo de la Judicatura Federal o el Tribunal Superior de Justicia de la Ciudad de México.'
    : `La traducción pericial se realiza en inglés y español. Para ${l.adj}, Expertos en tu sector incluye un certificado interno de traducción firmado por el especialista revisor.`;
  const certList = l.perito
    ? ['Traducción completa y fiel del documento original.', 'Sello y firma de perito traductor autorizado (CJF o TSJ CDMX).', 'Formato listo para presentación ante autoridades y tribunales.', 'Garantía de corrección de cualquier error sin costo adicional.']
    : ['Revisión por un segundo traductor especialista en tu industria.', 'Certificado interno firmado por el revisor (p. ej., médico, químico o ingeniero).', 'Apego a tus glosarios y materiales bilingües de referencia.', 'Entrega de las memorias de traducción de tu proyecto.'];
  const samples = l.perito ? [['Traducción pericial', 'Ejemplo'], ['Contrato', 'Ejemplo'], ['Informe de auditoría', 'Ejemplo'], ['Certificado de análisis', 'Ejemplo']] : [['Certificado interno', 'Ejemplo'], ['Manual técnico', 'Ejemplo'], ['Protocolo clínico', 'Ejemplo'], ['Ficha técnica', 'Ejemplo']];
  const faqL = [
    [`¿Qué combinaciones de ${l.adj} traducen?`, l.note],
    ['¿Cuánto cuesta?', `${l.tip} La tarifa base de inglés a español va de $0.15 MXN (Tradmagia®) a $0.80 MXN por palabra (Perito traductor), con 30% de descuento en tu primer proyecto.`],
    [`¿Ofrecen traducción pericial de ${l.adj}?`, l.perito ? 'Sí. La traducción certificada por perito se realiza en inglés y español y la firma un perito autorizado por el CJF o el TSJ de la CDMX.' : 'La traducción pericial se ofrece en inglés y español. Para este idioma ofrecemos traducción profesional con certificado interno firmado por el revisor.'],
    ['¿Cuánto tardan?', 'Depende de la solución y el volumen. Definimos tiempos desde la cotización; no hacemos entregas el mismo día de la solicitud.'],
    ['¿Cómo inicio?', 'Agenda una cita o envía tu documento y te respondemos con solución, formato, tiempos y cotización.'],
  ];
  return head({ title: `${h1a} — Andromeda`, desc: l.note, depth: d }) + nav(d) + `<main id="main">
<header class="page-lead"><div class="container"><div class="lead-center"><a class="back-link" href="${r}idiomas/index.html">${ic('arrow-left', 16)} Todos los idiomas</a>
  <h1><span class="headline-gradient">Traducción de ${l.adj}</span><br>${l.perito ? "certificada y pericial" : "especializada"}</h1>
  <p class="lead">${l.note} Traductores especialistas, revisión de un segundo experto y desde $0.15 MXN por palabra en inglés–español.</p>${ctaBtns({ attrs })}${rating()}</div>
  <div class="strip">${strip.map((s, i) => `<div class="tile"><img src="${a}assets/img/${i ? 'sm/' : ''}${s}.jpg" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join('')}</div>
</div>${trustRow()}</header>
<section class="split-content"><div class="container"><div class="split img-left"><div class="l"><div class="collage collage-lang"><div class="tile t1"><img src="${a}assets/img/sm/${l.img}.jpg" alt="" loading="lazy"></div><div class="tile t2"><img src="${a}assets/img/sm/revisor.jpg" alt="" loading="lazy"></div><div class="tile t3"><img src="${a}assets/img/sm/equipo.jpg" alt="" loading="lazy"></div></div></div>
  <div class="r"><h2>Traducción experta de ${l.adj} por especialistas</h2><p>${l.note}</p><p>Cada proyecto pasa por la lectura final del traductor, la revisión de un segundo traductor con más de 15 años de experiencia y la validación de términos técnicos con glosarios creados con expertos del sector.</p><p>Traducimos documentos médicos, farmacéuticos, legales, financieros, técnicos y comerciales para corporativos, despachos e instituciones desde 2002.</p><p>${l.tip}</p></div></div></div></section>
<section class="what-we-offer" style="padding-top:0"><div class="container"><div class="offer-row"><div class="txt"><h2>Traduce cualquier documento entre ${l.adj} y español</h2><p>Envía tu documento con el par de idiomas y el uso que tendrá. Te respondemos con solución, formato, tiempos y cotización.</p><a class="link-arrow" href="${r}casos/index.html">Ver documentos comunes <span class="dot">${ic('arrow-right', 13, 2)}</span></a></div><div class="vis">${docCard(r, true)}</div></div></div></section>
${serviceCompare(l.svcs, `Soluciones disponibles para ${l.adj}. ${l.tip}`)}
<section class="samples"><div class="container"><div class="split"><div class="l"><h2>${certTitle}</h2><p>${certIntro}</p></div><div class="r"><p>El entregable incluye:</p><ul class="cert-list">${certList.map((x) => `<li><span>${ic('check', 16, 2)}</span>${x}</li>`).join('')}</ul></div></div>
  <div class="sample-grid">${samples.map(([t, s]) => `<div class="sample"><div class="sheet"><i class="h"></i><i></i><i class="m"></i><i></i><i class="s"></i><i class="m"></i><i></i><i class="s"></i><span class="sig"></span>${l.perito ? '<span class="seal">PERITO<br>TRADUCTOR</span>' : ''}</div><div class="cap">${t}<span>${s}</span></div></div>`).join('')}</div></div></section>
${reviews(d)}${howItWorks(d)}${faq(faqL, 'Preguntas frecuentes', `Respuestas sobre nuestros servicios de traducción de ${l.adj}.`)}</main>${darkFooter(d, attrs)}`;
}

// ---------- INDEX PAGES ----------
function indexPage(kind) {
  const d = 1, a = '../../', r = '../';
  const isUC = kind === 'casos';
  const items = isUC
    ? USE_CASES.map((u) => `<a class="ix" href="${u.slug}.html"><img src="${a}assets/img/sm/${u.img}.jpg" alt="" loading="lazy"><span class="c"><b>${u.card}</b><span>${u.h1a} ${u.h1b}</span></span></a>`).join('')
    : LANGS.map((l) => `<a class="ix" href="${l.slug}.html"><span class="flag">${l.flag}</span><img src="${a}assets/img/sm/${l.img}.jpg" alt="" loading="lazy"><span class="c"><b>${l.name}</b><span>${l.pair}</span></span></a>`).join('');
  const t = isUC ? 'Traducción para cada caso de uso' : 'Traducción entre 8 idiomas y el español';
  const s = isUC ? 'Legal, regulatorio, clínico, financiero, técnico y gobierno: elige tu caso de uso y conoce la solución que recomendamos.' : 'Inglés es nuestro par principal, con traducción pericial. También traducimos portugués, francés, italiano, alemán, japonés, chino y ruso.';
  return head({ title: `${t} — Andromeda`, desc: s, depth: d }) + nav(d) + `<main id="main">
<header class="page-lead"><div class="container"><div class="lead-center"><a class="back-link" href="${r}index.html">${ic('arrow-left', 16)} Inicio</a><h1><span class="headline-gradient">${isUC ? 'Casos de uso' : 'Idiomas'}</span><br>${isUC ? 'de traducción' : 'que traducimos'}</h1><p class="lead">${s}</p>${ctaBtns()}${rating()}</div></div>${trustRow()}</header>
<section><div class="container"><div class="index-grid">${items}</div></div></section>
${howItWorks(d)}${faq(FAQ_HOME)}</main>${darkFooter(d)}`;
}

write('index.html', home());
USE_CASES.forEach((u) => write(`casos/${u.slug}.html`, useCase(u)));
LANGS.forEach((l) => write(`idiomas/${l.slug}.html`, language(l)));
write('casos/index.html', indexPage('casos'));
write('idiomas/index.html', indexPage('idiomas'));
console.log('v1 built:', 1 + USE_CASES.length + LANGS.length + 2, 'pages');
