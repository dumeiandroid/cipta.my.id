/**
 * Mengambil nilai SW dari pemetaan berdasarkan nilai RW.
 * @param {number | string} RW - Nilai Rohwert.
 * @param {object} mapping - Objek pemetaan untuk dikonsultasikan.
 * @returns {number | null} Nilai Skalenwert (SW) atau null jika tidak ditemukan.
 */
function getSW(RW, mapping) {
    return mapping[RW] ?? null;
}

// Objek-objek pemetaan
const SE_mapping = {
    20: null, 19: null, 18: 132, 17: 129, 16: 126, 15: 123, 14: 119, 13: 115,
    12: 112, 11: 108, 10: 105, 9: 101, 8: 98, 7: 94, 6: 91, 5: 88, 4: 84,
    3: 81, 2: 77, 1: 74, 0: 70
};

const WA_mapping = {
    20: null, 19: null, 18: 131, 17: 128, 16: 124, 15: 121, 14: 117, 13: 114,
    12: 110, 11: 107, 10: 103, 9: 100, 8: 97, 7: 93, 6: 90, 5: 86, 4: 83,
    3: 79, 2: 76, 1: 72, 0: 69
};

const AN_mapping = {
    20: null, 19: 133, 18: 130, 17: 127, 16: 124, 15: 121, 14: 119, 13: 116,
    12: 113, 11: 110, 10: 107, 9: 104, 8: 101, 7: 99, 6: 96, 5: 93, 4: 90,
    3: 87, 2: 84, 1: 81, 0: 79
};

const GE_mapping = {
    20: null, 19: null, 18: 133, 17: 130, 16: 126, 15: 123, 14: 119, 13: 116,
    12: 112, 11: 109, 10: 106, 9: 102, 8: 99, 7: 95, 6: 92, 5: 88, 4: 85,
    3: 81, 2: 78, 1: 74, 0: 71
};

const ME_mapping = {
    20: 129, 19: 126, 18: 124, 17: 121, 16: 118, 15: 116, 14: 113, 13: 111,
    12: 108, 11: 105, 10: 103, 9: 100, 8: 97, 7: 95, 6: 92, 5: 89, 4: 87,
    3: 84, 2: 82, 1: 79, 0: 76
};

const RA_mapping = {
    20: null, 19: 133, 18: 130, 17: 127, 16: 124, 15: 121, 14: 118, 13: 114,
    12: 111, 11: 108, 10: 105, 9: 102, 8: 99, 7: 96, 6: 93, 5: 89, 4: 86,
    3: 83, 2: 80, 1: 77, 0: 74
};

const ZR_mapping = {
    20: 132, 19: 129, 18: 126, 17: 124, 16: 121, 15: 118, 14: 116, 13: 113,
    12: 110, 11: 108, 10: 105, 9: 102, 8: 99, 7: 97, 6: 94, 5: 91, 4: 89,
    3: 86, 2: 83, 1: 81, 0: 78
};

const FA_mapping = {
    20: 132, 19: 129, 18: 126, 17: 123, 16: 121, 15: 118, 14: 115, 13: 112,
    12: 109, 11: 106, 10: 103, 9: 101, 8: 98, 7: 95, 6: 92, 5: 89, 4: 86,
    3: 83, 2: 81, 1: 78, 0: 75
};

const WU_mapping = {
    20: null, 19: null, 18: 132, 17: 129, 16: 125, 15: 122, 14: 118, 13: 115,
    12: 111, 11: 108, 10: 104, 9: 101, 8: 98, 7: 94, 6: 91, 5: 87, 4: 84,
    3: 80, 2: 77, 1: 73, 0: 70
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

// Contoh penggunaan
// const RW_SE = 18;
// const RW_WA = 18;
// const RW_AN = 19;
// const RW_GE = 18;
// const RW_ME = 20;
// const RW_RA = 19;
// const RW_ZR = 20;
// const RW_FA = 20;
// const RW_WU = 18;

// Deklarasikan variabel RW. Ini harus diatur ke nilai aktual sebelum digunakan.
let RW_SE, RW_WA, RW_AN, RW_GE, RW_ME, RW_RA, RW_ZR, RW_FA, RW_WU;

const SW_SE = getSW(RW_SE, SE_mapping);
const SW_WA = getSW(RW_WA, WA_mapping);
const SW_AN = getSW(RW_AN, AN_mapping);
const SW_GE = getSW(RW_GE, GE_mapping);
const SW_ME = getSW(RW_ME, ME_mapping);
const SW_RA = getSW(RW_RA, RA_mapping);
const SW_ZR = getSW(RW_ZR, ZR_mapping);
const SW_FA = getSW(RW_FA, FA_mapping);
const SW_WU = getSW(RW_WU, WU_mapping);

console.log(`SW_SE: ${SW_SE}`);
console.log(`SW_WA: ${SW_WA}`);
console.log(`SW_AN: ${SW_AN}`);
console.log(`SW_GE: ${SW_GE}`);
console.log(`SW_ME: ${SW_ME}`);
console.log(`SW_RA: ${SW_RA}`);
console.log(`SW_ZR: ${SW_ZR}`);
console.log(`SW_FA: ${SW_FA}`);
console.log(`SW_WU: ${SW_WU}`);
