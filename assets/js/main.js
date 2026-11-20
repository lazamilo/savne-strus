(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page || '';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const A = 'assets/img/';

  /* ---------- shared header ---------- */
  const cols = [
    ['Air Classic', 'kol-air-classic', 'air-classic'], ['Air Premium', 'kol-air-premium', 'air-premium'],
    ['Air Termo Premium', 'kol-termo-premium', 'air-termo-premium'], ['Pure', 'kol-pure', 'pure'],
    ['Termo Pure', 'kol-termo-pure', 'termo-pure'], ['Tyrol', 'kol-tyrol', 'tyrol'], ['Supreme', 'kol-supreme', 'supreme'],
    ['Zunanje savne', 'kol-garden', 'zunanje']
  ];
  const cur = (p) => (page === p ? ' class="cur"' : '');
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="loader" aria-hidden="true"><div class="glow"></div><img src="${A}logo-light.png" alt=""></div>
  <header class="nav ${document.body.dataset.inv ? 'inv' : ''}">
    <a class="logo" href="index.html" aria-label="Savne Štrus, domov">
      <img class="l-dark" src="${A}logo-dark.png" alt="Savne Štrus">
      <img class="l-light" src="${A}logo-light.png" alt="">
    </a>
    <nav class="nav-links" aria-label="Glavni meni">
      <button type="button" data-mega>Savne</button>
      <a href="kolekcije.html"${cur('kolekcije')}>Kolekcije</a>
      <a href="zunanje-savne.html"${cur('zunanje')}>Zunanje savne</a>
      <a href="reference.html"${cur('reference')}>Reference</a>
      <a href="o-nas.html"${cur('o-nas')}>O nas</a>
    </nav>
    <div class="nav-right">
      <a class="phone" href="tel:+38659340401">059 340 401</a>
      <a class="btn" href="posvet.html">Rezerviraj posvet <span class="arr">→</span></a>
      <button class="burger" type="button" aria-label="Meni"><span></span><span></span></button>
    </div>
  </header>
  <div class="mega-scrim"></div>
  <div class="mega" aria-hidden="true">
    <div>
      <h6>Vrste savn</h6>
      <div class="mega-types">
        <a href="vrste-savn.html#finska">Finska / bio <small>70–90 °C</small></a>
        <a href="vrste-savn.html#infra">Infra / solna <small>do 50 °C</small></a>
        <a href="vrste-savn.html#hibridna">Hibridna <small>dve savni v eni</small></a>
        <a href="zunanje-savne.html">Zunanja savna <small>Alta, Ignis, Pinus, Garden</small></a>
      </div>
    </div>
    <div>
      <h6>Kolekcije</h6>
      <div class="mega-cols">${cols.map(c => `<a href="${c[2] === 'zunanje' ? 'zunanje-savne.html' : 'kolekcije.html#' + c[2]}"><img src="${A}w/${c[1]}.jpg" alt="" loading="lazy"><span>${c[0]}</span></a>`).join('')}</div>
    </div>
  </div>
  <div class="mmenu">
    <nav>
      <a href="vrste-savn.html">Vrste savn</a>
      <a href="kolekcije.html">Kolekcije</a>
      <a href="zunanje-savne.html">Zunanje savne</a>
      <a href="reference.html">Reference</a>
      <a href="o-nas.html">O nas</a>
      <a href="posvet.html">Rezerviraj posvet</a>
    </nav>
    <div class="meta"><a href="tel:+38659340401">059 340 401</a><a href="mailto:prodaja@savne-strus.si">prodaja@savne-strus.si</a><span>Usnjarska cesta 16c, 1275 Šmartno pri Litiji</span></div>
  </div>`);

  document.body.insertAdjacentHTML('beforeend', `
  <footer class="foot">
    <div class="foot-grid">
      <div><img src="${A}logo-light.png" alt="Savne Štrus"><p class="dim" style="margin-top:26px;max-width:22em">Savne po meri, izdelane v lastnem proizvodnem obratu v Šmartnem pri Litiji. Od leta 2012.</p></div>
      <div><h6>Savne</h6><ul><li><a href="vrste-savn.html#finska">Finska / bio</a></li><li><a href="vrste-savn.html#infra">Infra / solna</a></li><li><a href="vrste-savn.html#hibridna">Hibridna</a></li><li><a href="zunanje-savne.html">Zunanja savna</a></li><li><a href="kolekcije.html">Kolekcije</a></li></ul></div>
      <div><h6>Podjetje</h6><ul><li><a href="o-nas.html">O nas</a></li><li><a href="reference.html">Reference</a></li><li><a href="posvet.html">Rezerviraj posvet</a></li><li><a href="https://savne-strus.si/blog/">Blog</a></li><li><a href="https://savne-strus.si/trgovina/">Trgovina</a></li></ul></div>
      <div><h6>Razstavni salon</h6><ul><li><a href="tel:+38659340401">059 340 401</a></li><li><a href="mailto:prodaja@savne-strus.si">prodaja@savne-strus.si</a></li><li>Usnjarska cesta 16c<br>1275 Šmartno pri Litiji</li><li class="dim">Pon–pet, 8.00–16.00</li></ul></div>
    </div>
    <div class="word" aria-hidden="true">Savne Štrus</div>
    <div class="foot-bot"><span>© ${new Date().getFullYear()} Savne Štrus</span><span><a href="https://savne-strus.si/pogoji-poslovanja/">Pogoji poslovanja</a> &nbsp;·&nbsp; <a href="https://savne-strus.si/o-piskotkih/">Piškotki</a></span></div>
  </footer>`);

  /* ---------- nav behaviour ---------- */
  const nav = $('.nav'), mega = $('.mega'), scrim = $('.mega-scrim'), mm = $('.mmenu');
  let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle('scrolled', y > 40);
    if (!mega.classList.contains('open') && !mm.classList.contains('open')) nav.classList.toggle('hide', y > lastY && y > 400);
    lastY = y;
  };
  const megaBtn = $('[data-mega]');
  let megaT;
  const openMega = (o) => { mega.classList.toggle('open', o); scrim.classList.toggle('open', o); nav.classList.toggle('open', o); mega.setAttribute('aria-hidden', !o); };
  megaBtn.addEventListener('click', () => openMega(!mega.classList.contains('open')));
  megaBtn.addEventListener('mouseenter', () => { clearTimeout(megaT); openMega(true); });
  mega.addEventListener('mouseenter', () => clearTimeout(megaT));
  [megaBtn, mega].forEach(el => el.addEventListener('mouseleave', () => { megaT = setTimeout(() => openMega(false), 250); }));
  scrim.addEventListener('click', () => openMega(false));
  addEventListener('keydown', e => { if (e.key === 'Escape') { openMega(false); mm.classList.remove('open'); nav.classList.remove('open'); } });
  $('.burger').addEventListener('click', () => { const o = !mm.classList.contains('open'); mm.classList.toggle('open', o); nav.classList.toggle('open', o); });

  /* ---------- smooth scroll ---------- */
  const hasG = window.gsap && window.ScrollTrigger;
  let lenis;
  if (hasG) gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasG) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
    lenis.on('scroll', ({ scroll }) => onScroll(scroll));
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80 }); } }));
  } else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  /* ---------- loader ---------- */
  const loader = $('.loader');
  const firstVisit = !sessionStorageGet('ss-seen');
  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function intro() {
    if (!hasG || reduce) { loader.remove(); return; }
    const tl = gsap.timeline({ onComplete: () => loader.remove() });
    if (firstVisit) {
      try { sessionStorage.setItem('ss-seen', '1'); } catch (e) {}
      tl.to('.loader .glow', { opacity: 1, scale: 1.1, duration: 1.1, ease: 'power2.out' })
        .fromTo('.loader img', { opacity: 0, y: 18, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }, '<.15')
        .to('.loader img', { opacity: 0, y: -14, duration: .6, ease: 'power2.in' }, '+=.35')
        .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=.2');
    } else tl.to(loader, { opacity: 0, duration: .45 });
    tl.add(heroIn, firstVisit ? '-=.55' : '-=.2');
  }

  /* ---------- text splitting ---------- */
  const splitLines = (el) => {
    const words = el.innerHTML.trim().split(/\s+(?![^<]*>)/);
    el.innerHTML = words.map(w => `<span class="wd" style="display:inline-block">${w}</span>`).join(' ');
    const ws = $$('.wd', el); const lines = []; let top = null;
    ws.forEach(w => { const t = w.offsetTop; if (t !== top) { lines.push([]); top = t; } lines[lines.length - 1].push(w.innerHTML); });
    el.innerHTML = lines.map(l => `<span class="line-mask"><span>${l.join(' ')}</span></span>`).join('');
    return $$('.line-mask>span', el);
  };

  function heroIn() {
    const h = $('[data-hero-title]');
    if (!h) return;
    const lines = splitLines(h);
    gsap.from(lines, { yPercent: 105, duration: 1.3, ease: 'expo.out', stagger: .09 });
    gsap.from('[data-hero-fade]', { opacity: 0, y: 24, duration: 1.1, ease: 'power3.out', stagger: .08, delay: .35 });
    const fr = $('.hero-media .frame, .page-cover');
    if (fr) gsap.fromTo(fr, { clipPath: 'inset(18% 6% 0% 6% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.6, ease: 'expo.out', delay: .15 });
  }

  /* ---------- scroll animations ---------- */
  function scrollFx() {
    if (!hasG || reduce) return;
    // hero image grows to full bleed
    const hm = $('.hero-media');
    if (hm) {
      gsap.to(hm, { marginLeft: 'calc(var(--gut) * -1)', marginRight: 'calc(var(--gut) * -1)', height: '100vh', ease: 'none', scrollTrigger: { trigger: hm, start: 'top 75%', end: 'top top', scrub: true } });
      gsap.to('.hero-media .frame', { borderRadius: 0, ease: 'none', scrollTrigger: { trigger: hm, start: 'top 30%', end: 'top top', scrub: true } });
      gsap.to('.hero-media img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: hm, start: 'top top', end: 'bottom top', scrub: true } });
    }
    // parallax inside frames
    $$('[data-par] img, .page-cover img, .split .pic:not(.blk):not(.wht) img, .quotes>img').forEach(img => {
      gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    // statement word fill
    $$('[data-fill]').forEach(el => {
      el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
      gsap.to($$('.w', el), { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true } });
    });
    // headings line reveal
    $$('[data-lines]').forEach(el => {
      const ls = splitLines(el);
      gsap.from(ls, { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: el, start: 'top 86%' } });
    });
    // generic fade up
    $$('[data-up]').forEach(el => gsap.from(el, { opacity: 0, y: 40, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
    $$('[data-stag]').forEach(g => gsap.from(g.children, { opacity: 0, y: 50, duration: 1.1, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: g, start: 'top 85%' } }));
    // counters
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count; const o = { v: +(el.dataset.from || 0) };
      gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => el.textContent = Math.round(o.v) + (el.dataset.suf || '') });
    });
    // reference rail horizontal drift
    const rail = $('.ref-rail');
    if (rail) gsap.fromTo(rail, { x: 0 }, { x: () => -(rail.scrollWidth - innerWidth + 40), ease: 'none', scrollTrigger: { trigger: rail, start: 'top 90%', end: 'bottom -10%', scrub: true, invalidateOnRefresh: true } });
    // footer word
    gsap.from('.foot .word', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.foot .word', start: 'top 95%' } });
  }

  /* ---------- collections stage (pinned) ---------- */
  function stage() {
    const st = $('.stage'); if (!st) return;
    const btns = $$('.stage-list button', st), pics = $$('.stage-pics img', st), infos = $$('.stage-info article', st), bar = $('.stage-bar i', st);
    const n = btns.length; let cur = -1;
    const set = (i) => { if (i === cur) return; cur = i; [btns, pics, infos].forEach(arr => arr.forEach((e, k) => e.classList.toggle('on', k === i))); };
    set(0);
    if (hasG && !reduce) {
      const trig = ScrollTrigger.create({ trigger: st, start: 'top top', end: () => '+=' + innerHeight * (n - 1) * .75, pin: true, scrub: true,
        onUpdate: s => { set(Math.min(n - 1, Math.floor(s.progress * n * .999))); bar.style.transform = `scaleX(${s.progress})`; } });
      btns.forEach((b, i) => b.addEventListener('click', () => {
        const y = trig.start + (trig.end - trig.start) * ((i + .5) / n);
        lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' });
      }));
      gsap.to('.stage .glow', { scale: 1.25, opacity: .7, ease: 'none', scrollTrigger: { trigger: st, start: 'top top', end: () => '+=' + innerHeight * (n - 1) * .75, scrub: true } });
    } else btns.forEach((b, i) => b.addEventListener('click', () => set(i)));
  }

  /* ---------- small interactions ---------- */
  function ui() {
    // type accordion
    const types = $$('.type');
    types.forEach(t => { t.addEventListener('mouseenter', () => matchMedia('(hover:hover)').matches && act(t)); t.addEventListener('click', () => act(t)); });
    function act(t) { types.forEach(x => x.classList.toggle('on', x === t)); }
    // generic switchers: [data-switch] container with buttons [data-k] and targets [data-v]
    $$('[data-switch]').forEach(sw => {
      const grp = sw.dataset.switch;
      const btns = $$('button[data-k]', sw);
      btns.forEach(b => b.addEventListener('click', () => {
        btns.forEach(x => x.classList.toggle('on', x === b));
        $$(`[data-grp="${grp}"] [data-v]`).forEach(v => v.classList.toggle('on', v.dataset.v === b.dataset.k));
        if (sw.dataset.filter !== undefined) $$(`[data-grp="${grp}"] figure`).forEach(f => f.classList.toggle('hid', b.dataset.k !== 'vse' && !f.dataset.t.includes(b.dataset.k)));
        if (hasG) ScrollTrigger.refresh();
      }));
    });
    // tabs via hash
    if (location.hash) { const b = $(`button[data-k="${location.hash.slice(1)}"]`); if (b) b.click(); }
    // quotes
    const qs = $$('.q'); if (qs.length) {
      let i = 0; const cnt = $('.q-nav .cnt');
      const show = (k) => { i = (k + qs.length) % qs.length; qs.forEach((q, j) => q.classList.toggle('on', j === i)); cnt.textContent = `${i + 1} / ${qs.length}`; };
      show(0); $('.q-prev').onclick = () => show(i - 1); $('.q-next').onclick = () => show(i + 1);
      let auto = setInterval(() => show(i + 1), 6500); $('.q-stack').addEventListener('mouseenter', () => clearInterval(auto));
    }
    // form
    $$('form.f').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); f.classList.add('sent'); f.querySelector('.ok').scrollIntoView({ block: 'nearest' }); }));
  }

  ui();
  addEventListener('load', () => { scrollFx(); stage(); if (hasG) ScrollTrigger.refresh(); });
  if (document.readyState === 'complete') { scrollFx(); stage(); }
  intro();
})();
