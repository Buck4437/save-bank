Vue.component("save-file", {
    props: {
        saveFile: Save,
        metadata: Object,
        saveIndex: Number
    },
    methods: {
        raw() {
            const params = {};
            params[Url.CAT_IDX_PARAM] = this.metadata.categoryIndex;
            params[Url.SAVE_IDX_PARAM] = this.saveIndex;
            this.saveFile.raw(params);
        }
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
            <button class="file-btn" @click="raw()">
                View as RAW
            </button>
        </div>
    </div>
    `
});
