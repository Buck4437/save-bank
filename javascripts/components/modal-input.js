"use strict";

Vue.component("modal-input", {
    template: `
    <modal-base @close="$emit('close')">
        <template v-slot:header class="modal-input-header">
            <div class="modal-input-header">
                {{header}}
            </div>
        </template>

        <ul class="modal-input-context">
            <li v-for="field in fields">
                <span>{{capFirstLetter(field)}}: </span>
                <input :class="'input-' + field" :value="value[field]"></input>
            </li>
        </ul>

        <template v-slot:footer>
            <div class="modal-input-footer">
                <button @click="submit()">Submit</button>
            </div>
        </template>
    </modal-base>
    `,
    props: {
        value: {
            default() {
                return {};
            },
            type: Object
        },
        header: String
    },
    data() {
        return {
            fields: ["name", "desc", "data"]
        }
    },
    methods: {
        capFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        submit() {
            let data = {}
            for (let field of this.fields) {
                let val = this.$el.querySelector(".input-" + field).value;
                data[field] = val;
            }
            this.$emit('submit', data);
        }
    }
})
