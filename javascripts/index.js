var app = new Vue({
    el: "#app",
    data: {
        saves,
        currentCategoryIndex: 0
    },
    computed:{
        currentCategory(){
            return this.saves[this.currentCategoryIndex]
        }
    },
    methods:{
        switchCategory(index){
            this.currentCategoryIndex = index;
            if (this.currentCategory.saveFiles.length != 0){
                this.displayedText = this.currentCategory.saveFiles[0].data
            } else {
                this.displayedText = "No save file available"
            }
        },
        copyByPath(saveFile, category){
            fetchTextAndRun(copyText, saveFile, category);
        },
        downloadFile(saveFile, category){
            fetchTextAndRun((text) => {
                var filename = saveFile.name + ".txt";
                download(filename, text);
            }, saveFile, category)
        }
    }
})

function fetchTextAndRun(func, saveFile, category){
    if (saveFile.data !== undefined){
        return func(saveFile.data);
    }

    let path = saveFile.path;
    if (path === undefined){
        let newName = saveFile.name
            .replace(/[\\\/]/gm, "_")
            .replace(/[:*?"<>|]/gm, " ")
        path = `${category.name}/${newName}`
    }

    fetch(`../saves/${path}.txt`)
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(`Cannot locate file at saves/${path}.txt`);
        }
    })
    .then(text => {
        func(text);
    }).catch(err => {
        alert("The data for this save file is not avaliable.\n(Check console for more information)");
        console.log(err);
    });
}

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
