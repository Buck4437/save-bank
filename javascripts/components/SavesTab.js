"use strict";

Vue.component("saves-tab", {
    data() {
        return {
            sortTypes: ["Early to late", "Late to early"],
            sortMode: 0
        }
    },
    props: {
        selectedCategory: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        hasSaves() {
            return this.saves.length !== 0;
        },
        saves() {
            let saves = this.selectedCategory.saves || [];
            switch (this.sortMode) {
                case 0: return saves;
                case 1: return [...saves].reverse();
            }
        }
    },
    methods: {
        toggleSort() {
            this.sortMode ++;
            if (this.sortMode >= this.sortTypes.length) {
                this.sortMode = 0;
            }
        }
    },
    template: `
    <div class="tab file-list">
        <tab-header :title="selectedCategory.name">
            <template #description>
                {{selectedCategory.desc || ""}}
            </template>

            <template #buttons>
                <button v-if="selectedCategory.sort !== false && hasSaves" @click="toggleSort">
                    Ordering: {{sortTypes[sortMode]}}
                </button>
            </template>
        </tab-header>

        <div v-if="!hasSaves" class="no-saves">{{selectedCategory.placeholder || "No save file available."}}</div>

        <save-file v-else
                   v-for="(saveFile, i) in saves"
                   :save-file="saveFile"
                   class="save-file"
                   :class="i % 2 == 1 ? selectedCategory.color + '-background' : ''"
                   :key="i">
        </save-file>
    </div>
    `
})
