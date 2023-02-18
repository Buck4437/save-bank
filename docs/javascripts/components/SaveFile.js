Vue.component("save-file", {
    props: {
        saveFile: Object
    },
    template: `
    <div class="file-con">
        <div class="file-text-con">
            <div class="file-name">{{saveFile.name}}</div>
            <div class="pre-formatted file-desc">{{saveFile.desc}}</div>
        </div>
        <div class="file-btn-con">
            <tooltip-button class="file-btn" tooltip="Copied!" @click="saveFile.copy()">
                Copy to Clipboard
            </tooltip-button>
            <button class="file-btn" @click="saveFile.export()">
                Export as .txt
            </button>
        </div>
    </div>
    `
});
