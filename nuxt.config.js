import colors from 'vuetify/es5/util/colors'

export default {
  // server: {
  //   port: 3333, // default: 3000
  //   host: '172.28.17.102', // default: localhost
  // },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - TICKET',
    title: 'TPLUS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Tpluslogo.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['iview/dist/styles/iview.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/chartjs.js', '@/plugins/iview'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  eslint: {},

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/google-fonts',
    '@nuxtjs/auth-next',
  ],
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  // nuxt.config.js

  auth: {
    store: '~/store',
    redirect: {
      login: '/login/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'user.token',
          global: true,
          name: 'authorization',
          type: '',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/users/login', method: 'post' },
          logout: { url: '/users/logout', method: 'delete' },
          user: { url: '/users/me', method: 'get' },
        },
      },
    },
  },
  googleFonts: {
    families: {
      // Specify the fonts you want to use
      // Example: 'Roboto:400,700', 'Open+Sans:400,700'
      // You can also specify font styles and weights
      // Example: 'Roboto:ital,wght@0,400;0,700,1;1,400&display=swap'
      'Noto+Sans+Lao': true, // Include Noto Sans Lao font,
      // 'Roboto': 'Roboto:400,700',
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://172.28.26.23:3100',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
