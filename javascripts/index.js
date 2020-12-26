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
        currentTheme: 1
    },
    computed: {
        currentCategory() {
            return this.saves[this.currentCategoryIndex]
        }
    },
    methods: {
        switchTheme() {
            this.currentTheme++;
            if (this.currentTheme >= themes.length) {
                this.currentTheme = 0;
            }
            setTheme(this.currentTheme);
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
        this.currentTheme = loadTheme();
    }
})

tippy('.copy-btn', {
        content: 'Copied!',
        trigger: 'click',
        hideOnClick: false,
        onShow(instance) {
            setTimeout(() => {
                instance.hide();
            }, 1500);
        }
      });
