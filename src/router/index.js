import Vue from 'vue';
import Router from 'vue-router';

import MainLayout from '../Layouts/LayoutUser.vue';
import IndexPage from '../pages/IndexPage.vue';
import CreatePost from '../pages/CreatePost.vue';
import LoginPage from '../pages/LoginPage.vue'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: LoginPage,
    },
    {
      path: '/posts',
      component: MainLayout,
      children: [
        {
          path: '',
          component: IndexPage,
        },
        {
          path: '/createpost',
          component: CreatePost,
        },
        
      ],
    },
  ],
});