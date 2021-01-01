"use strict";

Vue.component("save-file-button-copy", {
    template: `
    <button-tooltip class="file-btn" @click="copyText(data)">
        Copy to Clipboard
        <template v-slot:tooltip>
            Copied!
        </template>
    </button-tooltip>
    `,
    props: {
        data: String
    },
    methods: {
        copyText(data) {
            copyText(data);
        }
    }
})
