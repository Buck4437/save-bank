// File management

function copyText(text) {
    // Source: https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript

    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    try {
        document.execCommand("copy");
        console.log("Auto-copy successful");
    } catch (e) {
        console.log("Auto-copy unsuccessful");
        prompt("Failed to Auto-copy. Please copy manually:", text);
    }
    document.body.removeChild(el);
}

function download(filename, text) {
    // Source: https://www.bitdegree.org/learn/javascript-download

    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Themes

const themes = ["Dark", "Light"];

function getTheme() {
    let theme = Number(JSON.parse(localStorage.getItem("saveBankData")).settings.theme);
    if (isNaN(theme) || theme >= themes.length) {
        theme = 0;
    }
    return theme;
}

function loadTheme() {
    const theme = getTheme();
    setTheme(theme);
    return theme;
}

function setTheme(index) {
    for (const theme of themes) {
        document.body.classList.remove(`${theme.toLowerCase()}-theme`);
    }
    document.body.classList.add(`${themes[index].toLowerCase()}-theme`);
}

// Misc

function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function isNumber(val) {
    return typeof val === "number" && isFinite(val);
}
