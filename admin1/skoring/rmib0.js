// =======================================================
// Konversi dari file rmib0.php
// =======================================================

// Asumsikan variabel 'soal_rmib' sudah ada dan berisi array jawaban.
// Contoh: const soal_rmib = ['1', '0', '1', ...];
let soal_rmib;

/**
 * Menghitung skor total dari soal-soal RMIB yang ditentukan.
 * @param {Array<number>} indices - Array berisi indeks soal (1-based).
 * @returns {number} Skor total.
 */
const getRmibScore = (indices) => {
    return indices.reduce((sum, index) => {
        // Mengkonversi ke integer setelah menghilangkan spasi
        return sum + parseInt(String(soal_rmib[index - 1]).trim());
    }, 0);
};

// Definisi skor untuk setiap kategori
const out = getRmibScore([1, 24, 35, 46, 57, 68, 79, 90]);
const mech = getRmibScore([2, 13, 36, 47, 58, 69, 80, 91]);
const comp = getRmibScore([3, 14, 25, 48, 59, 70, 81, 92]);
const sci = getRmibScore([4, 15, 26, 37, 60, 71, 82, 93]);
const pers = getRmibScore([5, 16, 27, 38, 49, 72, 83, 94]);
const lit = getRmibScore([
  6, 17, 28, 39, 50, 61, 84, 95
]);
// ...dan seterusnya untuk semua kategori yang ada di file rmib0.php
