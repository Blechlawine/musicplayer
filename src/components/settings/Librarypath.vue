<script setup lang="ts">
const { LibraryPath } = defineProps<{
    LibraryPath: ILibraryPath;
}>();
</script>

<template>
    <div class="libraryPath">
        <p>{{ LibraryPath?.name }}</p>
        <p>{{ LibraryPath?.path }}</p>
    </div>
</template>
