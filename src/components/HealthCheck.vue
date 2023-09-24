<script>
import { toast } from 'vue3-toastify';

import { useConnectionStore } from '../stores/connection'

export default {
  setup() {
    const connectionStore = useConnectionStore()
    return { connectionStore }
  },
  data() {
    return {
      healthCheckInterval: null,
    }
  },
  computed: {
    isConnected() {
      return this.connectionStore.isConnected
    }
  },
  methods: {
    healthCheck(firstConnection) {
      if (!this.isConnected && !firstConnection) {
        return;
      }
      fetch("http://td5ecu.local:5000/api/_health")
        .then(response => {
          if (firstConnection) {
            if (response.status === 200) {
              this.connectionStore.setConnectionStatus(true)
              return
            }
            return
          }

          if (response.status !== 200) {
            throw new Error('lost connection');
          }
        })
        .catch(() => {
          if (!firstConnection) {
            toast.error("You have lost connection!");
            this.connectionStore.setConnectionStatus(false)
          }
        });
    }
  },
  mounted() {
    this.healthCheck(true)
    this.healthCheckInterval = setInterval(() => {
      this.healthCheck();
    }, 1000);
  },
  unmounted() {
    clearInterval(this.healthCheckInterval)
  }
}
</script>
<template>
  
</template>

