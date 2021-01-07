"use strict";

Vue.component("modal-confirm", {
    template: `
    <modal-base :showCloseButton="false">
        <template v-slot:header>
            <div class="modal-confirm-header">
                <slot name="header">Confirmation</slot>
            </div>
        </template>
        <div class="modal-confirm-context">
            <slot>Confirm?</slot>
        </div>
        <template v-slot:footer>
            <div style="display: flex; justify-content: space-around">
                <button class="modal-confirm-btn warning" @click="$emit('yes')">
                    <slot name="yes">Yes</slot>
                </button>
                <button class="modal-confirm-btn" @click="$emit('no')">
                    <slot name="no">No</slot>
                </button>
            </div>
        </template>
    </modal-base>
    `
})
