// Ex2 minimal:
// - Scène + caméra + lumières
// - Objet générique (cube) + texture
// - Chargement d'un modèle 3D (glb)
// - Animation via capteurs smartphone (DeviceOrientation)

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.06, 0.07, 0.10, 1); // fond sombre

  // Caméra orbitale simple
  const camera = new BABYLON.ArcRotateCamera(
    'cam',
    Math.PI / 3, Math.PI / 3, 12,
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  camera.attachControl(canvas, true);

  // Lumières
  new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene);
  const dir = new BABYLON.DirectionalLight('dir', new BABYLON.Vector3(-1, -2, -1), scene);
  dir.intensity = 0.9;

  // Sol simple pour l'échelle
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene);
  const gmat = new BABYLON.StandardMaterial('gmat', scene);
  gmat.diffuseColor = new BABYLON.Color3(0.10, 0.12, 0.22);
  ground.material = gmat;

  // Objet générique + texture
  const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);
  box.position = new BABYLON.Vector3(-3, 1, 0);
  const bmat = new BABYLON.StandardMaterial('bmat', scene);
  bmat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/textures/amiga.jpg', scene);
  bmat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
  box.material = bmat;

  // Modèle 3D (glb) via les loaders Babylon
  BABYLON.SceneLoader.Append(
    'https://assets.babylonjs.com/meshes/',
    'DamagedHelmet.glb',
    scene,
    function () {
      // Le casque est ajouté dans la scène; centrons-le simplement
      const helmet = scene.getNodeByName('node_damagedHelmet_primitive0')?.parent || null;
      if (helmet) {
        helmet.position = new BABYLON.Vector3(2.5, 1, 0);
        helmet.scaling = new BABYLON.Vector3(1.8, 1.8, 1.8);
      }
    }
  );

  // DeviceOrientation (capteurs)
  const btn = document.getElementById('enableMotion');
  let beta = 0, gamma = 0;
  let motionEnabled = false;

  function attach() {
    window.addEventListener('deviceorientation', (e) => {
      beta = (e.beta || 0) * Math.PI / 180;   // avant/arrière
      gamma = (e.gamma || 0) * Math.PI / 180; // gauche/droite
    }, true);
    motionEnabled = true;
    btn.textContent = 'Capteurs actifs ✔';
    btn.disabled = true;
  }

  btn.addEventListener('click', () => {
    const any = window;
    if (any.DeviceOrientationEvent && typeof any.DeviceOrientationEvent.requestPermission === 'function') {
      any.DeviceOrientationEvent.requestPermission()
        .then((state) => state === 'granted' && attach())
        .catch(console.warn);
    } else {
      attach();
    }
  });

  // Petite animation continue + effet capteurs sur la caméra
  scene.onBeforeRenderObservable.add(() => {
    const dt = scene.getEngine().getDeltaTime() * 0.001;
    box.rotation.y += 0.6 * dt;

    if (motionEnabled) {
      camera.alpha = Math.PI / 3 + gamma * 0.5;
      camera.beta  = Math.PI / 3 + beta  * 0.25;
    }
  });

  return scene;
}

const scene = createScene();
engine.runRenderLoop(() => scene.render());
window.addEventListener('resize', () => engine.resize());
