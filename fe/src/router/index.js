import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ShowChannels from '../views/channels/ShowChannels.vue'
import Createchannel from '../views/channels/CreateChannel.vue'
import Mychannels from '../views/channels/MyChannels.vue'
import Register from '../views/Register.vue'
import Chat from '../views/channels/ChatView.vue'
import DirectMessage from '../views/channels/DirectMessage.vue'
import DirectMessageCreate from '../views/channels/DirectMessageCreate.vue'
import { useAuthStore } from '../store/auth'

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
      component: ShowChannels,
    },
    {
      path: '/chat/:channelId',
      component: Chat
    },
    {
      path: '/chat',
      component: DirectMessage
    },
    {
      path: '/dm/create',
      component: DirectMessageCreate
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuthentication();
  if (authStore.isAuthenticated || to.path === '/auth/login' || to.path === '/auth/register' || to.path === '/') {
    next();
  }
})

export default router
