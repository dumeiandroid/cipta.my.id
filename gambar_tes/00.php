<?php
$directory = 'apm'; // Folder yang berisi file JPG
$files = glob($directory . '/*.jpg'); // Mendapatkan semua file JPG di folder

foreach ($files as $file) {
    $filename = basename($file); // Mendapatkan nama file tanpa path
    $newFilename = strtolower(str_replace(' ', '_', $filename)); // Mengganti spasi dengan _ dan mengubah huruf menjadi kecil
    
    // Jika nama baru berbeda dari nama lama, lakukan penggantian
    if ($filename !== $newFilename) {
        $newFilePath = $directory . '/' . $newFilename; // Path baru untuk file
        rename($file, $newFilePath); // Mengganti nama file
        echo "File $filename telah diubah menjadi $newFilename.<br>";
    }
}
?>