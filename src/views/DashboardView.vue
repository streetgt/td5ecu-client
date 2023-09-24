<script>
import { useConnectionStore } from '../stores/connection'


export default {
  setup() {
    const connectionStore = useConnectionStore();
    return { connectionStore }
  },
  data() {
    return {
      interval: null,
      payload: {}
    }
  },
  methods: {
    getPayload() {
      if (!this.connectionStore.isConnected) {
        return
      }

      fetch('http://td5ecu.local:5000')
        .then(response => response.json())
        .then(data => this.payload = data)
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.getPayload();
    }, 500);
  },
  unmounted() {
    clearInterval(this.interval)
  }
}
</script>

<template>
  <div class="mt-4">
    <div v-if="connectionStore.isConnected" class="d-flex justify-content-center">
      <b-list-group class="col-sm-6">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Current Speed
          <b-badge variant="primary" pill>{{ payload.vehicle_speed }} km/h</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Engine RPM
          <b-badge variant="primary" pill>{{ payload.engine_rpm }} rpm</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Battery Voltage
          <b-badge variant="primary" pill>{{ parseFloat(payload.battery_voltage).toFixed(1) }} volts</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          MAP
          <b-badge variant="primary" pill>{{ parseFloat(payload.battery_voltage).toFixed(1) }} bar</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          ECT
          <b-badge variant="primary" pill>{{ parseFloat(payload.temperatures?.coolant).toFixed(1) || '-' }} ºC</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Fuel consumption
          <b-badge variant="primary" pill>{{ parseFloat(payload.current_fuel_consumption).toFixed(1) }}
            L/100km</b-badge>
        </b-list-group-item>

      </b-list-group>
    </div>

    <div v-else>
      No connection
    </div>
  </div>
</template>

<style></style>