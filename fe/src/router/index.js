import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ShowChannels from '../views/channels/ShowChannels.vue'
import Createchannel from '../views/channels/CreateChannel.vue'
import Mychannels from '../views/channels/MyChannels.vue'
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
      name: 'channels',
      component: ShowChannels
    },
    {
      path: '/channels/create',
      name: 'channels.create',
      component: Createchannel
    },
    {
      path: '/channels/me',
      name: 'channels.me',
      component: Mychannels
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
