(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- nav: scrolled state + click/keyboard dropdowns + solutions rail ---
  const nav = $('.navbar');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', scrollY > 12);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $$('.nav-item.has-menu').forEach((it) => {
    const btn = $('.nav-link', it);
    btn.addEventListener('click', (e) => { e.preventDefault(); const o = it.classList.toggle('is-open'); btn.setAttribute('aria-expanded', o); $$('.nav-item.is-open').forEach((x) => x !== it && x.classList.remove('is-open')); });
    it.addEventListener('mouseleave', () => { it.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.nav-item.is-open').forEach((x) => x.classList.remove('is-open')); });
  $$('.sol-rail button').forEach((b) => {
    const act = () => { $$('.sol-rail button').forEach((x) => x.classList.toggle('is-active', x === b)); $$('.sol-pane').forEach((p) => p.classList.toggle('is-active', p.dataset.pane === b.dataset.pane)); };
    b.addEventListener('mouseenter', act); b.addEventListener('click', act); b.addEventListener('focus', act);
  });
  const tog = $('.nav-toggle'), mnav = $('.m-nav');
  tog && tog.addEventListener('click', () => { const o = mnav.classList.toggle('is-open'); tog.setAttribute('aria-expanded', o); document.documentElement.style.overflow = o ? 'hidden' : ''; tog.innerHTML = o ? tog.dataset.close : tog.dataset.open; });
  mnav && mnav.addEventListener('click', (e) => { if (e.target.closest('[data-lead]')) { mnav.classList.remove('is-open'); document.documentElement.style.overflow = ''; tog.innerHTML = tog.dataset.open; } });

  $$('.faq-card button').forEach((b) => b.addEventListener('click', () => {
    const card = b.closest('.faq-card'), open = !card.classList.contains('is-open');
    $$('.faq-card', card.parentElement).forEach((c) => { c.classList.remove('is-open'); $('button', c).setAttribute('aria-expanded', 'false'); });
    if (open) { card.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); }
  }));

  // --- reveal + how-it-works sequence (adds .animate once in view) ---
  const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add(en.target.classList.contains('steps') ? 'animate' : 'is-in'); io.unobserve(en.target); } }), { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  $$('.rv, .steps, .collage').forEach((el) => io.observe(el));

  // --- hero collage tilt: disabled in v1 (reference has a static collage) ---
  const col = $('.collage');
  if (false && col && !reduce && matchMedia('(pointer:fine)').matches) {
    const tiles = $$('.tile', col);
    let mx = 0, my = 0, cx = 0, cy = 0;
    col.parentElement.addEventListener('mousemove', (e) => { const r = col.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5; });
    col.parentElement.addEventListener('mouseleave', () => { mx = my = 0; });
    const loop = () => {
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      const sy = Math.min(scrollY, 900) / 900;
      tiles.forEach((t, i) => { const d = [1, 0.7, 1.25][i] || 1; t.style.transform = `rotateY(${cx * 7 * d}deg) rotateX(${-cy * 7 * d}deg) translate3d(${cx * 10 * d}px,${cy * 10 * d - sy * 40 * d}px,${d * 10}px)`; });
      requestAnimationFrame(loop);
    };
    loop();
  }

  // --- cinematic scroll film: scroll position scrubs video time ---
  const film = $('.film');
  if (film && !reduce) {
    const v = $('video', film), chapters = $$('.chapter', film), bars = $$('.film-progress i', film), cta = $('.film-cta', film);
    const small = matchMedia('(max-width:767px)').matches;
    const src = small ? v.dataset.srcMobile : v.dataset.src;
    let dur = 0, target = 0, cur = 0, seeking = false;
    fetch(src).then((r) => r.blob()).then((b) => { v.src = URL.createObjectURL(b); }).catch(() => { v.src = src; });
    v.addEventListener('loadedmetadata', () => { dur = v.duration; v.pause(); film.classList.add('ready'); });
    v.addEventListener('seeked', () => { seeking = false; });
    const N = chapters.length;
    const tick = () => {
      const r = film.getBoundingClientRect(), span = r.height - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / span));
      target = p * Math.max(0, dur - 0.05);
      cur += (target - cur) * 0.14;
      if (dur && !seeking && Math.abs(v.currentTime - cur) > 0.016) { seeking = true; try { v.currentTime = cur; } catch (e) { seeking = false; } }
      const idx = Math.min(N - 1, Math.floor(p * N * 0.999));
      chapters.forEach((c, i) => c.classList.toggle('is-on', i === idx));
      bars.forEach((b, i) => { b.style.transform = `scaleX(${Math.min(1, Math.max(0, p * N - i))})`; });
      cta && cta.classList.toggle('is-on', p > 0.82);
      requestAnimationFrame(tick);
    };
    tick();
  } else if (film) { $$('.chapter', film).forEach((c) => c.classList.add('is-on')); }

  // --- reviews/requirements: duplicate column content for seamless loop ---
})();
