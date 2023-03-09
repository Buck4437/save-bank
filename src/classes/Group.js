// eslint-disable-next-line no-unused-vars
class Group {
    constructor(config) {
        this.name = config.name || "Unnamed Group";
        this.saves = config.saves || [];
        this.isShown = false;
        this.theme = config.theme || "default";
    }

    toggle() {
        this.isShown = !this.isShown;
    }

    getSaveCount() {
        return this.saves.length;
    }

    getSortedSaves(sortMode = 0) {
        if (sortMode > this.getMaxSortMode()) {
            return [];
        }
        return Group.sortingMethods[sortMode].method(this.saves);
    }

    getMaxSortMode() {
        return Group.sortingMethods.length;
    }

    static sortingMethods = [
        {
            name: "Early to late",
            method: saves => [...saves]
        },
        {
            name: "Late to early",
            method: saves => [...saves].reverse()
        }
    ]

}

export default Group;
