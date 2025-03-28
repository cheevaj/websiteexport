import colors from 'vuetify/es5/util/colors'

export default {
  // server: {
  //   port: 3333, // default: 3000
  //   host: '172.28.17.102', // default: localhost
  // },

  ssr: false,
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
  css: ['iview/dist/styles/iview.css'],
  plugins: ['~/plugins/chartjs.js', '@/plugins/iview.js'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/vuetify',
  ],
  eslint: {},
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-fonts',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
  ],
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
          login: {
            url: 'http://172.28.26.23:3100/users/login',
            method: 'post',
          },
          logout: {
            url: 'http://172.28.26.23:3100/users/logout',
            method: 'delete',
          },
          user: { url: 'http://172.28.26.23:3100/users/me', method: 'get' },
        },
      },
    },
  },
  axios: {
    baseURL: 'http://172.28.26.23:3100',
  },
  googleFonts: {
    families: {
      'Noto+Sans+Lao': true,
    },
  },
  proxy: {
    // '/api/': {
    //   target: 'https://172.28.26.72:9443',
    //   pathRewrite: { '^/api/': '' },
    //   changeOrigin: true,
    //   secure: false,
    // },
    '/users/': {
      target: 'http://172.28.26.23:3100',
      pathRewrite: { '^/users/': '/users/' },
      changeOrigin: true,
      secure: false,
    },
  },
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
  build: {
    hotMiddleware: {
      client: {
        timeout: 60000,
      },
    },
  },
}
