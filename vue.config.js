const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: process.env.PORT || 5000, 
    host: '0.0.0.0', 
    allowedHosts: 'all',
    hot: true,
    https: true
  }
})
