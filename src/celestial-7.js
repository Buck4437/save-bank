/* eslint-disable max-len */
import CategoryGrouped from "./classes/CategoryGrouped";

import { preInfinity } from "./celestial-7-pre-infinity";
import { infinity } from "./celestial-7-infinity";
import { eternity } from "./celestial-7-eternity";
import { eternityChallenge } from "./celestial-7-eternity-challenge";
import { timeDilation } from "./celestial-7-time-dilation";

export const celestial7 = new CategoryGrouped({
    name: "Celestial 7",
    theme: "pelle",
    glitched: true,
    desc: "The final <glitch>Celestial&Challenge&Sovereign</glitch>, including saves from <glitch>Infinity&Eternity&Dilation</glitch>\n" +
            "Note: Offline progress is disabled for some of the saves.\n\n" +
            "Let's bring an end to this <glitch>Song&Dance&Charade</glitch>, shall we?",
    placeholder: "Coming soon...",
    saves: [
        preInfinity,
        infinity,
        eternity,
        eternityChallenge,
        timeDilation
    ]
});
