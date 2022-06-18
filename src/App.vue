<script setup lang="ts">
import WindowHeader from "./components/window/WindowHeader.vue";
import Musicplayer from "./components/Musicplayer.vue";
import ContextMenu from "./components/window/ContextMenu.vue";
import useContextMenu from "./stores/contextMenuStore";

const contextMenu = useContextMenu();
</script>

<template>
    <div class="app text-white bg-bg h-full relative">
        <ContextMenu class="absolute" @close="(e) => (contextMenu.isOpen = false)"></ContextMenu>
        <WindowHeader class="windowHeader"></WindowHeader>
        <router-view class="overflow-hidden"></router-view>
        <Musicplayer></Musicplayer>
    </div>
</template>

<style lang="sass">
@import "./styles/font.sass"

.material-icons
    @include iconFont()

.app
    --sideBarWidth: 300px
    
</style>
