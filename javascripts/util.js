"use strict";

// File management

function copyText(text){
    //source: https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    try{
        document.execCommand('copy');
        console.log("Auto-copy successful");
    } catch(e){
        console.log("Auto-copy unsuccessful");
        prompt("Failed to Auto-copy. Please copy manually:", text);
    }
    document.body.removeChild(el);
}

function download(filename, text) {
    //source: https://www.bitdegree.org/learn/javascript-download
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


// Themes

var themes = ["Dark", "Light"];

function getTheme() {
    let theme = Number(localStorage.getItem("saveBankTheme"));
    if (isNaN(theme)) {
        theme =  0;
    }
    return theme;
}

function loadTheme() {
    let theme = getTheme();
    if (theme !== 0) {
        setTheme(theme);
    }
    return theme;
}

function setTheme(index) {
    for (let theme of themes) {
        document.body.classList.remove(theme.toLowerCase() + "-theme");
    }
    document.body.classList.add(themes[index].toLowerCase() + "-theme");
    localStorage.setItem("saveBankTheme", index)
}

// // Modals
//
// function createBaseModal() {
//     let modalFrame = document.createElement("div");
//     modalFrame.classList.add("modal-outer");
//
//     let modal = document.createElement("div");
//     modal.classList.add("modal");
//
//     modalFrame.appendChild(modal);
//     return modalFrame;
// }
//
// function confirmModal(data) {
//     let modalFrame = createBaseModal();
//
//     let content = modalFrame.querySelector(".modal");
//
//     let header = document.createElement("div");
//     header.textContent = "Confirmation";
//
// }

// Misc

function isNumber(val) {
    return typeof val === 'number' && isFinite(val)
}

function getCssVar(name) {
    return getComputedStyle(document.querySelector("body"))
            .getPropertyValue('--background');
}
