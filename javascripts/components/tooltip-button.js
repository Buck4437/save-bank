"use strict";

Vue.component("tooltip-button", {
    template: `
    <button class="tooltip-btn" @click="click()">{{text}}
        <span class="tooltip-text">{{tooltipText}}</span>
    </button>
    `,
    props: {
        text: String,
        tooltipText: String
    },
    methods: {
        click() {
            let classList = this.$el.querySelector(".tooltip-text").classList;
            classList.add("is-active");
            setTimeout(() => {
                classList.remove("is-active")
            }, 1500)
            this.$emit('click');
        }
    }
})
