import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const route = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Typo'
      }
    }
  ]
});

route.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default route;
