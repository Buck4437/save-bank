"use strict";

Vue.component("save-file", {
    props: {
        saveFile: Object
    },
    methods: {
        copyText() {
            copyText(this.saveFile.data);
        },
        exportFile() {
            let filename = this.saveFile.name + ".txt";
            let text = this.saveFile.data;
            download(filename, text);
        }
    },
    data() { return {
        searchThing
    }},
    template: `
    <div class="file-con">
        <div class="file-text-con">
            <div class="file-name">{{saveFile.name}}</div>
            <div class="pre-formatted file-desc">{{saveFile.desc || "No description provided."}}</div>
        </div>
        <div class="file-btn-con">
            <tooltip-button class="file-btn" tooltip="Copied!" @click="copyText">
                Copy to Clipboard
            </tooltip-button>
            <button class="file-btn" @click="exportFile">
                Export as .txt
            </button>
            <slot name="extra-buttons"/>
        </div>
    </div>
    `
})
