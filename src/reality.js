/* eslint-disable max-len */
import Category from "./classes/Category";
import Save from "./classes/Save";

export const reality = new Category({
    name: "Reality",
    color: "reality",
    placeholder: "Coming soon!",
    saves: [
        new Save({
            name: "Test",
            data: "Reality test data"
        }),
        new Save({
            name: "Test 2",
            data: "Reality test data 2"
        })
    ]
});
