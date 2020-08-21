import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/Cadastro.vue'),
  },
  {
    path: '/tools/template-editor',
    name: 'template-editor',
    component: () =>
      import(
        /* webpackChunkName: "template-editor" */ '../views/Tools/TemplateEditor/Editor.vue'
      ),
  },
  {
    path: '/explore/templates/:id',
    name: 'explore-template-item',
    component: () =>
      import(
        /* webpackChunkName: "explore-template-item" */ '../views/Explore/ExploreTemplateItem.vue'
      ),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
