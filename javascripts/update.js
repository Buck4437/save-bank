if (!localStorage.getItem("saveBankData")) {
    let newData = {
        theme: 0,
        customSaves: []
    }

    if (localStorage.getItem("saveBankTheme")) {
        newData.theme = JSON.parse(localStorage.getItem("saveBankTheme"));
    }
    if (localStorage.getItem("saveBankCustomSaves")) {
        newData.customSaves = JSON.parse(localStorage.getItem("saveBankCustomSaves")).saves;
    }

    localStorage.setItem("saveBankData", JSON.stringify(newData));
    localStorage.removeItem("saveBankCustomSaves"); //save storage space
    localStorage.removeItem("saveBankTheme");
}
