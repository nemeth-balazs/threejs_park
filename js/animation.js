
let lastTime = performance.now();
let windTime = 0;

export function animateFlagWind(scene, meshController) {
    const now = performance.now();
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    const flag = scene.getObjectByName('flagPlane');
    if (flag) {
        animateFlag(flag, delta, meshController.windVelocity);
    }
}

function animateFlag(flagMesh, deltaTime, windVelocity) {
    const geometry = flagMesh.geometry;
    const positionAttr = geometry.attributes.position;
    const original = geometry.userData.originalPositions;

    windTime += deltaTime * (0.5 + windVelocity * 0.3);

    for (let i = 0; i < positionAttr.count; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        const x = original[ix];
        const y = original[iy];

        // 0 → pózna, 1 → zászló vége
        const stiffness = (x / 3);

        const wave =
            Math.sin(windTime + y * 3) *
            stiffness *
            windVelocity *
            0.15;

        positionAttr.array[iz] = original[iz] + wave;
    }

    positionAttr.needsUpdate = true;
    geometry.computeVertexNormals();
}