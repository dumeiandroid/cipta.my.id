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
    20: 127, 19: 124, 18: 121, 17: 118, 16: 115, 15: 112, 14: 108, 13: 105,
    12: 102, 11: 99, 10: 96, 9: 93, 8: 90, 7: 87, 6: 84, 5: 81, 4: 78,
    3: 75, 2: 72, 1: 69, 0: 66
};

const WA_mapping = {
    20: 133, 19: 129, 18: 126, 17: 123, 16: 119, 15: 116, 14: 113, 13: 109,
    12: 106, 11: 103, 10: 99, 9: 96, 8: 93, 7: 89, 6: 86, 5: 83, 4: 79,
    3: 76, 2: 73, 1: 69, 0: 66
};

const AN_mapping = {
    20: 125, 19: 123, 18: 121, 17: 118, 16: 116, 15: 114, 14: 111, 13: 109,
    12: 106, 11: 104, 10: 102, 9: 99, 8: 97, 7: 95, 6: 92, 5: 90, 4: 87,
    3: 85, 2: 83, 1: 80, 0: 78
};

const GE_mapping = {
    20: 124, 19: 121, 18: 119, 17: 116, 16: 113, 15: 110, 14: 108, 13: 105,
    12: 102, 11: 99, 10: 96, 9: 94, 8: 91, 7: 88, 6: 85, 5: 83, 4: 80,
    3: 77, 2: 74, 1: 71, 0: 69
};

const ME_mapping = {
    20: 123, 19: 120, 18: 118, 17: 116, 16: 114, 15: 111, 14: 109, 13: 107,
    12: 105, 11: 102, 10: 100, 9: 98, 8: 95, 7: 93, 6: 91, 5: 89, 4: 86,
    3: 84, 2: 82, 1: 80, 0: 77
};

const RA_mapping = {
    20: 131, 19: 128, 18: 125, 17: 122, 16: 119, 15: 117, 14: 114, 13: 111,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 97, 7: 94, 6: 91, 5: 88, 4: 85,
    3: 82, 2: 79, 1: 77, 0: 74
};

const ZR_mapping = {
    20: 125, 19: 123, 18: 120, 17: 118, 16: 116, 15: 113, 14: 111, 13: 109,
    12: 107, 11: 104, 10: 102, 9: 100, 8: 97, 7: 95, 6: 93, 5: 90, 4: 88,
    3: 86, 2: 83, 1: 81, 0: 79
};

const FA_mapping = {
    20: 128, 19: 125, 18: 122, 17: 119, 16: 116, 15: 113, 14: 111, 13: 108,
    12: 105, 11: 102, 10: 99, 9: 96, 8: 93, 7: 91, 6: 88, 5: 85, 4: 82,
    3: 79, 2: 76, 1: 73, 0: 71
};

const WU_mapping = {
    20: 131, 19: 128, 18: 125, 17: 122, 16: 119, 15: 116, 14: 113, 13: 110,
    12: 107, 11: 104, 10: 101, 9: 99, 8: 96, 7: 93, 6: 90, 5: 87, 4: 84,
    3: 81, 2: 78, 1: 75, 0: 72
};

const GESAMT_mapping = {
    '171-180': 133,
    '161-170': 129,
    '151-160': 125,
    '141-150': 121,
    '131-140': 117,
    '121-130': 113,
    '111-120': 110,
    '101-110': 106,
    '91-100': 102,
    '81-90': 98,
    '71-80': 94,
    '61-70': 90,
    '51-60': 87,
    '41-50': 83,
    '31-40': 79,
    '21-30': 75,
    '11-20': 71,
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
