Vue.component("save-file", {
    props: {
        saveFile: Object
    },
    methods: {
        copyText() {
            File.copyText(this.saveFile.data);
        },
        exportFile() {
            const filename = `${this.saveFile.name}.txt`;
            const text = this.saveFile.data;
            File.download(filename, text);
        }
    },
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
        </div>
    </div>
    `
});
