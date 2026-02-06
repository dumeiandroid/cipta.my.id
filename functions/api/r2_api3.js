export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // --- CONFIGURASI EKSTENSI (JSON) ---
    // Tambahkan atau edit di sini jika ada format baru di masa depan
    const EXT_MAP = {
      "image": ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
      "video": ['mp4', 'webm', 'mkv', 'mov'],
      "audio": ['mp3', 'wav', 'ogg', 'm4a', 'aac'],
      "doc":   ['pdf', 'doc', 'docx'],
      "txt":   ['txt'],
      "xls":   ['xls', 'xlsx', 'csv']
    };

    try {
      // --- AKSI GET: LIST DATA ---
      if (request.method === "GET") {
        const action = url.searchParams.get("action");
        const type = url.searchParams.get("type"); // Parameter baru untuk filter

        if (action === "list") {
          // Tetap menarik hingga 1000 file agar kompatibel dengan kode lama
          const list = await env.MY_BUCKET.list({ limit: 1000 });
          let objects = list.objects;

          // LOGIKA FILTER SERVER-SIDE:
          // Jika parameter 'type' ada, kita saring datanya sebelum dikirim
          if (type && EXT_MAP[type]) {
            objects = objects.filter(obj => {
              const ext = obj.key.split('.').pop().toLowerCase();
              return EXT_MAP[type].includes(ext);
            });
          }

          const files = objects.map(obj => ({
            key: obj.key,
            size: obj.size,
            // Sesuaikan domain jika perlu, atau gunakan URL publik R2 Anda
            url: `https://fam.cipta.my.id/${obj.key}`, 
            uploaded: obj.uploaded
          }));

          return new Response(JSON.stringify(files), { 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          });
        }
      }

      // --- AKSI POST: UPLOAD, DELETE, RENAME ---
      if (request.method === "POST") {
        const formData = await request.formData();
        const action = formData.get("action");

        // 1. Aksi Hapus (Tetap Sama)
        if (action === "delete") {
          const key = formData.get("key");
          await env.MY_BUCKET.delete(key);
          return new Response("Deleted", { headers: corsHeaders });
        }

        // 2. Aksi Rename (Tetap Sama)
        if (action === "rename") {
          const oldKey = formData.get("oldKey");
          const newKey = formData.get("newKey");
          const object = await env.MY_BUCKET.get(oldKey);
          if (object) {
            await env.MY_BUCKET.put(newKey, object.body, {
              httpMetadata: object.httpMetadata,
              customMetadata: object.customMetadata
            });
            await env.MY_BUCKET.delete(oldKey);
            return new Response("Renamed", { headers: corsHeaders });
          }
        }

        // 3. Aksi Upload (Tetap Sama)
        if (action === "upload") {
          const file = formData.get("file");
          const key = file.name;
          await env.MY_BUCKET.put(key, file.stream(), {
            httpMetadata: { contentType: file.type }
          });
          return new Response("Uploaded", { headers: corsHeaders });
        }
      }

      return new Response("Invalid Request", { status: 400, headers: corsHeaders });

    } catch (e) {
      return new Response(e.message, { status: 500, headers: corsHeaders });
    }
  }
};