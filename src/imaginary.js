/* eslint-disable max-len */
import Category from "./classes/Category";
import Save from "./classes/Save";

export const imaginary = new Category({
    name: "1e1000 RM",
    theme: "ra-laitela",
    placeholder: "Coming soon!",
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
