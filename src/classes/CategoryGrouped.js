import Category from "./Category.js";

// For category group, this.saves is a list of group, which has a list of saves

// eslint-disable-next-line no-unused-vars
class CategoryGrouped extends Category {

    checkSaveNameRepeat() {
        for (const group of this.saves) {
            const saveNames = new Set();
            for (const s of group.saves) {
                if (saveNames.has(s.name)) {
                    throw new Error(`Warning: Save file name should not be repeated for: "${s.name}"`);
                }
                saveNames.add(s.name);
            }
        }
    }

    getSaveCount() {
        return this.saves.map(group => group.getSaveCount()).reduce((a, b) => a + b, 0)
    }

    hasSaves() {
        return this.getSaveCount() > 0;
    }

    getSortedSaves(sortMode = 0) {
        if (!this.hasSaves || sortMode > this.getMaxSortMode()) {
            return [];
        }
        return CategoryGrouped.sortingMethods[sortMode].method(this.saves);
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

export default CategoryGrouped;
