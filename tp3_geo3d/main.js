// Création de la scène
const scene = new THREE.Scene();

// Caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// Rendu
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Sphère représentant la Terre
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("earth.jpg");
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Animation
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
