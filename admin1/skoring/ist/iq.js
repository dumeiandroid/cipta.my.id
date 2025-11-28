/**
 * Mengonversi nilai SW (Skalenwert) menjadi nilai IQ.
 * @param {number} sw - Nilai Skalenwert.
 * @returns {number | string} Nilai IQ yang sesuai atau pesan error.
 */
function getIQ(sw) {
    // Peta pasangan SW dan IQ
    const sw_iq_map = {
        140: 160, 138: 157, 136: 154, 134: 151, 132: 145,
        129: 143, 128: 142, 127: 140, 126: 139, 125: 137,
        124: 136, 123: 134, 122: 133, 121: 131, 120: 130,
        119: 128, 118: 127, 117: 125, 116: 124, 115: 122,
        114: 121, 113: 120, 112: 118, 111: 116, 110: 115,
        109: 113, 108: 112, 107: 110, 106: 109, 105: 107,
        104: 106, 103: 104, 102: 103, 101: 101, 100: 100,
        99: 98, 98: 97, 97: 96, 96: 94, 95: 92,
        94: 91, 93: 90, 92: 88, 91: 87, 90: 85,
        89: 84, 88: 82, 87: 81, 86: 78, 85: 78,
        84: 76, 83: 75, 82: 73, 81: 71, 80: 70,
        79: 68, 78: 67, 77: 66, 76: 64, 75: 62,
        74: 61, 73: 59, 72: 58, 70: 55, 68: 52,
        64: 46, 62: 43, 60: 40, 58: 37
    };

    // Memeriksa apakah nilai SW ada dalam peta
    return sw_iq_map[sw] ?? "Nilai SW tidak ditemukan dalam tabel.";
}

// Contoh penggunaan fungsi
// const sw = 140; // Ubah nilai SW sesuai keinginan
// console.log(`Nilai IQ untuk SW ${sw} adalah: ${getIQ(sw)}`);
