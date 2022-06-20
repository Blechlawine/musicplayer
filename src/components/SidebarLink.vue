<script setup lang="ts">
import { computed, PropType, watch, ref, Ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["activeChanged"]);
const props = defineProps({
    entry: {
        type: Object as PropType<ISidebarLink>,
        required: true,
    },
});

const linkRef = ref(null) as Ref<any>;

const active = computed(() => router.currentRoute.value.path === props.entry.link);

const computedClasses = computed(() => ({
    "text-accent": active.value,
}));

watch(active, () => {
    emit("activeChanged", active.value, linkRef.value?.$el.offsetTop);
});

onMounted(() => {
    nextTick(() => {
        if (active) {
            emit("activeChanged", active.value, linkRef.value?.$el.offsetTop);
        }
    });
});
</script>

<template>
    <router-link
        ref="linkRef"
        :to="props.entry.link"
        class="entry flex flex-row gap-4 p-3 rounded-md hover:bg-highlight"
        :class="computedClasses"
    >
        <span class="material-icons">{{ props.entry.icon }}</span>
        <div class="label">{{ props.entry.label }}</div>
    </router-link>
</template>
