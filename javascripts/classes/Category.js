// eslint-disable-next-line no-unused-vars
class Category {
    constructor(config) {
        this.name = config.name || "Unnamed Category";
        this.saves = config.saves || [];
        this.desc = config.desc;
        this.color = config.color;
        this.placeholder = config.placeholder;
        this.sort = config.sort;
    }
}
