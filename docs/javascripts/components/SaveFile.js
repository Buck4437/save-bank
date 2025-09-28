Vue.component("save-file", {
    props: {
        saveFile: Object
    },
    data() {
        return {
            desc: ""
        };
    },
    computed: {
        hasAuthor() {
            return this.saveFile.author !== "";
        }
    },
    methods: {
        updateText() {
            this.desc = this.saveFile.getDesc();
        },
        mountInterval() {
            // To save performance
            if (this.saveFile.glitched) {
                this.interval = setInterval(this.updateText, 50);
            }  
        },
        onSaveChange() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            this.updateText();
            this.mountInterval();
        }
    },
    watch: {
        category() {
            this.onSaveChange();
        },  
        saveFile() {
            this.onSaveChange();
        }
    },
    mounted() {
        this.updateText();
        this.mountInterval();
    },
    template: `
    <div class="file-con">
        <div class="file-text-con">
            <div class="file-name">{{saveFile.name}}</div>
            <div class="pre-formatted file-desc">{{desc}}</div>
            <div v-if="hasAuthor" class="file-author">Submitted by {{saveFile.author}}</div>
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
