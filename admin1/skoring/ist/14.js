/**
 * Mengambil nilai SW dari pemetaan berdasarkan nilai RW.
 * @param {number | string} RW - Nilai Rohwert.
 * @param {object} mapping - Objek pemetaan untuk dikonsultasikan.
 * @returns {number | null} Nilai Skalenwert (SW) atau null jika tidak ditemukan.
 */
function getSW(RW, mapping) {
    // Menggunakan operator nullish coalescing (??) untuk mengembalikan nilai pemetaan atau null.
    return mapping[RW] ?? null;
}

// Contoh penggunaan
// const RW_SE = 17; // Atur variabel-variabel ini berdasarkan nilai RW yang diketahui
// const RW_WA = 17;
// const RW_AN = 16;
// const RW_GE = 17;
// const RW_ME = 18;
// const RW_RA = 17;
// const RW_ZR = 17;
// const RW_FA = 18;
// const RW_WU = 18;

// Objek-objek pemetaan (setara dengan array asosiatif PHP)
const SE_mapping = {
    17: 134, 16: 131, 15: 127, 14: 123, 13: 120, 12: 116, 11: 112,
    10: 109, 9: 105, 8: 101, 7: 97, 6: 94, 5: 90, 4: 86, 3: 83,
    2: 79, 1: 75, 0: 71
};

const WA_mapping = {
    17: 131, 16: 127, 15: 124, 14: 121, 13: 117, 12: 114, 11: 110,
    10: 106, 9: 103, 8: 99, 7: 96, 6: 92, 5: 89, 4: 85, 3: 81,
    2: 78, 1: 74, 0: 71
};

const AN_mapping = {
    16: 132, 15: 128, 14: 125, 13: 121, 12: 118, 11: 115, 10: 111,
    9: 108, 8: 104, 7: 101, 6: 97, 5: 94, 4: 90, 3: 87, 2: 83,
    1: 80, 0: 77
};

const GE_mapping = {
    17: 132, 16: 129, 15: 126, 14: 122, 13: 119, 12: 115, 11: 112,
    10: 108, 9: 105, 8: 101, 7: 97, 6: 94, 5: 91, 4: 88, 3: 84,
    2: 81, 1: 77, 0: 74
};

const ME_mapping = {
    18: 129, 17: 126, 16: 124, 15: 121, 14: 118, 13: 115, 12: 112,
    11: 109, 10: 106, 9: 103, 8: 100, 7: 97, 6: 94, 5: 91, 4: 88,
    3: 85, 2: 82, 1: 79, 0: 76
};

const RA_mapping = {
    17: 134, 16: 130, 15: 127, 14: 123, 13: 120, 12: 116, 11: 113,
    10: 109, 9: 105, 8: 102, 7: 98, 6: 95, 5: 91, 4: 88, 3: 84,
    2: 80, 1: 77, 0: 73
};

const ZR_mapping = {
    18: 131, 17: 129, 16: 125, 15: 123, 14: 120, 13: 117, 12: 114,
    11: 111, 10: 108, 9: 105, 8: 103, 7: 100, 6: 97, 5: 94, 4: 91,
    3: 88, 2: 85, 1: 83, 0: 80
};

const FA_mapping = {
    18: 131, 17: 128, 16: 125, 15: 121, 14: 118, 13: 115, 12: 112,
    11: 108, 10: 105, 9: 102, 8: 99, 7: 95, 6: 92, 5: 89, 4: 86,
    3: 83, 2: 79, 1: 76, 0: 73
};

const WU_mapping = {
    18: 133, 17: 130, 16: 126, 15: 123, 14: 119, 13: 116, 12: 112,
    11: 109, 10: 106, 9: 102, 8: 99, 7: 95, 6: 92, 5: 88, 4: 85,
    3: 81, 2: 78, 1: 74, 0: 71
};

const GESAMT_mapping = {
    '171-180': 138,
    '161-170': 133,
    '151-160': 129,
    '141-150': 125,
    '131-140': 120,
    '121-130': 116,
    '111-120': 112,
    '101-110': 107,
    '91-100': 103,
    '81-90': 99,
    '71-80': 94,
    '61-70': 90,
    '51-60': 86,
    '41-50': 82,
    '31-40': 77,
    '21-30': 73,
    '11-20': 68,
    '1-10': 63
};

// Deklarasikan variabel RW. Ini harus diatur ke nilai aktual sebelum digunakan.
let RW_SE, RW_WA, RW_AN, RW_GE, RW_ME, RW_RA, RW_ZR, RW_FA, RW_WU;

// Hitung nilai SW
const SW_SE = getSW(RW_SE, SE_mapping);
const SW_WA = getSW(RW_WA, WA_mapping);
const SW_AN = getSW(RW_AN, AN_mapping);
const SW_GE = getSW(RW_GE, GE_mapping);
const SW_ME = getSW(RW_ME, ME_mapping);
const SW_RA = getSW(RW_RA, RA_mapping);
const SW_ZR = getSW(RW_ZR, ZR_mapping);
const SW_FA = getSW(RW_FA, FA_mapping);
const SW_WU = getSW(RW_WU, WU_mapping);

// Cetak hasil ke konsol
console.log(`SW_SE: ${SW_SE}`);
console.log(`SW_WA: ${SW_WA}`);
console.log(`SW_AN: ${SW_AN}`);
console.log(`SW_GE: ${SW_GE}`);
console.log(`SW_ME: ${SW_ME}`);
console.log(`SW_RA: ${SW_RA}`);
console.log(`SW_ZR: ${SW_ZR}`);
console.log(`SW_FA: ${SW_FA}`);
console.log(`SW_WU: ${SW_WU}`);

// Contoh penggunaan untuk GESAMT
// const RW_GESAMT = '151-160';
// const SW_GESAMT = getSW(RW_GESAMT, GESAMT_mapping);
// console.log(`SW_GESAMT: ${SW_GESAMT}`);
