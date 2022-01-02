Vue.component("saves-tab", {
    data() {
        return {
            searchBarText: "",
            searchBarSvg: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 " +
            "3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01" +
            " 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        };
    },
    props: {
        category: {
            type: Object,
            default: () => new Category()
        },
        currentTab: String,
        index: Number
    },
    computed: {
        metadata() {
            return {
                categoryIndex: this.index,
                allowRaw: this.category.allowRaw
            };
        },
        hasNoResult() {
            return !this.category.hasSaves() && this.hasText;
        },
        hasText() {
            return this.searchBarText.trim() !== "";
        },
        saves() {
            const saves = this.category.getSortedSaves();
            const param = this.searchBarText.trim().toLowerCase();
            if (this.hasText) {
                return saves.filter(s => s.name.toLowerCase().includes(param));
            }
            return saves;
        }
    },
    methods: {
        updateText(str) {
            this.searchBarText = str;
        }
    },
    watch: {
        currentTab() {
            this.updateText("");
            this.category.resetSortMode();
        }
    },
    template: `
    <div class="tab file-list">
        <tab-header :title="category.name">
            <template #description>
                <span class="pre-formatted">{{category.desc}}</span>
            </template>

            <template #buttons>
                <button v-if="category.allowSort !== false && !hasNoResult"
                        @click="category.toggleSortMode()">
                    Ordering: {{category.getSortModeName()}}
                </button>
            </template>
        </tab-header>
        <div v-if="!category.hasSaves()"
             class="no-saves">
            {{category.placeholder}}
        </div>
        <div v-else>
            <div class="search-bar">
                <svg class="search-bar-icon"
                     focusable="false"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                     <path style="fill: var(--color)" :d="searchBarSvg"/>
                </svg>
                <div class="search-bar-seperator"/>
                <input class="search-bar-input"
                       placeholder="Search in current tab..." v-model="searchBarText">
            </div>
            <save-file v-for="(saveFile, i) in saves"
                       :save-file="saveFile"
                       :metadata="metadata"
                       :save-index="i"
                       class="save-file"
                       :class="i % 2 == 1 ? category.color + '-background' : ''"
                       :key="i">
            </save-file>
        </div>
    </div>
    `
});
