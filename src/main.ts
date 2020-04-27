import Vue from 'vue';
import VueRouter from 'vue-router';
import VueGtag from 'vue-gtag';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Carousel from 'buefy/src/components/carousel';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Icon from 'buefy/src/components/icon';
import VueMeta from 'vue-meta';
import { Vue2Storage } from 'vue2-storage';
import router from './router';
import App from './App.vue';

import './assets/scss/app.scss';

Vue.prototype.$isPrerendering = window.isPrerendering || false;
Vue.use(Vue2Storage, {
  prefix: 'cucu_',
  driver: 'local',
  ttl: 0,
});
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});
Vue.use(Carousel);
Vue.use(Icon);
Vue.use(VueRouter);
if (process.env.NODE_ENV === 'production') {
  Vue.use(
    VueGtag,
    {
      config: { id: 'UA-163444987-1' },
      appName: 'Artcucu',
      pageTrackerScreenviewEnabled: true,
    },
    router,
  );
}
Vue.config.productionTip = false;
const root = new Vue({
  router,
  render: (h) => h(App),
});

const resize = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

document.addEventListener('DOMContentLoaded', () => {
  root.$mount('#app');
  resize();
  window.addEventListener('resize', resize);
});
