"use strict";

const C = {
    FILES_TAB: 0,
    SETTINGS_TAB: 1
}

var app = new Vue({
    el: "#app",
    data: {
        saves,
        themes,
        C,
        currentCategoryIndex: 0,
        currentTab: C.FILES_TAB,
        currentTheme: 0,
        sortMode: 0,
        sortTypes: ["Early to late", "Late to early"],
        version: "Beta 3 Alpha 7a"
    },
    computed: {
        currentCategory() {
            let i = this.currentCategoryIndex;
            let saves = this.saves;
            if (i > -1 && i < saves.length) {
                return saves[i]
            }
            return null;
        },
        currentSaveFiles() {
            let cat = this.currentCategory;
            if (cat !== null) {
                if (cat.saves !== undefined) {
                    let saves = cat.saves
                    switch (this.sortMode) {
                        case 1: return [...saves].reverse();
                        default: return saves; //including case 0
                    }
                }
            }
            return [];
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
        switchTheme() {
            this.currentTheme++;
            if (this.currentTheme >= themes.length) {
                this.currentTheme = 0;
            }
            setTheme(this.currentTheme);
        },
        openTab(tab) {
            if (tab !== this.C.FILES_TAB) {
                this.currentCategoryIndex = -1;
            }
            this.currentTab = tab;
            this.menu(false); //close the menu
            scroll(0,0); //scroll to top
        },
        switchCategory(index) {
            this.openTab(this.C.FILES_TAB);
            this.currentCategoryIndex = index;
        },
        copyByPath(saveFile) {
            copyText(saveFile.data);
        },
        downloadFile(saveFile) {
            let filename = saveFile.name + ".txt";
            let text = saveFile.data;
            download(filename, text);
        }
    },
    mounted() {
        this.currentTheme = loadTheme();
        setTimeout(() => {
            var body = document.querySelector("body");
            body.classList.add("ready");
        }, 500) // for the theme to apply propertly, and also to prevent sudden transition
    }
})
