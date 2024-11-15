const fs = require('fs-extra');

async function copyFile() {
  try {
    await fs.copySync('src/views', 'dist/views');
    await fs.copySync('src/public', 'dist/public');
    console.log('views and public berhasil disalin!');
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
  }
}

copyFile();
