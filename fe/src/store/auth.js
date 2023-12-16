// src/store/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  persist: true,
  actions: {
    async login({ email, password }) {
      try {
        const response = await axios.post("/api/users/login", {
          email,
          password,
        });

        console.log(response);

        if (response.status === 200) {
          this.user = response.data.user; // Assuming the user data is returned in the response
          this.isAuthenticated = true;
          return true;
        } else {
          console.error("Authentication failed");
          return false;
        }
      } catch (error) {
        console.error("An error occurred during login", error);
        return false;
      }
    },

    async logout() {
      try {
        const response = await axios.post("/api/users/logout");
        if (response.status === 200) {
          console.log(response);
          this.user = null;
          this.isAuthenticated = false;
          return true;
        } else {
          console.error("Logout failed");
          return false;
        }
      } catch (error) {
        console.error("An error occurred during logout", error);
        return false;
      }
    },

    async checkAuthentication() {
      try {
        const response = await axios.get("/api/users/me");
        if (response.data.user) {
          this.user = response.data.user;
          this.isAuthenticated = true;
          return true;
        } else {
          this.user = null;
          this.isAuthenticated = false;
          console.error("Authentication check failed");
          return false;
        }
      } catch (error) {
        console.error("An error occurred during authentication check", error);
        this.user = null;
        this.isAuthenticated = false;
        return false;
      }
    },
  },
});
