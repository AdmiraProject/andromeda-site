(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // theme: Light / Dark / System (stored, default system)
  const KEY = 'andromeda-theme';
  const applyTheme = (m) => {
    const dark = m === 'dark' || (m === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark-mode', dark);
    $$('.seg button').forEach((b) => b.classList.toggle('is-active', b.dataset.theme === m));
  };
  let mode = 'system'; try { mode = localStorage.getItem(KEY) || 'system'; } catch (e) {}
  applyTheme(mode);
  $$('.seg button').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.theme; try { localStorage.setItem(KEY, mode); } catch (e) {} applyTheme(mode); }));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => mode === 'system' && applyTheme('system'));

  // sticky header: fixed once scrolled past its original top (mobile: as soon as scrollY > 0)
  const hdr = $('.hdr'), wrap = $('.hdr-wrap');
  const fix = () => { if (!hdr) return; const top = wrap.getBoundingClientRect().top + scrollY; const on = innerWidth <= 991 ? scrollY > 0 : scrollY > top; hdr.classList.toggle('is-fixed', on); };
  addEventListener('scroll', fix, { passive: true }); addEventListener('resize', fix); fix();

  // mega menus: hover (CSS handles 240ms delay + 390ms fade) + click/keyboard
  $$('.hlinks>li.has-mega').forEach((li) => {
    const b = $('.hlink', li);
    li.addEventListener('mouseenter', () => { li.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); });
    li.addEventListener('mouseleave', () => { li.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false'); });
    b.addEventListener('click', () => { const o = li.classList.toggle('is-open'); b.setAttribute('aria-expanded', o); });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.hlinks>li.is-open').forEach((x) => x.classList.remove('is-open')); });

  // mobile menu + sidecars
  const mnav = $('.mnav');
  $$('[data-mnav]').forEach((b) => b.addEventListener('click', () => { const o = mnav.classList.toggle('is-open'); document.documentElement.style.overflow = o ? 'hidden' : ''; if (!o) $$('.side').forEach((s) => s.classList.remove('is-open')); }));
  $$('[data-side]').forEach((b) => b.addEventListener('click', () => $('#' + b.dataset.side).classList.add('is-open')));
  $$('.side .back').forEach((b) => b.addEventListener('click', () => b.closest('.side').classList.remove('is-open')));
  document.addEventListener('click', (e) => { if (e.target.closest('[data-lead]') && mnav && mnav.classList.contains('is-open')) { mnav.classList.remove('is-open'); $$('.side').forEach((s) => s.classList.remove('is-open')); document.documentElement.style.overflow = ''; } });

  // logo ticker: Splide AutoScroll equivalent — 0.7px/frame, leftward loop, no hover pause
  $$('.ticker').forEach((t) => {
    t.innerHTML += t.innerHTML;
    if (reduce) return;
    let x = 0;
    const step = () => { x -= 0.7; const half = t.scrollWidth / 2; if (-x >= half) x += half; t.style.transform = `translate3d(${x}px,0,0)`; requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });

  // feature tabs: 8s progress, next on animationend, pause on hover / out of view, hover switches
  const tabs = $('.tabs');
  if (tabs) {
    const list = $$('.tab', tabs), panes = $$('.pane', tabs), DUR = 8000;
    let cur = 0, elapsed = 0, last = performance.now(), hovered = false, visible = false;
    const set = (i) => {
      cur = i; elapsed = 0;
      list.forEach((t, k) => { t.classList.toggle('is-active', k === i); $('.tab-btn', t).setAttribute('aria-selected', k === i); $('.tab-prog i', t).style.transform = 'scaleX(0)'; });
      panes.forEach((p, k) => p.classList.toggle('is-active', k === i));
    };
    list.forEach((t, i) => {
      $('.tab-btn', t).addEventListener('click', () => set(i));
      t.addEventListener('mouseenter', () => { if (cur !== i && innerWidth > 991) set(i); });
    });
    tabs.addEventListener('mouseenter', () => (hovered = true));
    tabs.addEventListener('mouseleave', () => (hovered = false));
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(tabs);
    // progress bar runs 8s linear; paused while hovered or out of view; then advances
    const tick = () => {
      const now = performance.now(), dt = Math.min(100, now - last); last = now;
      if (!reduce && visible && !hovered && innerWidth > 991) {
        elapsed += dt;
        $('.tab-prog i', list[cur]).style.transform = `scaleX(${Math.min(1, elapsed / DUR)})`;
        if (elapsed >= DUR) set((cur + 1) % list.length);
      }
    };
    set(0); setInterval(tick, 16);
  }

  // results slider: fade, rewind, 5s autoplay, pause on hover/focus, starts at 25% visibility
  const sl = $('.slider');
  if (sl) {
    const slides = $$('.slide', sl), dots = $$('.dots button'); let i = 0, timer = null, hold = false, started = false;
    const go = (n) => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('is-active', k === i)); dots.forEach((d, k) => { d.classList.toggle('is-active', k === i); d.setAttribute('aria-current', k === i); }); };
    const play = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => !hold && go(i + 1), 5000); };
    dots.forEach((d, k) => d.addEventListener('click', () => { go(k); play(); }));
    $('[data-prev]') && $('[data-prev]').addEventListener('click', () => { go(i - 1); play(); });
    $('[data-next]') && $('[data-next]').addEventListener('click', () => { go(i + 1); play(); });
    sl.addEventListener('mouseenter', () => (hold = true)); sl.addEventListener('mouseleave', () => (hold = false));
    sl.addEventListener('focusin', () => (hold = true)); sl.addEventListener('focusout', () => (hold = false));
    new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; play(); } }, { threshold: 0.25 }).observe(sl);
    go(0);
  }

  // accordions (height + 45° plus)
  $$('.acc button').forEach((b) => b.addEventListener('click', () => { const a = b.closest('.acc'); const o = a.classList.toggle('is-open'); b.setAttribute('aria-expanded', o); }));

  // pricing segmented tabs
  $$('.segtabs button').forEach((b) => b.addEventListener('click', () => {
    $$('.segtabs button').forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
    $$('.pview').forEach((p) => p.classList.toggle('is-active', p.dataset.view === b.dataset.view));
  }));

  // inner-page fade-up (Y100 → 0, 1s); above-the-fold fire together ~450ms after load
  const fus = $$('.fu');
  if (fus.length) {
    if (reduce) fus.forEach((f) => f.classList.add('is-in'));
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.12 });
      setTimeout(() => fus.forEach((f) => io.observe(f)), 450);
    }
  }

  // quote calculator (Andromeda price sheet feb26)
  const calc = $('.calc form');
  if (calc) {
    const RATE = { tradmagia: [0.15, 0.20, 0.25], tradiah: [0.30, 0.35, 0.40], expertos: [0.50, 0.70, 0.90], perito: [0.80, 0.90, null] };
    const MIN = { tradmagia: 2000, tradiah: 2000, expertos: 500, perito: 2000 };
    const LANG = { base: 1, plus50: 1.5, plus100: 2 };
    const fmt = (n) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
    const run = () => {
      const f = calc.elements; const w = Math.max(0, parseInt(f.words.value.replace(/\D/g, '')) || 0);
      const s = f.svc.value, sp = +f.speed.value, lang = f.lang.value;
      let r = RATE[s][sp]; const note = $('.calc .note');
      if (r == null) { r = RATE[s][1]; note.textContent = 'Perito: servicio extraurgente no disponible; se calcula como urgente.'; } else note.textContent = 'Estimado con tarifas feb 2026 (inglés → español). Precios sujetos a cambio. No hay entregas el mismo día.';
      if (s === 'perito' && lang !== 'base') { note.textContent = 'La traducción pericial se ofrece solo en inglés ↔ español.'; }
      let sub = w * r * LANG[lang];
      const vol = w > 1e6 ? 0.30 : w > 1e5 ? 0.20 : w > 2e4 ? 0.10 : 0;
      sub *= 1 - vol;
      const first = f.first.checked ? 0.30 : 0; sub *= 1 - first;
      sub = Math.max(sub, w ? MIN[s] : 0);
      $('.calc .out b').textContent = fmt(sub);
      $('.calc .out small').textContent = `${w.toLocaleString('es-MX')} palabras${vol ? ` · ${vol * 100}% volumen` : ''}${first ? ' · 30% primer proyecto' : ''}`;
    };
    calc.addEventListener('input', run); run();
  }
})();

/* hero: glass UI panels choreographed to the footage clock (rev hero video beats) */
(() => {
  const hv = document.querySelector('[data-hero]'); if (!hv) return;
  const v = hv.querySelector('video'), panels = [...hv.querySelectorAll('.hp')], cur = hv.querySelector('.hv-cursor');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LOOP = 19.45; let t0 = performance.now();
  const typeEl = hv.querySelector('[data-type]'), typeEl2 = hv.querySelector('[data-type2]');
  // cursor keyframes [time, x%, y%, click]
  const CK = [[10.0, 62, 70, 0], [11.3, 24, 86, 1], [12.2, 30, 80, 0], [16.6, 60, 70, 0], [18.2, 82, 81, 1], [19.2, 84, 83, 0]];
  // follow the footage while it plays; if it stalls / autoplay is blocked, keep the UI running on a wall clock
  let lastVT = -1, lastMove = 0;
  const clock = () => {
    const now = performance.now();
    if (v && v.readyState >= 2 && !v.paused) {
      if (v.currentTime !== lastVT) { lastVT = v.currentTime; lastMove = now; }
      if (now - lastMove < 600) { t0 = now - v.currentTime * 1000; return v.currentTime; }
    }
    return ((now - t0) / 1000) % LOOP;
  };
  const tick = () => {
    const t = reduce ? 7.5 : clock();
    panels.forEach((p) => { const [a, b] = p.dataset.t.split(',').map(Number); p.classList.toggle('on', t >= a && t < b); });
    if (typeEl) { const txt = typeEl.dataset.type, k = Math.max(0, Math.min(1, (t - 0.5) / 2.1)); typeEl.textContent = txt.slice(0, Math.round(txt.length * k)); }
    if (typeEl2) { const txt = typeEl2.dataset.type2, k = Math.max(0, Math.min(1, (t - 16.6) / 1.2)); typeEl2.textContent = txt.slice(0, Math.round(txt.length * k)) || ' '; }
    if (cur) {
      const on = t >= CK[0][0] && t < CK[CK.length - 1][0];
      cur.classList.toggle('on', on && !reduce);
      let k = CK[0]; for (const c of CK) if (t >= c[0]) k = c;
      cur.style.left = k[1] + '%'; cur.style.top = k[2] + '%'; cur.classList.toggle('click', !!k[3] && t - k[0] < 0.25);
    }
  };
  setInterval(tick, 60); tick();
})();

/* mobile tab panes reuse the desktop UI mockups */
document.querySelectorAll('.pane-mob[data-ui]').forEach((m) => { const p = document.querySelectorAll('.panes .pane')[+m.dataset.ui]; if (p) m.innerHTML = p.innerHTML; });
