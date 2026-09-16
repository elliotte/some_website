(function () {
  'use strict';

  /* ---------- Home: search + tag filter ---------- */
  var list = document.getElementById('posts');
  if (list) {
    var input = document.getElementById('q');
    var chipsEl = document.getElementById('chips');
    var countEl = document.querySelector('[data-count]');
    var empty = document.getElementById('empty');
    var years = Array.prototype.slice.call(list.querySelectorAll('.year'));
    var entries = Array.prototype.slice.call(list.querySelectorAll('.entry'));
    var activeTag = new URLSearchParams(location.search).get('tag') || '';

    entries.forEach(function (li) {
      var ex = li.querySelector('.entry-excerpt');
      if (ex) ex.textContent = ex.textContent.replace(/(https?:)?\/\/(www\.)?([^\/\s]+)\S*/g, '$3 ↗');
      li._text = li.textContent.toLowerCase().replace(/\s+/g, ' ');
      li._tags = (li.dataset.tags || '').split(' ').filter(Boolean);
    });

    // Top tags as chips
    var counts = {};
    entries.forEach(function (li) { li._tags.forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
    Object.keys(counts)
      .sort(function (a, b) { return counts[b] - counts[a]; })
      .slice(0, 12)
      .forEach(function (t) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.dataset.tag = t;
        b.innerHTML = '#' + t + '<span>' + counts[t] + '</span>';
        chipsEl.appendChild(b);
      });

    function apply() {
      var q = input.value.trim().toLowerCase();
      var terms = q ? q.split(/\s+/) : [];
      var shown = 0;
      entries.forEach(function (li) {
        var ok = (!activeTag || li._tags.indexOf(activeTag) !== -1) &&
          terms.every(function (t) { return li._text.indexOf(t) !== -1; });
        li.hidden = !ok;
        if (ok) shown++;
      });
      years.forEach(function (y) { y.hidden = !y.querySelector('.entry:not([hidden])'); });
      empty.hidden = shown > 0;
      countEl.textContent = shown;
      Array.prototype.forEach.call(chipsEl.children, function (c) {
        c.setAttribute('aria-pressed', c.dataset.tag === activeTag ? 'true' : 'false');
      });
      var url = new URL(location.href);
      if (activeTag) url.searchParams.set('tag', activeTag); else url.searchParams.delete('tag');
      history.replaceState(null, '', url);
    }

    function setTag(t) {
      activeTag = activeTag === t ? '' : t;
      apply();
    }

    input.addEventListener('input', apply);
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-tag]');
      if (!el) return;
      setTag(el.dataset.tag);
      if (!el.classList.contains('chip')) window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); }
      if (e.key === 'Escape' && document.activeElement === input) { input.value = ''; apply(); input.blur(); }
    });

    if (activeTag && !chipsEl.querySelector('[data-tag="' + CSS.escape(activeTag) + '"]')) {
      var extra = document.createElement('button');
      extra.type = 'button'; extra.className = 'chip'; extra.dataset.tag = activeTag;
      extra.innerHTML = '#' + activeTag.replace(/</g, '&lt;') + '<span>' + (counts[activeTag] || 0) + '</span>';
      chipsEl.insertBefore(extra, chipsEl.firstChild);
    }
    apply();
  }

  /* ---------- Posts: turn bare "Title\nURL" pairs into link cards, linkify stray URLs ---------- */
  var content = document.querySelector('.post-content');
  if (content) {
    var URL_RE = /^(https?:\/\/|\/\/)\S+$/i;

    function host(u) {
      try { return new URL(u, location.href).hostname.replace(/^www\./, ''); } catch (e) { return u; }
    }

    Array.prototype.slice.call(content.querySelectorAll('p')).forEach(function (p) {
      if (p.querySelector('a, img, code')) return;
      var lines = p.textContent.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
      var cards = [], title = null;
      for (var i = 0; i < lines.length; i++) {
        if (URL_RE.test(lines[i])) {
          cards.push({ title: title || host(lines[i]), url: lines[i] });
          title = null;
        } else if (title === null) {
          title = lines[i];
        } else {
          return; // two text lines in a row: plain prose, leave for linkify
        }
      }
      if (!cards.length || title !== null) return;
      var ul = document.createElement('ul');
      ul.className = 'link-cards';
      cards.forEach(function (c) {
        var li = document.createElement('li');
        li.className = 'link-card';
        var a = document.createElement('a');
        a.href = c.url;
        var s = document.createElement('strong'); s.textContent = c.title;
        var sm = document.createElement('small'); sm.textContent = host(c.url) + ' ↗';
        a.appendChild(s); a.appendChild(sm);
        li.appendChild(a); ul.appendChild(li);
      });
      p.replaceWith(ul);
    });

    // Merge adjacent card lists
    Array.prototype.slice.call(content.querySelectorAll('.link-cards')).forEach(function (ul) {
      var next = ul.nextElementSibling;
      while (next && next.classList.contains('link-cards')) {
        while (next.firstChild) ul.appendChild(next.firstChild);
        var gone = next; next = next.nextElementSibling; gone.remove();
      }
    });

    // Linkify remaining bare URLs in text
    var walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.parentNode.closest('a, code, pre, script') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) if (/https?:\/\//.test(n.nodeValue)) nodes.push(n);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(https?:\/\/[^\s<>"')\]]+)/).forEach(function (part, i) {
        if (i % 2) {
          var a = document.createElement('a');
          a.href = part; a.textContent = host(part) + part.replace(/^https?:\/\/(www\.)?[^/]+/, '').slice(0, 40) + (part.length > 60 ? '…' : '');
          a.title = part;
          frag.appendChild(a);
        } else if (part) {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.replaceWith(frag);
    });
  }
})();
