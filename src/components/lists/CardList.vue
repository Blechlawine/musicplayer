<template>
    <div class="grid gap-2 p-2" :class="classes">
        <slot name="items"></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
    singleRow: {
        type: Boolean,
        default: false,
    },
});

const classes = computed(() => ({
    cardList: !props.singleRow,
    cardListSingleRow: props.singleRow,
    "overflow-x-auto": props.singleRow,
}));
</script>

<style lang="sass">
.cardList
    grid-template-columns: repeat(auto-fit, minmax(160px, 250px))
    grid-auto-flow: row

.cardListSingleRow
    grid-template-rows: 1fr
    grid-auto-columns: minmax(200px, 250px)
    grid-auto-flow: column
</style>
