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
    20: 130, 19: 127, 18: 124, 17: 121, 16: 118, 15: 115, 14: 112, 13: 108,
    12: 105, 11: 102, 10: 99, 9: 96, 8: 93, 7: 90, 6: 87, 5: 84, 4: 81,
    3: 78, 2: 75, 1: 72, 0: 69
};

const WA_mapping = {
    20: 137, 19: 133, 18: 130, 17: 126, 16: 122, 15: 119, 14: 115, 13: 111,
    12: 107, 11: 104, 10: 100, 9: 96, 8: 93, 7: 89, 6: 85, 5: 81, 4: 78,
    3: 74, 2: 70, 1: 67, 0: 63
};

const AN_mapping = {
    20: 127, 19: 125, 18: 122, 17: 120, 16: 117, 15: 115, 14: 112, 13: 109,
    12: 107, 11: 104, 10: 102, 9: 99, 8: 97, 7: 94, 6: 92, 5: 89, 4: 86,
    3: 84, 2: 81, 1: 79, 0: 76
};

const GE_mapping = {
    20: 127, 19: 124, 18: 122, 17: 119, 16: 116, 15: 114, 14: 111, 13: 108,
    12: 106, 11: 103, 10: 101, 9: 98, 8: 95, 7: 93, 6: 90, 5: 87, 4: 85,
    3: 82, 2: 79, 1: 77, 0: 74
};

const ME_mapping = {
    20: 123, 19: 121, 18: 118, 17: 116, 16: 113, 15: 111, 14: 108, 13: 106,
    12: 103, 11: 101, 10: 98, 9: 96, 8: 93, 7: 91, 6: 88, 5: 86, 4: 83,
    3: 81, 2: 78, 1: 76, 0: 73
};

const RA_mapping = {
    20: 132, 19: 129, 18: 126, 17: 124, 16: 121, 15: 118, 14: 115, 13: 112,
    12: 109, 11: 106, 10: 103, 9: 100, 8: 97, 7: 94, 6: 91, 5: 88, 4: 85,
    3: 82, 2: 79, 1: 76, 0: 74
};

const ZR_mapping = {
    20: 126, 19: 124, 18: 121, 17: 119, 16: 116, 15: 114, 14: 111, 13: 109,
    12: 106, 11: 104, 10: 101, 9: 99, 8: 96, 7: 94, 6: 91, 5: 89, 4: 86,
    3: 84, 2: 81, 1: 79, 0: 76
};

const FA_mapping = {
    20: 129, 19: 126, 18: 123, 17: 121, 16: 118, 15: 115, 14: 112, 13: 109,
    12: 107, 11: 104, 10: 101, 9: 98, 8: 96, 7: 93, 6: 90, 5: 87, 4: 84,
    3: 82, 2: 79, 1: 76, 0: 73
};

const WU_mapping = {
    20: 132, 19: 129, 18: 126, 17: 123, 16: 120, 15: 117, 14: 114, 13: 111,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 96, 7: 93, 6: 90, 5: 87, 4: 84,
    3: 81, 2: 78, 1: 75, 0: 72
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
