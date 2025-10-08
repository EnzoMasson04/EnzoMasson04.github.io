(() => {
  // ===========
  //  Références DOM
  // ===========
  const threeContainer = document.getElementById('threeContainer');
  const statusEl = document.getElementById('status');
  const mapContainer = document.getElementById('map');

  // ===========
  //  THREE.js de base
  // ===========
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    threeContainer.clientWidth / threeContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
  threeContainer.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 2.2;
  controls.maxDistance = 6.5;

  // Lumières
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dir = new THREE.DirectionalLight(0xffffff, 1.0);
  dir.position.set(3, 2, 1);
  scene.add(dir);

  // ===========
  //  Globe
  // ===========
  const earthRadius = 1.0;
  let earth;

  // Chemin de texture : adapte si besoin
  const EARTH_TEXTURE = "earth.jpg";

  function makeEarthMaterial() {
    try {
      const tex = new THREE.TextureLoader().load(EARTH_TEXTURE);
      tex.anisotropy = 8;
      return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0.0 });
    } catch (e) {
      // Fallback sans texture
      return new THREE.MeshStandardMaterial({ color: 0x2e6bd6, roughness: 0.9, metalness: 0.0 });
    }
  }

  (function buildEarth() {
    const geo = new THREE.SphereGeometry(earthRadius, 96, 96);
    const mat = makeEarthMaterial();
    earth = new THREE.Mesh(geo, mat);
    scene.add(earth);
  })();

  // ===========
  //  Conversions lat/lon <-> vecteur
  // ===========
  function latLonToVector3(lat, lon, radius = earthRadius) {
    // Convention: lat ∈ [-90, +90], lon ∈ [-180, +180]
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon + 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z =  radius * Math.sin(phi) * Math.sin(theta);
    const y =  radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  function vector3ToLatLon(v) {
    const r = v.length();
    if (r === 0) return { lat: 0, lon: 0 };
    const phi = Math.acos(THREE.MathUtils.clamp(v.y / r, -1, 1)); // 0..PI
    const theta = Math.atan2(v.z, -v.x); // -PI..PI
    const lat = 90 - THREE.MathUtils.radToDeg(phi);
    let lon = THREE.MathUtils.radToDeg(theta) - 180;
    if (lon < -180) lon += 360;
    if (lon > 180) lon -= 360;
    return { lat, lon };
  }

  // ===========
  //  Quaternion cible + slerp pour l’orientation du globe
  // ===========
  const desiredQuat = new THREE.Quaternion().copy(earth.quaternion);
  let rotateLerp = 0.06; // vitesse de slerp (0.03–0.15)

  /**
   * Oriente le globe pour amener (lat,lon) EXACTEMENT face caméra
   * en gardant le Nord global vers le haut écran autant que possible.
   */
  function goToLatLonOnGlobe(lat, lon, speed = 0.08) {
    // Vecteur du point visé sur la sphère (en espace monde actuel du globe)
    const targetWorld = latLonToVector3(lat, lon, earthRadius).normalize();

    // On veut que ce point regarde la caméra (dans l'espace caméra, direction +Z)
    // Construire la rotation qui emmène targetWorld -> +Z
    const toCam = new THREE.Vector3(0, 0, 1);
    const qFromTo = new THREE.Quaternion().setFromUnitVectors(targetWorld, toCam);

    // Garder le Nord "à peu près" en haut : calculer le nord local au point,
    // le faire passer par qFromTo, puis annuler le roll autour de l'axe Z.
    const d = 0.001; // petit pas de lat pour approximer le Nord
    const p1 = latLonToVector3(lat, lon, earthRadius).normalize();
    const p2 = latLonToVector3(lat + d, lon, earthRadius).normalize();
    const northLocal = p2.clone().sub(p1).normalize(); // tangent "Nord" locale
    const upAfter = northLocal.clone().applyQuaternion(qFromTo);

    // Projection de upAfter dans le plan écran (X,Y), on aligne vers +Y
    const projUp = new THREE.Vector3(upAfter.x, upAfter.y, 0);
    if (projUp.lengthSq() > 1e-10) {
      projUp.normalize();
      const angle = Math.atan2(projUp.x, projUp.y); // angle signé vers +Y
      const qNoRoll = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -angle);
      qFromTo.multiply(qNoRoll);
    }

    desiredQuat.copy(qFromTo);
    rotateLerp = speed;
  }

  // ===========
  //  Raycaster pour clic sur le globe -> repositionner la carte
  // ===========
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onClickThree(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObject(earth, true);
    if (hits.length) {
      // Point d'impact en espace monde sur la sphère
      const p = hits[0].point.clone().normalize().multiplyScalar(earthRadius);
      const { lat, lon } = vector3ToLatLon(p);
      map.setView([lat, lon], Math.max(map.getZoom(), 4), { animate: true, duration: 0.6 });
      status(`Globe → Map : lat=${lat.toFixed(4)} lon=${lon.toFixed(4)}`);
    }
  }
  renderer.domElement.addEventListener('click', onClickThree);

  // ===========
  //  Leaflet (carte)
  // ===========
  const map = L.map(mapContainer, {
    zoomControl: true,
    minZoom: 2,
    maxZoom: 19,
    worldCopyJump: true
  }).setView([48.8584, 2.2945], 3); // Paris par défaut

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Clic sur la carte -> oriente le globe
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    goToLatLonOnGlobe(lat, lng, 0.1);
    status(`Map → Globe : lat=${lat.toFixed(4)} lon=${lng.toFixed(4)}`);
  });

  // ===========
  //  Resize
  // ===========
  function onResize() {
    const w = threeContainer.clientWidth;
    const h = threeContainer.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    map.invalidateSize();
  }
  window.addEventListener('resize', onResize);

  // ===========
  //  HUD
  // ===========
  function status(msg) {
    if (statusEl) statusEl.textContent = msg || '';
  }

  // ===========
  //  Boucle d’animation
  // ===========
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Slerp de l'orientation du globe vers la cible
    if (earth) {
      earth.quaternion.slerp(desiredQuat, rotateLerp);
    }

    renderer.render(scene, camera);
  }
  animate();

  // ===========
  //  Stubs optionnels (si ton ancien code les appelait)
  // ===========
  function addMarker() {}            // no-op pour compat
  function addFlagSprite() {}        // no-op pour compat
  function updateLabelScreenspace() {}// no-op pour compat
})();
