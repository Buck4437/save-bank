"use strict";

Vue.component("custom-saves", {
    template: `
    <div>
        <category-header>
            Custom Saves
            <template v-slot:description>
                Quota: <span :class="{'warning': customSaves.length >= 10}">{{customSaves.length}} / 10</span>
            </template>
            <template v-slot:button>
                <button class="add-save-btn" v-if="customSaves.length < 10" @click="showAddModal = true">
                    Add new save
                </button>
            </template>
        </category-header>
        <div v-for="(saveFile, i) in customSaves"
            :class="i % 2 == 1 ? 'custom-background' : ''">
            <save-file-custom-container :saveFile="saveFile" @delete="deleteFile(i)" @edit="edit(i, $event)"/>
        </div>
        <modal-input v-if="showAddModal" :fields="fields"
            @close="closeAddModal" @submit="addSaveFile">
            <template v-slot:header>
                Add save info:
            </template>
        </modal-input>
    </div>
    `,
    data() {
        return {
            saveIndex: 0,
            customSaves: [],
            fields: ["Name", "Desc", "Data"],
            showAddModal: false
        }
    },
    methods: {
        closeAddModal() {
            this.showAddModal = false
        },
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
