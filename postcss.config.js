/* eslint-disable global-require, @typescript-eslint/no-var-requires */
const IN_PRODUCTION = process.env.NODE_ENV === 'production';
module.exports = {
  plugins: [
    require('autoprefixer'),
    IN_PRODUCTION &&
      require('@fullhuman/postcss-purgecss')({
        content: [
          `./dist/**/*.html`,
          `./public/**/*.html`,
          `./src/**/*.vue`,
          `./node_modules/buefy/src/components/carousel/**/*.vue`,
          `./node_modules/buefy/src/components/icon/**/*.vue`,
        ],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
        },

        whitelist: [],
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
          /mdi-.*/,
        ],
      }),
  ],
};
