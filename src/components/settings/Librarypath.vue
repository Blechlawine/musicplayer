<script setup lang="ts">
import { LibraryPath as LibraryPathType } from "../../../shared/types/database";

const { LibraryPath } = defineProps<{
    LibraryPath: LibraryPathType;
}>();
</script>

<template>
    <div class="libraryPath">
        <p>{{ LibraryPath?.name }}</p>
        <p>{{ LibraryPath?.path }}</p>
    </div>
</template>
