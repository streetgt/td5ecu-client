import { defineStore } from "pinia";

export const useConnectionStore = defineStore({
  id: "connection",
  state: () => ({
    connected: false,
  }),
  getters: {
    isConnected: (state) => state.connected,
  },
  actions: {
    async startConnection() {
      return fetch(`${import.meta.env.VITE_API_URL}/api/start`, { method: "POST" }).then(() => {
        setTimeout(() => this.connected = true, 3000);
      });
    },
    async stopConnection() {
      fetch(`${import.meta.env.VITE_API_URL}/api/stop`, { method: "POST" }).then(() => this.connected = false);
    },
    setConnectionStatus(status) {
      this.connected = status
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['connected'],
  },
});
