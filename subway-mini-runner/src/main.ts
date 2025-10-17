import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Game } from "./runner/Game";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
const scene = new Scene(engine);
const game = new Game(engine, scene, canvas);

game.init().then(()=>{
  engine.runRenderLoop(()=>{
    game.update();
    scene.render();
  });
});

window.addEventListener("resize", ()=>engine.resize());