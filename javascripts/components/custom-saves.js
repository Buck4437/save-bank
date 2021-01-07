"use strict";

Vue.component("custom-saves", {
    template: `
    <div>
        <category-header title="Custom Saves" :showButton="!maxQuota" button="Add new save" @click="showAddModal = true">
            Quota: <span :class="{'warning': maxQuota}">{{customSaves.length}} / {{QUOTA}}</span>
        </category-header>
        <div v-for="(saveFile, i) in customSaves" :class="i % 2 == 1 ? 'custom-background' : ''">
            <save-file-custom-container :saveFile="saveFile" @delete="deleteFile(i)" @edit="edit(i, $event)"/>
        </div>
        <modal-input v-if="showAddModal" header="Enter save info:" @close="closeAddModal" @submit="addSaveFile"/>
    </div>
    `,
    data() {
        return {
            saveIndex: 0,
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
        addSaveFile(saveFile) {
            this.closeAddModal();
            if (saveFile.name.replace(/\s/g, "") == "") {
                saveFile.name = "Save #" + (this.saveIndex + 1)
                this.saveIndex ++;
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
            this.showAddModal = false
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
            if (isNumber(data.index)) {
                this.saveIndex = data.index;
            }
        }
    }
})
