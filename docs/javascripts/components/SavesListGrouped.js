Vue.component("saves-list-grouped", {
    props: {
        category: Object,
        sortMode: Number
    },
    computed: {
        sortedSaves() {
            return this.category.getSortedSaves(this.sortMode);
        }
    },
    methods: {
        arrow(isShown) {
            return isShown ? "▲" : "▼";
        },
        getSaveTheme(group, i) {
            if (i % 2 === 1) {
                return [
                    `category-theme-${group.theme}-background`,
                    `category-theme-${this.category.theme}-background`
                ];
            }
            return [
                `category-theme-${group.theme}-background-odd`,
                `category-theme-${this.category.theme}-background-odd`
            ];
        },
        getHeaderTheme(group) {
            return `category-theme-${group.theme}`;
        }
    },
    template: `
    <div>
        <div v-for="(group, groupIdx) in sortedSaves">
            <button class="group-header" :class="getHeaderTheme(group)" @click="group.toggle()">
                {{arrow(group.isShown)}} {{group.name}} ({{group.getSaveCount()}})
            </button>
            <div v-if="group.isShown">
                <save-file v-for="(saveFile, i) in group.getSortedSaves(sortMode)"
                        class="save-file"
                        :save-file="saveFile"
                        :class="getSaveTheme(group, i)"
                        :key="i">
                </save-file>
            </div>
        </div>
    </div>
    `
});
