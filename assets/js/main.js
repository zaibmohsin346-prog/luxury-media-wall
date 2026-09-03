/* ==========================================================================
   MEDIA WALL STUDIO — Behaviour
   Vanilla ES2019+. No framework, no build step, no external libraries.
   Everything is progressive: if a browser lacks a feature the content still
   reads, it simply animates less.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- utils */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- IMAGEKIT */
  /* Single choke point for every image URL on the page.
     ImageKit off  ->  'assets/img/project-01-marble-halo-900.jpg'  (unchanged)
     ImageKit on   ->  '<endpoint>/media-wall/project-01-marble-halo.jpg?tr=w-900,q-auto,f-auto'
     The width baked into the local file name becomes the ImageKit w- value,
     so the responsive behaviour is identical either way. */
  const IK = (typeof IMAGEKIT !== 'undefined') ? IMAGEKIT : {};
  const ikEndpoint = (IK.urlEndpoint || '').replace(/\/+$/, '');
  const ikDir = IK.folder ? '/' + String(IK.folder).replace(/^\/+|\/+$/g, '') : '';
  const ikTr = IK.transform || 'q-auto,f-auto';

  function asset(path) {
    if (!ikEndpoint) return path;
    /* Absolute URLs (the hero is hard-coded) and anything outside our media
       folders pass straight through untouched. */
    const local = String(path).match(/^assets\/(?:img|video)\/(.+)$/);
    if (!local) return path;
    /* SVG stays local and stays vector. ImageKit rasterises it to WebP, which
       comes out both larger and softer than the 2 KB source file. */
    if (/\.svg$/i.test(path)) return path;

    const name = local[1];
    const sized = name.match(/^(.+)-(\d+)\.(jpe?g|png)$/i);
    if (sized) {
      return `${ikEndpoint}${ikDir}/${sized[1]}.${sized[3]}?tr=w-${sized[2]},${ikTr}`;
    }
    /* No size suffix — video. Plain CDN delivery with no `tr=` so it does not
       consume video-processing credits; ImageKit still optimises the file. */
    return `${ikEndpoint}${ikDir}/${name}`;
  }

  /* Build a responsive srcset from an image base path */
  const srcset = (base) =>
    `${asset(base + '-480.jpg')} 480w, ${asset(base + '-900.jpg')} 900w, ${asset(base + '-1400.jpg')} 1400w`;

  /* Grid cards never render wider than ~400 CSS px (the shell caps at 1320px),
     so 900w already gives a high-DPI phone well over 2x. Offering 1400w here
     would make 3x devices pull a desktop-sized file for a thumbnail. */
  const srcsetCard = (base) =>
    `${asset(base + '-480.jpg')} 480w, ${asset(base + '-900.jpg')} 900w`;
  const CARD_SIZES = '(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 400px';

  /* Escape values that end up inside markup */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  /* ================================================================ ICONS */
  const ICONS = {
    arrow: '<svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.3 6 20.6l1.3-6.8-5-4.7 6.8-.8z"/></svg>',
    grip: '<svg viewBox="0 0 8 12" aria-hidden="true"><path d="M8 0L2 6l6 6z"/></svg>',
    gripR: '<svg viewBox="0 0 8 12" aria-hidden="true"><path d="M0 0l6 6-6 6z"/></svg>',

    /* Minimal line icons for the services grid */
    svc: {
      wall:    '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="26" height="24"/><rect x="8" y="9" width="16" height="10"/><path d="M8 24h16"/></svg>',
      unit:    '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="24" height="13"/><rect x="6" y="23" width="20" height="5"/><path d="M16 19v4"/></svg>',
      stone:   '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="4" width="24" height="24"/><path d="M4 13c5 2 9-3 12 0s7 4 12 1M4 21c6 1 8-2 11 0s9 2 13-1"/></svg>',
      fluted:  '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 4v24M11 4v24M16 4v24M21 4v24M26 4v24"/><path d="M3 4h26M3 28h26"/></svg>',
      led:     '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="8" width="22" height="6" rx="1"/><path d="M8 18v3M13 18v5M19 18v5M24 18v3M3 27h26"/></svg>',
      storage: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="4" width="24" height="24"/><path d="M16 4v24M4 16h24"/><path d="M12 10h2M18 10h2M12 22h2M18 22h2"/></svg>'
    }
  };

  /* ============================================== 1. HEADER + NAVIGATION */
  function initHeader() {
    const header = $('#header');
    const burger = $('#burger');
    const drawer = $('#drawer');
    if (!header) return;

    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      /* Hide on the way down, bring it back the moment the user scrolls up */
      if (!drawer.classList.contains('is-open')) {
        header.classList.toggle('is-hidden', y > 600 && y > lastY + 6);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Mobile drawer */
    const setDrawer = (open) => {
      drawer.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-locked', open);
      if (open) header.classList.remove('is-hidden');
      /* Stagger the links in */
      $$('.drawer__link', drawer).forEach((el, i) => {
        el.style.transitionDelay = open ? `${140 + i * 60}ms` : '0ms';
      });
    };

    burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
    $$('.drawer__link, .drawer a', drawer).forEach((a) =>
      a.addEventListener('click', () => setDrawer(false))
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) setDrawer(false);
    });

    /* Highlight the section currently in view */
    const links = $$('.nav__link[href^="#"]');
    const targets = links
      .map((l) => ({ link: l, sec: $(l.getAttribute('href')) }))
      .filter((t) => t.sec);

    if ('IntersectionObserver' in window && targets.length) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.remove('is-active'));
          const match = targets.find((t) => t.sec === entry.target);
          if (match) match.link.classList.add('is-active');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      targets.forEach((t) => spy.observe(t.sec));
    }
  }

  /* ================================================ 2. HERO VIDEO LOADING */
  /* Only fetch the hero video where it genuinely improves things: a wide
     screen, motion allowed, and not on a metered connection.              */
  function initHeroVideo() {
    const video = $('#heroVideo');
    if (!video) return;

    const conn = navigator.connection || {};
    const cheap = conn.saveData === true || /2g/.test(conn.effectiveType || '');
    const wide = window.matchMedia('(min-width: 1024px)').matches;

    if (REDUCED || cheap || !wide) return;

    const source = document.createElement('source');
    source.src = asset(video.dataset.src);
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();

    video.addEventListener('canplay', () => {
      video.classList.add('is-ready');
      const p = video.play();
      if (p && p.catch) p.catch(() => video.classList.remove('is-ready'));
    }, { once: true });
  }

  /* ====================================================== 3. RENDER: HERO */
  function renderContactBits() {
    $$('[data-wa]').forEach((el) => {
      el.href = waLink(el.dataset.wa || '');
    });
    $$('[data-phone-link]').forEach((el) => { el.href = 'tel:' + CONTACT.phoneDial; });
    $$('[data-phone-text]').forEach((el) => { el.textContent = CONTACT.phoneDisplay; });

    /* Second line. If phoneDial2 is blank, every element carrying it is
       removed, so clearing the config cleanly removes the number sitewide. */
    const has2 = Boolean(CONTACT.phoneDial2);
    $$('[data-phone2]').forEach((el) => {
      if (!has2) { el.remove(); return; }
      if (el.hasAttribute('data-phone2-link')) el.href = 'tel:' + CONTACT.phoneDial2;
      if (el.hasAttribute('data-phone2-wa')) el.href = CONTACT.whatsapp2;
    });
    if (has2) $$('[data-phone2-text]').forEach((el) => { el.textContent = CONTACT.phoneDisplay2; });
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ================================================== 4. RENDER: PROJECTS */
  function renderProjects() {
    const grid = $('#projectsGrid');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map((p, i) => `
      <button type="button" class="project-card" data-project="${i}"
              data-reveal style="--reveal-delay:${(i % 3) * 90}ms"
              aria-label="View project ${p.n}: ${esc(p.title)}">
        <span class="project-card__media">
          <img src="${asset(p.img + `-480.jpg`)}"
               srcset="${srcsetCard(p.img)}"
               sizes="${CARD_SIZES}"
               width="1792" height="2400"
               loading="lazy" decoding="async"
               alt="${esc(p.alt)}">
          <span class="project-card__veil"></span>
          <span class="project-card__num">${p.n} <i>/</i> 09</span>
          <span class="project-card__body">
            <span class="project-card__title">${esc(p.title)}</span>
            <span class="project-card__line"></span>
            <span class="project-card__reveal"><span>
              <span class="project-card__desc">${esc(p.short)}</span>
              <span class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</span>
              <span class="project-card__cta">View Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </span></span>
          </span>
        </span>
      </button>
    `).join('');

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('[data-project]');
      if (card) openModal(Number(card.dataset.project));
    });
  }

  /* ===================================================== 5. PROJECT MODAL */
  let lastFocused = null;
  let modalOpen = false;

  function openModal(index, fromHistory) {
    const p = PROJECTS[index];
    const modal = $('#modal');
    if (!p || !modal) return;

    lastFocused = document.activeElement;

    $('#modalImg').src = asset(p.img + '-900.jpg');
    $('#modalImg').srcset = srcset(p.img);
    $('#modalImg').alt = p.alt;
    $('#modalBadge').innerHTML = `Project <i>${p.n}</i> / 09`;
    $('#modalTitle').textContent = p.title;
    $('#modalIntro').textContent = p.short;
    $('#modalLocation').textContent = p.location;
    $('#modalMaterials').textContent = p.materials;
    $('#modalStyle').textContent = p.style;
    $('#modalLighting').textContent = p.lighting;
    $('#modalFeatures').innerHTML = p.features.map((f) => `<li>${esc(f)}</li>`).join('');
    /* Tell the share buttons which project is currently open */
    const shareBtns = [$('#modalShare'), $('#modalShareWa')];
    shareBtns.forEach((b) => { if (b) b.dataset.index = String(index); });

    $('#modalWa').href = waLink(
      `Hello Media Wall Studio, I would like a design similar to Project ${p.n} — ${p.title}. Could you send me a quote?`
    );

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    modalOpen = true;
    $('#modalClose').focus();

    /* A project needs its own address before it is worth sharing. Pushing a
       history entry also means the phone's back gesture closes the modal
       instead of leaving the whole site. */
    if (!fromHistory) {
      try {
        history.pushState({ mwProject: index }, '', '#project-' + p.n);
      } catch (e) { /* file:// blocks pushState — sharing still works */ }
    }
  }

  function closeModal(fromHistory) {
    if (!modalOpen) return;
    const modal = $('#modal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    modalOpen = false;
    if (lastFocused) lastFocused.focus();

    if (!fromHistory && history.state && history.state.mwProject != null) {
      try { history.back(); } catch (e) { /* ignore */ }
    }
  }

  /* ------------------------------------------------------------ SHARING */
  /* navigator.share opens the real OS share sheet on a phone (WhatsApp,
     Messages, Mail). Desktop browsers mostly lack it, so we fall back to
     copying the link. Both paths are wrapped because share() rejects with
     AbortError whenever the user simply dismisses the sheet. */
  async function shareLink(btn, title, text, url) {
    const done = (label) => {
      const original = btn.dataset.label || btn.textContent;
      btn.dataset.label = original;
      btn.textContent = label;
      setTimeout(() => { btn.textContent = btn.dataset.label; }, 2200);
    };

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') return;   /* user cancelled */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      done('Link copied');
    } catch (e) {
      /* Clipboard needs a secure context; select the URL so it can be copied */
      window.prompt('Copy this link:', url);
    }
  }

  const shareUrl = (hash) => location.origin + location.pathname + (hash || '');

  function initShare() {
    /* Share the whole site */
    const site = $('#shareSite');
    if (site) {
      site.addEventListener('click', () => shareLink(
        site,
        'Media Wall Studio',
        'Bespoke media walls and luxury TV walls in Dubai.',
        shareUrl()
      ));
    }
    const siteWa = $('#shareSiteWa');
    if (siteWa) {
      siteWa.addEventListener('click', () => {
        const msg = 'Media Wall Studio — bespoke media walls in Dubai: ' + shareUrl();
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

    /* Share the open project */
    const proj = $('#modalShare');
    if (proj) {
      proj.addEventListener('click', () => {
        const i = Number(proj.dataset.index || 0);
        const p = PROJECTS[i];
        if (!p) return;
        shareLink(proj, p.title + ' — Media Wall Studio', p.short, shareUrl('#project-' + p.n));
      });
    }
    const projWa = $('#modalShareWa');
    if (projWa) {
      projWa.addEventListener('click', () => {
        const i = Number(projWa.dataset.index || 0);
        const p = PROJECTS[i];
        if (!p) return;
        const msg = `${p.title} — Media Wall Studio\n${shareUrl('#project-' + p.n)}`;
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

    /* Back / forward moves between the page and an open project */
    window.addEventListener('popstate', (e) => {
      const idx = e.state && e.state.mwProject;
      if (idx != null && !modalOpen) openModal(idx, true);
      else if (idx == null && modalOpen) closeModal(true);
    });

    /* Resolve "#project-07" to a project index, or -1 */
    const indexFromHash = (hash) => {
      const m = String(hash).match(/^#project-(\d{1,2})$/);
      if (!m) return -1;
      return PROJECTS.findIndex((p) => p.n === m[1].padStart(2, '0'));
    };

    /* Someone arrived on a shared link — open that project */
    const initial = indexFromHash(location.hash);
    if (initial >= 0) setTimeout(() => openModal(initial, true), 350);

    /* A project link pasted into the address bar while the site is already
       open only changes the fragment — no reload, so boot never re-runs. */
    window.addEventListener('hashchange', () => {
      const i = indexFromHash(location.hash);
      if (i >= 0 && !modalOpen) openModal(i, true);
    });
  }

  function initModal() {
    const modal = $('#modal');
    if (!modal) return;

    $('#modalClose').addEventListener('click', closeModal);
    $('.modal__backdrop', modal).addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;

      if (e.key === 'Escape') { closeModal(); return; }

      /* Keep the keyboard inside the dialog while it is open */
      if (e.key === 'Tab') {
        const focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', modal)
          .filter((el) => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ============================================= 6. BEFORE / AFTER SLIDER */
  function renderTransforms() {
    const wrap = $('#baGrid');
    if (!wrap) return;

    wrap.innerHTML = TRANSFORMS.map((t, i) => `
      <article class="ba-card" data-reveal style="--reveal-delay:${i * 110}ms">
        <div class="ba-stage" style="--pos:50%"
             role="slider" tabindex="0"
             aria-label="Before and after: ${esc(t.title)}"
             aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"
             aria-valuetext="50% revealed">
          <img class="ba-before" src="${asset(t.before + `-900.jpg`)}"
               srcset="${srcsetCard(t.before)}"
               sizes="${CARD_SIZES}"
               alt="${esc(t.beforeAlt)}" loading="lazy" decoding="async">
          <img class="ba-stage__after" src="${asset(t.after + `-900.jpg`)}"
               srcset="${srcsetCard(t.after)}"
               sizes="${CARD_SIZES}"
               alt="${esc(t.afterAlt)}" loading="lazy" decoding="async">
          <span class="ba-stage__label ba-stage__label--before">Before</span>
          <span class="ba-stage__label ba-stage__label--after">After</span>
          <span class="ba-stage__handle">
            <span class="ba-stage__grip">${ICONS.grip}${ICONS.gripR}</span>
          </span>
        </div>
        <div class="ba-card__body">
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.text)}</p>
        </div>
      </article>
    `).join('');

    $$('.ba-stage', wrap).forEach(bindSlider);
  }

  function bindSlider(stage) {
    let dragging = false;

    const set = (pct) => {
      const v = Math.max(0, Math.min(100, pct));
      stage.style.setProperty('--pos', v + '%');
      stage.setAttribute('aria-valuenow', Math.round(v));
      stage.setAttribute('aria-valuetext', Math.round(v) + '% revealed');
    };

    const fromEvent = (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      set((x / rect.width) * 100);
    };

    /* Pointer events cover mouse, pen and touch in one path */
    const down = (e) => {
      dragging = true;
      stage.setPointerCapture && e.pointerId != null && stage.setPointerCapture(e.pointerId);
      fromEvent(e);
    };
    const move = (e) => {
      if (!dragging) return;
      if (e.cancelable) e.preventDefault();
      fromEvent(e);
    };
    const up = () => { dragging = false; };

    if (window.PointerEvent) {
      stage.addEventListener('pointerdown', down);
      stage.addEventListener('pointermove', move);
      stage.addEventListener('pointerup', up);
      stage.addEventListener('pointercancel', up);
    } else {
      stage.addEventListener('mousedown', down);
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
      stage.addEventListener('touchstart', down, { passive: true });
      stage.addEventListener('touchmove', move, { passive: false });
      stage.addEventListener('touchend', up);
    }

    /* Hovering alone nudges the reveal — feels alive without a drag */
    stage.addEventListener('mousemove', (e) => { if (!dragging && window.matchMedia('(hover:hover)').matches) fromEvent(e); });

    stage.addEventListener('keydown', (e) => {
      const cur = parseFloat(stage.style.getPropertyValue('--pos')) || 50;
      const step = e.shiftKey ? 10 : 4;
      if (e.key === 'ArrowLeft')  { e.preventDefault(); set(cur - step); }
      if (e.key === 'ArrowRight') { e.preventDefault(); set(cur + step); }
      if (e.key === 'Home')       { e.preventDefault(); set(0); }
      if (e.key === 'End')        { e.preventDefault(); set(100); }
    });
  }

  /* ================================================== 7. RENDER: SERVICES */
  function renderServices() {
    const grid = $('#servicesGrid');
    if (!grid) return;

    grid.innerHTML = SERVICES.map((s, i) => `
      <article class="svc-card${s.flagship ? ' svc-card--flagship' : ''}"
               data-reveal style="--reveal-delay:${(i % 3) * 90}ms">
        <div class="svc-card__media">
          <img src="${asset(s.img + '-900.jpg')}"
               srcset="${srcsetCard(s.img)}"
               sizes="${CARD_SIZES}"
               style="object-position:${s.focus || '50% 50%'}"
               loading="lazy" decoding="async" alt="${esc(s.alt || s.title)}">
        </div>
        <div class="svc-card__body">
          <span class="svc-card__label">${esc(s.label || '')}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <a class="svc-card__cta" href="${waLink(
            `Hello Media Wall Studio, I would like to enquire about ${s.title}. Could you tell me more?`
          )}" target="_blank" rel="noopener">
            ${esc(s.cta || 'Enquire')}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </article>
    `).join('');
  }

  /* =================================================== 8. RENDER: PROCESS */
  function renderProcess() {
    const grid = $('#processGrid');
    if (!grid) return;
    grid.innerHTML = PROCESS.map((s, i) => `
      <article class="step" data-reveal style="--reveal-delay:${(i % 3) * 100}ms">
        <span class="step__num">${s.n}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <span class="step__bar"></span>
      </article>
    `).join('');
  }

  /* ================================================= 9. RENDER: MATERIALS */
  function renderMaterials() {
    const grid = $('#materialsGrid');
    if (!grid) return;
    grid.innerHTML = MATERIALS.map((m, i) => `
      <article class="mat" tabindex="0" data-reveal style="--reveal-delay:${(i % 5) * 70}ms;
               background-image:url('${asset(m.src)}'); background-position:${m.pos}; background-size:${m.size};"
               aria-label="${esc(m.name)}. ${esc(m.desc)} Typical application: ${esc(m.use)}.">
        <div class="mat__inner">
          <h3 class="mat__name">${esc(m.name)}</h3>
          <div class="mat__meta"><div>
            <p class="mat__desc">${esc(m.desc)}</p>
            <span class="mat__use">${esc(m.use)}</span>
          </div></div>
        </div>
      </article>
    `).join('');
  }

  /* =========================================== 10. RENDER: DETAIL GALLERY */
  function renderDetails() {
    const grid = $('#detailsGrid');
    if (!grid) return;
    grid.innerHTML = DETAILS.map((d, i) => `
      <div class="masonry__item masonry__item--${d.shape}" data-caption="${esc(d.caption)}"
           data-reveal="scale" style="--reveal-delay:${(i % 4) * 80}ms;
           background-image:url('${asset(d.src)}'); background-position:${d.pos}; background-size:${d.size};"
           role="img" aria-label="${esc(d.caption)} — close-up detail"></div>
    `).join('');
  }

  /* ============================================== 11. RENDER: TESTIMONIALS */
  function renderQuotes() {
    const grid = $('#quotesGrid');
    if (!grid) return;
    grid.innerHTML = TESTIMONIALS.map((q, i) => `
      <figure class="quote" data-reveal style="--reveal-delay:${i * 110}ms">
        <span class="quote__mark" aria-hidden="true">&ldquo;</span>
        <div class="quote__stars" aria-label="Five out of five stars">${ICONS.star.repeat(5)}</div>
        <blockquote><p>${esc(q.text)}</p></blockquote>
        <figcaption class="quote__by">
          <b>${esc(q.by)}</b><span>${esc(q.meta)}</span>
        </figcaption>
      </figure>
    `).join('');
  }

  /* =============================================== 12. WALL CONFIGURATOR */
  function initConfigurator() {
    const stage = $('#cfgStage');
    const swatches = $('#cfgSwatches');
    if (!stage || !swatches) return;

    const caption = $('#cfgCaption');

    swatches.innerHTML = FINISHES.map((f, i) => `
      <button type="button" class="swatch${i === 0 ? ' is-active' : ''}" data-finish="${f.id}"
              style="background-image:url('${asset(f.src)}'); background-position:${f.pos}; background-size:${f.size};"
              aria-pressed="${i === 0}">
        <span>${esc(f.label)}</span>
      </button>
    `).join('');

    const photo   = $('#cfgPhoto');
    const title   = $('#cfgMatchTitle');
    const spec    = $('#cfgMatchSpec');
    const openBtn = $('#cfgMatchOpen');

    let finish = FINISHES[0].id;
    let matched = 0;

    const wanted = () => $$('[data-toggle]')
      .filter((b) => b.getAttribute('aria-pressed') === 'true')
      .map((b) => b.dataset.toggle);

    const FEATURE_LABEL = {
      led: 'LED lighting', cabinet: 'floating cabinet', tall: 'tall storage',
      fire: 'fireplace', shelves: 'open shelving'
    };

    /* Score every completed project against the selection: the finish carries
       most of the weight, then each requested feature present adds, each one
       missing subtracts. Highest score wins. */
    const ALL_FEATURES = ['led', 'cabinet', 'tall', 'fire', 'shelves'];

    function bestMatch() {
      const want = wanted();
      const wantsFire = want.indexOf('fire') > -1;

      /* A fireplace is binary and visually dominant — showing one when the
         toggle is off reads as a bug, so it filters rather than scores. */
      let pool = DESIGN_TRAITS.filter((t) => (t.has.indexOf('fire') > -1) === wantsFire);
      if (!pool.length) pool = DESIGN_TRAITS;

      let best = pool[0], bestScore = -Infinity;
      pool.forEach((t) => {
        let s = t.finish === finish ? 4 : 0;
        ALL_FEATURES.forEach((f) => {
          const asked = want.indexOf(f) > -1;
          const present = t.has.indexOf(f) > -1;
          if (asked && present) s += 1;
          else if (asked && !present) s -= 1.5;
          else if (!asked && present) s -= 0.4;   /* extras are a mild mismatch */
        });
        if (s > bestScore) { bestScore = s; best = t; }
      });
      return best;
    }

    function update() {
      const t = bestMatch();
      const p = PROJECTS[t.p];
      if (!p) return;
      matched = t.p;

      /* Cross-fade rather than snap */
      photo.style.opacity = '0';
      const next = new Image();
      next.onload = () => {
        photo.src = next.src;
        photo.alt = p.alt;
        photo.style.opacity = '1';
      };
      next.src = asset(p.img + '-1400.jpg');

      title.textContent = p.title;
      const want = wanted();
      spec.textContent = want.length
        ? p.location + ' — ' + want.map((f) => FEATURE_LABEL[f]).join(', ')
        : p.location;
      openBtn.setAttribute('aria-label', 'View the full specification for ' + p.title);
    }

    const applyFinish = (id) => {
      finish = id;
      $$('.swatch', swatches).forEach((b) => {
        const on = b.dataset.finish === id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      const f = FINISHES.find((x) => x.id === id) || FINISHES[0];
      if (caption) caption.innerHTML = `Finish &nbsp;<b>${esc(f.label)}</b>`;
      update();
    };

    swatches.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-finish]');
      if (btn) applyFinish(btn.dataset.finish);
    });

    $$('[data-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true'));
        update();
      });
    });

    openBtn.addEventListener('click', () => openModal(matched));

    applyFinish(FINISHES[0].id);
  }

  /* ========================================================= 13. VIDEO */
  function initVideo() {
    const frame = $('#videoFrame');
    const video = $('#reelVideo');
    const btn = $('#videoPlay');
    if (!frame || !video || !btn) return;

    const loader = $('#videoLoader');
    const showLoader = (on) => { if (loader) loader.classList.toggle('is-on', on); };

    btn.addEventListener('click', () => {
      if (!video.querySelector('source')) {
        const s = document.createElement('source');
        s.src = asset(video.dataset.src);
        s.type = 'video/mp4';
        video.appendChild(s);
        video.load();
      }
      video.muted = false;
      video.controls = true;
      frame.classList.add('is-playing');

      /* The file streams from the CDN, so there is a real wait on first play.
         Only show the loader if it is still not ready after a moment —
         flashing a spinner for 100ms is worse than showing nothing. */
      if (video.readyState < 3) {
        setTimeout(() => { if (video.readyState < 3) showLoader(true); }, 250);
      }

      const p = video.play();
      if (p && p.catch) p.catch(() => { video.muted = true; video.play(); });
    });

    ['playing', 'canplay', 'canplaythrough', 'error'].forEach((ev) =>
      video.addEventListener(ev, () => showLoader(false))
    );
    /* Mid-stream stalls get the same treatment */
    ['waiting', 'stalled'].forEach((ev) =>
      video.addEventListener(ev, () => { if (frame.classList.contains('is-playing')) showLoader(true); })
    );

    video.addEventListener('ended', () => {
      frame.classList.remove('is-playing');
      showLoader(false);
    });
  }

  /* ==================================================== 14. ENQUIRY FORM */
  function initForm() {
    const form = $('#enquiryForm');
    if (!form) return;

    /* Populate the media-wall type dropdown from config */
    const select = $('#wallType', form);
    if (select) {
      select.innerHTML = '<option value="" disabled selected>Select a type</option>' +
        WALL_TYPES.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join('');
    }

    const showError = (field, on) => {
      field.closest('.field').classList.toggle('has-error', on);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const required = $$('[required]', form);
      let ok = true;
      required.forEach((f) => {
        const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
        showError(f, bad);
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;

      const v = (id) => (($(`#${id}`, form) || {}).value || '').trim();

      /* No backend required: the enquiry is handed straight to WhatsApp,
         fully formatted, so nothing is lost between the form and the studio. */
      const lines = [
        'New media wall enquiry',
        '',
        `Name: ${v('fName')}`,
        `Phone: ${v('fPhone')}`,
        `Email: ${v('fEmail')}`,
        `Location: ${v('fLocation')}`,
        `Media wall type: ${v('wallType')}`,
        `Approximate wall size: ${v('fSize')}`,
        '',
        `Message: ${v('fMessage') || '—'}`
      ];

      window.open(waLink(lines.join('\n')), '_blank', 'noopener');

      const status = $('#formStatus', form);
      status.classList.add('is-shown');
      status.textContent =
        `Thank you ${v('fName')} — WhatsApp is opening with your enquiry ready to send. ` +
        `If it did not open, message us directly on ${CONTACT.phoneDisplay}.`;
      status.focus();
      form.reset();
    });

    /* Clear the error state as soon as the field is corrected */
    form.addEventListener('input', (e) => {
      if (e.target.closest('.field.has-error')) showError(e.target, false);
    });
  }

  /* ==================================================== 15. SCROLL REVEAL */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || REDUCED) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* Split headings into words so they can rise line by line */
  function initWordReveal() {
    $$('.reveal-words').forEach((el) => {
      if (el.dataset.split) return;
      el.dataset.split = '1';
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map((w, i) => `<span class="word" style="--i:${i}"><i>${esc(w)}</i></span>`)
        .join(' ');
      el.setAttribute('data-reveal', 'fade');
    });
  }

  /* ================================================ 16. FLOATING WHATSAPP */
  function initFloat() {
    const el = $('#waFloat');
    if (!el) return;
    const show = () => el.classList.toggle('is-in', window.scrollY > 520);
    show();
    window.addEventListener('scroll', show, { passive: true });
  }

  /* ============================================ 17. STATIC MEDIA -> IK */
  /* The images written directly into index.html. Only elements tagged
     data-ik are rewritten, and every one of them is lazy-loaded, so nothing
     has started downloading yet and no request is wasted.

     The hero image is deliberately NOT tagged: it is preloaded in <head> and
     rewriting it at runtime would fetch it twice. Once your ImageKit endpoint
     is live, hard-code the hero <img> and its <link rel="preload"> instead. */
  function rewriteStaticMedia() {
    if (!ikEndpoint) return;

    $$('img[data-ik]').forEach((img) => {
      const src = img.getAttribute('src');
      const set = img.getAttribute('srcset');
      if (src) img.setAttribute('src', asset(src));
      if (set) {
        img.setAttribute('srcset', set.split(',').map((part) => {
          const bits = part.trim().split(/\s+/);
          return asset(bits[0]) + (bits[1] ? ' ' + bits[1] : '');
        }).join(', '));
      }
    });

    $$('video[data-ik][poster]').forEach((v) => {
      v.setAttribute('poster', asset(v.getAttribute('poster')));
    });
  }

  /* ====================================================== 18. SIGNATURE */
  /* Injects the pre-computed outline. pathLength="1" lets the CSS animate
     the dash without ever measuring the path in JavaScript. */
  function renderSignature() {
    const host = $('#signature');
    if (!host || typeof SIGNATURE === 'undefined') return;

    host.innerHTML =
      `<svg viewBox="${SIGNATURE.viewBox}" role="img" aria-label="${esc(SIGNATURE.text)}">` +
        `<path d="${SIGNATURE.d}" pathLength="1"/>` +
      `</svg>`;

    /* Reuse the shared scroll observer rather than adding a second one */
    host.setAttribute('data-reveal', 'fade');
  }

  /* ========================================================= 19. MARQUEE */
  function initMarquee() {
    const track = $('#marqueeTrack');
    if (!track) return;
    /* Duplicate the group so the -50% loop is seamless */
    track.appendChild(track.firstElementChild.cloneNode(true));
  }

  /* ============================================================ 18. BOOT */
  function boot() {
    rewriteStaticMedia();
    renderContactBits();
    renderProjects();
    renderTransforms();
    renderServices();
    renderProcess();
    renderMaterials();
    renderDetails();
    renderQuotes();
    renderSignature();

    initHeader();
    initHeroVideo();
    initModal();
    initShare();
    initConfigurator();
    initVideo();
    initForm();
    initMarquee();
    initFloat();

    initWordReveal();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
