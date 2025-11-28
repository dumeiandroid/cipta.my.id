// =======================================================
// Konversi dari file tkd6.php
// =======================================================

/**
 * Menentukan SS dan Keterangan IQ untuk TKD6 berdasarkan skor total.
 * @param {number} skorTotal_tkd6 - Skor total dari tes TKD6.
 * @returns {Array} Sebuah array yang berisi SS dan Keterangan IQ.
 */
function getSSandKeteranganIQ_tkd6(skorTotal_tkd6) {
    // Definisi tabel SS dan Keterangan IQ
    const iqTable = {
        30: [20, 'Baik Sekali'],
        29: [19, 'Baik Sekali'],
        '27-28': [18, 'Baik Sekali'],
        '25-26': [17, 'Baik Sekali'],
        24: [16, 'Baik'],
        '22-23': [15, 'Baik'],
        '20-21': [14, 'Baik'],
        '18-19': [13, 'Baik'],
        17: [12, 'Cukup'],
        '15-16': [11, 'Cukup'],
        '13-14': [10, 'Cukup'],
        12: [9, 'Cukup'],
        '10-11': [8, 'Kurang'],
        '8-9': [7, 'Kurang'],
        '6-7': [6, 'Kurang'],
        5: [5, 'Kurang'],
        '3-4': [4, 'Kurang sekali'],
        '1-2': [3, 'Kurang sekali'],
        0: [2, 'Kurang sekali'],
        '0_1': [1, 'Kurang sekali'],
        '0_0': [0, 'Kurang sekali']
    };

    // Menentukan SS dan Keterangan IQ berdasarkan skor total
    for (const key in iqTable) {
        if (Object.prototype.hasOwnProperty.call(iqTable, key)) {
            if (!isNaN(key)) {
                if (skorTotal_tkd6 === parseInt(key)) {
                    return iqTable[key];
                }
            } else if (key.includes('-')) {
                const [start, end] = key.split('-').map(Number);
                if (skorTotal_tkd6 >= start && skorTotal_tkd6 <= end) {
                    return iqTable[key];
                }
            } else if (key.includes('_')) {
                 // Menangani kasus khusus seperti '0_1' dan '0_0'
                 const [start, end] = key.split('_').map(Number);
                 if (skorTotal_tkd6 >= start && skorTotal_tkd6 <= end) {
                     return iqTable[key];
                 }
            }
        }
    }

    return null; // Mengembalikan null jika skor tidak ada di tabel
}
