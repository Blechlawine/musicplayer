<script setup lang="ts">
import { computed, PropType } from "vue";
import { SidebarLink } from "../types/ui";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
    entry: {
        type: Object as PropType<SidebarLink>,
        required: true,
    },
});

const active = computed(() => router.currentRoute.value.name === props.entry.link);

const computedClasses = computed(() => ({
    "text-accent": active.value,
}));
</script>

<template>
    <router-link
        :to="props.entry.link"
        class="entry flex flex-row gap-4 p-3 rounded-md hover:bg-highlight"
        :class="computedClasses"
    >
        <span class="material-icons">{{ props.entry.icon }}</span>
        <div class="label">{{ props.entry.label }}</div>
    </router-link>
</template>
