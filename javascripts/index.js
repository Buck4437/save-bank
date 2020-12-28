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
        version: "Beta 3 Alpha 4"
    },
    computed: {
        currentCategory() {
            if (this.currentCategoryIndex > -1 && this.currentCategoryIndex < this.saves.length) {
                return this.saves[this.currentCategoryIndex]
            } else {
                return null;
            }
        s}
    },
    methods: {
        menu(toggle) {
            var app = document.querySelector("#app");
            if (toggle === undefined) {
                app.classList.toggle("is-active");
            } else {
                app.classList.remove("is-active");
                if (toggle) {
                    app.classList.add("is-active");
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
            this.menu(false);
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
    }
})
