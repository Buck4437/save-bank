"use strict";

Vue.component("menu-button", {
    template: `
    <button class="menu-btn" @click="menu()">
        <span class="menu-btn-inner top"></span>
        <span class="menu-btn-inner mid"></span>
        <span class="menu-btn-inner bot"></span>
    </button>
    `,
    methods: {
        menu() {
            this.$emit("toggle-menu");
        }
    }
})
