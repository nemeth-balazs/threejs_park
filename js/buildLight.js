import * as THREE from '../js-r179/build/three.module.js';

export function buildLight(scene, meshController) {

    buildLightAmbient(scene);

    buildLightmainSpotLight(scene, meshController);

    buildLightLampeSpotLight(scene, meshController,'lampeLeftSpotLight', 'lampeLeft');
    buildLightLampeSpotLight(scene, meshController,'lampeRightSpotLight', 'lampeRight');

    buildLightWelcomeTextSpotLight(scene);
}

function buildLightAmbient(scene) {
    let lightAmbient = new THREE.AmbientLight( 0x404040, Math.PI );
    scene.add( lightAmbient );
}

function buildLightmainSpotLight(scene, meshController) {
    let mainSpotLight = new THREE.SpotLight(0xffffff, meshController.daylightIntensitiy);
    mainSpotLight.name = 'mainSpotLight';
    mainSpotLight.position.set(20, 30, 20);
    mainSpotLight.castShadow = true;
    mainSpotLight.distance = 200;
    mainSpotLight.shadow.mapSize.width = 2048;
    mainSpotLight.shadow.mapSize.height = 2048;
    mainSpotLight.shadow.camera.near = 1;
    mainSpotLight.shadow.camera.far = 100;
    mainSpotLight.shadow.camera.fov = 30;

    let target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    scene.add(target);
    mainSpotLight.target = target;

    scene.add(mainSpotLight);

    let mainSpotLightHelper = new THREE.SpotLightHelper(mainSpotLight);
    mainSpotLightHelper.visible = meshController.showSpotlightHelper;
    scene.add(mainSpotLightHelper);

    mainSpotLightHelper.update();
}


function buildLightLampeSpotLight(scene, meshController, spotlightname, lampename) {

    const lampe = scene.getObjectByName(lampename);
    if (!lampe) { console.error(`Lamp not found: ${lampename}`); return;}

    let lampeSpotLight = new THREE.SpotLight( 0xffcc66, 0 );
    lampeSpotLight.castShadow = true;
    lampeSpotLight.name = spotlightname;
    lampeSpotLight.position.set( 0, 5.8, 0 );
    lampeSpotLight.angle = Math.PI / 4;
    lampeSpotLight.penumbra = 0.3;    // lágy perem
    lampe.add( lampeSpotLight );

    let target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    lampe.add(target);
    lampeSpotLight.target = target;

    let lampeSpotLightHelper = new THREE.SpotLightHelper( lampeSpotLight );
    lampeSpotLightHelper.visible = meshController.showSpotlightHelper;
    lampe.add( lampeSpotLightHelper );

    lampeSpotLightHelper.update();
}

function buildLightWelcomeTextSpotLight(scene) {

    const textMesh = scene.getObjectByName('welcomeText');
    if (!textMesh) { console.error(`Welcome text not found!`); return;}

    const textSpotLight = new THREE.SpotLight(0xffffff, 2);
    textSpotLight.name = 'textSpotLight';
    textSpotLight.position.set(0, 1.5, -5);
    textSpotLight.angle = Math.PI / 6;
    textSpotLight.penumbra = 0.2;
    textSpotLight.decay = 2;
    textSpotLight.distance = 50;
    textSpotLight.castShadow = true;

    textSpotLight.target = textMesh;
    scene.add(textSpotLight);
    scene.add(textSpotLight.target);

    const spotHelper = new THREE.SpotLightHelper(textSpotLight);
    spotHelper.name = 'textSpotLightHelper';
    scene.add(spotHelper);
}

let colorIndex = 0;
const spotlightColors = [
    0xff0000, // piros
    0x0000ff, // kék
    0x00ff00  // zöld
];

export function startTextSpotLightColorCycle(scene) {
    const textSpotLight = scene.getObjectByName('textSpotLight');
    if (!textSpotLight) return;

    setInterval(() => {
        colorIndex = (colorIndex + 1) % spotlightColors.length;
        textSpotLight.color.setHex(spotlightColors[colorIndex]);
    }, 1000); // 3 másodperc
}