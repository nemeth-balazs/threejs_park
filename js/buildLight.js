import * as THREE from '../js-r179/build/three.module.js';

export function buildLight(scene, meshController) {

    buildLightAmbient(scene);

    buildLightmainSpotLight(scene, meshController);

    buildLightLampeSpotLight(scene, meshController,'lampeLeftSpotLight', 'lampeLeft');
    buildLightLampeSpotLight(scene, meshController,'lampeRightSpotLight', 'lampeRight');
}

function buildLightAmbient(scene) {
    let lightAmbient = new THREE.AmbientLight( 0x404040, Math.PI );
    scene.add( lightAmbient );
}

function buildLightmainSpotLight(scene, meshController) {
    let mainSpotLight = new THREE.SpotLight(0xffffff, 900);
    mainSpotLight.name = 'mainSpotLight';
    mainSpotLight.position.set(30, 30, 30);

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

    let lampeSpotLight = new THREE.SpotLight( 0x333333, 0 );
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
