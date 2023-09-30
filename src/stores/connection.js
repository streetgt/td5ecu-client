import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useConnectionStore = defineStore({
  id: "connection",
  state: () => ({
    connected: false,
  }),
  getters: {
    isConnected: (state) => state.connected,
  },
  actions: {
    startConnection() {
      fetch(`${import.meta.env.VITE_API_URL}/api/start`, {
        method: "POST",
      }).catch((err) => toast.error(err.message));
    },
    stopConnection() {
      fetch(`${import.meta.env.VITE_API_URL}/api/stop`, {
        method: "POST",
      }).then(() => {
        this.connected = false;
        toast.error("You are now disconnected!");
      });
    },
    setConnectionStatus(status) {
      this.connected = status;
    },
  },
  // persist: {
  //   storage: sessionStorage,
  //   paths: ["connected"],
  // },
});
