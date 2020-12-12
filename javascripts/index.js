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
        copyText(text){
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
            } catch(e){
                prompt("Failed to copy. Please copy manually:", text);
            }
            document.body.removeChild(el);
        }
    }
})
