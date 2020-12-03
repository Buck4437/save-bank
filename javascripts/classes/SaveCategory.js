class SaveCategory{
    constructor(name, ...saves){
        this.name = name;
        this.saveFiles = [];
        for (let save of saves){
            this.saveFiles.push(save)
        }
    }
}
