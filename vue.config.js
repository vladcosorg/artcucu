module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/artcucu/'
    : '/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  configureWebpack: {
    module: {
      rules: [],
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/variables";',
      },
    },
  },
};
