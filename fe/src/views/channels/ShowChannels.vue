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
                    not_in: authStore.user.id
                }
            },
            {
                isDirectMessage: {
                    not_equals: true
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
            <h1 class="text-4xl font-bold text-red-500">Channels</h1>
        </div>
        <div class="flex justify-center">
            <table class="mx-5">
                <thead>
                    <tr>
                        <th class="border border-slate-800 px-5">No</th>
                        <th class="border border-slate-800 px-5">Channel Name</th>
                        <th class="border border-slate-800 px-5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="data" v-for="(item, index) in data.docs">
                        <td class="border border-slate-800 px-5">{{ index + 1 }}</td>
                        <td class="border border-slate-800 px-5">{{ item.channelName }}</td>
                        <td class="flex justify-center">
                            <button @click="joinChannel(item)"
                                class="border bg-green-300 px-3 py-2 rounded-xl hover:bg-green-800">
                                Join
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>