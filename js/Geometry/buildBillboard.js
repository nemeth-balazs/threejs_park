import * as THREE from '../../js-r179/build/three.module.js';

export function buildBillboard(scene, meshController) {

    const billboardGroup = new THREE.Group();
    billboardGroup.name = 'billboard';

    const material = new THREE.MeshPhongMaterial({ color: 0xC19A6B });
    const materialBase = new THREE.MeshPhongMaterial({ color: 0x4B4B4B });
    const materialRoof = new THREE.MeshPhongMaterial({ color: 0x8B5A2B });

    /* ===== basePlate ===== */
    const baseGeometry = new THREE.BoxGeometry(4, 0.5, 1.5);
    const basePlate = new THREE.Mesh(baseGeometry, materialBase);
    basePlate.position.y = 0.1;
    billboardGroup.add(basePlate);

    /* ===== leftLeg ===== */
    const legGeometry = new THREE.BoxGeometry(0.3, 2.5, 0.3);

    const leftLeg = new THREE.Mesh(legGeometry, material);
    let leftLegAxisHelper = new THREE.AxesHelper( 1 );
    leftLegAxisHelper.visible = meshController.showAxisHelper;
    leftLeg.position.set(-1.2, 1.35, 0);
    leftLeg.add(leftLegAxisHelper);
    billboardGroup.add(leftLeg);

    /* ===== rightLeg ===== */
    const rightLeg = new THREE.Mesh(legGeometry, material);
    let rightLegAxisHelper = new THREE.AxesHelper( 1 );
    rightLegAxisHelper.visible = meshController.showAxisHelper;
    rightLeg.add(rightLegAxisHelper);
    rightLeg.position.set(1.2, 1.35, 0);
    billboardGroup.add(rightLeg);

    /* ===== panel ===== */
    const panelGeometry = new THREE.BoxGeometry(3.2, 1.6, 0.15);
    const panel = new THREE.Mesh(panelGeometry, material);
    let panelAxisHelper = new THREE.AxesHelper( 1 );
    panelAxisHelper.visible = meshController.showAxisHelper;
    panel.position.y = 2.4;
    panel.add(panelAxisHelper);
    billboardGroup.add(panel);

    /* ===== roof ===== */
    const roofGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3.6, 3);
    const roof = new THREE.Mesh(roofGeometry, materialRoof);
    let roofAxisHelper = new THREE.AxesHelper( 1 );
    roofAxisHelper.visible = meshController.showAxisHelper;
    roof.rotation.x = -Math.PI / 2;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 3.2;
    roof.add(roofAxisHelper);
    billboardGroup.add(roof);

    billboardGroup.traverse(obj => {
        if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
        }
    });

    billboardGroup.rotation.y = Math.PI / 2;
    billboardGroup.position.set(-1.8, 0.1, 7.5);
    scene.add(billboardGroup);
}