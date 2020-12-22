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
            if (this.currentCategory.saves.length != 0){
                this.displayedText = this.currentCategory.saves[0].data
            } else {
                this.displayedText = "No save file available"
            }
        },
        copyByPath(saveFile){
            copyText(saveFile.data);
        },
        downloadFile(saveFile){
            let filename = saveFile.name + ".txt";
            let text = saveFile.data;
            download(filename, text);
        }
    }
})
