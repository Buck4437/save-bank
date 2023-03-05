/* eslint-disable max-len */
import Category from "./classes/Category";
import Save from "./classes/Save";

export const celestial7 = new Category({
    name: "Celestial 7",
    glitched: true,
    desc: "Doomed Reality, spans <glitch>Infinity&Eternity&Dilation</glitch>.\n" +
            "Offline progress is disabled for some of the saves.\n\n" +
            "Let's bring an end to this <glitch>Song&Dance&Charade</glitch>, shall we?",
    theme: "pelle",
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
