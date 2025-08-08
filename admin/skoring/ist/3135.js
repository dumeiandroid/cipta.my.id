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
    20: 127, 19: 124, 18: 121, 17: 118, 16: 115, 15: 112, 14: 109, 13: 106,
    12: 103, 11: 100, 10: 97, 9: 94, 8: 91, 7: 89, 6: 86, 5: 83, 4: 80,
    3: 77, 2: 74, 1: 71, 0: 68
};

const WA_mapping = {
    20: 134, 19: 131, 18: 127, 17: 124, 16: 121, 15: 117, 14: 114, 13: 111,
    12: 107, 11: 104, 10: 101, 9: 97, 8: 94, 7: 91, 6: 87, 5: 84, 4: 81,
    3: 77, 2: 74, 1: 71, 0: 67
};

const AN_mapping = {
    20: 126, 19: 123, 18: 121, 17: 119, 16: 117, 15: 114, 14: 112, 13: 110,
    12: 108, 11: 105, 10: 103, 9: 101, 8: 98, 7: 96, 6: 94, 5: 92, 4: 89,
    3: 87, 2: 85, 1: 83, 0: 80
};

const GE_mapping = {
    20: 126, 19: 123, 18: 120, 17: 117, 16: 115, 15: 112, 14: 109, 13: 106,
    12: 103, 11: 100, 10: 97, 9: 95, 8: 92, 7: 89, 6: 86, 5: 83, 4: 80,
    3: 77, 2: 75, 1: 72, 0: 69
};

const ME_mapping = {
    20: 124, 19: 122, 18: 119, 17: 117, 16: 115, 15: 113, 14: 110, 13: 108,
    12: 106, 11: 103, 10: 101, 9: 99, 8: 97, 7: 94, 6: 92, 5: 90, 4: 88,
    3: 85, 2: 83, 1: 81, 0: 78
};

const RA_mapping = {
    20: 129, 19: 126, 18: 124, 17: 121, 16: 118, 15: 116, 14: 113, 13: 110,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 97, 7: 94, 6: 91, 5: 89, 4: 86,
    3: 83, 2: 81, 1: 78, 0: 75
};

const ZR_mapping = {
    20: 127, 19: 125, 18: 122, 17: 120, 16: 117, 15: 115, 14: 113, 13: 110,
    12: 108, 11: 105, 10: 103, 9: 101, 8: 98, 7: 96, 6: 94, 5: 91, 4: 89,
    3: 86, 2: 84, 1: 82, 0: 79
};

const FA_mapping = {
    20: 129, 19: 126, 18: 123, 17: 120, 16: 118, 15: 115, 14: 112, 13: 109,
    12: 106, 11: 104, 10: 101, 9: 98, 8: 95, 7: 93, 6: 90, 5: 87, 4: 84,
    3: 81, 2: 79, 1: 76, 0: 73
};

const WU_mapping = {
    20: 130, 19: 127, 18: 124, 17: 122, 16: 119, 15: 116, 14: 113, 13: 111,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 97, 7: 94, 6: 91, 5: 88, 4: 86,
    3: 83, 2: 80, 1: 77, 0: 74
};

const GESAMT_mapping = {
    '171-180': 133,
    '161-170': 129,
    '151-160': 125,
    '141-150': 121,
    '131-140': 118,
    '121-130': 114,
    '111-120': 110,
    '101-110': 107,
    '91-100': 103,
    '81-90': 99,
    '71-80': 96,
    '61-70': 92,
    '51-60': 88,
    '41-50': 84,
    '31-40': 81,
    '21-30': 77,
    '11-20': 73,
    '1-10': 70
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
