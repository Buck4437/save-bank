"use strict";

Vue.component("confirm-modal", {
    template: `
    <div class="modal-outer">
        <div class="modal confirm-modal">
            <div class="confirm-modal-header">
                <slot name="header">Confirmation</slot>
            </div>
            <div class="confirm-modal-context">
                <slot>Are you sure you want to perform this action?</slot>
            </div>
            <div style="display: flex; justify-content: space-around">
                <button class="confirm-modal-btn warning" @click="yes()">Yes</button>
                <button class="confirm-modal-btn" @click="no()">No</button>
            </div>
        </div>
    </div>
    `,
    methods: {
        yes() {
            this.$emit('confirm');
        },
        no() {
            this.$emit('close');
        }
    }
})
