import { PluginObject } from 'vue/types/plugin';
import _Vue from 'vue';
import { BuefyConfig } from 'buefy';

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

declare module 'v-lazy-image' {
  import Vue = require('vue');
  const content: Vue.VueConstructor<Vue.default>;
  export default content;
}
