/*
eslint-disable @typescript-eslint/no-var-requires, global-require, no-param-reassign
 */
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
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
            '/results',
            ...require('./src/assets/meta/march.json').map((item) => `/gallery/${item.filename}`),
            ...require('./src/assets/meta/april.json').map(
              (item) => `/gallery/april/${item.filename}`,
            ),
            ...require('./src/assets/meta/june.json').map(
              (item) => `/gallery/june/${item.filename}`,
            ),
          ],
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: false,
            removeComments: false,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true,
            collapseInlineTagWhitespace: true,
          },
          postProcess(renderedRoute) {
            renderedRoute.html = renderedRoute.html.replace(/<html.*?>/, '<html lang=en>');
            renderedRoute.html = renderedRoute.html.replace(
              /id="app"/,
              'id="app" data-server-rendered="true"',
            );
            renderedRoute.html = renderedRoute.html.replace(
              /<script charset="utf-8" src=".*?"><\/script>/g,
              '',
            );
            renderedRoute.html = renderedRoute.html.replace(
              /<link rel="stylesheet" type="text\/css" href=".*?">/g,
              '',
            );
            renderedRoute.html = renderedRoute.html.replace(
              /media="all" onload="this.media='all'"/g,
              'media="print" onload="this.media=\'all\'"',
            );
            return renderedRoute;
          },
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            injectProperty: 'isPrerendering',
            inject: true,
          }),
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

      config.optimization.minimizer('terser').tap((args) => {
        const options = args[0];
        options.terserOptions.output = {
          comments: false,
        };
        return [
          {
            ...options,
          },
        ];
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
