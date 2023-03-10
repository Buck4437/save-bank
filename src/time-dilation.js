/* eslint-disable max-len */
import CategoryGrouped from "./classes/CategoryGrouped";
import { dilation } from "./time-dilation-dilation";
import { postE4k } from "./time-dilation-post-e4k";

export const timeDilation = new CategoryGrouped({
    name: "Time Dilation",
    /* Suggested by kai reeeee */
    theme: "dilation",
    desc: "13000 TT - Pre-Reality",
    saves: [
        dilation,
        postE4k
    ]
});
