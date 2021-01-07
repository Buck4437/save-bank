"use strict";

Vue.component("custom-saves", {
    template: `
    <div>
        <category-header title="Custom Saves">
            Quota: <span :class="{'warning': maxQuota}">{{customSaves.length}} / {{QUOTA}}</span>
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
                     :value="{name: placeholder}"
                     @submit="addSaveFile"
                     @close="closeAddModal"/>
    </div>
    `,
    data() {
        return {
            customSaves: [],
            showAddModal: false,
            QUOTA: 10
        }
    },
    computed: {
        placeholder() {
            let names = this.customSaves.map(s => s.name);
            let name = "New Save"
            let tmp = 1;
            while (names.indexOf(name) != -1) {
                name = `New Save (${tmp})`
                tmp++;
            }
            return name;
        },
        maxQuota() {
            return this.customSaves.length >= this.QUOTA;
        }
    },
    methods: {
        addSaveFile(saveFile) {
            this.closeAddModal();
            if (saveFile.name.replace(/\s/g, "") == "") {
                saveFile.name = "New Save";
            }
            let base = saveFile.name;
            let names = this.customSaves.map(s => s.name);
            let tmp = 1;
            while (names.indexOf(saveFile.name) != -1) {
                saveFile.name = `${base} (${tmp})`
                tmp++;
            }
            this.customSaves.push(saveFile)
            this.save();
        },
        edit(i, newSaveFile) {
            let oldSaveFile = this.customSaves[i];
            for (let attr in newSaveFile) {
                oldSaveFile[attr] = newSaveFile[attr];
            }
            this.save();
        },
        deleteFile(i) {
            this.customSaves.splice(i, 1);
            this.save();
        },
        closeAddModal() {
            this.showAddModal = false;
        },
        exportAll() {
            zipSaves(this.customSaves);
        },
        save() {
            let data = {
                index: this.saveIndex,
                saves: this.customSaves
            }
            localStorage.setItem("saveBankCustomSaves", JSON.stringify(data));
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
    }
})
