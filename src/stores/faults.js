import { defineStore } from "pinia";
import faultsData from '../assets/faults_data.json'

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
        .then(response => response.json())
        .then((data) => {
          this.faults = data.map((code) => {
            return {
              'code': code,
              'description': faultsData[code]?.message || 'Error is not defined...',
            }
          });
        })
    },
    clearFaults() {
      fetch(`${import.meta.env.VITE_API_URL}/api/faults/clear`, { method: "POST" }).then(() => {
        this.faults = {}
      })
    }
  }
});
