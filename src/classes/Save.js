// eslint-disable-next-line no-unused-vars
class Save {
    constructor(config) {
        this.name = config.name || "Unnamed Save";
        this.desc = config.desc || "No description provided.";
        this.data = config.data || "";
        this.author = config.author || "Unknown";
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

export default Save;
