"use strict";

Vue.component("category-header", {
    template: `
    <div class="cat-header">
        <div class="cat-info">
            <span class="cat-title">
                <slot>Title</slot>
            </span>
            <span class="cat-desc">
                <i>
                    <slot name="description">

                    </slot>
                </i>
            </span>
        </div>
        <slot name="button">
        </slot>
    </div>
    `,
    props: {
        showCloseButton: {
            default: true,
            type: Boolean
        }
    }
})
