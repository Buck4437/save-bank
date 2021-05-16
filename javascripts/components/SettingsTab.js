Vue.component("settings-tab", {
    data() {
        return {
            themes,
            showWipeDataModal: false
        };
    },
    methods: {
        switchTheme() {
            this.settings.theme ++;
            if (this.settings.theme >= themes.length) {
                this.settings.theme = 0;
            }
            setTheme(this.settings.theme);
        },
        reset() {
            localStorage.removeItem("saveBankData");
            location.reload();
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

        <button class="warning" @click="showWipeDataModal = true">
            Wipe all user data
        </button>

        <confirmation-modal v-if="showWipeDataModal" @yes="reset" @no="showWipeDataModal = false">
            <template #header>
                <span class="warning">Wipe all user data</span>
            </template>

            Are you sure you want to wipe all user data? <span class="warning">This cannot be undone!</span>
        </confirmation-modal>
    </div>
    `
});
