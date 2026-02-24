// =========================================================
// catatan-engine.js — Engine tombol & popup catatan
// Versi: 1.0 | 2026-02-24
// =========================================================
// File ini TIDAK perlu diubah saat update catatan.
// Yang perlu diedit hanya catatan.js
// =========================================================

(function () {

  const style = document.createElement('style');
  style.textContent = `
    .cn-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px; height: 28px;
      border-radius: 50%;
      background: #3b82f6;
      color: white;
      font-size: 14px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(59,130,246,0.4);
      transition: background .15s, transform .12s;
      line-height: 1;
      font-family: serif;
      flex-shrink: 0;
    }
    .cn-btn:hover { background: #2563eb; transform: scale(1.1); }

    .cn-btn-float {
      position: fixed;
      bottom: 20px; right: 20px;
      width: 38px; height: 38px;
      font-size: 18px;
      z-index: 9998;
      box-shadow: 0 4px 14px rgba(59,130,246,0.5);
    }

    .cn-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .cn-overlay.open { display: flex; }

    .cn-popup {
      background: #1e2130;
      border: 1px solid #2a2f3f;
      border-radius: 12px;
      padding: 24px;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      position: relative;
      font-family: 'Segoe UI', sans-serif;
      animation: cnFadeIn .18s ease;
    }
    @keyframes cnFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .cn-popup-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    .cn-popup-judul {
      font-size: 15px;
      font-weight: 700;
      color: #e8eaf0;
      line-height: 1.3;
    }
    .cn-popup-close {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      flex-shrink: 0;
    }
    .cn-popup-close:hover { color: #e8eaf0; }
    .cn-popup-isi {
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.7;
      white-space: pre-wrap;
    }
    .cn-popup-isi strong { color: #e8eaf0; }
    .cn-popup-footer {
      margin-top: 16px;
      font-size: 11px;
      color: #4b5563;
      font-family: monospace;
    }
  `;
  document.head.appendChild(style);

  // Buat satu overlay yang dipakai semua tombol
  const overlay = document.createElement('div');
  overlay.className = 'cn-overlay';
  overlay.innerHTML = `
    <div class="cn-popup">
      <div class="cn-popup-header">
        <div class="cn-popup-judul" id="cn-judul"></div>
        <button class="cn-popup-close" id="cn-close">✕</button>
      </div>
      <div class="cn-popup-isi" id="cn-isi"></div>
      <div class="cn-popup-footer" id="cn-footer"></div>
    </div>`;
  document.body.appendChild(overlay);

  // Tutup popup
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) tutupPopup();
  });
  document.getElementById('cn-close').addEventListener('click', tutupPopup);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') tutupPopup();
  });

  function tutupPopup() {
    overlay.classList.remove('open');
  }

  function bukaPopup(key) {
    if (typeof CATATAN === 'undefined') {
      alert('catatan.js belum dimuat.');
      return;
    }
    const data = CATATAN[key];
    if (!data) {
      document.getElementById('cn-judul').textContent = 'Catatan tidak ditemukan';
      document.getElementById('cn-isi').innerHTML = `Key "<strong>${key}</strong>" tidak ada di catatan.js`;
      document.getElementById('cn-footer').textContent = '';
      overlay.classList.add('open');
      return;
    }

    document.getElementById('cn-judul').textContent = data.judul || key;

    // Render **bold** sederhana
    const isiFormatted = (data.isi || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    document.getElementById('cn-isi').innerHTML = isiFormatted;
    document.getElementById('cn-footer').textContent = `catatan.js → "${key}"`;
    overlay.classList.add('open');
  }

  // Scan semua [data-catatan] setelah DOM siap
  function init() {
    document.querySelectorAll('[data-catatan]').forEach(function (el) {
      const key      = el.getAttribute('data-catatan');
      const isFloat  = el.getAttribute('data-float') === 'true';

      const btn = document.createElement('button');
      btn.className  = 'cn-btn' + (isFloat ? ' cn-btn-float' : '');
      btn.title      = 'Lihat catatan: ' + key;
      btn.textContent = 'ℹ';
      btn.addEventListener('click', function () { bukaPopup(key); });

      if (isFloat) {
        document.body.appendChild(btn);
      } else {
        el.appendChild(btn);
      }
    });
  }

  // Expose global untuk dipanggil dari onclick inline di nav & card
  window._cnBuka = bukaPopup;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();