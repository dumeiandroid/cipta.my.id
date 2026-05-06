/**
 * ============================================================
 * KARAKTER ENGINE v1.0
 * Engine terpusat untuk 5 tes kepribadian:
 *   04 - Temperamen (S/C/M/P)
 *   05 - Ekstrovert vs Introvert (+ Ambivert)
 *   06 - Sensing vs Intuitif
 *   07 - Thinking vs Feeling
 *   08 - Judging vs Perceiving
 *
 * CARA PAKAI DI FILE VIEW:
 *   <script src="karakter_engine.js"></script>
 *   <script> KarakterEngine.render('04'); </script>
 *
 * Atau dengan container ID kustom:
 *   <script> KarakterEngine.render('07', 'myDivId'); </script>
 * ============================================================
 */

const KarakterEngine = (() => {

  // ─────────────────────────────────────────────
  // KONFIGURASI API
  // ─────────────────────────────────────────────
  const API_BASE = 'https://lidan-co-id.pages.dev/api/contacts_filter_dinamis6';
  const API_HEADERS = { 'X-Custom-Auth': 'admin' };

  // ─────────────────────────────────────────────
  // DATA TES 04 — TEMPERAMEN
  // ─────────────────────────────────────────────
  const TEMPERAMENTS = {
    A: {
      name: 'SANGUINIS', color: '#f1c40f', icon: '😄',
      tagline: 'Si Periang yang Populer',
      description: 'Ekstrovert, antusias, dan sosial. Suka menjadi pusat perhatian dan membuat orang lain senang.',
      characteristics: ['Ceria, optimis, dan penuh semangat','Mudah bergaul dan populer','Suka berbicara dan menghibur','Spontan dan kreatif','Tidak suka rutinitas yang membosankan','Emosional dan ekspresif'],
      strengths: ['Komunikator yang baik','Memotivasi orang lain','Mudah beradaptasi','Antusiasme tinggi','Kreatif dan inovatif'],
      weaknesses: ['Kurang disiplin','Mudah terdistraksi','Tidak detail-oriented','Terlalu banyak bicara','Sulit menepati janji'],
      careers: ['Sales & Marketing','Public Relations','Event Organizer','Entertainer','Presenter','Teacher'],
      tips: ['Buat to-do list untuk tetap fokus','Latih kedisiplinan dan manajemen waktu','Dengarkan lebih banyak, bicara seperlunya','Selesaikan satu tugas sebelum mulai yang baru','Catat janji dan komitmen penting']
    },
    B: {
      name: 'KOLERIS', color: '#e67e22', icon: '💪',
      tagline: 'Si Pemimpin yang Kuat',
      description: 'Ekstrovert, tegas, dan berorientasi pada tujuan. Suka memimpin dan mengambil keputusan.',
      characteristics: ['Tegas dan percaya diri','Berorientasi pada hasil','Suka tantangan dan kompetisi','Pengambil keputusan yang cepat','Produktif dan efisien','Tidak sabaran dengan ketidakefisienan'],
      strengths: ['Kepemimpinan alami','Berani mengambil risiko','Orientasi tujuan yang kuat','Tegas dalam keputusan','Produktivitas tinggi'],
      weaknesses: ['Terlalu bossy','Kurang sensitif','Tidak sabaran','Sulit menerima kritik','Workaholic'],
      careers: ['CEO/Manager','Entrepreneur','Politisi','Direktur','Pilot','Lawyer'],
      tips: ['Latih empati dan mendengarkan','Beri apresiasi pada tim','Kontrol kemarahan dan ketidaksabaran','Delegasikan tugas, jangan micromanage','Work-life balance sangat penting']
    },
    C: {
      name: 'MELANKOLIS', color: '#9b59b6', icon: '🤔',
      tagline: 'Si Pemikir yang Perfeksionis',
      description: 'Introvert, analitis, dan detail-oriented. Suka kesempurnaan dan kedalaman.',
      characteristics: ['Perfeksionis dan teliti','Berpikir mendalam dan analitis','Sensitif dan idealis','Loyal dan setia','Suka keteraturan dan struktur','Cenderung pesimistis'],
      strengths: ['Perhatian pada detail','Analisis mendalam','Standar tinggi','Kreatif dan artistik','Dapat diandalkan'],
      weaknesses: ['Terlalu kritis','Overthinking','Perfeksionisme berlebihan','Sulit puas','Mudah depresi'],
      careers: ['Scientist','Analyst','Artist','Writer','Programmer','Accountant'],
      tips: ['Terima bahwa kesempurnaan tidak selalu mungkin','Jangan overthink, ambil action','Fokus pada progress, bukan perfection','Belajar menerima kritik konstruktif','Kelola ekspektasi terhadap diri sendiri']
    },
    D: {
      name: 'PHLEGMATIS', color: '#3498db', icon: '😌',
      tagline: 'Si Pendamai yang Tenang',
      description: 'Introvert, tenang, dan damai. Suka harmoni dan menghindari konflik.',
      characteristics: ['Tenang dan sabar','Pendamai dan diplomatik','Pendengar yang baik','Stabil dan konsisten','Tidak suka konflik','Santai dan easy-going'],
      strengths: ['Kemampuan diplomasi','Sabar dan tenang','Pendengar yang baik','Konsisten dan stabil','Mudah bergaul'],
      weaknesses: ['Kurang inisiatif','Terlalu pasif','Sulit membuat keputusan','Menghindari konfrontasi','Kurang ambisi'],
      careers: ['Counselor','Mediator','HR','Customer Service','Nurse','Social Worker'],
      tips: ['Berani ambil inisiatif','Jangan menghindari konflik yang perlu','Tetapkan tujuan yang jelas','Latih kemampuan decision making','Keluar dari zona nyaman sesekali']
    }
  };

  // ─────────────────────────────────────────────
  // DATA TES 05 — EKSTROVERT vs INTROVERT
  // ─────────────────────────────────────────────
  const PERSONALITY_TYPES = {
    EXTROVERT: {
      name: 'EKSTROVERT', color: '#e74c3c', icon: '🎉',
      tagline: 'Energi dari Dunia Luar',
      description: 'Anda mendapatkan energi dari interaksi sosial dan lingkungan eksternal. Anda cenderung outgoing, ekspresif, dan menikmati keramaian.',
      characteristics: ['Mendapat energi dari bersosialisasi','Senang menjadi pusat perhatian','Berbicara untuk berpikir (think out loud)','Memiliki banyak teman dan kenalan','Berani mengambil risiko sosial','Merasa kesepian saat sendirian terlalu lama','Suka bekerja dalam tim','Ekspresif dan antusias'],
      strengths: ['Komunikasi yang baik','Networking luas','Mudah beradaptasi sosial','Antusiasme menular','Kolaborasi tim'],
      careers: ['Sales & Marketing','Event Manager','Public Relations','Teacher','Politician','Entertainer','HR Manager'],
      tips: ['Luangkan waktu untuk me-time sesekali','Dengarkan lebih banyak, jangan mendominasi percakapan','Belajar menikmati kesendirian','Fokus pada kualitas hubungan, bukan kuantitas','Latih kemampuan refleksi diri']
    },
    INTROVERT: {
      name: 'INTROVERT', color: '#34495e', icon: '📚',
      tagline: 'Energi dari Dunia Dalam',
      description: 'Anda mendapatkan energi dari waktu sendiri dan refleksi internal. Anda cenderung thoughtful, fokus, dan lebih nyaman dengan interaksi mendalam.',
      characteristics: ['Mendapat energi dari waktu sendirian','Lebih suka percakapan mendalam daripada small talk','Berpikir sebelum berbicara','Memiliki lingkaran pertemanan kecil tapi dekat','Butuh waktu untuk "recharge" setelah bersosialisasi','Lebih suka mengamati daripada menjadi pusat perhatian','Suka bekerja mandiri','Reflektif dan thoughtful'],
      strengths: ['Mendengarkan dengan baik','Pemikiran mendalam','Fokus dan konsentrasi tinggi','Kemandirian','Hubungan yang bermakna'],
      careers: ['Writer','Programmer','Researcher','Accountant','Designer','Analyst','Librarian'],
      tips: ['Dorong diri untuk bersosialisasi secara teratur','Jangan takut untuk speak up saat dibutuhkan','Manfaatkan kekuatan mendengarkan Anda','Cari teman yang menghargai kedalaman','Keluar dari comfort zone dalam dosis kecil']
    },
    AMBIVERT: {
      name: 'AMBIVERT', color: '#9b59b6', icon: '⚖️',
      tagline: 'Seimbang di Antara Dua Dunia',
      description: 'Anda berada di tengah-tengah spektrum. Anda fleksibel dan dapat menyesuaikan diri baik dalam situasi sosial maupun saat sendirian.',
      characteristics: ['Fleksibel antara sosial dan solitude','Bisa menikmati pesta maupun waktu sendiri','Tidak terlalu ekstrem dalam preferensi','Adaptif terhadap situasi','Seimbang dalam ekspresi','Networking yang strategis'],
      strengths: ['Adaptabilitas tinggi','Balanced perspective','Fleksibilitas sosial','Empati seimbang','Versatilitas'],
      careers: ['Project Manager','Consultant','Entrepreneur','Trainer','Negotiator'],
      tips: ['Manfaatkan fleksibilitas Anda','Kenali kapan Anda butuh energi dari mana','Jangan memaksakan diri ke salah satu ekstrem','Gunakan kemampuan adaptasi sebagai kekuatan']
    }
  };

  // ─────────────────────────────────────────────
  // DATA TES 06 — SENSING vs INTUITIF
  // ─────────────────────────────────────────────
  const SENSING_TYPES = {
    A: {
      title: 'SENSING (S)', tagline: 'Si Praktis yang Berorientasi Fakta',
      color: '#2980b9', icon: '🔍',
      desc: 'Sensing (S) artinya Anda cenderung memproses data dengan cara bersandar pada fakta yang nyata dan melihat data apa adanya. Anda adalah tipe yang percaya ketika melihat sesuatu hal atau kejadian secara langsung (melihat adalah percaya). Anda lebih nyaman dengan pengalaman langsung, menyentuh, dan berinteraksi dengan objek secara nyata sebelum mengambil kesimpulan.',
      traits: ['Fokus pada masa kini','Menyukai detail & spesifik','Praktis & Pragmatis','Belajar dari pengalaman','Menyukai prosedur jelas'],
      careers: ['Akuntan','Teknisi','Tenaga Medis','Polisi/Militer','Manajemen Operasional']
    },
    B: {
      title: 'INTUITIF (N)', tagline: 'Si Imajinatif yang Berorientasi Kemungkinan',
      color: '#8e44ad', icon: '✨',
      desc: 'Intuitive (N) artinya Anda cenderung memproses data dengan melihat pola, impresi, serta berbagai kemungkinan yang bisa terjadi di masa depan. Bagi Anda, fakta hanyalah titik awal; perasaan (feeling), kesan, dan "vibe" menjadi bahan pertimbangan yang lebih dominan dalam mengambil keputusan. Anda lebih percaya pada intuisi atau "feel" yang Anda rasakan.',
      traits: ['Fokus pada masa depan','Melihat gambaran besar','Imajinatif & Teoritis','Menyukai inovasi','Berpikir abstrak'],
      careers: ['Penulis/Seniman','Psikolog','Strategis Bisnis','Peneliti','Desainer Konseptual']
    }
  };

  // ─────────────────────────────────────────────
  // DATA TES 07 — THINKING vs FEELING
  // ─────────────────────────────────────────────
  const DECISION_TYPES = {
    THINKING: {
      name: 'THINKING (PEMIKIR)', color: '#2980b9', icon: '🧠',
      tagline: 'Keputusan Berdasarkan Logika',
      description: 'Anda membuat keputusan berdasarkan analisis objektif, logika, dan kebenaran. Anda mengutamakan konsistensi dan keadilan dalam pengambilan keputusan.',
      characteristics: ['Mengutamakan logika dan rasionalitas','Objektif dalam menilai situasi','Fokus pada kebenaran dan fakta','Menganalisis pro dan kontra','Tegas dan direct dalam komunikasi','Menjaga jarak emosional saat memutuskan','Menghargai kompetensi dan keahlian','Konsisten dengan prinsip'],
      strengths: ['Analisis objektif','Keputusan yang fair','Critical thinking','Ketegasan','Konsistensi logika'],
      weaknesses: ['Kurang sensitif terhadap perasaan','Terkesan dingin atau keras','Terlalu kritis','Sulit berempati','Mengabaikan aspek emosional'],
      careers: ['Engineer','Programmer','Analyst','Lawyer','Scientist','Financial Planner','Manager','Auditor'],
      tips: ['Pertimbangkan dampak emosional keputusan Anda','Latih empati dan kepekaan terhadap perasaan orang lain','Berikan apresiasi, bukan hanya kritik','Komunikasi dengan lebih lembut saat diperlukan','Ingat bahwa perasaan juga valid dalam keputusan']
    },
    FEELING: {
      name: 'FEELING (PERASA)', color: '#e91e63', icon: '❤️',
      tagline: 'Keputusan Berdasarkan Nilai & Empati',
      description: 'Anda membuat keputusan berdasarkan nilai-nilai personal, empati, dan dampak terhadap orang lain. Anda mengutamakan harmoni dan kesejahteraan dalam pengambilan keputusan.',
      characteristics: ['Mengutamakan nilai dan empati','Mempertimbangkan dampak terhadap orang lain','Fokus pada harmoni dan kesejahteraan','Subjektif berdasarkan nilai personal','Diplomatik dalam komunikasi','Terhubung emosional dengan situasi','Menghargai hubungan dan perasaan','Fleksibel sesuai konteks personal'],
      strengths: ['Empati tinggi','Membangun hubungan','Kepekaan emosional','Diplomasi','Menciptakan harmoni'],
      weaknesses: ['Terlalu subjektif','Sulit bersikap tegas','Mudah terpengaruh emosi','Menghindari konflik penting','Keputusan kurang objektif'],
      careers: ['Counselor','HR Professional','Teacher','Social Worker','Nurse','Customer Service','Mediator','Psychologist'],
      tips: ['Jangan takut membuat keputusan sulit','Latih objektivitas dalam analisis','Tidak semua konflik perlu dihindari','Seimbangkan empati dengan logika','Belajar mengatakan "tidak" saat perlu']
    }
  };

  // ─────────────────────────────────────────────
  // DATA TES 08 — JUDGING vs PERCEIVING
  // ─────────────────────────────────────────────
  const LIFESTYLE_TYPES = {
    JUDGING: {
      name: 'JUDGING (PENILAI)', color: '#27ae60', icon: '📋',
      tagline: 'Terencana & Terorganisir',
      description: 'Anda menyukai struktur, perencanaan, dan keputusan yang cepat. Anda merasa nyaman dengan jadwal dan rutinitas yang jelas.',
      characteristics: ['Suka membuat rencana dan jadwal','Terorganisir dan tertib','Menyelesaikan tugas lebih awal','Membuat keputusan dengan cepat','Suka closure dan penyelesaian','Rutinitas yang konsisten','Disiplin dan tepat waktu','Goal-oriented'],
      strengths: ['Manajemen waktu baik','Produktivitas tinggi','Keandalan','Kedisiplinan','Pencapaian target'],
      weaknesses: ['Kaku terhadap perubahan','Stres jika rencana berubah','Terlalu perfeksionis','Kurang spontan','Sulit beradaptasi'],
      careers: ['Project Manager','Administrator','Accountant','Executive','Operations Manager','Event Planner','Quality Assurance'],
      tips: ['Belajar untuk lebih fleksibel','Terima bahwa tidak semua harus sempurna','Beri ruang untuk spontanitas','Jangan terlalu keras pada diri sendiri','Nikmati prosesnya, bukan hanya hasil']
    },
    PERCEIVING: {
      name: 'PERCEIVING (PENGAMAT)', color: '#e67e22', icon: '🎈',
      tagline: 'Fleksibel & Spontan',
      description: 'Anda menyukai fleksibilitas, spontanitas, dan pilihan yang terbuka. Anda merasa nyaman dengan ketidakpastian dan perubahan.',
      characteristics: ['Fleksibel dan adaptif','Spontan dan improvisasi','Suka menjaga pilihan tetap terbuka','Bekerja dengan deadline','Santai terhadap jadwal','Eksplorasi berbagai kemungkinan','Multitasking','Process-oriented'],
      strengths: ['Adaptabilitas tinggi','Kreativitas','Keterbukaan pikiran','Fleksibilitas','Handle perubahan dengan baik'],
      weaknesses: ['Prokrastinasi','Kurang terorganisir','Sering terlambat','Sulit menyelesaikan','Impulsif'],
      careers: ['Creative Director','Entrepreneur','Journalist','Artist','Researcher','Consultant','Freelancer'],
      tips: ['Tetapkan deadline pribadi','Gunakan to-do list sederhana','Belajar prioritisasi','Hindari prokrastinasi berlebihan','Selesaikan satu hal sebelum mulai yang baru']
    }
  };

  // ─────────────────────────────────────────────
  // SHARED CSS — dipakai semua file view
  // ─────────────────────────────────────────────
  const SHARED_CSS = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      color: #2c3e50;
    }
    .container {
      max-width: 850px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 { font-size: 2em; margin-bottom: 10px; }
    .header p { opacity: 0.9; font-size: 1.1em; }
    .content { padding: 40px; }
    .profile-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 15px;
      margin-bottom: 30px;
      border-left: 5px solid #667eea;
    }
    .profile-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    .profile-item { display: flex; flex-direction: column; }
    .profile-label {
      font-size: 0.85em;
      color: #667eea;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .profile-value { font-size: 1.1em; color: #2c3e50; }
    .result-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 40px;
      border-radius: 15px;
      margin: 30px 0;
      border-left: 8px solid;
      text-align: center;
    }
    .result-card h2 { font-size: 3em; margin-bottom: 15px; }
    .result-tagline { font-size: 1.4em; font-weight: bold; margin-bottom: 10px; }
    .spectrum {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 30px 0;
      background: white;
      padding: 30px;
      border-radius: 15px;
    }
    .spectrum-side { flex: 1; text-align: center; }
    .spectrum-icon { font-size: 4em; margin-bottom: 10px; }
    .spectrum-name { font-size: 1.5em; font-weight: bold; margin-bottom: 5px; }
    .spectrum-score { font-size: 2.5em; font-weight: bold; margin: 10px 0; }
    .spectrum-bar { flex: 2; position: relative; }
    .bar-container {
      height: 40px;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
    }
    .bar-marker {
      position: absolute;
      top: -30px;
      transform: translateX(-50%);
      font-size: 2em;
    }
    .chart-container { position: relative; height: 300px; margin: 30px 0; }
    .info-section {
      background: white;
      padding: 25px;
      border-radius: 15px;
      margin: 20px 0;
      border: 2px solid #e9ecef;
    }
    .info-section h3 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 1.3em;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .info-section ul { list-style: none; padding-left: 0; }
    .info-section li {
      padding: 10px 0;
      padding-left: 30px;
      position: relative;
      line-height: 1.6;
      color: #555;
    }
    .info-section li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
      font-size: 1.2em;
    }
    .comparison-table {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    .table-column { background: #f8f9fa; padding: 20px; border-radius: 10px; }
    .table-column h4 {
      text-align: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 3px solid;
      font-size: 1.2em;
    }
    .table-column ul { list-style: none; padding: 0; }
    .table-column li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
      color: #444;
    }
    .table-column li:before { content: "•"; position: absolute; left: 5px; font-size: 1.5em; }
    /* Khusus tes 04 */
    .temperament-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .temp-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      border: 3px solid;
      text-align: center;
      transition: transform 0.3s;
    }
    .temp-card.dominant { transform: scale(1.08); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .temp-icon { font-size: 3em; margin-bottom: 10px; }
    .temp-name { font-size: 1.2em; font-weight: bold; margin-bottom: 8px; }
    .temp-score { font-size: 2em; font-weight: bold; margin: 8px 0; }
    .strength-weakness {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    .sw-box { background: #f8f9fa; padding: 20px; border-radius: 10px; }
    .sw-box h4 { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 3px solid; }
    .sw-box ul { list-style: none; padding: 0; }
    .sw-box li { padding: 8px 0; padding-left: 25px; position: relative; color: #444; }
    /* Tombol */
    .button-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 30px;
    }
    button {
      padding: 15px 30px;
      border: none;
      border-radius: 10px;
      font-size: 1em;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-download { background: #667eea; color: white; }
    .btn-download:hover { background: #5568d3; transform: translateY(-2px); box-shadow: 0 5px 20px rgba(102,126,234,0.4); }
    .btn-print { background: #2c3e50; color: white; }
    .btn-print:hover { background: #1a252f; transform: translateY(-2px); }
    /* Status */
    .error-msg { text-align: center; padding: 60px 40px; color: #e74c3c; }
    .loading { text-align: center; padding: 60px 40px; color: #7f8c8d; }
    /* Responsive */
    @media print {
      body { background: white; padding: 0; }
      .button-group { display: none; }
      .container { box-shadow: none; }
    }
    @media (max-width: 600px) {
      .header h1 { font-size: 1.5em; }
      .result-card h2 { font-size: 2em; }
      .button-group { grid-template-columns: 1fr; }
      .comparison-table { grid-template-columns: 1fr; }
      .spectrum { flex-direction: column; }
      .strength-weakness { grid-template-columns: 1fr; }
      .temperament-grid { grid-template-columns: 1fr 1fr; }
      .content { padding: 20px; }
    }
  `;

  // ─────────────────────────────────────────────
  // HELPER — inject CSS sekali
  // ─────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('_ke_style')) return;
    const style = document.createElement('style');
    style.id = '_ke_style';
    style.textContent = SHARED_CSS;
    document.head.appendChild(style);
  }

  // ─────────────────────────────────────────────
  // HELPER — profil peserta HTML
  // ─────────────────────────────────────────────
  function profileHTML(d) {
    return `
      <div class="profile-section">
        <h3 style="color:#2c3e50;margin-bottom:15px;">📋 Informasi Peserta</h3>
        <div class="profile-grid">
          <div class="profile-item"><span class="profile-label">Nama Lengkap</span><span class="profile-value">${d.nama || '-'}</span></div>
          <div class="profile-item"><span class="profile-label">Usia</span><span class="profile-value">${d.usia || '-'} Tahun</span></div>
          <div class="profile-item"><span class="profile-label">Pendidikan</span><span class="profile-value">${d.pendidikan || '-'}</span></div>
          <div class="profile-item"><span class="profile-label">Tanggal Tes</span><span class="profile-value">${d.tgl_tes || '-'}</span></div>
        </div>
      </div>`;
  }

  // ─────────────────────────────────────────────
  // HELPER — tombol aksi
  // ─────────────────────────────────────────────
  function buttonHTML(containerId, filename) {
    return `
      <div class="button-group">
        <button class="btn-download" onclick="KarakterEngine.download('${containerId}','${filename}')">📥 Download JPG</button>
        <button class="btn-print" onclick="window.print()">🖨️ Cetak PDF</button>
      </div>`;
  }

  // ─────────────────────────────────────────────
  // HELPER — daftar ul dari array
  // ─────────────────────────────────────────────
  function ulHTML(arr) {
    return arr.map(i => `<li>${i}</li>`).join('');
  }

  // ─────────────────────────────────────────────
  // RENDERER — TES 04 TEMPERAMEN
  // ─────────────────────────────────────────────
  function render04(data, cid) {
    const d = JSON.parse(data.x_02 || '{}');
    const x07 = JSON.parse(data.x_07 || '{}');
    const raw = x07['input-tes-temperamen'] || x07['who_4'] || '';
    if (!raw) { _err(cid, 'Peserta belum mengerjakan Tes Temperamen.'); return; }

    const jawaban = raw.split(';').filter(Boolean);
    const scores = { A: 0, B: 0, C: 0, D: 0 };
    jawaban.forEach(v => { if (scores[v] !== undefined) scores[v]++; });
    const total = 26;
    const domKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const dominant = TEMPERAMENTS[domKey];
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const cardsHTML = sorted.map(([k, sc]) => {
      const t = TEMPERAMENTS[k];
      const pct = Math.round((sc / total) * 100);
      return `<div class="temp-card ${k === domKey ? 'dominant' : ''}" style="border-color:${t.color}">
        <div class="temp-icon">${t.icon}</div>
        <div class="temp-name" style="color:${t.color}">${t.name}</div>
        <div class="temp-score" style="color:${t.color}">${sc}/${total}</div>
        <div style="color:#666;font-size:.9em">${pct}%</div>
      </div>`;
    }).join('');

    document.getElementById(cid).innerHTML = `
      <div class="header"><h1>🎭 Hasil Tes Temperamen</h1><p>Apa Temperamen yang Kita Miliki?</p></div>
      <div class="content">
        ${profileHTML(d)}
        <div class="result-card" style="border-color:${dominant.color}">
          <h2 style="color:${dominant.color}">${dominant.icon} ${dominant.name}</h2>
          <p style="font-size:1.3em;font-weight:bold;color:#555;margin-bottom:10px">${dominant.tagline}</p>
          <p style="font-size:1.1em;color:#555">${dominant.description}</p>
        </div>
        <div class="temperament-grid">${cardsHTML}</div>
        <div class="chart-container"><canvas id="ke_chart"></canvas></div>
        <div class="info-section">
          <h3>🎯 Karakteristik ${dominant.name}</h3>
          <ul>${ulHTML(dominant.characteristics)}</ul>
        </div>
        <div class="strength-weakness">
          <div class="sw-box">
            <h4 style="color:#27ae60;border-color:#27ae60">💪 Kekuatan</h4>
            <ul>${dominant.strengths.map(s => `<li style="color:#27ae60">✓ ${s}</li>`).join('')}</ul>
          </div>
          <div class="sw-box">
            <h4 style="color:#e74c3c;border-color:#e74c3c">⚠️ Kelemahan</h4>
            <ul>${dominant.weaknesses.map(w => `<li style="color:#e74c3c">✗ ${w}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="info-section"><h3>💼 Karir yang Cocok</h3><p style="color:#555;line-height:1.8;font-size:1.1em">${dominant.careers.join(' • ')}</p></div>
        <div class="info-section"><h3>💡 Saran Pengembangan Diri</h3><ul>${ulHTML(dominant.tips)}</ul></div>
        <div class="info-section"><h3>📚 Tentang Temperamen</h3><p style="line-height:1.8;color:#555">Teori temperamen berasal dari Hippocrates yang membagi kepribadian manusia menjadi 4 tipe dasar. Setiap orang biasanya memiliki kombinasi dari keempat temperamen, namun satu atau dua akan lebih dominan. Memahami temperamen membantu kita mengenali kekuatan dan kelemahan diri, serta cara berinteraksi dengan orang lain yang memiliki temperamen berbeda.</p></div>
        ${buttonHTML(cid, 'Hasil-Temperamen')}
      </div>`;

    // Chart polar
    setTimeout(() => {
      const ctx = document.getElementById('ke_chart');
      if (!ctx) return;
      new Chart(ctx.getContext('2d'), {
        type: 'polarArea',
        data: {
          labels: ['Sanguinis','Koleris','Melankolis','Phlegmatis'],
          datasets: [{ data: [scores.A, scores.B, scores.C, scores.D],
            backgroundColor: ['rgba(241,196,15,.7)','rgba(230,126,34,.7)','rgba(155,89,182,.7)','rgba(52,152,219,.7)'],
            borderColor: ['#f1c40f','#e67e22','#9b59b6','#3498db'], borderWidth: 3 }]
        },
        options: { responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { padding: 20, font: { size: 14, weight: 'bold' } } },
            tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed.r}/26` } } },
          scales: { r: { beginAtZero: true, max: 26, ticks: { stepSize: 5 } } }
        }
      });
    }, 100);
  }

  // ─────────────────────────────────────────────
  // RENDERER — TES 05 EKSTROVERT vs INTROVERT
  // ─────────────────────────────────────────────
  function render05(data, cid) {
    const d = JSON.parse(data.x_02 || '{}');
    const x07 = JSON.parse(data.x_07 || '{}');
    const raw = x07['input-tes-extrovert-vs-introvert'] || x07['who_5'] || '';
    if (!raw) { _err(cid, 'Peserta belum mengerjakan Tes Ekstrovert vs Introvert.'); return; }

    const jawaban = raw.split(';').filter(Boolean);
    const scores = { A: 0, B: 0 };
    jawaban.forEach(v => { if (scores[v] !== undefined) scores[v]++; });
    const total = 17;
    const skorExt = scores.A, skorInt = scores.B;
    const persenExt = Math.round((skorExt / total) * 100);
    const persenInt = Math.round((skorInt / total) * 100);
    const diff = Math.abs(skorExt - skorInt);
    const p = diff <= 3 ? PERSONALITY_TYPES.AMBIVERT : (skorExt > skorInt ? PERSONALITY_TYPES.EXTROVERT : PERSONALITY_TYPES.INTROVERT);
    const marker = (skorExt / total) * 100;

    document.getElementById(cid).innerHTML = `
      <div class="header"><h1>🎭 Hasil Tes Kepribadian</h1><p>Saya Termasuk Ekstrovert atau Introvert?</p></div>
      <div class="content">
        ${profileHTML(d)}
        <div class="result-card" style="border-color:${p.color}">
          <h2 style="color:${p.color}">${p.icon} ${p.name}</h2>
          <div class="result-tagline" style="color:${p.color}">${p.tagline}</div>
          <p style="font-size:1.1em;color:#555">${p.description}</p>
        </div>
        <div class="spectrum">
          <div class="spectrum-side">
            <div class="spectrum-icon">🎉</div>
            <div class="spectrum-name" style="color:#e74c3c">Ekstrovert</div>
            <div class="spectrum-score" style="color:#e74c3c">${persenExt}%</div>
            <div style="color:#666">${skorExt}/${total}</div>
          </div>
          <div class="spectrum-bar">
            <div class="bar-marker" style="left:${marker}%">👤</div>
            <div class="bar-container" style="background:linear-gradient(to right,#e74c3c,#34495e)">
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:white;font-weight:bold;font-size:.9em">Spektrum Kepribadian</div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:10px;color:#666;font-size:.9em">
              <span>Ekstrovert</span><span>Seimbang</span><span>Introvert</span>
            </div>
          </div>
          <div class="spectrum-side">
            <div class="spectrum-icon">📚</div>
            <div class="spectrum-name" style="color:#34495e">Introvert</div>
            <div class="spectrum-score" style="color:#34495e">${persenInt}%</div>
            <div style="color:#666">${skorInt}/${total}</div>
          </div>
        </div>
        <div class="chart-container"><canvas id="ke_chart"></canvas></div>
        <div class="info-section"><h3>🎯 Karakteristik Anda</h3><ul>${ulHTML(p.characteristics)}</ul></div>
        <div class="info-section"><h3>💪 Kekuatan Anda</h3><ul>${ulHTML(p.strengths)}</ul></div>
        <div class="info-section"><h3>💼 Karir yang Cocok</h3><p style="color:#555;line-height:1.8;font-size:1.1em">${p.careers.join(' • ')}</p></div>
        <div class="info-section"><h3>💡 Saran Pengembangan Diri</h3><ul>${ulHTML(p.tips)}</ul></div>
        <div class="info-section" style="background:linear-gradient(135deg,#fff3cd,#fff9e6);border-left:5px solid #ffc107">
          <h3 style="color:#856404">🔍 Mitos yang Perlu Diluruskan</h3>
          <p style="color:#856404;line-height:1.8"><strong>Mitos:</strong> "Introvert itu pemalu dan ekstrovert selalu percaya diri."<br><strong>Fakta:</strong> Introvert vs Ekstrovert adalah tentang sumber energi, bukan tentang rasa percaya diri atau kemampuan sosial.</p>
          <br><p style="color:#856404;line-height:1.8"><strong>Mitos:</strong> "Ekstrovert lebih sukses daripada introvert."<br><strong>Fakta:</strong> Kesuksesan tidak ditentukan oleh tipe kepribadian. Baik introvert maupun ekstrovert memiliki kekuatan unik.</p>
        </div>
        <div class="info-section"><h3>⚖️ Perbandingan Ekstrovert vs Introvert</h3>
          <div class="comparison-table">
            <div class="table-column">
              <h4 style="color:#e74c3c;border-color:#e74c3c">🎉 Ekstrovert</h4>
              <ul>${['Energi dari luar','Think out loud','Banyak teman','Suka keramaian','Ekspresif','Action-oriented'].map(i=>`<li style="color:#e74c3c">${i}</li>`).join('')}</ul>
            </div>
            <div class="table-column">
              <h4 style="color:#34495e;border-color:#34495e">📚 Introvert</h4>
              <ul>${['Energi dari dalam','Think before speak','Teman dekat','Suka ketenangan','Reflektif','Thought-oriented'].map(i=>`<li style="color:#34495e">${i}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
        ${buttonHTML(cid, 'Hasil-Ekstrovert-Introvert')}
      </div>`;

    setTimeout(() => {
      const ctx = document.getElementById('ke_chart');
      if (!ctx) return;
      new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: { labels: ['Ekstrovert','Introvert'],
          datasets: [{ label: 'Skor', data: [skorExt, skorInt],
            backgroundColor: ['rgba(231,76,60,.7)','rgba(52,73,94,.7)'],
            borderColor: ['#e74c3c','#34495e'], borderWidth: 3 }] },
        options: { responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false },
            tooltip: { callbacks: { label: ctx => `Skor: ${ctx.parsed.y}/17 (${Math.round(ctx.parsed.y/17*100)}%)` } } },
          scales: { y: { beginAtZero: true, max: 17, ticks: { stepSize: 2 } } }
        }
      });
    }, 100);
  }

  // ─────────────────────────────────────────────
  // RENDERER — TES 06 SENSING vs INTUITIF
  // ─────────────────────────────────────────────
  function render06(data, cid) {
    const d = JSON.parse(data.x_02 || '{}');
    const x07 = JSON.parse(data.x_07 || '{}');
    const raw = x07['input-tes-sensori-vs-intuitif'] || x07['who_6'] || '';
    if (!raw) { _err(cid, 'Peserta belum mengerjakan Tes Sensori vs Intuitif.'); return; }

    const jawaban = raw.split(';').filter(Boolean);
    const scores = { A: 0, B: 0 };
    jawaban.forEach(v => { if (scores[v] !== undefined) scores[v]++; });
    const total = scores.A + scores.B;
    const domKey = scores.A >= scores.B ? 'A' : 'B';
    const cfg = SENSING_TYPES[domKey];
    const persenA = Math.round((scores.A / total) * 100);
    const persenB = Math.round((scores.B / total) * 100);

    document.getElementById(cid).innerHTML = `
      <div class="header"><h1>🔍 Tes Cara Berpikir</h1><p>Bagaimana Anda Memproses Informasi & Mempercayai Sesuatu</p></div>
      <div class="content">
        ${profileHTML(d)}
        <div class="result-card" style="border-color:${cfg.color}">
          <h2 style="color:${cfg.color}">${cfg.icon} ${cfg.title}</h2>
          <div class="result-tagline" style="color:${cfg.color}">${cfg.tagline}</div>
        </div>
        <div class="spectrum">
          <div class="spectrum-side">
            <div class="spectrum-icon">🔍</div>
            <div class="spectrum-name" style="color:#2980b9">Sensing (A)</div>
            <div class="spectrum-score" style="color:#2980b9">${persenA}%</div>
          </div>
          <div class="spectrum-bar">
            <div style="height:30px;border-radius:15px;overflow:hidden;display:flex">
              <div style="width:${persenA}%;background:#2980b9"></div>
              <div style="width:${persenB}%;background:#8e44ad"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:8px;color:#666;font-size:.9em"><span>Sensing</span><span>Intuitif</span></div>
          </div>
          <div class="spectrum-side">
            <div class="spectrum-icon">✨</div>
            <div class="spectrum-name" style="color:#8e44ad">Intuitif (B)</div>
            <div class="spectrum-score" style="color:#8e44ad">${persenB}%</div>
          </div>
        </div>
        <div class="info-section">
          <p style="font-size:1.1em;line-height:1.8"><strong>Apa artinya bagi Anda?</strong><br>${cfg.desc}</p>
        </div>
        <div class="info-section"><h3>🎯 Karakteristik Utama</h3><ul>${ulHTML(cfg.traits)}</ul></div>
        <div class="info-section"><h3>💼 Saran Bidang Karir</h3><p style="color:#555;line-height:1.8;font-size:1.1em">${cfg.careers.join(' • ')}</p></div>
        ${buttonHTML(cid, 'Hasil-Sensing-Intuitif')}
      </div>`;
  }

  // ─────────────────────────────────────────────
  // RENDERER — TES 07 THINKING vs FEELING
  // ─────────────────────────────────────────────
  function render07(data, cid) {
    const d = JSON.parse(data.x_02 || '{}');
    const x07 = JSON.parse(data.x_07 || '{}');
    const raw = x07['input-tes-thinking-vs-feeling'] || x07['who_7'] || '';
    if (!raw) { _err(cid, 'Peserta belum mengerjakan Tes Thinking vs Feeling.'); return; }

    const jawaban = raw.split(';').filter(Boolean);
    const scores = { A: 0, B: 0 };
    jawaban.forEach(v => { if (scores[v] !== undefined) scores[v]++; });
    const total = 20;
    const skorT = scores.A, skorF = scores.B;
    const persenT = Math.round((skorT / total) * 100);
    const persenF = Math.round((skorF / total) * 100);
    const p = skorT >= skorF ? DECISION_TYPES.THINKING : DECISION_TYPES.FEELING;
    const marker = (skorT / total) * 100;

    document.getElementById(cid).innerHTML = `
      <div class="header"><h1>⚖️ Hasil Tes Pengambilan Keputusan</h1><p>Saya Termasuk Tipe Pemikir atau Perasa?</p></div>
      <div class="content">
        ${profileHTML(d)}
        <div class="result-card" style="border-color:${p.color}">
          <h2 style="color:${p.color}">${p.icon} ${p.name}</h2>
          <div class="result-tagline" style="color:${p.color}">${p.tagline}</div>
          <p style="font-size:1.1em;color:#555">${p.description}</p>
        </div>
        <div class="spectrum">
          <div class="spectrum-side">
            <div class="spectrum-icon">🧠</div>
            <div class="spectrum-name" style="color:#2980b9">Thinking</div>
            <div class="spectrum-score" style="color:#2980b9">${persenT}%</div>
            <div style="color:#666">${skorT}/${total}</div>
          </div>
          <div class="spectrum-bar">
            <div class="bar-marker" style="left:${marker}%">👤</div>
            <div class="bar-container" style="background:linear-gradient(to right,#2980b9,#e91e63)">
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:white;font-weight:bold;font-size:.9em">Spektrum Keputusan</div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:10px;color:#666;font-size:.9em"><span>Logika</span><span>Seimbang</span><span>Empati</span></div>
          </div>
          <div class="spectrum-side">
            <div class="spectrum-icon">❤️</div>
            <div class="spectrum-name" style="color:#e91e63">Feeling</div>
            <div class="spectrum-score" style="color:#e91e63">${persenF}%</div>
            <div style="color:#666">${skorF}/${total}</div>
          </div>
        </div>
        <div class="chart-container"><canvas id="ke_chart"></canvas></div>
        <div class="info-section"><h3>🎯 Karakteristik Anda</h3><ul>${ulHTML(p.characteristics)}</ul></div>
        <div class="info-section"><h3>💪 Kekuatan Anda</h3><ul>${ulHTML(p.strengths)}</ul></div>
        <div class="info-section"><h3>⚠️ Area Pengembangan</h3><ul>${ulHTML(p.weaknesses)}</ul></div>
        <div class="info-section"><h3>💼 Karir yang Cocok</h3><p style="color:#555;line-height:1.8;font-size:1.1em">${p.careers.join(' • ')}</p></div>
        <div class="info-section"><h3>💡 Saran Pengembangan Diri</h3><ul>${ulHTML(p.tips)}</ul></div>
        <div class="info-section"><h3>⚖️ Perbandingan Thinking vs Feeling</h3>
          <div class="comparison-table">
            <div class="table-column"><h4 style="color:#2980b9;border-color:#2980b9">🧠 Thinking</h4>
              <ul>${['Logika & Objektif','Kebenaran & Fakta','Analisis Pro-Kontra','Tegas & Direct','Konsistensi Prinsip','Jarak Emosional'].map(i=>`<li style="color:#2980b9">${i}</li>`).join('')}</ul>
            </div>
            <div class="table-column"><h4 style="color:#e91e63;border-color:#e91e63">❤️ Feeling</h4>
              <ul>${['Empati & Subjektif','Nilai & Harmoni','Dampak Orang Lain','Diplomatik & Lembut','Fleksibel Kontekstual','Koneksi Emosional'].map(i=>`<li style="color:#e91e63">${i}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
        <div class="info-section" style="background:#fff3cd;border-color:#ffc107">
          <h3 style="color:#856404">📚 Dalam Konteks MBTI</h3>
          <p style="color:#856404;line-height:1.8">Dimensi Thinking-Feeling adalah salah satu dari 4 dimensi dalam Myers-Briggs Type Indicator (MBTI). <strong>Penting:</strong> Thinking bukan berarti tidak punya perasaan, dan Feeling bukan berarti tidak bisa berpikir logis. Ini hanya tentang preferensi Anda saat mengambil keputusan.</p>
        </div>
        ${buttonHTML(cid, 'Hasil-Thinking-Feeling')}
      </div>`;

    setTimeout(() => {
      const ctx = document.getElementById('ke_chart');
      if (!ctx) return;
      new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: { labels: ['Thinking','Feeling'],
          datasets: [{ label: 'Skor', data: [skorT, skorF],
            backgroundColor: ['rgba(41,128,185,.7)','rgba(233,30,99,.7)'],
            borderColor: ['#2980b9','#e91e63'], borderWidth: 3 }] },
        options: { responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false },
            tooltip: { callbacks: { label: c => `Skor: ${c.parsed.y}/${total} (${c.dataIndex===0?persenT:persenF}%)` } } },
          scales: { y: { beginAtZero: true, max: total, ticks: { stepSize: 2 } } }
        }
      });
    }, 100);
  }

  // ─────────────────────────────────────────────
  // RENDERER — TES 08 JUDGING vs PERCEIVING
  // ─────────────────────────────────────────────
  function render08(data, cid) {
    const d = JSON.parse(data.x_02 || '{}');
    const x07 = JSON.parse(data.x_07 || '{}');
    const raw = x07['input-tes-pengamat-vs-penilai'] || x07['who_8'] || '';
    if (!raw) { _err(cid, 'Peserta belum mengerjakan Tes Pengamat vs Penilai.'); return; }

    const jawaban = raw.split(';').filter(Boolean);
    const scores = { A: 0, B: 0 };
    jawaban.forEach(v => { if (scores[v] !== undefined) scores[v]++; });
    const total = 10;
    const skorJ = scores.A, skorP = scores.B;
    const persenJ = Math.round((skorJ / total) * 100);
    const persenP = Math.round((skorP / total) * 100);
    const p = skorJ > skorP ? LIFESTYLE_TYPES.JUDGING : LIFESTYLE_TYPES.PERCEIVING;
    const marker = (skorJ / total) * 100;

    document.getElementById(cid).innerHTML = `
      <div class="header"><h1>🎯 Hasil Tes Gaya Hidup</h1><p>Saya Termasuk Tipe Penilai atau Pengamat?</p></div>
      <div class="content">
        ${profileHTML(d)}
        <div class="result-card" style="border-color:${p.color}">
          <h2 style="color:${p.color}">${p.icon} ${p.name}</h2>
          <div class="result-tagline" style="color:${p.color}">${p.tagline}</div>
          <p style="font-size:1.1em;color:#555">${p.description}</p>
        </div>
        <div class="spectrum">
          <div class="spectrum-side">
            <div class="spectrum-icon">📋</div>
            <div class="spectrum-name" style="color:#27ae60">Judging</div>
            <div class="spectrum-score" style="color:#27ae60">${persenJ}%</div>
            <div style="color:#666">${skorJ}/${total}</div>
          </div>
          <div class="spectrum-bar">
            <div class="bar-marker" style="left:${marker}%">👤</div>
            <div class="bar-container" style="background:linear-gradient(to right,#27ae60,#e67e22)">
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:white;font-weight:bold;font-size:.9em">Spektrum Gaya Hidup</div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:10px;color:#666;font-size:.9em"><span>Terstruktur</span><span>Seimbang</span><span>Fleksibel</span></div>
          </div>
          <div class="spectrum-side">
            <div class="spectrum-icon">🎈</div>
            <div class="spectrum-name" style="color:#e67e22">Perceiving</div>
            <div class="spectrum-score" style="color:#e67e22">${persenP}%</div>
            <div style="color:#666">${skorP}/${total}</div>
          </div>
        </div>
        <div class="chart-container"><canvas id="ke_chart"></canvas></div>
        <div class="info-section"><h3>🎯 Karakteristik Anda</h3><ul>${ulHTML(p.characteristics)}</ul></div>
        <div class="info-section"><h3>💪 Kekuatan Anda</h3><ul>${ulHTML(p.strengths)}</ul></div>
        <div class="info-section"><h3>⚠️ Area Pengembangan</h3><ul>${ulHTML(p.weaknesses)}</ul></div>
        <div class="info-section"><h3>💼 Karir yang Cocok</h3><p style="color:#555;line-height:1.8;font-size:1.1em">${p.careers.join(' • ')}</p></div>
        <div class="info-section"><h3>💡 Saran Pengembangan Diri</h3><ul>${ulHTML(p.tips)}</ul></div>
        <div class="info-section"><h3>⚖️ Perbandingan Judging vs Perceiving</h3>
          <div class="comparison-table">
            <div class="table-column"><h4 style="color:#27ae60;border-color:#27ae60">📋 Judging</h4>
              <ul>${['Terencana','Terorganisir','Keputusan Cepat','Suka Closure','Disiplin','Goal-oriented'].map(i=>`<li style="color:#27ae60">${i}</li>`).join('')}</ul>
            </div>
            <div class="table-column"><h4 style="color:#e67e22;border-color:#e67e22">🎈 Perceiving</h4>
              <ul>${['Fleksibel','Spontan','Pilihan Terbuka','Eksplorasi','Adaptif','Process-oriented'].map(i=>`<li style="color:#e67e22">${i}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
        <div class="info-section" style="background:#fff3cd;border-color:#ffc107">
          <h3 style="color:#856404">📚 Dalam Konteks MBTI</h3>
          <p style="color:#856404;line-height:1.8">Dimensi Judging-Perceiving adalah dimensi ke-4 dalam Myers-Briggs Type Indicator (MBTI). Judging lebih suka keputusan dan struktur, sedangkan Perceiving lebih suka fleksibilitas dan spontanitas.</p>
        </div>
        ${buttonHTML(cid, 'Hasil-Judging-Perceiving')}
      </div>`;

    setTimeout(() => {
      const ctx = document.getElementById('ke_chart');
      if (!ctx) return;
      new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: { labels: ['Judging','Perceiving'],
          datasets: [{ label: 'Skor', data: [skorJ, skorP],
            backgroundColor: ['rgba(39,174,96,.7)','rgba(230,126,34,.7)'],
            borderColor: ['#27ae60','#e67e22'], borderWidth: 3 }] },
        options: { responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false },
            tooltip: { callbacks: { label: c => `Skor: ${c.parsed.y}/${total} (${c.dataIndex===0?persenJ:persenP}%)` } } },
          scales: { y: { beginAtZero: true, max: total, ticks: { stepSize: 2 } } }
        }
      });
    }, 100);
  }

  // ─────────────────────────────────────────────
  // HELPER — tampilkan error
  // ─────────────────────────────────────────────
  function _err(cid, msg) {
    document.getElementById(cid).innerHTML =
      `<div class="error-msg"><h2>⚠️ Data Tidak Sesuai</h2><p>${msg}</p></div>`;
  }

  // ─────────────────────────────────────────────
  // PUBLIC — download JPG
  // ─────────────────────────────────────────────
  async function download(containerId, filename) {
    const btn = document.querySelector('.btn-download');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Memproses...'; }
    try {
      const el = document.getElementById(containerId);
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', logging: false });
      const a = document.createElement('a');
      a.download = `${filename}-${Date.now()}.jpg`;
      a.href = canvas.toDataURL('image/jpeg', 0.95);
      a.click();
      if (btn) { btn.disabled = false; btn.textContent = '✅ Download Berhasil!'; setTimeout(() => btn.textContent = '📥 Download JPG', 2000); }
    } catch (e) {
      if (btn) { btn.disabled = false; btn.textContent = '❌ Gagal'; setTimeout(() => btn.textContent = '📥 Download JPG', 2000); }
    }
  }

  // ─────────────────────────────────────────────
  // PUBLIC — main entry point
  //   tesId: '04' | '05' | '06' | '07' | '08'
  //   containerId: ID div target (default: 'mainContainer')
  // ─────────────────────────────────────────────
  async function render(tesId, containerId = 'mainContainer') {
    injectCSS();

    // Pastikan container ada
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }

    // Tampilkan loading
    container.innerHTML = `
      <div class="container">
        <div class="loading">
          <div style="font-size:3em;margin-bottom:20px">⏳</div>
          <h3>Memuat Hasil Tes...</h3>
        </div>
      </div>`;

    // Ambil token dari URL
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      container.innerHTML = `<div class="container"><div class="error-msg"><h2>❌ Error</h2><p>Token tidak ditemukan di URL</p></div></div>`;
      return;
    }

    // Fetch data
    let data;
    try {
      const res = await fetch(`${API_BASE}?table=nilai1_json&x_01_eq=${token}`, { headers: API_HEADERS });
      const json = await res.json();
      if (!json.success || !json.data || json.data.length === 0) {
        container.innerHTML = `<div class="container"><div class="error-msg"><h2>❌ Data Tidak Ditemukan</h2><p>Token tidak valid atau sudah kadaluarsa</p></div></div>`;
        return;
      }
      data = json.data[0];
    } catch (e) {
      container.innerHTML = `<div class="container"><div class="error-msg"><h2>❌ Kesalahan Koneksi</h2><p>Tidak dapat terhubung ke server</p></div></div>`;
      return;
    }

    // Bungkus dengan container card
    container.innerHTML = `<div class="container" id="${containerId}_inner"></div>`;
    const innerId = `${containerId}_inner`;

    // Dispatch ke renderer yang sesuai
    const renderers = { '04': render04, '05': render05, '06': render06, '07': render07, '08': render08 };
    const fn = renderers[tesId];
    if (fn) {
      fn(data, innerId);
    } else {
      document.getElementById(innerId).innerHTML =
        `<div class="error-msg"><h2>❌ Tes ID tidak dikenal: ${tesId}</h2></div>`;
    }
  }

  // Expose public API
  return { render, download };

})();
