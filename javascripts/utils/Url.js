// eslint-disable-next-line no-unused-vars
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

    static getParam(name) {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has(name)) {
            return searchParams.get(name);
        }
        return null;
    }

    static CAT_IDX_PARAM = "c";
    static SAVE_IDX_PARAM = "s";

}
