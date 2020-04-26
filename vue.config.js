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
            renderedRoute.html = renderedRoute.html.replace(
              /id="app"/,
              'id="app" data-server-rendered="true"',
            );
            return renderedRoute;
          },
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
