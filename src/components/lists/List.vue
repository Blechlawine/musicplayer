<template>
    <div class="listWrapper w-full select-none">
        <div class="listHeader grid sticky top-0 bg-bg gap-2 px-3" :style="listItemStyles">
            <div
                class="columnHeader py-1 grid cursor-pointer border-r border-divider w-full"
                v-for="col in columns"
                :key="col.name"
                @click="() => columnHeaderClick(col)"
            >
                <p class="text-ellipsis whitespace-nowrap overflow-hidden w-full">
                    {{ col.name }}
                </p>
                <span class="material-icons" v-if="col.sorted === -1"> arrow_drop_up </span>
                <span class="material-icons" v-if="col.sorted === 1"> arrow_drop_down </span>
            </div>
        </div>
        <div class="list grid">
            <slot name="items"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType, computed } from "vue";

const emit = defineEmits(["columnHeaderClick"]);

type TColumn = IColumn<ITrack> | IColumn<IAlbum> | IColumn<IArtist> | IColumn<IPlaylistTrack>;

const props = defineProps({
    columns: {
        type: Array as PropType<TColumn[]>,
        required: true,
    },
});

// Columnstuff
const gridTemplateAreas = computed(() => props.columns.map((c) => c.name).join(" "));
const gridTemplateColumns = computed(() => props.columns.map((c) => `${c.width}fr`).join(" "));

const listItemStyles = computed(() => ({
    "grid-template-areas": `"${gridTemplateAreas.value}"`,
    "grid-template-columns": gridTemplateColumns.value,
}));

const columnHeaderClick = (column: TColumn) => {
    emit("columnHeaderClick", column);
};
</script>

<style lang="sass" scoped>
.listHeader
    z-index: 1
    .columnHeader
        grid-template-columns: 1fr 1.5rem
</style>
