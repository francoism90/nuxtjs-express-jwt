const pkg = require("./package");

// https://github.com/buefy/nuxt-buefy/issues/32
global.File = typeof window === "undefined" ? Object : window.File;

module.exports = {
  mode: "universal",

  env: {},

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/axios"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  /*
  ** Creates a connect instance
  */
  serverMiddleware: ["~/api/index.js"],

  /*
   ** JWT configuration
   * secret: (string) used to sign and verify token
   * ttl: (integer) time to keep a token valid
   */
  jwt: [
    {
      secret: "8e05ZTA9G9F5AgV49MRv",
      ttl: 3600
    }
  ],

  /*
   ** MongoDB configuration
   */
  mongo: [
    {
      server: "localhost",
      database: "test"
    }
  ]
};
