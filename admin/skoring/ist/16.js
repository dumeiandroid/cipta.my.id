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
    20: null, 19: 132, 18: 128, 17: 125, 16: 122, 15: 118, 14: 115, 13: 112,
    12: 108, 11: 105, 10: 102, 9: 98, 8: 95, 7: 92, 6: 88, 5: 85, 4: 82,
    3: 78, 2: 75, 1: 72, 0: 68
};

const WA_mapping = {
    20: null, 19: 132, 18: 128, 17: 125, 16: 122, 15: 118, 14: 115, 13: 112,
    12: 108, 11: 105, 10: 102, 9: 98, 8: 95, 7: 92, 6: 88, 5: 85, 4: 82,
    3: 78, 2: 75, 1: 72, 0: 68
};

const AN_mapping = {
    20: 132, 19: 129, 18: 127, 17: 124, 16: 121, 15: 118, 14: 115, 13: 112,
    12: 109, 11: 107, 10: 104, 9: 101, 8: 98, 7: 95, 6: 92, 5: 89, 4: 87,
    3: 84, 2: 81, 1: 78, 0: 75
};

const GE_mapping = {
    20: null, 19: 131, 18: 128, 17: 125, 16: 122, 15: 119, 14: 116, 13: 113,
    12: 109, 11: 106, 10: 103, 9: 100, 8: 97, 7: 94, 6: 91, 5: 88, 4: 84,
    3: 81, 2: 78, 1: 75, 0: 72
};

const ME_mapping = {
    20: 127, 19: 124, 18: 121, 17: 119, 16: 116, 15: 113, 14: 111, 13: 108,
    12: 105, 11: 102, 10: 100, 9: 97, 8: 94, 7: 92, 6: 89, 5: 86, 4: 84,
    3: 81, 2: 78, 1: 75, 0: 73
};

const RA_mapping = {
    20: 134, 19: 131, 18: 128, 17: 125, 16: 122, 15: 119, 14: 116, 13: 113,
    12: 110, 11: 107, 10: 104, 9: 101, 8: 98, 7: 95, 6: 92, 5: 88, 4: 85,
    3: 82, 2: 79, 1: 76, 0: 73
};

const ZR_mapping = {
    20: 129, 19: 126, 18: 124, 17: 121, 16: 119, 15: 116, 14: 114, 13: 111,
    12: 108, 11: 106, 10: 103, 9: 101, 8: 98, 7: 96, 6: 93, 5: 91, 4: 88,
    3: 85, 2: 83, 1: 80, 0: 78
};

const FA_mapping = {
    20: 130, 19: 127, 18: 124, 17: 122, 16: 119, 15: 116, 14: 113, 13: 111,
    12: 108, 11: 105, 10: 102, 9: 99, 8: 97, 7: 94, 6: 91, 5: 88, 4: 86,
    3: 83, 2: 80, 1: 77, 0: 74
};

const WU_mapping = {
    20: 134, 19: 131, 18: 128, 17: 125, 16: 122, 15: 118, 14: 115, 13: 112,
    12: 109, 11: 106, 10: 103, 9: 100, 8: 97, 7: 93, 6: 90, 5: 87, 4: 84,
    3: 81, 2: 78, 1: 75, 0: 72
};

const GESAMT_mapping = {
    '171-180': null,
    '161-170': null,
    '151-160': 134,
    '141-150': 130,
    '131-140': 125,
    '121-130': 120,
    '111-120': 115,
    '101-110': 110,
    '91-100': 106,
    '81-90': 101,
    '71-80': 96,
    '61-70': 91,
    '51-60': 87,
    '41-50': 82,
    '31-40': 77,
    '21-30': 72,
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

// Contoh penggunaan untuk GESAMT
// const RW_GESAMT = '151-160';
// const SW_GESAMT = getSW(RW_GESAMT, GESAMT_mapping);
// console.log(`SW_GESAMT: ${SW_GESAMT}`);
