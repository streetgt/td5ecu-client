<script>
import { toast } from "vue3-toastify";
import { useFaultsStore } from '../stores/faults'

export default {
  setup() {
    const faultsStore = useFaultsStore()
    return { faultsStore }
  },
  sockets: {
    faults(data) {
      toast.success(`${data.length} faults received`);
      this.faultsStore.formatFaults(data)
    }
  },
  methods: {
    getFaults() {
      this.faultsStore.fetchFaults()
    },
    clearFaults() {
      this.faultsStore.clearFaults()
    }
  },
  computed: {
    currentFaults() {
      return this.faultsStore.getFaults;
    }
  }
}
</script>

<template>
  <div>
    <div class="mt-4">
      <div class="d-flex justify-content-center">
        <b-button-group size="md" class="col-md-8">
          <b-button v-if="$route.name == 'faults'" @click="getFaults()" variant="outline-dark"><b-icon
              icon="clipboard-data"></b-icon> Get
            Faults</b-button>
          <b-button v-if="$route.name == 'faults'" @click="clearFaults()" variant="outline-dark"><b-icon
              icon="clipboard-x"></b-icon> Clear
            Faults</b-button>
        </b-button-group>
      </div>

      <div v-if="currentFaults.length">
        <b-table striped hover :items="currentFaults"></b-table>
      </div>
      <div v-else>
        No faults...
      </div>
    </div>
  </div>
</template>


