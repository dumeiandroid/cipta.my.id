// =======================================================
// Konversi dari file apm.php
// =======================================================

/**
 * Menentukan SS dan Keterangan IQ berdasarkan skor total APM.
 * @param {number} skorTotal_apm - Skor total dari tes APM.
 * @returns {Array} Sebuah array yang berisi SS dan Keterangan IQ.
 */
function getSSandKeteranganIQ(skorTotal_apm) {
    // Definisi tabel SS dan Keterangan IQ
    const iqTable = {
        '>36': [20, 'Baik Sekali'],
        '35-36': [19, 'Baik Sekali'],
        '33-34': [18, 'Baik Sekali'],
        '31-32': [17, 'Baik Sekali'],
        '29-30': [16, 'Baik'],
        '26-28': [15, 'Baik'],
        '24-25': [14, 'Baik'],
        '22-23': [13, 'Baik'],
        '19-21': [12, 'Cukup'],
        '17-18': [11, 'Cukup'],
        '15-16': [10, 'Cukup'],
        '13-14': [9, 'Cukup'],
        '10-12': [8, 'Kurang'],
        '8-9': [7, 'Kurang'],
        '6-7': [6, 'Kurang'],
        '4-5': [5, 'Kurang'],
        '1-3': [4, 'Kurang Sekali'],
        '0': [3, 'Kurang Sekali'],
        '0_1': [2, 'Kurang Sekali'], // Penambahan nilai jika skor di bawah 0 (misalnya -1)
        '0_0': [1, 'Kurang Sekali'] // Penambahan nilai jika skor di bawah -1 (misalnya -2)
    };

    // Menentukan SS dan Keterangan IQ berdasarkan skor total
    if (skorTotal_apm > 36) {
        return iqTable['>36'];
    } else if (skorTotal_apm >= 35 && skorTotal_apm <= 36) {
        return iqTable['35-36'];
    } else if (skorTotal_apm >= 33 && skorTotal_apm <= 34) {
        return iqTable['33-34'];
    } else if (skorTotal_apm >= 31 && skorTotal_apm <= 32) {
        return iqTable['31-32'];
    } else if (skorTotal_apm >= 29 && skorTotal_apm <= 30) {
        return iqTable['29-30'];
    } else if (skorTotal_apm >= 26 && skorTotal_apm <= 28) {
        return iqTable['26-28'];
    } else if (skorTotal_apm >= 24 && skorTotal_apm <= 25) {
        return iqTable['24-25'];
    } else if (skorTotal_apm >= 22 && skorTotal_apm <= 23) {
        return iqTable['22-23'];
    } else if (skorTotal_apm >= 19 && skorTotal_apm <= 21) {
        return iqTable['19-21'];
    } else if (skorTotal_apm >= 17 && skorTotal_apm <= 18) {
        return iqTable['17-18'];
    } else if (skorTotal_apm >= 15 && skorTotal_apm <= 16) {
        return iqTable['15-16'];
    } else if (skorTotal_apm >= 13 && skorTotal_apm <= 14) {
        return iqTable['13-14'];
    } else if (skorTotal_apm >= 10 && skorTotal_apm <= 12) {
        return iqTable['10-12'];
    } else if (skorTotal_apm >= 8 && skorTotal_apm <= 9) {
        return iqTable['8-9'];
    } else if (skorTotal_apm >= 6 && skorTotal_apm <= 7) {
        return iqTable['6-7'];
    } else if (skorTotal_apm >= 4 && skorTotal_apm <= 5) {
        return iqTable['4-5'];
    } else if (skorTotal_apm >= 1 && skorTotal_apm <= 3) {
        return iqTable['1-3'];
    } else if (skorTotal_apm === 0) {
        return iqTable['0'];
    } else if (skorTotal_apm < 0) {
        return iqTable['0_1']; // Mengasumsikan skor negatif akan masuk ke kategori ini
    }
}
