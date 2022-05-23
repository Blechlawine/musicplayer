import { defineStore, StoreDefinition } from "pinia";
import { ContextMenuEntry } from "../types/ui";

type State = {
    content: Array<ContextMenuEntry>;
    isOpen: boolean;
    pos: {
        x: number;
        y: number;
    };
};

const useContextMenu: StoreDefinition = defineStore("contextMenu", {
    state: (): State => ({
        content: [],
        isOpen: false,
        pos: {
            x: 0,
            y: 0,
        },
    }),
    actions: {
        open(_content: ContextMenuEntry[]) {
            this.content = _content;
            this.isOpen = true;
        },
    },
});

export default useContextMenu;
