import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ShowProducts from '../views/products/ShowProducts.vue'
import CreateProduct from '../views/products/CreateProduct.vue'
import MyProducts from '../views/products/MyProducts.vue'
import UpdateProduct from '../views/products/UpdateProduct.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/channels',
      name: 'products',
      component: ShowProducts
    },
    {
      path: '/products/create',
      name: 'products.create',
      component: CreateProduct
    },
    {
      path: '/products/me',
      name: 'products.me',
      component: MyProducts
    },
    {
      path: '/products/me/:id',
      name: 'products.update',
      component: UpdateProduct
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login
    },
    {
      path: '/auth/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
