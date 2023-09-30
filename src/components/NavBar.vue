<script setup>
const routes = [
    {
        to: "/",
        name: "dashboard",
    },
    {
        to: "/inputs",
        name: "inputs",
    },
    {
        to: "/intake",
        name: "intake",
    },
    {
        to: "/fuel",
        name: "fuel",
    },
    {
        to: "/engine",
        name: "engine",
    },
    {
        to: "/faults",
        name: "Faults",
    },
]
</script>

<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">
                <img src="@/assets/td5.png" class="logo d-inline-block align-top" alt="Kitten">
                Td5Ecu
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-for="item in routes" :to="item.to" :active='$route.name == item.name'>{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style lang="scss" scoped></style>
