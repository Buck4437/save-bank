"use strict";

Vue.component("tooltip-button", {
    props: {
        text: String,
        tooltipText: String,
        buttonClass: Array
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
    },
    template: `
    <div class="tooltip-frame">
        <button class="tooltip-btn" @click="click()" :class="buttonClass">{{text}}</button>
        <span class="tooltip-text">{{tooltipText}}</span>
    </div>
    `
})
