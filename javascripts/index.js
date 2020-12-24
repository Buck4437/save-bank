const C = {
    FILES_TAB: 0,
    SETTINGS_TAB: 1
}

var app = new Vue({
    el: "#app",
    data: {
        saves,
        C,
        currentCategoryIndex: 0,
        currentTab: C.FILES_TAB
    },
    computed:{
        currentCategory(){
            return this.saves[this.currentCategoryIndex]
        }
    },
    methods:{
        openTab(tab){
            this.currentTab = tab;
        },
        switchCategory(index){
            this.openTab(this.C.FILES_TAB);
            this.currentCategoryIndex = index;
            // if (this.currentCategory.saves.length != 0){
            //     this.displayedText = this.currentCategory.saves[0].data
            // } else {
            //     this.displayedText = "No save file available"
            // }
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

tippy('.copy-btn', {
        content: 'Copied!',
        trigger: 'click'
      });
