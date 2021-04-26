import baseModal from "./BaseModal.js";

export default {
    components: {
        baseModal
    },
    template: `
    <base-modal :showCloseButton="false">
        <template #header>
            <div class="modal-confirm-header">
                <slot name="header">Confirmation</slot>
            </div>
        </template>
        <div class="modal-confirm-content">
            <slot>Confirm?</slot>
        </div>
        <template #footer>
            <div class="modal-confirm-footer">
                <button class="modal-confirm-btn warning" @click="$emit('yes')">
                    <slot name="yes">Yes</slot>
                </button>
                <button class="modal-confirm-btn" @click="$emit('no')">
                    <slot name="no">No</slot>
                </button>
            </div>
        </template>
    </base-modal>
    `
};
