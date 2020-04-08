// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => ({
        ...options,
        limit: 10000,
      }));
  },
  // eslint-disable-next-line consistent-return
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: config.output.path,
            // Required - Routes to render.
            routes: ['/'],
          }),
        ],
      };
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/variables";',
      },
    },
  },
};
