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
        }
    },
    props: {
        settings: Object
    },
    template: `
    <div class="tab settings-tab">
        <tab-header title="Settings"/>

        <button @click="switchTheme">
            Theme: {{Theme.getTheme(settings.theme)}}
        </button>
    </div>
    `
});
