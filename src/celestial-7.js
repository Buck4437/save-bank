/* eslint-disable max-len */
import Category from "./classes/Category";
import Save from "./classes/Save";

export const celestial7 = new Category({
    name: "Celestial 7",
    color: "pelle",
    placeholder: "Coming soon...",
    saves: [
        new Save({
            name: "1",
            data: "Dold"
        }),
        new Save({
            name: "2",
            data: "Dold"
        })
    ]
});
