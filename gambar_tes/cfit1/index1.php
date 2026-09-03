<?php
$dir = __DIR__;
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Fungsi untuk mengecek apakah file perlu ditambahkan ekstensi .jpg
function shouldAddExtension($filename) {
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    
    // 1. Jika sama sekali tidak punya ekstensi (kosong)
    if (empty($ext)) {
        return true;
    }
    
    // 2. Jika ekstensi yang terdeteksi adalah huruf tunggal dari 'a' sampai 'e' (misal: .a, .b, .c, .d, .e)
    // karena ini bagian dari nama file asli, maka dianggap belum punya ekstensi gambar.
    if (preg_match('/^[a-e]$/', $ext)) {
        return true;
    }
    
    return false;
}

// 1. PROSES UBAH NAMA JIKA DIKONFIRMASI
if ($action == 'execute') {
    if ($handle = opendir($dir)) {
        echo "<h3>Hasil Eksekusi Perubahan Nama:</h3><ul>";
        while (false !== ($file = readdir($handle))) {
            if ($file != "." && $file != "..") {
                $filePath = $dir . DIRECTORY_SEPARATOR . $file;
                if (is_file($filePath) && $file != basename(__FILE__)) {
                    
                    if (shouldAddExtension($file)) {
                        $newFilePath = $filePath . '.jpg';
                        if (rename($filePath, $newFilePath)) {
                            echo "<li>Berhasil: <b>$file</b> menjadi <b>{$file}.jpg</b></li>";
                        } else {
                            echo "<li style='color:red;'>Gagal mengubah: $file</li>";
                        }
                    }
                }
            }
        }
        closedir($handle);
    }
    echo "</ul><p><a href='".basename(__FILE__)."'>Kembali</a></p>";
    exit;
}

// 2. TAMPILKAN PRATINJAU FILE YANG AKAN DIUBAH
$detectedFiles = [];
if ($handle = opendir($dir)) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != "..") {
            $filePath = $dir . DIRECTORY_SEPARATOR . $file;
            if (is_file($filePath) && $file != basename(__FILE__)) {
                if (shouldAddExtension($file)) {
                    $detectedFiles[] = $file;
                }
            }
        }
    }
    closedir($handle);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Konfirmasi Tambah Ekstensi Gambar</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 30px;">
    <h2>Pratinjau File Tanpa Ekstensi Valid</h2>
    <?php if (empty($detectedFiles)): ?>
        <p style="color: green;">Tidak ada file yang perlu diubah. Semua file sudah memiliki ekstensi yang valid.</p>
    <?php else: ?>
        <p>File berikut terdeteksi berakhiran huruf <b>a s.d. e</b> (seperti <i>2.1.a</i> atau <i>2.4.e</i>) dan akan ditambahkan <b>.jpg</b> di belakangnya:</p>
        <ul>
            <?php foreach ($detectedFiles as $df): ?>
                <li><?php echo htmlspecialchars($df); ?> &rarr; <b><?php echo htmlspecialchars($df); ?>.jpg</b></li>
            <?php endforeach; ?>
        </ul>
        <br>
        <a href="?action=execute" onclick="return confirm('Yakin ingin mengubah nama file-file di atas?');" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Konfirmasi dan Ubah Nama</a>
    <?php endif; ?>
</body>
</html>