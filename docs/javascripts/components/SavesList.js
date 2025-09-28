Vue.component("saves-list", {
    props: {
        category: Object,
        sortMode: Number
    },
    computed: {
        sortedSaves() {
            return this.category.getSortedSaves(this.sortMode);
        }
    },
    template: `
    <div>
        <save-file v-for="(saveFile, i) in sortedSaves"
                   class="save-file"
                   :save-file="saveFile"
                   :class="'category-theme-' + category.theme + (i % 2 == 1 ? '-background' : '-background-odd')"
                   :key="i">
        </save-file>
    </div>
    `
});
