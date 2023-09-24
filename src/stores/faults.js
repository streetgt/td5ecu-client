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
      fetch('http://td5ecu.local:5000/api/faults/read', { method: "POST" })
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
      fetch('http://td5ecu.local:5000/api/faults/clear', { method: "POST" }).then(() => {
        this.faults = {}
      })
    }
  }
});
