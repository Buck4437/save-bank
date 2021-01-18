"use strict";

Vue.component("tab-saves", {
    data() {
        return {
            sortTypes: ["Early to late", "Late to early"]
        }
    },
    props: {
        selectedCategory: Object,
        sortMode: Number
    },
    computed: {
        saves() {
            let saves = this.selectedCategory.saves
            switch (this.sortMode) {
                case 0: return saves;
                case 1: return [...saves].reverse();
            }
        }
    },
    methods: {
        toggleSort() {
            let newId = this.sortMode + 1;
            if (newId >= this.sortTypes.length) {
                newId = 0;
            }
            this.$emit("set-sort", newId);
        }
    },
    template: `
    <div class="tab file-list">
        <category-header :title="selectedCategory.name">
            <template v-slot:description>
                {{selectedCategory.desc || ""}}
            </template>

            <template v-slot:buttons>
                <button @click="toggleSort">
                    Ordering: {{sortTypes[sortMode]}}
                </button>
            </template>
        </category-header>

        <div v-if="selectedCategory.saves === undefined || selectedCategory.saves.length === 0"
              class="warning">No save file available.</div>

        <save-file-container v-else
                             v-for="(saveFile, i) in saves"
                             :class="i % 2 == 1 ? selectedCategory.era + '-background' : ''"
                             :save-file="saveFile"
                             :key="i">
        </save-file-container>
    </div>
    `
})
