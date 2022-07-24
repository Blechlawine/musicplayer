import { ComputedRef, ref, Ref } from "vue";

export default function useSelection<T extends { id: string }>(list: ComputedRef<T[]>) {
    const selection = ref([]) as Ref<T[]>;
    const lastIndex = ref(0);

    const _addToSelection = (item: T) => {
        if (selection.value.findIndex((it) => it.id === item.id) === -1) {
            selection.value.push(item);
        }
    };

    const click = (item: T) => {
        selection.value = [];
        _addToSelection(item);
        lastIndex.value = list.value.findIndex((it) => it.id === item.id);
    };

    const shiftClick = (item: T) => {
        const selectionEndIndex = list.value.findIndex((it) => it.id === item.id);
        if (lastIndex.value === -1) lastIndex.value = 0;
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
        lastIndex.value = list.value.findIndex((it) => it.id === item.id);
    };

    return {
        data: selection,
        ctrlClick,
        shiftClick,
        click,
    };
}
