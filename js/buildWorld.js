import * as THREE from '../js-r179/build/three.module.js';
import { loadWell, loadLampe } from './loadResources.js';
import { FontLoader } from '../js-r179/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../js-r179/examples/jsm/geometries/TextGeometry.js';

export async function buildWorld(scene, meshController) {

    buildLandscape(scene);

    await buildWell(scene, meshController);

    await buildLampe(scene, meshController);

    await buildWelcomeText(scene);

    buildFlag(scene, meshController);

    buildRoad(scene, meshController);
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

function buildFlag(scene, meshController) {

    const flagGroup = new THREE.Group();
    flagGroup.name = 'flagGroup';

    const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });

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
    const flagGeometry = new THREE.PlaneGeometry(3, 1.5, 10, 5);
    const flagMaterial = new THREE.MeshStandardMaterial({color: 0xff3333, side: THREE.DoubleSide});

    const flagPlane = new THREE.Mesh(flagGeometry, flagMaterial);
    let flagAxisHelper = new THREE.AxesHelper( 1 );
    flagAxisHelper.visible = meshController.showAxisHelper;
    flagPlane.position.set(1.6, 5.5, 0);
    flagPlane.castShadow = true;
    flagPlane.geometry.translate(0.05, 0, 0);
    flagPlane.add(flagAxisHelper);
    flagGroup.add(flagPlane);

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

function buildRoad(scene, meshController) {

    const roadGroup = new THREE.Group();
    roadGroup.name = 'road';

    const roadMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });

    /* ===== mainRoad ===== */
    const mainRoad = createRoadSegment(5, 2, roadMaterial);
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