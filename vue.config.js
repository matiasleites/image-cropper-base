const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: process.env.PORT || 5000, // Usa el puerto asignado por CodeSandbox o 8080 por defecto
    host: '0.0.0.0', // Acepta conexiones desde cualquier dirección
  },
})
