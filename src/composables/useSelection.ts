import { ComputedRef, ref, Ref } from "vue";

export default function useSelection<T extends { id: string }>(list: ComputedRef<T[]>) {
    const selection = ref([]) as Ref<T[]>;
    const lastIndex = ref(0);

    const _addToSelection = (item: T) => {
        if (!selection.value.includes(item)) {
            selection.value.push(item);
        }
    };

    const click = (item: T) => {
        selection.value = [];
        _addToSelection(item);
        lastIndex.value = list.value.indexOf(item);
    };

    const shiftClick = (item: T) => {
        const selectionEndIndex = list.value.findIndex((it) => it.id === item.id);
        if (selectionEndIndex > lastIndex.value) {
            for (let i = lastIndex.value; i <= selectionEndIndex; i++) {
                _addToSelection(list.value[i]);
            }
        } else {
            for (let i = lastIndex.value; i >= selectionEndIndex; i--) {
                _addToSelection(list.value[i]);
            }
        }
    };

    const ctrlClick = (item: T) => {
        _addToSelection(item);
        lastIndex.value = list.value.indexOf(item);
    };

    return {
        data: selection,
        ctrlClick,
        shiftClick,
        click,
    };
}
