<?php
$folder = 'cfit/'; // Ganti dengan path folder yang sesuai

// Pastikan folder ada
if (!is_dir($folder)) {
    die("Folder tidak ditemukan.");
}

// Ambil semua file PNG dalam folder
$files = glob($folder . '*.png');

foreach ($files as $file) {
    // Membaca file PNG
    $image = imagecreatefrompng($file);
    
    if ($image !== false) {
        // Mengubah nama file untuk JPG
        $newFile = preg_replace('/\.png$/', '.jpg', $file);
        
        // Menyimpan file sebagai JPG
        imagejpeg($image, $newFile, 100);
        
        // Menghapus gambar dari memori
        imagedestroy($image);
        
        // Menghapus file PNG jika diperlukan
        // unlink($file);
        
        echo "Diubah: $file menjadi $newFile\n";
    } else {
        echo "Gagal membaca: $file\n";
    }
}
?>