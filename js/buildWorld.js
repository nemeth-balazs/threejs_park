
import { buildFence } from './Geometry/buildFence.js';
import { buildFlag } from './Geometry/buildFlag.js';
import { buildRoad } from './Geometry/buildRoad.js';
import {buildBillboard} from "./Geometry/buildBillboard.js";
import {buildLandscape} from "./Geometry/buildLandscape.js";
import {buildWell} from "./Geometry/buildWell.js";
import {buildLamp} from "./Geometry/buildLamp.js";
import {buildWelcomeText} from "./buildWelcomeText.js";

export async function buildWorld(scene, meshController) {

    buildLandscape(scene);

    await buildWell(scene, meshController);

    await buildLamp(scene, meshController);

    await buildWelcomeText(scene);

    buildFlag(scene, meshController);

    buildRoad(scene, meshController);

    buildFence(scene, meshController);

    buildBillboard(scene, meshController);
}