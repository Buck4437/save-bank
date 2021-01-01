"use strict";

Vue.component("modal-input", {
    template: `
    <modal-base @close="$emit('close')">
        <template v-slot:header class="modal-input-header">
            <div class="modal-input-header">
                <slot name="header"></slot>
            </div>
        </template>

        <div class="modal-input-context">
            <ul>
                <li v-for="field in fields">
                    <span>{{field}}: </span><input :class="'input-' + field"></input>
                </li>
            </ul>
        </div>

        <template v-slot:footer>
            <div class="modal-input-footer">
                <button @click="submit()">Submit</button>
            </div>
        </template>
    </modal-base>
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
