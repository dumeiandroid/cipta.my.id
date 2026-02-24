// =========================================================
// catatan.js — Pusat penyimpanan catatan semua aplikasi
// Versi: 1.1 | 2026-02-24
// =========================================================
// UPDATE: cukup edit file ini saja. catatan-engine.js tidak perlu diubah.
// Cara embed di halaman:
//   <script src="https://cipta.my.id/catatan/catatan-engine.js"></script>
//   <script src="https://cipta.my.id/catatan/catatan.js"></script>
//   <div data-catatan="nama_key"></div>              ← inline
//   <div data-catatan="nama_key" data-float="true"> ← mengambang
// =========================================================

const CATATAN = {

  // ════════════════════════════════
  // MENU DASHBOARD — index.html
  // ════════════════════════════════

  "dashboard": {
    judul: "Dashboard — Halaman Utama",
    isi: `Halaman utama Admin Portal Lidan Co.
Menampilkan semua shortcut aplikasi dalam bentuk card per kategori.
**Kategori:** Psikotest, Transfer Data, Keuangan, Dokumen, Voucher, PKL, Sistem
**File:** index.html di admin.lidan.co.id`
  },

  "psikotest_admin_web": {
    judul: "Psikotest Admin",
    isi: `Panel admin untuk pengelolaan platform psikotest.
**URL:** admin.lidan.co.id/admin/psikotest
**Fungsi:** manajemen peserta, token akses, dan hasil tes`
  },

  "psikotest_co_id": {
    judul: "Platform Psikotest — lidan.co.id",
    isi: `Platform psikotest utama berbasis domain lidan.co.id.
**URL:** psikotest.lidan.co.id
**Fungsi:** peserta mengerjakan tes psikologi secara online`
  },

  "psikotest_my_id": {
    judul: "Platform Psikotest — my.id",
    isi: `Platform psikotest alternatif berbasis domain my.id.
**URL:** psikotest.my.id
**Fungsi:** peserta mengerjakan tes psikologi secara online`
  },

  "transfer_sql": {
    judul: "Transfer SQL",
    isi: `Halaman transfer data SQL antar database via cloud.
**URL:** lidanpsikologi.my.id/cloud
**Fungsi:** sinkronisasi atau migrasi data antar database`
  },

  "transfer_psikotestmyid": {
    judul: "Transfer Data — Psikotest.my.id",
    isi: `Transfer hasil psikotest dari platform psikotest.my.id.
**URL:** psikotest.my.id/transfer
**Fungsi:** memindahkan data hasil tes ke database tujuan`
  },

  "transfer_lidanpsikologi": {
    judul: "Transfer Data — LidanPsikologi",
    isi: `Transfer hasil psikotest dari platform lidanpsikologi.my.id.
**URL:** lidanpsikologi.my.id/transfer
**Fungsi:** memindahkan data hasil tes ke database tujuan`
  },

  "psikogram_web": {
    judul: "Psikogram",
    isi: `Halaman laporan psikogram hasil tes peserta.
**URL:** psikogram.lidan.co.id
**Fungsi:** menampilkan hasil analisis psikologi lengkap per peserta`
  },

  "whoami_web": {
    judul: "Who am I",
    isi: `Aplikasi tes kepribadian Who am I.
**URL:** test.lidan.co.id
**Fungsi:** peserta mengisi tes untuk mengetahui tipe kepribadiannya`
  },

  "iq_sertifikat": {
    judul: "IQ Sertifikat",
    isi: `Halaman cetak sertifikat hasil tes IQ.
**URL:** iq.lidan.co.id
**Fungsi:** menghasilkan sertifikat resmi hasil tes IQ peserta`
  },

  "invoice_web": {
    judul: "Invoice",
    isi: `Aplikasi pembuatan invoice / faktur tagihan.
**URL:** invoice.lidan.co.id
**Fungsi:** buat, cetak, dan kelola invoice untuk klien`
  },

  "kwitansi_web": {
    judul: "Kwitansi",
    isi: `Aplikasi pembuatan kwitansi pembayaran.
**URL:** kwitansi.lidan.co.id
**Fungsi:** buat dan cetak kwitansi tanda terima pembayaran`
  },

  "penawaran_web": {
    judul: "Surat Penawaran",
    isi: `Aplikasi pembuatan surat penawaran harga.
**URL:** penawaran.lidan.co.id
**Fungsi:** buat dan cetak dokumen penawaran untuk klien`
  },

  "surat_web": {
    judul: "Surat",
    isi: `Aplikasi pembuatan surat resmi.
**URL:** surat.lidan.co.id
**Fungsi:** buat dan cetak berbagai jenis surat resmi`
  },

  "qr_web": {
    judul: "QR Code Generator",
    isi: `Aplikasi generator QR Code.
**URL:** qr.lidan.co.id
**Fungsi:** membuat QR code dari URL atau teks apapun`
  },

  "voucher_lidan": {
    judul: "Voucher LidanPsikologi",
    isi: `Manajemen voucher akses psikotest untuk LidanPsikologi.
**URL:** pkl.lidan.co.id
**Fungsi:** generate dan kelola kode voucher akses tes`
  },

  "voucher_psikotest": {
    judul: "Voucher Psikotest",
    isi: `Manajemen voucher akses psikotest.
**URL:** lidanpsikologi.my.id/test/admin/voucher.php
**Fungsi:** generate dan kelola kode voucher akses tes`
  },

  "pkl_admin": {
    judul: "PKL Admin",
    isi: `Panel admin untuk program PKL (Praktek Kerja Lapangan).
**URL:** pkl.lidan.co.id/admin
**Fungsi:** kelola peserta PKL, absensi, dan laporan kegiatan`
  },

  "pkl_voucher": {
    judul: "PKL Voucher",
    isi: `Voucher khusus untuk peserta PKL mengikuti psikotest.
**URL:** psikotest.my.id/test/admin/voucher.php
**Fungsi:** generate voucher akses psikotest untuk peserta PKL`
  },

  "localstorage_admin": {
    judul: "LocalStorage Admin",
    isi: `Panel admin untuk manajemen data LocalStorage browser.
**URL:** admin.lidan.co.id/admin/local
**Fungsi:** lihat, edit, dan hapus data yang tersimpan di localStorage`
  },

  // ════════════════════════════════
  // API FILES — Cloudflare Pages
  // ════════════════════════════════

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
**Catatan:** versi dinamis — ubah CONFIG di baris atas untuk ganti database.
**CONFIG:**
  DB_BINDING: nama binding di Cloudflare
  DB_NAME: nama database D1`
  },

  "db1": {
    judul: "API — db1.js",
    isi: `Cloudflare Pages Function untuk database db1.
**Binding:** DB1 → db1
**Endpoint:** /api/db1
**Dibuat dari:** duplikat db_gbkp1.js (versi dinamis)`
  },

  "contacts_filter_dinamis7": {
    judul: "API — contacts_filter_dinamis7.js",
    isi: `Cloudflare Pages Function untuk database lidan_co_id.
**Binding:** DB_LIDAN_CO_ID → lidan_co_id
**Endpoint:** /api/contacts_filter_dinamis7
**Catatan:** API utama lama, masih digunakan sebagai sumber transfer data`
  },

  // ════════════════════════════════
  // HTML — MANAGEMENT
  // ════════════════════════════════

  "multi_psikogram": {
    judul: "Halaman Management — psikogram_db",
    isi: `Tabel CRUD dinamis untuk database psikogram_db.
**API:** db_psikogram1 | **Login:** admin / admin
**Tabel default:** cover
**Fitur:** ganti tabel, tambah, edit inline, hapus
**File:** multi_psikogram.html (dan versi 1–3)`
  },

  "multi_gbkp": {
    judul: "Halaman Management — gbkp_db",
    isi: `Tabel CRUD dinamis untuk database gbkp_db.
**API:** db_gbkp1 | **Login:** admin / admin
**Tabel default:** cover
**File:** multi1_gbkp.html hingga multi4_gbkp.html`
  },

  // ════════════════════════════════
  // HTML — PSIKOGRAM
  // ════════════════════════════════

  "index_rekap": {
    judul: "Halaman Admin Rekap — index_rekap.html",
    isi: `Menampilkan daftar peserta dari tabel rekap di psikogram_db.
**API:** db_psikogram1 | **Tabel default:** rekap_nilai1
**Ganti tabel:** tombol "Ganti Tabel" atau URL ?tabel=nama_tabel
**Kolom:** ID, Kode (x_01), Nama (x_02), IQ (x_06), Tanggal (x_11)
**Link:** Lihat → index_final.html?id_x=&x_01=&tabel=
**Fitur:** auto-refresh 5 detik, hapus data, statistik`
  },

  "index_final": {
    judul: "Halaman Detail Psikogram — index_final.html",
    isi: `Menampilkan hasil psikogram lengkap satu peserta.
**API:** db_psikogram1
**Tabel:** dinamis dari ?tabel= (default: rekap_nilai1)
**Parameter URL:** ?id_x=&x_01=&tabel=
**Kolom:**
  x_01=kode | x_02=biodata | x_03=kemampuan
  x_04=kepribadian | x_05=sikap | x_06=IQ
  x_07=kekuatan | x_08=kelemahan | x_09=rekomendasi
  x_10=minat | x_11=tanggal transfer
**Fitur:** edit via popup modal, download PDF`
  },

  "index_transfer": {
    judul: "Halaman Transfer Data — index_transfer.html",
    isi: `Transfer data psikotes dari lidan_co_id ke psikogram_db.
**Sumber:** contacts_filter_dinamis6 → nilai1 (lidan_co_id)
**Tujuan:** db_psikogram1 → rekap_nilai1 (psikogram_db)
**Engine:** butuh psikogram-engine.js di folder yang sama
**Proses:** ambil → mapping x_01–x_11 → cek duplikat → POST/PUT`
  },

  "index_transfer_psikogram": {
    judul: "Halaman Transfer — index_transfer_psikogram.html",
    isi: `Versi transfer lintas database.
**Sumber GET:** contacts_filter_dinamis6 (lidan_co_id)
**Tujuan POST/PUT:** db_psikogram1 (psikogram_db)
**Butuh:** psikogram-engine.js di folder yang sama`
  },

  // ════════════════════════════════
  // CATATAN SISTEM
  // ════════════════════════════════

  "cloudflare_bindings": {
    judul: "Daftar Bindings Cloudflare Pages — lidan-co-id",
    isi: `Binding D1 aktif di project lidan-co-id:
**DB_LIDAN_CO_ID** → lidan_co_id
**DB_PSIKOGRAM**   → psikogram_db
**DB_GBKP**        → gbkp_db
**DB1**            → db1

Tambah binding baru:
Settings → Bindings → +Add → D1 → isi nama → Save → Retry deployment`
  },

  "cara_buat_api_baru": {
    judul: "Panduan: Cara Buat API Database Baru",
    isi: `1. Buat database D1 (nama huruf kecil, contoh: mydb)
2. Tambah binding di Pages Settings (huruf besar, contoh: DB_MYDB)
3. Retry deployment setelah Save
4. Duplikat db_gbkp1.js → ganti nama → ubah CONFIG:
   DB_BINDING: 'DB_MYDB'
   DB_NAME: 'mydb'
5. Upload ke functions/api/ → push → deploy
6. API aktif di: /api/nama_file`
  },

  "sistem_catatan": {
    judul: "Sistem Catatan — cara kerja & update",
    isi: `Dua file yang digunakan:
**catatan-engine.js** → engine tombol & popup (tidak perlu diubah)
**catatan.js** → isi semua catatan (HANYA INI yang diedit saat update)

Cara tambah catatan baru di catatan.js:
  "nama_key": {
    judul: "Judul catatan",
    isi: \`Isi catatan...
**Bold:** gunakan **teks**\`
  },

URL: cipta.my.id/catatan/`
  },

};
// xx