import * as THREE from '../../js-r179/build/three.module.js';

function createFencePost(material, meshController) {
    const postGroup = new THREE.Group();

    /* ===== base ===== */
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.1, 32), material);
    base.position.y = 0.05;
    postGroup.add(base);

    /* ===== pole ===== */
    const poleHeight = 1.2;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, poleHeight, 16), material);
    let poleAxisHelper = new THREE.AxesHelper( 1 );
    poleAxisHelper.visible = meshController.showAxisHelper;
    pole.position.y = poleHeight / 2;
    pole.add(poleAxisHelper);
    postGroup.add(pole);

    /* ===== middleSphere ===== */
    const middleSphere = new THREE.Mesh(new THREE.SphereGeometry(0.10, 16, 16), material);
    middleSphere.position.y = 0.6;
    postGroup.add(middleSphere);

    /* ===== topSphere ===== */
    const topSphere = new THREE.Mesh(new THREE.SphereGeometry(0.10, 16, 16), material);
    topSphere.position.y = 1.1;
    postGroup.add(topSphere);

    /* ===== cone ===== */
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.3, 16), material);
    cone.position.y = poleHeight + 0.15;
    postGroup.add(cone);

    return postGroup;
}

function createHorizontalRail(length, y, material, meshController) {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, length, 16), material);
    let railAxisHelper = new THREE.AxesHelper( 1 );
    railAxisHelper.visible = meshController.showAxisHelper;
    rail.rotation.z = Math.PI / 2;
    rail.position.y = y;
    rail.add(railAxisHelper);
    return rail;
}

export function buildFence(scene, meshController) {
    const fenceGroup = new THREE.Group();
    fenceGroup.name = 'fence';

    const material = new THREE.MeshStandardMaterial({color: 0x666666, metalness: 0.6, roughness: 0.4});

    const startX = -7;
    const endX = 7;
    const spacing = 1;

    /* ===== createFencePost ===== */
    for (let x = startX; x <= endX; x += spacing) {
        const post = createFencePost(material, meshController);
        post.position.set(x, 0, 0);
        fenceGroup.add(post);
    }

    /* ===== middleRail ===== */
    const middleRail = createHorizontalRail(endX - startX, 0.6, material, meshController);
    middleRail.position.x = (startX + endX) / 2;
    fenceGroup.add(middleRail);

    /* ===== topRail ===== */
    const topRail = createHorizontalRail(endX - startX, 1.1, material, meshController);
    topRail.position.x = (startX + endX) / 2;
    fenceGroup.add(topRail);

    fenceGroup.traverse(obj => {
        if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
        }
    });

    fenceGroup.position.y = 0.15;
    fenceGroup.position.z = 2;
    scene.add(fenceGroup);
}