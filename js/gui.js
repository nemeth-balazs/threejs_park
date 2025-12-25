
import { GUI } from "../js-r179/examples/jsm/libs/lil-gui.module.min.js";

import { showHideAxisHelper } from './keyboard.js';
import { showHideSpotlightHelper } from './keyboard.js';
import { isDayLight } from './keyboard.js';
import { showLeftLamp } from './keyboard.js';
import { showRightLamp } from './keyboard.js';
import { showWell } from './keyboard.js';

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
        .name('Is daylight?')
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
}