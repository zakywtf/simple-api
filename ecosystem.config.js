module.exports = {
  apps: [
    {
      name: 'base-node',
      script: './dist/index.js', 
      interpreter: './node_modules/.bin/babel-node',
      watch: true, 
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
