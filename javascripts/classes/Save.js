class Save {
    constructor(config) {
        this.name = config.name;
        this.desc = config.desc || "No description provided.";
        this.data = config.data;
    }

    copy() {
        File.copyText(this.data);
    }

    export() {
        const filename = `${this.name}.txt`;
        const text = this.data;
        File.download(filename, text);
    }
}
