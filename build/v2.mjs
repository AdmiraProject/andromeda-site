// v2 — rev.com 1:1 structure, Andromeda content. Run: node build/v2.mjs
import fs from 'node:fs';
import path from 'node:path';
import { lc, BRAND, SERVICES, svc, PROCESS, QC, DOCS, USE_CASES, LANGS, FAQ_HOME, REQUIREMENTS, DISCOUNTS } from './data.mjs';
import { ic, UC_ICON, social } from './icons.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'v2');
const BUILD = Date.now().toString(36);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (rel, html) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const SVC_IMG = { tradmagia: 'equipo', tradiah: 'revisor', expertos: 'uc-clinica', perito: 'hero-seal' };
const BADGES = [['gavel', 'Perito autorizado CJF'], ['scale', 'Perito autorizado TSJ CDMX'], ['shield', 'Garantía de calidad'], ['lock', 'Información confidencial']];
const badges = () => `<div class="badges">${BADGES.map(([i, t]) => `<span class="badge">${ic(i, 28, 1.4)}${t}</span>`).join('')}</div>`;

function head({ title, desc, depth }) {
  const a = '../'.repeat(depth + 1);
  return `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="${a}assets/img/certificados.jpg">
<link rel="icon" href="${a}assets/brand/icon.svg"><meta name="theme-color" content="#efede7">
<script>try{var m=localStorage.getItem('andromeda-theme')||'system';if(m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark-mode')}catch(e){}window.ASSET_ROOT=${JSON.stringify(a)}</script>
<link rel="stylesheet" href="${a}assets/css/lead.css?v=${BUILD}"><link rel="stylesheet" href="${a}assets/css/v2.css?v=${BUILD}"></head><body>
<a class="skip" href="#main">Saltar al contenido</a>`;
}

function header(depth, cta = 'Cotizar') {
  const a = '../'.repeat(depth + 1), r = '../'.repeat(depth);
  const item = (href, t, d, extra = '') => `<a class="mitem" href="${href}" ${extra}><b>${t}</b>${d ? `<span>${d}</span>` : ''}</a>`;
  return `<div class="announce"><span>¿Tienes un documento con fecha límite? Agenda una llamada y te cotizamos.</span><a href="#" data-lead>Agenda una cita ${ic('arrow-right', 12, 2)}</a></div>
<div class="hdr-wrap"><header class="hdr pg"><div class="hdr-l">
  <a class="logo" href="${r}index.html" aria-label="Andromeda — inicio"><img class="lc" src="${a}assets/brand/logo-color.svg" alt="Andromeda" width="170" height="26"><img class="lw" src="${a}assets/brand/logo-white.svg" alt="" width="170" height="26"></a>
  <ul class="hlinks">
    <li class="has-mega"><button class="hlink" aria-expanded="false" aria-haspopup="true">Soluciones ${ic('chev', 16)}</button><div class="mega"><div class="mega-in">
      <div><h6>Soluciones de traducción</h6>${SERVICES.map((s) => item(`${r}index.html#soluciones`, `${s.name}${s.id === 'perito' ? ' <span class="pillx">Certificada</span>' : ''}`, s.short)).join('')}<a class="lnk more" href="${r}index.html#soluciones">Ver todas las soluciones ${ic('arrow-right')}</a></div>
      <div><h6>Idiomas</h6><div class="mgrid2">${LANGS.map((l) => item(`${r}idiomas/${l.slug}.html`, `${l.flag} ${l.name}`, l.pair)).join('')}</div><a class="lnk more" href="${r}idiomas/index.html">Ver todos los idiomas ${ic('arrow-right')}</a></div>
      <div class="mcard"><img src="${a}assets/img/sm/certificados.jpg" alt=""><p class="sub-m">Traducción pericial con validez oficial</p><p>Sello y firma de perito autorizado por el CJF o el TSJ de la CDMX.</p><a class="lnk" href="${r}casos/legal-pericial.html">Conocer traducción pericial ${ic('arrow-right')}</a></div>
    </div></div></li>
    <li class="has-mega"><button class="hlink" aria-expanded="false" aria-haspopup="true">Casos de uso ${ic('chev', 16)}</button><div class="mega"><div class="mega-in">
      <div style="grid-column:span 2"><h6>Sectores regulados</h6><div class="mgrid2">${USE_CASES.map((u) => item(`${r}casos/${u.slug}.html`, u.card, `${u.h1a} ${u.h1b}`)).join('')}</div><a class="lnk more" href="${r}casos/index.html">Ver todos los casos de uso ${ic('arrow-right')}</a></div>
      <div class="mcard"><img src="${a}assets/img/sm/uc-farma.jpg" alt=""><p class="sub-m">16 de las 20 farmacéuticas más importantes del mundo</p><p>Desde comunicados internos hasta proyectos regulatorios y de investigación clínica.</p><a class="lnk" href="${r}casos/registros-cofepris.html">Ver registros COFEPRIS ${ic('arrow-right')}</a></div>
    </div></div></li>
  </ul></div>
  <div class="hdr-r"><a class="btn btn-s btn-sec" href="#" data-lead>Agenda una cita</a><a class="btn btn-s" href="#" data-lead>${cta}</a><button class="burger" data-mnav aria-label="Abrir menú">${ic('menu', 26)}</button></div>
</header></div>
<div class="mnav" role="dialog" aria-label="Menú"><div class="top"><img src="${a}assets/brand/logo-color.svg" alt="Andromeda" height="24" style="height:24px;width:auto"><button class="burger" style="display:block" data-mnav aria-label="Cerrar menú">${ic('x', 26)}</button></div>
  <button class="row" data-side="sd-sol">Soluciones ${ic('chev-right', 20)}</button><button class="row" data-side="sd-uc">Casos de uso ${ic('chev-right', 20)}</button>  <a class="btn" href="#" data-lead>${cta}</a><a class="btn btn-sec" href="#" data-lead>Agenda una cita</a><p class="small">¿Prefieres escribirnos? <a href="https://wa.me/${BRAND.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></p></div>
<div class="side" id="sd-sol"><button class="back">${ic('arrow-left', 14)} Volver al menú</button>${SERVICES.map((s) => `<a href="${r}index.html#soluciones">${s.name}</a>`).join('')}${LANGS.map((l) => `<a href="${r}idiomas/${l.slug}.html">${l.flag} ${l.name}</a>`).join('')}</div>
<div class="side" id="sd-uc"><button class="back">${ic('arrow-left', 14)} Volver al menú</button>${USE_CASES.map((u) => `<a href="${r}casos/${u.slug}.html">${u.card}</a>`).join('')}<a href="${r}casos/index.html">Ver todos</a></div>`;
}

function footer(depth) {
  const a = '../'.repeat(depth + 1), r = '../'.repeat(depth);
  const col = (h, items) => `<div><h6>${h}</h6><ul>${items.map(([t, u, x = '']) => `<li><a href="${u}" ${x}>${t}</a></li>`).join('')}</ul></div>`;
  return `<footer class="ftr pg" id="contacto"><div class="cl ps">
  <div class="fcols">
    ${col('Soluciones', SERVICES.map((s) => [s.name, `${r}index.html#soluciones`]).concat([['Tarifas', `${r}index.html#soluciones`]]))}
    ${col('Idiomas', LANGS.map((l) => [l.name, `${r}idiomas/${l.slug}.html`]))}
    ${col('Casos de uso', USE_CASES.map((u) => [u.card, `${r}casos/${u.slug}.html`]))}
    ${col('Recursos', [['Cómo trabajamos', `${r}index.html#proceso`], ['Control de calidad', `${r}index.html#calidad`], ['Preguntas frecuentes', `${r}index.html#preguntas`], ['Calculadora', `${r}idiomas/ingles.html#cotizador`]])}
    ${col('Contacto', [['Agenda una cita', '#', 'data-lead'], ['WhatsApp ↗', `https://wa.me/${BRAND.whatsapp}`, 'target="_blank" rel="noopener"'], [BRAND.phone, `tel:${BRAND.phoneHref}`], [BRAND.email, `mailto:${BRAND.email}`]])}
    ${col('Andromeda', [['Nosotros', `${r}index.html#nosotros`], ...BRAND.sites.map((s) => [s + ' ↗', `https://${s}`, 'target="_blank" rel="noopener"'])])}
  </div><hr class="fade-line">
  <div class="fmid"><a class="logo" href="${r}index.html"><img class="lc" src="${a}assets/brand/logo-color.svg" alt="Andromeda" height="28"><img class="lw" src="${a}assets/brand/logo-white.svg" alt="" height="28"></a>
    <div class="socials">${BRAND.socials.map(([k, n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${social(k, 22)}</a>`).join("")}</div>
    <div class="contact"><a href="tel:${BRAND.phoneHref}">${ic("phone", 16)} ${BRAND.phone}</a><a href="mailto:${BRAND.email}">${ic('mail', 16)} ${BRAND.email}</a><a href="https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}" target="_blank" rel="noopener">${ic('pin', 16)} Vértiz Narvarte, CDMX</a></div></div>
  <hr class="fade-line">
  <div class="fbot"><span>© ${new Date().getFullYear()} ${BRAND.legal}</span><nav><span>No traducimos documentos personales ni interpretación</span><span>Precios en MXN sujetos a cambio</span><a href="#" data-lead>Agenda una cita</a></nav>
    <div class="theme"><span>Tema</span><div class="seg" role="group" aria-label="Tema"><button data-theme="light" aria-label="Claro">${ic('sparkles', 15)}</button><button data-theme="dark" aria-label="Oscuro">${ic('eye', 15)}</button><button data-theme="system" aria-label="Sistema">${ic('device', 15)}</button></div></div></div>
  </div></footer>
<script src="${a}assets/js/lead.js?v=${BUILD}" defer></script><script src="${a}assets/js/v2.js?v=${BUILD}" defer></script></body></html>`;
}

const faqBlock = (items, card = false) => items.map(([q, a]) => `<div class="acc${card ? ' card' : ''}"><button aria-expanded="false">${q}${ic('plus', 24, 1.5)}</button><div class="acc-b"><div><p>${a}</p></div></div></div>`).join('');
const FAQ_EXTRA = [
  ['¿Qué idiomas traducen?', 'Inglés ↔ español es nuestro par principal. También traducimos portugués, francés, italiano, alemán, japonés, chino y ruso; otras combinaciones tienen precios y tiempos de 50% a 100% mayores que inglés a español.'],
  ['¿Qué formatos aceptan?', 'PDF, Word, Excel, PowerPoint, TXT, RTF, CSV y HTML. Expertos en tu sector y Perito traductor también trabajan con imágenes y texto escaneado.'],
];

// ---------------- HOME ----------------
function home() {
  const d = 0, a = '../', r = '';
  const tabsData = [
    { i: 'sparkles', t: 'Tradmagia®', s: svc('tradmagia'), img: 'equipo', st: [['500K', 'palabras en 24 h'], ['≤2%', 'margen de error'], ['$0.15', 'MXN por palabra']] },
    { i: 'layers', t: 'TradIAH®', s: svc('tradiah'), img: 'revisor', st: [['80K', 'palabras en 24 h'], ['≤0.5%', 'margen de error'], ['$0.30', 'MXN por palabra']] },
    { i: 'users', t: 'Expertos en tu sector', s: svc('expertos'), img: 'uc-clinica', st: [['100%', 'humana'], ['40K', 'palabras en 24 h'], ['$0.50', 'MXN por palabra']] },
    { i: 'gavel', t: 'Perito traductor', s: svc('perito'), img: 'hero-seal', pill: 'Certificada', st: [['CJF', 'y TSJ CDMX'], ['16K', 'palabras en 24 h'], ['$0.80', 'MXN por palabra']] },
    { i: 'shield', t: 'Control de calidad', img: 'revisor', desc: QC[2], st: [['+15', 'años de experiencia del revisor'], ['2', 'traductores por proyecto'], ['5', 'filtros de calidad']] },
    { i: 'file-text', t: 'Maquetación espejo', img: 'certificados', desc: 'Corrección o maquetación del formato final: encabezados, pies de página, figuras, tablas de contenido, referencias cruzadas e hipervínculos.', st: [['PDF', 'Word · Excel'], ['PPT', 'TXT · RTF'], ['CSV', 'HTML']] },
    { i: 'database', t: 'Glosarios y memorias', img: 'uc-patentes', desc: 'Apego a tus glosarios bilingües y materiales de referencia, y entrega de las memorias de traducción de tu proyecto.', st: [['100%', 'apego a tu glosario'], ['TM', 'memorias de traducción'], ['∞', 'consistencia entre proyectos']] },
  ];
  const tabs = tabsData.map((t, i) => `<div class="tab"><div class="tab-prog"><i></i></div><button class="tab-btn" role="tab" aria-selected="false">${ic(t.i, 24, 1.5)}<h4>${t.t}</h4>${t.pill ? `<span class="pillx">${t.pill}</span>` : ''}</button>
    <div class="tab-det"><div><div class="in"><p>${t.s ? `${t.s.kind}. ${t.s.ideal}` : t.desc}</p><a class="lnk" href="#" data-lead${t.s ? ` data-lead-svc="${esc(t.s.name.split(' ')[0])}"` : ''}>Cotizar con ${t.t} ${ic('arrow-right')}</a><div class="pane-mob pane-ui" data-ui="${i}"></div></div></div></div></div>`).join('');
  // rev's tab panes are product-UI windows on a dark purple gradient — Andromeda equivalents, one per tab
  const ok = '<span class="u-ok">✓</span>';
  const win = (title, body, extra = '') => `<div class="u-win ${extra}"><div class="u-bar"><i></i><i></i><i></i><span>${title}</span></div><div class="u-body">${body}</div></div>`;
  const UIS = [
    win('Proyecto · Manual_de_usuario_EN.docx → ES', `<div class="u-row"><b>182,400 palabras</b><span class="u-chip">Tradmagia®</span></div><div class="u-prog"><i style="width:72%"></i></div><p class="u-mut">72% · entrega estimada en 24 h</p>
      <ul class="u-list"><li>${ok}Capítulo 1 · Seguridad</li><li>${ok}Capítulo 2 · Instalación</li><li>${ok}Capítulo 3 · Operación</li><li class="run"><span class="u-dot"></span>Capítulo 4 · Mantenimiento</li><li class="off"><span class="u-dot"></span>Capítulo 5 · Solución de problemas</li></ul>
      <div class="u-tags"><span>Margen de error ≤ 2%</span><span>Contexto a nivel documento</span></div>`),
    win('TradIAH® · Dosier_registro_sanitario.pdf', `<div class="u-cols"><div><p class="u-h">ORIGINAL · EN</p><p class="u-t">The recommended <mark>dosage</mark> is one tablet daily. Store below 25 °C. Keep the <mark>shelf life</mark> indicated on the label.</p></div><div><p class="u-h">TRADUCCIÓN · ES</p><p class="u-t">La <mark>posología</mark> recomendada es una tableta al día. Consérvese a menos de 25 °C. Respete la <mark>vida útil</mark> indicada en la etiqueta.</p></div></div>
      <div class="u-terms"><span>${ok} dosage → posología · validado por experto</span><span>${ok} shelf life → vida útil · glosario del cliente</span></div>`),
    win('Revisión experta · Protocolo_clínico_v3', `<div class="u-cols c2"><div><p class="u-t">Los participantes recibirán el <mark>excipiente</mark> en la visita 2, conforme al cronograma del estudio…</p><p class="u-t faint">El investigador registrará cualquier evento adverso en el cuaderno de recogida de datos.</p></div>
      <div class="u-cmt"><div class="u-who"><span>QF</span><b>Revisora · Q.F.B.</b></div><p>Ajustar “excipient” → “excipiente” según glosario del patrocinador.</p><p class="u-res">${ok} Resuelto</p></div></div>`),
    win('Contrato_suministro_ES.pdf · Traducción pericial', `<div class="u-doc"><p class="u-h">CONTRATO DE SUMINISTRO</p><i></i><i></i><i class="s"></i><i></i><i class="s"></i><div class="u-sign"><div><i class="ln"></i><span>Firma del perito traductor</span></div><div class="u-seal">PERITO<br>TRADUCTOR<br><small>TSJ · CDMX</small></div></div></div><div class="u-tags"><span>Validez oficial</span><span>Sello y firma</span></div>`, 'paper'),
    win('Control de calidad · 5 filtros', `<ul class="u-qc">${['Lectura final del traductor', 'Corrección ortotipográfica y de traducción', 'Revisión por segundo traductor (+15 años)', 'Validación terminológica con glosarios', 'Corrección y maquetación del formato'].map((x, i) => `<li class="${i < 4 ? 'done' : 'run'}"><span>${i < 4 ? '✓' : i + 1}</span>${x}</li>`).join('')}</ul><div class="u-prog"><i style="width:86%"></i></div>`),
    win('Maquetación espejo', `<div class="u-cols"><div class="u-page"><p class="u-h">ORIGINAL · EN</p><b class="hd"></b><i></i><i class="s"></i><div class="tbl"><span></span><span></span><span></span><span></span><span></span><span></span></div><i></i></div><div class="u-page"><p class="u-h">TRADUCCIÓN · ES</p><b class="hd"></b><i></i><i class="s"></i><div class="tbl"><span></span><span></span><span></span><span></span><span></span><span></span></div><i></i></div></div><div class="u-tags"><span>Tablas, figuras e hipervínculos</span><span>Mismo formato</span></div>`),
    win('Glosario del cliente · EN → ES', `<table class="u-tbl"><thead><tr><th>Término</th><th>Traducción aprobada</th><th></th></tr></thead><tbody>${[['adverse event', 'evento adverso'], ['batch record', 'registro de lote'], ['informed consent', 'consentimiento informado'], ['shelf life', 'vida útil'], ['governing law', 'ley aplicable']].map(([x, y]) => `<tr><td>${x}</td><td>${y}</td><td>${ok}</td></tr>`).join('')}</tbody></table><div class="u-tags"><span>Memorias de traducción</span><span>Consistencia entre proyectos</span></div>`),
  ];
  const panes = tabsData.map((t, i) => `<div class="pane pane-ui">${UIS[i]}</div>`).join('');
  const inds = USE_CASES.slice(0, 5).map((u) => `<a class="ind" href="casos/${u.slug}.html">${ic(UC_ICON[u.slug], 24, 1.5)}<span class="sub-s">${u.card}</span><p>${u.sParas[0]}</p><span class="lnk">Andromeda para ${lc(u.card)} ${ic('arrow-right')}</span></a>`).join('');
  // Human slides like rev (portrait + stats + big quote). Andromeda forbids client testimonials, so the quotes are
  // Andromeda's own words from its corporate deck / approved landing brief, attributed to the Andromeda team.
  const slides = [
    { img: 'portrait-reg', st: [['16/20', 'farmacéuticas más importantes del mundo'], ['≤0.5%', 'margen de error con TradIAH®'], ['80K', 'palabras en 24 h']],
      q: 'Nos enorgullece ser colaboradores clave de 16 de las 20 compañías farmacéuticas más importantes del mundo, desde comunicados internos hasta proyectos regulatorios y de investigación clínica.', hl: 'colaboradores clave de 16 de las 20 compañías farmacéuticas', who: ['Equipo de traducción médica y farmacéutica', 'Andromeda · desde 2002'], link: ['Ver registros COFEPRIS', 'casos/registros-cofepris.html'] },
    { img: 'portrait-law', st: [['16K', 'palabras periciales en 24 h'], ['100%', 'garantía de corrección o reembolso'], [String(BRAND.years), 'años de experiencia']],
      q: 'Primero cumplimiento y aceptación; luego velocidad, sin comprometer exactitud. Tu traducción deja de ser un entregable y se vuelve un control de riesgo.', hl: 'Primero cumplimiento y aceptación', who: ['Peritos traductores autorizados', 'Andromeda · CJF y TSJ CDMX'], link: ['Ver traducción pericial', 'casos/legal-pericial.html'] },
    { img: 'portrait-ops', st: [['500K', 'palabras en 24 h con Tradmagia®'], ['≤2%', 'margen de error'], ['30%', 'descuento en +1M palabras']],
      q: '¿Por qué elegir entre calidad, rapidez y un buen precio cuando puedes tenerlos todos?', hl: 'calidad, rapidez y un buen precio', who: ['Equipo de traducción técnica', 'Andromeda · manufactura y calidad'], link: ['Ver manuales técnicos', 'casos/manuales-tecnicos.html'] },
  ].map((s) => `<div class="slide" role="group" aria-roledescription="slide"><div class="ph"><img src="${a}assets/img/${s.img}.jpg" alt="" loading="lazy"></div>
    <div class="stats">${s.st.map(([b, t]) => `<div><b>${b}</b><span>${t}</span></div>`).join('')}</div>
    <div class="quote"><q>${s.q.replace(s.hl, `<strong>${s.hl}</strong>`)}</q><p class="who"><b>${s.who[0]}</b><br>${s.who[1]}</p><a class="lnk" href="${s.link[1]}">${s.link[0]} ${ic('arrow-right')}</a></div></div>`).join('');
  const secItems = [
    ['lock', 'Tu información se queda protegida', 'Manejo de información sensible con control y claridad de proceso para Legal, Cumplimiento y Finanzas.'],
    ['users', 'Dos traductores en cada proyecto', 'Un especialista traduce y un segundo traductor con más de 15 años de experiencia revisa.'],
    ['database', 'Terminología validada por expertos', 'Bases terminológicas y glosarios creados con el apoyo de expertos del sector.'],
    ['shield', 'Garantía, no promesas', 'Corregimos cualquier error sin costo o reembolsamos ante una inconformidad persistente.'],
    ['gavel', 'Validez oficial cuando se requiere', 'Sello y firma de perito autorizado por el CJF o el TSJ de la CDMX.'],
  ];
  return head({ title: 'Andromeda — Traducción especializada y pericial para corporativos', desc: 'Traducción pericial y especializada para documentos médicos, farmacéuticos, legales, financieros y técnicos. Desde 2002 en la Ciudad de México.', depth: d }) + header(d) + `<main id="main">
<section class="hero pg"><div class="cl hero-g">
  <div class="hero-l"><span class="eyebrow">Peritos traductores autorizados · desde 2002</span><h1>Traducción que se acepta a la primera</h1>
    <p class="c2">Traducción pericial y especializada para documentos médicos, farmacéuticos, legales, financieros y técnicos. 100% humana o híbrida (IA + revisión experta), con validez oficial cuando el trámite lo exige.</p>
    <a class="btn" href="#" data-lead>Agenda una cita</a><p class="micro">30% de descuento en tu primer proyecto. Confidencialidad desde el primer contacto. No traducimos documentos personales.</p>${badges()}</div>
  <div class="hero-v" data-hero aria-hidden="true"><video autoplay muted loop playsinline preload="auto" poster="${a}assets/video/hero-people-poster.jpg"><source src="${a}assets/video/hero-people.mp4" type="video/mp4"></video>
    <div class="hp hp-q" data-t="0.3,3.1"><span data-type="Traduce el dosier de registro sanitario al español"></span><i class="caret"></i></div>
    <div class="hp hp-files" data-t="3.1,6.2"><div class="hp-h"><span>ANALIZANDO…</span><span>5 ARCHIVOS</span></div>${[['file-text', 'dosier_registro_EN.pdf'], ['file-text', 'IPP_producto_EN.docx'], ['flask', 'certificado_analisis.pdf'], ['layers', 'etiqueta_envase_EN.ai'], ['database', 'glosario_cliente.xlsx']].map(([i, f]) => `<div class="f">${ic(i, 16)}${f}</div>`).join('')}</div>
    <div class="hp hp-ans" data-t="6.2,9.6">La <b>posología</b> recomendada es una tableta al día. Consérvese a menos de 25 °C y respete la <b>vida útil</b> indicada en la etiqueta.<sup>[1][2]</sup><br><span class="rv">✓ Terminología validada por revisor experto</span></div>
    <div class="hp hp-src" data-t="7.2,9.6"><div class="hp-h"><span>GLOSARIO DEL CLIENTE</span><span>5 TÉRMINOS</span></div><div class="row"><span>dosage</span><span>posología</span></div><div class="row"><span>shelf life</span><span>vida útil</span></div><div class="row"><span>batch</span><span>lote</span></div></div>
    <div class="hp hp-draft" data-t="10.2,12.2">${ic('gavel', 15)} Generar traducción pericial</div>
    <div class="hp hp-doc" data-t="12,16.4"><div class="tb"><b>Contrato de suministro</b><span>Formato</span><span>Exportar</span></div><div class="pg"><p>CONTRATO DE SUMINISTRO</p><small>TRADUCCIÓN PERICIAL · CONFIDENCIAL</small><div><span>Partes</span><span>Proveedor · Comprador</span></div><div><span>Idiomas</span><span>Inglés → Español</span></div><div><span>Perito</span><span>Autorizado TSJ CDMX</span></div><div><span>Entrega</span><span>PDF con sello y firma</span></div></div></div>
    <div class="hp hp-share" data-t="16.2,19.3"><p>Enviar “Contrato de suministro”</p><div class="in" data-type2="legal@empresa.com"></div><div class="rw"><span>✓ Sello y firma de perito</span><span class="go">Enviar</span></div></div>
    <svg class="hv-cursor" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2l16 9-7 2-3 7z"/></svg>
  </div>
</div></section>
<section class="logobar pg" id="nosotros"><div class="cl"><p class="lb-l"><span>Colaboradores de <em>16 de las 20</em> farmacéuticas más importantes del mundo</span></p>
  <div class="lb-r"><div class="ticker">${['Consejo de la Judicatura Federal', 'Tribunal Superior de Justicia CDMX', 'Terminología ICH · FDA · COFEPRIS', 'Médica y científica', 'Farmacéutica', 'Legal', 'Financiera', 'Técnica e industrial', 'Desde 2002'].map((t, i) => `<span class="tk">${ic(['gavel', 'scale', 'pill', 'microscope', 'flask', 'file-text', 'chart', 'cog', 'calendar'][i], 22, 1.4)}${t}</span>`).join('')}</div></div></div></section>
<section class="feat pg pl" id="soluciones"><div class="cl">
  <div class="feat-head"><h3>Del documento al entregable, con un solo proveedor</h3><p class="c2">Cuatro soluciones de traducción escrita, un proceso de control de calidad y la terminología de tu empresa, de un proyecto a otro.</p><a class="lnk" href="#" data-lead>Cotiza tu proyecto ${ic('arrow-right')}</a></div>
  <div class="full-div"></div>
  <div class="tabs" role="tablist"><div>${tabs}</div><div class="panes">${panes}</div></div>
</div></section>
<section class="on-dark pg pm"><div class="cl">
  <div class="ind-head"><div class="l"><h3>Hecho para cada sector regulado</h3><p class="c2">Del departamento jurídico al laboratorio, traducimos para quienes no pueden darse el lujo de un rechazo.</p></div><a class="lnk" href="casos/index.html">Ver todos los casos de uso ${ic('arrow-right')}</a></div>
  <div class="ind-grid">${inds}<div class="ind-photo" style="background-image:url('${a}assets/img/sm/uc-legal.jpg')" role="img" aria-label="Equipo legal revisando un contrato"></div></div>
</div></section>
<section class="results pg pm"><div class="cl">
  <div class="res-head"><div class="l"><h3>La confianza que exige un corporativo</h3><p class="c2">Desde 2002 traducimos desde comunicados internos hasta contratos, patentes y proyectos regulatorios para 16 de las 20 farmacéuticas más importantes del mundo.</p></div>
    <div class="g2"><div class="score"><b>${BRAND.years} años</b>traduciendo desde ${BRAND.since}</div><span class="seal">PERITOS<br>CJF · TSJ</span></div></div>
  <div class="slider" aria-roledescription="carousel">${slides}</div>
  <div class="sl-ctrl"><div class="dots">${[0, 1, 2].map((i) => `<button aria-label="Ir a la diapositiva ${i + 1}"></button>`).join('')}</div><div class="arrows"><button data-prev aria-label="Anterior">${ic('arrow-left', 24)}</button><button data-next aria-label="Siguiente">${ic('arrow-right', 24)}</button></div></div>
</div></section>
<section class="on-dark pg" id="calidad"><div class="cl sec-g">
  <div class="sec-l"><h3>Hecho para pasar la revisión de Cumplimiento, no solo para salir del paso</h3><p class="c2">Doble revisión, validación terminológica y confidencialidad operativa en cada proyecto, con validez pericial cuando el trámite lo exige.</p><a class="lnk" href="#proceso">Cómo trabajamos ${ic('arrow-right')}</a><div class="ill"><img src="${a}assets/img/security-ill.jpg" alt="" loading="lazy"></div></div>
  <div class="sec-r"><div class="sec-band">${BADGES.map(([i, t]) => `<span class="badge">${ic(i, 28, 1.4)}${t}</span>`).join('')}</div>
    <div class="sec-list" id="proceso">${secItems.map(([i, t, dd]) => `<div class="sec-item">${ic(i, 32, 1.3)}<div><p class="sub-s">${t}</p><p>${dd}</p></div></div>`).join('')}</div></div>
</div></section>
<section class="pg ps faq-sec" id="preguntas"><div class="cl faq-g"><h3>Preguntas frecuentes</h3><div>${faqBlock([...FAQ_HOME, ...FAQ_EXTRA])}</div></div></section>
<section class="fcta pg"><div class="fcta-ph"><img src="${a}assets/img/cta-reeded.jpg" alt="Traductora de Andromeda trabajando" loading="lazy"></div><div class="cl fcta-g"><div class="fcta-r"><h2>Tu documento, exacto.<br>A la primera.</h2><p>¿Necesitas un proceso para tu equipo? En una conversación definimos requisito de validez, formato y tiempos de entrega. Si tu documento ya fue rechazado o tienes fecha límite, lo priorizamos.</p><div class="btn-g"><a class="btn btn-s" href="#" data-lead>Agenda una cita</a><a class="btn btn-s btn-sec" href="#" data-lead>Cotizar</a></div></div></div></section>
</main>` + footer(d);
}

// ---------------- INNER (service-page template) ----------------
function inner({ title, desc, h1, sub, cta, attrs, heroImg, ddSel, ddOpts, whatTitle, whatSub, rec, langScope, faqs, related, depth = 1 }) {
  const a = '../'.repeat(depth + 1), r = '../'.repeat(depth);
  const s = svc(rec);
  const tierLangs = (id) => LANGS.filter((l) => l.svcs.includes(id));
  const tiers = SERVICES.map((x) => { const ls = tierLangs(x.id); const off = langScope && !langScope.svcs.includes(x.id); return `<div class="tier${off ? ' off' : ''}"><p class="pr">$${x.price}<small> /palabra</small></p><p class="nm">${x.name}${off ? ' · no disponible' : ''}</p><ul>${ls.map((l) => `<li><span class="fl">${l.flag}</span>${l.name}</li>`).join('')}</ul></div>`; }).join('');
  const disc = DISCOUNTS.map(([p, t], i) => `<div class="tier"><p class="pr">${p}<small> desc.</small></p><p class="nm">${['Cliente nuevo', '+20,000 palabras', '+100,000 palabras', '+1 millón de palabras'][i]}</p><ul><li>${t}</li></ul></div>`).join('');
  return head({ title, desc, depth }) + header(depth, cta) + `<main id="main">
<section class="ih pg"><div class="cl ih-g">
  <div class="ih-l fu"><a class="crumb" href="${r}${langScope ? 'idiomas' : 'casos'}/index.html">${ic('arrow-left', 14)} ${langScope ? 'Todos los idiomas' : 'Todos los casos de uso'}</a><h1>${h1}</h1><p class="c2">${sub}</p><a class="btn" href="#" data-lead ${attrs}>${cta}</a></div>
  <div class="mock fu"><img src="${a}assets/img/${heroImg}.jpg" alt="" fetchpriority="high">
    <div class="doc"><div class="hd">Documento traducido <span>ES ✓</span></div><i></i><i class="m hl"></i><i></i><i class="s"></i><i class="m"></i><i class="hl"></i><i class="s"></i></div>
    <div class="dd"><div class="sel">${ddSel} ${ic('chev', 14)}</div>${ddOpts.map((o, i) => `<div class="o${i === 0 ? ' on' : ''}">${o}</div>`).join('')}</div>
    <svg class="cursor" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2l16 9-7 2-3 7z"/></svg></div>
</div></section>
<div class="pg"><div class="cl"><hr class="fade-line"></div></div>
<section class="what pg pm center"><div class="cl"><h2 class="h2c fu">${whatTitle}</h2><p class="sub fu">${whatSub}</p>
  <div class="steps3 fu">${PROCESS.map((p) => `<div class="st"><p class="sub-s"><span class="n">0${p.n}.</span> ${p.t}</p><p>${p.d}</p></div>`).join('')}</div></div></section>
<section class="pricing pg pl center" id="tarifas"><div class="cl">
  <div class="segtabs fu" role="tablist"><button class="is-active" data-view="palabra" role="tab" aria-selected="true">Por palabra</button><button data-view="cuenta" role="tab" aria-selected="false">Cuenta recurrente</button></div>
  <h2 class="fu">Tarifas ${langScope ? `de traducción de ${langScope.adj}` : `para ${lc(title.split(" — ")[0])}`}</h2><p class="sub fu">Tarifa por palabra de inglés a español en servicio regular. ${langScope ? langScope.tip : 'Otras combinaciones de idiomas tienen precios y tiempos de 50% a 100% mayores.'}</p>
  <div class="pcard fu"><div class="ptop"><div class="pl1"><span class="eyebrow">Recomendado</span><p class="ptitle">${s.name}</p><p class="t-sm c2">${s.ideal}</p><a class="btn btn-s btn-full" href="#" data-lead ${attrs} data-lead-svc="${esc(s.name.split(' ')[0])}">Cotizar con ${s.name}</a><a class="lnk" href="#" data-lead ${attrs}>30% de descuento en tu primer proyecto ${ic('arrow-right')}</a></div>
    <div class="inc"><h6>Qué incluye:</h6><ul>${s.included.slice(0, 5).map((x) => `<li>${ic('check', 16, 2)}${x}</li>`).join('')}</ul></div>
    <div class="inc"><h6>Capacidad y calidad:</h6><ul><li>${ic('check', 16, 2)}${s.capacity}</li><li>${ic('check', 16, 2)}${s.quality}</li><li>${ic('check', 16, 2)}${s.scope}</li><li>${ic('check', 16, 2)}Desde $${s.first} MXN en tu primer proyecto</li></ul></div></div>
    <hr class="fade-line"><div class="pview is-active" data-view="palabra"><div class="tiers">${tiers}</div></div><div class="pview" data-view="cuenta"><div class="tiers">${disc}</div></div></div>
</div></section>
<section class="pg pl center"><div class="cl"><h2 class="bento-h fu">La confianza de 16 de las 20 farmacéuticas más importantes del mundo</h2>
  <div class="g2c fu"><div class="g2"><div class="score"><b>${BRAND.years} años</b>traduciendo desde ${BRAND.since}</div><span class="seal">PERITOS<br>CJF · TSJ</span></div></div>
  <div class="bento fu"><div class="brow1">
    <div class="bc"><div class="bt"><p class="sub-m">8 idiomas + español</p><p>Inglés con traducción pericial, y siete idiomas más.</p></div><div class="bv"><div class="flags">${LANGS.map((l) => `<span title="${l.name}">${l.flag}</span>`).join('')}<span>🇲🇽</span><span>🇪🇸</span><span>🇨🇴</span><span>🇦🇷</span><span>🇨🇱</span><span>🇵🇪</span><span>🇺🇾</span><span>🇨🇷</span></div></div></div>
    <div class="bc"><div class="bt"><p class="sub-m">Hasta 500K palabras en 24 h</p><p>Con Tradmagia® en servicio extraurgente.</p></div><div class="bv"><div class="gauge"><svg viewBox="0 0 170 170"><circle cx="85" cy="85" r="66" fill="none" stroke="var(--sunken)" stroke-width="12" stroke-dasharray="311 1000" stroke-linecap="round"/><circle class="arc" cx="85" cy="85" r="66" fill="none" stroke="#FE6347" stroke-width="12" stroke-linecap="round"/></svg><b>24h</b><small>entrega</small></div></div></div>
    <div class="bc"><div class="bt"><p class="sub-m">Todos los formatos de oficina</p><p>Y texto escaneado con Expertos y Perito.</p></div><div class="bv"><div class="files">${['PDF', 'DOCX', 'XLSX', 'PPTX', 'TXT', 'RTF', 'CSV', 'HTML', 'JPG'].map((f) => `<span><i></i>${f}</span>`).join('')}</div></div></div></div>
  <div class="brow2"><div class="bc wide"><div class="bt"><p class="sub-m">Maquetación espejo</p><p>Tu traducción llega con el mismo formato del original: tablas, figuras, encabezados e hipervínculos.</p></div><div class="bv"><div class="mirror"><div class="pg2"><p class="lb">ORIGINAL · EN</p><i class="t"></i><i></i><i class="s"></i><i></i><i></i><i class="s"></i></div><div class="pg2"><p class="lb">TRADUCCIÓN · ES</p><i class="t"></i><i></i><i class="s"></i><i></i><i></i><i class="s"></i></div></div></div></div>
    <div class="bc"><div class="bt"><p class="sub-m">Doble revisión experta</p><p>Un segundo traductor con más de 15 años de experiencia valida terminología y exactitud.</p></div><div class="bimg"><img src="${a}assets/img/sm/revisor.jpg" alt="" loading="lazy"></div></div></div></div>
</div></section>
<section class="pg pl"><div class="cm center"><h2 class="fu">Preguntas frecuentes</h2><p class="sub fu c2" style="max-width:480px;margin:16px auto 48px">Validez, tiempos, formatos y garantía de calidad.</p><div class="fu" style="text-align:left">${faqBlock(faqs, true)}</div></div></section>
<section class="pg pl center"><div class="cl"><h2 class="fu">También te puede interesar</h2><div class="related fu">${related.map(([t, d2, img, href]) => `<a class="rcard" href="${href}"><img src="${a}assets/img/sm/${img}.jpg" alt="" loading="lazy"><div><p class="sub-s">${t}</p><p>${d2}</p></div></a>`).join('')}</div></div></section>
<div class="pg"><div class="cl"><hr class="fade-line"></div></div>
<section class="calc-wrap pg" id="cotizador"><div class="calc fu"><div class="l"><h3>Calculadora de cotización</h3><p>Estima el costo de tu proyecto con nuestras tarifas por palabra, urgencia, idioma y descuentos por volumen. Te confirmamos la cotización final en minutos.</p><a class="lnk" href="#" data-lead ${attrs}>Pedir cotización exacta ${ic('arrow-right')}</a></div>
  <div class="r"><form onsubmit="return false"><div class="row2"><label>Palabras<input name="words" inputmode="numeric" value="10,000" aria-label="Número de palabras"></label><label>Solución<select name="svc">${SERVICES.map((x) => `<option value="${x.id}"${x.id === rec ? ' selected' : ''}>${x.name}</option>`).join('')}</select></label></div>
    <div class="row2" style="margin-top:12px"><label>Urgencia<select name="speed"><option value="0">Regular</option><option value="1">Urgente</option><option value="2">Extraurgente</option></select></label><label>Idiomas<select name="lang"><option value="base"${langScope && langScope.tier !== 'base' ? '' : ' selected'}>Inglés ↔ español</option><option value="plus50"${langScope && langScope.tier === '+50%' ? ' selected' : ''}>PT/FR/IT → español</option><option value="plus100"${langScope && langScope.tier === '+100%' ? ' selected' : ''}>Otras combinaciones</option></select></label></div>
    <label style="display:flex;gap:8px;align-items:center;margin-top:12px;font-weight:500"><input type="checkbox" name="first" checked style="width:16px;height:16px;accent-color:#C23C8E"> Primer proyecto (30% de descuento)</label>
    <div class="out" style="margin-top:12px"><div>Estimado<small></small></div><b>$0</b></div><p class="note"></p></form></div></div></section>
</main>` + footer(depth);
}

function ucPage(u) {
  const others = USE_CASES.filter((x) => x.slug !== u.slug).slice(0, 3);
  return inner({
    title: `${u.name} — Andromeda`, desc: u.lead, h1: `${u.h1a} ${u.h1b}`, sub: u.lead, cta: 'Cotizar traducción', attrs: `data-lead-need="${esc(u.card)}"`,
    heroImg: u.img, ddSel: 'Traducir a', ddOpts: ['🇲🇽 Español (MX)', '🇺🇸 Inglés (EUA)', '🇧🇷 Portugués (BR)', '🇫🇷 Francés'],
    whatTitle: `¿Cómo funciona la traducción para ${lc(u.card)}?`, whatSub: u.sParas[0], rec: u.services[0], langScope: null,
    faqs: u.faq, related: others.map((o) => [o.card, `${o.h1a} ${o.h1b}`, o.img, `${o.slug}.html`]),
  });
}
function langPage(l) {
  const others = LANGS.filter((x) => x.slug !== l.slug).slice(0, 3);
  const h1 = l.perito ? `Traducción certificada de ${l.adj} para corporativos` : `Traducción profesional de ${l.adj} para corporativos`;
  return inner({
    title: `${h1} — Andromeda`, desc: l.note, h1, sub: `${l.note} Traductores especialistas y revisión de un segundo experto.`, cta: `Traducir ${l.adj}`, attrs: `data-lead-lang="${esc(l.name)}"`,
    heroImg: l.img, ddSel: 'Idioma de origen', ddOpts: [`${l.flag} ${l.name}`, '🇲🇽 Español (MX)', '🇺🇸 Inglés (EUA)', '🇧🇷 Portugués (BR)'],
    whatTitle: `¿Qué incluye la traducción de ${l.adj}?`, whatSub: l.tip, rec: l.perito ? 'perito' : l.svcs.includes('tradiah') ? 'tradiah' : 'tradmagia', langScope: l,
    faqs: [[`¿Qué combinaciones de ${l.adj} traducen?`, l.note], ['¿Cuánto cuesta?', `${l.tip} En tu primer proyecto tienes 30% de descuento.`], [`¿Ofrecen traducción pericial de ${l.adj}?`, l.perito ? 'Sí. La traducción certificada por perito se realiza en inglés y español, firmada por perito autorizado por el CJF o el TSJ de la CDMX.' : 'La traducción pericial se ofrece en inglés y español. Para este idioma, Expertos en tu sector incluye un certificado interno firmado por el revisor.'], ['¿Cuánto tardan?', 'Depende de la solución y el volumen; definimos tiempos desde la cotización. No hacemos entregas el mismo día de la solicitud.'], ...FAQ_EXTRA.slice(1)],
    related: others.map((o) => [o.name, o.pair, o.img, `${o.slug}.html`]),
  });
}

function indexPage(kind) {
  const d = 1, a = '../../', r = '../';
  const isUC = kind === 'casos';
  const cards = isUC
    ? USE_CASES.map((u) => `<a class="rcard fu" href="${u.slug}.html"><img src="${a}assets/img/sm/${u.img}.jpg" alt="" loading="lazy"><div><p class="sub-s">${u.card}</p><p>${u.h1a} ${u.h1b}</p></div></a>`).join('')
    : LANGS.map((l) => `<a class="rcard fu" href="${l.slug}.html"><img src="${a}assets/img/sm/${l.img}.jpg" alt="" loading="lazy"><div><p class="sub-s">${l.flag} ${l.name}</p><p>${l.pair}</p></div></a>`).join('');
  return head({ title: `${isUC ? 'Casos de uso' : 'Idiomas'} — Andromeda`, desc: 'Traducción especializada y pericial para corporativos.', depth: d }) + header(d) + `<main id="main">
<section class="ih pg"><div class="cl" style="max-width:760px;text-align:center"><div class="ih-l fu" style="align-items:center"><a class="crumb" href="${r}index.html">${ic('arrow-left', 14)} Inicio</a><span class="eyebrow">${isUC ? 'Sectores regulados' : '8 idiomas + español'}</span><h1>${isUC ? 'Traducción para cada caso de uso' : 'Idiomas que traducimos'}</h1><p class="c2">${isUC ? 'Legal, regulatorio, clínico, financiero, técnico y gobierno.' : 'Inglés con traducción pericial, y portugués, francés, italiano, alemán, japonés, chino y ruso.'}</p><a class="btn" href="#" data-lead>Agenda una cita</a></div></div></section>
<div class="pg"><div class="cl"><hr class="fade-line"></div></div>
<section class="pg pl"><div class="cl"><div class="related" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr));margin-top:0;gap:32px">${cards}</div></div></section>
<section class="pg ps"><div class="cl faq-g"><h3>Preguntas frecuentes</h3><div>${faqBlock([...FAQ_HOME.slice(0, 4), ...FAQ_EXTRA])}</div></div></section></main>` + footer(d);
}

write('index.html', home());
USE_CASES.forEach((u) => write(`casos/${u.slug}.html`, ucPage(u)));
LANGS.forEach((l) => write(`idiomas/${l.slug}.html`, langPage(l)));
write('casos/index.html', indexPage('casos'));
write('idiomas/index.html', indexPage('idiomas'));
console.log('v2 built:', 1 + USE_CASES.length + LANGS.length + 2, 'pages');
