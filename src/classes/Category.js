// eslint-disable-next-line no-unused-vars
class Category {
    constructor(config = {}) {
        this.name = config.name || "Unnamed Category";
        this.saves = config.saves || [];
        this.desc = config.desc || "";
        this.theme = config.theme || "default";
        this.placeholder = config.placeholder || "No save file available.";

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

    getMaxSortMode() {
        return Category.sortingMethods.length - 1;
    }

    getSortedSaves(sortMode = 0) {
        if (!this.hasSaves || sortMode > this.getMaxSortMode()) {
            return [];
        }
        return Category.sortingMethods[sortMode].method(this.saves);
    }

    getSortModeName(sortMode = 0) {
        if (sortMode > this.getMaxSortMode()) {
            return "";
        }
        return Category.sortingMethods[sortMode].name;
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
