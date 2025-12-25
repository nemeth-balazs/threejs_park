import * as THREE from '../js-r179/build/three.module.js';
import { OBJLoader } from '../js-r179/examples/jsm/loaders/OBJLoader.js';

const textureLoader = new THREE.TextureLoader();

const textures = {
    wood: textureLoader.load('assets/textures/wood.jpg'),
    metal: textureLoader.load('assets/textures/metal.jpg'),
    dark_metal: textureLoader.load('assets/textures/dark_metal.jpg'),
    stone: textureLoader.load('assets/textures/stone.jpg')
};

Object.values(textures).forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
});

const materials = {
    wood: new THREE.MeshLambertMaterial({ map: textures.wood, side: THREE.DoubleSide },),
    metal: new THREE.MeshLambertMaterial({ map: textures.metal, side: THREE.DoubleSide }),
    dark_metal: new THREE.MeshLambertMaterial({ map: textures.dark_metal, side: THREE.DoubleSide }),
    stone: new THREE.MeshLambertMaterial({ map: textures.stone, side: THREE.DoubleSide })
};

function getMaterialByName(meshName) {
    if (meshName.startsWith('wood')) return materials.wood;
    if (meshName.startsWith('metal')) return materials.metal;
    if (meshName.startsWith('dark_metal')) return materials.dark_metal;
    if (meshName.startsWith('stone')) return materials.stone;

    return null;
}

async function loadOBJ(path, scale = 1, color = 0x2080f0) {
    const loader = new OBJLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (object) => {
                object.scale.set(scale, scale, scale);

                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {

                        const material = getMaterialByName(child.name);
                        if (material) { child.material = material;}
                        else { child.material = new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide});}

                        child.castShadow = true;
                        child.receiveShadow = false;
                        console.log('mesh found:', child.name);
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
    return await loadOBJ('assets/models/lampe.obj', 1, 0xedf2f5);
}

