"use strict";

Vue.component("tab-settings", {
    data() {
        return {
            showWipeDataModal: false
        }
    },
    props: {
        theme: String
    },
    template: `
    <div class="tab settings-tab">
        <category-header title="Settings"></category-header>

        <button @click="$emit('switch-theme')">
            Theme: {{theme}}
        </button>

        <button class="warning" @click="showWipeDataModal = true">
            Wipe all user data
        </button>

        <modal-confirm v-if="showWipeDataModal" @yes="$emit('reset')" @no="showWipeDataModal = false">
            <template v-slot:header>
                <span class="warning">Wipe all user data</span>
            </template>

            Are you sure you want to wipe all user data? <span class="warning">This cannot be undone!</span>
        </modal-confirm>
    </div>
    `
})
