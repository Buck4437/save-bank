/* eslint-disable max-len */
import Save from "./classes/Save";
import Group from "./classes/Group";

export const preInfinity = new Group({
    name: "Pre-Infinity",
    theme: "pelle-pre-infinity",
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