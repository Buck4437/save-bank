"use strict";

Vue.component("custom-saves", {
    template: `
    <div>
        <div class="cat-header">
            <div class="cat-info">
                <span class="cat-title">Custom Saves</span>
                <span class="cat-desc"><i>Saves: {{customSaves.length}} / 10</i></span>
            </div>
            <div class="custom-save-info">
                <button class="add-save-btn" v-if="customSaves.length < 10" @click="add()">
                    Add new save
                </button>
            </div>
        </div>
        <div class="file-con custom-save-con" v-for="(saveFile, i) in customSaves"
            :class="i % 2 == 1 ? 'custom-background' : ''">
            <div class="file-text-con">
                <div class="file-name">{{saveFile.name}}</div>
                <span class="pre-formatted file-desc"><i>{{saveFile.desc === "" ? "No description provided." : saveFile.desc}}</i></span>
            </div>
            <div class="file-btn-con">
                <button class="file-btn rename-btn" @click="rename(saveFile)">Edit name</button>
                <button class="file-btn edit-desc-btn" @click="editDesc(saveFile)">Edit description</button>
                <button class="file-btn edit-data-btn" @click="editData(saveFile)">Edit data</button>
                <tooltip-button class="file-btn-outer" @click="copyByPath(saveFile)"
                                text="Copy To Clipboard" tooltip-text="Copied!"
                                :button-class="['file-btn-inner', 'copy-btn']"></tooltip-button>
                <button class="file-btn export-btn" @click="downloadFile(saveFile)">Export as .txt</button>
                <button class="file-btn delete-btn" @click="deleteFile(saveFile)">Delete</button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            customSaves: []
        }
    },
    methods: {
        add() {
            let save = prompt("Enter your save data here:").replace(/\s/g, "");
            if (save !== null && save !== undefined && save !== "") {
                this.customSaves.push(this.makeSave(save));
                this.update();
            }
        },
        rename(save) {
            let name = prompt("Enter new name:");
            if (name !== null && name !== undefined && name.replace(/\s/g, "") !== "") {
                save.name = name;
                this.update();
            }
        },
        editDesc(save) {
            let desc = prompt("Enter new description:");
            if (desc !== null && desc !== undefined && desc.replace(/\s/g, "") !== "") {
                save.desc = desc;
                this.update();
            }
        },
        editData(save) {
            let data = prompt("Enter new save data:");
            if (data !== null && data !== undefined && data.replace(/\s/g, "") !== "") {
                save.data = data;
                this.update();
                alert("Save data updated!");
            }
        },
        deleteFile(save) {
            if (confirm(`Are you sure you want to delete this save file (${save.name})? This cannot be undone!`)) {
                this.customSaves.splice(this.customSaves.indexOf(save), 1);
                this.update();
            }
        },
        makeSave(data = "") {
            return {
                name: "Save #" + (this.customSaves.length + 1),
                desc: "",
                data: data
            }
        },
        update() {
            localStorage.setItem("saveBankCustomSaves", JSON.stringify(this.customSaves))
        },
        copyByPath(save) {
            this.$emit('copy-file', save);
        },
        downloadFile(save) {
            this.$emit('download-file', save);
        }
    },
    mounted() {
        let saves = localStorage.getItem("saveBankCustomSaves");
        if (saves !== undefined) {
            let savesArray = JSON.parse(saves);
            if (Array.isArray(savesArray)) {
                for (let save of savesArray) {
                    this.customSaves.push(save);
                }
            }
        }
    }
})
