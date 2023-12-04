<script setup>
import { ref } from 'vue'
import axios from 'axios'

const data = ref(null);


const getMe = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/users/me', { withCredentials: true });
        console.log(response.data);
    } catch (e) {
        console.log(e);
    }
}

const getData = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/channels', { withCredentials: true });
        data.value = response.data;
    } catch (e) {
        console.log(e);
    }
}

getMe();
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
                        <!-- <th colspan="2" class="border border-slate-800 px-5">Price</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="data" v-for="(item, index) in data.docs">
                        <td class="border border-slate-800 px-5">{{ index + 1 }}</td>
                        <td class="border border-slate-800 px-5">{{ item.channelName }}</td>
                        <!-- <td class="border border-b-slate-800 border-r-transparent">Rp</td>
                        <td class="border border-slate-800 pl-5 text-right">{{ new Intl.NumberFormat('id-ID').format(item.price) }}</td> -->
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-5 flex justify-center">
            <router-link to="/channels/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create
            </router-link>
        </div>
    </div>
</template>