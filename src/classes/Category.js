// eslint-disable-next-line no-unused-vars
class Category {
    constructor(config = {}) {
        this.name = config.name || "Unnamed Category";
        this.saves = config.saves || [];
        this.desc = config.desc || "";
        this.color = config.color || "";
        this.placeholder = config.placeholder || "No save file available.";
        this.allowSort = config.allowSort !== false;
        this.allowRaw = config.allowRaw === true;
        this.sortMode = 0;

        const saveNames = new Set();
        for (const s of this.saves) {
            if (saveNames.has(s.name)) {
                throw new Error(`Warning: Save file name should not be repeated for: "${s.name}"`);
            }
            saveNames.add(s.name);
        }
    }

    hasSaves() {
        return this.saves.length > 0;
    }

    getSortedSaves() {
        if (!this.hasSaves || this.sortMode >= Category.sortingMethods.length) {
            return [];
        }
        return Category.sortingMethods[this.sortMode].method(this.saves);
    }

    getSortModeName() {
        if (this.sortMode >= Category.sortingMethods.length) {
            return "";
        }
        return Category.sortingMethods[this.sortMode].name;
    }

    toggleSortMode() {
        this.sortMode = (this.sortMode + 1) % Category.sortingMethods.length;
    }

    resetSortMode() {
        this.sortMode = 0;
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

export default Category;
