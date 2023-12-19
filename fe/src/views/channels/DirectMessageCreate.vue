
<template>
  <form @submit.prevent="addchannel" class="mx-5 mt-3">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-">Add channel</h2>

        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="Name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <select class="w-full" v-model="userSelected">
                  <option v-for="user in allUser" :value="user">{{ user.name }} ({{ user.email }})</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Chat</button>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import qs from 'qs';
import { useAuthStore } from '../../store/auth';

const authStore = useAuthStore();
const allUser = ref(null);
const userSelected = ref(null);
const getAllUser = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/users');
    allUser.value = response.data.docs;
    console.log(allUser.value);
  } catch (e) {
    console.log(e);
  }
}
getAllUser();

const channelName = ref(null);

const router = useRouter();
const addchannel = async () => {
  const query = qs.stringify({
    where: {
      and: [
        {
          members: {
            equals: authStore.user.id
          }
        },
        {
          members: {
            equals: userSelected.value.id
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
  const checkIfAlreadyExist = await axios.get(import.meta.env.VITE_API_URL + `/channels${query}`);
  if(checkIfAlreadyExist.data.docs.length > 0) {
    router.push('/chat/'+checkIfAlreadyExist.data.docs[0].id);
    return;
  } else {
    console.log(userSelected.value)
    const response1 = await axios.post(import.meta.env.VITE_API_URL + '/channels?depth=0&fallback-locale=null', {
      channelName: `chat ${authStore.user.name} - ${userSelected.value.name}`,
      members: [authStore.user.id, userSelected.value.id],
      isDirectMessage: true
    });
    
    console.log(response1.data);
    // router.push('/chat/'+response.data.docs.id);
  }
}   
</script>