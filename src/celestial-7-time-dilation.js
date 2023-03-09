/* eslint-disable max-len */
import Save from "./classes/Save";
import Group from "./classes/Group";

export const timeDilation = new Group({
    name: "Time Dilation",
    theme: "pelle-dilation",
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