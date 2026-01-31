<?php
// Tentukan kata yang dicari dan kata penggantinya
$search  = 'gambar/';
$replace = 'https://cipta.my.id/gambar_tes/';

// Mengambil semua file dengan ekstensi .txt di direktori saat ini
$files = glob("*.txt");

$count = 0;

foreach ($files as $file) {
    // Membaca isi file
    $content = file_get_contents($file);

    // Cek apakah kata yang dicari ada di dalam file tersebut
    if (strpos($content, $search) !== false) {
        // Mengganti teks
        $updatedContent = str_replace($search, $replace, $content);

        // Menulis kembali isi file yang sudah diubah
        file_put_contents($file, $updatedContent);
        
        echo "Berhasil memperbarui: $file <br>";
        $count++;
    }
}

if ($count === 0) {
    echo "Tidak ada file yang perlu diubah.";
} else {
    echo "Total $count file berhasil diperbarui.";
}
?>