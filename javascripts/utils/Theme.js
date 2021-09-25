class Theme {

    static themes = ["Light", "Dark"];
    static defaultTheme = 1;

    static getTheme(index) {
        return Theme.themes[index]
    }

    static applyTheme(index) {
        let theme = index;

        if (isNaN(theme) || theme >= Theme.themes.length) {
            theme = Theme.defaultTheme;
        }

        for (const theme of Theme.themes) {
            document.body.classList.remove(`${theme.toLowerCase()}-theme`);
        }
        document.body.classList.add(`${Theme.getTheme(index).toLowerCase()}-theme`);

        return theme;
    }

}
