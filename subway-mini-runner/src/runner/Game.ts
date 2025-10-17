import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { AdvancedDynamicTexture, TextBlock, Rectangle, Button, Control } from "@babylonjs/gui/2D";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";

type Obstacle = { mesh: AbstractMesh, lane: number, z: number, type: "barrier"|"train"|"magnet" };
type Coin = { mesh: AbstractMesh, lane: number, z: number };

export class Game {
  last = performance.now();
  dt = 0;
  running = true;

  speed = 12;
  gravity = -36;
  jumpVel = 16;
  velY = 0;

  laneX = [-3, 0, 3];
  curLane = 1;

  player!: AbstractMesh;
  groundSegments: AbstractMesh[] = [];
  sideWalls: AbstractMesh[] = [];
  obstacles: Obstacle[] = [];
  coins: Coin[] = [];
  spawnTimer = 0;
  coinTimer = 0;

  score = 0;
  coinsCount = 0;
  best = 0;

  ui!: AdvancedDynamicTexture;
  uiScore!: TextBlock;
  uiCoins!: TextBlock;
  uiBest!: TextBlock;
  uiState!: TextBlock;
  uiReplayBtn?: Button;
  uiOverlay?: Rectangle;

  constructor(public engine: Engine, public scene: Scene, public canvas: HTMLCanvasElement){}

  sliding = false;
  slideT = 0; // seconds remaining
  magnetT = 0; // seconds of active magnet

  spawnGrace = 0.1;

  async init(){
    this.scene.clearColor = new Color4(0.04,0.05,0.08,1);
    const hemi = new HemisphericLight("h", new Vector3(0,1,0), this.scene); hemi.intensity = 0.9;
    const sun = new DirectionalLight("sun", new Vector3(-0.2,-1,-0.3), this.scene); sun.intensity = 0.9;

    // Glow for emissive neon
    const glow = new GlowLayer("glow", this.scene);
    glow.intensity = 0.6;

    // Camera derrière le joueur
    const cam = new FreeCamera("cam", new Vector3(0, 6, -10), this.scene);
    cam.setTarget(new Vector3(0, 2, 8));
    // Camera stays fixed; world scrolls towards camera
    cam.attachControl(this.canvas, true);
    cam.inputs.clear(); // pas de contrôle utilisateur, c'est "rail"
    cam.inertia = 0;

    // Joueur (capsule stylisée)
    // CreateCapsule exists in Babylon 7+; fallback to cylinder if needed
    let playerMesh: AbstractMesh;
    try{
      playerMesh = MeshBuilder.CreateCapsule("runner", { radius: 0.5, height: 1.2 }, this.scene) as AbstractMesh;
    }catch(e){
      playerMesh = MeshBuilder.CreateCylinder("runner", { diameterTop: 0.9, diameterBottom: 0.9, height: 1.2 }, this.scene) as AbstractMesh;
    }
    const pm = new StandardMaterial("pm", this.scene);
    pm.diffuseColor = new Color3(0.95,0.55,0.15);
    pm.emissiveColor = new Color3(0.12,0.06,0.02);
    pm.specularColor = new Color3(0.35,0.25,0.15);
    playerMesh.material = pm;
    playerMesh.position = new Vector3(this.laneX[this.curLane], 0.6, 0);
    playerMesh.scaling.y = 1.05;
    this.player = playerMesh;
    // Sol (segments qui défilent)
    for(let i=0;i<14;i++){
      const seg = MeshBuilder.CreateGround("seg"+i, { width: 12, height: 10 }, this.scene);
      const m = new StandardMaterial("sm"+i, this.scene);
      m.diffuseColor = new Color3(0.12,0.14,0.2);
      m.specularColor = new Color3(0,0,0);
      seg.material = m;
      seg.position = new Vector3(0, 0, i*10);
      // Neon lane lines (two)
      const lineMat = new StandardMaterial("lineM"+i, this.scene); lineMat.emissiveColor = new Color3(1.0,0.85,0.4); lineMat.alpha = 0.9;
      const l1 = MeshBuilder.CreateBox("line1_"+i, { width: 0.15, height: 0.05, depth: 10 }, this.scene); l1.material = lineMat; l1.position = new Vector3(-1.5, 0.03, i*10);
      const l2 = l1.clone("line2_"+i)!; l2.position.x = 1.5;
      this.groundSegments.push(seg);
    }
    // UI (top-left HUD)
    this.ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");
  const hudPanel = new Rectangle(); hudPanel.thickness = 0; hudPanel.width = "100%"; hudPanel.height = "100%"; hudPanel.isPointerBlocker = false; this.ui.addControl(hudPanel);
  this.uiScore = new TextBlock("score","Score: 0"); this.uiScore.color = "#e2e8f0"; this.uiScore.fontSize = 24; this.uiScore.top = "6px"; this.uiScore.left = "12px"; this.uiScore.textHorizontalAlignment = 0; hudPanel.addControl(this.uiScore);
  this.uiCoins = new TextBlock("coins","Coins: 0"); this.uiCoins.color = "#fde68a"; this.uiCoins.fontSize = 22; this.uiCoins.top = "34px"; this.uiCoins.left = "12px"; this.uiCoins.textHorizontalAlignment = 0; hudPanel.addControl(this.uiCoins);
  this.uiBest = new TextBlock("best","Best: 0"); this.uiBest.color = "#93c5fd"; this.uiBest.fontSize = 20; this.uiBest.top = "60px"; this.uiBest.left = "12px"; this.uiBest.textHorizontalAlignment = 0; hudPanel.addControl(this.uiBest);

    // Fullscreen overlay for Game Over (hidden initially)
    const overlay = new Rectangle("overlay"); overlay.thickness = 0; overlay.width = "100%"; overlay.height = "100%"; overlay.background = "black"; overlay.alpha = 0.45; overlay.isVisible = false; overlay.isPointerBlocker = true; this.ui.addControl(overlay);
    this.uiOverlay = overlay;

    this.uiState = new TextBlock("state",""); this.uiState.alpha = 0;  this.uiState.color = "#fca5a5"; this.uiState.fontSize = 32; this.uiState.textHorizontalAlignment = 2; this.uiState.verticalAlignment = 1; this.uiState.text = ""; overlay.addControl(this.uiState);

    // Input clavier et tactile
    // Pointer/touch controls: left/center/right tap -> left/jump/right; when game over tap anywhere to reset
    let pointerStartX = 0;
    this.canvas.addEventListener('pointerdown', (ev: PointerEvent)=>{
      if(!this.running){ this.reset(); return; }
      const rect = this.canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const w = rect.width;
      if(x < w/3) this.moveLane(-1);
      else if(x > 2*w/3) this.moveLane(1);
      else this.jump();
      pointerStartX = x;
    });
    for(let i=0;i<20;i++){
      const left = MeshBuilder.CreateBox("wl"+i, { width: 0.5, height: 4, depth: 10 }, this.scene);
      const right = left.clone("wr"+i)!;
      const mat = new StandardMaterial("wm"+i, this.scene);
      mat.diffuseColor = new Color3(0.15,0.18,0.25);
      left.material = mat; right.material = mat;
      left.position = new Vector3(-6.25, 2, i*10);
      right.position = new Vector3(6.25, 2, i*10);
      // Neon panels
      const npMat = new StandardMaterial("npm"+i, this.scene); npMat.emissiveColor = new Color3(0.35,0.7,1.0);
      const panelL = MeshBuilder.CreateBox("npl"+i, { width: 0.2, height: 1.5, depth: 2 }, this.scene); panelL.material = npMat; panelL.position = new Vector3(-6.05, 1.8, i*10+3);
      const panelR = panelL.clone("npr"+i)!; panelR.position.x = 6.05; panelR.position.z = i*10+6;
      this.sideWalls.push(left, right);
    }

    // Replay button is on overlay (created earlier)
    const replayBtn = Button.CreateSimpleButton("replayBtn", "Rejouer");
    replayBtn.width = "160px"; replayBtn.height = "48px";
    replayBtn.color = "#08101a"; replayBtn.background = "#60a5fa"; replayBtn.cornerRadius = 8;
    replayBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    replayBtn.top = "24px";
    replayBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    replayBtn.isVisible = false;
    replayBtn.onPointerUpObservable.add(()=>{ this.reset(); });
    overlay.addControl(replayBtn);
    this.uiReplayBtn = replayBtn;

    // Input clavier
    window.addEventListener("keydown", (e)=>{
      if(!this.running && e.key.toLowerCase()==="r"){ this.reset(); return; }
      if(!this.running) return;
      if(e.key==="ArrowLeft" || e.key.toLowerCase()==="a") this.moveLane(-1);
      if(e.key==="ArrowRight" || e.key.toLowerCase()==="d") this.moveLane(1);
      if(e.key===" "){ this.jump(); }
      if(e.key==="ArrowDown" || e.key.toLowerCase()==="s"){ this.slide(); }
    });
  }

  moveLane(dir:number){
    const next = this.curLane + dir;
    if(next < 0 || next > 2) return;
    this.curLane = next;
    this.player.position.x = this.laneX[this.curLane];
  }

  jump(){
    if(this.player.position.y <= 1.01){ // au sol
      this.velY = this.jumpVel;
    }
  }

  slide(){
    if(this.sliding || this.player.position.y > 1.05) return; // no slide in air
    this.sliding = true; this.slideT = 0.6;
    // crouch: shrink height by scaling Y and lower center
    this.player.scaling.y = 0.5; this.player.position.y = 0.5;
  }

  reset(){
    for(const o of this.obstacles){ o.mesh.dispose(); } this.obstacles = [];
    for(const c of this.coins){ c.mesh.dispose(); } this.coins = [];
    this.spawnTimer = 0; this.coinTimer = 0; this.spawnGrace = 0.35; this.magnetT = 0;
    this.speed = 12; this.velY = 0;
    this.score = 0; this.coinsCount = 0; this.running = true;
  this.spawnGrace = 0; this.uiState.text = ""; this.uiState.alpha = 0;
    if(this.uiReplayBtn) { this.uiReplayBtn.isVisible = false; }
    if(this.uiOverlay) { this.uiOverlay.isVisible = false; }
    this.curLane = 1; this.player.position = new Vector3(this.laneX[1], 1, 0);
    // restore player scale in case we were sliding when died
    this.player.scaling.y = 1;
    this.sliding = false;
  }

  update(){
    const now = performance.now();
    this.dt = Math.min(0.05, (now - this.last)/1000); this.last = now;
    if(!this.running) return;

    // Défilement du monde (segments/walls vers l'arrière)
    const dz = this.speed * this.dt;
    for(const seg of this.groundSegments){
      seg.position.z -= dz;
      if(seg.position.z < -10) seg.position.z += 10*14;
    }
    for(const w of this.sideWalls){
      w.position.z -= dz;
      if(w.position.z < -10) w.position.z += 10*20;
    }

    // Spawn obstacles & coins
    this.spawnTimer -= this.dt; this.spawnGrace = Math.max(0, this.spawnGrace - this.dt);
    if(this.spawnTimer <= 0){
      this.spawnObstacle();
      this.spawnTimer = Math.max(0.5, 1.2 - this.score*0.001);
    }
    this.coinTimer -= this.dt;
    if(this.coinTimer <= 0){
      this.spawnCoinRow();
      this.coinTimer = 2.6;
    }

    // Mouvement vertical (saut/gravity)
    this.velY += this.gravity * this.dt;
    this.player.position.y += this.velY * this.dt;
    if(this.player.position.y < 1){ this.player.position.y = 1; this.velY = 0; }

    // Slide timer
    if(this.sliding){ this.slideT -= this.dt; if(this.slideT <= 0){ this.sliding = false; this.player.scaling.y = 1; this.player.position.y = Math.max(this.player.position.y, 1); }}

    // Avancer la caméra un peu pour suivre

    // Avancer obstacles & coins
    for(const o of this.obstacles){
      o.z -= dz; o.mesh.position.z = o.z;
      if(this.spawnGrace<=0 && this.intersect(this.player, o.mesh)){
        if(o.type === "barrier"){
          // if sliding, pass under; else game over
          if(!this.sliding){ this.gameOver(); return; }
        } else if(o.type === "magnet"){
          // pickup magnet
          this.magnetT = 8.0; o.mesh.dispose(); o.mesh = null as any; continue;
        } else {
          this.gameOver(); return;
        }
      }
    }
    this.obstacles = this.obstacles.filter(o => {
      if(o.z < -12){ o.mesh.dispose(); return false; }
      return true;
    });

    for(const c of this.coins){
      c.z -= dz; c.mesh.position.z = c.z; c.mesh.rotation.y += this.dt*6;
      if(this.magnetT>0){
        const dir = this.player.position.subtract(c.mesh.position);
        const d = dir.length();
        if(d < 4.5){ c.mesh.position.addInPlace(dir.normalize().scale(12*this.dt)); }
      }
      if(this.intersect(this.player, c.mesh)){
        this.coinsCount += 1; c.mesh.dispose();
        this.speed = this.speed + 0.35;
      }
    }
    this.coins = this.coins.filter(c => c.mesh && c.z >= -12);

    if(this.magnetT>0) this.magnetT -= this.dt;

    // Score & vitesse
    this.score += this.dt * 12;
    this.uiScore.text = "Score: " + Math.floor(this.score).toString();
    this.uiCoins.text = "Coins: " + this.coinsCount.toString();
    this.uiBest.text = "Best: " + Math.floor(this.best).toString();
    this.speed += this.dt * 0.12;
  }

  spawnObstacle(){
    const lane = Math.floor(Math.random()*3);
    const type: "barrier"|"train"|"magnet" = (Math.random() < 0.70 ? "barrier" : (Math.random() < 0.85 ? "train" : "magnet"));
    let mesh;
    if(type === "barrier"){
      mesh = MeshBuilder.CreateBox("barrier", { width: 1.8, height: 1.2, depth: 1.2 }, this.scene);
      const m = new StandardMaterial("bm", this.scene);
      m.diffuseColor = new Color3(0.8,0.4,0.4);
      m.specularColor = new Color3(0.3,0.15,0.15);
      m.emissiveColor = new Color3(0.05,0.02,0.02);
      mesh.material = m;
    } else {
      mesh = MeshBuilder.CreateBox("train", { width: 2.5, height: 2.5, depth: 6 }, this.scene);
      const m = new StandardMaterial("tm", this.scene);
      m.diffuseColor = new Color3(0.45,0.6,0.9);
      m.emissiveColor = new Color3(0.08,0.12,0.18);
      m.specularColor = new Color3(0.2,0.25,0.35);
      mesh.material = m;
    }
    const z = 10*14 + (type==="train"? 10 : 4);
    mesh.position = new Vector3(this.laneX[lane], type==="train"?1.25:0.6, z);
    mesh.computeWorldMatrix(true);
    this.obstacles.push({ mesh, lane, z, type });
  }

  spawnCoinRow(){
    const startLane = Math.floor(Math.random()*3);
    const count = 1 + Math.floor(Math.random()*2);
    for(let i=0;i<count;i++){
      const lane = (startLane + i) % 3;
      const coin = MeshBuilder.CreateCylinder("coin", { diameterTop: 1, diameterBottom: 1, height: 0.2, tessellation: 16 }, this.scene);
  const m = new StandardMaterial("cm", this.scene);
  m.diffuseColor = new Color3(1.0,0.85,0.3);
  m.emissiveColor = new Color3(0.6,0.45,0.1);
  m.specularColor = new Color3(0.6,0.5,0.2);
  coin.material = m;
      const z = 10*14 + 6 + i*2;
      coin.position = new Vector3(this.laneX[lane], 1.4, z);
      coin.computeWorldMatrix(true);
      this.coins.push({ mesh: coin, lane, z });
    }
  }

  gameOver(){
    this.running = false;
    this.best = Math.max(this.best, this.score);
    this.uiBest.text = "Best: " + Math.floor(this.best).toString();
    this.uiState.text = "💥 Oops ! Appuie sur R pour rejouer"; this.uiState.alpha = 1;
    if(this.uiOverlay) { this.uiOverlay.isVisible = true; }
    if(this.uiReplayBtn) { this.uiReplayBtn.isVisible = true; }
  }

  // Overlap AABB (approximation rapide)
  intersect(a: any, b: any): boolean {
    const aMin = a.getBoundingInfo().boundingBox.minimumWorld;
    const aMax = a.getBoundingInfo().boundingBox.maximumWorld;
    const bMin = b.getBoundingInfo().boundingBox.minimumWorld;
    const bMax = b.getBoundingInfo().boundingBox.maximumWorld;
    return (aMin.x <= bMax.x && aMax.x >= bMin.x) &&
           (aMin.y <= bMax.y && aMax.y >= bMin.y) &&
           (aMin.z <= bMax.z && aMax.z >= bMin.z);
  }
}