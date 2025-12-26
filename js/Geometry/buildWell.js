import * as THREE from '../../js-r179/build/three.module.js';
import { loadWell } from '../loadResources.js';

export async function buildWell(scene, meshController) {
    let well = await loadWell();
    well.name = 'well';
    let wellAxisHelper = new THREE.AxesHelper( 1 );
    wellAxisHelper.visible = meshController.showAxisHelper;
    wellAxisHelper.position.set( 0, 3.2, 0 );
    well.add( wellAxisHelper );
    scene.add(well);
}