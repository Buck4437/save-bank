/* eslint-disable max-len */
import Category from "./classes/Category";
import Save from "./classes/Save";

export default new Category({
    name: "Automator Scripts",
    color: "default",
    placeholder: "Coming soon!",
    allowSort: false,
    saves: [
        new Save({
            name: "Test",
            data: "Automator test data"
        }),
        new Save({
            name: "Test 2",
            data: "Automator test data 2"
        })
    ]
});
