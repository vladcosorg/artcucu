/*
eslint-disable @typescript-eslint/no-var-requires, global-require
 */
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');

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
      config.plugin('prerender').use(PrerenderSPAPlugin, [
        {
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: config.output.get('path'),
          // Required - Routes to render.
          routes: [
            '/',
            ...require('./src/assets/meta/march.json').map((item) => `/gallery/${item.filename}`),
            ...require('./src/assets/meta/april.json').map(
              (item) => `/gallery/april/${item.filename}`,
            ),
          ],
        },
      ]);
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

    config.plugin('html').tap((args) => {
      return [
        {
          ...args[0],
        },
      ];
    });
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/variables";',
      },
    },
  },
};
