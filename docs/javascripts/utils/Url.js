// eslint-disable-next-line no-unused-vars
class Url {

    static setHash(name) {
        window.location.hash = encodeURIComponent(name);
    }

    static getHash() {
        try {
            const hash = decodeURIComponent(window.location.hash.substring(1));
            return hash;
        } catch (e) {
            return "";
        }
    }

}
