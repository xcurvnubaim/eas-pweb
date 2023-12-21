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
        const response = await axios.post("http://localhost:3000/api/users/login", {
          email,
          password,
        }, {
          withCredentials: true
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
        const response = await axios.post("http://localhost:3000/api/users/logout",{},{
          withCredentials: true
        });
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
        const response = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true
        });
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
