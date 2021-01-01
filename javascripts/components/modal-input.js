"use strict";

Vue.component("modal-input", {
    template: `
    <modal-component>
        <template v-slot:header>
            <slot name="header"></slot>
        </template>

        <ul>
            <li v-for="field in fields">
                <span>{{field}}: </span><input :class="'input-' + field"></input>
            </li>
        </ul>

        <template v-slot:footer>
            <button class="input-submit-btn" @click="submit()">Submit</button>
        </template>
    </modal-component>
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
