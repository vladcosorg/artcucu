import Vue from 'vue';
import App from './App.vue';

// import 'animate.css';
import './assets/scss/app.scss';
import 'webp-in-css/polyfill';

// eslint-disable-next-line @typescript-eslint/no-var-requires
Vue.use(require('buefy/dist/components/carousel'));

Vue.config.productionTip = false;

document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
