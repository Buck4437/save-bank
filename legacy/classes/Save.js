// eslint-disable-next-line no-unused-vars
class Save {
    constructor(config) {
        this.name = config.name || "Unnamed Save";
        this.desc = config.desc || "No description provided.";
        this.data = config.data || "";
    }

    copy() {
        File.copyText(this.data);
    }

    export() {
        const filename = `${this.name}.txt`;
        const text = this.data;
        File.download(filename, text);
    }

    raw(params = {}) {
        const str = new URLSearchParams(params).toString();
        window.open(`raw.html?${str}`, "_blank").focus();
    }

}
