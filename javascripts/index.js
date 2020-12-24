const C = {
    FILES_TAB: 0,
    SETTINGS_TAB: 1
}

var app = new Vue({
    el: "#app",
    data: {
        saves,
        C,
        currentCategoryIndex: 0,
        currentTab: C.FILES_TAB,
        themes: ["Light", "Dark"],
        currentTheme: 1
    },
    computed: {
        currentCategory() {
            return this.saves[this.currentCategoryIndex]
        }
    },
    methods: {
        switchTheme(index) {
            if (index !== undefined) {
                this.currentTheme = index;
            } else {
                this.currentTheme++;
                if (this.currentTheme >= this.themes.length) {
                    this.currentTheme = 0;
                }
            }
            for (let theme of this.themes) {
                document.body.classList.remove(theme.toLowerCase() + "-theme");
            }
            document.body.classList.add(this.themes[this.currentTheme].toLowerCase() + "-theme");
            localStorage.setItem("saveBankTheme", this.currentTheme)
        },
        openTab(tab) {
            this.currentTab = tab;
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
        let theme = localStorage.getItem("saveBankTheme")
        if (theme !== undefined) {
            this.switchTheme(Number(theme));
        }
    }
})

tippy('.copy-btn', {
        content: 'Copied!',
        trigger: 'click'
      });
