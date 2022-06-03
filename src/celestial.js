/* eslint-disable max-len */
import Category from "./classes/Category";
import Save from "./classes/Save";

export const celestial = new Category({
    name: "Celestial",
    color: "celestial",
    placeholder: "Coming soon!",
    saves: [
        new Save({
            name: "Test",
            data: "Celestial test data"
        }),
        new Save({
            name: "Test 2",
            data: "Celestial test data 2"
        })
    ]
});
