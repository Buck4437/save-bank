Vue.component("saves-list", {
    props: {
        category: Object,
        sortMode: Number
    },
    template: `
    <div>
        <save-file v-for="(saveFile, i) in category.getSortedSaves(sortMode)"
                   class="save-file"
                   :save-file="saveFile"
                   :class="'category-theme-' + category.theme + (i % 2 == 1 ? '-background' : '-background-odd')"
                   :key="i">
        </save-file>
    </div>
    `
});
