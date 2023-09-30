import { defineStore } from "pinia";
import faultsData from '../assets/faults_data.json'
import { toast } from "vue3-toastify";

export const useFaultsStore = defineStore({
  id: "faults",
  state: () => ({
    faults: {},
  }),
  getters: {
    getFaults: (state) => state.faults,
  },
  actions: {
    fetchFaults() {
      fetch(`${import.meta.env.VITE_API_URL}/api/faults/read`, { method: "POST" })
    },
    clearFaults() {
      fetch(`${import.meta.env.VITE_API_URL}/api/faults/clear`, { method: "POST" }).then(() => {
        toast.success("Fault(s) cleared!");
        this.faults = {}
      })
    },
    formatFaults(rawFaults) {
      this.faults = rawFaults.map((code) => {
        return {
          'code': code,
          'description': faultsData[code]?.message || 'Error is not defined...',
        }
      });
    },
  }
});
