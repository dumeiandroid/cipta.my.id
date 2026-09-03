<?php
function ambilDataFolder($path) {
    $hasil = [];
    if (!is_dir($path)) {
        return $hasil;
    }

    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS)
    );

    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $namaTanpaEkstensi = $file->getBasename('.' . $file->getExtension());
            $namaFile = $file->getFilename();
            $pathLengkap = str_replace('\\', '/', $file->getPathname());
            
            $hasil[$namaTanpaEkstensi] = [
                'nama' => $namaFile,
                'url' => $pathLengkap
            ];
        }
    }
    return $hasil;
}

$folderCfit = 'cfit';
$folderCfit1 = 'cfit1';

$dataCfit = ambilDataFolder($folderCfit);
$dataCfit1 = ambilDataFolder($folderCfit1);

// Gabungkan semua kunci (patokan utama dari cfit)
$semuaFile = array_unique(array_merge(array_keys($dataCfit), array_keys($dataCfit1)));
sort($semuaFile);
?>

<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th>No</th>
            <th>Nama Dasar File</th>
            <th>Folder "cfit"</th>
            <th>Folder "cfit1"</th>
        </tr>
    </thead>
    <tbody>
        <?php 
        $no = 1;
        foreach ($semuaFile as $namaDasar): 
            $fileCfit = isset($dataCfit[$namaDasar]) ? $dataCfit[$namaDasar] : null;
            $fileCfit1 = isset($dataCfit1[$namaDasar]) ? $dataCfit1[$namaDasar] : null;
        ?>
        <tr>
            <td align="center"><?php echo $no++; ?></td>
            <td><strong><?php echo htmlspecialchars($namaDasar); ?></strong></td>
            <td>
                <?php if ($fileCfit): ?>
                    <a href="<?php echo htmlspecialchars($fileCfit['url']); ?>" target="_blank">
                        <?php echo htmlspecialchars($fileCfit['nama']); ?>
                    </a>
                <?php else: ?>
                    <span style="color: #999; font-style: italic;">Kosong</span>
                <?php endif; ?>
            </td>
            <td>
                <?php if ($fileCfit1): ?>
                    <a href="<?php echo htmlspecialchars($fileCfit1['url']); ?>" target="_blank">
                        <?php echo htmlspecialchars($fileCfit1['nama']); ?>
                    </a>
                <?php else: ?>
                    <span style="color: #999; font-style: italic;">Kosong</span>
                <?php endif; ?>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>