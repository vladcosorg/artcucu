import Vue from 'vue';
import VueRouter from 'vue-router';
import Gallery from '@/views/Gallery.vue';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/gallery/april/',
    },
    {
      path: '/gallery/',
      redirect: '/gallery/april/',
    },
    {
      path: '/gallery/:album(march|april)/:id?/',
      name: 'gallery',
      component: Gallery,
      props: true,
    },
    {
      path: '/results',
      component: () => import(/* webpackChunkName: "results" */ '../views/Results.vue'),
      props: true,
    },
    {
      path: '/gallery/:id/',
      name: 'Gallery',
      redirect: '/gallery/march/:id/',
    },
  ],
});

export default router;
