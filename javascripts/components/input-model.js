"use strict";

Vue.component("input-model", {
    template: `
    <div class="model-outer">
        <div class="model input-model">
            <button class="model-close" @click="close()">×</button>
            <div class="input-model-header">Input save info here:</div>
            <ul>
                <template v-for="field in fields" :key="field">
                    <li>{{field}}: <input :class="'input-' + field"></input></li>
                </template>
            </ul>
            <button class="input-submit-btn" @click="submit()">Submit</button>
        </div>
    </div>
    `,
    props: {
        headers: String,
        fields: Array
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
})
