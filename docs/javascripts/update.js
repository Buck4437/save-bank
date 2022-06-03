if (!localStorage.getItem("saveBankData")) {
    const newData = {
        settings: {
            theme: Theme.defaultTheme
        },
        saveVersion: 1
    };

    if (localStorage.getItem("saveBankTheme")) {
        newData.settings.theme = JSON.parse(localStorage.getItem("saveBankTheme"));
    }

    localStorage.setItem("saveBankData", JSON.stringify(newData));
    // Save storage space
    localStorage.removeItem("saveBankCustomSaves");
    localStorage.removeItem("saveBankTheme");
}
