import Vue from 'vue';
import { Carousel } from 'buefy';
import App from './App.vue';
import './assets/scss/app.scss';
import 'webp-in-css/polyfill';

// eslint-disable-next-line @typescript-eslint/no-var-requires

Vue.use(Carousel);

Vue.config.productionTip = false;

document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
