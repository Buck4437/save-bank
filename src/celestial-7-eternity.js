/* eslint-disable max-len */
import Save from "./classes/Save";
import Group from "./classes/Group";

export const eternity = new Group({
    name: "Eternity",
    theme: "pelle-eternity",
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