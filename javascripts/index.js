var app = new Vue({
    el: "#app",
    data: {
        saves,
        currentCategoryIndex: 0,
        displayedText: "Save will appear here!"
    },
    computed:{
        currentCategory(){
            return this.saves[this.currentCategoryIndex]
        }
    },
    methods:{
        switchSaveFile(saveFile){
            this.displayedText = saveFile.data
        },
        switchCategory(index){
            this.currentCategoryIndex = index;
            if (this.currentCategory.saveFiles.length != 0){
                this.displayedText = this.currentCategory.saveFiles[0].data
            } else {
                this.displayedText = "No save files available"
            }
        },
        copyText(){
            var copyTextarea = document.getElementById("hidden-save-file-text-field");
            copyTextarea.style.display = "block";
            copyTextarea.value = this.displayedText;
            copyTextarea.focus();
            copyTextarea.select();

            try {
              document.execCommand('copy');
            } catch (err) {
              console.log('Unable to copy');
            }

            copyTextarea.style.display = "none";
        }
    }
})
