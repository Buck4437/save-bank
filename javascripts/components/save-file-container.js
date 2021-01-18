"use strict";

Vue.component("save-file-container", {
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
    template: `
    <div class="file-con">
        <div class="file-text-con">
            <div class="file-name">
                {{saveFile.name}}
            </div>
            <div class="pre-formatted file-desc">
                <i>{{saveFile.desc || "No description provided."}}</i>
            </div>
        </div>
        <div class="file-btn-con">
            <button-tooltip class="file-btn" tooltip="Copied!" @click="copyText">
                Copy to Clipboard
            </button-tooltip>
            <button class="file-btn" @click="exportFile">
                Export as .txt
            </button>
            <slot name="extra-buttons"/>
        </div>
    </div>
    `
})
