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
declare module 'vue-ua';
declare module 'cloudinary-core/src/url';
declare module 'js-combinatorics';
