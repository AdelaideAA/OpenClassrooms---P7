import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SingUpView from '@/views/SignUpView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/actu',
    name: 'actu',
    component: () => import('../views/ActuView.vue'),
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SingUpView,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
