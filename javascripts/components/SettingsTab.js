Vue.component("settings-tab", {
    data() {
        return {
            themes
        };
    },
    methods: {
        switchTheme() {
            newTheme = this.settings.theme + 1;
            if (newTheme >= themes.length) {
                newTheme = 0;
            }
            this.$emit("set-settings", "theme", newTheme);
            setTheme(newTheme);
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
