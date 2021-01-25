"use strict";

Vue.component("settings-tab", {
    data() {
        return {
            showWipeDataModal: false
        }
    },
    methods: {
        reset() {
            localStorage.removeItem("saveBankData");
            location.reload();
        }
    },
    props: {
        theme: String
    },
    template: `
    <div class="tab settings-tab">
        <tab-header title="Settings"/>

        <button @click="$emit('switch-theme')">
            Theme: {{theme}}
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
})
