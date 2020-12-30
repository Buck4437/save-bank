"use strict";

Vue.component("custom-saves", {
    template: `
    <div>
        <div class="cat-header">
            <div class="cat-info">
                <span class="cat-title">Custom Saves</span>
                <span class="cat-desc">
                    <i>
                        Saves: <span :class="{'warning': customSaves.length >= 10}">{{customSaves.length}} / 10</span>
                    </i>
                </span>
            </div>
            <div class="custom-save-info">
                <button class="add-save-btn" v-if="customSaves.length < 10" @click="open()">
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
                <button class="file-btn delete-btn warning" @click="deleteFile(saveFile)">Delete</button>
            </div>
        </div>
        <div class="model-outer">
            <div class="model custom-save-model">
                <button class="model-close" @click="close()">×</button>
                <div class="custom-save-model-header">Input save info here:</div>
                <ul>
                    <li>Name: <input class="input-name"></input></li>
                    <li>Desc: <input class="input-desc"></input></li>
                    <li>Data: <input class="input-data"></input></li>
                </ul>
                <button class="custom-save-submit-btn" @click="add()">Submit</button>
            </div>
            <div class="model-mask">
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            saveIndex: 0, // used for counting saves created
            customSaves: [],
            fields: ["Name", "Desc", "Data"]
        }
    },
    methods: {
        open() {
            let element = this.$el.querySelector(".model-outer")
            element.classList.add("is-active")
        },
        close() {
            let element = this.$el.querySelector(".model-outer")
            element.classList.remove("is-active")
        },
        add() {
            let nameEl = this.$el.querySelector(".input-name");
            let descEl = this.$el.querySelector(".input-desc");
            let dataEl = this.$el.querySelector(".input-data");
            let name = nameEl.value
            let desc = descEl.value
            let data = dataEl.value
            if (name.replace(/\s/g, "") == "") {
                name = "Save #" + (this.saveIndex + 1)
                this.saveIndex ++;
            }
            this.customSaves.push(this.makeSave(name, desc, data));
            this.update();
            nameEl.value = "";
            descEl.value = "";
            dataEl.value = "";
            this.close();
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
            let data = prompt("Enter new save data:")
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
        makeSave(name = "", desc = "", data = "") {
            return {
                name: name,
                desc: desc,
                data: data
            }
        },
        update() {
            let data = {
                index: this.saveIndex,
                saves: this.customSaves
            }
            localStorage.setItem("saveBankCustomSaves", JSON.stringify(data));
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
