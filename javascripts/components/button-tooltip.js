"use strict";

Vue.component("button-tooltip", {
    template: `
    <button class="tooltip-btn" @click="click()">
        <slot>Text</slot>
        <span class="tooltip-text">
            {{tooltip}}
        </span>
    </button>
    `,
    props: {
        tooltip: {
            default: "Tooltip text",
            type: String
        }
    },
    methods: {
        click() {
            let classList = this.$el.querySelector(".tooltip-text").classList;
            classList.add("is-active");
            setTimeout(() => {
                classList.remove("is-active")
            }, 1000)
            this.$emit('click');
        }
    }
})
