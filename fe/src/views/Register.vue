<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/users', {
            email: email.value,
            password: password.value
        }, {
            withCredentials: true,
        });
        router.push('/auth/login');
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
</script>

<template>
    <div class="mx-5 flex justify-center h-screen items-center">
        <form @submit.prevent="login" class="border-4 border-red-400 p-5">
            <div class="flex justify-center">
                <h1 class="text-3xl font-bold">Register</h1>
            </div>
            <div>
                <div>
                    Email
                </div>
                <div>
                    <input class="border border-black" type="email" id="email" v-model="email" required>
                </div>
            </div>
            <div>
                <div>
                    Password
                </div>
                <div>
                    <input class="border border-black" type="password" id="email" v-model="password" required>
                </div>
            </div>
            <button class="my-3 py-2 px-3 bg-green-500 rounded-xl hover:bg-green-300" type="submit">Register</button>
        </form>
    </div>
</template>
