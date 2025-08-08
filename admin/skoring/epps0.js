// =======================================================
// Konversi dari file epps0.php
// =======================================================

// Asumsikan variabel 'soal_epps' sudah ada dan berisi array jawaban.
// Contoh: const soal_epps = ['A', 'B', 'A', ...];
let soal_epps; 

/**
 * Menghitung skor total untuk setiap array jawaban.
 * @param {Array<string>} arr - Array jawaban untuk satu kategori.
 * @returns {number} Jumlah jawaban 'A' dalam array.
 */
function getScore(arr) {
    return arr.filter(item => item === 'A').length;
}

/**
 * Mendapatkan nilai WS (Wajib Standar) berdasarkan skor dan tipe kategori.
 * Anda perlu mengisi tabel WS ini.
 * @param {number} score - Skor mentah.
 * @param {string} type - Tipe kategori (misalnya 'ACH_s').
 * @returns {number} Nilai WS.
 */
function getWS(score, type) {
    // Anda harus mengisi tabel ini.
    const wsTable = {
        'ACH_s': {},
        'DEF_s': {},
        'ORD_s': {}
        // ...dan seterusnya
    };

    return wsTable[type] ? wsTable[type][score] : 0;
}

// Fungsi helper untuk mendapatkan nilai soal dari array 0-based
const getSoalValue = (index) => soal_epps[index - 1];

// Mendefinisikan array jawaban untuk setiap kategori
const ach_r = [getSoalValue(6), getSoalValue(11), getSoalValue(16), getSoalValue(21), getSoalValue(26), getSoalValue(31), getSoalValue(36), getSoalValue(41), getSoalValue(46), getSoalValue(51), getSoalValue(56), getSoalValue(61), getSoalValue(66), getSoalValue(71)];
const def_r = [getSoalValue(2), getSoalValue(12), getSoalValue(17), getSoalValue(22), getSoalValue(27), getSoalValue(32), getSoalValue(37), getSoalValue(42), getSoalValue(47), getSoalValue(52), getSoalValue(57), getSoalValue(62), getSoalValue(67), getSoalValue(72)];
const ord_r = [getSoalValue(3), getSoalValue(8), getSoalValue(18), getSoalValue(23), getSoalValue(28), getSoalValue(33), getSoalValue(38), getSoalValue(43), getSoalValue(48), getSoalValue(53), getSoalValue(58), getSoalValue(63), getSoalValue(68), getSoalValue(73)];
const exh_r = [getSoalValue(4), getSoalValue(9), getSoalValue(14), getSoalValue(24), getSoalValue(29), getSoalValue(34), getSoalValue(39), getSoalValue(44), getSoalValue(49), getSoalValue(54), getSoalValue(59), getSoalValue(64), getSoalValue(69), getSoalValue(74)];
const aut_r = [getSoalValue(5), getSoalValue(10), getSoalValue(15), getSoalValue(20), getSoalValue(30), getSoalValue(35), getSoalValue(40), getSoalValue(45), getSoalValue(50), getSoalValue(55), getSoalValue(60), getSoalValue(65), getSoalValue(70), getSoalValue(75)];
const aff_r = [getSoalValue(76), getSoalValue(81), getSoalValue(86), getSoalValue(91), getSoalValue(96), getSoalValue(106), getSoalValue(111), getSoalValue(116), getSoalValue(121), getSoalValue(126), getSoalValue(131), getSoalValue(136), getSoalValue(141), getSoalValue(146)];
const int_r = [getSoalValue(77), getSoalValue(82), getSoalValue(87), getSoalValue(92), getSoalValue(97), getSoalValue(102), getSoalValue(112), getSoalValue(117), getSoalValue(122), getSoalValue(127), getSoalValue(132), getSoalValue(137), getSoalValue(142), getSoalValue(147)];
const suc_r = [getSoalValue(78), getSoalValue(83), getSoalValue(88), getSoalValue(93), getSoalValue(98), getSoalValue(103), getSoalValue(108), getSoalValue(118), getSoalValue(123), getSoalValue(128), getSoalValue(133), getSoalValue(138), getSoalValue(143), getSoalValue(148)];
const dom_r = [getSoalValue(79), getSoalValue(84), getSoalValue(89), getSoalValue(94), getSoalValue(99), getSoalValue(104), getSoalValue(109), getSoalValue(114), getSoalValue(124), getSoalValue(129), getSoalValue(134), getSoalValue(139), getSoalValue(144), getSoalValue(149)];
const aba_r = [getSoalValue(80), getSoalValue(85), getSoalValue(90), getSoalValue(95), getSoalValue(100), getSoalValue(105), getSoalValue(110), getSoalValue(115), getSoalValue(120), getSoalValue(130), getSoalValue(135), getSoalValue(140), getSoalValue(145), getSoalValue(150)];
const nur_r = [getSoalValue(151), getSoalValue(156), getSoalValue(161), getSoalValue(166), getSoalValue(171), getSoalValue(176), getSoalValue(181), getSoalValue(186), getSoalValue(191), getSoalValue(196), getSoalValue(201), getSoalValue(206), getSoalValue(211), getSoalValue(216)];
const chg_r = [getSoalValue(152), getSoalValue(157), getSoalValue(162), getSoalValue(167), getSoalValue(172), getSoalValue(177), getSoalValue(182), getSoalValue(187), getSoalValue(192), getSoalValue(197), getSoalValue(202), getSoalValue(207), getSoalValue(212), getSoalValue(217)];
const end_r = [getSoalValue(153), getSoalValue(158), getSoalValue(163), getSoalValue(168), getSoalValue(173), getSoalValue(178), getSoalValue(183), getSoalValue(188), getSoalValue(193), getSoalValue(198), getSoalValue(203), getSoalValue(208), getSoalValue(213), getSoalValue(218)];
const het_r = [getSoalValue(154), getSoalValue(159), getSoalValue(164), getSoalValue(169), getSoalValue(174), getSoalValue(179), getSoalValue(184), getSoalValue(189), getSoalValue(194), getSoalValue(199), getSoalValue(204), getSoalValue(209), getSoalValue(214), getSoalValue(219)];
const agg_r = [getSoalValue(155), getSoalValue(160), getSoalValue(165), getSoalValue(170), getSoalValue(175), getSoalValue(180), getSoalValue(185), getSoalValue(190), getSoalValue(195), getSoalValue(200), getSoalValue(205), getSoalValue(210), getSoalValue(215), getSoalValue(220)];

// Menghitung skor mentah
const ach_s = getScore(ach_r);
const def_s = getScore(def_r);
const ord_s = getScore(ord_r);
const exh_s = getScore(exh_r);
const aut_s = getScore(aut_r);
const aff_s = getScore(aff_r);
const int_s = getScore(int_r);
const suc_s = getScore(suc_r);
const dom_s = getScore(dom_r);
const aba_s = getScore(aba_r);
const nur_s = getScore(nur_r);
const chg_s = getScore(chg_r);
const end_s = getScore(end_r);
const het_s = getScore(het_r);
const agg_s = getScore(agg_r);

// Menghitung WS
const ws_ach = getWS(ach_s, 'ACH_s');
const ws_def = getWS(def_s, 'DEF_s');
const ws_ord = getWS(ord_s, 'ORD_s');
const ws_exh = getWS(exh_s, 'EXH_s');
const ws_aut = getWS(aut_s, 'AUT_s');
const ws_aff = getWS(aff_s, 'AFF_s');
const ws_int = getWS(int_s, 'INT_s');
const ws_suc = getWS(suc_s, 'SUC_s');
const ws_dom = getWS(dom_s, 'DOM_s');
const ws_aba = getWS(aba_s, 'ABA_s');
const ws_nur = getWS(nur_s, 'NUR_s');
const ws_chg = getWS(chg_s, 'CHG_s');
const ws_end = getWS(end_s, 'END_s');
const ws_het = getWS(het_s, 'HET_s');
const ws_agg = getWS(agg_s, 'AGG_s');

const total_s = ach_s + def_s + ord_s + exh_s + aut_s + aff_s + int_s + suc_s + dom_s + aba_s + nur_s + chg_s + end_s + het_s + agg_s;
