<script setup lang="ts">
import { onMounted } from "vue";
import WindowHeader from "./components/window/WindowHeader.vue";
import Musicplayer from "./components/Musicplayer.vue";
import { useRouter } from "vue-router";

const Router = useRouter();

onMounted(() => {
    Router.push("/landing");
});

</script>

<template>
    <div class="app text-white bg-bg h-full relative" id="mainFrame">
        <WindowHeader class="windowHeader"></WindowHeader>
        <router-view></router-view>
        <Musicplayer></Musicplayer>
    </div>
</template>

<style lang="sass">
@import "./styles/font.sass"

.material-icons
    @include iconFont()

.app
    --sideBarWidth: 300px
    --windowHeaderHeight: 52px

    display: grid
    grid-template-columns: 1fr
    grid-template-rows: var(--windowHeaderHeight) 1fr
    grid-template-areas: "windowHeader" "routerview"
    gap: 0

    .windowHeader
        grid-area: windowHeader

    .routerView
        grid-area: routerview
        height: calc(100vh - var(--windowHeaderHeight))
</style>
