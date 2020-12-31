"use strict";

Vue.component("custom-saves", {
    template: `
    <div>
        <div class="cat-header">
            <div class="cat-info">
                <span class="cat-title">Custom Saves</span>
                <span class="cat-desc"><i>Quota: <span :class="{'warning': customSaves.length >= 10}">{{customSaves.length}} / 10</span></i></span>
            </div>
            <button class="add-save-btn" v-if="customSaves.length < 10" @click="edit(-1)">
                Add new save
            </button>
        </div>
        <div class="file-con custom-save-con" v-for="(saveFile, i) in customSaves"
            :class="i % 2 == 1 ? 'custom-background' : ''">
            <div class="file-text-con">
                <div class="file-name">{{saveFile.name}}</div>
                <span class="pre-formatted file-desc"><i>{{saveFile.desc === "" ? "No description provided." : saveFile.desc}}</i></span>
            </div>
            <div class="file-btn-con">
                <tooltip-button class="file-btn-outer" @click="copy(saveFile)"
                                text="Copy To Clipboard" tooltip-text="Copied!"
                                :button-class="['file-btn-inner', 'copy-btn']"></tooltip-button>
                <button class="file-btn export-btn" @click="downloadFile(saveFile)">Export as .txt</button>
                <button class="file-btn edit-btn" @click="edit(i)">Edit</button>
                <button class="file-btn delete-btn warning" @click="deleteFile(i)">Delete</button>
            </div>
        </div>
        <input-model :fields="fields" :header="inputHeader"
                    @submit="submit" @close="close('.custom-save-input-model')"
                    :default="inputDefault" style="display: none;"
                    class="custom-save-input-model"></input-model>
        <confirm-model header="Confirmation" :text="deleteConfirmationText"
                    class="custom-save-confirm-model"
                    style="display: none;"
                    @close="close('.custom-save-confirm-model')"
                    @confirm="trueDelete()"></confirm-model>
    </div>
    `,
    data() {
        return {
            saveIndex: 0, // used for counting saves created
            customSaves: [],
            fields: ["Name", "Desc", "Data"],
            currentFileIndex: -1
        }
    },
    computed: {
        inputHeader() {
            let index = this.currentFileIndex;
            let saves = this.customSaves;
            if (index < 0 || index >= saves.length) {
                return "Enter save info:"
            }
            return "Edit save info:"
        },
        inputDefault() {
            let index = this.currentFileIndex;
            let saves = this.customSaves;
            if (index < 0 || index >= saves.length) {
                return null;
            }
            return saves[index];
        },
        deleteConfirmationText() {
            let save = this.customSaves[this.currentFileIndex] || {name: "Placeholder"};
            let name = save.name
            return `Are you sure you want to delete this save file (${name})? This cannot be undone!`
        }
    },
    methods: {
        submit(save) {
            let oldSave = this.inputDefault;
            if (oldSave === null) {
                if (save.name.replace(/\s/g, "") == "") {
                    save.name = "Save #" + (this.saveIndex + 1)
                    this.saveIndex ++;
                }
                this.customSaves.push(save)
            } else {
                for (let attr in save) {
                    oldSave[attr] = save[attr];
                }
            }
            this.save();
            this.close('.custom-save-input-model');
        },
        edit(i) {
            this.currentFileIndex = i;
            this.open('.custom-save-input-model');
        },
        copy(save) {
            this.$emit('copy-file', save);
        },
        downloadFile(save) {
            this.$emit('download-file', save);
        },
        deleteFile(i) {
            this.currentFileIndex = i;
            this.open('.custom-save-confirm-model');
        },
        trueDelete() {
            let i = this.currentFileIndex;
            this.customSaves.splice(i, 1);
            this.save();
            this.close('.custom-save-confirm-model');
        },
        open(c) {
            let element = this.$el.querySelector(c)
            element.style.display = "flex";
            let body = document.querySelector("body")
            body.style.overflowY = "hidden";
        },
        close(c) {
            let element = this.$el.querySelector(c)
            element.style.display = "none";
            let body = document.querySelector("body")
            body.style.overflowY = "scroll";
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
        if (saves !== undefined) {
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
