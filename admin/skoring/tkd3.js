// =======================================================
// Konversi dari file tkd3.php
// =======================================================

/**
 * Menentukan SS dan Keterangan IQ untuk TKD3 berdasarkan skor total.
 * @param {number} skorTotal_tkd3 - Skor total dari tes TKD3.
 * @returns {Array} Sebuah array yang berisi SS dan Keterangan IQ.
 */
function getSSandKeteranganIQ_tkd3(skorTotal_tkd3) {
    // Definisi tabel SS dan Keterangan IQ
    const iqTable = {
        44: [20, 'Baik Sekali'],
        43: [19, 'Baik Sekali'],
        42: [18, 'Baik Sekali'],
        41: [17, 'Baik Sekali'],
        '39-40': [16, 'Baik'],
        38: [15, 'Baik'],
        '36-37': [14, 'Baik'],
        '34-35': [13, 'Baik'],
        '32-33': [12, 'Cukup'],
        '30-31': [11, 'Cukup'],
        '28-29': [10, 'Cukup'],
        '26-27': [9, 'Cukup'],
        '24-25': [8, 'Kurang'],
        23: [7, 'Kurang'],
        '21-22': [6, 'Kurang'],
        '19-20': [5, 'Kurang'],
        '17-18': [4, 'Kurang sekali'],
        '15-16': [3, 'Kurang sekali'],
        '13-14': [2, 'Kurang sekali'],
        '11-12': [1, 'Kurang sekali'],
        '0-10': [0, 'Kurang sekali'],
    };

    // Menentukan SS dan Keterangan IQ berdasarkan skor total
    for (const key in iqTable) {
        if (Object.prototype.hasOwnProperty.call(iqTable, key)) {
            if (!isNaN(key)) {
                if (skorTotal_tkd3 === parseInt(key)) {
                    return iqTable[key];
                }
            } else {
                const [start, end] = key.split('-').map(Number);
                if (skorTotal_tkd3 >= start && skorTotal_tkd3 <= end) {
                    return iqTable[key];
                }
            }
        }
    }

    return null; // Mengembalikan null jika skor tidak ada di tabel
}
