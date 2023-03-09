// eslint-disable-next-line no-new
new Vue({
    el: "#app",
    data: {
        saves: Saves.saves,
        userData: {
            settings: {
                theme: Theme.defaultTheme
            },
            saveVersion: 1
        },
        currentTab: "",
        sortMode: 0,
        version: "v1.3.0"
    },
    computed: {
        tabs() {
            const tabs = this.saves.map(cat => cat.name);
            tabs.push("Settings");
            return tabs;
        }
    },
    methods: {
        menu(isOpened = false) {
            const body = document.querySelector("body");
            if (isOpened) {
                body.classList.add("is-active");
            } else {
                body.classList.remove("is-active");
            }
        },
        setSettings(prop, data) {
            this.userData.settings[prop] = data;
        },
        switchTab(name = this.tabs[0]) {
            this.currentTab = name;
            // Close the menu
            this.menu(false);
            // Scroll to top
            scroll(0, 0);
            // Update the URL
            Url.setHash(name);
        },
        saveFixer(obj, def) {
            let data = {};
            if (Array.isArray(def)) {
                if (def.length === 0) {
                    return Array.isArray(obj) ? obj : def;
                }
                data = [];
            }
            for (const key in def) {
                if (obj[key] === undefined || typeof obj[key] !== typeof def[key]) {
                    data[key] = def[key];
                } else if (typeof obj[key] === "object" && typeof def[key] === "object") {
                    data[key] = this.saveFixer(obj[key], def[key]);
                } else {
                    data[key] = obj[key];
                }
            }
            return data;
        },
        updateTabFromHash() {
            const tab = Url.getHash();
            if (this.tabs.includes(tab)) {
                this.switchTab(tab);
                return true;
            }
            return false;
        },
        setListeners() {
            window.onhashchange = this.updateTabFromHash;
        },
        switchSortMode() {
            this.sortMode++;
            if (this.sortMode > this.saves[0].getMaxSortMode()) {
                this.sortMode = 0;
            }
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
        this.saves.forEach(x => x.checkSaveNameRepeat);
        console.log("Check finished.");

        const data = JSON.parse(localStorage.getItem("saveBankData"));
        this.userData = this.saveFixer(data, this.userData);
        if (!this.updateTabFromHash()) {
            this.switchTab();
        }
        this.setListeners();

        Theme.applyTheme(this.userData.settings.theme);

        // For the theme to apply properly, and also to prevent sudden transition
        setTimeout(() => {
            const body = document.querySelector("body");
            body.classList.add("ready");
        }, 500);
    }
});
