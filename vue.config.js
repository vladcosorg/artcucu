module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  chainWebpack: (config) => {
    const imageRule = config.module.rule('images');
    imageRule
      .use('sharp-image-webpack-loader')
      .loader('sharp-image-webpack-loader')
      .options({
      });
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
