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
    20: 126, 19: 123, 18: 120, 17: 117, 16: 114, 15: 112, 14: 109, 13: 106,
    12: 103, 11: 101, 10: 98, 9: 95, 8: 92, 7: 89, 6: 87, 5: 84, 4: 81,
    3: 78, 2: 76, 1: 73, 0: 70
};

const WA_mapping = {
    20: 131, 19: 128, 18: 125, 17: 121, 16: 118, 15: 115, 14: 111, 13: 108,
    12: 105, 11: 101, 10: 98, 9: 95, 8: 91, 7: 88, 6: 85, 5: 81, 4: 78,
    3: 75, 2: 71, 1: 68, 0: 65
};

const AN_mapping = {
    20: 126, 19: 123, 18: 121, 17: 118, 16: 115, 15: 113, 14: 110, 13: 108,
    12: 105, 11: 103, 10: 100, 9: 97, 8: 95, 7: 92, 6: 90, 5: 87, 4: 85,
    3: 82, 2: 79, 1: 77, 0: 74
};

const GE_mapping = {
    20: 124, 19: 122, 18: 119, 17: 116, 16: 114, 15: 111, 14: 109, 13: 106,
    12: 104, 11: 101, 10: 98, 9: 96, 8: 93, 7: 91, 6: 88, 5: 86, 4: 83,
    3: 81, 2: 78, 1: 75, 0: 73
};

const ME_mapping = {
    20: 119, 19: 117, 18: 114, 17: 112, 16: 110, 15: 108, 14: 106, 13: 103,
    12: 101, 11: 99, 10: 97, 9: 94, 8: 92, 7: 90, 6: 88, 5: 86, 4: 83,
    3: 81, 2: 79, 1: 77, 0: 74
};

const RA_mapping = {
    20: 130, 19: 127, 18: 124, 17: 121, 16: 119, 15: 116, 14: 113, 13: 110,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 96, 7: 94, 6: 91, 5: 88, 4: 85,
    3: 83, 2: 80, 1: 77, 0: 74
};

const ZR_mapping = {
    20: 123, 19: 120, 18: 118, 17: 116, 16: 113, 15: 111, 14: 109, 13: 106,
    12: 104, 11: 102, 10: 99, 9: 97, 8: 95, 7: 92, 6: 90, 5: 88, 4: 85,
    3: 83, 2: 81, 1: 78, 0: 76
};

const FA_mapping = {
    20: 126, 19: 124, 18: 121, 17: 118, 16: 115, 15: 113, 14: 110, 13: 107,
    12: 105, 11: 102, 10: 99, 9: 96, 8: 94, 7: 91, 6: 88, 5: 86, 4: 83,
    3: 80, 2: 78, 1: 75, 0: 72
};

const WU_mapping = {
    20: 129, 19: 126, 18: 123, 17: 121, 16: 118, 15: 115, 14: 112, 13: 109,
    12: 106, 11: 103, 10: 101, 9: 98, 8: 95, 7: 92, 6: 89, 5: 86, 4: 83,
    3: 81, 2: 78, 1: 75, 0: 72
};

const GESAMT_mapping = {
    '171-180': 130,
    '161-170': 127,
    '151-160': 123,
    '141-150': 119,
    '131-140': 116,
    '121-130': 112,
    '111-120': 108,
    '101-110': 104,
    '91-100': 101,
    '81-90': 97,
    '71-80': 93,
    '61-70': 90,
    '51-60': 86,
    '41-50': 82,
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
