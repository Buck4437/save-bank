"use strict";

Vue.component("modal-base", {
    template: `
    <div class="modal-outer">
        <div class="modal">
            <button class="modal-close" v-if="showCloseButton" @click="$emit('close')">×</button>
            <slot name="header">Modal header</slot>
            <slot>Modal content</slot>
            <slot name="footer">Modal footer</slot>
        </div>
    </div>
    `,
    props: {
        showCloseButton: {
            default: true,
            type: Boolean
        }
    }
})


// <div>
//     <slot name="header">Modal header</slot>
// </div>
// <div>
//     <slot>Modal content</slot>
// </div>
// <div>
//     <slot name="footer">Modal footer</slot>
// </div>
