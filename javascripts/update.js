if (!localStorage.getItem("saveBankData")) {
    let newData = {
        customSaves: [],
        settings: {
            theme: 0
        },
        saveVersion: 1
    }

    if (localStorage.getItem("saveBankTheme")) {
        newData.settings.theme = JSON.parse(localStorage.getItem("saveBankTheme"));
    }
    if (localStorage.getItem("saveBankCustomSaves")) {
        newData.customSaves = JSON.parse(localStorage.getItem("saveBankCustomSaves")).saves;
    }

    localStorage.setItem("saveBankData", JSON.stringify(newData));
    localStorage.removeItem("saveBankCustomSaves"); //save storage space
    localStorage.removeItem("saveBankTheme");
}
