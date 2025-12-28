import * as THREE from '../js-r179/build/three.module.js';
import * as TWEEN from '../js-r179/examples/jsm/libs/tween.module.js';
import { toggleHelp } from './helpOverlay.js';
import { startTextSpotLightColorCycle } from './buildLight.js';

let sceneRef = null;
let cameraRef = null;
let meshControllerRef= null;
let trackballcontrolsRef= null;

export function initKeyboard(scene, camera, meshController, trackballcontrols) {
    sceneRef = scene;
    cameraRef = camera;
    meshControllerRef = meshController;
    trackballcontrolsRef = trackballcontrols;

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
                resetCamera(sceneRef, cameraRef, trackballcontrolsRef);
                break;
            case 'd':
                meshControllerRef.isDayLight = !meshControllerRef.isDayLight;
                isDayLight(sceneRef, meshControllerRef.daylightIntensitiy, meshControllerRef.isDayLight);
                break;
            case 's':
                meshControllerRef.showSpotlightHelper = !meshControllerRef.showSpotlightHelper;
                showHideSpotlightHelper(sceneRef, meshControllerRef.showSpotlightHelper);
                break;
            case '1':
                meshControllerRef.showLeftLamp = !meshControllerRef.showLeftLamp;
                showLeftLamp(sceneRef, meshControllerRef.showLeftLamp);
                break;
            case '2':
                meshControllerRef.showRightLamp = !meshControllerRef.showRightLamp;
                showRightLamp(sceneRef, meshControllerRef.showRightLamp);
                break;
            case '3':
                meshControllerRef.showWell = !meshControllerRef.showWell;
                showWell(sceneRef, meshControllerRef.showWell);
                break;
            case '4':
                meshControllerRef.showFlag = !meshControllerRef.showFlag;
                showFlag(sceneRef, meshControllerRef.showFlag);
                break;
            case '5':
                meshControllerRef.showFence = !meshControllerRef.showFence;
                showFence(sceneRef, meshControllerRef.showFence);
                break;
            case '6':
                meshControllerRef.showRoad = !meshControllerRef.showRoad;
                showRoad(sceneRef, meshControllerRef.showRoad);
                break;
            case '7':
                meshControllerRef.showBillboard = !meshControllerRef.showBillboard;
                showBillboard(sceneRef, meshControllerRef.showBillboard);
                break;
            case '8':
                meshControllerRef.showWelcomeText = !meshControllerRef.showWelcomeText;
                showWelcomeText(sceneRef, meshControllerRef.showWelcomeText);
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

export function isDayLight(scene, daylightIntensitiy, isdaylight) {
    const mainSpotLight = scene.getObjectByName('mainSpotLight');
    const lampeLeftSpotLight = scene.getObjectByName('lampeLeftSpotLight');
    const lampeRightSpotLight = scene.getObjectByName('lampeRightSpotLight');
    const textSpotLight = scene.getObjectByName('textSpotLight');

    if (isdaylight) {
        scene.background = new THREE.Color(0x87CEEB);
        if (mainSpotLight !== undefined) {
            mainSpotLight.intensity = daylightIntensitiy;}

        if (lampeLeftSpotLight !== undefined) {
            lampeLeftSpotLight.intensity = 0;}

        if (textSpotLight !== undefined) {
            textSpotLight.intensity = 0;}

        if (lampeRightSpotLight !== undefined) {
            tweenSpotLightIntensity(lampeRightSpotLight, 0, 1000);}
    }
    else {
        scene.background = new THREE.Color(0x101018);
        if (mainSpotLight !== undefined) {
            mainSpotLight.intensity = 90;}

        if (lampeLeftSpotLight !== undefined) {
            lampeLeftSpotLight.intensity = 150;}

        if (textSpotLight !== undefined) {
            textSpotLight.intensity = 100;
            startTextSpotLightColorCycle(scene);
        }

        if (lampeRightSpotLight !== undefined) {
            tweenSpotLightIntensity(lampeRightSpotLight, 50, 5000);}
    }

    setFog(scene, isdaylight);
}

export function setFog(scene, isDay) {
    if (isDay) {
        scene.fog = new THREE.FogExp2(0xcfd8dc, 0.01);
    } else {
        scene.fog = new THREE.FogExp2(0x202020, 0.06);
    }
}

function tweenSpotLightIntensity(light, targetIntensity, duration) {

    if (light._currentTween) {
        light._currentTween.stop();
        light._currentTween = null;
    }

    const state = { intensity: light.intensity };

    const tween = new TWEEN.Tween(state)
        .to({ intensity: targetIntensity }, duration)
        .easing(TWEEN.Easing.Bounce.InOut)
        .onUpdate(() => {
            light.intensity = Math.max(0, state.intensity);
        })
        .onComplete(() => {
            light.intensity = targetIntensity;
            light._currentTween = null;
        });

    light._currentTween = tween;
    tween.start();
}

export function LeftLampOn(scene, on) {
    const lampeLeftSpotLight = scene.getObjectByName('lampeLeftSpotLight');
    lampeLeftSpotLight.intensity = on ? 150 : 0;
}

export function RightLampOn(scene, on) {
    const light = scene.getObjectByName('lampeRightSpotLight');
    if (!light) return;

    if (on) {
        tweenSpotLightIntensity(light, 50, 5000);
    } else {
        tweenSpotLightIntensity(light, 0, 800);
    }
}

export function setWindVelocity(scene, windVelocity) {
}

export function resetCamera(scene, camera, trackballcontrols) {
    camera.position.set( 15, 15, 15 );
    camera.lookAt( scene.position);

    if (trackballcontrols !== undefined) {
        trackballcontrols.target.set(0, 0, 0);
        trackballcontrols.update();
    }
}

export function showLeftLamp(scene, value) {
    const lampeLeft = scene.getObjectByName('lampeLeft');
    lampeLeft.visible = value;
}

export function showRightLamp(scene, value) {
    const lampeRight = scene.getObjectByName('lampeRight');
    lampeRight.visible = value;
}

export function showWell(scene, value) {
    const well = scene.getObjectByName('well');
    well.visible = value;
}

export function showFlag(scene, value) {
    const flag = scene.getObjectByName('flag');
    flag.visible = value;
}

export function showFence(scene, value) {
    const fence = scene.getObjectByName('fence');
    fence.visible = value;
}

export function showRoad(scene, value) {
    const road = scene.getObjectByName('road');
    road.visible = value;
}

export function showBillboard(scene, value) {
    const billboard = scene.getObjectByName('billboard');
    billboard.visible = value;
}

export function showWelcomeText(scene, value) {
    const welcomeText = scene.getObjectByName('welcomeText');
    welcomeText.visible = value;
}