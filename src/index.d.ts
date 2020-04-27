declare module '*.svg' {
  import Vue = require('vue');
  const content: Vue.VueConstructor<Vue.default>;
  export default content;
}

declare module '*.svg?inline' {
  import Vue = require('vue');
  const content: Vue.VueConstructor<Vue.default>;
  export default content;
}

declare module '*.svg?sprite' {
  interface SpriteSymbol {
    id: string;
    viewBox: string;
    content: string;
  }
  const content: SpriteSymbol;
  export default content;
}

declare module 'vue-firestore';
declare module 'vue-lazy-hydration';
declare module 'vue-ua';
declare module 'cloudinary-core/src/url';
declare module 'js-combinatorics';

declare module 'cookies.js' {
  interface DocCookies {
    getItem(sKey: string): string | null;

    setItem(
      sKey: string,
      sValue: string,
      vEnd?: number | string | Date,
      sPath?: string,
      sDomain?: string,
      bSecure?: boolean,
      vSameSite?: string | number,
    ): boolean;

    removeItem(
      sKey: string,
      sPath?: string,
      sDomain?: string,
      bSecure?: boolean,
      vSameSite?: string | number,
    ): boolean;

    hasItem(sKey: string): boolean;

    keys(): string[];

    clear(sPath?: string, sDomain?: string, bSecure?: boolean, vSameSite?: string | number): void;
  }
  const content: DocCookies;
  export default content;
}
