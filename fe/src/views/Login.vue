<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth"; // Adjust the path accordingly

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  const response = await authStore.login({
    email: email.value,
    password: password.value,
  });
  console.log(response);
  if (response) {
    // Successful login, redirect to the home page
    router.push("/");
  } else {
    // Handle login failure
    alert("Login failed");
    console.log("Login failed");
  }
};

</script>

<template>
  <div class="mx-5 flex justify-center h-screen items-center">
    <form @submit.prevent="login" class="border-4 border-red-400 p-5">
      <div class="flex justify-center">
        <h1 class="text-3xl font-bold">Login</h1>
      </div>
      <div>
        <div>Email</div>
        <div>
          <input
            class="border border-black"
            type="email"
            id="email"
            v-model="email"
            required
          />
        </div>
      </div>
      <div>
        <div>Password</div>
        <div>
          <input
            class="border border-black"
            type="password"
            id="email"
            v-model="password"
            required
          />
        </div>
      </div>
      <button
        class="my-3 py-2 px-3 bg-green-500 rounded-xl hover:bg-green-300"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>
