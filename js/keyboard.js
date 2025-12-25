import * as THREE from '../js-r179/build/three.module.js';
import * as TWEEN from '../js-r179/examples/jsm/libs/tween.module.js';
import { toggleHelp } from './helpOverlay.js';

let sceneRef = null;
let cameraRef = null;
let meshControllerRef= null;

export function initKeyboard(scene, camera, meshController) {
    sceneRef = scene;
    cameraRef = camera;
    meshControllerRef = meshController;

    window.addEventListener('keydown', (e) => {
        if (e.repeat) return;

        switch (e.key.toLowerCase()) {
            case 'i':
                toggleHelp();
                break;
            case 'a':
                meshControllerRef.showAxisHelper = !meshControllerRef.showAxisHelper ;
                showHideAxisHelper(sceneRef, meshControllerRef.showAxisHelper );
                break;
            case 'r':
                resetCamera(sceneRef, cameraRef);
                break;
            case 'd':
                meshControllerRef.isDayLight = !meshControllerRef.isDayLight;
                isDayLight(sceneRef, meshControllerRef.isDayLight);
                break;
            case 's':
                meshControllerRef.showSpotlightHelper = !meshControllerRef.showSpotlightHelper;
                showHideSpotlightHelper(sceneRef, meshControllerRef.showSpotlightHelper);
                break;
        }
    });
}

export function showHideAxisHelper(scene, show) {
    scene.traverse((object) => {
        if (object instanceof THREE.AxesHelper) {
            object.visible = show;
        }
    });
}

export function showHideSpotlightHelper(scene, show) {
    scene.traverse((object) => {
        if (object instanceof THREE.SpotLightHelper) {
            object.visible = show;
        }
    });
}

export function isDayLight(scene, isdaylight) {
    const mainSpotLight = scene.getObjectByName('mainSpotLight');
    const lampeLeftSpotLight = scene.getObjectByName('lampeLeftSpotLight');
    const lampeRightSpotLight = scene.getObjectByName('lampeRightSpotLight');

    if (isdaylight) {
        if (mainSpotLight !== undefined) {
            mainSpotLight.intensity = 900;}

        if (lampeLeftSpotLight !== undefined) {
            lampeLeftSpotLight.intensity = 0;}

        if (lampeRightSpotLight !== undefined) {
            tweenSpotLightIntensity(lampeRightSpotLight, 0, 1000);}
    }
    else {
        if (mainSpotLight !== undefined) {
            mainSpotLight.intensity = 90;}

        if (lampeLeftSpotLight !== undefined) {
            lampeLeftSpotLight.intensity = 500;}

        if (lampeRightSpotLight !== undefined) {
            tweenSpotLightIntensity(lampeRightSpotLight, 500, 5000);}
    }
}

function tweenSpotLightIntensity(light, targetIntensity, duration) {
    if (light._currentTween) {
        light._currentTween.stop();
    }

    const obj = { intensity: light.intensity };
    const tween = new TWEEN.Tween(obj)
        .to({ intensity: targetIntensity }, duration)
        .easing(TWEEN.Easing.Bounce.InOut)
        .onUpdate(() => {
            light.intensity = obj.intensity;
        })
        .start();
}

export function resetCamera(scene, camera) {
    camera.position.set( 15, 15, 15 );
    camera.lookAt( scene.position);
    //trackballcontrols.reset();
}
