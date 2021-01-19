"use strict";

Vue.component("tab-custom-saves", {
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
        validateName(base = "New Save", pos = -1) { //pos = position to exclude
            base = base.trim();
            if (base == "") {
                base = "New Save";
            }
            let name = base;
            let names = this.customSaves.filter((v, i) => i !== pos).map(s => s.name);
            let tmp = 1;
            while (names.indexOf(name) != -1) {
                name = `${base} (${tmp})`
                tmp++;
            }
            return name;
        },
        addSaveFile(saveFile) {
            this.showModal.add = false;
            saveFile.name = this.validateName(saveFile.name);
            this.customSaves.push(saveFile);
        },
        edit(i, newSaveFile) {
            let oldSaveFile = this.customSaves[i];
            for (let attr in newSaveFile) {
                if (attr === "name") {
                    oldSaveFile[attr] = this.validateName(newSaveFile[attr], i);
                } else {
                    oldSaveFile[attr] = newSaveFile[attr];
                }
            }
        }
    },
    template: `
    <div class="tab file-list">
        <category-header title="Custom Saves">
            <template v-slot:description>
                Quota: <span :class="{'warning': maxQuota}">{{customSaves.length}} / {{QUOTA}}</span>
            </template>

            <template v-slot:buttons>
                <button v-if="customSaves.length >= 2" @click="zipSaves(customSaves)">
                    Export as .zip
                </button>
                <button v-if="!maxQuota" @click="showModal.add = true">
                    Add new save
                </button>
            </template>
        </category-header>
        <div v-for="(saveFile, i) in customSaves"
             :class="i % 2 == 1 ? 'custom-background' : ''">
            <custom-save-container :saveFile="saveFile"
                                   @delete="customSaves.splice(i, 1)"
                                   @edit="edit(i, $event)"/>
        </div>
        <modal-input v-if="showModal.add"
                     header="Enter save info:"
                     :value="{name: validateName()}"
                     @submit="addSaveFile"
                     @close="showModal.add = false"/>
    </div>
    `
})
