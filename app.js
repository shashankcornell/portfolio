(function () {
  'use strict';
  var S = window.SITE;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ARROW_L = '<svg class="arrow" viewBox="0 0 30 20" aria-hidden="true"><path d="M13 1 L2 10 L13 19 M2 10 L22 10"/></svg>';
  var ARROW_R = '<svg class="arrow" viewBox="0 0 30 20" aria-hidden="true"><path d="M17 1 L28 10 L17 19 M28 10 L8 10"/></svg>';
  var SECTION = { build: 'I build', write: 'I write' };

  // Which list and column each entry lives in, and the product order for case-study paging.
  var place = {};
  ['build', 'write'].forEach(function (list) {
    S.lists[list].forEach(function (col) {
      col.items.forEach(function (slug) { place[slug] = { list: list, cat: col.title }; });
    });
  });
  var PRODUCTS = S.lists.build[0].items;
  var isCase = function (slug) { return !!(S.entries[slug] && S.entries[slug].story); };

  // ---------- State and routing (plain #tokens so links can be shared) ----------
  var state = { view: 'home', cv: null, post: null };
  function parse(hash) {
    var h = (hash || '').replace(/^#/, '');
    if (!h || h === 'home') return { view: 'home', cv: null, post: null };
    if (h === 'about' || h === 'build' || h === 'write' || h === 'resume') return { view: h, cv: null, post: null };
    if (h === 'resume-product' || h === 'resume-policy') return { view: 'resume', cv: h.slice(7), post: null };
    if (S.entries[h]) return { view: place[h] ? place[h].list : 'home', cv: null, post: h };
    return { view: 'home', cv: null, post: null };
  }
  function hashFor(st) {
    if (st.post) return st.post;
    if (st.cv) return 'resume-' + st.cv;
    return st.view === 'home' ? '' : st.view;
  }
  function go(st) {
    var h = hashFor(st);
    if (('#' + h) === location.hash || (!h && !location.hash)) { apply(st); return; }
    try { location.hash = h; } catch (e) { apply(st); }
  }
  window.addEventListener('hashchange', function () {
    var h = location.hash.replace(/^#/, '');
    if (S.entries[h] && S.entries[h].page) { location.href = S.entries[h].page; return; }
    apply(parse(location.hash));
  });

  // ---------- Stage ----------
  function buildStage() {
    var nameLink = 'I’m ' + esc(S.name) + '.';
    $('#stage').innerHTML =
      '<div class="topbar">' +
        '<a href="#" class="back-left" data-go="home" aria-label="Back">' + ARROW_L + '</a>' +
        '<a href="#resume" class="resume-link" data-go="resume">Resume</a>' +
        '<a href="#" class="back-right fade" data-go="home" aria-label="Back">' + ARROW_R + '</a>' +
        '<nav class="nav" aria-label="Main"><a href="#about" data-go="about">' + nameLink + '</a><a href="#build" data-go="build">I build,</a><a href="#write" data-go="write">and I write</a></nav>' +
      '</div>' +
      '<div class="chooser fade"><a href="#resume-product" data-cv="product">Product</a><a href="#resume-policy" data-cv="policy">Public policy</a></div>' +
      '<div class="about-square fade"' + (S.photo ? ' style="background-image:url(' + esc(S.photo) + ')"' : '') + '></div>' +
      '<div class="about-text fade"><div class="sbar"><i></i></div><div class="about-scroll"><p>' + esc(S.about) + '</p></div></div>' +
      '<div class="lists fade"></div>' +
      '<div class="home-line fade">' + (S.home ? '<span class="hl-label">' + esc(S.home.label) + '</span><div class="hl-links">' +
        S.home.items.filter(function (k) { return S.entries[k]; }).map(function (k) {
          var p = place[k];
          return '<a href="#' + k + '" data-post="' + k + '"><span class="w">' + (p ? SECTION[p.list] : '') + '</span><span class="t">' + esc(S.entries[k].title) + ' →</span></a>';
        }).join('') + '</div>' : '') + '</div>' +
      '<div id="overlay-slot"></div>';
    var sc = $('.about-scroll');
    trackScroll(sc, $('.about-text .sbar'));
  }

  function renderLists(list) {
    var cols = S.lists[list];
    $('.lists').setAttribute('data-list', list);
    $('.lists').innerHTML = cols.map(function (c, i) {
      return '<div class="col' + (i ? ' right' : '') + '"><div class="col-title">' + esc(c.title) + '</div><div class="col-items">' +
        c.items.map(function (slug, k) {
          var n = '<span class="n">' + (k + 1) + '.</span>', t = '<span>' + esc(S.entries[slug].title) + '</span>';
          return '<a href="#' + slug + '" data-post="' + slug + '">' + (i ? t + n : n + t) + '</a>';
        }).join('') + '</div></div>';
    }).join('');
  }

  // Custom thin scroll indicator that appears while scrolling.
  function trackScroll(el, bar) {
    if (!el || !bar) return;
    var thumb = bar.querySelector('i'), t;
    function measure() {
      var max = el.scrollHeight - el.clientHeight;
      var th = Math.min(1, Math.max(0.12, el.clientHeight / Math.max(1, el.scrollHeight)));
      var tp = max > 0 ? el.scrollTop / max : 0;
      thumb.style.height = th * 100 + '%';
      thumb.style.top = tp * (1 - th) * 100 + '%';
    }
    el.addEventListener('scroll', function () {
      measure(); bar.classList.add('on');
      clearTimeout(t); t = setTimeout(function () { bar.classList.remove('on'); }, 900);
    }, { passive: true });
    measure();
  }

  // ---------- Resume ----------
  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"></rect><path d="M3.5 6l8.5 7 8.5-7"></path></svg>'
  };
  function initials(s) { return String(s).split(/[\s,()]+/).filter(function (w) { return /^[A-Z]/.test(w); }).slice(0, 2).map(function (w) { return w[0]; }).join(''); }

  function renderCv(id) {
    var r = S.resumes[id], L = S.links;
    var icons = (L.linkedin ? '<a href="' + esc(L.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">' + ICONS.linkedin + '</a>' : '') +
      (L.github ? '<a href="' + esc(L.github) + '" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">' + ICONS.github + '</a>' : '') +
      (L.email ? '<a href="mailto:' + esc(L.email) + '" aria-label="Email" title="' + esc(L.email) + '">' + ICONS.email + '</a>' : '');
    var secs = r.sections.map(function (sec) {
      return '<section class="cv-sec"><h2>' + esc(sec.h) + '</h2>' + sec.items.map(function (it) {
        var links = (it.links || []).map(function (l) {
          if (typeof l === 'string') {
            var p = place[l];
            return '<a class="xlink" href="#' + l + '" data-post="' + l + '"><span class="w">' + SECTION[p.list] + ' /</span><span class="t">' + esc(S.entries[l].title) + ' →</span></a>';
          }
          return '<a class="xlink" href="' + esc(l.href) + '" target="_blank" rel="noopener"><span class="w">' + esc(l.where) + '</span><span class="t">' + esc(l.title) + ' →</span></a>';
        }).join('');
        var logo = it.logo ? '<img src="' + esc(it.logo) + '" alt="">' : esc(initials(it.org));
        return '<div class="cv-item"><button class="cv-row" type="button" aria-expanded="false">' +
          '<span class="logo" aria-hidden="true">' + logo + '</span>' +
          '<span class="cv-what"><span class="r">' + esc(it.role) + '</span><span class="o">' + esc(it.org) + '</span></span>' +
          '<span class="cv-dates">' + esc(it.dates) + '</span><span class="plus" aria-hidden="true">+</span></button>' +
          '<div class="cv-body"><div><div class="cv-inner"><p>' + esc(it.desc) + '</p>' + links + '</div></div></div></div>';
      }).join('') + '</section>';
    }).join('');
    return overlay('from-left',
      // Resume sits to the left of home, so its back arrow is on the right and Download is on the left.
      '<div class="ohead"><div class="dl dl-left"><a href="' + (r.pdf ? esc(r.pdf) : '#') + '" ' + (r.pdf ? 'download' : 'data-print="' + id + '"') + '>Download PDF ↓</a><span>Last updated ' + esc(r.updated) + '</span></div><span></span>' +
      '<a href="#resume" data-go="resume" aria-label="Back">' + ARROW_R + '</a></div>' +
      '<article class="cv"><div class="cv-top"><h1>' + esc(S.name) + '</h1><p class="lede">' + esc(r.lede) + '</p><div class="cv-icons">' + icons + '</div></div>' + secs + '</article>');
  }

  function printCv(id) {
    var cv = S.resumes[id], L = S.links;
    var contact = [L.linkedin && L.linkedin.replace(/^https?:\/\/(www\.)?/, ''), L.github && L.github.replace(/^https?:\/\//, ''), L.email].filter(Boolean).join(' · ');
    var body = '<p>' + esc(cv.lede) + '</p>' + cv.sections.map(function (s) {
      return '<h2>' + esc(s.h) + '</h2>' + s.items.map(function (i) {
        return '<div class="it"><div class="row"><span>' + esc(i.role) + '<span class="m">, ' + esc(i.org) + '</span></span><span class="m d">' + esc(i.dates) + '</span></div><p>' + esc(i.desc) + '</p></div>';
      }).join('');
    }).join('');
    var w = window.open('', '_blank');
    if (!w) return;
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>' + esc(S.name) + ' — ' + esc(cv.title) + '</title><style>' +
      "@page{margin:18mm}body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;font-size:11pt}" +
      'h1{font-weight:300;font-size:26pt;letter-spacing:-0.03em;margin:0 0 4pt}.top{display:flex;justify-content:space-between;margin-bottom:20pt}' +
      'h2{font-size:9pt;font-weight:400;color:#777;border-bottom:1px solid #ddd;padding-bottom:4pt;margin:18pt 0 8pt}' +
      '.it{margin-bottom:10pt;break-inside:avoid}.row{display:flex;justify-content:space-between;gap:16pt}.m{color:#777}.d{font-size:9pt;white-space:nowrap}p{margin:2pt 0 0;color:#444;line-height:1.45}' +
      '</style></head><body><h1>' + esc(S.name) + '</h1><div class="top"><span>' + esc(cv.title) + '</span><span class="m d">Last updated ' + esc(cv.updated) + '</span></div>' +
      '<div class="m d" style="margin:-12pt 0 16pt">' + esc(contact) + '</div>' + body + '</body></html>');
    w.document.close();
    setTimeout(function () { try { w.focus(); w.print(); } catch (e) {} }, 400);
  }

  // ---------- Case study ----------
  function shot(src, cls, label) {
    return '<div class="shot ' + cls + '">' + (src ? '<img src="' + esc(src) + '" alt="">' : esc(label)) + '</div>';
  }
  function renderCase(slug) {
    var d = S.entries[slug], i = PRODUCTS.indexOf(slug), N = PRODUCTS.length;
    var prev = PRODUCTS[(i - 1 + N) % N], next = PRODUCTS[(i + 1) % N];
    var shots = d.shots || [];
    return overlay('from-right',
      '<div class="ohead"><a href="#build" data-go="build" aria-label="Back">' + ARROW_L + '</a>' +
      '<span class="crumb"><a href="#build" data-go="build">I build</a><span>/ Products</span></span>' +
      '<div class="pager"><a href="#' + prev + '" data-post="' + prev + '" aria-label="Previous product">←</a><span>' + (i + 1) + ' / ' + N + '</span><a href="#' + next + '" data-post="' + next + '" aria-label="Next product">→</a></div></div>' +
      '<div class="cs"><div class="cs-head">' +
        '<div class="cs-title"><div><span class="num">' + String(i + 1).padStart(2, '0') + '</span><h1>' + esc(d.title) + '</h1></div><p>' + esc(d.tagline) + '</p></div>' +
        '<div class="cs-meta">' + d.meta.map(function (m) { return '<div><span class="l">' + esc(m[0]) + '</span><span class="v">' + esc(m[1]) + '</span></div>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="figure">' + shot(d.hero, 'hero', 'hero screenshot') + '<span class="cap">' + esc(d.heroCaption || '') + '</span></div>' +
      '<div>' + d.story.map(function (s, k) { return '<div class="story-row"><div class="h"><span>' + String(k + 1).padStart(2, '0') + '</span><span>' + esc(s[0]) + '</span></div><p>' + esc(s[1]) + '</p></div>'; }).join('') + '</div>' +
      '<div class="metrics">' + d.metrics.map(function (m) { return '<div><span class="v">' + esc(m[0]) + '</span><span class="l">' + esc(m[1]) + '</span></div>'; }).join('') + '</div>' +
      (shots.length ? '<div class="shots">' + shots.map(function (s) { return '<div class="figure">' + shot(s.src, 'small', 'screen') + '<span class="cap">' + esc(s.caption || '') + '</span></div>'; }).join('') + '</div>' : '') +
      '<div class="built"><span>Built with</span><span>' + esc(d.stack) + '</span></div>' +
      '<a class="next" href="#' + next + '" data-post="' + next + '"><span class="l">Next product</span><span class="t">' + esc(S.entries[next].title) + ' →</span></a>' +
      '</div>');
  }

  // ---------- Post ----------
  var mdCache = {};
  function inline(s) {
    return esc(s)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }
  // Small Markdown renderer: headings, paragraphs, > pull quotes, - and 1. lists, images, links, bold, italics.
  function markdown(src) {
    return src.replace(/\r/g, '').split(/\n{2,}/).map(function (b) {
      b = b.trim(); if (!b) return '';
      var m;
      if ((m = b.match(/^(#{1,3})\s+(.*)$/))) return '<h' + (m[1].length + 1) + '>' + inline(m[2]) + '</h' + (m[1].length + 1) + '>';
      if (/^>\s?/.test(b)) return '<blockquote>' + inline(b.replace(/^>\s?/gm, '')) + '</blockquote>';
      if (/^[-*]\s+/.test(b)) return '<ul>' + b.split(/\n(?=[-*]\s+)/).map(function (li) { return '<li>' + inline(li.replace(/^[-*]\s+/, '')) + '</li>'; }).join('') + '</ul>';
      if (/^\d+\.\s+/.test(b)) return '<ol>' + b.split(/\n(?=\d+\.\s+)/).map(function (li) { return '<li>' + inline(li.replace(/^\d+\.\s+/, '')) + '</li>'; }).join('') + '</ol>';
      return '<p>' + inline(b).replace(/\n/g, ' ') + '</p>';
    }).join('');
  }
  function renderPost(slug) {
    var d = S.entries[slug], p = place[slug] || { list: 'write', cat: '' };
    var back = postFrom ? '<a href="#resume-' + postFrom + '" data-cv="' + postFrom + '" aria-label="Back to resume">' : '<a href="#' + p.list + '" data-go="' + p.list + '" aria-label="Back">';
    var html = overlay('from-right',
      '<div class="ohead">' + back + ARROW_L + '</a><span></span>' +
      '<span class="crumb"><a href="#' + p.list + '" data-go="' + p.list + '">' + SECTION[p.list] + '</a><span>/ ' + esc(p.cat) + '</span></span></div>' +
      '<article class="post"><div class="post-head"><h1>' + esc(d.title) + '</h1><div class="byline"><span>' + esc(S.name) + '</span>' + (d.date ? '<span>' + esc(d.date) + '</span>' : '') + '</div></div>' +
      (d.cover ? '<div class="shot cover"><img src="' + esc(d.cover) + '" alt=""></div>' : '') +
      '<div class="prose" data-body="' + slug + '"></div></article>');
    setTimeout(function () { loadPost(slug); }, 0);
    return html;
  }
  function loadPost(slug) {
    var el = document.querySelector('[data-body="' + slug + '"]'); if (!el) return;
    var draft = '<p class="draft">This piece is still being written. Check back soon.</p>';
    if (S.entries[slug].draft) { el.innerHTML = draft; return; }
    if (mdCache[slug] != null) { el.innerHTML = mdCache[slug]; return; }
    fetch('posts/' + slug + '.md').then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (t) { mdCache[slug] = markdown(t); var e = document.querySelector('[data-body="' + slug + '"]'); if (e) e.innerHTML = mdCache[slug]; })
      .catch(function () { var e = document.querySelector('[data-body="' + slug + '"]'); if (e) e.innerHTML = draft; });
  }

  function overlay(dir, inner) {
    return '<div class="overlay ' + dir + '"><div class="overlay-scroll" tabindex="-1">' + inner + '</div><div class="sbar"><i></i></div></div>';
  }

  // ---------- Apply state ----------
  var shownOverlay = null, listSwap, postFrom = null;
  function apply(st) {
    var prevList = state.view;
    state = st;
    document.body.setAttribute('data-view', st.view);
    var v = st.view;
    // Moving between About, I build and I write only cross-fades in place; sliding is kept for going home or to Resume.
    var side = function (x) { return x === 'about' || x === 'build' || x === 'write'; };
    if (side(v) && side(prevList)) document.body.classList.add('side-swap');
    else if (!side(v)) document.body.classList.remove('side-swap');
    var lists = $('.lists');
    clearTimeout(listSwap);
    lists.classList.remove('swapping');
    if (v === 'build' || v === 'write') {
      if (!lists.children.length || (prevList !== v && !(prevList === 'build' || prevList === 'write'))) renderLists(v);
      else if (prevList !== v || lists.getAttribute('data-list') !== v) {
        lists.classList.add('swapping');
        listSwap = setTimeout(function () { renderLists(v); lists.classList.remove('swapping'); }, 180);
      }
    }
    $('.home-line').classList.toggle('on', v === 'home');
    $('.chooser').classList.toggle('on', v === 'resume');
    $('.back-right').classList.toggle('on', v === 'resume');
    $('.about-square').classList.toggle('on', v === 'about');
    $('.about-text').classList.toggle('on', v === 'about');
    $('.lists').classList.toggle('on', v === 'build' || v === 'write');

    var key = st.cv ? 'cv:' + st.cv : (st.post ? 'post:' + st.post : null);
    var slot = $('#overlay-slot');
    if (key !== shownOverlay) {
      // Leaving an open resume: the page slides off to the left.
      var old = slot.querySelector('.overlay');
      if (old && shownOverlay && shownOverlay.indexOf('cv:') === 0 && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
        old.classList.remove('from-left');
        old.classList.add('out-left');
        slot.parentNode.insertBefore(old, slot.nextSibling);
        setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 500);
      }
      shownOverlay = key;
      slot.innerHTML = !key ? '' : st.cv ? renderCv(st.cv) : (isCase(st.post) ? renderCase(st.post) : renderPost(st.post));
      if (key) {
        var sc = slot.querySelector('.overlay-scroll');
        trackScroll(sc, slot.querySelector('.overlay > .sbar'));
        sc.focus({ preventScroll: true });
      }
    }
    var titles = { home: '', about: 'About', build: 'I build', write: 'I write', resume: 'Resume' };
    var t = st.post ? S.entries[st.post].title : st.cv ? S.resumes[st.cv].title : titles[v];
    document.title = t ? t + ' · ' + S.name : S.name;
  }

  // ---------- Events ----------
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a, button'); if (!a) return;
    if (a.classList.contains('cv-row')) {
      var item = a.parentNode, open = !item.classList.contains('open');
      item.classList.toggle('open', open); a.setAttribute('aria-expanded', open);
      return;
    }
    if (a.hasAttribute('data-print')) { e.preventDefault(); printCv(a.getAttribute('data-print')); return; }
    var g = a.getAttribute('data-go'), c = a.getAttribute('data-cv'), p = a.getAttribute('data-post');
    if (g == null && c == null && p == null) return;
    e.preventDefault();
    // From inside a resume, a writeup's back arrow returns to that resume.
    var fromCv = state.cv || (state.post && postFrom) || null;
    if (p && S.entries[p] && S.entries[p].page) { location.href = S.entries[p].page + (fromCv ? '?from=resume-' + fromCv : ''); return; }
    if (p) { postFrom = fromCv; return go({ view: place[p] ? place[p].list : state.view, cv: null, post: p }); }
    postFrom = null;
    if (c) return go({ view: 'resume', cv: c, post: null });
    // Clicking the active nav item returns home, as in the design.
    if (g !== 'home' && state.view === g && !state.post && !state.cv) g = 'home';
    go({ view: g, cv: null, post: null });
  });
  // Home page only: a click on empty space sends out a few thin rings, like a drop in water.
  document.addEventListener('pointerdown', function (e) {
    if (state.view !== 'home' || state.post || state.cv) return;
    if (e.target.closest('a, button, input, select, textarea, [role="button"]')) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = e.clientX + 'px';
    r.style.top = e.clientY + 'px';
    r.innerHTML = '<i></i><i></i><i></i>';
    document.body.appendChild(r);
    setTimeout(function () { r.remove(); }, 2000);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (state.post) go({ view: state.view, cv: null, post: null });
    else if (state.cv) go({ view: 'resume', cv: null, post: null });
    else if (state.view !== 'home') go({ view: 'home', cv: null, post: null });
  });

  // An entry with its own page (such as the NULP case study) opens that page, also from a shared #link.
  var h0 = location.hash.replace(/^#/, '');
  if (S.entries[h0] && S.entries[h0].page) { location.replace(S.entries[h0].page); return; }
  buildStage();
  // Arriving straight on I build, I write or an open resume (for example, Back from an article page) shows it at once:
  // the slide and fade play only when moving between views on this page.
  var st0 = parse(location.hash);
  if (st0.view === 'build' || st0.view === 'write' || st0.cv) {
    document.body.classList.add('no-anim');
    apply(st0);
    var ov = document.querySelector('#overlay-slot .overlay'); if (ov) ov.classList.remove('from-left', 'from-right');
    void document.body.offsetWidth;
    requestAnimationFrame(function () { requestAnimationFrame(function () { document.body.classList.remove('no-anim'); }); });
  } else apply(st0);
})();
