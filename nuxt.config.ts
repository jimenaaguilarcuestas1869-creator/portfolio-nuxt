// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Enlazamos tu archivo de estilos principal de la carpeta assets
  css: [
    '~/assets/scss/style.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Cargamos automáticamente tus variables para que estén disponibles en toda la app
          additionalData: `@use "~/assets/scss/_variables.scss" as *;`
        }
      }
    }
  }
})