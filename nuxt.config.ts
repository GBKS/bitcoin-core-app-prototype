// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true
  },
  nitro: {
    preset: 'netlify'
  },
  server: {
    host: '0.0.0.0'
  },
  devServer: {
    port: 3012
  },
  app: {
    head: {
      title: 'Bitcoin Core App Prototype',
      meta: [
        { name: 'description', content: 'For quick iteration and testing of designs.' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff', id: 'themeColorMeta' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/images/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' },
        { rel: 'preconnect', href: 'https://rsms.me/' },
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
        { rel: 'manifest', href:'/manifest.json' }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_import.scss" as *;'
        }
      }
    }
  },
  css: [
    '@/assets/css/_base.scss'
  ]
})
