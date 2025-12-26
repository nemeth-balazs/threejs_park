import * as THREE from '../../js-r179/build/three.module.js';

function createQuarterCylinder(radius, height, material) {
    const radialSegments = 32; // minél nagyobb, annál simább
    const cylinderGeometry = new THREE.CylinderGeometry(
        radius,       // top radius
        radius,       // bottom radius
        height,       // cylinder height
        radialSegments,
        1,            // height segments
        false,        // openEnded
        0,            // thetaStart
        Math.PI / 2   // thetaLength -> negyed kör
    );

    return new THREE.Mesh(cylinderGeometry, material);;
}

function createRoadSegment(length, width, material) {
    const geometry = new THREE.BoxGeometry(width, 0.1, length);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh;
}

export function buildRoad(scene, meshController) {

    const roadGroup = new THREE.Group();
    roadGroup.name = 'road';

    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 1, metalness: 0});

    /* ===== mainRoad ===== */
    let mainRoad = createRoadSegment(5, 2, roadMaterial);
    mainRoad.height = 0.3;
    mainRoad.position.set(0, 0, 7);
    let mainRoadAxisHelper = new THREE.AxesHelper(1);
    mainRoadAxisHelper.position.y = 0.3;
    mainRoadAxisHelper.visible = meshController.showAxisHelper;
    mainRoad.add(mainRoadAxisHelper);

    /* ===== Placeholder ===== */
    const mainRoadPlaceholder = new THREE.Object3D();
    mainRoadPlaceholder.position.set(0, -0.4, 0);
    mainRoadPlaceholder.add(mainRoad);
    roadGroup.add(mainRoadPlaceholder);
    mainRoadPlaceholder.rotation.x = -Math.PI / 36;

    /* ===== TRoad ===== */
    const TRoad = createRoadSegment(15, 2, roadMaterial);
    TRoad.position.set(0, 0, 3.5);
    TRoad.rotateY(Math.PI / 2);
    let TRoadAxisHelper = new THREE.AxesHelper( 1 );
    TRoadAxisHelper.position.y = 0.3;
    TRoadAxisHelper.visible = meshController.showAxisHelper;
    TRoad.add(TRoadAxisHelper);
    roadGroup.add(TRoad);

    /* ===== LeftTurn ===== */
    const LeftTurn = createQuarterCylinder(2, 0.1, roadMaterial)
    LeftTurn.rotateY(-Math.PI / 2);
    LeftTurn.position.set(1, 0, 7.5);
    let LeftTurnAxisHelper = new THREE.AxesHelper( 1 );
    LeftTurnAxisHelper.position.y = 0.3;
    LeftTurnAxisHelper.visible = meshController.showAxisHelper;
    LeftTurn.add(LeftTurnAxisHelper);
    TRoad.add(LeftTurn);

    /* ===== RightTurn ===== */
    const RightTurn = createQuarterCylinder(2, 0.1, roadMaterial)
    RightTurn.rotateY(Math.PI);
    RightTurn.position.set(1, 0, -7.5);
    let RightTurnAxisHelper = new THREE.AxesHelper( 1 );
    RightTurnAxisHelper.position.y = 0.3;
    RightTurnAxisHelper.visible = meshController.showAxisHelper;
    RightTurn.add(RightTurnAxisHelper);
    TRoad.add(RightTurn);

    /* ===== LeftStraightRoad ===== */
    const LeftStraightRoad = createRoadSegment(5, 2, roadMaterial);
    LeftStraightRoad.position.set(1, 0, -2.5);
    let LeftStraightRoadAxisHelper = new THREE.AxesHelper( 1 );
    LeftStraightRoadAxisHelper.position.y = 0.3;
    LeftStraightRoadAxisHelper.visible = meshController.showAxisHelper;
    LeftStraightRoad.add(LeftStraightRoadAxisHelper);
    LeftTurn.add(LeftStraightRoad);

    /* ===== RightStraightRoad ===== */
    const RightStraightRoad = createRoadSegment(5, 2, roadMaterial);
    RightStraightRoad.position.set(-2.5, 0, 1);
    RightStraightRoad.rotateY(Math.PI / 2);
    let RightStraightRoadAxisHelper = new THREE.AxesHelper( 1 );
    RightStraightRoadAxisHelper.position.y = 0.3;
    RightStraightRoadAxisHelper.visible = meshController.showAxisHelper;
    RightStraightRoad.add(RightStraightRoadAxisHelper);
    RightTurn.add(RightStraightRoad);

    roadGroup.position.y = 0.3;

    roadGroup.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = false;
            object.receiveShadow = true;
        }
    });

    scene.add(roadGroup);
}