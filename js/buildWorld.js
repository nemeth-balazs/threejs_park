import * as THREE from '../js-r179/build/three.module.js';
import { loadWell, loadLampe } from './loadResources.js';

export async function buildWorld(scene, meshController) {
    //Well
    let well = await loadWell();
    let wellAxisHelper = new THREE.AxesHelper( 1 );
    wellAxisHelper.visible = meshController.showAxisHelper;
    wellAxisHelper.position.set( 0, 3.2, 0 );
    well.add( wellAxisHelper );
    scene.add(well);

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
    scene.add(lampeRight);
}