<?php
// Tentukan path folder berdasarkan struktur direktori saat ini (menggunakan cfit1)
$dirCfit = __DIR__ . DIRECTORY_SEPARATOR . 'cfit';
$dirCfit1 = __DIR__ . DIRECTORY_SEPARATOR . 'cfit1';

// Fungsi untuk mendapatkan semua file gambar di dalam folder beserta variasi ekstensinya
function getFilesFromFolder($dir) {
    $fileList = [];
    if (is_dir($dir)) {
        if ($handle = opendir($dir)) {
            while (false !== ($file = readdir($handle))) {
                if ($file != "." && $file != "..") {
                    $filePath = $dir . DIRECTORY_SEPARATOR . $file;
                    if (is_file($filePath)) {
                        $pathInfo = pathinfo($file);
                        $fileNameOnly = $pathInfo['filename'];
                        $fileList[$fileNameOnly] = [
                            'filename' => $file,
                            'extension' => isset($pathInfo['extension']) ? strtolower($pathInfo['extension']) : ''
                        ];
                    }
                }
            }
            closedir($handle);
        }
    }
    return $fileList;
}

$filesCfit = getFilesFromFolder($dirCfit);
$filesCfit1 = getFilesFromFolder($dirCfit1);

// Urutkan berdasarkan nama file agar rapi
ksort($filesCfit);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Pemeriksaan dan Perbandingan Gambar CFIT & CFIT1</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f9f9f9; color: #333; }
        h2 { border-bottom: 2px solid #ccc; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; background: #fff; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: center; vertical-align: middle; }
        th { background-color: #007bff; color: white; }
        img { max-width: 250px; max-height: 250px; height: auto; border: 1px solid #ccc; padding: 4px; background: #fff; border-radius: 4px; }
        .missing { color: #d9534f; font-style: italic; font-weight: bold; }
        .filename-tag { font-weight: bold; margin-bottom: 5px; display: block; font-size: 14px; color: #555; }
    </style>
</head>
<body>

    <h2>Perbandingan Gambar: Folder <code>cfit</code> vs <code>cfit1</code></h2>
    <p>Tabel di bawah ini membandingkan file gambar berdasarkan nama dasarnya (mengabaikan perbedaan ekstensi) untuk memastikan bentuk gambar benar-benar sama.</p>

    <?php if (empty($filesCfit)): ?>
        <p style="color: red;">Folder <code>cfit</code> kosong atau tidak ditemukan.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th style="width: 10%;">Nama Dasar File</th>
                    <th style="width: 45%;">Folder: cfit</th>
                    <th style="width: 45%;">Folder: cfit1 (Pasangan)</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($filesCfit as $baseName => $dataCfit): 
                    $fileCfitName = $dataCfit['filename'];
                    $pathImgCfit = 'cfit/' . $fileCfitName;
                ?>
                    <tr>
                        <td><strong><?php echo htmlspecialchars($baseName); ?></strong></td>
                        
                        <!-- Kolom Gambar dari Folder cfit -->
                        <td>
                            <span class="filename-tag"><?php echo htmlspecialchars($fileCfitName); ?></span>
                            <br>
                            <img src="<?php echo htmlspecialchars($pathImgCfit); ?>" alt="<?php echo htmlspecialchars($fileCfitName); ?>">
                        </td>

                        <!-- Kolom Gambar dari Folder cfit1 yang namanya sama -->
                        <td>
                            <?php if (isset($filesCfit1[$baseName])): 
                                $fileCfit1Name = $filesCfit1[$baseName]['filename'];
                                $pathImgCfit1 = 'cfit1/' . $fileCfit1Name;
                            ?>
                                <span class="filename-tag"><?php echo htmlspecialchars($fileCfit1Name); ?></span>
                                <br>
                                <img src="<?php echo htmlspecialchars($pathImgCfit1); ?>" alt="<?php echo htmlspecialchars($fileCfit1Name); ?>">
                            <?php else: ?>
                                <span class="missing">File dengan nama dasar "<?php echo htmlspecialchars($baseName); ?>" tidak ditemukan di folder cfit1</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>

</body>
</html>