"use strict";

Vue.component("confirm-model", {
    template: `
    <div class="model-outer">
        <div class="model confirm-model">
            <div class="confirm-model-header">{{header}}</div>
            <div class="confirm-model-context">{{text}}</div>
            <div style="display: flex; justify-content: space-around">
                <button class="confirm-model-btn warning" @click="yes()">Yes</button>
                <button class="confirm-model-btn" @click="no()">No</button>
            </div>
        </div>
    </div>
    `,
    props: {
        header: String,
        text: String
    },
    methods: {
        yes() {
            this.$emit('confirm');
        },
        no() {
            this.$emit('close');
        }
    }
})
