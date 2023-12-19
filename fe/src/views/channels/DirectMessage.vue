<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../../store/auth';
import qs from 'qs';

const data = ref(null);
const authStore = useAuthStore();

const query = qs.stringify({
  where: {
    and: [
      {
        members: {
          equals: authStore.user.id
        }
      },
      {
        isDirectMessage: {
          equals: true
        }
      }
    ]
  },
}, {
  addQueryPrefix: true
})

console.log(query)
const getData = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + `/channels${query}`);
    data.value = response.data;
  } catch (e) {
    console.log(e);
  }
}

const joinChannel = async (channel) => {
  try {
    channel.members = channel.members.map((item) => item.id)
    channel.members.push(authStore.user.id);
    const res = await axios.patch(import.meta.env.VITE_API_URL + `/channels/${channel.id}`, channel);
    console.log(res)
  } catch (e) {
    console.log(e);
  }
}

getData();

</script>
<template>
  <div class="w-screen">
    <div class="flex justify-center">
      <h1 class="text-4xl font-bold text-red-500">Chat</h1>
    </div>
    <div class="flex justify-center">
      <table class="mx-5">
        <thead>
          <tr>
            <th class="border border-slate-800 px-5">No</th>
            <th class="border border-slate-800 px-5">Contact</th>
            <th class="border border-slate-800 px-5">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="data" v-for="(item, index) in data.docs">
            <td class="border border-slate-800 px-5">{{ index + 1 }}</td>
            <td class="border border-slate-800 px-5">{{ item.members[0].id == authStore.user.id ? item.members[1].name :
              item.members[0].name }}</td>
            <td class="flex justify-center">
              <a :href="'/chat/' + item.id">
                <button class="border bg-green-300 px-3 py-2 rounded-xl hover:bg-green-800">
                  Chat
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 flex justify-center">
      <router-link to="/dm/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Start New Chat
      </router-link>
    </div>
  </div>
</template>