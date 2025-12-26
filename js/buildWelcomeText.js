
import * as THREE from '../js-r179/build/three.module.js';

import { FontLoader } from '../js-r179/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../js-r179/examples/jsm/geometries/TextGeometry.js';

export async function buildWelcomeText(scene) {
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
