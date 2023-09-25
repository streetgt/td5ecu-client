<script>
import { useConnectionStore } from '../stores/connection'
import { useFaultsStore } from '../stores/faults'
import { toast } from 'vue3-toastify';

export default {
    setup() {
        const connectionStore = useConnectionStore()
        const faultsStore = useFaultsStore()
        return { connectionStore, faultsStore }
    },
    data() {
        return {
        }
    },
    methods: {
        startConnection() {
            this.connectionStore.startConnection().then(() => {
                toast.success("You are now connected!");
            })
        },
        stopConnection() {
            this.connectionStore.stopConnection().then(() => {
                toast.error("You are now disconnected!");
            })
        },
        getFaults() {
            this.faultsStore.fetchFaults()
        },
        clearFaults() {
            this.faultsStore.clearFaults()
            toast.success("Fault(s) cleared!");
        }
    },
    computed: {
        isConnected() {
            return this.connectionStore.isConnected
        }
    }
}

</script>

<template>
    <div class="d-flex justify-content-end mt-4">
        <b-button-group size="md">
            <b-button v-if="!isConnected" @click="startConnection()" variant="outline-primary"><b-icon
                    icon="lightning"></b-icon> Connect</b-button>
            <b-button v-else @click="stopConnection()" variant="danger"><b-icon icon="x"></b-icon> Disconnect</b-button>
            <b-button v-if="$route.name == 'connect'" @click="getFaults()" variant="outline-primary"><b-icon
                    icon="clipboard-data"></b-icon> Get
                Faults</b-button>
            <b-button v-if="$route.name == 'connect'" @click="clearFaults()" variant="outline-primary"><b-icon
                    icon="clipboard-x"></b-icon> Clear
                Faults</b-button>
        </b-button-group>
    </div>
</template>


