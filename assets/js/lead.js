/* Andromeda lead popup — modeled on getadmira.com's demo modal.
   Any element with [data-lead] opens it. Optional data-lead-need / data-lead-lang / data-lead-svc preselect fields.
   Step 1: contact → Step 2: project → Step 3: hand-off → wa.me with a prefilled message. */
(function () {
  const WA = '525512953576'; // [VALIDAR] número de ventas
  // Labels match the use-case card names so data-lead-need preselects exactly
  const NEEDS = ['Legal y pericial', 'Registros COFEPRIS', 'Investigación clínica', 'Finanzas y auditoría', 'Manuales técnicos', 'Patentes', 'Dispositivos médicos', 'Licitaciones y gobierno', 'Otro documento corporativo'];
  const SVCS = ['Aún no lo sé, recomiéndenme', 'Perito traductor (certificada)', 'Expertos en tu sector (100% humana)', 'TradIAH® (IA + revisión humana)', 'Tradmagia® (híbrida optimizada)'];
  const LANGS = ['Inglés ↔ español', 'Portugués', 'Francés → español', 'Italiano → español', 'Alemán → español', 'Japonés → español', 'Chino → español', 'Ruso → español', 'Otra combinación'];
  const VOL = ['Menos de 5,000 palabras', '5,000 – 20,000 palabras', '20,000 – 100,000 palabras', 'Más de 100,000 palabras', 'Varios documentos recurrentes'];
  const WHEN = ['Lo antes posible (urgente)', 'Esta semana', 'Este mes', 'Proyecto recurrente / cuenta'];
  const opt = (a) => a.map((x) => `<option>${x}</option>`).join('');

  const html = `
  <div class="ld-overlay" data-ld-close></div>
  <div class="ld-dialog" role="dialog" aria-modal="true" aria-labelledby="ld-title">
    <div class="ld-head">
      <img class="ld-icon" src="${(window.ASSET_ROOT || '')}assets/brand/icon.svg" alt="" width="34" height="25">
      <div class="ld-titles"><p id="ld-title" class="ld-title">¿Listo para traducir con Andromeda?</p><p class="ld-sub">Agenda una cita con nuestro equipo</p></div>
      <button class="ld-x" type="button" aria-label="Cerrar" data-ld-close><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="ld-progress"><span class="ld-bar"></span></div>
    <form class="ld-form" novalidate>
      <fieldset class="ld-step is-active" data-step="1">
        <label class="ld-f"><span>Nombre completo</span><input name="nombre" autocomplete="name" placeholder="Nombre y apellido" required></label>
        <label class="ld-f"><span>Correo empresarial</span><input name="correo" type="email" autocomplete="email" placeholder="nombre@empresa.com" required></label>
        <label class="ld-f"><span>Teléfono</span><div class="ld-phone"><select name="lada" aria-label="Código de país"><option value="+52">🇲🇽 +52</option><option value="+1">🇺🇸 +1</option><option value="+34">🇪🇸 +34</option><option value="+55">🇧🇷 +55</option><option value="+57">🇨🇴 +57</option><option value="+56">🇨🇱 +56</option><option value="+54">🇦🇷 +54</option></select><input name="tel" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="55 1234 5678" required></div></label>
        <label class="ld-f"><span>Empresa</span><input name="empresa" autocomplete="organization" placeholder="Nombre de tu empresa" required></label>
        <label class="ld-f"><span>¿Qué necesitas traducir?</span><select name="necesidad" required><option value="">Selecciona una opción</option>${opt(NEEDS)}</select></label>
        <button class="ld-btn" type="button" data-ld-next>Continuar</button>
        <p class="ld-fine">Confidencialidad desde el primer contacto.</p>
      </fieldset>
      <fieldset class="ld-step" data-step="2">
        <label class="ld-f"><span>Solución</span><select name="solucion">${opt(SVCS)}</select></label>
        <label class="ld-f"><span>Idiomas</span><select name="idiomas">${opt(LANGS)}</select></label>
        <label class="ld-f"><span>Volumen aproximado</span><select name="volumen" required><option value="">Selecciona una opción</option>${opt(VOL)}</select></label>
        <label class="ld-f"><span>¿Para cuándo lo necesitas?</span><select name="plazo" required><option value="">Selecciona una opción</option>${opt(WHEN)}</select></label>
        <label class="ld-check"><input type="checkbox" name="corporativo" required><span>Es un documento corporativo (no traducimos actas ni documentos personales, ni interpretación).</span></label>
        <div class="ld-row"><button class="ld-btn ld-ghost" type="button" data-ld-back>Atrás</button><button class="ld-btn" type="submit">Continuar en WhatsApp</button></div>
        <p class="ld-fine">30% de descuento en tu primer proyecto.</p>
      </fieldset>
      <div class="ld-step ld-done" data-step="3">
        <div class="ld-wa"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 .5C5.7.5.5 5.7.5 12c0 2 .5 4 1.5 5.7L.4 23.5l6-1.6c1.7.9 3.6 1.4 5.6 1.4 6.3 0 11.5-5.2 11.5-11.5S18.3.5 12 .5z"/></svg></div>
        <p class="ld-title">¡Listo! Te conectamos con un asesor</p>
        <p class="ld-sub">Abriendo WhatsApp con el resumen de tu proyecto…</p>
        <a class="ld-btn" data-ld-wa target="_blank" rel="noopener">Abrir WhatsApp</a>
      </div>
    </form>
  </div>`;

  let root, form, lastFocus;
  function build() {
    root = document.createElement('div');
    root.className = 'ld-root';
    root.innerHTML = html;
    document.body.appendChild(root);
    form = root.querySelector('.ld-form');
    root.addEventListener('click', (e) => {
      if (e.target.closest('[data-ld-close]')) close();
      if (e.target.closest('[data-ld-next]')) { if (valid(1)) go(2); }
      if (e.target.closest('[data-ld-back]')) go(1);
    });
    form.addEventListener('submit', (e) => { e.preventDefault(); if (!valid(1)) { go(1); valid(1); return; } if (valid(2)) finish(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('is-open')) close(); });
  }
  function valid(step) {
    const els = [...form.querySelectorAll(`[data-step="${step}"] [required]`)];
    let ok = true;
    els.forEach((el) => {
      const bad = el.type === 'checkbox' ? !el.checked : !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
      (el.closest('.ld-f') || el.closest('.ld-check')).classList.toggle('is-bad', bad);
      if (bad && ok) { el.focus(); ok = false; }
    });
    return ok;
  }
  function go(n) {
    root.querySelectorAll('.ld-step').forEach((s) => s.classList.toggle('is-active', s.dataset.step == n));
    root.querySelector('.ld-bar').style.width = n === 1 ? '33%' : n === 2 ? '66%' : '100%';
    const f = root.querySelector(`.ld-step[data-step="${n}"] input, .ld-step[data-step="${n}"] select, .ld-step[data-step="${n}"] a`);
    f && f.focus();
  }
  function finish() {
    const d = Object.fromEntries(new FormData(form));
    const msg = `Hola Andromeda, soy ${d.nombre} de ${d.empresa}.\nNecesito: ${d.necesidad}\nSolución: ${d.solucion}\nIdiomas: ${d.idiomas}\nVolumen: ${d.volumen}\nPlazo: ${d.plazo}\nCorreo: ${d.correo} · Tel: ${d.lada} ${d.tel}`;
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    (window.dataLayer = window.dataLayer || []).push({ event: 'generate_lead', lead_need: d.necesidad, lead_service: d.solucion, lead_lang: d.idiomas });
    root.querySelector('[data-ld-wa]').href = url;
    go(3);
    setTimeout(() => { window.open(url, '_blank', 'noopener'); }, 1200);
  }
  function open(trigger) {
    if (!root) build();
    form.reset();
    root.querySelectorAll('.is-bad').forEach((x) => x.classList.remove('is-bad'));
    const pre = (name, val) => { if (!val) return; const s = form.elements[name]; const o = [...s.options].find((x) => x.text.toLowerCase().startsWith(val.toLowerCase())); if (o) s.value = o.value || o.text; };
    pre('necesidad', trigger.dataset.leadNeed); pre('idiomas', trigger.dataset.leadLang); pre('solucion', trigger.dataset.leadSvc);
    lastFocus = trigger;
    root.classList.add('is-open');
    document.documentElement.classList.add('ld-lock');
    go(1);
  }
  function close() {
    root.classList.remove('is-open');
    document.documentElement.classList.remove('ld-lock');
    lastFocus && lastFocus.focus();
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lead]');
    if (!t) return;
    e.preventDefault();
    open(t);
  });
})();
