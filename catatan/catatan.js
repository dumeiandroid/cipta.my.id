// =========================================================
// catatan.js — Pusat penyimpanan catatan semua aplikasi
// =========================================================
// Cara pakai di halaman manapun:
//
//   <script src="catatan-engine.js"></script>
//   <script src="catatan.js"></script>
//
//   Inline (tombol muncul di tempat div):
//   <div data-catatan="nama_catatan"></div>
//
//   Mengambang pojok kanan bawah:
//   <div data-catatan="nama_catatan" data-float="true"></div>
//
//   Satu halaman boleh banyak catatan:
//   <div data-catatan="catatan_a"></div>
//   <div data-catatan="catatan_b"></div>
// =========================================================

const CATATAN = {

  // ── API FILES ──

  "db_psikogram1": {
    judul: "API — db_psikogram1.js",
    isi: `Cloudflare Pages Function untuk database psikogram_db.
**Binding:** DB_PSIKOGRAM → psikogram_db
**Endpoint:** /api/db_psikogram1
**Auth:** X-Custom-Auth: admin
**Fitur:** GET, POST, PUT, DELETE, list_tables, login
**Tabel:** otomatis dibuat saat GET/POST pertama kali
**Kolom:** id_x, x_01–x_25`
  },

  "db_gbkp1": {
    judul: "API — db_gbkp1.js",
    isi: `Cloudflare Pages Function untuk database gbkp_db.
**Binding:** DB_GBKP → gbkp_db
**Endpoint:** /api/db_gbkp1
**Auth:** X-Custom-Auth: admin
**Catatan:** versi terbaru sudah dinamis — cukup ubah CONFIG di baris paling atas untuk ganti database.
**CONFIG:**
  DB_BINDING: nama binding di Cloudflare
  DB_NAME: nama database D1`
  },

  "db1": {
    judul: "API — db1.js",
    isi: `Cloudflare Pages Function untuk database db1.
**Binding:** DB1 → db1
**Endpoint:** /api/db1
**Auth:** X-Custom-Auth: admin
**Dibuat dari:** duplikat db_gbkp1.js (versi dinamis)`
  },

  "contacts_filter_dinamis7": {
    judul: "API — contacts_filter_dinamis7.js",
    isi: `Cloudflare Pages Function untuk database lidan_co_id.
**Binding:** DB_LIDAN_CO_ID → lidan_co_id
**Endpoint:** /api/contacts_filter_dinamis7
**Auth:** X-Custom-Auth: admin
**Catatan:** API utama lama, masih digunakan sebagai sumber transfer data`
  },

  // ── HTML — MANAGEMENT ──

  "multi_psikogram": {
    judul: "Halaman Management — psikogram_db",
    isi: `Tabel CRUD dinamis untuk database psikogram_db.
**API:** db_psikogram1
**Tabel default:** cover
**Fitur:** ganti tabel, tambah, edit inline, hapus
**Login:** admin / admin
**File:** multi_psikogram.html (dan versi 1–3)`
  },

  "multi_gbkp": {
    judul: "Halaman Management — gbkp_db",
    isi: `Tabel CRUD dinamis untuk database gbkp_db.
**API:** db_gbkp1
**Tabel default:** cover
**Fitur:** ganti tabel, tambah, edit inline, hapus
**Login:** admin / admin
**File:** multi1_gbkp.html hingga multi4_gbkp.html`
  },

  // ── HTML — PSIKOGRAM ──

  "index_rekap": {
    judul: "Halaman Admin Rekap — index_rekap.html",
    isi: `Menampilkan daftar peserta dari tabel rekap di psikogram_db.
**API:** db_psikogram1
**Tabel default:** rekap_nilai1
**Ganti tabel:** via tombol "Ganti Tabel" atau URL ?tabel=nama_tabel
**Kolom tampil:** ID, Kode (x_01), Nama (x_02), IQ (x_06), Tanggal (x_11)
**Link:** tombol Lihat → index_final.html?id_x=&x_01=&tabel=
**Fitur:** auto-refresh 5 detik, hapus data, statistik`
  },

  "index_final": {
    judul: "Halaman Detail Psikogram — index_final.html",
    isi: `Menampilkan hasil psikogram lengkap satu peserta.
**API:** db_psikogram1
**Tabel:** dinamis dari URL ?tabel= (default: rekap_nilai1)
**Parameter URL:** ?id_x=&x_01=&tabel=
**Struktur kolom:**
  x_01 = kode peserta
  x_02 = biodata (JSON)
  x_03 = kemampuan (JSON)
  x_04 = kepribadian (JSON)
  x_05 = sikap kerja (JSON)
  x_06 = IQ
  x_07 = kekuatan (JSON)
  x_08 = kelemahan (JSON)
  x_09 = rekomendasi (JSON)
  x_10 = minat (JSON)
  x_11 = tanggal transfer
**Fitur:** edit via popup modal, download PDF`
  },

  "index_transfer": {
    judul: "Halaman Transfer Data — index_transfer.html",
    isi: `Transfer data hasil psikotes dari lidan_co_id ke psikogram_db.
**Sumber:** contacts_filter_dinamis6 → tabel nilai1 (lidan_co_id)
**Tujuan:** db_psikogram1 → tabel rekap_nilai1 (psikogram_db)
**Engine:** membutuhkan psikogram-engine.js di folder yang sama
**Proses:** ambil data → mapping x_01–x_11 → cek duplikat → POST/PUT
**Catatan:** tabel sumber & tujuan bisa diubah via UI`
  },

  "index_transfer_psikogram": {
    judul: "Halaman Transfer — index_transfer_psikogram.html",
    isi: `Versi transfer dengan tujuan ke psikogram_db.
**Sumber GET:** contacts_filter_dinamis6 (lidan_co_id)
**Tujuan POST/PUT:** db_psikogram1 (psikogram_db)
**Membutuhkan:** psikogram-engine.js di folder yang sama`
  },

  "psikotest_admin": {
    judul: "Halaman Admin Psikotes — psikotest.html (lama)",
    isi: `Tabel admin psikotes menggunakan database lidan_co_id.
**API:** contacts_filter_dinamis7
**Tabel:** nilai1
**Fitur:** auto-refresh, tambah token, DataTables
**Catatan:** versi baru pakai index_rekap.html dengan psikogram_db`
  },

  // ── CATATAN SISTEM ──

  "cloudflare_bindings": {
    judul: "Daftar Bindings Cloudflare Pages — lidan-co-id",
    isi: `Binding D1 yang sudah dibuat di project lidan-co-id:
**DB_LIDAN_CO_ID** → lidan_co_id (database utama lama)
**DB_PSIKOGRAM**   → psikogram_db (data hasil psikogram)
**DB_GBKP**        → gbkp_db (data GBKP)
**DB1**            → db1 (database umum baru)

Cara tambah binding baru:
Settings → Bindings → +Add → D1 database → isi nama → Save → Retry deployment`
  },

  "cara_buat_api_baru": {
    judul: "Panduan: Cara Buat API Database Baru",
    isi: `Langkah membuat API untuk database baru:
1. Buat database D1 di Cloudflare (nama huruf kecil, contoh: mydb)
2. Tambah binding di Pages Settings (nama huruf besar, contoh: DB_MYDB)
3. Retry deployment setelah Save
4. Duplikat db_gbkp1.js → ganti nama → ubah CONFIG:
   DB_BINDING: 'DB_MYDB'
   DB_NAME: 'mydb'
5. Upload ke functions/api/ → push → deploy
6. API aktif di: /api/nama_file`
  },

};