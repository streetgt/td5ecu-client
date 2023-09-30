<script setup>
import { RouterView } from 'vue-router'

import NavBar from './components/NavBar.vue'
import HealthCheck from './components/HealthCheck.vue'
import Connect from './components/Connect.vue'

</script>

<template>
    <NavBar />
    <div class="container">
        <Connect />
        <RouterView />
        <!-- <HealthCheck /> -->
    </div>
</template>

<style scoped></style>
