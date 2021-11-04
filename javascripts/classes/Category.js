// eslint-disable-next-line no-unused-vars
class Category {
    constructor(config) {
        this.name = config.name || "Unnamed Category";
        this.saves = config.saves || [];
        this.desc = config.desc;
        this.color = config.color;
        this.placeholder = config.placeholder;
        this.allowSort = config.allowSort || true;
        this.sortMode = 0;
    }

    hasSaves() {
        return this.saves.length > 0;
    }


    getSortedSaves() {
        if (!hasSaves || this.sortMode >= Category.sortingMethods.length) {
            return [];
        }
        return Category.sortingMethods.method(this.saves);
    }


    toggleSortMode() {
        this.sortMode = (this.sortMode + 1) % Category.sortingMethods.length;
    }


    sortingMethods = [
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
