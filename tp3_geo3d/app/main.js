// Ex.1 – Globe 3D + Leaflet (Three.js)
// --------------------------------
// Plan : scène + Terre texturée + conversion lat/lon -> (x,y,z), géoloc user, marqueurs pays (drapeaux),
//        interactions Leaflet -> 3D (clic carte centre globe) et 3D -> Leaflet (clic globe recadre carte).

(() => {
  // --- Three.js setup ---
  const container = document.getElementById('threeContainer');
  const statusEl = document.getElementById('status');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(0, 0, 3.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 2.2;
  controls.maxDistance = 6;

  // Lumières
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(5, 3, 2);
  scene.add(dir);

  // Terre
  const earthRadius = 1;
  const sphereGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
  const textureLoader = new THREE.TextureLoader();

  let earthMat;
  function makeEarthMaterial() {
    // Texture publique du repo three.js (nécessite Internet)
    return new Promise(resolve => {
      const url = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
      textureLoader.load(url, (tx) => {
        const mat = new THREE.MeshStandardMaterial({ map: tx });
        resolve(mat);
      }, undefined, () => {
        // Fallback : couleur unie si texture non dispo
        resolve(new THREE.MeshStandardMaterial({ color: 0x2266aa }));
      });
    });
  }

  let earth;
  (async () => {
    earthMat = await makeEarthMaterial();
    earth = new THREE.Mesh(sphereGeo, earthMat);
    scene.add(earth);
  })();

  // Conversion lat/lon -> (x,y,z) sur la sphère (rayon = earthRadius)
  function latLonToVector3(lat, lon, radius = earthRadius) {
    // Conventions : lat en [-90..90], lon en [-180..180]
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z =  radius * Math.sin(phi) * Math.sin(theta);
    const y =  radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  // Inverse (x,y,z) -> {lat, lon}
  function vector3ToLatLon(v) {
    const r = v.length();
    const phi = Math.acos(THREE.MathUtils.clamp(v.y / r, -1, 1)); // 0..pi
    let theta = Math.atan2(v.z, -v.x); // -pi..pi
    const lat = 90 - (phi * 180 / Math.PI);
    let lon = (theta * 180 / Math.PI) - 180;
    // normalise lon [-180..180]
    lon = ((lon + 180) % 360 + 360) % 360 - 180;
    return { lat, lon };
  }

  // Marqueur 3D simple (sphère ou sprite)
  function addMarker(lat, lon, color = 0xff5533, size = 0.02) {
    const pos = latLonToVector3(lat, lon, earthRadius + size * 1.5);
    const g = new THREE.SphereGeometry(size, 16, 16);
    const m = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.copy(pos);
    scene.add(mesh);
    return mesh;
  }

  // Sprite drapeau
  function addFlagSprite(lat, lon, flagUrl, label = "", scale = 0.25) {
    const pos = latLonToVector3(lat, lon, earthRadius + 0.01);
    const tex = textureLoader.load(flagUrl, undefined, undefined, () => {});
    const mat = new THREE.SpriteMaterial({ map: tex, depthTest: true });
    const sprite = new THREE.Sprite(mat);
    sprite.position.copy(pos);
    sprite.scale.set(scale, scale * 0.66, 1);
    scene.add(sprite);

    if (label) {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.color = '#fff';
      div.style.fontSize = '12px';
      div.style.pointerEvents = 'none';
      div.textContent = label;
      div.dataset._isLabel = "1";
      container.appendChild(div);
      sprite.userData._labelEl = div;
    }

    return sprite;
  }

  // Géolocalisation utilisateur
  let userMarker = null;
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      userMarker = addMarker(latitude, longitude, 0x00ff88, 0.028);
      statusEl.innerText = `Ma position: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }, (err) => {
      statusEl.innerText = "Géoloc indisponible: " + err.message;
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 });
  } else {
    statusEl.innerText = "Géoloc non supportée par ce navigateur.";
  }

  // --- Leaflet ---
  const map = L.map('map').setView([48.8566, 2.3522], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Clic sur la carte -> oriente la Terre pour amener (lat,lon) en face caméra
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    goToLatLonOnGlobe(lat, lng, 0.04);
  });

  // Fonction pour aligner une lat/lon au centre de l'écran (devant caméra)
  function goToLatLonOnGlobe(lat, lon, speed = 0.05) {
    // On veut que le point visé soit en direction du +Z caméra (dans l'espace caméra).
    // Idée : calculer rotation cible (en yaw/pitch) pour amener la normale (x,y,z) au point en (0,0,earthRadius) après rotation inverse.
    // Plus simple : orienter la Terre en utilisant les angles opposés.
    // Calcul des angles à partir de lat/lon :
    const target = latLonToVector3(lat, lon, earthRadius);
    // Pour amener 'target' vers la direction caméra (0,0,earthRadius), on oriente le globe.
    // Approximation : définir rotations autour de Y (lon) puis X (lat).
    const targetSph = { lat, lon };
    const targetRotY = THREE.MathUtils.degToRad(targetSph.lon); // yaw
    const targetRotX = THREE.MathUtils.degToRad(-targetSph.lat); // pitch

    // Interpolation lissée
    // On anime dans la boucle animate() via variables globales
    desiredRotation.y = targetRotY;
    desiredRotation.x = targetRotX;
    rotateSpeed = speed;
  }

  const desiredRotation = { x: 0, y: 0 };
  let rotateSpeed = 0.03;

  // --- Raycasting globe : clic sur la Terre => recadrer la carte sur (lat,lon)
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function onClickThree(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    if (!earth) return;
    const hit = raycaster.intersectObject(earth);
    if (hit && hit.length) {
      const p = hit[0].point.clone().normalize().multiplyScalar(earthRadius);
      const { lat, lon } = vector3ToLatLon(p);
      map.setView([lat, lon], Math.max(map.getZoom(), 4));
      statusEl.innerText = `Globe → Leaflet : lat=${lat.toFixed(4)}, lon=${lon.toFixed(4)}`;
    }
  }
  renderer.domElement.addEventListener('click', onClickThree);

  // --- Boutons de démo ---
  document.getElementById('btnGotoParis').addEventListener('click', () => goToLatLonOnGlobe(48.8566, 2.3522));
  document.getElementById('btnGotoTokyo').addEventListener('click', () => goToLatLonOnGlobe(35.6762, 139.6503));

  // Ajouter quelques pays (flags) via restcountries
  document.getElementById('btnAddCountries').addEventListener('click', async () => {
    statusEl.innerText = "Chargement des pays...";
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const countries = await res.json();
      const picks = ["France", "United States", "Japan", "Brazil", "Morocco", "Australia", "India"];
      countries.filter(c => c.name && picks.includes(c.name.common)).forEach(c => {
        const latlng = c.latlng || [0,0];
        const flag = (c.flags && (c.flags.png || c.flags.svg)) || null;
        if (flag) addFlagSprite(latlng[0], latlng[1], flag, c.name.common);
      });
      statusEl.innerText = "Pays ajoutés.";
    } catch (e) {
      statusEl.innerText = "Impossible de charger les pays (offline/CORS). Ajout de marqueurs de secours.";
      // Fallback: quelques points fixes
      addMarker(48.8566, 2.3522, 0xffaa00); // Paris
      addMarker(35.6762, 139.6503, 0x66ccff); // Tokyo
      addMarker(40.7128, -74.0060, 0x33ffaa); // NYC
    }
  });

  // --- Resize ---
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
  onResize();

  // --- Animation ---
  function updateLabelScreenspace() {
    // Place les étiquettes DOM (drapeaux label) au bon endroit
    const labels = container.querySelectorAll('[data-_isLabel="1"]');
    const proj = new THREE.Vector3();
    labels.forEach(el => {
      const sprite = findSpriteByLabelEl(el);
      if (!sprite) return;
      proj.copy(sprite.position).project(camera);
      const x = (proj.x * 0.5 + 0.5) * container.clientWidth;
      const y = (-proj.y * 0.5 + 0.5) * container.clientHeight;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  function findSpriteByLabelEl(el) {
    // Recherche naïve : on parcourt les objets enfants
    let found = null;
    scene.traverse(obj => {
      if (obj.isSprite && obj.userData && obj.userData._labelEl === el) {
        found = obj;
      }
    });
    return found;
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Rotation lissée du globe vers la cible
    if (earth) {
      earth.rotation.y += (desiredRotation.y - earth.rotation.y) * rotateSpeed;
      earth.rotation.x += (desiredRotation.x - earth.rotation.x) * rotateSpeed;
    }

    updateLabelScreenspace();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
})();
