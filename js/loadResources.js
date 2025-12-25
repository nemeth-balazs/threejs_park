import * as THREE from '../js-r179/build/three.module.js';
import { OBJLoader } from '../js-r179/examples/jsm/loaders/OBJLoader.js';

async function loadOBJ(path, scale = 1, color = 0x2080f0) {
    const loader = new OBJLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (object) => {
                object.scale.set(scale, scale, scale);

                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshLambertMaterial({
                            color: color,
                            side: THREE.DoubleSide
                        });
                        console.log('mesh found in loaded group');
                    }
                });

                resolve(object);
            },
            (xhr) => {
                console.log(`${path}: ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
            },
            (error) => {
                console.error(`Error loading ${path}:`, error);
                reject(error);
            }
        );
    });
}

export async function loadWell() {
    return await loadOBJ('assets/models/well.obj', 1, 0x2080f0);
}

export async function loadLampe() {
    return await loadOBJ('assets/models/lampe.obj', 1, 0x2080f0);
}

