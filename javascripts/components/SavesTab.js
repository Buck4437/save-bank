"use strict";

Vue.component("saves-tab", {
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
            let newId = this.sortMode + 1;
            if (newId >= this.sortTypes.length) {
                newId = 0;
            }
            this.$emit("set-sort", newId);
        }
    },
    template: `
    <div class="tab file-list">
        <tab-header :title="selectedCategory.name">
            <template #description>
                {{selectedCategory.desc || ""}}
            </template>

            <template #buttons>
                <button @click="toggleSort">
                    Ordering: {{sortTypes[sortMode]}}
                </button>
            </template>
        </tab-header>

        <div v-if="!hasSaves" class="warning no-saves">No save file available.</div>

        <save-file v-else
                   v-for="(saveFile, i) in saves"
                   :save-file="saveFile"
                   class="save-file"
                   :class="i % 2 == 1 ? selectedCategory.era + '-background' : ''"
                   :key="i">
        </save-file>
    </div>
    `
})
