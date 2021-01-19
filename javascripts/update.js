if (!localStorage.getItem("saveBankData")) {
    let theme = JSON.parse(localStorage.getItem("saveBankTheme"));
    let customSaves = JSON.parse(localStorage.getItem("saveBankCustomSaves")).saves;
    let newData = {
        theme,
        customSaves
    }
    localStorage.setItem("saveBankData", JSON.stringify(newData));
    localStorage.removeItem("saveBankCustomSaves"); //save storage space
    localStorage.removeItem("saveBankTheme");
}
