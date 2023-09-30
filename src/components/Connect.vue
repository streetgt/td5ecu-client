<script>
import { toast } from "vue3-toastify";
import { useConnectionStore } from '../stores/connection'

export default {
    setup() {
        const connectionStore = useConnectionStore()
        return { connectionStore }
    },
    sockets: {
        dashboard() {
            this.connectionStore.setConnectionStatus(true);
        },
        fast_init() {
            toast.success("You are now connected!");
            this.connectionStore.setConnectionStatus(true);
        },
        error(data) {
            toast.error(data);
        },
        disconnect() {
            this.connectionStore.setConnectionStatus(false);
        }
    },
    methods: {
        startConnection() {
            this.connectionStore.startConnection();
        },
        stopConnection() {
            this.connectionStore.stopConnection();
        },
    },
    computed: {
        isConnected() {
            return this.connectionStore.isConnected
        }
    }
}

</script>

<template>
    <div class="d-flex justify-content-end mt-4 pr-3">
        <b-button-group size="md">
            <b-button v-if="!isConnected" @click="startConnection()" variant="outline-dark"><b-icon
                    icon="lightning"></b-icon> Connect</b-button>
            <b-button v-else @click="stopConnection()" variant="outline-danger"><b-icon icon="x"></b-icon> Disconnect</b-button>
        </b-button-group>
    </div>
</template>


