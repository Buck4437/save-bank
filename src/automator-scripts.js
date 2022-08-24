/* eslint-disable max-len */
import Category from "./classes/Category";
import Save from "./classes/Save";

export const automatorScript = new Category({
    name: "Automator Script",
    placeholder: "Coming soon!",
    isAutomatorMode: true,
    saves: [
        new Save({
            name: "Test",
            desc: "Sample Desc",
            data: `Script test data`
        }),
        new Save({
            name: "Test 2",
            desc: "Sample Desc",
            data: `Script test data 2`
        })
    ]
});
