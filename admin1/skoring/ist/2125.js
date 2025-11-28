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
    20: 126, 19: 124, 18: 121, 17: 118, 16: 115, 15: 112, 14: 109, 13: 106,
    12: 103, 11: 100, 10: 97, 9: 94, 8: 91, 7: 88, 6: 85, 5: 82, 4: 79,
    3: 76, 2: 74, 1: 71, 0: 68
};

const WA_mapping = {
    20: 134, 19: 131, 18: 127, 17: 124, 16: 120, 15: 116, 14: 113, 13: 109,
    12: 106, 11: 102, 10: 99, 9: 95, 8: 91, 7: 88, 6: 84, 5: 81, 4: 77,
    3: 74, 2: 70, 1: 66, 0: 63
};

const AN_mapping = {
    20: 126, 19: 123, 18: 121, 17: 118, 16: 116, 15: 113, 14: 111, 13: 108,
    12: 106, 11: 103, 10: 101, 9: 98, 8: 96, 7: 93, 6: 91, 5: 88, 4: 86,
    3: 83, 2: 81, 1: 78, 0: 76
};

const GE_mapping = {
    20: 125, 19: 122, 18: 119, 17: 117, 16: 114, 15: 111, 14: 108, 13: 106,
    12: 103, 11: 100, 10: 97, 9: 94, 8: 92, 7: 89, 6: 86, 5: 83, 4: 81,
    3: 78, 2: 75, 1: 72, 0: 69
};

const ME_mapping = {
    20: 122, 19: 119, 18: 117, 17: 115, 16: 112, 15: 110, 14: 108, 13: 105,
    12: 103, 11: 101, 10: 98, 9: 96, 8: 94, 7: 91, 6: 89, 5: 87, 4: 84,
    3: 81, 2: 79, 1: 77, 0: 75
};

const RA_mapping = {
    20: 131, 19: 128, 18: 125, 17: 122, 16: 119, 15: 117, 14: 114, 13: 111,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 96, 7: 94, 6: 91, 5: 88, 4: 85,
    3: 83, 2: 80, 1: 77, 0: 74
};

const ZR_mapping = {
    20: 125, 19: 122, 18: 120, 17: 118, 16: 115, 15: 110, 14: 108, 13: 106,
    12: 104, 11: 102, 10: 99, 9: 94, 8: 90, 7: 87, 6: 84, 5: 81, 4: 77,
    3: 74, 2: 71, 1: 68, 0: 65
};

const FA_mapping = {
    20: 127, 19: 124, 18: 121, 17: 119, 16: 116, 15: 113, 14: 110, 13: 107,
    12: 104, 11: 101, 10: 99, 9: 96, 8: 93, 7: 90, 6: 87, 5: 84, 4: 81,
    3: 79, 2: 76, 1: 73, 0: 70
};

const WU_mapping = {
    20: 129, 19: 126, 18: 123, 17: 121, 16: 118, 15: 115, 14: 112, 13: 109,
    12: 106, 11: 103, 10: 101, 9: 98, 8: 95, 7: 92, 6: 89, 5: 86, 4: 83,
    3: 81, 2: 78, 1: 75, 0: 72
};

const GESAMT_mapping = {
    '171-180': 132,
    '161-170': 128,
    '151-160': 124,
    '141-150': 120,
    '131-140': 117,
    '121-130': 113,
    '111-120': 109,
    '101-110': 105,
    '91-100': 101,
    '81-90': 97,
    '71-80': 93,
    '61-70': 90,
    '51-60': 86,
    '41-50': 82,
    '31-40': 78,
    '21-30': 74,
    '11-20': 70,
    '1-10': 67
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
