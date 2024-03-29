import { preInfinity } from "./pre-infinity";
import { infinity } from "./infinity";
import { postBreak } from "./post-break";
import { replicanti } from "./replicanti";
import { eternity } from "./eternity";
import { postMilestone } from "./post-milestone";
import { eternityChallenge } from "./eternity-challenge";
import { timeDilation } from "./time-dilation";
import { reality } from "./reality";
import { celestial1 } from "./celestial-1";
import { celestial3 } from "./celestial-3";
import { celestial5 } from "./celestial-5";
import { imaginary } from "./imaginary";
import { celestial7 } from "./celestial-7";

import CategoryGrouped from "./classes/CategoryGrouped";
import File from "./classes/File";

const saves = [
    preInfinity,
    infinity,
    postBreak,
    replicanti,
    eternity,
    postMilestone,
    eternityChallenge,
    timeDilation,
    reality,
    celestial1,
    celestial3,
    celestial5,
    imaginary,
    celestial7
];

const downloadAllSaves = File.downloadAllSaves;

export {
    saves,
    CategoryGrouped,
    downloadAllSaves
};