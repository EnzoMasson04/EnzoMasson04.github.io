// Ex1 – version la plus simple possible :
// - scène + caméra + renderer
// - un cube coloré (MeshBasicMaterial) => pas de lumières nécessaires
// - une petite animation de rotation
// - resize responsive

import * as THREE from 'three';

// Cible d'affichage
const app = document.getElementById('app');

// Renderer (canvas WebGL)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
app.appendChild(renderer.domElement);

// Scène + caméra
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1116);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(3, 2, 5);

// Cube (matériau basique = pas de lumière)
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ color: 0x44aa88 })
);
scene.add(cube);

// Boucle d'animation
function tick(){
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

// Responsive
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
