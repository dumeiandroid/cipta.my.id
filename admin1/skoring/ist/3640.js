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
    20: 128, 19: 125, 18: 122, 17: 119, 16: 116, 15: 113, 14: 110, 13: 107,
    12: 104, 11: 101, 10: 99, 9: 96, 8: 93, 7: 90, 6: 87, 5: 84, 4: 81,
    3: 78, 2: 75, 1: 72, 0: 69
};

const WA_mapping = {
    20: 133, 19: 130, 18: 127, 17: 124, 16: 121, 15: 118, 14: 114, 13: 111,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 96, 7: 93, 6: 87, 5: 86, 4: 83,
    3: 80, 2: 77, 1: 74, 0: 71
};

const AN_mapping = {
    20: 127, 19: 125, 18: 122, 17: 120, 16: 118, 15: 115, 14: 113, 13: 111,
    12: 109, 11: 106, 10: 104, 9: 102, 8: 100, 7: 97, 6: 95, 5: 93, 4: 90,
    3: 88, 2: 86, 1: 84, 0: 81
};

const GE_mapping = {
    20: 128, 19: 125, 18: 122, 17: 119, 16: 116, 15: 113, 14: 110, 13: 107,
    12: 104, 11: 101, 10: 99, 9: 96, 8: 93, 7: 90, 6: 87, 5: 84, 4: 81,
    3: 78, 2: 75, 1: 72, 0: 69
};

const ME_mapping = {
    20: 127, 19: 124, 18: 122, 17: 120, 16: 117, 15: 115, 14: 112, 13: 110,
    12: 107, 11: 105, 10: 102, 9: 100, 8: 98, 7: 95, 6: 93, 5: 90, 4: 88,
    3: 85, 2: 83, 1: 80, 0: 78
};

const RA_mapping = {
    20: 131, 19: 128, 18: 125, 17: 122, 16: 119, 15: 116, 14: 114, 13: 111,
    12: 108, 11: 105, 10: 103, 9: 100, 8: 97, 7: 94, 6: 91, 5: 89, 4: 86,
    3: 83, 2: 80, 1: 78, 0: 75
};

const ZR_mapping = {
    20: 126, 19: 124, 18: 121, 17: 119, 16: 117, 15: 115, 14: 112, 13: 110,
    12: 108, 11: 106, 10: 104, 9: 101, 8: 99, 7: 97, 6: 95, 5: 92, 4: 90,
    3: 88, 2: 86, 1: 84, 0: 81
};

const FA_mapping = {
    20: 128, 19: 126, 18: 123, 17: 121, 16: 118, 15: 115, 14: 113, 13: 110,
    12: 108, 11: 105, 10: 103, 9: 100, 8: 97, 7: 95, 6: 92, 5: 90, 4: 87,
    3: 85, 2: 82, 1: 79, 0: 77
};

const WU_mapping = {
    20: 132, 19: 129, 18: 126, 17: 123, 16: 121, 15: 118, 14: 115, 13: 112,
    12: 109, 11: 107, 10: 104, 9: 101, 8: 98, 7: 96, 6: 93, 5: 90, 4: 87,
    3: 84, 2: 82, 1: 79, 0: 76
};

const GESAMT_mapping = {
    '171-180': 132,
    '161-170': 128,
    '151-160': 125,
    '141-150': 121,
    '131-140': 118,
    '121-130': 114,
    '111-120': 111,
    '101-110': 108,
    '91-100': 104,
    '81-90': 101,
    '71-80': 97,
    '61-70': 94,
    '51-60': 90,
    '41-50': 87,
    '31-40': 83,
    '21-30': 80,
    '11-20': 77,
    '1-10': 73
};

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
