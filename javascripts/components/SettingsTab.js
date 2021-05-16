Vue.component("settings-tab", {
    data() {
        return {
            themes
        };
    },
    methods: {
        switchTheme() {
            this.settings.theme ++;
            if (this.settings.theme >= themes.length) {
                this.settings.theme = 0;
            }
            setTheme(this.settings.theme);
        }
    },
    props: {
        settings: Object
    },
    template: `
    <div class="tab settings-tab">
        <tab-header title="Settings"/>

        <button @click="switchTheme">
            Theme: {{themes[settings.theme]}}
        </button>
    </div>
    `
});
