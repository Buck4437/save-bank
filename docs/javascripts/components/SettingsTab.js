Vue.component("settings-tab", {
    data() {
        return {
            Theme
        };
    },
    methods: {
        switchTheme() {
            newTheme = this.settings.theme + 1;
            if (newTheme >= Theme.themes.length) {
                newTheme = 0;
            }
            this.$emit("set-settings", "theme", newTheme);
            Theme.applyTheme(newTheme);
        },
        downloadAll() {
            this.$emit("download-all");
        }
    },
    props: {
        settings: Object
    },
    template: `
    <div class="tab settings-tab">
        <tab-header title="Settings"/>

        <div class="settings-btn-con">
            <button @click="switchTheme">
                Theme: {{Theme.getTheme(settings.theme)}}
            </button>

            <button @click="downloadAll">
                Download All Saves
            </button>
        </div>

    </div>
    `
});
