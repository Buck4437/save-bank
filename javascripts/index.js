"use strict";

var app = new Vue({
    el: "#app",
    data: {
        saves,
        userData: {
            customSaves: [],
            settings: {
                theme: 0
            }
        },
        currentTab: "",
        version: "Beta 5 Indev 6"
    },
    computed: {
        tabs() {
            let tabs = this.saves.map(cat => cat.name);
            tabs.push("Custom Saves");
            tabs.push("Settings");
            return tabs;
        },
        selectedCategory() {
            for (let cat of saves) {
                if (this.currentTab === cat.name) {
                    return cat;
                }
            }
            return undefined;
        }
    },
    methods: {
        menu(isOpened = false) {
            var body = document.querySelector("body");
            if (isOpened){
                body.classList.add("is-active");
            } else {
                body.classList.remove("is-active");
            }
        },
        switchTab(i) {
            this.currentTab = this.tabs[i];
            this.menu(false); //close the menu
            scroll(0,0); //scroll to top
        }
    },
    watch: {
        userData: {
            deep: true,
            handler() {
                localStorage.setItem("saveBankData", JSON.stringify(this.userData));
            }
        }
    },
    mounted() {
        this.currentTab = this.tabs[0];
        this.userData = JSON.parse(localStorage.getItem("saveBankData"));
        if (!Array.isArray(this.userData.customSaves)) {
            this.userData.customSaves = []
        }
        loadTheme();
        setTimeout(() => {
            var body = document.querySelector("body");
            body.classList.add("ready");
        }, 500) // for the theme to apply propertly, and also to prevent sudden transition
    }
})
