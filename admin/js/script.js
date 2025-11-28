// js/script.js

// Konstanta untuk nama tabel saat ini, default ke 'data_latihan'
let tabelSaatIni = 'data_latihan';
// Konstanta untuk jumlah bidang x_ (x_01, x_02, dst.)
const jumlahBidangX = 20;
// Variabel untuk menyimpan ID data yang akan dihapus
let idDataUntukDihapus = null;

$(document).ready(function() {
    // Dapatkan nama tabel dari parameter URL
    // Contoh: ?tabel=nama_tabel_anda
    const parameterUrl = new URLSearchParams(window.location.search);
    tabelSaatIni = parameterUrl.get('tabel') || 'data_latihan';
    // Perbarui teks di elemen dengan id 'namaTabel'
    $('#namaTabel').text(tabelSaatIni);

    // Buat header kolom X secara dinamis
    buatHeaderTabelDinamis();

    // Buat bidang formulir untuk modal Tambah dan Edit secara dinamis
    buatBidangFormulir('bidangFormTambah', 'tambah');
    buatBidangFormulir('bidangFormEdit', 'edit');

    // Muat data saat halaman pertama kali dimuat
    muatData();

    // Event listener untuk tombol konfirmasi hapus di modal
    $('#btnHapusKonfirmasi').on('click', function() {
        if (idDataUntukDihapus !== null) {
            hapusDataKonfirmasi(idDataUntukDihapus);
        }
    });
});

/**
 * Fungsi untuk membuat header kolom X secara dinamis pada tabel.
 * Menambahkan `<th>` untuk setiap bidang x_01 hingga x_20.
 */
function buatHeaderTabelDinamis() {
    let headerHtml = '<th width="50">ID</th>'; // Awal dengan ID
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`; // Format x_01, x_02, dst.
        headerHtml += `<th>${namaX}</th>`;
    }
    headerHtml += '<th width="120">Aksi</th>'; // Tambah kolom Aksi
    $('#headerTabel').html(headerHtml); // Sisipkan ke thead
}

/**
 * Fungsi untuk membuat bidang formulir secara dinamis untuk modal tambah atau edit.
 * @param {string} idKontainer - ID elemen DOM tempat bidang formulir akan disisipkan.
 * @param {string} tipeForm - Tipe formulir ('tambah' atau 'edit').
 */
function buatBidangFormulir(idKontainer, tipeForm) {
    let bidangHtml = '';
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`; // Format x_01, x_02, dst.
        bidangHtml += `
            <div class="col-md-4">
                <label for="${tipeForm}-${namaX}" class="form-label">${namaX}</label>
                <input type="text" id="${tipeForm}-${namaX}" name="${namaX}" class="form-control form-control-sm">
            </div>
        `;
    }
    $(`#${idKontainer}`).html(bidangHtml); // Sisipkan ke kontainer yang ditentukan
}

/**
 * Fungsi untuk memuat data dari API dan menampilkannya di tabel.
 */
function muatData() {
    // Tampilkan indikator loading saat memuat data
    $('#badanTabel').html(`<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4"><i class="fas fa-spinner fa-spin me-2"></i>Memuat data...</td></tr>`);

    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts?table=${tabelSaatIni}`,
        method: 'GET',
        headers: {
            'X-Table-Name': tabelSaatIni // Kirim nama tabel sebagai header kustom
        },
        success: function(respon) {
            let htmlIsiTabel = '';
            // Periksa apakah ada data dan data tersebut adalah array yang tidak kosong
            if (respon.data && Array.isArray(respon.data) && respon.data.length > 0) {
                respon.data.forEach(item => {
                    htmlIsiTabel += `<tr><td>${item.id_x}</td>`; // Kolom ID
                    for (let i = 1; i <= jumlahBidangX; i++) {
                        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
                        htmlIsiTabel += `<td>${item[namaX] || ''}</td>`; // Kolom data X, jika tidak ada tampilkan string kosong
                    }
                    htmlIsiTabel += `
                        <td>
                            <!-- Tombol edit dan hapus untuk setiap baris data -->
                            <button class="btn btn-warning btn-sm me-1" onclick="tampilkanModalEdit(${item.id_x})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm" onclick="tampilkanModalKonfirmasiHapus(${item.id_x})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
                });
            } else {
                // Tampilkan pesan jika tidak ada data
                htmlIsiTabel = `<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4 text-muted">Tidak ada data</td></tr>`;
            }
            $('#badanTabel').html(htmlIsiTabel); // Perbarui isi tabel
        },
        error: function(xhr, status, error) {
            console.error("Error memuat data:", status, error, xhr);
            // Tampilkan pesan error jika gagal memuat data
            $('#badanTabel').html(`<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4 text-danger">Error memuat data!</td></tr>`);
        }
    });
}

/**
 * Fungsi untuk menyimpan data baru ke API.
 */
function simpanData() {
    const dataFormulir = {};
    // Ambil nilai dari setiap bidang formulir x_
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
        dataFormulir[namaX] = $(`#formTambah input[name="${namaX}"]`).val() || ''; // Ambil nilai atau string kosong
    }

    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts?table=${tabelSaatIni}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Tentukan tipe konten JSON
            'X-Table-Name': tabelSaatIni // Kirim nama tabel sebagai header kustom
        },
        data: JSON.stringify(dataFormulir), // Kirim data dalam format JSON
        success: function() {
            $('#modalTambah').modal('hide'); // Sembunyikan modal tambah
            $('#formTambah')[0].reset();    // Reset formulir
            muatData();                     // Muat ulang data tabel
            tampilkanPeringatan('Data berhasil ditambahkan!', 'success'); // Tampilkan pesan sukses
        },
        error: function(xhr, status, error) {
            console.error("Error menyimpan data:", status, error, xhr);
            tampilkanPeringatan('Error menambah data!', 'danger'); // Tampilkan pesan error
        }
    });
}

/**
 * Fungsi untuk menampilkan modal edit dan memuat data yang akan diedit.
 * @param {number} id - ID data yang akan diedit.
 */
function tampilkanModalEdit(id) {
    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`,
        method: 'GET',
        headers: {
            'X-Table-Name': tabelSaatIni // Kirim nama tabel sebagai header kustom
        },
        success: function(respon) {
            if (respon.data) {
                $('#editId').val(respon.data.id_x); // Set ID data di input hidden
                // Isi setiap bidang formulir edit dengan data yang diterima
                for (let i = 1; i <= jumlahBidangX; i++) {
                    const namaX = `x_${i < 10 ? '0' : ''}${i}`;
                    $(`#formEdit input[name="${namaX}"]`).val(respon.data[namaX] || '');
                }
                $('#modalEdit').modal('show'); // Tampilkan modal edit
            } else {
                tampilkanPeringatan('Data tidak ditemukan!', 'warning');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error memuat data untuk diedit:", status, error, xhr);
            tampilkanPeringatan('Error memuat data untuk diedit!', 'danger'); // Tampilkan pesan error
        }
    });
}

/**
 * Fungsi untuk memperbarui data yang sudah ada melalui API.
 */
function perbaruiData() {
    const id = $('#editId').val(); // Dapatkan ID dari input hidden
    const dataFormulir = {};
    // Ambil nilai dari setiap bidang formulir x_
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
        dataFormulir[namaX] = $(`#formEdit input[name="${namaX}"]`).val() || ''; // Ambil nilai atau string kosong
    }

    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`,
        method: 'PUT', // Gunakan metode PUT untuk update
        headers: {
            'Content-Type': 'application/json', // Tentukan tipe konten JSON
            'X-Table-Name': tabelSaatIni // Kirim nama tabel sebagai header kustom
        },
        data: JSON.stringify(dataFormulir), // Kirim data dalam format JSON
        success: function() {
            $('#modalEdit').modal('hide'); // Sembunyikan modal edit
            muatData();                     // Muat ulang data tabel
            tampilkanPeringatan('Data berhasil diupdate!', 'success'); // Tampilkan pesan sukses
        },
        error: function(xhr, status, error) {
            console.error("Error update data:", status, error, xhr);
            tampilkanPeringatan('Error update data!', 'danger'); // Tampilkan pesan error
        }
    });
}

/**
 * Fungsi untuk menampilkan modal konfirmasi sebelum menghapus data.
 * @param {number} id - ID data yang akan dihapus.
 */
function tampilkanModalKonfirmasiHapus(id) {
    idDataUntukDihapus = id; // Simpan ID data yang akan dihapus
    $('#modalKonfirmasiHapus').modal('show'); // Tampilkan modal konfirmasi
}

/**
 * Fungsi untuk menghapus data dari API setelah konfirmasi.
 * @param {number} id - ID data yang akan dihapus.
 */
function hapusDataKonfirmasi(id) {
    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`,
        method: 'DELETE', // Gunakan metode DELETE untuk hapus
        headers: {
            'X-Table-Name': tabelSaatIni // Kirim nama tabel sebagai header kustom
        },
        success: function() {
            $('#modalKonfirmasiHapus').modal('hide'); // Sembunyikan modal konfirmasi
            muatData();                               // Muat ulang data tabel
            tampilkanPeringatan('Data berhasil dihapus!', 'success'); // Tampilkan pesan sukses
            idDataUntukDihapus = null;                // Reset ID data untuk dihapus
        },
        error: function(xhr, status, error) {
            console.error("Error hapus data:", status, error, xhr);
            tampilkanPeringatan('Error hapus data!', 'danger'); // Tampilkan pesan error
        }
    });
}

/**
 * Fungsi untuk menampilkan peringatan (alert) di pojok kanan atas layar.
 * @param {string} pesan - Pesan yang akan ditampilkan.
 * @param {string} tipe - Tipe peringatan (e.g., 'success', 'danger', 'warning', 'info').
 */
function tampilkanPeringatan(pesan, tipe) {
    const htmlPeringatan = `
        <div class="alert alert-${tipe} alert-dismissible fade show position-fixed" style="top:20px;right:20px;z-index:9999">
            ${pesan}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    $('body').append(htmlPeringatan); // Tambahkan peringatan ke body
    // Hapus peringatan setelah 3 detik
    setTimeout(() => {
        $('.alert').alert('close');
    }, 3000);
}
