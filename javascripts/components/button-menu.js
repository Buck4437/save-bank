"use strict";

Vue.component("button-menu", {
    template: `
    <button class="menu-btn" @click="menu()">
        <span class="menu-btn-inner top"/>
        <span class="menu-btn-inner mid"/>
        <span class="menu-btn-inner bot"/>
    </button>
    `,
    methods: {
        menu() {
            this.$emit("toggle-menu");
        }
    }
})
