/**
 * ============================================================
 *  tracker.js — Universal Visit & Engagement Tracker
 *  Versi  : 1.0.0
 *  Author : Lidan Psikologi
 * ============================================================
 *
 *  CARA PAKAI — cukup tempel 1 baris ini sebelum </body> di setiap halaman HTML:
 *
 *  <script src="https://cipta.my.id/tracker1.js"></script>
 *
 *  Tidak perlu parameter apapun. API dan tabel sudah dikonfigurasi di dalam file.
 *
 *  JIKA INGIN GANTI ENDPOINT — edit bagian "Konfigurasi" di baris ~40:
 *  - const A = '...'  → URL API
 *  - const T = '...'  → Nama tabel
 *
 *  CARA KERJA OTOMATIS (tanpa ubah HTML apapun):
 *  - Deteksi section  → semua elemen <section> & <main>
 *                        label = id elemen, atau "section_1", "section_2", dst
 *  - Deteksi tombol   → semua <a href> dan <button> yang diklik
 *                        label = teks tombol → aria-label → "btn_1", dst
 *
 *  KOLOM YANG DIKIRIM KE API:
 *  - x_01 : URL halaman
 *  - x_02 : flag kunjungan ('1')
 *  - x_03 : jumlah kunjungan hari ini
 *  - x_04 : JSON engagement {load_ms, sections_reached, sections_seen,
 *                             buttons_clicked, last_updated}
 *  - x_19 : timestamp terakhir update
 *  - x_20 : timestamp kunjungan pertama
 *
 *  ALUR API:
 *  - Kunjungan pertama hari ini → POST  (buat baris baru)
 *  - Kunjungan ulang hari sama  → PUT   (update counter x_03)
 *  - Engagement berubah         → PUT   (update x_04 setiap 30 detik
 *                                         atau saat tab ditutup)
 * ============================================================
 */

(function () {
  'use strict';

  /* ── Baca konfigurasi dari tag <script> ── */
  /* ── Konfigurasi (ubah di sini jika endpoint berubah) ── */
  const A = 'https://lidan-co-id.pages.dev/api/contacts'; // URL API
  const T = 'kunjungan';                                   // Nama tabel
  const Q = `tabel=${T}`;

  /* ── Helpers ── */
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h).toString(16);
  }

  function dateStr() {
    const n = new Date();
    return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`;
  }

  function timestamp() {
    const n = new Date();
    return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())} ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  /* ── State ── */
  const url    = window.location.href;
  const lsKey  = 'visit_tracker_' + hash(url);
  const today  = dateStr();

  let visitData  = null;
  let engDirty   = false;
  let flushTimer = null;

  let eng = {
    load_ms        : null,
    sections_reached: 0,
    sections_seen  : [],   // label section yang sudah terlihat
    buttons_clicked: [],   // label tombol yang sudah diklik
    last_updated   : null
  };

  /* ── Deteksi section otomatis (semua <section> dan <main>) ── */
  function getSectionEls() {
    const els = Array.from(document.querySelectorAll('section, main'));
    return els.map(function (el, i) {
      const label = el.id
        ? el.id
        : (el.getAttribute('aria-label') || ('section_' + (i + 1)));
      return { el: el, label: label };
    });
  }

  /* ── Deteksi label tombol otomatis ── */
  function getBtnLabel(el) {
    // Coba teks tombol
    const txt = (el.textContent || '').trim().replace(/\s+/g, ' ').substring(0, 50);
    if (txt) return txt;

    // Coba aria-label
    const aria = el.getAttribute('aria-label');
    if (aria) return aria.trim().substring(0, 50);

    // Fallback: href singkat atau tag
    const href = el.getAttribute('href');
    if (href) return 'link_' + href.substring(0, 30).replace(/\s/g, '_');

    return 'btn_unknown';
  }

  /* ── Flush engagement ke API (PUT x_04) ── */
  function flushEng(force) {
    if (!engDirty && force !== 'beacon') return;
    if (!visitData || !visitData.id_x) return;

    engDirty = false;
    eng.last_updated = timestamp();
    const x04 = JSON.stringify(eng);

    fetch(`${A}/${visitData.id_x}?${Q}`, {
      method   : 'PUT',
      headers  : { 'Content-Type': 'application/json', 'X-Table-Name': T },
      body     : JSON.stringify({ x_04: x04, x_19: eng.last_updated }),
      keepalive: true
    }).catch(function () {});

    // Persist ke localStorage agar survive hard refresh
    try {
      const d = JSON.parse(localStorage.getItem(lsKey) || '{}');
      d.x_04 = x04;
      localStorage.setItem(lsKey, JSON.stringify(d));
    } catch (e) {}
  }

  /* ── Jadwalkan flush periodik setiap 30 detik ── */
  function schedulePeriodic() {
    if (flushTimer) clearInterval(flushTimer);
    flushTimer = setInterval(function () { flushEng(false); }, 30000);
  }

  /* ── Observer scroll section ── */
  function initSectionObserver() {
    const sections = getSectionEls();
    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) return;

    const seen = new Set();
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const matched = sections.find(function (s) { return s.el === entry.target; });
        if (!matched || seen.has(matched.label)) return;

        seen.add(matched.label);
        eng.sections_reached = seen.size;

        if (!eng.sections_seen.includes(matched.label)) {
          eng.sections_seen.push(matched.label);
        }

        engDirty = true;
      });
    }, { threshold: 0.25 });

    sections.forEach(function (s) { obs.observe(s.el); });
  }

  /* ── Listener klik tombol ── */
  function initClickListener() {
    document.addEventListener('click', function (e) {
      const el = e.target.closest('a[href], button');
      if (!el) return;

      const label = getBtnLabel(el);
      if (!eng.buttons_clicked.includes(label)) {
        eng.buttons_clicked.push(label);
        engDirty = true;
      }
    }, true);
  }

  /* ── Listener saat tab ditutup / pindah ── */
  function initLeaveListeners() {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flushEng('beacon');
    });
    window.addEventListener('beforeunload', function () { flushEng('beacon'); });
    window.addEventListener('pagehide',     function () { flushEng('beacon'); });
  }

  /* ── Main tracker ── */
  async function track() {
    let d = null;
    try {
      const raw = localStorage.getItem(lsKey);
      d = raw ? JSON.parse(raw) : null;
    } catch (e) { d = null; }

    // Restore engagement dari localStorage jika hari yang sama
    if (d && d.date === today && d.x_04) {
      try {
        const prev = JSON.parse(d.x_04);
        eng.sections_reached = prev.sections_reached || 0;
        eng.sections_seen    = prev.sections_seen    || [];
        eng.buttons_clicked  = prev.buttons_clicked  || [];
      } catch (e) {}
    }

    if (!d || d.date !== today) {
      /* ── Kunjungan pertama hari ini: POST ── */
      const loadMs = (performance && performance.timing)
        ? (performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart)
        : null;

      eng.load_ms      = loadMs;
      eng.last_updated = timestamp();

      const ts  = timestamp();
      const x04 = JSON.stringify(eng);

      try {
        const r = await fetch(`${A}?${Q}`, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Table-Name': T },
          body   : JSON.stringify({ x_01: url, x_02: '1', x_03: '1', x_04: x04, x_20: ts, x_19: ts })
        });

        if (!r.ok) throw new Error(r.status);

        const j  = await r.json();
        const id = j.id_x || (j.data ? j.data.id_x : null);

        if (id) {
          visitData = {
            id_x        : id,
            date        : today,
            initial_url : url,
            x_02        : '1',
            x_03        : '1',
            x_19        : ts,
            x_04        : x04
          };
          localStorage.setItem(lsKey, JSON.stringify(visitData));
        }
      } catch (e) { console.error('[tracker.js] POST gagal:', e); }

    } else {
      /* ── Kunjungan ulang hari yang sama: PUT counter ── */
      visitData = d;
      const counter = String((parseInt(d.x_03, 10) || 0) + 1);
      const ts      = timestamp();

      // Restore load_ms dari sesi sebelumnya
      if (d.x_04) {
        try { eng.load_ms = JSON.parse(d.x_04).load_ms || null; } catch (e) {}
      }

      eng.last_updated = ts;
      const x04 = JSON.stringify(eng);

      visitData.x_03 = counter;
      visitData.x_19 = ts;
      visitData.x_04 = x04;
      localStorage.setItem(lsKey, JSON.stringify(visitData));

      try {
        const r = await fetch(`${A}/${d.id_x}?${Q}`, {
          method : 'PUT',
          headers: { 'Content-Type': 'application/json', 'X-Table-Name': T },
          body   : JSON.stringify({ x_03: counter, x_04: x04, x_19: ts })
        });
        if (!r.ok) throw new Error(r.status);
      } catch (e) { console.error('[tracker.js] PUT gagal:', e); }
    }

    /* ── Mulai tracking engagement ── */
    initSectionObserver();
    initClickListener();
    initLeaveListeners();
    schedulePeriodic();
  }

  /* ── Jalankan setelah halaman siap (delay 3 detik agar tidak ganggu load) ── */
  setTimeout(function () {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(track);
    } else {
      track();
    }
  }, 3000);

})();
