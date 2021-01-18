"use strict";

Vue.component("tab-custom-saves", {
    data() {
        return {
            customSaves: [],
            showAddModal: false,
            QUOTA: 10
        }
    },
    computed: {
        maxQuota() {
            return this.customSaves.length >= this.QUOTA;
        }
    },
    methods: {
        nonRepeatName(base = "New Save") {
            let name = base;
            let names = this.customSaves.map(s => s.name);
            let tmp = 1;
            while (names.indexOf(name) != -1) {
                name = `${base} (${tmp})`
                tmp++;
            }
            return name
        },
        addSaveFile(saveFile) {
            this.showAddModal = false;
            if (saveFile.name.replace(/\s/g, "") == "") {
                saveFile.name = "New Save";
            }
            saveFile.name = this.nonRepeatName(saveFile.name);
            this.customSaves.push(saveFile);
        },
        edit(i, newSaveFile) {
            let oldSaveFile = this.customSaves[i];
            for (let attr in newSaveFile) {
                if (attr === "name") {
                    oldSaveFile[attr] = newSaveFile[attr] + "1"; //bypass the name repeat check
                    oldSaveFile[attr] = this.nonRepeatName(newSaveFile[attr]);
                } else {
                    oldSaveFile[attr] = newSaveFile[attr];
                }
            }
        },
        deleteFile(i) {
            this.customSaves.splice(i, 1);
        },
        exportAll() {
            zipSaves(this.customSaves);
        },
        save() {
            let data = {
                saves: this.customSaves
            }
            localStorage.setItem("saveBankCustomSaves", JSON.stringify(data));
        }
    },
    watch: {
        customSaves: {
            deep: true,
            handler: "save"
        }
    },
    mounted() {
        let saves = localStorage.getItem("saveBankCustomSaves");
        if (String(saves) !== "undefined" && String(saves) !== "null") {
            let data = JSON.parse(saves);
            if (Array.isArray(data.saves)) {
                for (let save of data.saves) {
                    this.customSaves.push(save);
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
                <button v-if="customSaves.length >= 2" @click="exportAll">
                    Export as .zip
                </button>
                <button v-if="!maxQuota" @click="showAddModal = true">
                    Add new save
                </button>
            </template>
        </category-header>
        <div v-for="(saveFile, i) in customSaves"
             :class="i % 2 == 1 ? 'custom-background' : ''">
            <custom-save-container :saveFile="saveFile" @delete="deleteFile(i)" @edit="edit(i, $event)"/>
        </div>
        <modal-input v-if="showAddModal"
                     header="Enter save info:"
                     :value="{name: nonRepeatName()}"
                     @submit="addSaveFile"
                     @close="showAddModal = false"/>
    </div>
    `
})
