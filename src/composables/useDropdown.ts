import { ref, computed } from "vue";

export default function () {
    const isOpen = ref(false);
    const icon = computed(() => isOpen.value ? 'expand_less' : 'expand_more');

    const open = () => {
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
    };

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    return {
        isOpen,
        open,
        close,
        toggle,
        icon,
    };
}
