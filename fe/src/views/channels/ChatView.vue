<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
const channelId = ref();
const router = useRoute();
const chat = ref()
const authStore = useAuthStore();

channelId.value = router.params.channelId;
const getChat = async ()=>{
    try {
      const {data: data} = await axios.get(import.meta.env.VITE_API_URL + '/messages?where[channel][equals]=' + channelId.value + '&sort=createdAt', {
        withCredentials: true
      });
      console.log(data)
      chat.value = data;
    } catch (e) {
      console.log(e)
    }
}
getChat();

const message = ref()
const sendChat = async ()=>{
  try {
    const {data: data} = await axios.post(import.meta.env.VITE_API_URL + '/messages', {
      message: message.value,
      channel: channelId.value,
      user: authStore.user.id
    }, {
      withCredentials: true
    });
    console.log(data)
    message.value=""
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="text-center">
    Chat
  </div>
  <div v-for="item in chat.docs" :key="item.id" class="mb-4">
    <div class="text-gray-500">{{ item.user.name }}</div>
    <div class="bg-gray-100 rounded-lg p-2">{{ item.message }}</div>
  </div>

  <form @submit="sendChat" class="flex items-center">
    <input type="text" v-model="message" class="border border-gray-300 rounded-lg py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500">
    <button class="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Send</button>
  </form>
</template>