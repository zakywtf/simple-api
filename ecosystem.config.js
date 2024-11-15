module.exports = {
  apps: [
    {
      name: 'wellness-point',
      script: './dist/index.js', // Nama file aplikasi utama
      interpreter: './node_modules/.bin/babel-node', // Menentukan interpreter Babel
      watch: true, // Opsi untuk memantau perubahan
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
