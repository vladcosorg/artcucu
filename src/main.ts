import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import VueAnalytics from 'vue-ua';
import VueRouter from 'vue-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Carousel from 'buefy/src/components/carousel';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Icon from 'buefy/src/components/icon';
import router from './router';
import App from './App.vue';
import VueMeta from 'vue-meta';

import './assets/scss/app.scss';

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});
Vue.use(Carousel);
Vue.use(Icon);
Vue.use(VueRouter);

Vue.use(VueFirestore);
Vue.use(VueAnalytics, {
  appName: 'artcucu', // Mandatory
  appVersion: '1', // Mandatory
  trackingId: '228830496',
});


Vue.config.productionTip = false;
const root = new Vue({
  router,
  render: (h) => h(App),
  // firestore() {
  //   return {
  //     lol: firebaseApp.firestore().collection('lol'),
  //   };
  // },
});

const resize = () => {
  document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`,
  );
};

document.addEventListener('DOMContentLoaded', () => {
  root.$mount('#app');
  resize();
  window.addEventListener('resize', resize);
});
