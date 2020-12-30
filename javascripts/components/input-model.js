"use strict";

Vue.component("input-model", {
    template: `
    <div class="model-outer">
        <div class="model input-model">
            <button class="model-close" @click="close()">×</button>
            <div class="input-model-header">{{header}}</div>
            <ul>
                <template v-for="field in fields">
                    <li>{{field}}: <input :class="'input-' + field"></input></li>
                </template>
            </ul>
            <button class="input-submit-btn" @click="submit()">Submit</button>
        </div>
    </div>
    `,
    props: {
        default: Object,
        header: String,
        fields: Array
    },
    methods: {
        submit() {
            let data = {}
            for (let field of this.fields) {
                let el = this.$el.querySelector(".input-" + field);
                data[field.toLowerCase()] = el.value;
            }
            this.$emit('submit', data);
        },
        close() {
            this.$emit('close');
        },
        updateDefault(data) {
            if (data === undefined || data === null) {
                data = {};
            }
            for (let field of this.fields) {
                let el = this.$el.querySelector(".input-" + field);
                el.value = data[field.toLowerCase()] || "";
            }
        }
    },
    watch: {
        default(data) {
            this.updateDefault(data);
        }
    },
    mounted() {
        this.updateDefault(this.default);
    }
})
