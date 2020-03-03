import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodList from '../views/GoodList.vue'
import AddCart from '../views/AddCart'
import Address from '../views/Address.vue'
import OrderConfirm from '../views/OrderConfirm.vue'
import OrderSuccess from '../views/OrderSuccess.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GoodList',
    component: GoodList
  },
  {
    path: '/cart',
    name: 'AddCart',
    component: AddCart
  },
  {
    path: '/address',
    name: 'Address',
    component: Address
  },
  {
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: OrderConfirm
  },
  {
    path: '/ordersuccess',
    name: 'OrderSuccess',
    component: OrderSuccess
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
