import * as THREE from '../js-r179/build/three.module.js';

let guiRef;
let sceneRef;
const spotlightSpeed = 0.5;

export function initEvents(scene, gui) {
    guiRef = gui;
    sceneRef = scene;

    window.addEventListener('keydown', (e) => onKeyDown(e, sceneRef, guiRef));
}

function onKeyDown(e, scene, gui) {
    if (e.key.toLowerCase() === 'i') {
        const visible = gui.domElement.style.display !== 'none';
        gui.domElement.style.display = visible ? 'none' : 'block';
    }

    const textSpotLight = scene.getObjectByName('textSpotLight');
    if (!textSpotLight) return;

    const fixedY = textSpotLight.position.y;
    const fixedZ = textSpotLight.position.z;

    switch(e.key) {
        case 'ArrowLeft':
            textSpotLight.position.x -= spotlightSpeed;
            break;
        case 'ArrowRight':
            textSpotLight.position.x += spotlightSpeed;
            break;
    }

    if (textSpotLight.position.x > 0){
        textSpotLight.position.x = Math.min(textSpotLight.position.x, 15);
    } else {
        textSpotLight.position.x = Math.max(textSpotLight.position.x, -15);
    }

    textSpotLight.lookAt(new THREE.Vector3(textSpotLight.position.x, fixedY, fixedZ));
    console.log(new THREE.Vector3(textSpotLight.position.x, fixedY, fixedZ));

    const textSpotLightHelper = scene.getObjectByName('textSpotLightHelper');
    if (!textSpotLightHelper) return;
    textSpotLightHelper.update();
}