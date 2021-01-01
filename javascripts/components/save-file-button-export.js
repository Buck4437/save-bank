"use strict";

Vue.component("save-file-button-export", {
    template: `
    <button class="file-btn" @click="exportFile(saveFile)">
        Export as .txt
    </button>
    `,
    props: {
        saveFile: Object
    },
    methods: {
        exportFile(saveFile) {
            let filename = saveFile.name + ".txt";
            let text = saveFile.data;
            download(filename, text);
        }
    }
})
