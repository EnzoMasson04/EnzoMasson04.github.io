// TD2 – Three.js (simple, commenté, juste ce qui est demandé)
// Exo1: scène/caméra/renderer + cube immédiat
// Exo2: texture locale sur un cube
// Exo3: éclairage + matériau standard
// Exo4: chargement d'un modèle glTF (GLTFLoader) depuis CDN
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1020);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(3, 2, 6);

// EXO1: cube basique (MeshBasicMaterial -> pas besoin de lumière)
const cubeBasic = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshBasicMaterial({ color: 0x44aa88 })
);
cubeBasic.position.set(-3, 1.2, 0);
scene.add(cubeBasic);

// EXO3: lumières + sol (pour matériaux standards)
const dir = new THREE.DirectionalLight(0xffffff, 1.0);
dir.position.set(5,10,7);
scene.add(dir);
scene.add(new THREE.AmbientLight(0x88aaff, 0.35));
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100),
  new THREE.MeshStandardMaterial({ color: 0x162040, roughness: 1.0 })
);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// EXO2: cube texturé (texture locale)
const tex = new THREE.TextureLoader().load('./assets/checkerboard.png');
tex.colorSpace = THREE.SRGBColorSpace;
tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set(2,2);
const cubeTextured = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, metalness: 0.1 })
);
cubeTextured.position.set(0, 1.2, 0);
scene.add(cubeTextured);

// EXO4: modèle glTF (GLTFLoader)
const loader = new GLTFLoader();
loader.load(
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf',
  (gltf)=>{
    const model = gltf.scene;
    model.scale.setScalar(1.6);
    model.position.set(3,1.0,0);
    scene.add(model);
  },
  undefined,
  (err)=>console.error('Erreur GLTF:', err)
);

// boucle
function loop(){
  cubeBasic.rotation.x += 0.01; cubeBasic.rotation.y += 0.02;
  cubeTextured.rotation.y += 0.015;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
loop();

window.addEventListener('resize', ()=>{
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w/h; camera.updateProjectionMatrix();
  renderer.setSize(w,h);
});
