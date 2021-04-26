export default {
    props: {
        showCloseButton: {
            default: true,
            type: Boolean
        }
    },
    template: `
    <div class="modal-outer">
        <div class="modal">
            <button class="modal-close" v-if="showCloseButton" @click="$emit('close')">×</button>
            <slot name="header">Modal header</slot>
            <slot>Modal content</slot>
            <slot name="footer">Modal footer</slot>
        </div>
    </div>
    `
};
