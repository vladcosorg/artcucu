import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/gallery/',
    },
    {
      path: '/gallery/april/:id?',
      name: 'Gallery',
      component: () => import(/* webpackChunkName: "gallery" */ '../views/Gallery.vue'),
      props: (route) => ({ id: route.params.id, album: 'april' }),
    },
    {
      path: '/gallery/:id?',
      name: 'Gallery',
      component: () => import(/* webpackChunkName: "gallery" */ '../views/Gallery.vue'),
      props: (route) => ({ id: route.params.id, album: 'march' }),
    },
  ],
});

export default router;
