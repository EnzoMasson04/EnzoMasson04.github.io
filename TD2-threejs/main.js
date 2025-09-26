// Ex1 (version simple et commentée)
// ✔ Scène + caméra + lumières + renderer
// ✔ Cube texturé (TextureLoader)
// ✔ Modèle glTF (GLTFLoader) – DamagedHelmet
// ✔ Animation via capteurs (DeviceOrientation) – bouton pour autoriser
// ✔ Petit fog pour "autre chose"

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// —— Base renderer + scène ——
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1116);
// "Autre chose" demandé : un léger fog
scene.fog = new THREE.Fog(0x0f1116, 20, 120);

// —— Caméra ——
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.set(6, 4, 10);

// —— Lumières (simple et efficace) ——
scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 0.9));
const dir = new THREE.DirectionalLight(0xffffff, 1.0);
dir.position.set(5, 10, 7);
scene.add(dir);

// —— Cube texturé (objet générique + texture) ——
const tex = new THREE.TextureLoader().load(
  'https://threejs.org/examples/textures/uv_grid_opengl.jpg'
);
tex.colorSpace = THREE.SRGBColorSpace;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.8, 1.8, 1.8),
  new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.5,
    metalness: 0.05
  })
);
cube.position.set(-3, 0, 0);
scene.add(cube);

// —— Modèle glTF (GLTFLoader) ——
const loader = new GLTFLoader();
loader.load(
  // Modèle public léger et standard (Khronos Sample Models)
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.position.set(2.5, 0.8, 0);
    model.scale.setScalar(1.6);
    scene.add(model);
  },
  undefined,
  (err) => console.error('Erreur GLTF:', err)
);

// —— DeviceOrientation (capteurs smartphone) ——
const btn = document.getElementById('enableMotion');
let deviceEnabled = false;
let beta = 0, gamma = 0; // inclinaisons du téléphone

function attachDeviceOrientation() {
  window.addEventListener(
    'deviceorientation',
    (e) => {
      beta = (e.beta || 0) * Math.PI / 180;   // avant/arrière
      gamma = (e.gamma || 0) * Math.PI / 180; // gauche/droite
    },
    true
  );
  deviceEnabled = true;
  btn.textContent = 'Capteurs actifs ✔';
  btn.disabled = true;
}

btn.addEventListener('click', () => {
  const any = window;
  // iOS >= 13 : permission explicite
  if (any.DeviceOrientationEvent && typeof any.DeviceOrientationEvent.requestPermission === 'function') {
    any.DeviceOrientationEvent.requestPermission()
      .then((state) => state === 'granted' && attachDeviceOrientation())
      .catch(console.warn);
  } else {
    attachDeviceOrientation();
  }
});

// —— Animation ——
renderer.setAnimationLoop(() => {
  // Rotation simple du cube (toujours)
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.013;

  // Si capteurs actifs : petit effet caméra
  if (deviceEnabled) {
    camera.position.x = 6 + Math.sin(gamma) * 2;
    camera.position.y = 4 + Math.sin(beta) * 1.5;
    camera.lookAt(0, 0.5, 0);
  }

  renderer.render(scene, camera);
});

// —— Responsive ——
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
