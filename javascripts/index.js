"use strict";

var app = new Vue({
    el: "#app",
    data: {
        saves,
        themes,
        currentTab: "",
        currentTheme: 0,
        sortMode: 0,
        sortTypes: ["Early to late", "Late to early"],
        showWipeDataModal: false,
        version: "Beta 5 Alpha 3"
    },
    computed: {
        tabs() {
            let tabs = this.saves.map(cat => cat.name);
            tabs.push("Custom Saves");
            tabs.push("Settings");
            return tabs;
        }
    },
    methods: {
        toggleSort() {
            this.sortMode++;
            if (this.sortMode >= this.sortTypes.length) {
                this.sortMode = 0;
            }
        },
        menu(toggle) {
            var body = document.querySelector("body");
            if (toggle === undefined) {
                body.classList.toggle("is-active");
            } else {
                body.classList.remove("is-active");
                if (toggle) {
                    body.classList.add("is-active");
                }
            }
        },
        sort(saves) {
            switch (this.sortMode) {
                case 1: return [...saves].reverse();
                default: return saves; //including case 0
            }
        },
        switchTheme() {
            this.currentTheme++;
            if (this.currentTheme >= themes.length) {
                this.currentTheme = 0;
            }
            setTheme(this.currentTheme);
        },
        switchTab(i) {
            this.currentTab = this.tabs[i];
            this.menu(false); //close the menu
            scroll(0,0); //scroll to top
        },
        reset() {
            localStorage.setItem("saveBankCustomSaves", null);
            localStorage.setItem("saveBankTheme", null);
            location.reload();
        }
    },
    mounted() {
        this.currentTab = this.tabs[0];
        this.currentTheme = loadTheme();
        setTimeout(() => {
            var body = document.querySelector("body");
            body.classList.add("ready");
        }, 500) // for the theme to apply propertly, and also to prevent sudden transition
    }
})
