import * as THREE from '../../js-r179/build/three.module.js';

export function buildLandscape(scene) {

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