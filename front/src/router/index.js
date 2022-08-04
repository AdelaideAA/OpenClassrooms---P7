import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import SignUp from '../components/SignUp.vue'
//import Login from '../components/Login.vue'
import LoginView from '@/views/LoginView.vue'
import SingUpView from '@/views/SignUpView.vue'

//import ActuView from '../views/ActuView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/actu',
    name: 'actu',
    component: () => import ('../views/ActuView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import ('../views/UserSettings.vue')
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SingUpView,
  },{
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
