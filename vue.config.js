// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end();
    }

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => ({
        ...options,
        limit: 30000,
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
