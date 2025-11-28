// js/script5.js

// Konstanta untuk nama tabel saat ini, default ke 'data_latihan'
let tabelSaatIni = 'data_latihan';
// Konstanta untuk jumlah bidang x_ (x_01, x_02, dst.)
const jumlahBidangX = 20; // Kembali ke 20 kolom
// Variabel untuk menyimpan ID data yang akan dihapus
let idDataUntukDihapus = null;

$(document).ready(function() {
    // Dapatkan nama tabel dari parameter URL
    const parameterUrl = new URLSearchParams(window.location.search);
    tabelSaatIni = parameterUrl.get('tabel') || 'data_latihan';
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
    // Kolspan disesuaikan: jumlahBidangX (20) + ID (1) + Aksi (1) = 22
    $('#badanTabel').html(`<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4"><i class="fas fa-spinner fa-spin me-2"></i>Memuat data...</td></tr>`);

    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts?table=${tabelSaatIni}`,
        method: 'GET',
        headers: {
            'X-Table-Name': tabelSaatIni
        },
        success: function(respon) {
            let htmlIsiTabel = '';
            if (respon.data && Array.isArray(respon.data) && respon.data.length > 0) {
                respon.data.forEach(item => {
                    htmlIsiTabel += `<tr><td>${item.id_x}</td>`;
                    for (let i = 1; i <= jumlahBidangX; i++) {
                        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
                        htmlIsiTabel += `<td>${item[namaX] || ''}</td>`;
                    }
                    htmlIsiTabel += `
                        <td>
                            <button class="btn btn-warning btn-sm me-1" onclick="tampilkanModalEdit(${item.id_x})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm" onclick="tampilkanModalKonfirmasiHapus(${item.id_x})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
                });
            } else {
                htmlIsiTabel = `<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4 text-muted">Tidak ada data</td></tr>`;
            }
            $('#badanTabel').html(htmlIsiTabel);
        },
        error: function(xhr, status, error) {
            console.error("Error memuat data:", status, error, xhr);
            $('#badanTabel').html(`<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4 text-danger">Error memuat data!</td></tr>`);
        }
    });
}

/**
 * Fungsi untuk menyimpan data baru ke API.
 */
function simpanData() {
    const dataFormulir = {};
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
        dataFormulir[namaX] = $(`#formTambah input[name="${namaX}"]`).val() || '';
    }

    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts?table=${tabelSaatIni}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Table-Name': tabelSaatIni
        },
        data: JSON.stringify(dataFormulir),
        success: function() {
            $('#modalTambah').modal('hide');
            $('#formTambah')[0].reset();
            muatData();
            tampilkanPeringatan('Data berhasil ditambahkan!', 'success');
        },
        error: function(xhr, status, error) {
            console.error("Error menyimpan data:", status, error, xhr);
            tampilkanPeringatan('Error menambah data!', 'danger');
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
            'X-Table-Name': tabelSaatIni
        },
        success: function(respon) {
            if (respon.data) {
                $('#editId').val(respon.data.id_x);
                for (let i = 1; i <= jumlahBidangX; i++) {
                    const namaX = `x_${i < 10 ? '0' : ''}${i}`;
                    $(`#formEdit input[name="${namaX}"]`).val(respon.data[namaX] || '');
                }
                $('#modalEdit').modal('show');
            } else {
                tampilkanPeringatan('Data tidak ditemukan!', 'warning');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error memuat data untuk diedit:", status, error, xhr);
            tampilkanPeringatan('Error memuat data untuk diedit!', 'danger');
        }
    });
}

/**
 * Fungsi untuk memperbarui data yang sudah ada melalui API.
 */
function perbaruiData() {
    const id = $('#editId').val();
    const dataFormulir = {};
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
        dataFormulir[namaX] = $(`#formEdit input[name="${namaX}"]`).val() || '';
    }

    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Table-Name': tabelSaatIni
        },
        data: JSON.stringify(dataFormulir),
        success: function() {
            $('#modalEdit').modal('hide');
            muatData();
            tampilkanPeringatan('Data berhasil diupdate!', 'success');
        },
        error: function(xhr, status, error) {
            console.error("Error update data:", status, error, xhr);
            tampilkanPeringatan('Error update data!', 'danger');
        }
    });
}

/**
 * Fungsi untuk menampilkan modal konfirmasi sebelum menghapus data.
 * @param {number} id - ID data yang akan dihapus.
 */
function tampilkanModalKonfirmasiHapus(id) {
    idDataUntukDihapus = id;
    $('#modalKonfirmasiHapus').modal('show');
}

/**
 * Fungsi untuk menghapus data dari API setelah konfirmasi.
 * @param {number} id - ID data yang akan dihapus.
 */
function hapusDataKonfirmasi(id) {
    $.ajax({
        url: `https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`,
        method: 'DELETE',
        headers: {
            'X-Table-Name': tabelSaatIni
        },
        success: function() {
            $('#modalKonfirmasiHapus').modal('hide');
            muatData();
            tampilkanPeringatan('Data berhasil dihapus!', 'success');
            idDataUntukDihapus = null;
        },
        error: function(xhr, status, error) {
            console.error("Error hapus data:", status, error, xhr);
            tampilkanPeringatan('Error hapus data!', 'danger');
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
    $('body').append(htmlPeringatan);
    // Hapus peringatan setelah 3 detik
    setTimeout(() => {
        $('.alert').alert('close');
    }, 3000);
}
