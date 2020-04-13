import Vue from 'vue';
import firebaseApp from '@/firebase';
import VueFirestore from 'vue-firestore';
import VueAnalytics from 'vue-analytics';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Carousel from 'buefy/src/components/carousel';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Icon from 'buefy/src/components/icon';
import App from './App.vue';

import './assets/scss/app.scss';
import 'webp-in-css/polyfill';

Vue.use(Carousel);
Vue.use(Icon);
Vue.use(VueFirestore);
Vue.use(VueAnalytics, {
  id: '228830496',
  sendHitTask: process.env.NODE_ENV === 'production',
});


Vue.config.productionTip = false;
const root = new Vue({
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
