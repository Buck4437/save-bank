"use strict";

Vue.component("custom-saves-tab", {
    data() {
        return {
            showModal: {
                add: false
            },
            QUOTA: 10
        }
    },
    props: {
        customSaves: Array
    },
    computed: {
        maxQuota() {
            return this.customSaves.length >= this.QUOTA;
        }
    },
    methods: {
        validateName(base = "", pos = -1) { //pos = position to exclude
            base = base.trim() || "New Save";

            let name = base;
            let names = this.customSaves.filter((v, i) => i != pos).map(s => s.name);

            for (let j = 1; names.indexOf(name) != -1; j++) {
                name = base + `(${j})`;
            }

            return name;
        },
        addSaveFile(saveFile) {
            this.showModal.add = false;
            this.set(this.customSaves.length, saveFile);
        },
        deleteFile(i) {
            this.customSaves.splice(i, 1);
        },
        set(i, saveFile) {
            saveFile.name = this.validateName(saveFile.name, i);
            this.customSaves.splice(i, 1, saveFile);
        },
        zipSaves(saves) {
            zipSaves(saves);
        }
    },
    template: `
    <div class="tab file-list">
        <tab-header title="Custom Saves">
            <template #description>
                Quota: <span :class="{'warning': maxQuota}">{{customSaves.length}} / {{QUOTA}}</span>
            </template>

            <template #buttons>
                <button v-if="customSaves.length >= 2" @click="zipSaves(customSaves)">
                    Export as .zip
                </button>
                <button v-if="!maxQuota" @click="showModal.add = true">
                    Add new save
                </button>
            </template>
        </tab-header>
        <custom-save-file v-for="(saveFile, i) in customSaves"
                          :class="i % 2 == 1 ? 'custom-background' : ''"
                          :saveFile="saveFile"
                          @delete="deleteFile(i)"
                          @edit="set(i, $event)"
                          :key="i"/>
        <input-modal v-if="showModal.add"
                     header="Enter save info:"
                     :value="{name: validateName()}"
                     @submit="addSaveFile"
                     @close="showModal.add = false"/>
    </div>
    `
})
