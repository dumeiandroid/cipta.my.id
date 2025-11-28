// js/script7.js

// Konstanta untuk nama tabel saat ini, default ke 'data_latihan'
let tabelSaatIni = 'data_latihan';
// Konstanta untuk jumlah bidang x_ (x_01, x_02, dst.)
const jumlahBidangX = 20; // Tetap 20 kolom
// Variabel untuk menyimpan ID data yang akan dihapus
let idDataUntukDihapus = null;

// Referensi ke instance modal Bootstrap
let instanceModalTambah;
let instanceModalEdit;
let instanceModalKonfirmasiHapus;

// Fungsi yang dijalankan ketika DOM sudah sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi instance modal Bootstrap
    instanceModalTambah = new bootstrap.Modal(document.getElementById('modalTambah'));
    instanceModalEdit = new bootstrap.Modal(document.getElementById('modalEdit'));
    instanceModalKonfirmasiHapus = new bootstrap.Modal(document.getElementById('modalKonfirmasiHapus'));

    // Dapatkan nama tabel dari parameter URL
    const parameterUrl = new URLSearchParams(window.location.search);
    tabelSaatIni = parameterUrl.get('tabel') || 'data_latihan';
    document.getElementById('namaTabel').textContent = tabelSaatIni;

    // Buat header kolom X secara dinamis
    buatHeaderTabelDinamis();

    // Buat bidang formulir untuk modal Tambah dan Edit secara dinamis
    buatBidangFormulir('bidangFormTambah', 'tambah');
    buatBidangFormulir('bidangFormEdit', 'edit');

    // Muat data saat halaman pertama kali dimuat (dengan filter)
    muatData();

    // Event listener untuk tombol Simpan Data
    const btnSimpanData = document.getElementById('btnSimpanData');
    if (btnSimpanData) {
        btnSimpanData.addEventListener('click', simpanData);
    }

    // Event listener untuk tombol Perbarui Data
    const btnPerbaruiData = document.getElementById('btnPerbaruiData');
    if (btnPerbaruiData) {
        btnPerbaruiData.addEventListener('click', perbaruiData);
    }

    // Event listener untuk tombol konfirmasi hapus di modal
    const btnHapusKonfirmasi = document.getElementById('btnHapusKonfirmasi');
    if (btnHapusKonfirmasi) {
        btnHapusKonfirmasi.addEventListener('click', function() {
            if (idDataUntukDihapus !== null) {
                hapusDataKonfirmasi(idDataUntukDihapus);
            }
        });
    }
});

/**
 * Fungsi untuk membuat header kolom X secara dinamis pada tabel.
 * Menambahkan `<th>` untuk setiap bidang x_01 hingga x_20.
 */
function buatHeaderTabelDinamis() {
    const headerTabel = document.getElementById('headerTabel');
    let headerHtml = '<th width="50">ID</th>'; // Awal dengan ID
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`; // Format x_01, x_02, dst.
        headerHtml += `<th>${namaX}</th>`;
    }
    headerHtml += '<th width="120">Aksi</th>'; // Tambah kolom Aksi
    if (headerTabel) {
        headerTabel.innerHTML = headerHtml; // Sisipkan ke thead
    }
}

/**
 * Fungsi untuk membuat bidang formulir secara dinamis untuk modal tambah atau edit.
 * @param {string} idKontainer - ID elemen DOM tempat bidang formulir akan disisipkan.
 * @param {string} tipeForm - Tipe formulir ('tambah' atau 'edit').
 */
function buatBidangFormulir(idKontainer, tipeForm) {
    const kontainer = document.getElementById(idKontainer);
    if (!kontainer) return;

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
    kontainer.innerHTML = bidangHtml; // Sisipkan ke kontainer yang ditentukan
}

/**
 * Fungsi asinkron untuk memuat data dari API contacts_filter (dengan filter id_x < 10)
 * dan menampilkannya di tabel.
 */
async function muatData() {
    const badanTabel = document.getElementById('badanTabel');
    if (!badanTabel) return;

    // Tampilkan indikator loading saat memuat data
    badanTabel.innerHTML = `<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4"><i class="fas fa-spinner fa-spin me-2"></i>Memuat data...</td></tr>`;

    try {
        // Panggil API contacts_filter dengan parameter id_x_less_than=10
        const respon = await fetch(`https://lidan-co-id.pages.dev/api/contacts_filter?table=${tabelSaatIni}&id_x_less_than=10`, {
            method: 'GET',
            headers: {
                'X-Table-Name': tabelSaatIni // Pastikan header ini juga dikirim
            }
        });

        // Periksa jika respons bukan OK (misalnya, status 4xx atau 5xx)
        if (!respon.ok) {
            throw new Error(`HTTP error! Status: ${respon.status}`);
        }

        const data = await respon.json(); // Parse respons JSON

        let htmlIsiTabel = '';
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            data.data.forEach(item => {
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
            htmlIsiTabel = `<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4 text-muted">Tidak ada data (Filter: id_x &lt; 10)</td></tr>`;
        }
        badanTabel.innerHTML = htmlIsiTabel;
    } catch (error) {
        console.error("Error memuat data dengan filter:", error);
        badanTabel.innerHTML = `<tr><td colspan="${jumlahBidangX + 2}" class="text-center py-4 text-danger">Error memuat data dengan filter!</td></tr>`;
    }
}

/**
 * Fungsi asinkron untuk menyimpan data baru ke API menggunakan Fetch API.
 * CATATAN: Fungsi ini masih memanggil API 'contacts' standar (bukan filter)
 * karena ini adalah operasi pembuatan data, bukan pemfilteran tampilan.
 */
async function simpanData() {
    const dataFormulir = {};
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
        const inputElement = document.getElementById(`tambah-${namaX}`);
        if (inputElement) {
            dataFormulir[namaX] = inputElement.value || '';
        }
    }

    try {
        const respon = await fetch(`https://lidan-co-id.pages.dev/api/contacts?table=${tabelSaatIni}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Table-Name': tabelSaatIni
            },
            body: JSON.stringify(dataFormulir)
        });

        if (!respon.ok) {
            throw new Error(`HTTP error! Status: ${respon.status}`);
        }

        instanceModalTambah.hide(); // Sembunyikan modal tambah
        document.getElementById('formTambah').reset(); // Reset formulir
        await muatData(); // Pastikan data dimuat ulang (dengan filter yang aktif) setelah operasi selesai
        tampilkanPeringatan('Data berhasil ditambahkan!', 'success');
    } catch (error) {
        console.error("Error menyimpan data:", error);
        tampilkanPeringatan('Error menambah data!', 'danger');
    }
}

/**
 * Fungsi asinkron untuk menampilkan modal edit dan memuat data yang akan diedit menggunakan Fetch API.
 * CATATAN: Fungsi ini masih memanggil API 'contacts' standar (dengan ID)
 * karena ini adalah operasi pengambilan data spesifik untuk diedit.
 * @param {number} id - ID data yang akan diedit.
 */
async function tampilkanModalEdit(id) {
    try {
        const respon = await fetch(`https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`, {
            method: 'GET',
            headers: {
                'X-Table-Name': tabelSaatIni
            }
        });

        if (!respon.ok) {
            throw new Error(`HTTP error! Status: ${respon.status}`);
        }

        const data = await respon.json();

        if (data.data) {
            document.getElementById('editId').value = data.data.id_x;
            for (let i = 1; i <= jumlahBidangX; i++) {
                const namaX = `x_${i < 10 ? '0' : ''}${i}`;
                const inputElement = document.getElementById(`edit-${namaX}`);
                if (inputElement) {
                    inputElement.value = data.data[namaX] || '';
                }
            }
            instanceModalEdit.show(); // Tampilkan modal edit
        } else {
            tampilkanPeringatan('Data tidak ditemukan!', 'warning');
        }
    } catch (error) {
        console.error("Error memuat data untuk diedit:", error);
        tampilkanPeringatan('Error memuat data untuk diedit!', 'danger');
    }
}

/**
 * Fungsi asinkron untuk memperbarui data yang sudah ada melalui API menggunakan Fetch API.
 * CATATAN: Fungsi ini masih memanggil API 'contacts' standar (dengan ID)
 * karena ini adalah operasi pembaruan data spesifik.
 */
async function perbaruiData() {
    const idInput = document.getElementById('editId');
    const id = idInput ? idInput.value : '';
    const dataFormulir = {};
    for (let i = 1; i <= jumlahBidangX; i++) {
        const namaX = `x_${i < 10 ? '0' : ''}${i}`;
        const inputElement = document.getElementById(`edit-${namaX}`);
        if (inputElement) {
            dataFormulir[namaX] = inputElement.value || '';
        }
    }

    try {
        const respon = await fetch(`https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Table-Name': tabelSaatIni
            },
            body: JSON.stringify(dataFormulir)
        });

        if (!respon.ok) {
            throw new Error(`HTTP error! Status: ${respon.status}`);
        }

        instanceModalEdit.hide(); // Sembunyikan modal edit
        await muatData(); // Pastikan data dimuat ulang (dengan filter yang aktif) setelah operasi selesai
        tampilkanPeringatan('Data berhasil diupdate!', 'success');
    } catch (error) {
        console.error("Error update data:", error);
        tampilkanPeringatan('Error update data!', 'danger');
    }
}

/**
 * Fungsi untuk menampilkan modal konfirmasi sebelum menghapus data.
 * @param {number} id - ID data yang akan dihapus.
 */
function tampilkanModalKonfirmasiHapus(id) {
    idDataUntukDihapus = id;
    instanceModalKonfirmasiHapus.show(); // Tampilkan modal konfirmasi
}

/**
 * Fungsi asinkron untuk menghapus data dari API setelah konfirmasi menggunakan Fetch API.
 * CATATAN: Fungsi ini masih memanggil API 'contacts' standar (dengan ID)
 * karena ini adalah operasi penghapusan data spesifik.
 * @param {number} id - ID data yang akan dihapus.
 */
async function hapusDataKonfirmasi(id) {
    try {
        const respon = await fetch(`https://lidan-co-id.pages.dev/api/contacts/${id}?table=${tabelSaatIni}`, {
            method: 'DELETE',
            headers: {
                'X-Table-Name': tabelSaatIni
            }
        });

        if (!respon.ok) {
            throw new Error(`HTTP error! Status: ${respon.status}`);
        }

        instanceModalKonfirmasiHapus.hide(); // Sembunyikan modal konfirmasi
        await muatData(); // Pastikan data dimuat ulang (dengan filter yang aktif) setelah operasi selesai
        tampilkanPeringatan('Data berhasil dihapus!', 'success');
        idDataUntukDihapus = null;
    } catch (error) {
        console.error("Error hapus data:", error);
        tampilkanPeringatan('Error hapus data!', 'danger');
    }
}

/**
 * Fungsi untuk menampilkan peringatan (alert) di pojok kanan atas layar.
 * @param {string} pesan - Pesan yang akan ditampilkan.
 * @param {string} tipe - Tipe peringatan (e.g., 'success', 'danger', 'warning', 'info').
 */
function tampilkanPeringatan(pesan, tipe) {
    const divPeringatan = document.createElement('div');
    divPeringatan.className = `alert alert-${tipe} alert-dismissible fade show position-fixed`;
    divPeringatan.style.top = '20px';
    divPeringatan.style.right = '20px';
    divPeringatan.style.zIndex = '9999';
    divPeringatan.innerHTML = `
        ${pesan}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(divPeringatan);

    // Hapus peringatan setelah 3 detik
    setTimeout(() => {
        const bootstrapAlert = bootstrap.Alert.getInstance(divPeringatan);
        if (bootstrapAlert) {
            bootstrapAlert.close();
        } else {
            // Fallback jika instance tidak ditemukan (misal, sudah dihapus manual)
            divPeringatan.remove();
        }
    }, 3000);
}
