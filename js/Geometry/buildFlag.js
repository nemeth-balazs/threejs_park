import * as THREE from '../../js-r179/build/three.module.js';

export function buildFlag(scene, meshController) {

    const textureLoader = new THREE.TextureLoader();
    const flagGroup = new THREE.Group();
    flagGroup.name = 'flag';

    const metalTexture = textureLoader.load('assets/textures/metal.jpg');
    metalTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({ map: metalTexture, side: THREE.DoubleSide });

    /* ===== Alaplemez ===== */
    const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 32);
    const basePlate = new THREE.Mesh(baseGeometry, material);
    let basePlateAxisHelper = new THREE.AxesHelper( 1 );
    basePlateAxisHelper.visible = meshController.showAxisHelper;
    basePlate.position.y = 0.15;
    basePlate.castShadow = true;
    basePlate.receiveShadow = true;
    basePlate.add(basePlateAxisHelper);
    flagGroup.add(basePlate);

    /* ===== Pózna ===== */
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 16);
    const pole = new THREE.Mesh(poleGeometry, material);
    let poleAxisHelper = new THREE.AxesHelper( 1 );
    poleAxisHelper.visible = meshController.showAxisHelper;
    pole.position.y = 3.3;
    pole.castShadow = true;
    pole.add(poleAxisHelper);
    flagGroup.add(pole);

    /* ===== Középső díszgömb ===== */
    const middleBallGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const middleBall = new THREE.Mesh(middleBallGeometry, material);
    let middleBallAxisHelper = new THREE.AxesHelper( 1 );
    middleBallAxisHelper.visible = meshController.showAxisHelper;
    middleBall.position.y = 1.2;
    middleBall.castShadow = true;
    middleBall.add(middleBallAxisHelper);
    pole.add(middleBall);

    /* ===== Felső lezáró gömb ===== */
    const topBallGeometry = new THREE.SphereGeometry(0.30, 16, 16);
    const topBall = new THREE.Mesh(topBallGeometry, material);
    let topBallAxisHelper = new THREE.AxesHelper( 1 );
    topBallAxisHelper.visible = meshController.showAxisHelper;
    topBall.position.y = 3.2;
    topBall.castShadow = true;
    topBall.add(topBallAxisHelper);
    pole.add(topBall);

    /* ===== Zászló (plane) ===== */
    const flagTexture = textureLoader.load('assets/textures/flag.jpg');
    flagTexture.colorSpace = THREE.SRGBColorSpace;

    const flagGeometry = new THREE.PlaneGeometry(3, 1.5, 20, 10);
    const flagMaterial = new THREE.MeshStandardMaterial({  map: flagTexture, side: THREE.DoubleSide});
    flagMaterial.roughness = 0.8;
    flagMaterial.metalness = 0.0;

    const flagPlane = new THREE.Mesh(flagGeometry, flagMaterial);
    let flagAxisHelper = new THREE.AxesHelper( 1 );
    flagAxisHelper.visible = meshController.showAxisHelper;
    flagPlane.name  = 'flagPlane';
    flagPlane.position.set(1.6, 5.5, 0);
    flagPlane.castShadow = true;
    flagPlane.geometry.translate(0.05, 0, 0);
    flagPlane.add(flagAxisHelper);
    flagGroup.add(flagPlane);

    const positionAttr = flagGeometry.attributes.position;
    const originalPositions = positionAttr.array.slice();
    flagGeometry.userData.originalPositions = originalPositions;

    /* ===== Pozíció ===== */
    flagGroup.position.set(0, 0.3, -3);

    flagGroup.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    scene.add(flagGroup);
}