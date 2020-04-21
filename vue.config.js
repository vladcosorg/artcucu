/*
eslint-disable @typescript-eslint/no-var-requires, global-require
 */
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.output.filename('[name].[hash].js').end();
    }

    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('svgo')
        .test(/\.(svg)(\?.*)?$/)
        .use('svgo')
        .loader('svgo-loader')
        .options({
          plugins: [
            {
              removeUnknownsAndDefaults: {
                keepDataAttrs: false,
              },
            },
          ],
        });
    }
  },
  // eslint-disable-next-line consistent-return
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        stats: 'verbose',
        plugins: [
          new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: config.output.path,
            // Required - Routes to render.
            routes: ['/', ...require('./src/data.json').map((item) => `/gallery/${item.filename}`)],
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
