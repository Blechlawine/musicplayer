import { defineStore } from "pinia";

interface IState {
    content: Array<IContextMenuEntry>;
    isOpen: boolean;
    pos: {
        x: number;
        y: number;
    };
};

type TGetters = {};

interface IActions {
    open(_content: IContextMenuEntry[]): void;
}

const useContextMenu = defineStore<"contextMenu", IState, TGetters, IActions>("contextMenu", {
    state: () => ({
        content: [],
        isOpen: false,
        pos: {
            x: 0,
            y: 0,
        },
    }),
    actions: {
        open(_content) {
            this.content = _content;
            this.isOpen = true;
        },
    },
});

export default useContextMenu;
