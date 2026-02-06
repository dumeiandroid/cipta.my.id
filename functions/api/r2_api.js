export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const action = url.searchParams.get("action"); 

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Custom-Auth",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- AKSI GET: LIST DATA (DENGAN DUKUNGAN FOLDER & CURSOR) ---
    if (request.method === "GET") {
      const folder = url.searchParams.get("folder");
      const cursor = url.searchParams.get("cursor");
      
      const options = { limit: 1000 };
      if (folder) options.prefix = folder.endsWith('/') ? folder : folder + '/';
      if (cursor) options.cursor = cursor;

      const list = await env.MY_BUCKET.list(options);
      
      const files = list.objects.map(obj => ({
        key: obj.key,
        size: obj.size,
        url: `https://fam.cipta.my.id/${obj.key}`,
        uploaded: obj.uploaded
      }));

      // --- LOGIKA AGAR HTML LAMA TETAP JALAN ---
      // Jika HTML lama memanggil (tanpa folder & tanpa cursor), kirim format Array lama
      if (!folder && !cursor) {
        return new Response(JSON.stringify(files), { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      // Jika HTML baru memanggil (pakai folder/cursor), kirim format Object lengkap
      return new Response(JSON.stringify({
        files: files,
        nextCursor: list.truncated ? list.cursor : null
      }), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // --- AKSI POST: UPLOAD, RENAME, DELETE (TIDAK BERUBAH) ---
    if (request.method === "POST") {
      const authHeader = request.headers.get("X-Custom-Auth");
      
      if (action === "upload") {
        if (authHeader !== "admin") throw new Error("Unauthorized");
        
        const formData = await request.formData();
        const file = formData.get('file');
        const customName = formData.get('customName');
        const folderTarget = formData.get('folder'); // Opsional: Upload ke folder tertentu
        
        let fileName = customName || `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        if (folderTarget) {
          const prefix = folderTarget.endsWith('/') ? folderTarget : folderTarget + '/';
          fileName = prefix + fileName;
        }

        await env.MY_BUCKET.put(fileName, file.stream(), {
          httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000' },
        });
        
        return new Response(JSON.stringify({ success: true, key: fileName }), { headers: corsHeaders });
      }

      if (action === "rename") {
        const { oldKey, newKey, auth } = await request.json();
        if (auth !== "admin" && authHeader !== "admin") throw new Error("Unauthorized");

        const obj = await env.MY_BUCKET.get(oldKey);
        if (!obj) return new Response(JSON.stringify({ error: "File tidak ditemukan" }), { status: 404, headers: corsHeaders });

        await env.MY_BUCKET.put(newKey, obj.body, { httpMetadata: obj.httpMetadata });
        await env.MY_BUCKET.delete(oldKey);
        
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }

      if (action === "delete") {
        const { key, auth } = await request.json();
        if (auth !== "admin" && authHeader !== "admin") throw new Error("Unauthorized");

        await env.MY_BUCKET.delete(key);
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }
    }

    return new Response("Action Not Found", { status: 404 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: e.message === "Unauthorized" ? 403 : 500, 
      headers: corsHeaders 
    });
  }
}