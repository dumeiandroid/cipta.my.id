/**
 * Custom Visit Tracker — Lidan Psikologi
 * Letakkan sebelum </body>:
 * <script src="https://cipta.my.id/tracker.js"></script>
 *
 * Logika:
 * - Kunjungan baru hari ini  → POST ke API
 * - Kunjungan berulang       → PUT update counter (x_03)
 * - Setiap URL dicatat terpisah
 * - Waktu menggunakan zona lokal (WIB) bukan UTC
 */
(function () {
    const API_BASE_URL = "https://lidan-co-id.pages.dev/api/contacts";
    const TABLE_NAME   = "kunjungan";
    const BASE_LS_KEY  = "visit_tracker_";
    const QUERY_PARAM  = `tabel=${TABLE_NAME}`;

    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return Math.abs(hash).toString(16);
    }

    function getTodayDate() {
        const now = new Date();
        const year  = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day   = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getCurrentTimestamp() {
        const now    = new Date();
        const year   = now.getFullYear();
        const month  = String(now.getMonth() + 1).padStart(2, '0');
        const day    = String(now.getDate()).padStart(2, '0');
        const hour   = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    async function trackVisit() {
        const currentUrl      = window.location.href;
        const LOCAL_STORAGE_KEY = BASE_LS_KEY + simpleHash(currentUrl);
        const today           = getTodayDate();

        let storedData = null;
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
            storedData = raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error("❌ [TRACKER] Gagal parse Local Storage:", e);
        }

        const isNewVisit = !storedData || storedData.date !== today;
        console.log(`[TRACKER] URL: ${currentUrl}`);
        console.log(`[TRACKER] Kunjungan baru hari ini: ${isNewVisit ? 'YA' : 'TIDAK'}`);

        if (isNewVisit) {
            // ── KUNJUNGAN BARU → POST ──────────────────────────────
            const ts = getCurrentTimestamp();
            try {
                const response = await fetch(`${API_BASE_URL}?${QUERY_PARAM}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Table-Name': TABLE_NAME,
                    },
                    body: JSON.stringify({
                        x_01: currentUrl,
                        x_02: '1',
                        x_03: '1',
                        x_20: ts,
                        x_19: ts,
                    })
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const result = await response.json();
                const newId  = result.id_x || (result.data ? result.data.id_x : null);

                if (newId) {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
                        id_x        : newId,
                        x_02        : '1',
                        x_03        : '1',
                        date        : today,
                        initial_url : currentUrl,
                        x_19        : ts,
                        ls_key_hash : simpleHash(currentUrl)
                    }));
                    console.log(`✅ [TRACKER] POST berhasil. ID: ${newId}`);
                } else {
                    console.error("⚠️ [TRACKER] POST berhasil tapi id_x tidak ada di respons.");
                }
            } catch (error) {
                console.error("❌ [TRACKER] Gagal POST:", error);
            }

        } else {
            // ── KUNJUNGAN BERULANG → PUT ───────────────────────────
            const idToUpdate      = storedData.id_x;
            const newVisitCount   = (parseInt(storedData.x_03, 10) || 0) + 1;
            const newTimestamp    = getCurrentTimestamp();

            console.log(`[TRACKER] Update kunjungan ke-${newVisitCount} untuk id_x: ${idToUpdate}`);

            storedData.x_03 = String(newVisitCount);
            storedData.x_19 = newTimestamp;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));

            try {
                const putResponse = await fetch(`${API_BASE_URL}/${idToUpdate}?${QUERY_PARAM}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Table-Name': TABLE_NAME,
                    },
                    body: JSON.stringify({
                        x_03: storedData.x_03,
                        x_19: storedData.x_19,
                    })
                });

                if (!putResponse.ok) throw new Error(`HTTP ${putResponse.status}`);
                console.log(`✅ [TRACKER] PUT berhasil. Counter: ${newVisitCount}`);
            } catch (error) {
                console.error("❌ [TRACKER] Gagal PUT:", error);
            }
        }
    }

    trackVisit();
})();
