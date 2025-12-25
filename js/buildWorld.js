import * as THREE from '../js-r179/build/three.module.js';
import { loadWell, loadLampe } from './loadResources.js';
import { FontLoader } from '../js-r179/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../js-r179/examples/jsm/geometries/TextGeometry.js';

export async function buildWorld(scene, meshController) {

    buildLandscape(scene);

    await buildWell(scene, meshController);

    await buildLampe(scene, meshController);

    await buildWelcomeText(scene);
}

function buildLandscape(scene) {

    const loader = new THREE.TextureLoader();

    const diffuseMap = loader.load('assets/textures/Rolling_Hills_Bitmap_1025.png');
    const heightMap = loader.load('assets/textures/Rolling_Hills_Height_Map.png');

    const planeGeometry = new THREE.PlaneGeometry(80, 80, 70, 70);

    const planeMaterial = new THREE.MeshPhongMaterial({
        map: diffuseMap,
        displacementMap: heightMap,
        displacementScale: 10,
        side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y -= 0.3;
    plane.receiveShadow = true;

    scene.add(plane);

    let sceneAxisHelper = new THREE.AxesHelper( 10 );
    sceneAxisHelper.position.y = 3;
    scene.add( sceneAxisHelper );
}

async function buildWell(scene, meshController) {
    let well = await loadWell();
    well.name = 'well';
    let wellAxisHelper = new THREE.AxesHelper( 1 );
    wellAxisHelper.visible = meshController.showAxisHelper;
    wellAxisHelper.position.set( 0, 3.2, 0 );
    well.add( wellAxisHelper );
    scene.add(well);
}

async function buildLampe(scene, meshController) {
    //lampe - left
    let lampeLeft = await loadLampe();
    let lampeLeftAxisHelper = new THREE.AxesHelper( 1 );
    lampeLeftAxisHelper.visible = meshController.showAxisHelper;
    lampeLeftAxisHelper.position.set( 0, 6, 0 );
    lampeLeft.name = 'lampeLeft';
    lampeLeft.position.set( -4, 0, 0 );
    lampeLeft.rotation.set( 0, Math.PI / 2, 0 );
    lampeLeft.add( lampeLeftAxisHelper );
    scene.add(lampeLeft);

    //lampe - right
    let lampeRight = lampeLeft.clone();
    let lampeRightAxisHelper = new THREE.AxesHelper( 1 );
    lampeRightAxisHelper.visible = meshController.showAxisHelper;
    lampeRightAxisHelper.position.set( 0, 6, 0 );
    lampeRight.name = 'lampeRight';
    lampeRight.position.set( 4, 0, 0 );
    lampeRight.add( lampeRightAxisHelper );
    lampeRight.receiveShadow = true;
    lampeRight.castShadow = true;
    scene.add(lampeRight);
}

async function buildWelcomeText(scene) {
    const loader = new FontLoader();

    return new Promise((resolve) => {
        loader.load('assets/fonts/gentilis_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry('Welcome to the Park', {
                font: font,
                size: 2,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.05,
                bevelSegments: 3
            });

            textGeometry.computeBoundingBox();
            textGeometry.center();

            const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.name = 'welcomeText';
            textMesh.position.set(0, 1.5, -10);
            textMesh.castShadow = true;
            textMesh.receiveShadow = false;

            scene.add(textMesh);

            resolve(textMesh);
        });
    });
}