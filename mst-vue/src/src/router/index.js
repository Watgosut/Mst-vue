import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import( '../views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import( '../views/AboutView.vue')
      },
      {
        path: '/algorithm',
        name: 'algorithm',
        component: () => import( '../views/AlgorithmView.vue')
      },
      {
        path: '/feedback',
        name: 'feedback',
        component: () => import( '../views/FeedbackView.vue')
      },
      {
        path: '/prim/:num',
        name: 'prim',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/PrimView.vue'),
      },
      {
        path: '/kruskal/:num',
        name: 'kruskal',
        component: () => import(/* webpackChunkName: "about" */ '../views/KruskalView.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
