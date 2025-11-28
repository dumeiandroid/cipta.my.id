// =======================================================
// Konversi dari file wwq.php
// =======================================================

// Asumsikan variabel 'score_total_wwq' sudah ada dan berisi nilai skor.
// Contoh: const score_total_wwq = 150;
let score_total_wwq;

/**
 * Menentukan kategori berdasarkan skor total WWQ.
 * @param {number} score_total - Skor total dari tes WWQ.
 * @returns {string} Nama kategori.
 */
function getKategoriWWQ(score_total) {
    let kategori;
    if (score_total < 120) {
        kategori = "Normal";
    } else if (score_total <= 180) {
        kategori = "Kecenderungan Gangguan";
    } else {
        kategori = "Gangguan";
    }
    return kategori;
}

// Menampilkan hasil kategori (contoh penggunaan)
// console.log(`Score Total: ${score_total_wwq}`);
// console.log(`Kategori: ${getKategoriWWQ(score_total_wwq)}`);
