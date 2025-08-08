/**
 * Mengambil nilai SW (Skalenwert) dari pemetaan berdasarkan nilai RW (Rohwert).
 * @param {number | string} RW - Nilai Rohwert.
 * @param {object} mapping - Objek pemetaan untuk dikonsultasikan.
 * @returns {number | null} Nilai Skalenwert (SW) atau null jika tidak ditemukan.
 */
function getSW(RW, mapping) {
    return mapping[RW] ?? null;
}

// Objek-objek pemetaan
const SE_mapping = {
    20: 136, 19: 133, 18: 129, 17: 126, 16: 122, 15: 119, 14: 115, 13: 111,
    12: 108, 11: 104, 10: 101, 9: 97, 8: 94, 7: 90, 6: 87, 5: 84, 4: 81,
    3: 78, 2: 75, 1: 72, 0: 69
};

const WA_mapping = {
    20: 128, 19: 126, 18: 124, 17: 122, 16: 120, 15: 117, 14: 114, 13: 115,
    12: 112, 11: 109, 10: 105, 9: 102, 8: 99, 7: 96, 6: 93, 5: 89, 4: 86,
    3: 83, 2: 80, 1: 76, 0: 73
};

const AN_mapping = {
    20: 128, 19: 126, 18: 124, 17: 122, 16: 120, 15: 117, 14: 115, 13: 113,
    12: 111, 11: 109, 10: 107, 9: 104, 8: 102, 7: 100, 6: 98, 5: 96, 4: 93,
    3: 91, 2: 89, 1: 87, 0: 85
};

const GE_mapping = {
    20: 131, 19: 128, 18: 125, 17: 121, 16: 119, 15: 116, 14: 114, 13: 111,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 96, 7: 93, 6: 90, 5: 87, 4: 84,
    3: 81, 2: 78, 1: 76, 0: 73
};

const ME_mapping = {
    20: 128, 19: 126, 18: 123, 17: 121, 16: 119, 15: 117, 14: 114, 13: 112,
    12: 110, 11: 108, 10: 106, 9: 103, 8: 101, 7: 99, 6: 97, 5: 94, 4: 92,
    3: 90, 2: 88, 1: 86, 0: 83
};

const RA_mapping = {
    20: 134, 19: 131, 18: 128, 17: 125, 16: 123, 15: 120, 14: 117, 13: 114,
    12: 111, 11: 108, 10: 105, 9: 103, 8: 100, 7: 97, 6: 94, 5: 91, 4: 88,
    3: 85, 2: 83, 1: 80, 0: 77
};

const ZR_mapping = {
    20: 129, 19: 127, 18: 124, 17: 122, 16: 120, 15: 118, 14: 115, 13: 113,
    12: 111, 11: 108, 10: 106, 9: 104, 8: 102, 7: 99, 6: 97, 5: 95, 4: 92,
    3: 90, 2: 88, 1: 86, 0: 83
};

const FA_mapping = {
    20: 133, 19: 131, 18: 128, 17: 125, 16: 122, 15: 119, 14: 117, 13: 114,
    12: 111, 11: 109, 10: 106, 9: 104, 8: 102, 7: 100, 6: 98, 5: 96, 4: 93,
    3: 91, 2: 89, 1: 87, 0: 85
};

const WU_mapping = {
    20: 134, 19: 131, 18: 128, 17: 125, 16: 123, 15: 120, 14: 117, 13: 115,
    12: 112, 11: 109, 10: 106, 9: 104, 8: 101, 7: 98, 6: 96, 5: 93, 4: 90,
    3: 88, 2: 85, 1: 82, 0: 79
};

const GESAMT_mapping = {
    '171-180': 136,
    '161-170': 133,
    '151-160': 129,
    '141-150': 126,
    '131-140': 122,
    '121-130': 119,
    '111-120': 115,
    '101-110': 111,
    '91-100': 108,
    '81-90': 104,
    '71-80': 101,
    '61-70': 97,
    '51-60': 94,
    '41-50': 90,
    '31-40': 86,
    '21-30': 83,
    '11-20': 79,
    '1-10': 76
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
