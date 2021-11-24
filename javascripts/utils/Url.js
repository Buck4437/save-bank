class Url {

    static setHash(name) {
        window.location.hash = encodeURIComponent(name);
    }

    static getHash() {
        try {
            return decodeURIComponent(window.location.hash.substring(1));
        } catch (e) {
            return "";
        }
    }

}
