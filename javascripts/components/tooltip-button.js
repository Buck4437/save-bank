"use strict";

Vue.component("tooltip-button", {
    template: `
    <div class="tooltip-frame">
        <button class="tooltip-btn" @click="click()">{{text}}</button>
        <span class="tooltip-text">{{tooltipText}}</span>
    </div>
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
            }, 1000)
            this.$emit('click');
        }
    }
})
