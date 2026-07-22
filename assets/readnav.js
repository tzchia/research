/* readnav.js — self-building reading navigation for research digest pages.
 * Scans main section[id] > h2 at load and renders:
 *   - a fixed top scroll-progress bar (all widths)
 *   - a right-side dock with per-section links, scroll-spy highlight,
 *     and a mini progress bar (>=1280px only)
 * Pages only need: <script src="../assets/readnav.js" defer></script>
 * Nav content always mirrors the live DOM, so edits to sections need no sync.
 * Styling reads the page's CSS vars (--bg2, --line, --muted, --fg, --accent)
 * with dark-theme fallbacks, so it works on any page in this repo.
 */
(function () {
  'use strict';

  var sections = Array.prototype.filter.call(
    document.querySelectorAll('main section[id]'),
    function (s) { return s.querySelector('h2'); }
  );
  if (sections.length < 2) return;

  function label(sec) {
    var h2 = sec.querySelector('h2').cloneNode(true);
    Array.prototype.forEach.call(h2.querySelectorAll('.num, .pb'), function (n) {
      n.parentNode.removeChild(n);
    });
    return h2.textContent.replace(/\s+/g, ' ').trim();
  }

  var css =
    '#rn-top{position:fixed;top:0;left:0;right:0;height:3px;z-index:98;background:transparent;pointer-events:none}' +
    '#rn-top i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--accent,#ffa657),var(--accent-deep,#bd561d))}' +
    '#rn-dock{position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:97;display:none;flex-direction:column;gap:2px;' +
      'background:color-mix(in srgb,var(--bg2,#161b22) 92%,transparent);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);' +
      'border:1px solid var(--line,#30363d);border-radius:14px;padding:12px 10px;box-shadow:0 12px 30px rgba(0,0,0,.35);' +
      'max-height:88vh;overflow:auto;scrollbar-width:thin;max-width:250px}' +
    '#rn-dock::-webkit-scrollbar{width:5px}' +
    '#rn-dock::-webkit-scrollbar-thumb{background:var(--line,#30363d);border-radius:999px}' +
    '#rn-dock .rn-head{font-family:var(--mono,monospace);font-size:10.5px;font-weight:700;color:var(--dim,#6e7681);letter-spacing:.12em;padding:0 8px 6px;text-transform:uppercase}' +
    '#rn-dock .rn-prog{height:4px;background:var(--bg3,#1c2330);border-radius:999px;overflow:hidden;margin:0 6px 8px;flex:0 0 auto}' +
    '#rn-dock .rn-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--accent,#ffa657),var(--accent-deep,#bd561d));border-radius:999px}' +
    '#rn-dock a{display:flex;align-items:center;gap:9px;padding:5px 10px;border-radius:9px;font-size:12.5px;color:var(--muted,#8b949e);' +
      'text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:background .15s,color .15s}' +
    '#rn-dock a span.rn-txt{overflow:hidden;text-overflow:ellipsis}' +
    '#rn-dock a i.rn-dot{width:8px;height:8px;border-radius:999px;background:var(--line,#30363d);flex:0 0 auto;transition:background .15s,box-shadow .15s}' +
    '#rn-dock a:hover{background:var(--bg3,#1c2330);color:var(--fg,#e6edf3)}' +
    '#rn-dock a:hover i.rn-dot{background:var(--accent,#ffa657)}' +
    '#rn-dock a.active{background:var(--accent-deep,#bd561d);color:#fff}' +
    '#rn-dock a.active i.rn-dot{background:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.25)}' +
    '@media(min-width:1280px){#rn-dock{display:flex}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var top = document.createElement('div');
  top.id = 'rn-top';
  top.innerHTML = '<i></i>';
  document.body.appendChild(top);

  var dock = document.createElement('nav');
  dock.id = 'rn-dock';
  dock.setAttribute('aria-label', '本頁導覽');
  dock.innerHTML = '<div class="rn-head">本頁導覽</div><div class="rn-prog"><i></i></div>';
  sections.forEach(function (sec) {
    var a = document.createElement('a');
    a.href = '#' + sec.id;
    a.innerHTML = '<i class="rn-dot"></i><span class="rn-txt"></span>';
    a.querySelector('.rn-txt').textContent = label(sec);
    dock.appendChild(a);
  });
  document.body.appendChild(dock);

  var topFill = top.querySelector('i');
  var dockFill = dock.querySelector('.rn-prog i');
  var links = Array.prototype.slice.call(dock.querySelectorAll('a'));
  var ticking = false;

  function update() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)) : 0;
    topFill.style.width = pct + '%';
    dockFill.style.width = pct + '%';
    var line = 90;
    var idx = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) idx = i;
    }
    if (doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 4) idx = sections.length - 1;
    links.forEach(function (a, i) {
      if (i === idx) {
        if (!a.classList.contains('active')) {
          a.classList.add('active');
          var ar = a.getBoundingClientRect(), dr = dock.getBoundingClientRect();
          if (ar.top < dr.top || ar.bottom > dr.bottom) {
            dock.scrollTop += ar.top - dr.top - dr.height / 2 + ar.height / 2;
          }
        }
      } else {
        a.classList.remove('active');
      }
    });
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  links.forEach(function (a) {
    a.addEventListener('click', function () { setTimeout(update, 400); });
  });
  update();
})();
