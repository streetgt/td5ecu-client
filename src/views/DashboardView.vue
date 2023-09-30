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
  sockets: {
    dashboard(data) {
      this.payload = data
      console.log(data)
    }
  },
  methods: {
    getPayload() {
      if (!this.connectionStore.isConnected) {
        return
      }

      fetch(`${import.meta.env.VITE_API_URL}/api/data`)
        .then(response => response.json())
        .then(data => this.payload = data)
    },
  },
  computed: {
    ectTemperature() {
      const currentTemp = parseFloat(this.payload.temperatures?.coolant).toFixed(1) || NaN
      if (isNaN(currentTemp)) {
        return {
          pill_color: 'light',
          value: '-',
        }
      }

      return {
        pill_color: currentTemp > 90 ? 'danger' : 'light',
        value: currentTemp,
      }
    }
  },
  mounted() {
    // this.interval = setInterval(() => {
    //   this.getPayload();
    // }, 500);
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
          <b-badge variant="light" pill>{{ payload.vehicle_speed }} km/h</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Engine RPM
          <b-badge variant="light" pill>{{ payload.engine_rpm }} rpm</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Battery Voltage
          <b-badge variant="light" pill>{{ parseFloat(payload.battery_voltage).toFixed(1) }} volts</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          MAP
          <b-badge variant="light" pill>{{ parseFloat(payload.battery_voltage).toFixed(1) }} bar</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          ECT
          <b-badge :variant="ectTemperature.pill_color" pill>{{ ectTemperature.value }} ºC</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Fuel consumption
          <b-badge variant="light" pill>{{ parseFloat(payload.current_fuel_consumption).toFixed(1) }}
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