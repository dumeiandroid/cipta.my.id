
            // =================================================================
            // LOGIKA DARI PHP DIUBAH MENJADI FUNGSI JAVASCRIPT
            // =================================================================

            // --- Parsing Data Awal ---
            const parts_x10 = x_10.split('|').map(part => part.trim().split(';'));
            let hasil10 = parts_x10;
            let result = parts_x10;

            const parts_x02 = x_02.split('|').map(part => part.trim().split(';'));
            const nama = parts_x02;

            const x6_parts = x_06.split('|');
            const soal_epps = x6_parts[0].split(';');

            const usia = parseFloat(nama[0][4]);

            // --- Skoring RMIB ---
            const result_rmib = x6_parts.slice(2, 10).join(';');
            const soal_rmib = result_rmib.split(';');

            const p = (index) => parseInt(soal_rmib[index - 1].trim()) || 0;

            const out = p(1) + p(24) + p(35) + p(46) + p(57) + p(68) + p(79) + p(90);
            const mech = p(2) + p(13) + p(36) + p(47) + p(58) + p(69) + p(80) + p(91);
            const comp = p(3) + p(14) + p(25) + p(48) + p(59) + p(70) + p(81) + p(92);
            const acie = p(4) + p(15) + p(26) + p(37) + p(60) + p(71) + p(82) + p(93);
            const pers = p(5) + p(16) + p(27) + p(38) + p(49) + p(72) + p(83) + p(94);
            const aesth = p(6) + p(17) + p(28) + p(39) + p(50) + p(61) + p(84) + p(95);
            const lite = p(7) + p(18) + p(29) + p(40) + p(51) + p(62) + p(73) + p(96);
            const mus = p(8) + p(19) + p(30) + p(41) + p(52) + p(63) + p(74) + p(85);
            const sos_wer = p(9) + p(20) + p(31) + p(42) + p(53) + p(64) + p(75) + p(86);
            const cler = p(10) + p(21) + p(32) + p(43) + p(54) + p(65) + p(76) + p(87);
            const prac = p(11) + p(22) + p(33) + p(44) + p(55) + p(66) + p(77) + p(88);
            const med = p(12) + p(23) + p(34) + p(45) + p(56) + p(67) + p(78) + p(89);

            let totals_rmib = {
                "OUT": out, "MECH": mech, "COMP": comp, "ACIE": acie, "PERS": pers,
                "AESTH": aesth, "LITE": lite, "MUS": mus, "SOS. WERV": sos_wer,
                "CLER": cler, "PRAC": prac, "MED": med
            };

            // --- Fungsi Helper ---
            function getScore(value, criteria) {
                for (const limit in criteria) {
                    if (value <= parseInt(limit)) {
                        return criteria[limit];
                    }
                }
                return Object.values(criteria).pop();
            }

            // --- Kriteria Skoring ---
            const iqCriteria = { 60: 1, 69: 2, 79: 3, 89: 4, 99: 5, 109: 6, 119: 7, 129: 8, 139: 9, [Number.MAX_SAFE_INTEGER]: 10 };
            const cfitCriteria = { 2: 1, 3: 2, 4: 3, 5: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 13: 10 };
            const tkd3Criteria = { 12: 1, 16: 2, 20: 3, 23: 4, 27: 5, 31: 6, 35: 7, 38: 8, 40: 9, [Number.MAX_SAFE_INTEGER]: 10 };
            const tkd6Criteria = { 2: 1, 5: 2, 9: 3, 12: 4, 16: 5, 19: 6, 23: 7, 26: 8, 30: 9, [Number.MAX_SAFE_INTEGER]: 10 };
            const achCriteria = { 2: 1, 4: 2, 6: 3, 8: 4, 10: 5, 12: 6, 14: 7, 16: 8, 18: 9, [Number.MAX_SAFE_INTEGER]: 10 };

            // --- Skoring CFIT ---
            const nilai_x05 = x_05.split('|');
            const CFIT1 = parseInt(nilai_x05[0].trim()) || 0;
            const CFIT2 = parseInt(nilai_x05[1].trim()) || 0;
            const CFIT3 = parseInt(nilai_x05[2].trim()) || 0;
            const CFIT4 = parseInt(nilai_x05[3].trim()) || 0;
            const skorTotal_cfit = CFIT1 + CFIT2 + CFIT3 + CFIT4;

            function getIQ_cfit(skorTotal, usia) {
                const iqTable = {
                    49: [183, 183, 183, 183, 183], 48: [183, 183, 183, 179, 179], 47: [183, 183, 179, 176, 176], 46: [183, 179, 176, 173, 173], 45: [179, 176, 173, 169, 169], 44: [176, 173, 169, 167, 167], 43: [175, 171, 168, 165, 165], 42: [171, 168, 165, 161, 161], 41: [167, 163, 160, 157, 157], 40: [165, 161, 159, 155, 155], 39: [161, 159, 155, 152, 152], 38: [159, 155, 152, 149, 149], 37: [155, 152, 149, 145, 145], 36: [152, 149, 145, 142, 142], 35: [150, 147, 144, 140, 140], 34: [147, 144, 140, 137, 137], 33: [142, 139, 136, 133, 133], 32: [140, 137, 134, 131, 131], 31: [137, 134, 131, 128, 128], 30: [134, 131, 128, 126, 124], 29: [131, 128, 124, 123, 121], 28: [129, 126, 123, 121, 119], 27: [126, 123, 119, 117, 116], 26: [123, 119, 116, 114, 113], 25: [119, 116, 113, 111, 109], 24: [116, 113, 109, 108, 106], 23: [113, 109, 106, 104, 103], 22: [109, 106, 103, 101, 100], 21: [106, 103, 100, 98, 96], 20: [104, 101, 98, 96, 94], 19: [101, 98, 94, 93, 91], 18: [98, 94, 91, 89, 88], 17: [94, 91, 88, 86, 85], 16: [91, 88, 85, 83, 81], 15: [88, 85, 81, 80, 78], 14: [85, 81, 78, 76, 75], 13: [81, 78, 75, 73, 72], 12: [80, 76, 73, 72, 70], 11: [76, 73, 70, 68, 67], 10: [73, 70, 67, 65, 63], 9: [70, 67, 63, 62, 60], 8: [67, 63, 60, 58, 57], 7: [63, 60, 57, 56, 55], 6: [60, 57, 55, 53, 52], 5: [57, 55, 53, 51, 48], 4: [55, 54, 52, 50, 47], 3: [53, 52, 48, 47, 45], 2: [52, 51, 47, 46, 43], 1: [50, 50, 46, 45, 40], 0: [48, 48, 45, 43, 38],
                };
                let ageIndex;
                if (usia >= 13.0 && usia <= 13.4) ageIndex = 0;
                else if (usia >= 13.5 && usia <= 13.11) ageIndex = 1;
                else if (usia >= 14.0 && usia <= 14.11) ageIndex = 2;
                else if (usia >= 15.0 && usia <= 15.11) ageIndex = 3;
                else if (usia >= 16.0) ageIndex = 4;
                else return "Usia tidak valid";
                return iqTable[skorTotal] ? iqTable[skorTotal][ageIndex] : "Skor total tidak valid";
            }
            
            const iq_from_cfit = getIQ_cfit(skorTotal_cfit, usia);
            const IQ = parseInt(hasil10[0][3]) || iq_from_cfit;

            const tkd3 = parseInt(nilai_x05[15]) || 0;
            const tkd6 = parseInt(nilai_x05[17]) || 0;

            // --- Skoring EPPS ---
            const e = (index) => soal_epps[index - 1];
            const ach_r = [e(6), e(11), e(16), e(21), e(26), e(31), e(36), e(41), e(46), e(51), e(56), e(61), e(66), e(71)];
            const def_r = [e(2), e(12), e(17), e(22), e(27), e(32), e(37), e(42), e(47), e(52), e(57), e(62), e(67), e(72)];
            const ord_r = [e(3), e(8), e(18), e(23), e(28), e(33), e(38), e(43), e(48), e(53), e(58), e(63), e(68), e(73)];
            const exh_r = [e(4), e(9), e(14), e(24), e(29), e(34), e(39), e(44), e(49), e(54), e(59), e(64), e(69), e(74)];
            const aut_r = [e(5), e(10), e(15), e(20), e(30), e(35), e(40), e(45), e(50), e(55), e(60), e(65), e(70), e(75)];
            const aff_r = [e(76), e(81), e(86), e(91), e(96), e(106), e(111), e(116), e(121), e(126), e(131), e(136), e(141), e(146)];
            const int_r = [e(77), e(82), e(87), e(92), e(97), e(102), e(112), e(117), e(122), e(127), e(132), e(137), e(142), e(147)];
            const suc_r = [e(78), e(83), e(88), e(93), e(98), e(103), e(108), e(118), e(123), e(128), e(133), e(138), e(143), e(148)];
            const dom_r = [e(79), e(84), e(89), e(94), e(99), e(104), e(109), e(114), e(124), e(129), e(134), e(139), e(144), e(149)];
            const aba_r = [e(80), e(85), e(90), e(95), e(100), e(105), e(110), e(115), e(120), e(130), e(135), e(140), e(145), e(150)];
            const nur_r = [e(151), e(156), e(161), e(166), e(171), e(176), e(181), e(186), e(191), e(196), e(206), e(211), e(216), e(221)];
            const chg_r = [e(152), e(157), e(162), e(167), e(172), e(177), e(182), e(187), e(192), e(197), e(202), e(212), e(217), e(222)];
            const end_r = [e(153), e(158), e(163), e(168), e(173), e(178), e(183), e(188), e(193), e(198), e(203), e(208), e(218), e(223)];
            const het_r = [e(154), e(159), e(164), e(169), e(174), e(179), e(184), e(189), e(194), e(199), e(204), e(209), e(214), e(224)];
            const agg_r = [e(155), e(160), e(165), e(170), e(175), e(180), e(185), e(190), e(195), e(200), e(205), e(210), e(215), e(220)];

            const ach_c = [e(2), e(3), e(4), e(5), e(76), e(77), e(78), e(79), e(80), e(151), e(152), e(153), e(154), e(155)];
            const def_c = [e(6), e(8), e(9), e(10), e(81), e(82), e(83), e(84), e(85), e(156), e(157), e(158), e(159), e(160)];
            const ord_c = [e(11), e(12), e(14), e(15), e(86), e(87), e(88), e(89), e(90), e(161), e(162), e(163), e(164), e(165)];
            const exh_c = [e(16), e(17), e(18), e(20), e(91), e(92), e(93), e(94), e(95), e(166), e(167), e(168), e(169), e(170)];
            const aut_c = [e(21), e(22), e(23), e(24), e(96), e(97), e(98), e(99), e(100), e(171), e(172), e(173), e(174), e(175)];
            const aff_c = [e(26), e(27), e(28), e(29), e(30), e(102), e(103), e(104), e(105), e(176), e(177), e(178), e(179), e(180)];
            const int_c = [e(31), e(32), e(33), e(34), e(35), e(106), e(108), e(109), e(110), e(181), e(182), e(183), e(184), e(185)];
            const suc_c = [e(36), e(37), e(38), e(39), e(40), e(111), e(112), e(114), e(115), e(186), e(187), e(188), e(189), e(190)];
            const dom_c = [e(41), e(42), e(43), e(44), e(45), e(116), e(117), e(118), e(120), e(191), e(192), e(193), e(194), e(195)];
            const aba_c = [e(46), e(47), e(48), e(49), e(50), e(121), e(122), e(123), e(124), e(196), e(197), e(198), e(199), e(200)];
            const nur_c = [e(51), e(52), e(53), e(54), e(55), e(126), e(127), e(128), e(129), e(130), e(202), e(203), e(204), e(205)];
            const chg_c = [e(56), e(57), e(58), e(59), e(60), e(131), e(132), e(133), e(134), e(135), e(206), e(208), e(209), e(210)];
            const end_c = [e(61), e(62), e(63), e(64), e(65), e(136), e(137), e(138), e(139), e(140), e(211), e(212), e(214), e(215)];
            const het_c = [e(66), e(67), e(68), e(69), e(70), e(141), e(142), e(143), e(144), e(145), e(216), e(217), e(218), e(220)];
            const agg_c = [e(71), e(72), e(73), e(74), e(75), e(146), e(147), e(148), e(149), e(150), e(221), e(222), e(223), e(224)];

            const count = (arr, val) => arr.filter(item => item === val).length;

            const ach_s = count(ach_r, 'A') + count(ach_c, 'B');
            const def_s = count(def_r, 'A') + count(def_c, 'B');
            const ord_s = count(ord_r, 'A') + count(ord_c, 'B');
            const exh_s = count(exh_r, 'A') + count(exh_c, 'B');
            const out_s = count(aut_r, 'A') + count(aut_c, 'B');
            const aff_s = count(aff_r, 'A') + count(aff_c, 'B');
            const int_s = count(int_r, 'A') + count(int_c, 'B');
            const suc_s = count(suc_r, 'A') + count(suc_c, 'B');
            const dom_s = count(dom_r, 'A') + count(dom_c, 'B');
            const aba_s = count(aba_r, 'A') + count(aba_c, 'B');
            const nur_s = count(nur_r, 'A') + count(nur_c, 'B');
            const chg_s = count(chg_r, 'A') + count(chg_c, 'B');
            const end_s = count(end_r, 'A') + count(end_c, 'B');
            const het_s = count(het_r, 'A') + count(het_c, 'B');
            const agg_s = count(agg_r, 'A') + count(agg_c, 'B');

            let konsistensi = 0;
            if (e(1) == e(151)) konsistensi++; if (e(7) == e(157)) konsistensi++;
            if (e(13) == e(163)) konsistensi++; if (e(19) == e(169)) konsistensi++;
            if (e(25) == e(175)) konsistensi++; if (e(26) == e(101)) konsistensi++;
            if (e(32) == e(107)) konsistensi++; if (e(38) == e(113)) konsistensi++;
            if (e(44) == e(119)) konsistensi++; if (e(50) == e(125)) konsistensi++;
            if (e(51) == e(201)) konsistensi++; if (e(57) == e(207)) konsistensi++;
            if (e(63) == e(213)) konsistensi++; if (e(69) == e(219)) konsistensi++;
            if (e(75) == e(225)) konsistensi++;

            function getWS(ss, type_s) {
                const mapping = {
                    'ACH_s': { 28: 20, 27: 20, 26: 19, 25: 18, 24: 17, 23: 16, 22: 16, 21: 15, 20: 14, 19: 13, 18: 12, 17: 11, 16: 10, 15: 9, 14: 8, 13: 7, 12: 6, 11: 5, 10: 5, 9: 4, 8: 3, 7: 2, 6: 1, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 },
                    'DEF_s': { 22: 20, 21: 19, 20: 18, 19: 18, 18: 18, 17: 17, 16: 16, 15: 15, 14: 14, 13: 13, 12: 11, 11: 11, 10: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 3, 3: 3, 2: 2, 1: 1, 0: 0 },
                    'ORD_s': { 28: 20, 27: 19, 26: 19, 25: 18, 24: 17, 23: 17, 22: 16, 21: 15, 20: 15, 19: 14, 18: 13, 17: 13, 16: 12, 15: 11, 14: 10, 13: 9, 12: 9, 11: 8, 10: 7, 9: 7, 8: 6, 7: 5, 6: 5, 5: 4, 4: 3, 3: 3, 2: 2, 1: 1, 0: 1 },
                    'EXH_s': { 24: 20, 23: 19, 22: 18, 21: 18, 20: 17, 19: 16, 18: 15, 17: 15, 16: 14, 15: 13, 14: 12, 13: 11, 12: 10, 11: 9, 10: 8, 9: 7, 8: 7, 7: 6, 6: 5, 5: 4, 4: 3, 3: 3, 2: 2, 1: 1, 0: 0 },
                    'OUT_s': { 21: 20, 20: 19, 19: 18, 18: 17, 17: 16, 16: 15, 15: 14, 14: 13, 13: 12, 12: 11, 11: 10, 10: 9, 9: 8, 8: 7, 7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 2, 1: 1, 0: 0 },
                    'AFF_s': { 26: 20, 25: 19, 24: 19, 23: 18, 22: 17, 21: 16, 20: 15, 19: 14, 18: 14, 17: 13, 16: 12, 15: 11, 14: 10, 13: 9, 12: 8, 11: 8, 10: 7, 9: 6, 8: 5, 7: 4, 6: 3, 5: 3, 4: 2, 3: 1, 2: 1, 1: 0 },
                    'INT_s': { 28: 20, 27: 20, 26: 19, 25: 18, 24: 17, 23: 17, 22: 16, 21: 15, 20: 14, 19: 14, 18: 13, 17: 12, 16: 11, 15: 10, 14: 9, 13: 8, 12: 7, 11: 7, 10: 6, 9: 5, 8: 4, 7: 4, 6: 3, 5: 2, 4: 1, 3: 1, 2: 0, 1: 0 },
                    'SUC_s': { 27: 20, 26: 19, 25: 19, 24: 18, 23: 17, 22: 17, 21: 16, 20: 15, 19: 15, 18: 14, 17: 13, 16: 13, 15: 12, 14: 11, 13: 10, 12: 9, 11: 9, 10: 8, 9: 7, 8: 7, 7: 6, 6: 5, 5: 4, 4: 4, 3: 3, 2: 2, 1: 1, 0: 1 },
                    'DOM_s': { 25: 20, 24: 20, 23: 19, 22: 18, 21: 17, 20: 17, 19: 16, 18: 15, 17: 14, 16: 14, 15: 13, 14: 12, 13: 11, 12: 10, 11: 9, 10: 8, 9: 8, 8: 7, 7: 6, 6: 5, 5: 5, 4: 4, 3: 3, 2: 2, 1: 1, 0: 0 },
                    'ABA_s': { 29: 20, 28: 19, 27: 18, 26: 18, 25: 17, 24: 16, 23: 15, 22: 15, 21: 14, 20: 13, 19: 13, 18: 12, 17: 11, 16: 10, 15: 9, 14: 8, 13: 8, 12: 7, 11: 6, 10: 5, 9: 5, 8: 4, 7: 3, 6: 2, 5: 2, 4: 1, 3: 0, 2: 0, 1: 0 },
                    'NUR_s': { 30: 20, 29: 19, 28: 18, 27: 18, 26: 17, 25: 16, 24: 16, 23: 15, 22: 14, 21: 14, 20: 13, 19: 12, 18: 12, 17: 11, 16: 10, 15: 10, 14: 9, 13: 8, 12: 8, 11: 7, 10: 6, 9: 6, 8: 5, 7: 4, 6: 4, 5: 3, 4: 2, 3: 2, 2: 1, 1: 0, 0: 0 },
                    'CHG_s': { 27: 20, 26: 19, 25: 18, 24: 18, 23: 17, 22: 16, 21: 16, 20: 15, 19: 14, 18: 13, 17: 13, 16: 12, 15: 11, 14: 10, 13: 9, 12: 9, 11: 8, 10: 7, 9: 6, 8: 6, 7: 5, 6: 4, 5: 3, 4: 3, 3: 2, 2: 1, 1: 1, 0: 0 },
                    'END_s': { 30: 20, 29: 19, 28: 18, 27: 17, 26: 17, 25: 16, 24: 16, 23: 15, 22: 14, 21: 14, 20: 13, 19: 13, 18: 12, 17: 12, 16: 11, 15: 10, 14: 9, 13: 9, 12: 8, 11: 7, 10: 7, 9: 6, 8: 6, 7: 5, 6: 4, 5: 4, 4: 3, 3: 3, 2: 2, 1: 1, 0: 1 },
                    'HET_s': { 26: 20, 25: 19, 24: 19, 23: 18, 22: 18, 21: 17, 20: 17, 19: 16, 18: 16, 17: 15, 16: 15, 15: 14, 14: 14, 13: 13, 12: 12, 11: 12, 10: 11, 9: 11, 8: 10, 7: 9, 6: 9, 5: 8, 4: 8, 3: 7, 2: 7, 1: 6, 0: 5 },
                    'AGG_s': { 27: 20, 26: 19, 25: 18, 24: 18, 23: 17, 22: 16, 21: 16, 20: 15, 19: 14, 18: 14, 17: 13, 16: 12, 15: 12, 14: 11, 13: 10, 12: 9, 11: 9, 10: 8, 9: 7, 8: 7, 7: 6, 6: 5, 5: 5, 4: 4, 3: 3, 2: 3, 1: 2, 0: 1 },
                };
                return mapping[type_s][ss] !== undefined ? mapping[type_s][ss] : null;
            }

            const ACH = getWS(ach_s, 'ACH_s');
            const DOM = getWS(dom_s, 'DOM_s');
            const AUT = getWS(out_s, 'OUT_s');
            const EXH = getWS(exh_s, 'EXH_s');
            const AFF = getWS(aff_s, 'AFF_s');
            const DEF = getWS(def_s, 'DEF_s');
            const ORD = getWS(ord_s, 'ORD_s');

            // --- Menghitung Skor Akhir ---
            result[1][0] = getScore(IQ, iqCriteria);
            result[1][1] = getScore(CFIT2, cfitCriteria);
            result[1][2] = getScore((CFIT1 + CFIT4) / 2, cfitCriteria);
            result[1][3] = getScore(CFIT3, cfitCriteria);
            result[1][4] = getScore(tkd3, tkd3Criteria);
            result[1][5] = getScore(tkd6, tkd6Criteria);
            result[1][6] = getScore(ACH, achCriteria);
            result[1][7] = getScore((DOM + ACH + AUT) / 3, achCriteria);
            result[1][8] = getScore(EXH, achCriteria);
            result[1][9] = getScore(AFF, achCriteria);
            result[1][10] = getScore(DEF, achCriteria);
            result[1][11] = getScore(ORD, achCriteria);
            result[1][12] = getScore((DOM + ACH + AUT) / 3, achCriteria);
            result[1][13] = getScore(AUT, achCriteria);

            // Mengganti nilai result jika ada di hasil10
            for (let i = 0; i <= 13; i++) {
                if (hasil10[1][i] && parseInt(hasil10[1][i]) !== 0) {
                    result[1][i] = parseInt(hasil10[1][i]);
                }
            }
            
            // Membuat array berindeks untuk diurutkan
            const indexed_array = result[1].map((value, index) => ({ value, index }));

            // =================================================================
            // POPULASI DATA KE HTML (MANIPULASI DOM)
            // =================================================================

            // --- Mengisi Info Personal ---
            document.getElementById('nama').textContent = nama[0][0];
            document.getElementById('jenis_kelamin').textContent = nama[0][8];
            document.getElementById('usia').textContent = nama[0][4];
            document.getElementById('pendidikan').textContent = `${nama[2][6]} ${nama[2][1]}`;
            document.getElementById('posisi').textContent = result[0][0];
            document.getElementById('tanggal_pemeriksaan').textContent = result[0][1] || '';
            document.getElementById('tujuan_pemeriksaan').textContent = result[0][2] || '';
            document.getElementById('signature-date').textContent += result[0][1] || '';

            // --- Mengisi Tabel Aspek Psikologis ---
            const aspekBody = document.getElementById('aspek-psikologis-body');
            const aspekData = [
                { header: 'KEMAMPUAN' },
                { title: 'Kemampuan Umum', desc: 'Mampu menemukan solusi untuk berbagai masalah dengan efektif.', scoreIndex: 0 },
                { title: 'Daya Tangkap Visual', desc: 'Cepat mengenali pola dan perbedaan di lingkungan sekitar.', scoreIndex: 1 },
                { title: 'Kemampuan Berpikir Logis', desc: 'Mampu membuat keputusan berdasarkan alasan yang jelas dalam situasi tertentu.', scoreIndex: 2 },
                { title: 'Kemampuan Berpikir Abstrak', desc: 'Mampu melihat hubungan antara berbagai hal dan memahami konsekuensi dari tindakan.', scoreIndex: 3 },
                { title: 'Penalaran Verbal', desc: 'Mampu berkomunikasi dengan jelas dan efektif dalam interaksi.', scoreIndex: 4 },
                { title: 'Penalaran Numerik', desc: 'Kemampuan memahami proses hitung dan berpikir teratur', scoreIndex: 5 },
                { header: 'KEPRIBADIAN' },
                { title: 'Hasrat Berprestasi', desc: 'Keinginan untuk mencapai dan meningkatkan prestasi', scoreIndex: 6 },
                { title: 'Daya Tahan Stress', desc: 'Kemampuan mempertahankan kinerja', scoreIndex: 7 },
                { title: 'Kepercayaan Diri', desc: 'Adanya keyakinan terhadap kemampuan yang dimiliki', scoreIndex: 8 },
                { title: 'Relasi Sosial', desc: 'Kemampuan membina hubungan dengan orang lain', scoreIndex: 9 },
                { title: 'Kerjasama', desc: 'Kemampuan bekerjasama individu atau berkelompok', scoreIndex: 10 },
                { header: 'SIKAP KERJA' },
                { title: 'Sistematika Kerja', desc: 'Kemampuan membuat perencanaan & prioritas kerja', scoreIndex: 11 },
                { title: 'Inisiatif', desc: 'Kemampuan mengambil tindakan yang diperlukan', scoreIndex: 12 },
                { title: 'Kemandirian', desc: 'Kemampuan mengambil sikap dan bekerja sendiri', scoreIndex: 13 },
            ];

            aspekData.forEach(item => {
                const row = document.createElement('tr');
                if (item.header) {
                    row.innerHTML = `<td colspan="12" class="section-header">${item.header}</td>`;
                } else {
                    let cells = `<td>${item.title}</td><td>${item.desc}</td>`;
                    const score = result[1][item.scoreIndex];
                    for (let i = 1; i <= 10; i++) {
                        if (score === i) {
                            cells += `<td class="highlight">✔</td>`;
                        } else {
                            cells += `<td></td>`;
                        }
                    }
                    row.innerHTML = cells;
                }
                aspekBody.appendChild(row);
            });

            // --- Mengisi Halaman Kedua ---
            document.getElementById('iq-value').textContent = `Intelligence Quotient / IQ = ${IQ}`;

            // --- Kelebihan ---
            const strengthsList = document.getElementById('strengths-list');
            indexed_array.sort((a, b) => b.value - a.value); // Urutkan dari terbesar
            for (let i = 0; i < 3; i++) {
                const value = (hasil10[2] && hasil10[2][i] && hasil10[2][i].trim()) ? hasil10[2][i].trim() : kekuatan_kelemahan[indexed_array[i].index].teks2;
                strengthsList.innerHTML += `<li>${value}</li>`;
            }

            // --- Kelemahan ---
            const weaknessesList = document.getElementById('weaknesses-list');
            indexed_array.sort((a, b) => a.value - b.value); // Urutkan dari terkecil
            for (let i = 0; i < 3; i++) {
                const value = (hasil10[3] && hasil10[3][i] && hasil10[3][i].trim()) ? hasil10[3][i].trim() : kekuatan_kelemahan[indexed_array[i].index].teks3;
                weaknessesList.innerHTML += `<li>${value}</li>`;
            }

            // --- Rekomendasi ---
            const recommendationsList = document.getElementById('recommendations-list');
            indexed_array.sort((a, b) => b.value - a.value); // Urutkan dari terbesar lagi
            for (let i = 0; i < 3; i++) {
                const value = (hasil10[4] && hasil10[4][i] && hasil10[4][i].trim()) ? hasil10[4][i].trim() : kekuatan_kelemahan[indexed_array[i].index].teks5;
                recommendationsList.innerHTML += `<li>${value}</li>`;
            }

            // --- Arah Minat ---
            const minatList = document.getElementById('minat-list');
            const sortedMinat = Object.entries(totals_rmib).sort(([, a], [, b]) => a - b);
            const smallestTotals = sortedMinat.slice(0, 5);

            smallestTotals.forEach((item, j) => {
                const key = item[0];
                const minatItem = minat.find(m => m.singkatan === key);
                if (minatItem) {
                    const arahMinatValue = (hasil10[5] && hasil10[5][j] && hasil10[5][j].trim()) ? hasil10[5][j].trim().toUpperCase() : minatItem.arah_minat;
                    const keteranganValue = (hasil10[6] && hasil10[6][j] && hasil10[6][j].trim()) ? hasil10[6][j].trim() : minatItem.keterangan_minat;
                    minatList.innerHTML += `<li><strong>${arahMinatValue}</strong><br>Keterangan: ${keteranganValue}</li>`;
                }
            });

            // --- Fungsi Download PDF ---
            document.getElementById('downloadBtn').onclick = function() {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'mm', 'a4');
                const imgWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                const noDownloadElements = document.querySelectorAll('.no-download');
                noDownloadElements.forEach(el => el.style.display = 'none');
                
                const headerImgSrc = 'https://placehold.co/210x30/5F4EDA/FFFFFF?text=Header+Laporan';
                const footerImgSrc = 'https://placehold.co/210x30/5F4EDA/FFFFFF?text=Footer+Laporan';

                const processPage = (contentId, isFirstPage) => {
                    return new Promise((resolve) => {
                         if (!isFirstPage) {
                            doc.addPage();
                        }
                        
                        const headerImg = new Image();
                        headerImg.crossOrigin = "anonymous";
                        headerImg.src = headerImgSrc;
                        headerImg.onload = () => {
                            doc.addImage(headerImg, 'PNG', 0, 0, imgWidth, 30);
                            
                            const content = document.getElementById(contentId);
                            html2canvas(content, { scale: 2, useCORS: true }).then(canvas => {
                                const imgData = canvas.toDataURL('image/png');
                                const contentHeight = (canvas.height * imgWidth) / canvas.width;
                                doc.addImage(imgData, 'PNG', 0, 30, imgWidth, contentHeight);

                                const footerImg = new Image();
                                footerImg.crossOrigin = "anonymous";
                                footerImg.src = footerImgSrc;
                                footerImg.onload = () => {
                                    doc.addImage(footerImg, 'PNG', 0, pageHeight - 30, imgWidth, 30);
                                    resolve();
                                };
                            });
                        };
                    });
                };

                processPage('downloadContent1', true)
                    .then(() => processPage('downloadContent2', false))
                    .then(() => {
                        doc.save('profil_pemeriksaan_psikologis.pdf');
                        noDownloadElements.forEach(el => el.style.display = '');
                    });
            };
        };