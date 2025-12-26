import * as THREE from '../../js-r179/build/three.module.js';
import { loadLampe } from '../loadResources.js';

export async function buildLamp(scene, meshController) {

    /* ===== lampeLeft ===== */
    let lampeLeft = await loadLampe();
    let lampeLeftAxisHelper = new THREE.AxesHelper( 1 );
    lampeLeftAxisHelper.visible = meshController.showAxisHelper;
    lampeLeftAxisHelper.position.set( 0, 6, 0 );
    lampeLeft.name = 'lampeLeft';
    lampeLeft.position.set( -4, 0, 0 );
    lampeLeft.rotation.set( 0, Math.PI / 2, 0 );
    lampeLeft.add( lampeLeftAxisHelper );
    scene.add(lampeLeft);

    /* ===== lampeRight ===== */
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