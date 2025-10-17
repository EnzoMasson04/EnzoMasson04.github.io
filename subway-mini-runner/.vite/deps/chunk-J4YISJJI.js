import {
  PostProcess
} from "./chunk-PKTWLCMT.js";
import {
  EffectWrapper
} from "./chunk-3Z776HTZ.js";
import {
  Engine,
  SphericalHarmonics,
  SphericalPolynomial
} from "./chunk-3IZN45W4.js";
import {
  SerializationHelper,
  __decorate,
  serialize
} from "./chunk-SVMC4EBE.js";
import {
  Vector3
} from "./chunk-NSAPKY2D.js";
import {
  AbstractEngine
} from "./chunk-WEEGRZSP.js";
import {
  Color3
} from "./chunk-5AJSY7TL.js";
import {
  ToLinearSpace
} from "./chunk-EFRFZ7OU.js";
import {
  RegisterClass
} from "./chunk-P24HYHXQ.js";
import {
  Clamp
} from "./chunk-DSTTD374.js";

// node_modules/@babylonjs/core/Misc/HighDynamicRange/cubemapToSphericalPolynomial.js
var FileFaceOrientation = class {
  constructor(name, worldAxisForNormal, worldAxisForFileX, worldAxisForFileY) {
    this.name = name;
    this.worldAxisForNormal = worldAxisForNormal;
    this.worldAxisForFileX = worldAxisForFileX;
    this.worldAxisForFileY = worldAxisForFileY;
  }
};
var CubeMapToSphericalPolynomialTools = class {
  /**
   * Converts a texture to the according Spherical Polynomial data.
   * This extracts the first 3 orders only as they are the only one used in the lighting.
   *
   * @param texture The texture to extract the information from.
   * @returns The Spherical Polynomial data.
   */
  static ConvertCubeMapTextureToSphericalPolynomial(texture) {
    var _a;
    if (!texture.isCube) {
      return null;
    }
    (_a = texture.getScene()) == null ? void 0 : _a.getEngine().flushFramebuffer();
    const size = texture.getSize().width;
    const rightPromise = texture.readPixels(0, void 0, void 0, false);
    const leftPromise = texture.readPixels(1, void 0, void 0, false);
    let upPromise;
    let downPromise;
    if (texture.isRenderTarget) {
      upPromise = texture.readPixels(3, void 0, void 0, false);
      downPromise = texture.readPixels(2, void 0, void 0, false);
    } else {
      upPromise = texture.readPixels(2, void 0, void 0, false);
      downPromise = texture.readPixels(3, void 0, void 0, false);
    }
    const frontPromise = texture.readPixels(4, void 0, void 0, false);
    const backPromise = texture.readPixels(5, void 0, void 0, false);
    const gammaSpace = texture.gammaSpace;
    const format = 5;
    let type = 0;
    if (texture.textureType == 1 || texture.textureType == 2) {
      type = 1;
    }
    return new Promise((resolve) => {
      Promise.all([leftPromise, rightPromise, upPromise, downPromise, frontPromise, backPromise]).then(([left, right, up, down, front, back]) => {
        const cubeInfo = {
          size,
          right,
          left,
          up,
          down,
          front,
          back,
          format,
          type,
          gammaSpace
        };
        resolve(this.ConvertCubeMapToSphericalPolynomial(cubeInfo));
      });
    });
  }
  /**
   * Compute the area on the unit sphere of the rectangle defined by (x,y) and the origin
   * See https://www.rorydriscoll.com/2012/01/15/cubemap-texel-solid-angle/
   * @param x
   * @param y
   * @returns the area
   */
  static _AreaElement(x, y) {
    return Math.atan2(x * y, Math.sqrt(x * x + y * y + 1));
  }
  /**
   * Converts a cubemap to the according Spherical Polynomial data.
   * This extracts the first 3 orders only as they are the only one used in the lighting.
   *
   * @param cubeInfo The Cube map to extract the information from.
   * @returns The Spherical Polynomial data.
   */
  static ConvertCubeMapToSphericalPolynomial(cubeInfo) {
    const sphericalHarmonics = new SphericalHarmonics();
    let totalSolidAngle = 0;
    const du = 2 / cubeInfo.size;
    const dv = du;
    const halfTexel = 0.5 * du;
    const minUV = halfTexel - 1;
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      const fileFace = this._FileFaces[faceIndex];
      const dataArray = cubeInfo[fileFace.name];
      let v = minUV;
      const stride = cubeInfo.format === 5 ? 4 : 3;
      for (let y = 0; y < cubeInfo.size; y++) {
        let u = minUV;
        for (let x = 0; x < cubeInfo.size; x++) {
          const worldDirection = fileFace.worldAxisForFileX.scale(u).add(fileFace.worldAxisForFileY.scale(v)).add(fileFace.worldAxisForNormal);
          worldDirection.normalize();
          const deltaSolidAngle = this._AreaElement(u - halfTexel, v - halfTexel) - this._AreaElement(u - halfTexel, v + halfTexel) - this._AreaElement(u + halfTexel, v - halfTexel) + this._AreaElement(u + halfTexel, v + halfTexel);
          let r = dataArray[y * cubeInfo.size * stride + x * stride + 0];
          let g = dataArray[y * cubeInfo.size * stride + x * stride + 1];
          let b = dataArray[y * cubeInfo.size * stride + x * stride + 2];
          if (isNaN(r)) {
            r = 0;
          }
          if (isNaN(g)) {
            g = 0;
          }
          if (isNaN(b)) {
            b = 0;
          }
          if (cubeInfo.type === 0) {
            r /= 255;
            g /= 255;
            b /= 255;
          }
          if (cubeInfo.gammaSpace) {
            r = Math.pow(Clamp(r), ToLinearSpace);
            g = Math.pow(Clamp(g), ToLinearSpace);
            b = Math.pow(Clamp(b), ToLinearSpace);
          }
          const max = this.MAX_HDRI_VALUE;
          if (this.PRESERVE_CLAMPED_COLORS) {
            const currentMax = Math.max(r, g, b);
            if (currentMax > max) {
              const factor = max / currentMax;
              r *= factor;
              g *= factor;
              b *= factor;
            }
          } else {
            r = Clamp(r, 0, max);
            g = Clamp(g, 0, max);
            b = Clamp(b, 0, max);
          }
          const color = new Color3(r, g, b);
          sphericalHarmonics.addLight(worldDirection, color, deltaSolidAngle);
          totalSolidAngle += deltaSolidAngle;
          u += du;
        }
        v += dv;
      }
    }
    const sphereSolidAngle = 4 * Math.PI;
    const facesProcessed = 6;
    const expectedSolidAngle = sphereSolidAngle * facesProcessed / 6;
    const correctionFactor = expectedSolidAngle / totalSolidAngle;
    sphericalHarmonics.scaleInPlace(correctionFactor);
    sphericalHarmonics.convertIncidentRadianceToIrradiance();
    sphericalHarmonics.convertIrradianceToLambertianRadiance();
    return SphericalPolynomial.FromHarmonics(sphericalHarmonics);
  }
};
CubeMapToSphericalPolynomialTools._FileFaces = [
  new FileFaceOrientation("right", new Vector3(1, 0, 0), new Vector3(0, 0, -1), new Vector3(0, -1, 0)),
  // +X east
  new FileFaceOrientation("left", new Vector3(-1, 0, 0), new Vector3(0, 0, 1), new Vector3(0, -1, 0)),
  // -X west
  new FileFaceOrientation("up", new Vector3(0, 1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, 1)),
  // +Y north
  new FileFaceOrientation("down", new Vector3(0, -1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, -1)),
  // -Y south
  new FileFaceOrientation("front", new Vector3(0, 0, 1), new Vector3(1, 0, 0), new Vector3(0, -1, 0)),
  // +Z top
  new FileFaceOrientation("back", new Vector3(0, 0, -1), new Vector3(-1, 0, 0), new Vector3(0, -1, 0))
  // -Z bottom
];
CubeMapToSphericalPolynomialTools.MAX_HDRI_VALUE = 4096;
CubeMapToSphericalPolynomialTools.PRESERVE_CLAMPED_COLORS = false;

// node_modules/@babylonjs/core/PostProcesses/thinPassPostProcess.js
var ThinPassPostProcess = class _ThinPassPostProcess extends EffectWrapper {
  _gatherImports(useWebGPU, list) {
    if (useWebGPU) {
      this._webGPUReady = true;
      list.push(Promise.all([import("./pass.fragment-II5LJKLQ.js")]));
    } else {
      list.push(Promise.all([import("./pass.fragment-TUN7DJIZ.js")]));
    }
    super._gatherImports(useWebGPU, list);
  }
  /**
   * Constructs a new pass post process
   * @param name Name of the effect
   * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
   * @param options Options to configure the effect
   */
  constructor(name, engine = null, options) {
    super({
      ...options,
      name,
      engine: engine || Engine.LastCreatedEngine,
      useShaderStore: true,
      useAsPostProcess: true,
      fragmentShader: _ThinPassPostProcess.FragmentUrl
    });
  }
};
ThinPassPostProcess.FragmentUrl = "pass";
var ThinPassCubePostProcess = class _ThinPassCubePostProcess extends EffectWrapper {
  _gatherImports(useWebGPU, list) {
    if (useWebGPU) {
      this._webGPUReady = true;
      list.push(Promise.all([import("./passCube.fragment-2ZQ52LZV.js")]));
    } else {
      list.push(Promise.all([import("./passCube.fragment-LRO3VWLP.js")]));
    }
    super._gatherImports(useWebGPU, list);
  }
  /**
   * Creates the PassCubePostProcess
   * @param name Name of the effect
   * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
   * @param options Options to configure the effect
   */
  constructor(name, engine = null, options) {
    super({
      ...options,
      name,
      engine: engine || Engine.LastCreatedEngine,
      useShaderStore: true,
      useAsPostProcess: true,
      fragmentShader: _ThinPassCubePostProcess.FragmentUrl,
      defines: "#define POSITIVEX"
    });
    this._face = 0;
  }
  /**
   * Gets or sets the cube face to display.
   *  * 0 is +X
   *  * 1 is -X
   *  * 2 is +Y
   *  * 3 is -Y
   *  * 4 is +Z
   *  * 5 is -Z
   */
  get face() {
    return this._face;
  }
  set face(value) {
    if (value < 0 || value > 5) {
      return;
    }
    this._face = value;
    switch (this._face) {
      case 0:
        this.updateEffect("#define POSITIVEX");
        break;
      case 1:
        this.updateEffect("#define NEGATIVEX");
        break;
      case 2:
        this.updateEffect("#define POSITIVEY");
        break;
      case 3:
        this.updateEffect("#define NEGATIVEY");
        break;
      case 4:
        this.updateEffect("#define POSITIVEZ");
        break;
      case 5:
        this.updateEffect("#define NEGATIVEZ");
        break;
    }
  }
};
ThinPassCubePostProcess.FragmentUrl = "passCube";

// node_modules/@babylonjs/core/PostProcesses/passPostProcess.js
var PassPostProcess = class _PassPostProcess extends PostProcess {
  /**
   * Gets a string identifying the name of the class
   * @returns "PassPostProcess" string
   */
  getClassName() {
    return "PassPostProcess";
  }
  /**
   * Creates the PassPostProcess
   * @param name The name of the effect.
   * @param options The required width/height ratio to downsize to before computing the render pass.
   * @param camera The camera to apply the render pass to.
   * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
   * @param engine The engine which the post process will be applied. (default: current engine)
   * @param reusable If the post process can be reused on the same frame. (default: false)
   * @param textureType The type of texture to be used when performing the post processing.
   * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
   */
  constructor(name, options, camera = null, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
    const localOptions = {
      size: typeof options === "number" ? options : void 0,
      camera,
      samplingMode,
      engine,
      reusable,
      textureType,
      blockCompilation,
      ...options
    };
    super(name, ThinPassPostProcess.FragmentUrl, {
      effectWrapper: typeof options === "number" || !options.effectWrapper ? new ThinPassPostProcess(name, engine, localOptions) : void 0,
      ...localOptions
    });
  }
  /**
   * @internal
   */
  static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
    return SerializationHelper.Parse(() => {
      return new _PassPostProcess(parsedPostProcess.name, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess._engine, parsedPostProcess.reusable);
    }, parsedPostProcess, scene, rootUrl);
  }
};
RegisterClass("BABYLON.PassPostProcess", PassPostProcess);
var PassCubePostProcess = class _PassCubePostProcess extends PostProcess {
  /**
   * Gets or sets the cube face to display.
   *  * 0 is +X
   *  * 1 is -X
   *  * 2 is +Y
   *  * 3 is -Y
   *  * 4 is +Z
   *  * 5 is -Z
   */
  get face() {
    return this._effectWrapper.face;
  }
  set face(value) {
    this._effectWrapper.face = value;
  }
  /**
   * Gets a string identifying the name of the class
   * @returns "PassCubePostProcess" string
   */
  getClassName() {
    return "PassCubePostProcess";
  }
  /**
   * Creates the PassCubePostProcess
   * @param name The name of the effect.
   * @param options The required width/height ratio to downsize to before computing the render pass.
   * @param camera The camera to apply the render pass to.
   * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
   * @param engine The engine which the post process will be applied. (default: current engine)
   * @param reusable If the post process can be reused on the same frame. (default: false)
   * @param textureType The type of texture to be used when performing the post processing.
   * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
   */
  constructor(name, options, camera = null, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
    const localOptions = {
      size: typeof options === "number" ? options : void 0,
      camera,
      samplingMode,
      engine,
      reusable,
      textureType,
      blockCompilation,
      ...options
    };
    super(name, ThinPassPostProcess.FragmentUrl, {
      effectWrapper: typeof options === "number" || !options.effectWrapper ? new ThinPassCubePostProcess(name, engine, localOptions) : void 0,
      ...localOptions
    });
  }
  /**
   * @internal
   */
  static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
    return SerializationHelper.Parse(() => {
      return new _PassCubePostProcess(parsedPostProcess.name, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess._engine, parsedPostProcess.reusable);
    }, parsedPostProcess, scene, rootUrl);
  }
};
__decorate([
  serialize()
], PassCubePostProcess.prototype, "face", null);
AbstractEngine._RescalePostProcessFactory = (engine) => {
  return new PassPostProcess("rescale", 1, null, 2, engine, false, 0);
};

// node_modules/@babylonjs/core/Misc/textureTools.js
var floatView;
var int32View;
function ToHalfFloat(value) {
  if (!floatView) {
    floatView = new Float32Array(1);
    int32View = new Int32Array(floatView.buffer);
  }
  floatView[0] = value;
  const x = int32View[0];
  let bits = x >> 16 & 32768;
  let m = x >> 12 & 2047;
  const e = x >> 23 & 255;
  if (e < 103) {
    return bits;
  }
  if (e > 142) {
    bits |= 31744;
    bits |= (e == 255 ? 0 : 1) && x & 8388607;
    return bits;
  }
  if (e < 113) {
    m |= 2048;
    bits |= (m >> 114 - e) + (m >> 113 - e & 1);
    return bits;
  }
  bits |= e - 112 << 10 | m >> 1;
  bits += m & 1;
  return bits;
}
function FromHalfFloat(value) {
  const s = (value & 32768) >> 15;
  const e = (value & 31744) >> 10;
  const f = value & 1023;
  if (e === 0) {
    return (s ? -1 : 1) * Math.pow(2, -14) * (f / Math.pow(2, 10));
  } else if (e == 31) {
    return f ? NaN : (s ? -1 : 1) * Infinity;
  }
  return (s ? -1 : 1) * Math.pow(2, e - 15) * (1 + f / Math.pow(2, 10));
}

export {
  CubeMapToSphericalPolynomialTools,
  ToHalfFloat,
  FromHalfFloat
};
//# sourceMappingURL=chunk-J4YISJJI.js.map
