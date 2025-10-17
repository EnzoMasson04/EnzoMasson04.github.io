import {
  ObjectRenderer,
  PostProcess,
  RenderTargetTexture
} from "./chunk-PKTWLCMT.js";
import {
  EffectWrapper
} from "./chunk-3Z776HTZ.js";
import "./chunk-LUCTKE24.js";
import {
  EffectFallbacks
} from "./chunk-6E4JMI5F.js";
import {
  Scene
} from "./chunk-3RLAZYYX.js";
import "./chunk-Z4VNN5BC.js";
import {
  Camera
} from "./chunk-L3I5JPWZ.js";
import "./chunk-CTKWF4NM.js";
import "./chunk-TYU74FDJ.js";
import {
  BindMorphTargetParameters,
  Material,
  PrepareDefinesAndAttributesForMorphTargets,
  PushAttributesForInstances,
  addClipPlaneUniforms,
  bindClipPlane,
  prepareStringDefinesForClipPlanes
} from "./chunk-5RWR7C5P.js";
import {
  Texture
} from "./chunk-YB2OV3US.js";
import {
  DrawWrapper
} from "./chunk-2YRX745D.js";
import {
  SceneComponentConstants
} from "./chunk-OR4V6S2U.js";
import {
  VertexBuffer
} from "./chunk-JYV5EUUU.js";
import "./chunk-DAQCNZDC.js";
import "./chunk-WZM6GV37.js";
import "./chunk-HI5D57IO.js";
import {
  Tools
} from "./chunk-S7FLS6J4.js";
import "./chunk-VLQF4VVG.js";
import {
  Engine
} from "./chunk-3IZN45W4.js";
import "./chunk-NBZIJBQN.js";
import "./chunk-2SNQ3HEF.js";
import "./chunk-ESZPSMLU.js";
import "./chunk-QXJOWFYZ.js";
import "./chunk-2ROLPC73.js";
import "./chunk-56R6SLXN.js";
import "./chunk-XPCOJVRL.js";
import "./chunk-IIRLJDXL.js";
import "./chunk-M6X33RZV.js";
import {
  SerializationHelper,
  __decorate,
  serialize,
  serializeAsCameraReference,
  serializeAsColor4,
  serializeAsVector2
} from "./chunk-SVMC4EBE.js";
import "./chunk-PIASBTZO.js";
import {
  Vector2
} from "./chunk-NSAPKY2D.js";
import {
  GetExponentOfTwo,
  _WarnImport
} from "./chunk-WEEGRZSP.js";
import "./chunk-U2ZTKOT3.js";
import {
  EngineStore,
  Observable
} from "./chunk-XPTICEO2.js";
import "./chunk-SEACPUNZ.js";
import {
  Color4
} from "./chunk-5AJSY7TL.js";
import "./chunk-EFRFZ7OU.js";
import {
  RegisterClass
} from "./chunk-P24HYHXQ.js";
import "./chunk-DSTTD374.js";

// node_modules/@babylonjs/core/PostProcesses/thinBlurPostProcess.js
var ThinBlurPostProcess = class _ThinBlurPostProcess extends EffectWrapper {
  _gatherImports(useWebGPU, list) {
    if (useWebGPU) {
      this._webGPUReady = true;
      list.push(Promise.all([import("./kernelBlur.fragment-XO6COEWG.js"), import("./kernelBlur.vertex-SOZIUMQM.js")]));
    } else {
      list.push(Promise.all([import("./kernelBlur.fragment-R6S7P2FD.js"), import("./kernelBlur.vertex-NBUXWCZK.js")]));
    }
  }
  /**
   * Constructs a new blur post process
   * @param name Name of the effect
   * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
   * @param direction Direction in which to apply the blur
   * @param kernel Kernel size of the blur
   * @param options Options to configure the effect
   */
  constructor(name, engine = null, direction, kernel, options) {
    const blockCompilationFinal = !!(options == null ? void 0 : options.blockCompilation);
    super({
      ...options,
      name,
      engine: engine || Engine.LastCreatedEngine,
      useShaderStore: true,
      useAsPostProcess: true,
      fragmentShader: _ThinBlurPostProcess.FragmentUrl,
      uniforms: _ThinBlurPostProcess.Uniforms,
      samplers: _ThinBlurPostProcess.Samplers,
      vertexUrl: _ThinBlurPostProcess.VertexUrl,
      blockCompilation: true
    });
    this._packedFloat = false;
    this._staticDefines = "";
    this.textureWidth = 0;
    this.textureHeight = 0;
    this.options.blockCompilation = blockCompilationFinal;
    if (direction !== void 0) {
      this.direction = direction;
    }
    if (kernel !== void 0) {
      this.kernel = kernel;
    }
  }
  /**
   * Sets the length in pixels of the blur sample region
   */
  set kernel(v) {
    if (this._idealKernel === v) {
      return;
    }
    v = Math.max(v, 1);
    this._idealKernel = v;
    this._kernel = this._nearestBestKernel(v);
    if (!this.options.blockCompilation) {
      this._updateParameters();
    }
  }
  /**
   * Gets the length in pixels of the blur sample region
   */
  get kernel() {
    return this._idealKernel;
  }
  /**
   * Sets whether or not the blur needs to unpack/repack floats
   */
  set packedFloat(v) {
    if (this._packedFloat === v) {
      return;
    }
    this._packedFloat = v;
    if (!this.options.blockCompilation) {
      this._updateParameters();
    }
  }
  /**
   * Gets whether or not the blur is unpacking/repacking floats
   */
  get packedFloat() {
    return this._packedFloat;
  }
  bind() {
    super.bind();
    this._drawWrapper.effect.setFloat2("delta", 1 / this.textureWidth * this.direction.x, 1 / this.textureHeight * this.direction.y);
  }
  /** @internal */
  _updateParameters(onCompiled, onError) {
    const N = this._kernel;
    const centerIndex = (N - 1) / 2;
    let offsets = [];
    let weights = [];
    let totalWeight = 0;
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      const w = this._gaussianWeight(u * 2 - 1);
      offsets[i] = i - centerIndex;
      weights[i] = w;
      totalWeight += w;
    }
    for (let i = 0; i < weights.length; i++) {
      weights[i] /= totalWeight;
    }
    const linearSamplingWeights = [];
    const linearSamplingOffsets = [];
    const linearSamplingMap = [];
    for (let i = 0; i <= centerIndex; i += 2) {
      const j = Math.min(i + 1, Math.floor(centerIndex));
      const singleCenterSample = i === j;
      if (singleCenterSample) {
        linearSamplingMap.push({ o: offsets[i], w: weights[i] });
      } else {
        const sharedCell = j === centerIndex;
        const weightLinear = weights[i] + weights[j] * (sharedCell ? 0.5 : 1);
        const offsetLinear = offsets[i] + 1 / (1 + weights[i] / weights[j]);
        if (offsetLinear === 0) {
          linearSamplingMap.push({ o: offsets[i], w: weights[i] });
          linearSamplingMap.push({ o: offsets[i + 1], w: weights[i + 1] });
        } else {
          linearSamplingMap.push({ o: offsetLinear, w: weightLinear });
          linearSamplingMap.push({ o: -offsetLinear, w: weightLinear });
        }
      }
    }
    for (let i = 0; i < linearSamplingMap.length; i++) {
      linearSamplingOffsets[i] = linearSamplingMap[i].o;
      linearSamplingWeights[i] = linearSamplingMap[i].w;
    }
    offsets = linearSamplingOffsets;
    weights = linearSamplingWeights;
    const maxVaryingRows = this.options.engine.getCaps().maxVaryingVectors - (this.options.shaderLanguage === 1 ? 1 : 0);
    const freeVaryingVec2 = Math.max(maxVaryingRows, 0) - 1;
    let varyingCount = Math.min(offsets.length, freeVaryingVec2);
    let defines = "";
    defines += this._staticDefines;
    if (this._staticDefines.indexOf("DOF") != -1) {
      defines += `#define CENTER_WEIGHT ${this._glslFloat(weights[varyingCount - 1])}
`;
      varyingCount--;
    }
    for (let i = 0; i < varyingCount; i++) {
      defines += `#define KERNEL_OFFSET${i} ${this._glslFloat(offsets[i])}
`;
      defines += `#define KERNEL_WEIGHT${i} ${this._glslFloat(weights[i])}
`;
    }
    let depCount = 0;
    for (let i = freeVaryingVec2; i < offsets.length; i++) {
      defines += `#define KERNEL_DEP_OFFSET${depCount} ${this._glslFloat(offsets[i])}
`;
      defines += `#define KERNEL_DEP_WEIGHT${depCount} ${this._glslFloat(weights[i])}
`;
      depCount++;
    }
    if (this.packedFloat) {
      defines += `#define PACKEDFLOAT 1`;
    }
    this.options.blockCompilation = false;
    this.updateEffect(defines, null, null, {
      varyingCount,
      depCount
    }, onCompiled, onError);
  }
  /**
   * Best kernels are odd numbers that when divided by 2, their integer part is even, so 5, 9 or 13.
   * Other odd kernels optimize correctly but require proportionally more samples, even kernels are
   * possible but will produce minor visual artifacts. Since each new kernel requires a new shader we
   * want to minimize kernel changes, having gaps between physical kernels is helpful in that regard.
   * The gaps between physical kernels are compensated for in the weighting of the samples
   * @param idealKernel Ideal blur kernel.
   * @returns Nearest best kernel.
   */
  _nearestBestKernel(idealKernel) {
    const v = Math.round(idealKernel);
    for (const k of [v, v - 1, v + 1, v - 2, v + 2]) {
      if (k % 2 !== 0 && Math.floor(k / 2) % 2 === 0 && k > 0) {
        return Math.max(k, 3);
      }
    }
    return Math.max(v, 3);
  }
  /**
   * Calculates the value of a Gaussian distribution with sigma 3 at a given point.
   * @param x The point on the Gaussian distribution to sample.
   * @returns the value of the Gaussian function at x.
   */
  _gaussianWeight(x) {
    const sigma = 1 / 3;
    const denominator = Math.sqrt(2 * Math.PI) * sigma;
    const exponent = -(x * x / (2 * sigma * sigma));
    const weight = 1 / denominator * Math.exp(exponent);
    return weight;
  }
  /**
   * Generates a string that can be used as a floating point number in GLSL.
   * @param x Value to print.
   * @param decimalFigures Number of decimal places to print the number to (excluding trailing 0s).
   * @returns GLSL float string.
   */
  _glslFloat(x, decimalFigures = 8) {
    return x.toFixed(decimalFigures).replace(/0+$/, "");
  }
};
ThinBlurPostProcess.VertexUrl = "kernelBlur";
ThinBlurPostProcess.FragmentUrl = "kernelBlur";
ThinBlurPostProcess.Uniforms = ["delta", "direction"];
ThinBlurPostProcess.Samplers = ["circleOfConfusionSampler"];

// node_modules/@babylonjs/core/PostProcesses/blurPostProcess.js
var BlurPostProcess = class _BlurPostProcess extends PostProcess {
  /** The direction in which to blur the image. */
  get direction() {
    return this._effectWrapper.direction;
  }
  set direction(value) {
    this._effectWrapper.direction = value;
  }
  /**
   * Sets the length in pixels of the blur sample region
   */
  set kernel(v) {
    this._effectWrapper.kernel = v;
  }
  /**
   * Gets the length in pixels of the blur sample region
   */
  get kernel() {
    return this._effectWrapper.kernel;
  }
  /**
   * Sets whether or not the blur needs to unpack/repack floats
   */
  set packedFloat(v) {
    this._effectWrapper.packedFloat = v;
  }
  /**
   * Gets whether or not the blur is unpacking/repacking floats
   */
  get packedFloat() {
    return this._effectWrapper.packedFloat;
  }
  /**
   * Gets a string identifying the name of the class
   * @returns "BlurPostProcess" string
   */
  getClassName() {
    return "BlurPostProcess";
  }
  /**
   * Creates a new instance BlurPostProcess
   * @param name The name of the effect.
   * @param direction The direction in which to blur the image.
   * @param kernel The size of the kernel to be used when computing the blur. eg. Size of 3 will blur the center pixel by 2 pixels surrounding it.
   * @param options The required width/height ratio to downsize to before computing the render pass. (Use 1.0 for full size)
   * @param camera The camera to apply the render pass to.
   * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
   * @param engine The engine which the post process will be applied. (default: current engine)
   * @param reusable If the post process can be reused on the same frame. (default: false)
   * @param textureType Type of textures used when performing the post process. (default: 0)
   * @param defines
   * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
   * @param textureFormat Format of textures used when performing the post process. (default: TEXTUREFORMAT_RGBA)
   */
  constructor(name, direction, kernel, options, camera = null, samplingMode = Texture.BILINEAR_SAMPLINGMODE, engine, reusable, textureType = 0, defines = "", blockCompilation = false, textureFormat = 5) {
    const blockCompilationFinal = typeof options === "number" ? blockCompilation : !!options.blockCompilation;
    const localOptions = {
      uniforms: ThinBlurPostProcess.Uniforms,
      samplers: ThinBlurPostProcess.Samplers,
      size: typeof options === "number" ? options : void 0,
      camera,
      samplingMode,
      engine,
      reusable,
      textureType,
      vertexUrl: ThinBlurPostProcess.VertexUrl,
      indexParameters: { varyingCount: 0, depCount: 0 },
      textureFormat,
      defines,
      ...options,
      blockCompilation: true
    };
    super(name, ThinBlurPostProcess.FragmentUrl, {
      effectWrapper: typeof options === "number" || !options.effectWrapper ? new ThinBlurPostProcess(name, engine, void 0, void 0, localOptions) : void 0,
      ...localOptions
    });
    this._effectWrapper.options.blockCompilation = blockCompilationFinal;
    this.direction = direction;
    this.onApplyObservable.add(() => {
      this._effectWrapper.textureWidth = this._outputTexture ? this._outputTexture.width : this.width;
      this._effectWrapper.textureHeight = this._outputTexture ? this._outputTexture.height : this.height;
    });
    this.kernel = kernel;
  }
  updateEffect(_defines = null, _uniforms = null, _samplers = null, _indexParameters, onCompiled, onError) {
    this._effectWrapper._updateParameters(onCompiled, onError);
  }
  /**
   * @internal
   */
  static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
    return SerializationHelper.Parse(() => {
      return new _BlurPostProcess(parsedPostProcess.name, parsedPostProcess.direction, parsedPostProcess.kernel, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, scene.getEngine(), parsedPostProcess.reusable, parsedPostProcess.textureType, void 0, false);
    }, parsedPostProcess, scene, rootUrl);
  }
};
__decorate([
  serializeAsVector2()
], BlurPostProcess.prototype, "direction", null);
__decorate([
  serialize()
], BlurPostProcess.prototype, "kernel", null);
__decorate([
  serialize()
], BlurPostProcess.prototype, "packedFloat", null);
RegisterClass("BABYLON.BlurPostProcess", BlurPostProcess);

// node_modules/@babylonjs/core/Layers/thinEffectLayer.js
var ThinGlowBlurPostProcess = class _ThinGlowBlurPostProcess extends EffectWrapper {
  constructor(name, engine = null, direction, kernel, options) {
    super({
      ...options,
      name,
      engine: engine || Engine.LastCreatedEngine,
      useShaderStore: true,
      useAsPostProcess: true,
      fragmentShader: _ThinGlowBlurPostProcess.FragmentUrl,
      uniforms: _ThinGlowBlurPostProcess.Uniforms
    });
    this.direction = direction;
    this.kernel = kernel;
    this.textureWidth = 0;
    this.textureHeight = 0;
  }
  _gatherImports(useWebGPU, list) {
    if (useWebGPU) {
      this._webGPUReady = true;
      list.push(import("./glowBlurPostProcess.fragment-SVFRMKHB.js"));
    } else {
      list.push(import("./glowBlurPostProcess.fragment-CWBFFUSL.js"));
    }
    super._gatherImports(useWebGPU, list);
  }
  bind() {
    super.bind();
    this._drawWrapper.effect.setFloat2("screenSize", this.textureWidth, this.textureHeight);
    this._drawWrapper.effect.setVector2("direction", this.direction);
    this._drawWrapper.effect.setFloat("blurWidth", this.kernel);
  }
};
ThinGlowBlurPostProcess.FragmentUrl = "glowBlurPostProcess";
ThinGlowBlurPostProcess.Uniforms = ["screenSize", "direction", "blurWidth"];
var ThinEffectLayer = class _ThinEffectLayer {
  /**
   * Gets/sets the camera attached to the layer.
   */
  get camera() {
    return this._options.camera;
  }
  set camera(camera) {
    this._options.camera = camera;
  }
  /**
   * Gets the rendering group id the layer should render in.
   */
  get renderingGroupId() {
    return this._options.renderingGroupId;
  }
  set renderingGroupId(renderingGroupId) {
    this._options.renderingGroupId = renderingGroupId;
  }
  /**
   * Gets the object renderer used to render objects in the layer
   */
  get objectRenderer() {
    return this._objectRenderer;
  }
  /**
   * Gets the shader language used in this material.
   */
  get shaderLanguage() {
    return this._shaderLanguage;
  }
  /**
   * Sets a specific material to be used to render a mesh/a list of meshes in the layer
   * @param mesh mesh or array of meshes
   * @param material material to use by the layer when rendering the mesh(es). If undefined is passed, the specific material created by the layer will be used.
   */
  setMaterialForRendering(mesh, material) {
    this._objectRenderer.setMaterialForRendering(mesh, material);
    if (Array.isArray(mesh)) {
      for (let i = 0; i < mesh.length; ++i) {
        const currentMesh = mesh[i];
        if (!material) {
          delete this._materialForRendering[currentMesh.uniqueId];
        } else {
          this._materialForRendering[currentMesh.uniqueId] = [currentMesh, material];
        }
      }
    } else {
      if (!material) {
        delete this._materialForRendering[mesh.uniqueId];
      } else {
        this._materialForRendering[mesh.uniqueId] = [mesh, material];
      }
    }
  }
  /**
   * Gets the intensity of the effect for a specific mesh.
   * @param mesh The mesh to get the effect intensity for
   * @returns The intensity of the effect for the mesh
   */
  getEffectIntensity(mesh) {
    return this._effectIntensity[mesh.uniqueId] ?? 1;
  }
  /**
   * Sets the intensity of the effect for a specific mesh.
   * @param mesh The mesh to set the effect intensity for
   * @param intensity The intensity of the effect for the mesh
   */
  setEffectIntensity(mesh, intensity) {
    this._effectIntensity[mesh.uniqueId] = intensity;
  }
  /**
   * Instantiates a new effect Layer
   * @param name The name of the layer
   * @param scene The scene to use the layer in
   * @param forceGLSL Use the GLSL code generation for the shader (even on WebGPU). Default is false
   * @param dontCheckIfReady Specifies if the layer should disable checking whether all the post processes are ready (default: false). To save performance, this should be set to true and you should call `isReady` manually before rendering to the layer.
   * @param _additionalImportShadersAsync Additional shaders to import when the layer is created
   */
  constructor(name, scene, forceGLSL = false, dontCheckIfReady = false, _additionalImportShadersAsync) {
    this._additionalImportShadersAsync = _additionalImportShadersAsync;
    this._vertexBuffers = {};
    this._dontCheckIfReady = false;
    this._shouldRender = true;
    this._emissiveTextureAndColor = { texture: null, color: new Color4() };
    this._effectIntensity = {};
    this._postProcesses = [];
    this.neutralColor = new Color4();
    this.isEnabled = true;
    this.disableBoundingBoxesFromEffectLayer = false;
    this.onDisposeObservable = new Observable();
    this.onBeforeRenderLayerObservable = new Observable();
    this.onBeforeComposeObservable = new Observable();
    this.onBeforeRenderMeshToEffect = new Observable();
    this.onAfterRenderMeshToEffect = new Observable();
    this.onAfterComposeObservable = new Observable();
    this.onBeforeBlurObservable = new Observable();
    this.onAfterBlurObservable = new Observable();
    this._shaderLanguage = 0;
    this._materialForRendering = {};
    this._shadersLoaded = false;
    this.name = name;
    this._scene = scene || EngineStore.LastCreatedScene;
    this._dontCheckIfReady = dontCheckIfReady;
    const engine = this._scene.getEngine();
    if (engine.isWebGPU && !forceGLSL && !_ThinEffectLayer.ForceGLSL) {
      this._shaderLanguage = 1;
    }
    this._engine = this._scene.getEngine();
    this._mergeDrawWrapper = [];
    this._generateIndexBuffer();
    this._generateVertexBuffer();
  }
  /**
   * Get the effect name of the layer.
   * @returns The effect name
   */
  getEffectName() {
    return "";
  }
  /**
   * Checks for the readiness of the element composing the layer.
   * @param _subMesh the mesh to check for
   * @param _useInstances specify whether or not to use instances to render the mesh
   * @returns true if ready otherwise, false
   */
  isReady(_subMesh, _useInstances) {
    return true;
  }
  /**
   * Returns whether or not the layer needs stencil enabled during the mesh rendering.
   * @returns true if the effect requires stencil during the main canvas render pass.
   */
  needStencil() {
    return false;
  }
  /** @internal */
  _createMergeEffect() {
    throw new Error("Effect Layer: no merge effect defined");
  }
  /** @internal */
  _createTextureAndPostProcesses() {
  }
  /** @internal */
  _internalCompose(_effect, _renderIndex) {
  }
  /** @internal */
  _setEmissiveTextureAndColor(_mesh, _subMesh, _material) {
  }
  /** @internal */
  _numInternalDraws() {
    return 1;
  }
  /** @internal */
  _init(options) {
    this._options = {
      mainTextureRatio: 0.5,
      mainTextureFixedSize: 0,
      mainTextureType: 0,
      alphaBlendingMode: 2,
      camera: null,
      renderingGroupId: -1,
      ...options
    };
    this._createObjectRenderer();
  }
  _generateIndexBuffer() {
    const indices = [];
    indices.push(0);
    indices.push(1);
    indices.push(2);
    indices.push(0);
    indices.push(2);
    indices.push(3);
    this._indexBuffer = this._engine.createIndexBuffer(indices);
  }
  _generateVertexBuffer() {
    const vertices = [];
    vertices.push(1, 1);
    vertices.push(-1, 1);
    vertices.push(-1, -1);
    vertices.push(1, -1);
    const vertexBuffer = new VertexBuffer(this._engine, vertices, VertexBuffer.PositionKind, false, false, 2);
    this._vertexBuffers[VertexBuffer.PositionKind] = vertexBuffer;
  }
  _createObjectRenderer() {
    this._objectRenderer = new ObjectRenderer(`ObjectRenderer for thin effect layer ${this.name}`, this._scene, {
      doNotChangeAspectRatio: true
    });
    this._objectRenderer.activeCamera = this._options.camera;
    this._objectRenderer.renderParticles = false;
    this._objectRenderer.renderList = null;
    const hasBoundingBoxRenderer = !!this._scene.getBoundingBoxRenderer;
    let boundingBoxRendererEnabled = false;
    if (hasBoundingBoxRenderer) {
      this._objectRenderer.onBeforeRenderObservable.add(() => {
        boundingBoxRendererEnabled = this._scene.getBoundingBoxRenderer().enabled;
        this._scene.getBoundingBoxRenderer().enabled = !this.disableBoundingBoxesFromEffectLayer && boundingBoxRendererEnabled;
      });
      this._objectRenderer.onAfterRenderObservable.add(() => {
        this._scene.getBoundingBoxRenderer().enabled = boundingBoxRendererEnabled;
      });
    }
    this._objectRenderer.customIsReadyFunction = (mesh, refreshRate, preWarm) => {
      if ((preWarm || refreshRate === 0) && mesh.subMeshes) {
        for (let i = 0; i < mesh.subMeshes.length; ++i) {
          const subMesh = mesh.subMeshes[i];
          const material = subMesh.getMaterial();
          const renderingMesh = subMesh.getRenderingMesh();
          if (!material) {
            continue;
          }
          const batch = renderingMesh._getInstancesRenderList(subMesh._id, !!subMesh.getReplacementMesh());
          const hardwareInstancedRendering = batch.hardwareInstancedRendering[subMesh._id] || renderingMesh.hasThinInstances;
          this._setEmissiveTextureAndColor(renderingMesh, subMesh, material);
          if (!this._isSubMeshReady(subMesh, hardwareInstancedRendering, this._emissiveTextureAndColor.texture)) {
            return false;
          }
        }
      }
      return true;
    };
    this._objectRenderer.customRenderFunction = (opaqueSubMeshes, alphaTestSubMeshes, transparentSubMeshes, depthOnlySubMeshes) => {
      this.onBeforeRenderLayerObservable.notifyObservers(this);
      let index;
      const engine = this._scene.getEngine();
      if (depthOnlySubMeshes.length) {
        engine.setColorWrite(false);
        for (index = 0; index < depthOnlySubMeshes.length; index++) {
          this._renderSubMesh(depthOnlySubMeshes.data[index]);
        }
        engine.setColorWrite(true);
      }
      for (index = 0; index < opaqueSubMeshes.length; index++) {
        this._renderSubMesh(opaqueSubMeshes.data[index]);
      }
      for (index = 0; index < alphaTestSubMeshes.length; index++) {
        this._renderSubMesh(alphaTestSubMeshes.data[index]);
      }
      const previousAlphaMode = engine.getAlphaMode();
      for (index = 0; index < transparentSubMeshes.length; index++) {
        const subMesh = transparentSubMeshes.data[index];
        const material = subMesh.getMaterial();
        if (material && material.needDepthPrePass) {
          const engine2 = material.getScene().getEngine();
          engine2.setColorWrite(false);
          this._renderSubMesh(subMesh);
          engine2.setColorWrite(true);
        }
        this._renderSubMesh(subMesh, true);
      }
      engine.setAlphaMode(previousAlphaMode);
    };
  }
  /** @internal */
  _addCustomEffectDefines(_defines) {
  }
  /** @internal */
  _internalIsSubMeshReady(subMesh, useInstances, emissiveTexture) {
    var _a;
    const engine = this._scene.getEngine();
    const mesh = subMesh.getMesh();
    const renderingMaterial = (_a = mesh._internalAbstractMeshDataInfo._materialForRenderPass) == null ? void 0 : _a[engine.currentRenderPassId];
    if (renderingMaterial) {
      return renderingMaterial.isReadyForSubMesh(mesh, subMesh, useInstances);
    }
    const material = subMesh.getMaterial();
    if (!material) {
      return false;
    }
    if (this._useMeshMaterial(subMesh.getRenderingMesh())) {
      return material.isReadyForSubMesh(subMesh.getMesh(), subMesh, useInstances);
    }
    const defines = [];
    const attribs = [VertexBuffer.PositionKind];
    let uv1 = false;
    let uv2 = false;
    const color = false;
    if (material) {
      const needAlphaTest = material.needAlphaTestingForMesh(mesh);
      const diffuseTexture = material.getAlphaTestTexture();
      const needAlphaBlendFromDiffuse = diffuseTexture && diffuseTexture.hasAlpha && (material.useAlphaFromDiffuseTexture || material._useAlphaFromAlbedoTexture);
      if (diffuseTexture && (needAlphaTest || needAlphaBlendFromDiffuse)) {
        defines.push("#define DIFFUSE");
        if (mesh.isVerticesDataPresent(VertexBuffer.UV2Kind) && diffuseTexture.coordinatesIndex === 1) {
          defines.push("#define DIFFUSEUV2");
          uv2 = true;
        } else if (mesh.isVerticesDataPresent(VertexBuffer.UVKind)) {
          defines.push("#define DIFFUSEUV1");
          uv1 = true;
        }
        if (needAlphaTest) {
          defines.push("#define ALPHATEST");
          defines.push("#define ALPHATESTVALUE 0.4");
        }
        if (!diffuseTexture.gammaSpace) {
          defines.push("#define DIFFUSE_ISLINEAR");
        }
      }
      const opacityTexture = material.opacityTexture;
      if (opacityTexture) {
        defines.push("#define OPACITY");
        if (mesh.isVerticesDataPresent(VertexBuffer.UV2Kind) && opacityTexture.coordinatesIndex === 1) {
          defines.push("#define OPACITYUV2");
          uv2 = true;
        } else if (mesh.isVerticesDataPresent(VertexBuffer.UVKind)) {
          defines.push("#define OPACITYUV1");
          uv1 = true;
        }
      }
    }
    if (emissiveTexture) {
      defines.push("#define EMISSIVE");
      if (mesh.isVerticesDataPresent(VertexBuffer.UV2Kind) && emissiveTexture.coordinatesIndex === 1) {
        defines.push("#define EMISSIVEUV2");
        uv2 = true;
      } else if (mesh.isVerticesDataPresent(VertexBuffer.UVKind)) {
        defines.push("#define EMISSIVEUV1");
        uv1 = true;
      }
      if (!emissiveTexture.gammaSpace) {
        defines.push("#define EMISSIVE_ISLINEAR");
      }
    }
    if (mesh.useVertexColors && mesh.isVerticesDataPresent(VertexBuffer.ColorKind) && mesh.hasVertexAlpha && material.transparencyMode !== Material.MATERIAL_OPAQUE) {
      attribs.push(VertexBuffer.ColorKind);
      defines.push("#define VERTEXALPHA");
    }
    if (uv1) {
      attribs.push(VertexBuffer.UVKind);
      defines.push("#define UV1");
    }
    if (uv2) {
      attribs.push(VertexBuffer.UV2Kind);
      defines.push("#define UV2");
    }
    const fallbacks = new EffectFallbacks();
    if (mesh.useBones && mesh.computeBonesUsingShaders) {
      attribs.push(VertexBuffer.MatricesIndicesKind);
      attribs.push(VertexBuffer.MatricesWeightsKind);
      if (mesh.numBoneInfluencers > 4) {
        attribs.push(VertexBuffer.MatricesIndicesExtraKind);
        attribs.push(VertexBuffer.MatricesWeightsExtraKind);
      }
      defines.push("#define NUM_BONE_INFLUENCERS " + mesh.numBoneInfluencers);
      const skeleton = mesh.skeleton;
      if (skeleton && skeleton.isUsingTextureForMatrices) {
        defines.push("#define BONETEXTURE");
      } else {
        defines.push("#define BonesPerMesh " + (skeleton ? skeleton.bones.length + 1 : 0));
      }
      if (mesh.numBoneInfluencers > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }
    } else {
      defines.push("#define NUM_BONE_INFLUENCERS 0");
    }
    const numMorphInfluencers = mesh.morphTargetManager ? PrepareDefinesAndAttributesForMorphTargets(
      mesh.morphTargetManager,
      defines,
      attribs,
      mesh,
      true,
      // usePositionMorph
      false,
      // useNormalMorph
      false,
      // useTangentMorph
      uv1,
      // useUVMorph
      uv2,
      // useUV2Morph
      color
      // useColorMorph
    ) : 0;
    if (useInstances) {
      defines.push("#define INSTANCES");
      PushAttributesForInstances(attribs);
      if (subMesh.getRenderingMesh().hasThinInstances) {
        defines.push("#define THIN_INSTANCES");
      }
    }
    prepareStringDefinesForClipPlanes(material, this._scene, defines);
    this._addCustomEffectDefines(defines);
    const drawWrapper = subMesh._getDrawWrapper(void 0, true);
    const cachedDefines = drawWrapper.defines;
    const join = defines.join("\n");
    if (cachedDefines !== join) {
      const uniforms = [
        "world",
        "mBones",
        "viewProjection",
        "glowColor",
        "morphTargetInfluences",
        "morphTargetCount",
        "boneTextureWidth",
        "diffuseMatrix",
        "emissiveMatrix",
        "opacityMatrix",
        "opacityIntensity",
        "morphTargetTextureInfo",
        "morphTargetTextureIndices",
        "glowIntensity"
      ];
      addClipPlaneUniforms(uniforms);
      drawWrapper.setEffect(this._engine.createEffect("glowMapGeneration", attribs, uniforms, ["diffuseSampler", "emissiveSampler", "opacitySampler", "boneSampler", "morphTargets"], join, fallbacks, void 0, void 0, { maxSimultaneousMorphTargets: numMorphInfluencers }, this._shaderLanguage, this._shadersLoaded ? void 0 : async () => {
        await this._importShadersAsync();
        this._shadersLoaded = true;
      }), join);
    }
    const effectIsReady = drawWrapper.effect.isReady();
    return effectIsReady && (this._dontCheckIfReady || !this._dontCheckIfReady && this.isLayerReady());
  }
  /** @internal */
  _isSubMeshReady(subMesh, useInstances, emissiveTexture) {
    return this._internalIsSubMeshReady(subMesh, useInstances, emissiveTexture);
  }
  async _importShadersAsync() {
    var _a;
    if (this._shaderLanguage === 1) {
      await Promise.all([import("./glowMapGeneration.vertex-ELAW4OED.js"), import("./glowMapGeneration.fragment-7E5AO5PO.js")]);
    } else {
      await Promise.all([import("./glowMapGeneration.vertex-W7GBUFII.js"), import("./glowMapGeneration.fragment-BFYS4QXA.js")]);
    }
    (_a = this._additionalImportShadersAsync) == null ? void 0 : _a.call(this);
  }
  /** @internal */
  _internalIsLayerReady() {
    let isReady = true;
    for (let i = 0; i < this._postProcesses.length; i++) {
      isReady = this._postProcesses[i].isReady() && isReady;
    }
    const numDraws = this._numInternalDraws();
    for (let i = 0; i < numDraws; ++i) {
      let currentEffect = this._mergeDrawWrapper[i];
      if (!currentEffect) {
        currentEffect = this._mergeDrawWrapper[i] = new DrawWrapper(this._engine);
        currentEffect.setEffect(this._createMergeEffect());
      }
      isReady = currentEffect.effect.isReady() && isReady;
    }
    return isReady;
  }
  /**
   * Checks if the layer is ready to be used.
   * @returns true if the layer is ready to be used
   */
  isLayerReady() {
    return this._internalIsLayerReady();
  }
  /**
   * Renders the glowing part of the scene by blending the blurred glowing meshes on top of the rendered scene.
   * @returns true if the rendering was successful
   */
  compose() {
    if (!this._dontCheckIfReady && !this.isLayerReady()) {
      return false;
    }
    const engine = this._scene.getEngine();
    const numDraws = this._numInternalDraws();
    this.onBeforeComposeObservable.notifyObservers(this);
    const previousAlphaMode = engine.getAlphaMode();
    for (let i = 0; i < numDraws; ++i) {
      const currentEffect = this._mergeDrawWrapper[i];
      engine.enableEffect(currentEffect);
      engine.setState(false);
      engine.bindBuffers(this._vertexBuffers, this._indexBuffer, currentEffect.effect);
      engine.setAlphaMode(this._options.alphaBlendingMode);
      this._internalCompose(currentEffect.effect, i);
    }
    engine.setAlphaMode(previousAlphaMode);
    this.onAfterComposeObservable.notifyObservers(this);
    return true;
  }
  /** @internal */
  _internalHasMesh(mesh) {
    if (this.renderingGroupId === -1 || mesh.renderingGroupId === this.renderingGroupId) {
      return true;
    }
    return false;
  }
  /**
   * Determine if a given mesh will be used in the current effect.
   * @param mesh mesh to test
   * @returns true if the mesh will be used
   */
  hasMesh(mesh) {
    return this._internalHasMesh(mesh);
  }
  /** @internal */
  _internalShouldRender() {
    return this.isEnabled && this._shouldRender;
  }
  /**
   * Returns true if the layer contains information to display, otherwise false.
   * @returns true if the glow layer should be rendered
   */
  shouldRender() {
    return this._internalShouldRender();
  }
  /** @internal */
  _shouldRenderMesh(_mesh) {
    return true;
  }
  /** @internal */
  _internalCanRenderMesh(mesh, material) {
    return !material.needAlphaBlendingForMesh(mesh);
  }
  /** @internal */
  _canRenderMesh(mesh, material) {
    return this._internalCanRenderMesh(mesh, material);
  }
  _renderSubMesh(subMesh, enableAlphaMode = false) {
    var _a;
    if (!this._internalShouldRender()) {
      return;
    }
    const material = subMesh.getMaterial();
    const ownerMesh = subMesh.getMesh();
    const replacementMesh = subMesh.getReplacementMesh();
    const renderingMesh = subMesh.getRenderingMesh();
    const effectiveMesh = subMesh.getEffectiveMesh();
    const scene = this._scene;
    const engine = scene.getEngine();
    effectiveMesh._internalAbstractMeshDataInfo._isActiveIntermediate = false;
    if (!material) {
      return;
    }
    if (!this._canRenderMesh(renderingMesh, material)) {
      return;
    }
    let sideOrientation = material._getEffectiveOrientation(renderingMesh);
    const mainDeterminant = effectiveMesh._getWorldMatrixDeterminant();
    if (mainDeterminant < 0) {
      sideOrientation = sideOrientation === Material.ClockWiseSideOrientation ? Material.CounterClockWiseSideOrientation : Material.ClockWiseSideOrientation;
    }
    const reverse = sideOrientation === Material.ClockWiseSideOrientation;
    engine.setState(material.backFaceCulling, material.zOffset, void 0, reverse, material.cullBackFaces, void 0, material.zOffsetUnits);
    const batch = renderingMesh._getInstancesRenderList(subMesh._id, !!replacementMesh);
    if (batch.mustReturn) {
      return;
    }
    if (!this._shouldRenderMesh(renderingMesh)) {
      return;
    }
    const hardwareInstancedRendering = batch.hardwareInstancedRendering[subMesh._id] || renderingMesh.hasThinInstances;
    this._setEmissiveTextureAndColor(renderingMesh, subMesh, material);
    this.onBeforeRenderMeshToEffect.notifyObservers(ownerMesh);
    if (this._useMeshMaterial(renderingMesh)) {
      subMesh.getMaterial()._glowModeEnabled = true;
      renderingMesh.render(subMesh, enableAlphaMode, replacementMesh || void 0);
      subMesh.getMaterial()._glowModeEnabled = false;
    } else if (this._isSubMeshReady(subMesh, hardwareInstancedRendering, this._emissiveTextureAndColor.texture)) {
      const renderingMaterial = (_a = effectiveMesh._internalAbstractMeshDataInfo._materialForRenderPass) == null ? void 0 : _a[engine.currentRenderPassId];
      let drawWrapper = subMesh._getDrawWrapper();
      if (!drawWrapper && renderingMaterial) {
        drawWrapper = renderingMaterial._getDrawWrapper();
      }
      if (!drawWrapper) {
        return;
      }
      const effect = drawWrapper.effect;
      engine.enableEffect(drawWrapper);
      if (!hardwareInstancedRendering) {
        renderingMesh._bind(subMesh, effect, material.fillMode);
      }
      if (!renderingMaterial) {
        effect.setMatrix("viewProjection", scene.getTransformMatrix());
        effect.setMatrix("world", effectiveMesh.getWorldMatrix());
        effect.setFloat4("glowColor", this._emissiveTextureAndColor.color.r, this._emissiveTextureAndColor.color.g, this._emissiveTextureAndColor.color.b, this._emissiveTextureAndColor.color.a);
      } else {
        renderingMaterial.bindForSubMesh(effectiveMesh.getWorldMatrix(), effectiveMesh, subMesh);
      }
      if (!renderingMaterial) {
        const needAlphaTest = material.needAlphaTestingForMesh(effectiveMesh);
        const diffuseTexture = material.getAlphaTestTexture();
        const needAlphaBlendFromDiffuse = diffuseTexture && diffuseTexture.hasAlpha && (material.useAlphaFromDiffuseTexture || material._useAlphaFromAlbedoTexture);
        if (diffuseTexture && (needAlphaTest || needAlphaBlendFromDiffuse)) {
          effect.setTexture("diffuseSampler", diffuseTexture);
          const textureMatrix = diffuseTexture.getTextureMatrix();
          if (textureMatrix) {
            effect.setMatrix("diffuseMatrix", textureMatrix);
          }
        }
        const opacityTexture = material.opacityTexture;
        if (opacityTexture) {
          effect.setTexture("opacitySampler", opacityTexture);
          effect.setFloat("opacityIntensity", opacityTexture.level);
          const textureMatrix = opacityTexture.getTextureMatrix();
          if (textureMatrix) {
            effect.setMatrix("opacityMatrix", textureMatrix);
          }
        }
        if (this._emissiveTextureAndColor.texture) {
          effect.setTexture("emissiveSampler", this._emissiveTextureAndColor.texture);
          effect.setMatrix("emissiveMatrix", this._emissiveTextureAndColor.texture.getTextureMatrix());
        }
        if (renderingMesh.useBones && renderingMesh.computeBonesUsingShaders && renderingMesh.skeleton) {
          const skeleton = renderingMesh.skeleton;
          if (skeleton.isUsingTextureForMatrices) {
            const boneTexture = skeleton.getTransformMatrixTexture(renderingMesh);
            if (!boneTexture) {
              return;
            }
            effect.setTexture("boneSampler", boneTexture);
            effect.setFloat("boneTextureWidth", 4 * (skeleton.bones.length + 1));
          } else {
            effect.setMatrices("mBones", skeleton.getTransformMatrices(renderingMesh));
          }
        }
        BindMorphTargetParameters(renderingMesh, effect);
        if (renderingMesh.morphTargetManager && renderingMesh.morphTargetManager.isUsingTextureForTargets) {
          renderingMesh.morphTargetManager._bind(effect);
        }
        if (enableAlphaMode) {
          engine.setAlphaMode(material.alphaMode);
        }
        effect.setFloat("glowIntensity", this.getEffectIntensity(renderingMesh));
        bindClipPlane(effect, material, scene);
      }
      renderingMesh._processRendering(effectiveMesh, subMesh, effect, material.fillMode, batch, hardwareInstancedRendering, (isInstance, world) => effect.setMatrix("world", world));
    } else {
      this._objectRenderer.resetRefreshCounter();
    }
    this.onAfterRenderMeshToEffect.notifyObservers(ownerMesh);
  }
  /** @internal */
  _useMeshMaterial(_mesh) {
    return false;
  }
  /** @internal */
  _rebuild() {
    const vb = this._vertexBuffers[VertexBuffer.PositionKind];
    if (vb) {
      vb._rebuild();
    }
    this._generateIndexBuffer();
  }
  /**
   * Dispose the effect layer and free resources.
   */
  dispose() {
    const vertexBuffer = this._vertexBuffers[VertexBuffer.PositionKind];
    if (vertexBuffer) {
      vertexBuffer.dispose();
      this._vertexBuffers[VertexBuffer.PositionKind] = null;
    }
    if (this._indexBuffer) {
      this._scene.getEngine()._releaseBuffer(this._indexBuffer);
      this._indexBuffer = null;
    }
    for (const drawWrapper of this._mergeDrawWrapper) {
      drawWrapper.dispose();
    }
    this._mergeDrawWrapper = [];
    this._objectRenderer.dispose();
    this.onDisposeObservable.notifyObservers(this);
    this.onDisposeObservable.clear();
    this.onBeforeRenderLayerObservable.clear();
    this.onBeforeComposeObservable.clear();
    this.onBeforeRenderMeshToEffect.clear();
    this.onAfterRenderMeshToEffect.clear();
    this.onAfterComposeObservable.clear();
  }
};
ThinEffectLayer.ForceGLSL = false;

// node_modules/@babylonjs/core/Layers/effectLayer.js
var EffectLayer = class _EffectLayer {
  get _shouldRender() {
    return this._thinEffectLayer._shouldRender;
  }
  set _shouldRender(value) {
    this._thinEffectLayer._shouldRender = value;
  }
  get _emissiveTextureAndColor() {
    return this._thinEffectLayer._emissiveTextureAndColor;
  }
  set _emissiveTextureAndColor(value) {
    this._thinEffectLayer._emissiveTextureAndColor = value;
  }
  get _effectIntensity() {
    return this._thinEffectLayer._effectIntensity;
  }
  set _effectIntensity(value) {
    this._thinEffectLayer._effectIntensity = value;
  }
  /**
   * Force all the effect layers to compile to glsl even on WebGPU engines.
   * False by default. This is mostly meant for backward compatibility.
   */
  static get ForceGLSL() {
    return ThinEffectLayer.ForceGLSL;
  }
  static set ForceGLSL(value) {
    ThinEffectLayer.ForceGLSL = value;
  }
  /**
   * The name of the layer
   */
  get name() {
    return this._thinEffectLayer.name;
  }
  set name(value) {
    this._thinEffectLayer.name = value;
  }
  /**
   * The clear color of the texture used to generate the glow map.
   */
  get neutralColor() {
    return this._thinEffectLayer.neutralColor;
  }
  set neutralColor(value) {
    this._thinEffectLayer.neutralColor = value;
  }
  /**
   * Specifies whether the highlight layer is enabled or not.
   */
  get isEnabled() {
    return this._thinEffectLayer.isEnabled;
  }
  set isEnabled(value) {
    this._thinEffectLayer.isEnabled = value;
  }
  /**
   * Gets the camera attached to the layer.
   */
  get camera() {
    return this._thinEffectLayer.camera;
  }
  /**
   * Gets the rendering group id the layer should render in.
   */
  get renderingGroupId() {
    return this._thinEffectLayer.renderingGroupId;
  }
  set renderingGroupId(renderingGroupId) {
    this._thinEffectLayer.renderingGroupId = renderingGroupId;
  }
  /**
   * Specifies if the bounding boxes should be rendered normally or if they should undergo the effect of the layer
   */
  get disableBoundingBoxesFromEffectLayer() {
    return this._thinEffectLayer.disableBoundingBoxesFromEffectLayer;
  }
  set disableBoundingBoxesFromEffectLayer(value) {
    this._thinEffectLayer.disableBoundingBoxesFromEffectLayer = value;
  }
  /**
   * Gets the main texture where the effect is rendered
   */
  get mainTexture() {
    return this._mainTexture;
  }
  get _shaderLanguage() {
    return this._thinEffectLayer.shaderLanguage;
  }
  /**
   * Gets the shader language used in this material.
   */
  get shaderLanguage() {
    return this._thinEffectLayer.shaderLanguage;
  }
  /**
   * Sets a specific material to be used to render a mesh/a list of meshes in the layer
   * @param mesh mesh or array of meshes
   * @param material material to use by the layer when rendering the mesh(es). If undefined is passed, the specific material created by the layer will be used.
   */
  setMaterialForRendering(mesh, material) {
    this._thinEffectLayer.setMaterialForRendering(mesh, material);
  }
  /**
   * Gets the intensity of the effect for a specific mesh.
   * @param mesh The mesh to get the effect intensity for
   * @returns The intensity of the effect for the mesh
   */
  getEffectIntensity(mesh) {
    return this._thinEffectLayer.getEffectIntensity(mesh);
  }
  /**
   * Sets the intensity of the effect for a specific mesh.
   * @param mesh The mesh to set the effect intensity for
   * @param intensity The intensity of the effect for the mesh
   */
  setEffectIntensity(mesh, intensity) {
    this._thinEffectLayer.setEffectIntensity(mesh, intensity);
  }
  /**
   * Instantiates a new effect Layer and references it in the scene.
   * @param name The name of the layer
   * @param scene The scene to use the layer in
   * @param forceGLSL Use the GLSL code generation for the shader (even on WebGPU). Default is false
   * @param thinEffectLayer The thin instance of the effect layer (optional)
   */
  constructor(name, scene, forceGLSL = false, thinEffectLayer) {
    this._maxSize = 0;
    this._mainTextureDesiredSize = { width: 0, height: 0 };
    this._postProcesses = [];
    this._textures = [];
    this.onDisposeObservable = new Observable();
    this.onBeforeRenderMainTextureObservable = new Observable();
    this.onBeforeComposeObservable = new Observable();
    this.onBeforeRenderMeshToEffect = new Observable();
    this.onAfterRenderMeshToEffect = new Observable();
    this.onAfterComposeObservable = new Observable();
    this.onSizeChangedObservable = new Observable();
    this._internalThinEffectLayer = !thinEffectLayer;
    if (!thinEffectLayer) {
      thinEffectLayer = new ThinEffectLayer(name, scene, forceGLSL, false, this._importShadersAsync.bind(this));
      thinEffectLayer.getEffectName = this.getEffectName.bind(this);
      thinEffectLayer.isReady = this.isReady.bind(this);
      thinEffectLayer._createMergeEffect = this._createMergeEffect.bind(this);
      thinEffectLayer._createTextureAndPostProcesses = this._createTextureAndPostProcesses.bind(this);
      thinEffectLayer._internalCompose = this._internalRender.bind(this);
      thinEffectLayer._setEmissiveTextureAndColor = this._setEmissiveTextureAndColor.bind(this);
      thinEffectLayer._numInternalDraws = this._numInternalDraws.bind(this);
      thinEffectLayer._addCustomEffectDefines = this._addCustomEffectDefines.bind(this);
      thinEffectLayer.hasMesh = this.hasMesh.bind(this);
      thinEffectLayer.shouldRender = this.shouldRender.bind(this);
      thinEffectLayer._shouldRenderMesh = this._shouldRenderMesh.bind(this);
      thinEffectLayer._canRenderMesh = this._canRenderMesh.bind(this);
      thinEffectLayer._useMeshMaterial = this._useMeshMaterial.bind(this);
    }
    this._thinEffectLayer = thinEffectLayer;
    this.name = name;
    this._scene = scene || EngineStore.LastCreatedScene;
    _EffectLayer._SceneComponentInitialization(this._scene);
    this._engine = this._scene.getEngine();
    this._maxSize = this._engine.getCaps().maxTextureSize;
    this._scene.effectLayers.push(this);
    this._thinEffectLayer.onDisposeObservable.add(() => {
      this.onDisposeObservable.notifyObservers(this);
    });
    this._thinEffectLayer.onBeforeRenderLayerObservable.add(() => {
      this.onBeforeRenderMainTextureObservable.notifyObservers(this);
    });
    this._thinEffectLayer.onBeforeComposeObservable.add(() => {
      this.onBeforeComposeObservable.notifyObservers(this);
    });
    this._thinEffectLayer.onBeforeRenderMeshToEffect.add((mesh) => {
      this.onBeforeRenderMeshToEffect.notifyObservers(mesh);
    });
    this._thinEffectLayer.onAfterRenderMeshToEffect.add((mesh) => {
      this.onAfterRenderMeshToEffect.notifyObservers(mesh);
    });
    this._thinEffectLayer.onAfterComposeObservable.add(() => {
      this.onAfterComposeObservable.notifyObservers(this);
    });
  }
  get _shadersLoaded() {
    return this._thinEffectLayer._shadersLoaded;
  }
  set _shadersLoaded(value) {
    this._thinEffectLayer._shadersLoaded = value;
  }
  /**
   * Number of times _internalRender will be called. Some effect layers need to render the mesh several times, so they should override this method with the number of times the mesh should be rendered
   * @returns Number of times a mesh must be rendered in the layer
   */
  _numInternalDraws() {
    return this._internalThinEffectLayer ? 1 : this._thinEffectLayer._numInternalDraws();
  }
  /**
   * Initializes the effect layer with the required options.
   * @param options Sets of none mandatory options to use with the layer (see IEffectLayerOptions for more information)
   */
  _init(options) {
    this._effectLayerOptions = {
      mainTextureRatio: 0.5,
      alphaBlendingMode: 2,
      camera: null,
      renderingGroupId: -1,
      mainTextureType: 0,
      generateStencilBuffer: false,
      ...options
    };
    this._setMainTextureSize();
    this._thinEffectLayer._init(options);
    this._createMainTexture();
    this._createTextureAndPostProcesses();
  }
  /**
   * Sets the main texture desired size which is the closest power of two
   * of the engine canvas size.
   */
  _setMainTextureSize() {
    if (this._effectLayerOptions.mainTextureFixedSize) {
      this._mainTextureDesiredSize.width = this._effectLayerOptions.mainTextureFixedSize;
      this._mainTextureDesiredSize.height = this._effectLayerOptions.mainTextureFixedSize;
    } else {
      this._mainTextureDesiredSize.width = this._engine.getRenderWidth() * this._effectLayerOptions.mainTextureRatio;
      this._mainTextureDesiredSize.height = this._engine.getRenderHeight() * this._effectLayerOptions.mainTextureRatio;
      this._mainTextureDesiredSize.width = this._engine.needPOTTextures ? GetExponentOfTwo(this._mainTextureDesiredSize.width, this._maxSize) : this._mainTextureDesiredSize.width;
      this._mainTextureDesiredSize.height = this._engine.needPOTTextures ? GetExponentOfTwo(this._mainTextureDesiredSize.height, this._maxSize) : this._mainTextureDesiredSize.height;
    }
    this._mainTextureDesiredSize.width = Math.floor(this._mainTextureDesiredSize.width);
    this._mainTextureDesiredSize.height = Math.floor(this._mainTextureDesiredSize.height);
  }
  /**
   * Creates the main texture for the effect layer.
   */
  _createMainTexture() {
    this._mainTexture = new RenderTargetTexture("EffectLayerMainRTT", {
      width: this._mainTextureDesiredSize.width,
      height: this._mainTextureDesiredSize.height
    }, this._scene, {
      type: this._effectLayerOptions.mainTextureType,
      samplingMode: Texture.TRILINEAR_SAMPLINGMODE,
      generateStencilBuffer: this._effectLayerOptions.generateStencilBuffer,
      existingObjectRenderer: this._thinEffectLayer.objectRenderer
    });
    this._mainTexture.activeCamera = this._effectLayerOptions.camera;
    this._mainTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
    this._mainTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
    this._mainTexture.anisotropicFilteringLevel = 1;
    this._mainTexture.updateSamplingMode(Texture.BILINEAR_SAMPLINGMODE);
    this._mainTexture.renderParticles = false;
    this._mainTexture.renderList = null;
    this._mainTexture.ignoreCameraViewport = true;
    this._mainTexture.onClearObservable.add((engine) => {
      engine.clear(this.neutralColor, true, true, true);
    });
  }
  /**
   * Adds specific effects defines.
   * @param defines The defines to add specifics to.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _addCustomEffectDefines(defines) {
  }
  /**
   * Checks for the readiness of the element composing the layer.
   * @param subMesh the mesh to check for
   * @param useInstances specify whether or not to use instances to render the mesh
   * @param emissiveTexture the associated emissive texture used to generate the glow
   * @returns true if ready otherwise, false
   */
  _isReady(subMesh, useInstances, emissiveTexture) {
    return this._internalThinEffectLayer ? this._thinEffectLayer._internalIsSubMeshReady(subMesh, useInstances, emissiveTexture) : this._thinEffectLayer._isSubMeshReady(subMesh, useInstances, emissiveTexture);
  }
  async _importShadersAsync() {
  }
  _arePostProcessAndMergeReady() {
    return this._internalThinEffectLayer ? this._thinEffectLayer._internalIsLayerReady() : this._thinEffectLayer.isLayerReady();
  }
  /**
   * Checks if the layer is ready to be used.
   * @returns true if the layer is ready to be used
   */
  isLayerReady() {
    return this._arePostProcessAndMergeReady() && this._mainTexture.isReady();
  }
  /**
   * Renders the glowing part of the scene by blending the blurred glowing meshes on top of the rendered scene.
   */
  render() {
    if (!this._thinEffectLayer.compose()) {
      return;
    }
    const size = this._mainTexture.getSize();
    this._setMainTextureSize();
    if ((size.width !== this._mainTextureDesiredSize.width || size.height !== this._mainTextureDesiredSize.height) && this._mainTextureDesiredSize.width !== 0 && this._mainTextureDesiredSize.height !== 0) {
      this.onSizeChangedObservable.notifyObservers(this);
      this._disposeTextureAndPostProcesses();
      this._createMainTexture();
      this._createTextureAndPostProcesses();
    }
  }
  /**
   * Determine if a given mesh will be used in the current effect.
   * @param mesh mesh to test
   * @returns true if the mesh will be used
   */
  hasMesh(mesh) {
    return this._internalThinEffectLayer ? this._thinEffectLayer._internalHasMesh(mesh) : this._thinEffectLayer.hasMesh(mesh);
  }
  /**
   * Returns true if the layer contains information to display, otherwise false.
   * @returns true if the glow layer should be rendered
   */
  shouldRender() {
    return this._internalThinEffectLayer ? this._thinEffectLayer._internalShouldRender() : this._thinEffectLayer.shouldRender();
  }
  /**
   * Returns true if the mesh should render, otherwise false.
   * @param mesh The mesh to render
   * @returns true if it should render otherwise false
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _shouldRenderMesh(mesh) {
    return this._internalThinEffectLayer ? true : this._thinEffectLayer._shouldRenderMesh(mesh);
  }
  /**
   * Returns true if the mesh can be rendered, otherwise false.
   * @param mesh The mesh to render
   * @param material The material used on the mesh
   * @returns true if it can be rendered otherwise false
   */
  _canRenderMesh(mesh, material) {
    return this._internalThinEffectLayer ? this._thinEffectLayer._internalCanRenderMesh(mesh, material) : this._thinEffectLayer._canRenderMesh(mesh, material);
  }
  /**
   * Returns true if the mesh should render, otherwise false.
   * @returns true if it should render otherwise false
   */
  _shouldRenderEmissiveTextureForMesh() {
    return true;
  }
  /**
   * Defines whether the current material of the mesh should be use to render the effect.
   * @param mesh defines the current mesh to render
   * @returns true if the mesh material should be use
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _useMeshMaterial(mesh) {
    return this._internalThinEffectLayer ? false : this._thinEffectLayer._useMeshMaterial(mesh);
  }
  /**
   * Rebuild the required buffers.
   * @internal Internal use only.
   */
  _rebuild() {
    this._thinEffectLayer._rebuild();
  }
  /**
   * Dispose only the render target textures and post process.
   */
  _disposeTextureAndPostProcesses() {
    this._mainTexture.dispose();
    for (let i = 0; i < this._postProcesses.length; i++) {
      if (this._postProcesses[i]) {
        this._postProcesses[i].dispose();
      }
    }
    this._postProcesses = [];
    for (let i = 0; i < this._textures.length; i++) {
      if (this._textures[i]) {
        this._textures[i].dispose();
      }
    }
    this._textures = [];
  }
  /**
   * Dispose the highlight layer and free resources.
   */
  dispose() {
    this._thinEffectLayer.dispose();
    this._disposeTextureAndPostProcesses();
    const index = this._scene.effectLayers.indexOf(this, 0);
    if (index > -1) {
      this._scene.effectLayers.splice(index, 1);
    }
    this.onDisposeObservable.clear();
    this.onBeforeRenderMainTextureObservable.clear();
    this.onBeforeComposeObservable.clear();
    this.onBeforeRenderMeshToEffect.clear();
    this.onAfterRenderMeshToEffect.clear();
    this.onAfterComposeObservable.clear();
    this.onSizeChangedObservable.clear();
  }
  /**
   * Gets the class name of the effect layer
   * @returns the string with the class name of the effect layer
   */
  getClassName() {
    return "EffectLayer";
  }
  /**
   * Creates an effect layer from parsed effect layer data
   * @param parsedEffectLayer defines effect layer data
   * @param scene defines the current scene
   * @param rootUrl defines the root URL containing the effect layer information
   * @returns a parsed effect Layer
   */
  static Parse(parsedEffectLayer, scene, rootUrl) {
    const effectLayerType = Tools.Instantiate(parsedEffectLayer.customType);
    return effectLayerType.Parse(parsedEffectLayer, scene, rootUrl);
  }
};
EffectLayer._SceneComponentInitialization = (_) => {
  throw _WarnImport("EffectLayerSceneComponent");
};
__decorate([
  serialize()
], EffectLayer.prototype, "name", null);
__decorate([
  serializeAsColor4()
], EffectLayer.prototype, "neutralColor", null);
__decorate([
  serialize()
], EffectLayer.prototype, "isEnabled", null);
__decorate([
  serializeAsCameraReference()
], EffectLayer.prototype, "camera", null);
__decorate([
  serialize()
], EffectLayer.prototype, "renderingGroupId", null);
__decorate([
  serialize()
], EffectLayer.prototype, "disableBoundingBoxesFromEffectLayer", null);

// node_modules/@babylonjs/core/Loading/Plugins/babylonFileParser.function.js
var _BabylonFileParsers = {};
function AddParser(name, parser) {
  _BabylonFileParsers[name] = parser;
}

// node_modules/@babylonjs/core/Layers/effectLayerSceneComponent.js
AddParser(SceneComponentConstants.NAME_EFFECTLAYER, (parsedData, scene, container, rootUrl) => {
  if (parsedData.effectLayers) {
    if (!container.effectLayers) {
      container.effectLayers = [];
    }
    for (let index = 0; index < parsedData.effectLayers.length; index++) {
      const effectLayer = EffectLayer.Parse(parsedData.effectLayers[index], scene, rootUrl);
      container.effectLayers.push(effectLayer);
    }
  }
});
Scene.prototype.removeEffectLayer = function(toRemove) {
  const index = this.effectLayers.indexOf(toRemove);
  if (index !== -1) {
    this.effectLayers.splice(index, 1);
  }
  return index;
};
Scene.prototype.addEffectLayer = function(newEffectLayer) {
  this.effectLayers.push(newEffectLayer);
};
var EffectLayerSceneComponent = class {
  /**
   * Creates a new instance of the component for the given scene
   * @param scene Defines the scene to register the component in
   */
  constructor(scene) {
    this.name = SceneComponentConstants.NAME_EFFECTLAYER;
    this._renderEffects = false;
    this._needStencil = false;
    this._previousStencilState = false;
    this.scene = scene || EngineStore.LastCreatedScene;
    if (!this.scene) {
      return;
    }
    this._engine = this.scene.getEngine();
  }
  /**
   * Registers the component in a given scene
   */
  register() {
    this.scene._isReadyForMeshStage.registerStep(SceneComponentConstants.STEP_ISREADYFORMESH_EFFECTLAYER, this, this._isReadyForMesh);
    this.scene._cameraDrawRenderTargetStage.registerStep(SceneComponentConstants.STEP_CAMERADRAWRENDERTARGET_EFFECTLAYER, this, this._renderMainTexture);
    this.scene._beforeCameraDrawStage.registerStep(SceneComponentConstants.STEP_BEFORECAMERADRAW_EFFECTLAYER, this, this._setStencil);
    this.scene._afterRenderingGroupDrawStage.registerStep(SceneComponentConstants.STEP_AFTERRENDERINGGROUPDRAW_EFFECTLAYER_DRAW, this, this._drawRenderingGroup);
    this.scene._afterCameraDrawStage.registerStep(SceneComponentConstants.STEP_AFTERCAMERADRAW_EFFECTLAYER, this, this._setStencilBack);
    this.scene._afterCameraDrawStage.registerStep(SceneComponentConstants.STEP_AFTERCAMERADRAW_EFFECTLAYER_DRAW, this, this._drawCamera);
  }
  /**
   * Rebuilds the elements related to this component in case of
   * context lost for instance.
   */
  rebuild() {
    const layers = this.scene.effectLayers;
    for (const effectLayer of layers) {
      effectLayer._rebuild();
    }
  }
  /**
   * Serializes the component data to the specified json object
   * @param serializationObject The object to serialize to
   */
  serialize(serializationObject) {
    serializationObject.effectLayers = [];
    const layers = this.scene.effectLayers;
    for (const effectLayer of layers) {
      if (effectLayer.serialize) {
        serializationObject.effectLayers.push(effectLayer.serialize());
      }
    }
  }
  /**
   * Adds all the elements from the container to the scene
   * @param container the container holding the elements
   */
  addFromContainer(container) {
    if (!container.effectLayers) {
      return;
    }
    container.effectLayers.forEach((o) => {
      this.scene.addEffectLayer(o);
    });
  }
  /**
   * Removes all the elements in the container from the scene
   * @param container contains the elements to remove
   * @param dispose if the removed element should be disposed (default: false)
   */
  removeFromContainer(container, dispose) {
    if (!container.effectLayers) {
      return;
    }
    container.effectLayers.forEach((o) => {
      this.scene.removeEffectLayer(o);
      if (dispose) {
        o.dispose();
      }
    });
  }
  /**
   * Disposes the component and the associated resources.
   */
  dispose() {
    const layers = this.scene.effectLayers;
    while (layers.length) {
      layers[0].dispose();
    }
  }
  _isReadyForMesh(mesh, hardwareInstancedRendering) {
    const currentRenderPassId = this._engine.currentRenderPassId;
    const layers = this.scene.effectLayers;
    for (const layer of layers) {
      if (!layer.hasMesh(mesh)) {
        continue;
      }
      const renderTarget = layer._mainTexture;
      this._engine.currentRenderPassId = renderTarget.renderPassId;
      for (const subMesh of mesh.subMeshes) {
        if (!layer.isReady(subMesh, hardwareInstancedRendering)) {
          this._engine.currentRenderPassId = currentRenderPassId;
          return false;
        }
      }
    }
    this._engine.currentRenderPassId = currentRenderPassId;
    return true;
  }
  _renderMainTexture(camera) {
    this._renderEffects = false;
    this._needStencil = false;
    let needRebind = false;
    const layers = this.scene.effectLayers;
    if (layers && layers.length > 0) {
      this._previousStencilState = this._engine.getStencilBuffer();
      for (const effectLayer of layers) {
        if (effectLayer.shouldRender() && (!effectLayer.camera || effectLayer.camera.cameraRigMode === Camera.RIG_MODE_NONE && camera === effectLayer.camera || effectLayer.camera.cameraRigMode !== Camera.RIG_MODE_NONE && effectLayer.camera._rigCameras.indexOf(camera) > -1)) {
          this._renderEffects = true;
          this._needStencil = this._needStencil || effectLayer.needStencil();
          const renderTarget = effectLayer._mainTexture;
          if (renderTarget._shouldRender()) {
            this.scene.incrementRenderId();
            renderTarget.render(false, false);
            needRebind = true;
          }
        }
      }
      this.scene.incrementRenderId();
    }
    return needRebind;
  }
  _setStencil() {
    if (this._needStencil) {
      this._engine.setStencilBuffer(true);
    }
  }
  _setStencilBack() {
    if (this._needStencil) {
      this._engine.setStencilBuffer(this._previousStencilState);
    }
  }
  _draw(renderingGroupId) {
    if (this._renderEffects) {
      this._engine.setDepthBuffer(false);
      const layers = this.scene.effectLayers;
      for (let i = 0; i < layers.length; i++) {
        const effectLayer = layers[i];
        if (effectLayer.renderingGroupId === renderingGroupId) {
          if (effectLayer.shouldRender()) {
            effectLayer.render();
          }
        }
      }
      this._engine.setDepthBuffer(true);
    }
  }
  _drawCamera() {
    if (this._renderEffects) {
      this._draw(-1);
    }
  }
  _drawRenderingGroup(index) {
    if (!this.scene._isInIntermediateRendering() && this._renderEffects) {
      this._draw(index);
    }
  }
};
EffectLayer._SceneComponentInitialization = (scene) => {
  let component = scene._getComponent(SceneComponentConstants.NAME_EFFECTLAYER);
  if (!component) {
    component = new EffectLayerSceneComponent(scene);
    scene._addComponent(component);
  }
};

// node_modules/@babylonjs/core/Layers/thinGlowLayer.js
var ThinGlowLayer = class _ThinGlowLayer extends ThinEffectLayer {
  /**
   * Gets the ldrMerge option.
   */
  get ldrMerge() {
    return this._options.ldrMerge;
  }
  /**
   * Sets the kernel size of the blur.
   */
  set blurKernelSize(value) {
    if (value === this._options.blurKernelSize) {
      return;
    }
    this._options.blurKernelSize = value;
    const effectiveKernel = this._getEffectiveBlurKernelSize();
    this._horizontalBlurPostprocess1.kernel = effectiveKernel;
    this._verticalBlurPostprocess1.kernel = effectiveKernel;
    this._horizontalBlurPostprocess2.kernel = effectiveKernel;
    this._verticalBlurPostprocess2.kernel = effectiveKernel;
  }
  /**
   * Gets the kernel size of the blur.
   */
  get blurKernelSize() {
    return this._options.blurKernelSize;
  }
  /**
   * Sets the glow intensity.
   */
  set intensity(value) {
    this._intensity = value;
  }
  /**
   * Gets the glow intensity.
   */
  get intensity() {
    return this._intensity;
  }
  /**
   * Instantiates a new glow Layer and references it to the scene.
   * @param name The name of the layer
   * @param scene The scene to use the layer in
   * @param options Sets of none mandatory options to use with the layer (see IGlowLayerOptions for more information)
   * @param dontCheckIfReady Specifies if the layer should disable checking whether all the post processes are ready (default: false). To save performance, this should be set to true and you should call `isReady` manually before rendering to the layer.
   */
  constructor(name, scene, options, dontCheckIfReady = false) {
    super(name, scene, false, dontCheckIfReady);
    this._intensity = 1;
    this._includedOnlyMeshes = [];
    this._excludedMeshes = [];
    this._meshesUsingTheirOwnMaterials = [];
    this._renderPassId = 0;
    this.neutralColor = new Color4(0, 0, 0, 1);
    this._options = {
      mainTextureRatio: 0.5,
      mainTextureFixedSize: 0,
      mainTextureType: 0,
      blurKernelSize: 32,
      camera: null,
      renderingGroupId: -1,
      ldrMerge: false,
      alphaBlendingMode: 1,
      ...options
    };
    this._init(this._options);
    if (dontCheckIfReady) {
      this._createTextureAndPostProcesses();
    }
  }
  /**
   * Gets the class name of the thin glow layer
   * @returns the string with the class name of the glow layer
   */
  getClassName() {
    return "GlowLayer";
  }
  async _importShadersAsync() {
    if (this._shaderLanguage === 1) {
      await Promise.all([
        import("./glowMapMerge.fragment-WHQHJYD7.js"),
        import("./glowMapMerge.vertex-VEDYCOII.js"),
        import("./glowBlurPostProcess.fragment-SVFRMKHB.js")
      ]);
    } else {
      await Promise.all([import("./glowMapMerge.fragment-4GA3IB2A.js"), import("./glowMapMerge.vertex-2CM7C2G2.js"), import("./glowBlurPostProcess.fragment-CWBFFUSL.js")]);
    }
    await super._importShadersAsync();
  }
  getEffectName() {
    return _ThinGlowLayer.EffectName;
  }
  _createMergeEffect() {
    let defines = "#define EMISSIVE \n";
    if (this._options.ldrMerge) {
      defines += "#define LDR \n";
    }
    return this._engine.createEffect("glowMapMerge", [VertexBuffer.PositionKind], ["offset"], ["textureSampler", "textureSampler2"], defines, void 0, void 0, void 0, void 0, this.shaderLanguage, this._shadersLoaded ? void 0 : async () => {
      await this._importShadersAsync();
      this._shadersLoaded = true;
    });
  }
  _createTextureAndPostProcesses() {
    const effectiveKernel = this._getEffectiveBlurKernelSize();
    this._horizontalBlurPostprocess1 = new ThinBlurPostProcess("GlowLayerHBP1", this._scene.getEngine(), new Vector2(1, 0), effectiveKernel);
    this._verticalBlurPostprocess1 = new ThinBlurPostProcess("GlowLayerVBP1", this._scene.getEngine(), new Vector2(0, 1), effectiveKernel);
    this._horizontalBlurPostprocess2 = new ThinBlurPostProcess("GlowLayerHBP2", this._scene.getEngine(), new Vector2(1, 0), effectiveKernel);
    this._verticalBlurPostprocess2 = new ThinBlurPostProcess("GlowLayerVBP2", this._scene.getEngine(), new Vector2(0, 1), effectiveKernel);
    this._postProcesses = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1, this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2];
  }
  _getEffectiveBlurKernelSize() {
    return this._options.blurKernelSize / 2;
  }
  isReady(subMesh, useInstances) {
    const material = subMesh.getMaterial();
    const mesh = subMesh.getRenderingMesh();
    if (!material || !mesh) {
      return false;
    }
    const emissiveTexture = material.emissiveTexture;
    return super._isSubMeshReady(subMesh, useInstances, emissiveTexture);
  }
  _canRenderMesh(_mesh, _material) {
    return true;
  }
  _internalCompose(effect) {
    this.bindTexturesForCompose(effect);
    effect.setFloat("offset", this._intensity);
    const engine = this._engine;
    const previousStencilBuffer = engine.getStencilBuffer();
    engine.setStencilBuffer(false);
    engine.drawElementsType(Material.TriangleFillMode, 0, 6);
    engine.setStencilBuffer(previousStencilBuffer);
  }
  _setEmissiveTextureAndColor(mesh, subMesh, material) {
    let textureLevel = 1;
    if (this.customEmissiveTextureSelector) {
      this._emissiveTextureAndColor.texture = this.customEmissiveTextureSelector(mesh, subMesh, material);
    } else {
      if (material) {
        this._emissiveTextureAndColor.texture = material.emissiveTexture;
        if (this._emissiveTextureAndColor.texture) {
          textureLevel = this._emissiveTextureAndColor.texture.level;
        }
      } else {
        this._emissiveTextureAndColor.texture = null;
      }
    }
    if (this.customEmissiveColorSelector) {
      this.customEmissiveColorSelector(mesh, subMesh, material, this._emissiveTextureAndColor.color);
    } else {
      if (material.emissiveColor) {
        const emissiveIntensity = material.emissiveIntensity ?? 1;
        textureLevel *= emissiveIntensity;
        this._emissiveTextureAndColor.color.set(material.emissiveColor.r * textureLevel, material.emissiveColor.g * textureLevel, material.emissiveColor.b * textureLevel, material.alpha);
      } else {
        this._emissiveTextureAndColor.color.set(this.neutralColor.r, this.neutralColor.g, this.neutralColor.b, this.neutralColor.a);
      }
    }
  }
  _shouldRenderMesh(mesh) {
    return this.hasMesh(mesh);
  }
  _addCustomEffectDefines(defines) {
    defines.push("#define GLOW");
  }
  /**
   * Add a mesh in the exclusion list to prevent it to impact or being impacted by the glow layer.
   * @param mesh The mesh to exclude from the glow layer
   */
  addExcludedMesh(mesh) {
    if (this._excludedMeshes.indexOf(mesh.uniqueId) === -1) {
      this._excludedMeshes.push(mesh.uniqueId);
    }
  }
  /**
   * Remove a mesh from the exclusion list to let it impact or being impacted by the glow layer.
   * @param mesh The mesh to remove
   */
  removeExcludedMesh(mesh) {
    const index = this._excludedMeshes.indexOf(mesh.uniqueId);
    if (index !== -1) {
      this._excludedMeshes.splice(index, 1);
    }
  }
  /**
   * Add a mesh in the inclusion list to impact or being impacted by the glow layer.
   * @param mesh The mesh to include in the glow layer
   */
  addIncludedOnlyMesh(mesh) {
    if (this._includedOnlyMeshes.indexOf(mesh.uniqueId) === -1) {
      this._includedOnlyMeshes.push(mesh.uniqueId);
    }
  }
  /**
   * Remove a mesh from the Inclusion list to prevent it to impact or being impacted by the glow layer.
   * @param mesh The mesh to remove
   */
  removeIncludedOnlyMesh(mesh) {
    const index = this._includedOnlyMeshes.indexOf(mesh.uniqueId);
    if (index !== -1) {
      this._includedOnlyMeshes.splice(index, 1);
    }
  }
  hasMesh(mesh) {
    if (!super.hasMesh(mesh)) {
      return false;
    }
    if (this._includedOnlyMeshes.length) {
      return this._includedOnlyMeshes.indexOf(mesh.uniqueId) !== -1;
    }
    if (this._excludedMeshes.length) {
      return this._excludedMeshes.indexOf(mesh.uniqueId) === -1;
    }
    return true;
  }
  _useMeshMaterial(mesh) {
    var _a;
    if ((_a = mesh.material) == null ? void 0 : _a._supportGlowLayer) {
      return true;
    }
    if (this._meshesUsingTheirOwnMaterials.length == 0) {
      return false;
    }
    return this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId) > -1;
  }
  /**
   * Add a mesh to be rendered through its own material and not with emissive only.
   * @param mesh The mesh for which we need to use its material
   */
  referenceMeshToUseItsOwnMaterial(mesh) {
    mesh.resetDrawCache(this._renderPassId);
    this._meshesUsingTheirOwnMaterials.push(mesh.uniqueId);
    mesh.onDisposeObservable.add(() => {
      this._disposeMesh(mesh);
    });
  }
  /**
   * Remove a mesh from being rendered through its own material and not with emissive only.
   * @param mesh The mesh for which we need to not use its material
   * @param renderPassId The render pass id used when rendering the mesh
   */
  unReferenceMeshFromUsingItsOwnMaterial(mesh, renderPassId) {
    let index = this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId);
    while (index >= 0) {
      this._meshesUsingTheirOwnMaterials.splice(index, 1);
      index = this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId);
    }
    mesh.resetDrawCache(renderPassId);
  }
  /** @internal */
  _disposeMesh(mesh) {
    this.removeIncludedOnlyMesh(mesh);
    this.removeExcludedMesh(mesh);
  }
};
ThinGlowLayer.EffectName = "GlowLayer";
ThinGlowLayer.DefaultBlurKernelSize = 32;

// node_modules/@babylonjs/core/Layers/glowLayer.js
Scene.prototype.getGlowLayerByName = function(name) {
  var _a;
  for (let index = 0; index < ((_a = this.effectLayers) == null ? void 0 : _a.length); index++) {
    if (this.effectLayers[index].name === name && this.effectLayers[index].getEffectName() === GlowLayer.EffectName) {
      return this.effectLayers[index];
    }
  }
  return null;
};
var GlowLayer = class _GlowLayer extends EffectLayer {
  /**
   * Effect Name of the layer.
   */
  static get EffectName() {
    return ThinGlowLayer.EffectName;
  }
  /**
   * Sets the kernel size of the blur.
   */
  set blurKernelSize(value) {
    this._thinEffectLayer.blurKernelSize = value;
  }
  /**
   * Gets the kernel size of the blur.
   */
  get blurKernelSize() {
    return this._thinEffectLayer.blurKernelSize;
  }
  /**
   * Sets the glow intensity.
   */
  set intensity(value) {
    this._thinEffectLayer.intensity = value;
  }
  /**
   * Gets the glow intensity.
   */
  get intensity() {
    return this._thinEffectLayer.intensity;
  }
  /**
   * Callback used to let the user override the color selection on a per mesh basis
   */
  get customEmissiveColorSelector() {
    return this._thinEffectLayer.customEmissiveColorSelector;
  }
  set customEmissiveColorSelector(value) {
    this._thinEffectLayer.customEmissiveColorSelector = value;
  }
  /**
   * Callback used to let the user override the texture selection on a per mesh basis
   */
  get customEmissiveTextureSelector() {
    return this._thinEffectLayer.customEmissiveTextureSelector;
  }
  set customEmissiveTextureSelector(value) {
    this._thinEffectLayer.customEmissiveTextureSelector = value;
  }
  /**
   * Instantiates a new glow Layer and references it to the scene.
   * @param name The name of the layer
   * @param scene The scene to use the layer in
   * @param options Sets of none mandatory options to use with the layer (see IGlowLayerOptions for more information)
   */
  constructor(name, scene, options) {
    super(name, scene, false, new ThinGlowLayer(name, scene, options));
    this._options = {
      mainTextureRatio: _GlowLayer.DefaultTextureRatio,
      blurKernelSize: 32,
      mainTextureFixedSize: void 0,
      camera: null,
      mainTextureSamples: 1,
      renderingGroupId: -1,
      ldrMerge: false,
      alphaBlendingMode: 1,
      mainTextureType: 0,
      generateStencilBuffer: false,
      ...options
    };
    this._init(this._options);
  }
  /**
   * Get the effect name of the layer.
   * @returns The effect name
   */
  getEffectName() {
    return _GlowLayer.EffectName;
  }
  /**
   * @internal
   * Create the merge effect. This is the shader use to blit the information back
   * to the main canvas at the end of the scene rendering.
   */
  _createMergeEffect() {
    return this._thinEffectLayer._createMergeEffect();
  }
  /**
   * Creates the render target textures and post processes used in the glow layer.
   */
  _createTextureAndPostProcesses() {
    this._thinEffectLayer._renderPassId = this._mainTexture.renderPassId;
    let blurTextureWidth = this._mainTextureDesiredSize.width;
    let blurTextureHeight = this._mainTextureDesiredSize.height;
    blurTextureWidth = this._engine.needPOTTextures ? GetExponentOfTwo(blurTextureWidth, this._maxSize) : blurTextureWidth;
    blurTextureHeight = this._engine.needPOTTextures ? GetExponentOfTwo(blurTextureHeight, this._maxSize) : blurTextureHeight;
    let textureType = 0;
    if (this._engine.getCaps().textureHalfFloatRender) {
      textureType = 2;
    } else {
      textureType = 0;
    }
    this._blurTexture1 = new RenderTargetTexture("GlowLayerBlurRTT", {
      width: blurTextureWidth,
      height: blurTextureHeight
    }, this._scene, false, true, textureType);
    this._blurTexture1.wrapU = Texture.CLAMP_ADDRESSMODE;
    this._blurTexture1.wrapV = Texture.CLAMP_ADDRESSMODE;
    this._blurTexture1.updateSamplingMode(Texture.BILINEAR_SAMPLINGMODE);
    this._blurTexture1.renderParticles = false;
    this._blurTexture1.ignoreCameraViewport = true;
    const blurTextureWidth2 = Math.floor(blurTextureWidth / 2);
    const blurTextureHeight2 = Math.floor(blurTextureHeight / 2);
    this._blurTexture2 = new RenderTargetTexture("GlowLayerBlurRTT2", {
      width: blurTextureWidth2,
      height: blurTextureHeight2
    }, this._scene, false, true, textureType);
    this._blurTexture2.wrapU = Texture.CLAMP_ADDRESSMODE;
    this._blurTexture2.wrapV = Texture.CLAMP_ADDRESSMODE;
    this._blurTexture2.updateSamplingMode(Texture.BILINEAR_SAMPLINGMODE);
    this._blurTexture2.renderParticles = false;
    this._blurTexture2.ignoreCameraViewport = true;
    this._textures = [this._blurTexture1, this._blurTexture2];
    this._thinEffectLayer.bindTexturesForCompose = (effect) => {
      effect.setTexture("textureSampler", this._blurTexture1);
      effect.setTexture("textureSampler2", this._blurTexture2);
      effect.setFloat("offset", this.intensity);
    };
    this._thinEffectLayer._createTextureAndPostProcesses();
    const thinBlurPostProcesses1 = this._thinEffectLayer._postProcesses[0];
    this._horizontalBlurPostprocess1 = new BlurPostProcess("GlowLayerHBP1", thinBlurPostProcesses1.direction, thinBlurPostProcesses1.kernel, {
      samplingMode: Texture.BILINEAR_SAMPLINGMODE,
      engine: this._scene.getEngine(),
      width: blurTextureWidth,
      height: blurTextureHeight,
      textureType,
      effectWrapper: thinBlurPostProcesses1
    });
    this._horizontalBlurPostprocess1.width = blurTextureWidth;
    this._horizontalBlurPostprocess1.height = blurTextureHeight;
    this._horizontalBlurPostprocess1.externalTextureSamplerBinding = true;
    this._horizontalBlurPostprocess1.onApplyObservable.add((effect) => {
      effect.setTexture("textureSampler", this._mainTexture);
    });
    const thinBlurPostProcesses2 = this._thinEffectLayer._postProcesses[1];
    this._verticalBlurPostprocess1 = new BlurPostProcess("GlowLayerVBP1", thinBlurPostProcesses2.direction, thinBlurPostProcesses2.kernel, {
      samplingMode: Texture.BILINEAR_SAMPLINGMODE,
      engine: this._scene.getEngine(),
      width: blurTextureWidth,
      height: blurTextureHeight,
      textureType,
      effectWrapper: thinBlurPostProcesses2
    });
    const thinBlurPostProcesses3 = this._thinEffectLayer._postProcesses[2];
    this._horizontalBlurPostprocess2 = new BlurPostProcess("GlowLayerHBP2", thinBlurPostProcesses3.direction, thinBlurPostProcesses3.kernel, {
      samplingMode: Texture.BILINEAR_SAMPLINGMODE,
      engine: this._scene.getEngine(),
      width: blurTextureWidth2,
      height: blurTextureHeight2,
      textureType,
      effectWrapper: thinBlurPostProcesses3
    });
    this._horizontalBlurPostprocess2.width = blurTextureWidth2;
    this._horizontalBlurPostprocess2.height = blurTextureHeight2;
    this._horizontalBlurPostprocess2.externalTextureSamplerBinding = true;
    this._horizontalBlurPostprocess2.onApplyObservable.add((effect) => {
      effect.setTexture("textureSampler", this._blurTexture1);
    });
    const thinBlurPostProcesses4 = this._thinEffectLayer._postProcesses[3];
    this._verticalBlurPostprocess2 = new BlurPostProcess("GlowLayerVBP2", thinBlurPostProcesses4.direction, thinBlurPostProcesses4.kernel, {
      samplingMode: Texture.BILINEAR_SAMPLINGMODE,
      engine: this._scene.getEngine(),
      width: blurTextureWidth2,
      height: blurTextureHeight2,
      textureType,
      effectWrapper: thinBlurPostProcesses4
    });
    this._postProcesses = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1, this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2];
    this._postProcesses1 = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1];
    this._postProcesses2 = [this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2];
    this._mainTexture.samples = this._options.mainTextureSamples;
    this._mainTexture.onAfterUnbindObservable.add(() => {
      const internalTexture = this._blurTexture1.renderTarget;
      if (internalTexture) {
        this._scene.postProcessManager.directRender(this._postProcesses1, internalTexture, true);
        const internalTexture2 = this._blurTexture2.renderTarget;
        if (internalTexture2) {
          this._scene.postProcessManager.directRender(this._postProcesses2, internalTexture2, true);
        }
        this._engine.unBindFramebuffer(internalTexture2 ?? internalTexture, true);
      }
    });
    this._postProcesses.map((pp) => {
      pp.autoClear = false;
    });
  }
  /**
   * Checks for the readiness of the element composing the layer.
   * @param subMesh the mesh to check for
   * @param useInstances specify whether or not to use instances to render the mesh
   * @returns true if ready otherwise, false
   */
  isReady(subMesh, useInstances) {
    return this._thinEffectLayer.isReady(subMesh, useInstances);
  }
  /**
   * @returns whether or not the layer needs stencil enabled during the mesh rendering.
   */
  needStencil() {
    return false;
  }
  /**
   * Returns true if the mesh can be rendered, otherwise false.
   * @param mesh The mesh to render
   * @param material The material used on the mesh
   * @returns true if it can be rendered otherwise false
   */
  _canRenderMesh(mesh, material) {
    return this._thinEffectLayer._canRenderMesh(mesh, material);
  }
  /**
   * Implementation specific of rendering the generating effect on the main canvas.
   * @param effect The effect used to render through
   */
  _internalRender(effect) {
    this._thinEffectLayer._internalCompose(effect);
  }
  /**
   * Sets the required values for both the emissive texture and and the main color.
   * @param mesh
   * @param subMesh
   * @param material
   */
  _setEmissiveTextureAndColor(mesh, subMesh, material) {
    this._thinEffectLayer._setEmissiveTextureAndColor(mesh, subMesh, material);
  }
  /**
   * Returns true if the mesh should render, otherwise false.
   * @param mesh The mesh to render
   * @returns true if it should render otherwise false
   */
  _shouldRenderMesh(mesh) {
    return this._thinEffectLayer._shouldRenderMesh(mesh);
  }
  /**
   * Adds specific effects defines.
   * @param defines The defines to add specifics to.
   */
  _addCustomEffectDefines(defines) {
    this._thinEffectLayer._addCustomEffectDefines(defines);
  }
  /**
   * Add a mesh in the exclusion list to prevent it to impact or being impacted by the glow layer.
   * @param mesh The mesh to exclude from the glow layer
   */
  addExcludedMesh(mesh) {
    this._thinEffectLayer.addExcludedMesh(mesh);
  }
  /**
   * Remove a mesh from the exclusion list to let it impact or being impacted by the glow layer.
   * @param mesh The mesh to remove
   */
  removeExcludedMesh(mesh) {
    this._thinEffectLayer.removeExcludedMesh(mesh);
  }
  /**
   * Add a mesh in the inclusion list to impact or being impacted by the glow layer.
   * @param mesh The mesh to include in the glow layer
   */
  addIncludedOnlyMesh(mesh) {
    this._thinEffectLayer.addIncludedOnlyMesh(mesh);
  }
  /**
   * Remove a mesh from the Inclusion list to prevent it to impact or being impacted by the glow layer.
   * @param mesh The mesh to remove
   */
  removeIncludedOnlyMesh(mesh) {
    this._thinEffectLayer.removeIncludedOnlyMesh(mesh);
  }
  /**
   * Determine if a given mesh will be used in the glow layer
   * @param mesh The mesh to test
   * @returns true if the mesh will be highlighted by the current glow layer
   */
  hasMesh(mesh) {
    return this._thinEffectLayer.hasMesh(mesh);
  }
  /**
   * Defines whether the current material of the mesh should be use to render the effect.
   * @param mesh defines the current mesh to render
   * @returns true if the material of the mesh should be use to render the effect
   */
  _useMeshMaterial(mesh) {
    return this._thinEffectLayer._useMeshMaterial(mesh);
  }
  /**
   * Add a mesh to be rendered through its own material and not with emissive only.
   * @param mesh The mesh for which we need to use its material
   */
  referenceMeshToUseItsOwnMaterial(mesh) {
    this._thinEffectLayer.referenceMeshToUseItsOwnMaterial(mesh);
  }
  /**
   * Remove a mesh from being rendered through its own material and not with emissive only.
   * @param mesh The mesh for which we need to not use its material
   */
  unReferenceMeshFromUsingItsOwnMaterial(mesh) {
    this._thinEffectLayer.unReferenceMeshFromUsingItsOwnMaterial(mesh, this._mainTexture.renderPassId);
  }
  /**
   * Free any resources and references associated to a mesh.
   * Internal use
   * @param mesh The mesh to free.
   * @internal
   */
  _disposeMesh(mesh) {
    this._thinEffectLayer._disposeMesh(mesh);
  }
  /**
   * Gets the class name of the effect layer
   * @returns the string with the class name of the effect layer
   */
  getClassName() {
    return "GlowLayer";
  }
  /**
   * Serializes this glow layer
   * @returns a serialized glow layer object
   */
  serialize() {
    const serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.GlowLayer";
    let index;
    serializationObject.includedMeshes = [];
    const includedOnlyMeshes = this._thinEffectLayer._includedOnlyMeshes;
    if (includedOnlyMeshes.length) {
      for (index = 0; index < includedOnlyMeshes.length; index++) {
        const mesh = this._scene.getMeshByUniqueId(includedOnlyMeshes[index]);
        if (mesh) {
          serializationObject.includedMeshes.push(mesh.id);
        }
      }
    }
    serializationObject.excludedMeshes = [];
    const excludedMeshes = this._thinEffectLayer._excludedMeshes;
    if (excludedMeshes.length) {
      for (index = 0; index < excludedMeshes.length; index++) {
        const mesh = this._scene.getMeshByUniqueId(excludedMeshes[index]);
        if (mesh) {
          serializationObject.excludedMeshes.push(mesh.id);
        }
      }
    }
    return serializationObject;
  }
  /**
   * Creates a Glow Layer from parsed glow layer data
   * @param parsedGlowLayer defines glow layer data
   * @param scene defines the current scene
   * @param rootUrl defines the root URL containing the glow layer information
   * @returns a parsed Glow Layer
   */
  static Parse(parsedGlowLayer, scene, rootUrl) {
    const gl = SerializationHelper.Parse(() => new _GlowLayer(parsedGlowLayer.name, scene, parsedGlowLayer.options), parsedGlowLayer, scene, rootUrl);
    let index;
    for (index = 0; index < parsedGlowLayer.excludedMeshes.length; index++) {
      const mesh = scene.getMeshById(parsedGlowLayer.excludedMeshes[index]);
      if (mesh) {
        gl.addExcludedMesh(mesh);
      }
    }
    for (index = 0; index < parsedGlowLayer.includedMeshes.length; index++) {
      const mesh = scene.getMeshById(parsedGlowLayer.includedMeshes[index]);
      if (mesh) {
        gl.addIncludedOnlyMesh(mesh);
      }
    }
    return gl;
  }
};
GlowLayer.DefaultBlurKernelSize = 32;
GlowLayer.DefaultTextureRatio = 0.5;
__decorate([
  serialize()
], GlowLayer.prototype, "blurKernelSize", null);
__decorate([
  serialize()
], GlowLayer.prototype, "intensity", null);
__decorate([
  serialize("options")
], GlowLayer.prototype, "_options", void 0);
RegisterClass("BABYLON.GlowLayer", GlowLayer);
export {
  GlowLayer
};
//# sourceMappingURL=@babylonjs_core_Layers_glowLayer.js.map
