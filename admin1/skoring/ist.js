// =======================================================
// Konversi dari file ist.php
// =======================================================

// Asumsikan variabel 'usia' sudah ada dan berisi nilai usia.
// Contoh: const usia = 22;
let usia;

// Peta usia ke file PHP
const ageFileMap = {
    14: '14.php',
    15: '15.php',
    16: '16.php',
    17: '17.php',
    18: '18.php',
    19: '19.php',
    '19-20': '1920.php',
    '21-25': '2125.php',
    '26-30': '2630.php',
    '31-35': '3135.php',
    '36-45': '3640.php',
    '46-50': '4650.php',
};

// Menentukan file yang akan di-include berdasarkan usia
let fileToInclude = null;
for (const key in ageFileMap) {
    if (Object.prototype.hasOwnProperty.call(ageFileMap, key)) {
        if (!isNaN(key)) {
            if (usia === parseInt(key)) {
                fileToInclude = `ist/${ageFileMap[key]}`;
                break;
            }
        } else {
            const [start, end] = key.split('-').map(Number);
            if (usia >= start && usia <= end) {
                fileToInclude = `ist/${ageFileMap[key]}`;
                break;
            }
        }
    }
}

// Sekarang, variabel `fileToInclude` berisi nama file yang harus dimuat.
// Misalnya:
// if (fileToInclude) {
//     // Lakukan sesuatu dengan nama file ini, seperti memuatnya secara dinamis
//     console.log(`File untuk di-include: ${fileToInclude}`);
// }
