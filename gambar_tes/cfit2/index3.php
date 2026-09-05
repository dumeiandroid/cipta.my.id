<?php
$dir = './';
$files = scandir($dir);
$file_perubahan = [];

// Daftar kata default yang akan diubah huruf depannya jadi KAPITAL jika di awal nama file
$kata_target = ['contoh', 'soal', 'tugas', 'materi', 'bab'];

foreach ($files as $file) {
    // Lewati folder dan file script ini sendiri
    if ($file === '.' || $file === '..' || $file === basename(__FILE__)) continue;

    $info = pathinfo($file);
    $filename = $info['filename']; 
    $extension = isset($info['extension']) ? '.' . $info['extension'] : '';

    $filename_baru = $filename;

    foreach ($kata_target as $kata) {
        // Cek apakah nama file diawali kata target (secara case-insensitive / huruf kecil/besar sama saja)
        if (preg_match('/^(' . preg_quote($kata, '/') . ')([\s\._\-].*|$)/i', $filename, $matches)) {
            // Ubah huruf pertama kata menjadi kapital (contoh -> Contoh, soal -> Soal)
            $kata_kapital = ucfirst(strtolower($matches[1]));
            
            // Gabungkan kembali nama file
            $filename_baru = $kata_kapital . $matches[2];
            break; 
        }
    }

    $nama_baru = $filename_baru . $extension;

    // Masukkan ke daftar jika nama file mengalami perubahan
    if ($nama_baru !== $file) {
        $file_perubahan[$file] = $nama_baru;
    }
}

// Proses eksekusi ubah nama file saat tombol diklik
$pesan_sukses = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['eksekusi'])) {
    foreach ($file_perubahan as $lama => $baru) {
        if (rename($dir . $lama, $dir . $baru)) {
            $pesan_sukses[] = "Berhasil: <b>" . htmlspecialchars($lama) . "</b> $\rightarrow$ <b>" . htmlspecialchars($baru) . "</b>";
        } else {
            $pesan_sukses[] = "Gagal mengubah: <b>" . htmlspecialchars($lama) . "</b>";
        }
    }
    // Kosongkan daftar setelah selesai
    $file_perubahan = [];
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Ubah Huruf Awal Kapital (Soal / Contoh)</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 30px; line-height: 1.5; }
        table { border-collapse: collapse; width: 100%; max-width: 650px; margin-bottom: 20px; }
        th, td { border: 1px solid #ccc; padding: 10px 14px; text-align: left; }
        th { background-color: #f4f4f4; }
        .btn-submit { background-color: #007bff; color: white; border: none; padding: 10px 18px; cursor: pointer; font-size: 14px; border-radius: 4px; }
        .btn-submit:hover { background-color: #0056b3; }
        .success { color: green; background-color: #e8f8e8; padding: 10px; border-radius: 4px; margin-bottom: 20px; border: 1px solid #b2e2b2; }
    </style>
</head>
<body>

    <h2>Konfirmasi Perubahan Huruf Depan Nama File</h2>

    <?php if (!empty($pesan_sukses)): ?>
        <div class="success">
            <h3>Hasil Perubahan Nama:</h3>
            <ul>
                <?php foreach ($pesan_sukses as $msg): ?>
                    <li><?= $msg ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <?php if (!empty($file_perubahan)): ?>
        <p>File berikut terdeteksi diawali kata (contoh, soal, dll) dalam huruf kecil:</p>
        <table>
            <tr>
                <th>Nama File Lama</th>
                <th>Nama File Baru</th>
            </tr>
            <?php foreach ($file_perubahan as $lama => $baru): ?>
            <tr>
                <td><?= htmlspecialchars($lama) ?></td>
                <td><b style="color: #007bff;"><?= htmlspecialchars($baru) ?></b></td>
            </tr>
            <?php endforeach; ?>
        </table>

        <form method="POST">
            <button type="submit" name="eksekusi" class="btn-submit" onclick="return confirm('Apakah Anda yakin ingin mengubah nama file-file tersebut?')">
                Proses Ubah Nama File
            </button>
        </form>

    <?php else: ?>
        <p><i>Tidak ditemukan file yang perlu diubah (semua kata 'soal' atau 'contoh' di awal nama file sudah diawali huruf besar).</i></p>
    <?php endif; ?>

</body>
</html>