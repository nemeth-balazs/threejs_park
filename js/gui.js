
import { GUI } from "../js-r179/examples/jsm/libs/lil-gui.module.min.js";

import { showHideAxisHelper } from './keyboard.js';
import { showHideSpotlightHelper } from './keyboard.js';
import { isDayLight } from './keyboard.js';

import { showLeftLamp } from './keyboard.js';
import { showRightLamp } from './keyboard.js';
import { showWell } from './keyboard.js';
import { showFlag } from './keyboard.js';
import { showFence } from './keyboard.js';
import { showRoad } from './keyboard.js';
import { showBillboard } from './keyboard.js';
import { showWelcomeText } from './keyboard.js';

export function addControlGui( scene, guiControls) {

    let gui = new GUI( { autoPlace: false } );

    const info = {text: "Press 'i' to show keyboard shortcuts"};
    const infoFolder = gui.addFolder('Info');
    infoFolder.add(info, 'text')
        .name('')
        .listen();

    gui.add(guiControls, 'showAxisHelper')
        .name('Show axis helper')
        .onChange((value) => {
            showHideAxisHelper(scene, value);
        });

    gui.add(guiControls, 'showSpotlightHelper')
        .name('Show spotlight helper')
        .onChange((value) => {
            showHideSpotlightHelper(scene, value);
        });

    gui.add(guiControls, 'isDayLight')
        .name('Daylight')
        .onChange((value) => {
            isDayLight(scene, guiControls.daylightIntensitiy, value);
        });

    gui.add(guiControls, 'showLeftLamp')
        .name('Show left lampe')
        .onChange((value) => {
            showLeftLamp(scene, value);
        });

    gui.add(guiControls, 'showRightLamp')
        .name('Show right lampe')
        .onChange((value) => {
            showRightLamp(scene, value);
        });

    gui.add(guiControls, 'showWell')
        .name('Show well')
        .onChange((value) => {
            showWell(scene, value);
        });

    gui.add(guiControls, 'showFlag')
        .name('Show flag')
        .onChange((value) => {
            showFlag(scene, value);
        });

    gui.add(guiControls, 'showFence')
        .name('Show fence')
        .onChange((value) => {
            showFence(scene, value);
        });

    gui.add(guiControls, 'showRoad')
        .name('Show road')
        .onChange((value) => {
            showRoad(scene, value);
        });

    gui.add(guiControls, 'showBillboard')
        .name('Show billboard')
        .onChange((value) => {
            showBillboard(scene, value);
        });

    gui.add(guiControls, 'showWelcomeText')
        .name('Show welcome text')
        .onChange((value) => {
            showWelcomeText(scene, value);
        });

    gui.add(guiControls, 'resetCamera').name('Reset Camera');

    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '0px';
    gui.domElement.style.right = '0px';
    document.body.appendChild( gui.domElement );

    return gui;
}

export function applyGuiState(scene, guiControls) {
    showHideAxisHelper(scene, guiControls.showAxisHelper);
    showHideSpotlightHelper(scene, guiControls.showSpotlightHelper);
    isDayLight(scene, guiControls.daylightIntensitiy, guiControls.isDayLight);

    showLeftLamp(scene, guiControls.showLeftLamp);
    showRightLamp(scene, guiControls.showRightLamp);
    showWell(scene, guiControls.showWell);
    showFlag(scene, guiControls.showFlag);
    showFence(scene, guiControls.showFence);
    showRoad(scene, guiControls.showRoad);
    showBillboard(scene, guiControls.showBillboard);
    showWelcomeText(scene, guiControls.showWelcomeText);
}