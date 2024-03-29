const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "saves.min.js",
        path: path.resolve(__dirname, "docs"),
        library: {
            name: "Saves",
            type: "var"
        }
    },
    mode: "production"
};
