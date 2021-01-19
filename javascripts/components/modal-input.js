"use strict";

Vue.component("modal-input", {
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
            fields: [
                {
                    name: "name",
                    placeholder: "Enter name"
                },
                {
                    name: "desc",
                    placeholder: "Enter description"
                },
                {
                    name: "data",
                    placeholder: "Enter save file data"
                }
            ],
            newSaveFile: {}
        }
    },
    methods: {
        capFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        submit() {
            this.$emit('submit', this.newSaveFile);
        }
    },
    mounted() {
        this.newSaveFile = JSON.parse(JSON.stringify(this.value));
        this.$el.querySelector("input").focus();
    },
    template: `
    <modal-base @close="$emit('close')">
        <template v-slot:header>
            <span class="modal-input-header">{{header}}</span>
        </template>

        <ul class="modal-input-content">
            <li v-for="field in fields">
                <span>{{capFirstLetter(field.name)}}: </span>
                <input v-model="newSaveFile[field.name]"
                       :placeholder="field.placeholder"/>
            </li>
        </ul>

        <template v-slot:footer>
            <div class="modal-input-footer">
                <button @click="submit()">Submit</button>
            </div>
        </template>
    </modal-base>
    `
})
