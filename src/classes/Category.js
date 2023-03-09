import { default as wordShift } from "../methods/word-shift.js"

// eslint-disable-next-line no-unused-vars
class Category {
    constructor(config = {}) {
        this.name = config.name || "Unnamed Category";
        this.saves = config.saves || [];
        this.desc = config.desc || "";
        this.glitched = config.glitched || false;
        this.theme = config.theme || "default";
        this.placeholder = config.placeholder || "No save file available.";
    }

    checkSaveNameRepeat() {
        const saveNames = new Set();
        for (const s of this.saves) {
            if (saveNames.has(s.name)) {
                throw new Error(`Warning: Save file name should not be repeated for: "${s.name}"`);
            }
            saveNames.add(s.name);
        }
    }

    getDesc() {
        return this.glitched ? Category.processText(this.desc) : this.desc;
    }

    getSaveCount() {
        return this.saves.length;
    }

    hasSaves() {
        return this.getSaveCount() > 0;
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

    static processText(text) {
        const parsedText = text.replace(/<glitch>([^<]*)<\/glitch>/g, (match, group) => {
            return wordShift.wordCycle(group.split("&"))
        });
        return parsedText;
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
