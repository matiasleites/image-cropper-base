const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: process.env.PORT || 5000, 
    host: '0.0.0.0', 
    allowedHosts: 'all',
    public: 'https://pc8jvg-5000.csb.app',
    https: true,
    hot: false,
  }
})
