const app = new Vue({
    el: "#app",
    data: {
        saves,
        userData: {
            customSaves: [],
            settings: {
                theme: 0
            },
            saveVersion: 1
        },
        currentTab: "",
        version: "Beta 6.1"
    },
    computed: {
        tabs() {
            const tabs = this.saves.map(cat => cat.name);
            tabs.push("Settings");
            return tabs;
        },
        selectedCategory() {
            for (const cat of saves) {
                if (this.currentTab === cat.name) {
                    return cat;
                }
            }
            return undefined;
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
        switchTab(i) {
            this.currentTab = this.tabs[i];
            // Close the menu
            this.menu(false);
            // Scroll to top
            scroll(0, 0);
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
        const userData = JSON.parse(localStorage.getItem("saveBankData"));
        this.userData = this.saveFixer(userData, this.userData);
        this.switchTab(0);
        loadTheme();
        // For the theme to apply properly, and also to prevent sudden transition
        setTimeout(() => {
            const body = document.querySelector("body");
            body.classList.add("ready");
        }, 500);
    }
});
