<?php
$dir = './';
$files = scandir($dir);
$file_perubahan = [];

// Scan file yang memenuhi kriteria
foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;

    $info = pathinfo($file);
    $filename = $info['filename']; 
    $extension = isset($info['extension']) ? '.' . $info['extension'] : '';

    // Hapus titik jika diikuti 1 huruf di akhir nama file
    $filename_baru = preg_replace('/\.([a-zA-Z])$/', '$1', $filename);
    $nama_baru = $filename_baru . $extension;

    if ($nama_baru !== $file) {
        $file_perubahan[$file] = $nama_baru;
    }
}

// Proses jika tombol 'eksekusi' ditekan
$pesan_sukses = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['eksekusi'])) {
    foreach ($file_perubahan as $lama => $baru) {
        if (rename($dir . $lama, $dir . $baru)) {
            $pesan_sukses[] = "Berhasil: <b>$lama</b> menjadi <b>$baru</b>";
        } else {
            $pesan_sukses[] = "Gagal mengubah: <b>$lama</b>";
        }
    }
    // Kosongkan array perubahan setelah berhasil diubah
    $file_perubahan = [];
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Rename File Utility</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 30px; }
        table { border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; }
        th { background-color: #f4f4f4; }
        .btn-submit { background-color: #28a745; color: white; border: none; padding: 10px 15px; cursor: pointer; font-size: 14px; border-radius: 4px; }
        .btn-submit:hover { background-color: #218838; }
        .success { color: green; margin-bottom: 15px; }
    </style>
</head>
<body>

    <h2>Konfirmasi Perubahan Nama File</h2>

    <?php if (!empty($pesan_sukses)): ?>
        <div class="success">
            <h3>Hasil Eksekusi:</h3>
            <ul>
                <?php foreach ($pesan_sukses as $msg): ?>
                    <li><?= $msg ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <?php if (!empty($file_perubahan)): ?>
        <p>Daftar file yang terdeteksi perlu diubah:</p>
        <table>
            <tr>
                <th>Nama Lama</th>
                <th>Nama Baru</th>
            </tr>
            <?php foreach ($file_perubahan as $lama => $baru): ?>
            <tr>
                <td><?= htmlspecialchars($lama) ?></td>
                <td><b><?= htmlspecialchars($baru) ?></b></td>
            </tr>
            <?php endforeach; ?>
        </table>

        <form method="POST">
            <button type="submit" name="eksekusi" class="btn-submit" onclick="return confirm('Apakah Anda yakin ingin mengubah nama file-file tersebut?')">
                Proses Ubah Nama File
            </button>
        </form>

    <?php else: ?>
        <p><i>Tidak ada file yang perlu diubah di folder ini.</i></p>
    <?php endif; ?>

</body>
</html>