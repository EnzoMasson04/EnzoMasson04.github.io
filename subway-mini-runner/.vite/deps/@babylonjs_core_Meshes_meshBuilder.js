import {
  PushMaterial
} from "./chunk-ASZ2EMQJ.js";
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
  AbstractMesh,
  TransformNode,
  VertexData,
  createYieldingScheduler,
  runCoroutineAsync,
  runCoroutineSync
} from "./chunk-HJ3SAD4Z.js";
import {
  BindBonesParameters,
  BindFogParameters,
  BindLogDepth,
  BindMorphTargetParameters,
  BindSceneUniformBuffer,
  BoundingInfo,
  Material,
  PrepareAttributesForBakedVertexAnimation,
  PrepareDefinesAndAttributesForMorphTargets,
  PushAttributesForInstances,
  SubMesh,
  addClipPlaneUniforms,
  bindClipPlane,
  extractMinAndMax,
  prepareStringDefinesForClipPlanes
} from "./chunk-5RWR7C5P.js";
import {
  Texture,
  useOpenGLOrientationForUV
} from "./chunk-YB2OV3US.js";
import "./chunk-2YRX745D.js";
import {
  SceneComponentConstants
} from "./chunk-OR4V6S2U.js";
import {
  Buffer,
  CopyFloatData,
  VertexBuffer
} from "./chunk-JYV5EUUU.js";
import "./chunk-DAQCNZDC.js";
import "./chunk-WZM6GV37.js";
import {
  Node
} from "./chunk-HI5D57IO.js";
import {
  AsyncLoop,
  DeepCopier,
  Tools
} from "./chunk-S7FLS6J4.js";
import "./chunk-VLQF4VVG.js";
import {
  Path2,
  Path3D
} from "./chunk-NBZIJBQN.js";
import "./chunk-2SNQ3HEF.js";
import "./chunk-QXJOWFYZ.js";
import "./chunk-2ROLPC73.js";
import "./chunk-56R6SLXN.js";
import "./chunk-XPCOJVRL.js";
import "./chunk-IIRLJDXL.js";
import {
  Axis
} from "./chunk-M6X33RZV.js";
import {
  SerializationHelper,
  Tags
} from "./chunk-SVMC4EBE.js";
import {
  WebRequest
} from "./chunk-PIASBTZO.js";
import {
  Matrix,
  Quaternion,
  TmpVectors,
  Vector2,
  Vector3,
  Vector4
} from "./chunk-NSAPKY2D.js";
import {
  _WarnImport
} from "./chunk-WEEGRZSP.js";
import {
  Logger
} from "./chunk-U2ZTKOT3.js";
import {
  EngineStore,
  Observable
} from "./chunk-XPTICEO2.js";
import "./chunk-SEACPUNZ.js";
import {
  Color3,
  Color4
} from "./chunk-5AJSY7TL.js";
import {
  Epsilon,
  PHI
} from "./chunk-EFRFZ7OU.js";
import {
  GetClass,
  RegisterClass
} from "./chunk-P24HYHXQ.js";
import {
  HighestCommonFactor,
  Lerp
} from "./chunk-DSTTD374.js";

// node_modules/@babylonjs/core/Loading/sceneLoaderFlags.js
var SceneLoaderFlags = class _SceneLoaderFlags {
  /**
   * Gets or sets a boolean indicating if entire scene must be loaded even if scene contains incremental data
   */
  static get ForceFullSceneLoadingForIncremental() {
    return _SceneLoaderFlags._ForceFullSceneLoadingForIncremental;
  }
  static set ForceFullSceneLoadingForIncremental(value) {
    _SceneLoaderFlags._ForceFullSceneLoadingForIncremental = value;
  }
  /**
   * Gets or sets a boolean indicating if loading screen must be displayed while loading a scene
   */
  static get ShowLoadingScreen() {
    return _SceneLoaderFlags._ShowLoadingScreen;
  }
  static set ShowLoadingScreen(value) {
    _SceneLoaderFlags._ShowLoadingScreen = value;
  }
  /**
   * Defines the current logging level (while loading the scene)
   * @ignorenaming
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static get loggingLevel() {
    return _SceneLoaderFlags._LoggingLevel;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static set loggingLevel(value) {
    _SceneLoaderFlags._LoggingLevel = value;
  }
  /**
   * Gets or set a boolean indicating if matrix weights must be cleaned upon loading
   */
  static get CleanBoneMatrixWeights() {
    return _SceneLoaderFlags._CleanBoneMatrixWeights;
  }
  static set CleanBoneMatrixWeights(value) {
    _SceneLoaderFlags._CleanBoneMatrixWeights = value;
  }
};
SceneLoaderFlags._ForceFullSceneLoadingForIncremental = false;
SceneLoaderFlags._ShowLoadingScreen = true;
SceneLoaderFlags._CleanBoneMatrixWeights = false;
SceneLoaderFlags._LoggingLevel = 0;

// node_modules/@babylonjs/core/Meshes/geometry.js
var Geometry = class _Geometry {
  /**
   *  Gets or sets the Bias Vector to apply on the bounding elements (box/sphere), the max extend is computed as v += v * bias.x + bias.y, the min is computed as v -= v * bias.x + bias.y
   */
  get boundingBias() {
    return this._boundingBias;
  }
  /**
   *  Gets or sets the Bias Vector to apply on the bounding elements (box/sphere), the max extend is computed as v += v * bias.x + bias.y, the min is computed as v -= v * bias.x + bias.y
   */
  set boundingBias(value) {
    if (this._boundingBias) {
      this._boundingBias.copyFrom(value);
    } else {
      this._boundingBias = value.clone();
    }
    this._updateBoundingInfo(true, null);
  }
  /**
   * Static function used to attach a new empty geometry to a mesh
   * @param mesh defines the mesh to attach the geometry to
   * @returns the new Geometry
   */
  static CreateGeometryForMesh(mesh) {
    const geometry = new _Geometry(_Geometry.RandomId(), mesh.getScene());
    geometry.applyToMesh(mesh);
    return geometry;
  }
  /** Get the list of meshes using this geometry */
  get meshes() {
    return this._meshes;
  }
  /**
   * Creates a new geometry
   * @param id defines the unique ID
   * @param scene defines the hosting scene
   * @param vertexData defines the VertexData used to get geometry data
   * @param updatable defines if geometry must be updatable (false by default)
   * @param mesh defines the mesh that will be associated with the geometry
   */
  constructor(id, scene, vertexData, updatable = false, mesh = null) {
    this.delayLoadState = 0;
    this._totalVertices = 0;
    this._isDisposed = false;
    this._extend = {
      minimum: new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE),
      maximum: new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)
    };
    this._indexBufferIsUpdatable = false;
    this._positionsCache = [];
    this._parentContainer = null;
    this.useBoundingInfoFromGeometry = false;
    this._scene = scene || EngineStore.LastCreatedScene;
    if (!this._scene) {
      return;
    }
    this.id = id;
    this.uniqueId = this._scene.getUniqueId();
    this._engine = this._scene.getEngine();
    this._meshes = [];
    this._vertexBuffers = {};
    this._indices = [];
    this._updatable = updatable;
    if (vertexData) {
      this.setAllVerticesData(vertexData, updatable);
    } else {
      this._totalVertices = 0;
    }
    if (this._engine.getCaps().vertexArrayObject) {
      this._vertexArrayObjects = {};
    }
    if (mesh) {
      this.applyToMesh(mesh);
      mesh.computeWorldMatrix(true);
    }
  }
  /**
   * Gets the current extend of the geometry
   */
  get extend() {
    return this._extend;
  }
  /**
   * Gets the hosting scene
   * @returns the hosting Scene
   */
  getScene() {
    return this._scene;
  }
  /**
   * Gets the hosting engine
   * @returns the hosting Engine
   */
  getEngine() {
    return this._engine;
  }
  /**
   * Defines if the geometry is ready to use
   * @returns true if the geometry is ready to be used
   */
  isReady() {
    return this.delayLoadState === 1 || this.delayLoadState === 0;
  }
  /**
   * Gets a value indicating that the geometry should not be serialized
   */
  get doNotSerialize() {
    for (let index = 0; index < this._meshes.length; index++) {
      if (!this._meshes[index].doNotSerialize) {
        return false;
      }
    }
    return true;
  }
  /** @internal */
  _rebuild() {
    if (this._vertexArrayObjects) {
      this._vertexArrayObjects = {};
    }
    if (this._meshes.length !== 0 && this._indices) {
      this._indexBuffer = this._engine.createIndexBuffer(this._indices, this._updatable, "Geometry_" + this.id + "_IndexBuffer");
    }
    const buffers = /* @__PURE__ */ new Set();
    for (const key in this._vertexBuffers) {
      buffers.add(this._vertexBuffers[key].getWrapperBuffer());
    }
    buffers.forEach((buffer) => {
      buffer._rebuild();
    });
  }
  /**
   * Affects all geometry data in one call
   * @param vertexData defines the geometry data
   * @param updatable defines if the geometry must be flagged as updatable (false as default)
   */
  setAllVerticesData(vertexData, updatable) {
    vertexData.applyToGeometry(this, updatable);
    this._notifyUpdate();
  }
  /**
   * Set specific vertex data
   * @param kind defines the data kind (Position, normal, etc...)
   * @param data defines the vertex data to use
   * @param updatable defines if the vertex must be flagged as updatable (false as default)
   * @param stride defines the stride to use (0 by default). This value is deduced from the kind value if not specified
   */
  setVerticesData(kind, data, updatable = false, stride) {
    if (updatable && Array.isArray(data)) {
      data = new Float32Array(data);
    }
    const buffer = new VertexBuffer(this._engine, data, kind, {
      updatable,
      postponeInternalCreation: this._meshes.length === 0,
      stride,
      label: "Geometry_" + this.id + "_" + kind
    });
    this.setVerticesBuffer(buffer);
  }
  /**
   * Removes a specific vertex data
   * @param kind defines the data kind (Position, normal, etc...)
   */
  removeVerticesData(kind) {
    if (this._vertexBuffers[kind]) {
      this._vertexBuffers[kind].dispose();
      delete this._vertexBuffers[kind];
    }
    if (this._vertexArrayObjects) {
      this._disposeVertexArrayObjects();
    }
  }
  /**
   * Affect a vertex buffer to the geometry. the vertexBuffer.getKind() function is used to determine where to store the data
   * @param buffer defines the vertex buffer to use
   * @param totalVertices defines the total number of vertices for position kind (could be null)
   * @param disposeExistingBuffer disposes the existing buffer, if any (default: true)
   */
  setVerticesBuffer(buffer, totalVertices = null, disposeExistingBuffer = true) {
    const kind = buffer.getKind();
    if (this._vertexBuffers[kind] && disposeExistingBuffer) {
      this._vertexBuffers[kind].dispose();
    }
    if (buffer._buffer) {
      buffer._buffer._increaseReferences();
    }
    this._vertexBuffers[kind] = buffer;
    const meshes = this._meshes;
    const numOfMeshes = meshes.length;
    if (kind === VertexBuffer.PositionKind) {
      this._totalVertices = totalVertices ?? buffer._maxVerticesCount;
      this._updateExtend(buffer.getFloatData(this._totalVertices));
      this._resetPointsArrayCache();
      const minimum = this._extend && this._extend.minimum || new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
      const maximum = this._extend && this._extend.maximum || new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
      for (let index = 0; index < numOfMeshes; index++) {
        const mesh = meshes[index];
        mesh.buildBoundingInfo(minimum, maximum);
        mesh._createGlobalSubMesh(mesh.isUnIndexed);
        mesh.computeWorldMatrix(true);
        mesh.synchronizeInstances();
      }
    }
    this._notifyUpdate(kind);
  }
  /**
   * Update a specific vertex buffer
   * This function will directly update the underlying DataBuffer according to the passed numeric array or Float32Array
   * It will do nothing if the buffer is not updatable
   * @param kind defines the data kind (Position, normal, etc...)
   * @param data defines the data to use
   * @param offset defines the offset in the target buffer where to store the data
   * @param useBytes set to true if the offset is in bytes
   */
  updateVerticesDataDirectly(kind, data, offset, useBytes = false) {
    const vertexBuffer = this.getVertexBuffer(kind);
    if (!vertexBuffer) {
      return;
    }
    vertexBuffer.updateDirectly(data, offset, useBytes);
    this._notifyUpdate(kind);
  }
  /**
   * Update a specific vertex buffer
   * This function will create a new buffer if the current one is not updatable
   * @param kind defines the data kind (Position, normal, etc...)
   * @param data defines the data to use
   * @param updateExtends defines if the geometry extends must be recomputed (false by default)
   */
  updateVerticesData(kind, data, updateExtends = false) {
    const vertexBuffer = this.getVertexBuffer(kind);
    if (!vertexBuffer) {
      return;
    }
    vertexBuffer.update(data);
    if (kind === VertexBuffer.PositionKind) {
      this._updateBoundingInfo(updateExtends, data);
    }
    this._notifyUpdate(kind);
  }
  _updateBoundingInfo(updateExtends, data) {
    if (updateExtends) {
      this._updateExtend(data);
    }
    this._resetPointsArrayCache();
    if (updateExtends) {
      const meshes = this._meshes;
      for (const mesh of meshes) {
        if (mesh.hasBoundingInfo) {
          mesh.getBoundingInfo().reConstruct(this._extend.minimum, this._extend.maximum);
        } else {
          mesh.buildBoundingInfo(this._extend.minimum, this._extend.maximum);
        }
        const subMeshes = mesh.subMeshes;
        for (const subMesh of subMeshes) {
          subMesh.refreshBoundingInfo();
        }
      }
    }
  }
  /**
   * @internal
   */
  _bind(effect, indexToBind, overrideVertexBuffers, overrideVertexArrayObjects) {
    if (!effect) {
      return;
    }
    if (indexToBind === void 0) {
      indexToBind = this._indexBuffer;
    }
    const vbs = this.getVertexBuffers();
    if (!vbs) {
      return;
    }
    if (indexToBind != this._indexBuffer || !this._vertexArrayObjects && !overrideVertexArrayObjects) {
      this._engine.bindBuffers(vbs, indexToBind, effect, overrideVertexBuffers);
      return;
    }
    const vaos = overrideVertexArrayObjects ? overrideVertexArrayObjects : this._vertexArrayObjects;
    const engine = this._engine;
    if (!vaos[effect.key]) {
      vaos[effect.key] = engine.recordVertexArrayObject(vbs, indexToBind, effect, overrideVertexBuffers);
    }
    engine.bindVertexArrayObject(vaos[effect.key], indexToBind);
  }
  /**
   * Gets total number of vertices
   * @returns the total number of vertices
   */
  getTotalVertices() {
    if (!this.isReady()) {
      return 0;
    }
    return this._totalVertices;
  }
  /**
   * Gets a specific vertex data attached to this geometry. Float data is constructed if the vertex buffer data cannot be returned directly.
   * @param kind defines the data kind (Position, normal, etc...)
   * @param copyWhenShared defines if the returned array must be cloned upon returning it if the current geometry is shared between multiple meshes
   * @param forceCopy defines a boolean indicating that the returned array must be cloned upon returning it
   * @returns a float array containing vertex data
   */
  getVerticesData(kind, copyWhenShared, forceCopy) {
    const vertexBuffer = this.getVertexBuffer(kind);
    if (!vertexBuffer) {
      return null;
    }
    return vertexBuffer.getFloatData(this._totalVertices, forceCopy || copyWhenShared && this._meshes.length !== 1);
  }
  /**
   * Copies the requested vertex data kind into the given vertex data map. Float data is constructed if the map doesn't have the data.
   * @param kind defines the data kind (Position, normal, etc...)
   * @param vertexData defines the map that stores the resulting data
   */
  copyVerticesData(kind, vertexData) {
    const vertexBuffer = this.getVertexBuffer(kind);
    if (!vertexBuffer) {
      return;
    }
    vertexData[kind] || (vertexData[kind] = new Float32Array(this._totalVertices * vertexBuffer.getSize()));
    const data = vertexBuffer.getData();
    if (data) {
      CopyFloatData(data, vertexBuffer.getSize(), vertexBuffer.type, vertexBuffer.byteOffset, vertexBuffer.byteStride, vertexBuffer.normalized, this._totalVertices, vertexData[kind]);
    }
  }
  /**
   * Returns a boolean defining if the vertex data for the requested `kind` is updatable
   * @param kind defines the data kind (Position, normal, etc...)
   * @returns true if the vertex buffer with the specified kind is updatable
   */
  isVertexBufferUpdatable(kind) {
    const vb = this._vertexBuffers[kind];
    if (!vb) {
      return false;
    }
    return vb.isUpdatable();
  }
  /**
   * Gets a specific vertex buffer
   * @param kind defines the data kind (Position, normal, etc...)
   * @returns a VertexBuffer
   */
  getVertexBuffer(kind) {
    if (!this.isReady()) {
      return null;
    }
    return this._vertexBuffers[kind];
  }
  /**
   * Returns all vertex buffers
   * @returns an object holding all vertex buffers indexed by kind
   */
  getVertexBuffers() {
    if (!this.isReady()) {
      return null;
    }
    return this._vertexBuffers;
  }
  /**
   * Gets a boolean indicating if specific vertex buffer is present
   * @param kind defines the data kind (Position, normal, etc...)
   * @returns true if data is present
   */
  isVerticesDataPresent(kind) {
    if (!this._vertexBuffers) {
      if (this._delayInfo) {
        return this._delayInfo.indexOf(kind) !== -1;
      }
      return false;
    }
    return this._vertexBuffers[kind] !== void 0;
  }
  /**
   * Gets a list of all attached data kinds (Position, normal, etc...)
   * @returns a list of string containing all kinds
   */
  getVerticesDataKinds() {
    const result = [];
    let kind;
    if (!this._vertexBuffers && this._delayInfo) {
      for (kind in this._delayInfo) {
        result.push(kind);
      }
    } else {
      for (kind in this._vertexBuffers) {
        result.push(kind);
      }
    }
    return result;
  }
  /**
   * Update index buffer
   * @param indices defines the indices to store in the index buffer
   * @param offset defines the offset in the target buffer where to store the data
   * @param gpuMemoryOnly defines a boolean indicating that only the GPU memory must be updated leaving the CPU version of the indices unchanged (false by default)
   */
  updateIndices(indices, offset, gpuMemoryOnly = false) {
    if (!this._indexBuffer) {
      return;
    }
    if (!this._indexBufferIsUpdatable) {
      this.setIndices(indices, null, true);
    } else {
      const needToUpdateSubMeshes = indices.length !== this._indices.length;
      if (!gpuMemoryOnly) {
        this._indices = indices.slice();
      }
      this._engine.updateDynamicIndexBuffer(this._indexBuffer, indices, offset);
      if (needToUpdateSubMeshes) {
        for (const mesh of this._meshes) {
          mesh._createGlobalSubMesh(true);
        }
      }
    }
  }
  /**
   * Sets the index buffer for this geometry.
   * @param indexBuffer Defines the index buffer to use for this geometry
   * @param totalVertices Defines the total number of vertices used by the buffer
   * @param totalIndices Defines the total number of indices in the index buffer
   * @param is32Bits Defines if the indices are 32 bits. If null (default), the value is guessed from the number of vertices
   */
  setIndexBuffer(indexBuffer, totalVertices, totalIndices, is32Bits = null) {
    this._indices = [];
    this._indexBufferIsUpdatable = false;
    this._indexBuffer = indexBuffer;
    this._totalVertices = totalVertices;
    this._totalIndices = totalIndices;
    if (is32Bits === null) {
      indexBuffer.is32Bits = totalVertices > 65535;
    } else {
      indexBuffer.is32Bits = is32Bits;
    }
    for (const mesh of this._meshes) {
      mesh._createGlobalSubMesh(true);
      mesh.synchronizeInstances();
    }
    this._notifyUpdate();
  }
  /**
   * Creates a new index buffer
   * @param indices defines the indices to store in the index buffer
   * @param totalVertices defines the total number of vertices (could be null)
   * @param updatable defines if the index buffer must be flagged as updatable (false by default)
   * @param dontForceSubMeshRecreation defines a boolean indicating that we don't want to force the recreation of sub-meshes if we don't have to (false by default)
   */
  setIndices(indices, totalVertices = null, updatable = false, dontForceSubMeshRecreation = false) {
    if (this._indexBuffer) {
      this._engine._releaseBuffer(this._indexBuffer);
    }
    this._indices = indices;
    this._indexBufferIsUpdatable = updatable;
    if (this._meshes.length !== 0 && this._indices) {
      this._indexBuffer = this._engine.createIndexBuffer(this._indices, updatable, "Geometry_" + this.id + "_IndexBuffer");
    }
    if (totalVertices != void 0) {
      this._totalVertices = totalVertices;
    }
    for (const mesh of this._meshes) {
      mesh._createGlobalSubMesh(!dontForceSubMeshRecreation);
      mesh.synchronizeInstances();
    }
    this._notifyUpdate();
  }
  /**
   * Return the total number of indices
   * @returns the total number of indices
   */
  getTotalIndices() {
    if (!this.isReady()) {
      return 0;
    }
    return this._totalIndices !== void 0 ? this._totalIndices : this._indices.length;
  }
  /**
   * Gets the index buffer array
   * @param copyWhenShared defines if the returned array must be cloned upon returning it if the current geometry is shared between multiple meshes
   * @param forceCopy defines a boolean indicating that the returned array must be cloned upon returning it
   * @returns the index buffer array
   */
  getIndices(copyWhenShared, forceCopy) {
    if (!this.isReady()) {
      return null;
    }
    const orig = this._indices;
    if (!forceCopy && (!copyWhenShared || this._meshes.length === 1)) {
      return orig;
    } else {
      return orig.slice();
    }
  }
  /**
   * Gets the index buffer
   * @returns the index buffer
   */
  getIndexBuffer() {
    if (!this.isReady()) {
      return null;
    }
    return this._indexBuffer;
  }
  /**
   * @internal
   */
  _releaseVertexArrayObject(effect = null) {
    if (!effect || !this._vertexArrayObjects) {
      return;
    }
    if (this._vertexArrayObjects[effect.key]) {
      this._engine.releaseVertexArrayObject(this._vertexArrayObjects[effect.key]);
      delete this._vertexArrayObjects[effect.key];
    }
  }
  /**
   * Release the associated resources for a specific mesh
   * @param mesh defines the source mesh
   * @param shouldDispose defines if the geometry must be disposed if there is no more mesh pointing to it
   */
  releaseForMesh(mesh, shouldDispose) {
    const meshes = this._meshes;
    const index = meshes.indexOf(mesh);
    if (index === -1) {
      return;
    }
    meshes.splice(index, 1);
    if (this._vertexArrayObjects) {
      mesh._invalidateInstanceVertexArrayObject();
    }
    mesh._geometry = null;
    if (meshes.length === 0 && shouldDispose) {
      this.dispose();
    }
  }
  /**
   * Apply current geometry to a given mesh
   * @param mesh defines the mesh to apply geometry to
   */
  applyToMesh(mesh) {
    if (mesh._geometry === this) {
      return;
    }
    const previousGeometry = mesh._geometry;
    if (previousGeometry) {
      previousGeometry.releaseForMesh(mesh);
    }
    if (this._vertexArrayObjects) {
      mesh._invalidateInstanceVertexArrayObject();
    }
    const meshes = this._meshes;
    mesh._geometry = this;
    mesh._internalAbstractMeshDataInfo._positions = null;
    this._scene.pushGeometry(this);
    meshes.push(mesh);
    if (this.isReady()) {
      this._applyToMesh(mesh);
    } else if (this._boundingInfo) {
      mesh.setBoundingInfo(this._boundingInfo);
    }
  }
  _updateExtend(data = null) {
    if (this.useBoundingInfoFromGeometry && this._boundingInfo) {
      this._extend = {
        minimum: this._boundingInfo.minimum.clone(),
        maximum: this._boundingInfo.maximum.clone()
      };
    } else {
      if (!data) {
        data = this.getVerticesData(VertexBuffer.PositionKind);
        if (!data) {
          return;
        }
      }
      this._extend = extractMinAndMax(data, 0, this._totalVertices, this.boundingBias, 3);
    }
  }
  _applyToMesh(mesh) {
    const numOfMeshes = this._meshes.length;
    for (const kind in this._vertexBuffers) {
      if (numOfMeshes === 1) {
        this._vertexBuffers[kind].create();
      }
      if (kind === VertexBuffer.PositionKind) {
        if (!this._extend) {
          this._updateExtend();
        }
        mesh.buildBoundingInfo(this._extend.minimum, this._extend.maximum);
        mesh._createGlobalSubMesh(mesh.isUnIndexed);
        mesh._updateBoundingInfo();
      }
    }
    if (numOfMeshes === 1 && this._indices && this._indices.length > 0) {
      this._indexBuffer = this._engine.createIndexBuffer(this._indices, this._updatable, "Geometry_" + this.id + "_IndexBuffer");
    }
    mesh._syncGeometryWithMorphTargetManager();
    mesh.synchronizeInstances();
  }
  _notifyUpdate(kind) {
    if (this.onGeometryUpdated) {
      this.onGeometryUpdated(this, kind);
    }
    if (this._vertexArrayObjects) {
      this._disposeVertexArrayObjects();
    }
    for (const mesh of this._meshes) {
      mesh._markSubMeshesAsAttributesDirty();
    }
  }
  /**
   * Load the geometry if it was flagged as delay loaded
   * @param scene defines the hosting scene
   * @param onLoaded defines a callback called when the geometry is loaded
   */
  load(scene, onLoaded) {
    if (this.delayLoadState === 2) {
      return;
    }
    if (this.isReady()) {
      if (onLoaded) {
        onLoaded();
      }
      return;
    }
    this.delayLoadState = 2;
    this._queueLoad(scene, onLoaded);
  }
  _queueLoad(scene, onLoaded) {
    if (!this.delayLoadingFile) {
      return;
    }
    scene.addPendingData(this);
    scene._loadFile(this.delayLoadingFile, (data) => {
      if (!this._delayLoadingFunction) {
        return;
      }
      this._delayLoadingFunction(JSON.parse(data), this);
      this.delayLoadState = 1;
      this._delayInfo = [];
      scene.removePendingData(this);
      const meshes = this._meshes;
      const numOfMeshes = meshes.length;
      for (let index = 0; index < numOfMeshes; index++) {
        this._applyToMesh(meshes[index]);
      }
      if (onLoaded) {
        onLoaded();
      }
    }, void 0, true);
  }
  /**
   * Invert the geometry to move from a right handed system to a left handed one.
   */
  toLeftHanded() {
    const tIndices = this.getIndices(false);
    if (tIndices != null && tIndices.length > 0) {
      for (let i = 0; i < tIndices.length; i += 3) {
        const tTemp = tIndices[i + 0];
        tIndices[i + 0] = tIndices[i + 2];
        tIndices[i + 2] = tTemp;
      }
      this.setIndices(tIndices);
    }
    const tPositions = this.getVerticesData(VertexBuffer.PositionKind, false);
    if (tPositions != null && tPositions.length > 0) {
      for (let i = 0; i < tPositions.length; i += 3) {
        tPositions[i + 2] = -tPositions[i + 2];
      }
      this.setVerticesData(VertexBuffer.PositionKind, tPositions, false);
    }
    const tNormals = this.getVerticesData(VertexBuffer.NormalKind, false);
    if (tNormals != null && tNormals.length > 0) {
      for (let i = 0; i < tNormals.length; i += 3) {
        tNormals[i + 2] = -tNormals[i + 2];
      }
      this.setVerticesData(VertexBuffer.NormalKind, tNormals, false);
    }
  }
  // Cache
  /** @internal */
  _resetPointsArrayCache() {
    this._positions = null;
  }
  /** @internal */
  _generatePointsArray() {
    if (this._positions) {
      return true;
    }
    const data = this.getVerticesData(VertexBuffer.PositionKind);
    if (!data || data.length === 0) {
      return false;
    }
    for (let index = this._positionsCache.length * 3, arrayIdx = this._positionsCache.length; index < data.length; index += 3, ++arrayIdx) {
      this._positionsCache[arrayIdx] = Vector3.FromArray(data, index);
    }
    for (let index = 0, arrayIdx = 0; index < data.length; index += 3, ++arrayIdx) {
      this._positionsCache[arrayIdx].set(data[0 + index], data[1 + index], data[2 + index]);
    }
    this._positionsCache.length = data.length / 3;
    this._positions = this._positionsCache;
    return true;
  }
  /**
   * Gets a value indicating if the geometry is disposed
   * @returns true if the geometry was disposed
   */
  isDisposed() {
    return this._isDisposed;
  }
  _disposeVertexArrayObjects() {
    if (this._vertexArrayObjects) {
      for (const kind in this._vertexArrayObjects) {
        this._engine.releaseVertexArrayObject(this._vertexArrayObjects[kind]);
      }
      this._vertexArrayObjects = {};
      const meshes = this._meshes;
      const numOfMeshes = meshes.length;
      for (let index = 0; index < numOfMeshes; index++) {
        meshes[index]._invalidateInstanceVertexArrayObject();
      }
    }
  }
  /**
   * Free all associated resources
   */
  dispose() {
    const meshes = this._meshes;
    const numOfMeshes = meshes.length;
    let index;
    for (index = 0; index < numOfMeshes; index++) {
      this.releaseForMesh(meshes[index]);
    }
    this._meshes.length = 0;
    this._disposeVertexArrayObjects();
    for (const kind in this._vertexBuffers) {
      this._vertexBuffers[kind].dispose();
    }
    this._vertexBuffers = {};
    this._totalVertices = 0;
    if (this._indexBuffer) {
      this._engine._releaseBuffer(this._indexBuffer);
    }
    this._indexBuffer = null;
    this._indices = [];
    this.delayLoadState = 0;
    this.delayLoadingFile = null;
    this._delayLoadingFunction = null;
    this._delayInfo = [];
    this._boundingInfo = null;
    this._scene.removeGeometry(this);
    if (this._parentContainer) {
      const index2 = this._parentContainer.geometries.indexOf(this);
      if (index2 > -1) {
        this._parentContainer.geometries.splice(index2, 1);
      }
      this._parentContainer = null;
    }
    this._isDisposed = true;
  }
  /**
   * Clone the current geometry into a new geometry
   * @param id defines the unique ID of the new geometry
   * @returns a new geometry object
   */
  copy(id) {
    const vertexData = new VertexData();
    vertexData.indices = [];
    const indices = this.getIndices();
    if (indices) {
      for (let index = 0; index < indices.length; index++) {
        vertexData.indices.push(indices[index]);
      }
    }
    let updatable = false;
    let stopChecking = false;
    let kind;
    for (kind in this._vertexBuffers) {
      const data = this.getVerticesData(kind);
      if (data) {
        if (data instanceof Float32Array) {
          vertexData.set(new Float32Array(data), kind);
        } else {
          vertexData.set(data.slice(0), kind);
        }
        if (!stopChecking) {
          const vb = this.getVertexBuffer(kind);
          if (vb) {
            updatable = vb.isUpdatable();
            stopChecking = !updatable;
          }
        }
      }
    }
    const geometry = new _Geometry(id, this._scene, vertexData, updatable);
    geometry.delayLoadState = this.delayLoadState;
    geometry.delayLoadingFile = this.delayLoadingFile;
    geometry._delayLoadingFunction = this._delayLoadingFunction;
    for (kind in this._delayInfo) {
      geometry._delayInfo = geometry._delayInfo || [];
      geometry._delayInfo.push(kind);
    }
    geometry._boundingInfo = new BoundingInfo(this._extend.minimum, this._extend.maximum);
    return geometry;
  }
  /**
   * Serialize the current geometry info (and not the vertices data) into a JSON object
   * @returns a JSON representation of the current geometry data (without the vertices data)
   */
  serialize() {
    const serializationObject = {};
    serializationObject.id = this.id;
    serializationObject.uniqueId = this.uniqueId;
    serializationObject.updatable = this._updatable;
    if (Tags && Tags.HasTags(this)) {
      serializationObject.tags = Tags.GetTags(this);
    }
    return serializationObject;
  }
  _toNumberArray(origin) {
    if (Array.isArray(origin)) {
      return origin;
    } else {
      return Array.prototype.slice.call(origin);
    }
  }
  /**
   * Release any memory retained by the cached data on the Geometry.
   *
   * Call this function to reduce memory footprint of the mesh.
   * Vertex buffers will not store CPU data anymore (this will prevent picking, collisions or physics to work correctly)
   */
  clearCachedData() {
    this._indices = [];
    this._resetPointsArrayCache();
    for (const vbName in this._vertexBuffers) {
      if (!Object.prototype.hasOwnProperty.call(this._vertexBuffers, vbName)) {
        continue;
      }
      this._vertexBuffers[vbName]._buffer._data = null;
    }
  }
  /**
   * Serialize all vertices data into a JSON object
   * @returns a JSON representation of the current geometry data
   */
  serializeVerticeData() {
    const serializationObject = this.serialize();
    if (this.isVerticesDataPresent(VertexBuffer.PositionKind)) {
      serializationObject.positions = this._toNumberArray(this.getVerticesData(VertexBuffer.PositionKind));
      if (this.isVertexBufferUpdatable(VertexBuffer.PositionKind)) {
        serializationObject.positions._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.NormalKind)) {
      serializationObject.normals = this._toNumberArray(this.getVerticesData(VertexBuffer.NormalKind));
      if (this.isVertexBufferUpdatable(VertexBuffer.NormalKind)) {
        serializationObject.normals._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.TangentKind)) {
      serializationObject.tangents = this._toNumberArray(this.getVerticesData(VertexBuffer.TangentKind));
      if (this.isVertexBufferUpdatable(VertexBuffer.TangentKind)) {
        serializationObject.tangents._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.UVKind)) {
      serializationObject.uvs = this._toNumberArray(this.getVerticesData(VertexBuffer.UVKind));
      if (this.isVertexBufferUpdatable(VertexBuffer.UVKind)) {
        serializationObject.uvs._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.UV2Kind)) {
      serializationObject.uvs2 = this._toNumberArray(this.getVerticesData(VertexBuffer.UV2Kind));
      if (this.isVertexBufferUpdatable(VertexBuffer.UV2Kind)) {
        serializationObject.uvs2._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.UV3Kind)) {
      serializationObject.uvs3 = this._toNumberArray(this.getVerticesData(VertexBuffer.UV3Kind));
      if (this.isVertexBufferUpdatable(VertexBuffer.UV3Kind)) {
        serializationObject.uvs3._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.UV4Kind)) {
      serializationObject.uvs4 = this._toNumberArray(this.getVerticesData(VertexBuffer.UV4Kind));
      if (this.isVertexBufferUpdatable(VertexBuffer.UV4Kind)) {
        serializationObject.uvs4._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.UV5Kind)) {
      serializationObject.uvs5 = this._toNumberArray(this.getVerticesData(VertexBuffer.UV5Kind));
      if (this.isVertexBufferUpdatable(VertexBuffer.UV5Kind)) {
        serializationObject.uvs5._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.UV6Kind)) {
      serializationObject.uvs6 = this._toNumberArray(this.getVerticesData(VertexBuffer.UV6Kind));
      if (this.isVertexBufferUpdatable(VertexBuffer.UV6Kind)) {
        serializationObject.uvs6._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.ColorKind)) {
      serializationObject.colors = this._toNumberArray(this.getVerticesData(VertexBuffer.ColorKind));
      if (this.isVertexBufferUpdatable(VertexBuffer.ColorKind)) {
        serializationObject.colors._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.MatricesIndicesKind)) {
      serializationObject.matricesIndices = this._toNumberArray(this.getVerticesData(VertexBuffer.MatricesIndicesKind));
      serializationObject.matricesIndices._isExpanded = true;
      if (this.isVertexBufferUpdatable(VertexBuffer.MatricesIndicesKind)) {
        serializationObject.matricesIndices._updatable = true;
      }
    }
    if (this.isVerticesDataPresent(VertexBuffer.MatricesWeightsKind)) {
      serializationObject.matricesWeights = this._toNumberArray(this.getVerticesData(VertexBuffer.MatricesWeightsKind));
      if (this.isVertexBufferUpdatable(VertexBuffer.MatricesWeightsKind)) {
        serializationObject.matricesWeights._updatable = true;
      }
    }
    serializationObject.indices = this._toNumberArray(this.getIndices());
    return serializationObject;
  }
  // Statics
  /**
   * Extracts a clone of a mesh geometry
   * @param mesh defines the source mesh
   * @param id defines the unique ID of the new geometry object
   * @returns the new geometry object
   */
  static ExtractFromMesh(mesh, id) {
    const geometry = mesh._geometry;
    if (!geometry) {
      return null;
    }
    return geometry.copy(id);
  }
  /**
   * You should now use Tools.RandomId(), this method is still here for legacy reasons.
   * Implementation from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#answer-2117523
   * Be aware Math.random() could cause collisions, but:
   * "All but 6 of the 128 bits of the ID are randomly generated, which means that for any two ids, there's a 1 in 2^^122 (or 5.3x10^^36) chance they'll collide"
   * @returns a string containing a new GUID
   */
  static RandomId() {
    return Tools.RandomId();
  }
  static _GetGeometryByLoadedUniqueId(uniqueId, scene) {
    for (let index = 0; index < scene.geometries.length; index++) {
      if (scene.geometries[index]._loadedUniqueId === uniqueId) {
        return scene.geometries[index];
      }
    }
    return null;
  }
  /**
   * @internal
   */
  static _ImportGeometry(parsedGeometry, mesh) {
    const scene = mesh.getScene();
    const geometryUniqueId = parsedGeometry.geometryUniqueId;
    const geometryId = parsedGeometry.geometryId;
    if (geometryUniqueId || geometryId) {
      const geometry = geometryUniqueId ? this._GetGeometryByLoadedUniqueId(geometryUniqueId, scene) : scene.getGeometryById(geometryId);
      if (geometry) {
        geometry.applyToMesh(mesh);
      }
    } else if (parsedGeometry instanceof ArrayBuffer) {
      const binaryInfo = mesh._binaryInfo;
      if (binaryInfo.positionsAttrDesc && binaryInfo.positionsAttrDesc.count > 0) {
        const positionsData = new Float32Array(parsedGeometry, binaryInfo.positionsAttrDesc.offset, binaryInfo.positionsAttrDesc.count);
        mesh.setVerticesData(VertexBuffer.PositionKind, positionsData, false);
      }
      if (binaryInfo.normalsAttrDesc && binaryInfo.normalsAttrDesc.count > 0) {
        const normalsData = new Float32Array(parsedGeometry, binaryInfo.normalsAttrDesc.offset, binaryInfo.normalsAttrDesc.count);
        mesh.setVerticesData(VertexBuffer.NormalKind, normalsData, false);
      }
      if (binaryInfo.tangetsAttrDesc && binaryInfo.tangetsAttrDesc.count > 0) {
        const tangentsData = new Float32Array(parsedGeometry, binaryInfo.tangetsAttrDesc.offset, binaryInfo.tangetsAttrDesc.count);
        mesh.setVerticesData(VertexBuffer.TangentKind, tangentsData, false);
      }
      if (binaryInfo.uvsAttrDesc && binaryInfo.uvsAttrDesc.count > 0) {
        const uvsData = new Float32Array(parsedGeometry, binaryInfo.uvsAttrDesc.offset, binaryInfo.uvsAttrDesc.count);
        if (useOpenGLOrientationForUV) {
          for (let index = 1; index < uvsData.length; index += 2) {
            uvsData[index] = 1 - uvsData[index];
          }
        }
        mesh.setVerticesData(VertexBuffer.UVKind, uvsData, false);
      }
      if (binaryInfo.uvs2AttrDesc && binaryInfo.uvs2AttrDesc.count > 0) {
        const uvs2Data = new Float32Array(parsedGeometry, binaryInfo.uvs2AttrDesc.offset, binaryInfo.uvs2AttrDesc.count);
        if (useOpenGLOrientationForUV) {
          for (let index = 1; index < uvs2Data.length; index += 2) {
            uvs2Data[index] = 1 - uvs2Data[index];
          }
        }
        mesh.setVerticesData(VertexBuffer.UV2Kind, uvs2Data, false);
      }
      if (binaryInfo.uvs3AttrDesc && binaryInfo.uvs3AttrDesc.count > 0) {
        const uvs3Data = new Float32Array(parsedGeometry, binaryInfo.uvs3AttrDesc.offset, binaryInfo.uvs3AttrDesc.count);
        if (useOpenGLOrientationForUV) {
          for (let index = 1; index < uvs3Data.length; index += 2) {
            uvs3Data[index] = 1 - uvs3Data[index];
          }
        }
        mesh.setVerticesData(VertexBuffer.UV3Kind, uvs3Data, false);
      }
      if (binaryInfo.uvs4AttrDesc && binaryInfo.uvs4AttrDesc.count > 0) {
        const uvs4Data = new Float32Array(parsedGeometry, binaryInfo.uvs4AttrDesc.offset, binaryInfo.uvs4AttrDesc.count);
        if (useOpenGLOrientationForUV) {
          for (let index = 1; index < uvs4Data.length; index += 2) {
            uvs4Data[index] = 1 - uvs4Data[index];
          }
        }
        mesh.setVerticesData(VertexBuffer.UV4Kind, uvs4Data, false);
      }
      if (binaryInfo.uvs5AttrDesc && binaryInfo.uvs5AttrDesc.count > 0) {
        const uvs5Data = new Float32Array(parsedGeometry, binaryInfo.uvs5AttrDesc.offset, binaryInfo.uvs5AttrDesc.count);
        if (useOpenGLOrientationForUV) {
          for (let index = 1; index < uvs5Data.length; index += 2) {
            uvs5Data[index] = 1 - uvs5Data[index];
          }
        }
        mesh.setVerticesData(VertexBuffer.UV5Kind, uvs5Data, false);
      }
      if (binaryInfo.uvs6AttrDesc && binaryInfo.uvs6AttrDesc.count > 0) {
        const uvs6Data = new Float32Array(parsedGeometry, binaryInfo.uvs6AttrDesc.offset, binaryInfo.uvs6AttrDesc.count);
        if (useOpenGLOrientationForUV) {
          for (let index = 1; index < uvs6Data.length; index += 2) {
            uvs6Data[index] = 1 - uvs6Data[index];
          }
        }
        mesh.setVerticesData(VertexBuffer.UV6Kind, uvs6Data, false);
      }
      if (binaryInfo.colorsAttrDesc && binaryInfo.colorsAttrDesc.count > 0) {
        const colorsData = new Float32Array(parsedGeometry, binaryInfo.colorsAttrDesc.offset, binaryInfo.colorsAttrDesc.count);
        mesh.setVerticesData(VertexBuffer.ColorKind, colorsData, false, binaryInfo.colorsAttrDesc.stride);
      }
      if (binaryInfo.matricesIndicesAttrDesc && binaryInfo.matricesIndicesAttrDesc.count > 0) {
        const matricesIndicesData = new Int32Array(parsedGeometry, binaryInfo.matricesIndicesAttrDesc.offset, binaryInfo.matricesIndicesAttrDesc.count);
        const floatIndices = [];
        for (let i = 0; i < matricesIndicesData.length; i++) {
          const index = matricesIndicesData[i];
          floatIndices.push(index & 255);
          floatIndices.push((index & 65280) >> 8);
          floatIndices.push((index & 16711680) >> 16);
          floatIndices.push(index >> 24 & 255);
        }
        mesh.setVerticesData(VertexBuffer.MatricesIndicesKind, floatIndices, false);
      }
      if (binaryInfo.matricesIndicesExtraAttrDesc && binaryInfo.matricesIndicesExtraAttrDesc.count > 0) {
        const matricesIndicesData = new Int32Array(parsedGeometry, binaryInfo.matricesIndicesExtraAttrDesc.offset, binaryInfo.matricesIndicesExtraAttrDesc.count);
        const floatIndices = [];
        for (let i = 0; i < matricesIndicesData.length; i++) {
          const index = matricesIndicesData[i];
          floatIndices.push(index & 255);
          floatIndices.push((index & 65280) >> 8);
          floatIndices.push((index & 16711680) >> 16);
          floatIndices.push(index >> 24 & 255);
        }
        mesh.setVerticesData(VertexBuffer.MatricesIndicesExtraKind, floatIndices, false);
      }
      if (binaryInfo.matricesWeightsAttrDesc && binaryInfo.matricesWeightsAttrDesc.count > 0) {
        const matricesWeightsData = new Float32Array(parsedGeometry, binaryInfo.matricesWeightsAttrDesc.offset, binaryInfo.matricesWeightsAttrDesc.count);
        mesh.setVerticesData(VertexBuffer.MatricesWeightsKind, matricesWeightsData, false);
      }
      if (binaryInfo.indicesAttrDesc && binaryInfo.indicesAttrDesc.count > 0) {
        const indicesData = new Int32Array(parsedGeometry, binaryInfo.indicesAttrDesc.offset, binaryInfo.indicesAttrDesc.count);
        mesh.setIndices(indicesData, null);
      }
      if (binaryInfo.subMeshesAttrDesc && binaryInfo.subMeshesAttrDesc.count > 0) {
        const subMeshesData = new Int32Array(parsedGeometry, binaryInfo.subMeshesAttrDesc.offset, binaryInfo.subMeshesAttrDesc.count * 5);
        mesh.subMeshes = [];
        for (let i = 0; i < binaryInfo.subMeshesAttrDesc.count; i++) {
          const materialIndex = subMeshesData[i * 5 + 0];
          const verticesStart = subMeshesData[i * 5 + 1];
          const verticesCount = subMeshesData[i * 5 + 2];
          const indexStart = subMeshesData[i * 5 + 3];
          const indexCount = subMeshesData[i * 5 + 4];
          SubMesh.AddToMesh(materialIndex, verticesStart, verticesCount, indexStart, indexCount, mesh);
        }
      }
    } else if (parsedGeometry.positions && parsedGeometry.normals && parsedGeometry.indices) {
      mesh.setVerticesData(VertexBuffer.PositionKind, parsedGeometry.positions, parsedGeometry.positions._updatable);
      mesh.setVerticesData(VertexBuffer.NormalKind, parsedGeometry.normals, parsedGeometry.normals._updatable);
      if (parsedGeometry.tangents) {
        mesh.setVerticesData(VertexBuffer.TangentKind, parsedGeometry.tangents, parsedGeometry.tangents._updatable);
      }
      if (parsedGeometry.uvs) {
        mesh.setVerticesData(VertexBuffer.UVKind, parsedGeometry.uvs, parsedGeometry.uvs._updatable);
      }
      if (parsedGeometry.uvs2) {
        mesh.setVerticesData(VertexBuffer.UV2Kind, parsedGeometry.uvs2, parsedGeometry.uvs2._updatable);
      }
      if (parsedGeometry.uvs3) {
        mesh.setVerticesData(VertexBuffer.UV3Kind, parsedGeometry.uvs3, parsedGeometry.uvs3._updatable);
      }
      if (parsedGeometry.uvs4) {
        mesh.setVerticesData(VertexBuffer.UV4Kind, parsedGeometry.uvs4, parsedGeometry.uvs4._updatable);
      }
      if (parsedGeometry.uvs5) {
        mesh.setVerticesData(VertexBuffer.UV5Kind, parsedGeometry.uvs5, parsedGeometry.uvs5._updatable);
      }
      if (parsedGeometry.uvs6) {
        mesh.setVerticesData(VertexBuffer.UV6Kind, parsedGeometry.uvs6, parsedGeometry.uvs6._updatable);
      }
      if (parsedGeometry.colors) {
        mesh.setVerticesData(VertexBuffer.ColorKind, Color4.CheckColors4(parsedGeometry.colors, parsedGeometry.positions.length / 3), parsedGeometry.colors._updatable);
      }
      if (parsedGeometry.matricesIndices) {
        if (!parsedGeometry.matricesIndices._isExpanded) {
          const floatIndices = [];
          for (let i = 0; i < parsedGeometry.matricesIndices.length; i++) {
            const matricesIndex = parsedGeometry.matricesIndices[i];
            floatIndices.push(matricesIndex & 255);
            floatIndices.push((matricesIndex & 65280) >> 8);
            floatIndices.push((matricesIndex & 16711680) >> 16);
            floatIndices.push(matricesIndex >> 24 & 255);
          }
          mesh.setVerticesData(VertexBuffer.MatricesIndicesKind, floatIndices, parsedGeometry.matricesIndices._updatable);
        } else {
          delete parsedGeometry.matricesIndices._isExpanded;
          mesh.setVerticesData(VertexBuffer.MatricesIndicesKind, parsedGeometry.matricesIndices, parsedGeometry.matricesIndices._updatable);
        }
      }
      if (parsedGeometry.matricesIndicesExtra) {
        if (!parsedGeometry.matricesIndicesExtra._isExpanded) {
          const floatIndices = [];
          for (let i = 0; i < parsedGeometry.matricesIndicesExtra.length; i++) {
            const matricesIndex = parsedGeometry.matricesIndicesExtra[i];
            floatIndices.push(matricesIndex & 255);
            floatIndices.push((matricesIndex & 65280) >> 8);
            floatIndices.push((matricesIndex & 16711680) >> 16);
            floatIndices.push(matricesIndex >> 24 & 255);
          }
          mesh.setVerticesData(VertexBuffer.MatricesIndicesExtraKind, floatIndices, parsedGeometry.matricesIndicesExtra._updatable);
        } else {
          delete parsedGeometry.matricesIndices._isExpanded;
          mesh.setVerticesData(VertexBuffer.MatricesIndicesExtraKind, parsedGeometry.matricesIndicesExtra, parsedGeometry.matricesIndicesExtra._updatable);
        }
      }
      if (parsedGeometry.matricesWeights) {
        _Geometry._CleanMatricesWeights(parsedGeometry, mesh);
        mesh.setVerticesData(VertexBuffer.MatricesWeightsKind, parsedGeometry.matricesWeights, parsedGeometry.matricesWeights._updatable);
      }
      if (parsedGeometry.matricesWeightsExtra) {
        mesh.setVerticesData(VertexBuffer.MatricesWeightsExtraKind, parsedGeometry.matricesWeightsExtra, parsedGeometry.matricesWeights._updatable);
      }
      mesh.setIndices(parsedGeometry.indices, null);
    }
    if (parsedGeometry.subMeshes) {
      mesh.subMeshes = [];
      for (let subIndex = 0; subIndex < parsedGeometry.subMeshes.length; subIndex++) {
        const parsedSubMesh = parsedGeometry.subMeshes[subIndex];
        SubMesh.AddToMesh(parsedSubMesh.materialIndex, parsedSubMesh.verticesStart, parsedSubMesh.verticesCount, parsedSubMesh.indexStart, parsedSubMesh.indexCount, mesh);
      }
    }
    if (mesh._shouldGenerateFlatShading) {
      mesh.convertToFlatShadedMesh();
      mesh._shouldGenerateFlatShading = false;
    }
    mesh.computeWorldMatrix(true);
    scene.onMeshImportedObservable.notifyObservers(mesh);
  }
  static _CleanMatricesWeights(parsedGeometry, mesh) {
    const epsilon = 1e-3;
    if (!SceneLoaderFlags.CleanBoneMatrixWeights) {
      return;
    }
    let noInfluenceBoneIndex = 0;
    if (parsedGeometry.skeletonId > -1) {
      const skeleton = mesh.getScene().getLastSkeletonById(parsedGeometry.skeletonId);
      if (!skeleton) {
        return;
      }
      noInfluenceBoneIndex = skeleton.bones.length;
    } else {
      return;
    }
    const matricesIndices = mesh.getVerticesData(VertexBuffer.MatricesIndicesKind);
    const matricesIndicesExtra = mesh.getVerticesData(VertexBuffer.MatricesIndicesExtraKind);
    const matricesWeights = parsedGeometry.matricesWeights;
    const matricesWeightsExtra = parsedGeometry.matricesWeightsExtra;
    const influencers = parsedGeometry.numBoneInfluencer;
    const size = matricesWeights.length;
    for (let i = 0; i < size; i += 4) {
      let weight = 0;
      let firstZeroWeight = -1;
      for (let j = 0; j < 4; j++) {
        const w = matricesWeights[i + j];
        weight += w;
        if (w < epsilon && firstZeroWeight < 0) {
          firstZeroWeight = j;
        }
      }
      if (matricesWeightsExtra) {
        for (let j = 0; j < 4; j++) {
          const w = matricesWeightsExtra[i + j];
          weight += w;
          if (w < epsilon && firstZeroWeight < 0) {
            firstZeroWeight = j + 4;
          }
        }
      }
      if (firstZeroWeight < 0 || firstZeroWeight > influencers - 1) {
        firstZeroWeight = influencers - 1;
      }
      if (weight > epsilon) {
        const mweight = 1 / weight;
        for (let j = 0; j < 4; j++) {
          matricesWeights[i + j] *= mweight;
        }
        if (matricesWeightsExtra) {
          for (let j = 0; j < 4; j++) {
            matricesWeightsExtra[i + j] *= mweight;
          }
        }
      } else {
        if (firstZeroWeight >= 4) {
          matricesWeightsExtra[i + firstZeroWeight - 4] = 1 - weight;
          matricesIndicesExtra[i + firstZeroWeight - 4] = noInfluenceBoneIndex;
        } else {
          matricesWeights[i + firstZeroWeight] = 1 - weight;
          matricesIndices[i + firstZeroWeight] = noInfluenceBoneIndex;
        }
      }
    }
    mesh.setVerticesData(VertexBuffer.MatricesIndicesKind, matricesIndices);
    if (parsedGeometry.matricesWeightsExtra) {
      mesh.setVerticesData(VertexBuffer.MatricesIndicesExtraKind, matricesIndicesExtra);
    }
  }
  /**
   * Create a new geometry from persisted data (Using .babylon file format)
   * @param parsedVertexData defines the persisted data
   * @param scene defines the hosting scene
   * @param rootUrl defines the root url to use to load assets (like delayed data)
   * @returns the new geometry object
   */
  static Parse(parsedVertexData, scene, rootUrl) {
    const geometry = new _Geometry(parsedVertexData.id, scene, void 0, parsedVertexData.updatable);
    geometry._loadedUniqueId = parsedVertexData.uniqueId;
    if (Tags) {
      Tags.AddTagsTo(geometry, parsedVertexData.tags);
    }
    if (parsedVertexData.delayLoadingFile) {
      geometry.delayLoadState = 4;
      geometry.delayLoadingFile = rootUrl + parsedVertexData.delayLoadingFile;
      geometry._boundingInfo = new BoundingInfo(Vector3.FromArray(parsedVertexData.boundingBoxMinimum), Vector3.FromArray(parsedVertexData.boundingBoxMaximum));
      geometry._delayInfo = [];
      if (parsedVertexData.hasUVs) {
        geometry._delayInfo.push(VertexBuffer.UVKind);
      }
      if (parsedVertexData.hasUVs2) {
        geometry._delayInfo.push(VertexBuffer.UV2Kind);
      }
      if (parsedVertexData.hasUVs3) {
        geometry._delayInfo.push(VertexBuffer.UV3Kind);
      }
      if (parsedVertexData.hasUVs4) {
        geometry._delayInfo.push(VertexBuffer.UV4Kind);
      }
      if (parsedVertexData.hasUVs5) {
        geometry._delayInfo.push(VertexBuffer.UV5Kind);
      }
      if (parsedVertexData.hasUVs6) {
        geometry._delayInfo.push(VertexBuffer.UV6Kind);
      }
      if (parsedVertexData.hasColors) {
        geometry._delayInfo.push(VertexBuffer.ColorKind);
      }
      if (parsedVertexData.hasMatricesIndices) {
        geometry._delayInfo.push(VertexBuffer.MatricesIndicesKind);
      }
      if (parsedVertexData.hasMatricesWeights) {
        geometry._delayInfo.push(VertexBuffer.MatricesWeightsKind);
      }
      geometry._delayLoadingFunction = VertexData.ImportVertexData;
    } else {
      VertexData.ImportVertexData(parsedVertexData, geometry);
    }
    scene.pushGeometry(geometry, true);
    return geometry;
  }
};

// node_modules/@babylonjs/core/Materials/multiMaterial.js
var MultiMaterial = class _MultiMaterial extends Material {
  /**
   * Gets or Sets the list of Materials used within the multi material.
   * They need to be ordered according to the submeshes order in the associated mesh
   */
  get subMaterials() {
    return this._subMaterials;
  }
  set subMaterials(value) {
    this._subMaterials = value;
    this._hookArray(value);
  }
  /**
   * Function used to align with Node.getChildren()
   * @returns the list of Materials used within the multi material
   */
  getChildren() {
    return this.subMaterials;
  }
  /**
   * Instantiates a new Multi Material
   * A multi-material is used to apply different materials to different parts of the same object without the need of
   * separate meshes. This can be use to improve performances.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/multiMaterials
   * @param name Define the name in the scene
   * @param scene Define the scene the material belongs to
   */
  constructor(name, scene) {
    super(name, scene, true);
    this._waitingSubMaterialsUniqueIds = [];
    this.getScene().addMultiMaterial(this);
    this.subMaterials = [];
    this._storeEffectOnSubMeshes = true;
  }
  _hookArray(array) {
    const oldPush = array.push;
    array.push = (...items) => {
      const result = oldPush.apply(array, items);
      this._markAllSubMeshesAsTexturesDirty();
      return result;
    };
    const oldSplice = array.splice;
    array.splice = (index, deleteCount) => {
      const deleted = oldSplice.apply(array, [index, deleteCount]);
      this._markAllSubMeshesAsTexturesDirty();
      return deleted;
    };
  }
  /**
   * Get one of the submaterial by its index in the submaterials array
   * @param index The index to look the sub material at
   * @returns The Material if the index has been defined
   */
  getSubMaterial(index) {
    if (index < 0 || index >= this.subMaterials.length) {
      return this.getScene().defaultMaterial;
    }
    return this.subMaterials[index];
  }
  /**
   * Get the list of active textures for the whole sub materials list.
   * @returns All the textures that will be used during the rendering
   */
  getActiveTextures() {
    return super.getActiveTextures().concat(...this.subMaterials.map((subMaterial) => {
      if (subMaterial) {
        return subMaterial.getActiveTextures();
      } else {
        return [];
      }
    }));
  }
  /**
   * Specifies if any sub-materials of this multi-material use a given texture.
   * @param texture Defines the texture to check against this multi-material's sub-materials.
   * @returns A boolean specifying if any sub-material of this multi-material uses the texture.
   */
  hasTexture(texture) {
    var _a;
    if (super.hasTexture(texture)) {
      return true;
    }
    for (let i = 0; i < this.subMaterials.length; i++) {
      if ((_a = this.subMaterials[i]) == null ? void 0 : _a.hasTexture(texture)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Gets the current class name of the material e.g. "MultiMaterial"
   * Mainly use in serialization.
   * @returns the class name
   */
  getClassName() {
    return "MultiMaterial";
  }
  /**
   * Checks if the material is ready to render the requested sub mesh
   * @param mesh Define the mesh the submesh belongs to
   * @param subMesh Define the sub mesh to look readiness for
   * @param useInstances Define whether or not the material is used with instances
   * @returns true if ready, otherwise false
   */
  isReadyForSubMesh(mesh, subMesh, useInstances) {
    for (let index = 0; index < this.subMaterials.length; index++) {
      const subMaterial = this.subMaterials[index];
      if (subMaterial) {
        if (subMaterial._storeEffectOnSubMeshes) {
          if (!subMaterial.isReadyForSubMesh(mesh, subMesh, useInstances)) {
            return false;
          }
          continue;
        }
        if (!subMaterial.isReady(mesh)) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Clones the current material and its related sub materials
   * @param name Define the name of the newly cloned material
   * @param cloneChildren Define if submaterial will be cloned or shared with the parent instance
   * @returns the cloned material
   */
  clone(name, cloneChildren) {
    const newMultiMaterial = new _MultiMaterial(name, this.getScene());
    for (let index = 0; index < this.subMaterials.length; index++) {
      let subMaterial = null;
      const current = this.subMaterials[index];
      if (cloneChildren && current) {
        subMaterial = current.clone(name + "-" + current.name);
      } else {
        subMaterial = this.subMaterials[index];
      }
      newMultiMaterial.subMaterials.push(subMaterial);
    }
    return newMultiMaterial;
  }
  /**
   * Serializes the materials into a JSON representation.
   * @returns the JSON representation
   */
  serialize() {
    const serializationObject = {};
    serializationObject.name = this.name;
    serializationObject.id = this.id;
    serializationObject.uniqueId = this.uniqueId;
    if (Tags) {
      serializationObject.tags = Tags.GetTags(this);
    }
    serializationObject.materialsUniqueIds = [];
    serializationObject.materials = [];
    for (let matIndex = 0; matIndex < this.subMaterials.length; matIndex++) {
      const subMat = this.subMaterials[matIndex];
      if (subMat) {
        serializationObject.materialsUniqueIds.push(subMat.uniqueId);
        serializationObject.materials.push(subMat.id);
      } else {
        serializationObject.materialsUniqueIds.push(null);
        serializationObject.materials.push(null);
      }
    }
    return serializationObject;
  }
  /**
   * Dispose the material and release its associated resources
   * @param forceDisposeEffect Define if we want to force disposing the associated effect (if false the shader is not released and could be reuse later on)
   * @param forceDisposeTextures Define if we want to force disposing the associated textures (if false, they will not be disposed and can still be use elsewhere in the app)
   * @param forceDisposeChildren Define if we want to force disposing the associated submaterials (if false, they will not be disposed and can still be use elsewhere in the app)
   */
  dispose(forceDisposeEffect, forceDisposeTextures, forceDisposeChildren) {
    const scene = this.getScene();
    if (!scene) {
      return;
    }
    if (forceDisposeChildren) {
      for (let index2 = 0; index2 < this.subMaterials.length; index2++) {
        const subMaterial = this.subMaterials[index2];
        if (subMaterial) {
          subMaterial.dispose(forceDisposeEffect, forceDisposeTextures);
        }
      }
    }
    const index = scene.multiMaterials.indexOf(this);
    if (index >= 0) {
      scene.multiMaterials.splice(index, 1);
    }
    super.dispose(forceDisposeEffect, forceDisposeTextures);
  }
  /**
   * Creates a MultiMaterial from parsed MultiMaterial data.
   * @param parsedMultiMaterial defines parsed MultiMaterial data.
   * @param scene defines the hosting scene
   * @returns a new MultiMaterial
   */
  static ParseMultiMaterial(parsedMultiMaterial, scene) {
    const multiMaterial = new _MultiMaterial(parsedMultiMaterial.name, scene);
    multiMaterial.id = parsedMultiMaterial.id;
    multiMaterial._loadedUniqueId = parsedMultiMaterial.uniqueId;
    if (Tags) {
      Tags.AddTagsTo(multiMaterial, parsedMultiMaterial.tags);
    }
    if (parsedMultiMaterial.materialsUniqueIds) {
      multiMaterial._waitingSubMaterialsUniqueIds = parsedMultiMaterial.materialsUniqueIds;
    } else {
      parsedMultiMaterial.materials.forEach((subMatId) => multiMaterial.subMaterials.push(scene.getLastMaterialById(subMatId)));
    }
    return multiMaterial;
  }
};
RegisterClass("BABYLON.MultiMaterial", MultiMaterial);

// node_modules/@babylonjs/core/Meshes/meshLODLevel.js
var MeshLODLevel = class {
  /**
   * Creates a new LOD level
   * @param distanceOrScreenCoverage defines either the distance or the screen coverage where this level should start being displayed
   * @param mesh defines the mesh to use to render this level
   */
  constructor(distanceOrScreenCoverage, mesh) {
    this.distanceOrScreenCoverage = distanceOrScreenCoverage;
    this.mesh = mesh;
  }
};

// node_modules/@babylonjs/core/Meshes/mesh.js
var _CreationDataStorage = class {
};
var _InstanceDataStorage = class {
  constructor() {
    this.visibleInstances = {};
    this.batchCache = new _InstancesBatch();
    this.batchCacheReplacementModeInFrozenMode = new _InstancesBatch();
    this.instancesBufferSize = 32 * 16 * 4;
  }
};
var _InstancesBatch = class {
  constructor() {
    this.mustReturn = false;
    this.visibleInstances = new Array();
    this.renderSelf = [];
    this.hardwareInstancedRendering = [];
  }
};
var _ThinInstanceDataStorage = class {
  constructor() {
    this.instancesCount = 0;
    this.matrixBuffer = null;
    this.previousMatrixBuffer = null;
    this.matrixBufferSize = 32 * 16;
    this.matrixData = null;
    this.boundingVectors = [];
    this.worldMatrices = null;
  }
};
var _InternalMeshDataInfo = class {
  constructor() {
    this._areNormalsFrozen = false;
    this._source = null;
    this.meshMap = null;
    this._preActivateId = -1;
    this._LODLevels = new Array();
    this._useLODScreenCoverage = false;
    this._effectiveMaterial = null;
    this._forcedInstanceCount = 0;
    this._overrideRenderingFillMode = null;
  }
};
var meshCreationOptions = {
  source: null,
  parent: null,
  doNotCloneChildren: false,
  clonePhysicsImpostor: true,
  cloneThinInstances: false
};
var Mesh = class _Mesh extends AbstractMesh {
  /**
   * Gets the default side orientation.
   * @param orientation the orientation to value to attempt to get
   * @returns the default orientation
   * @internal
   */
  static _GetDefaultSideOrientation(orientation) {
    return orientation || _Mesh.FRONTSIDE;
  }
  /**
   * Determines if the LOD levels are intended to be calculated using screen coverage (surface area ratio) instead of distance.
   */
  get useLODScreenCoverage() {
    return this._internalMeshDataInfo._useLODScreenCoverage;
  }
  set useLODScreenCoverage(value) {
    this._internalMeshDataInfo._useLODScreenCoverage = value;
    this._sortLODLevels();
  }
  get computeBonesUsingShaders() {
    return this._internalAbstractMeshDataInfo._computeBonesUsingShaders;
  }
  set computeBonesUsingShaders(value) {
    if (this._internalAbstractMeshDataInfo._computeBonesUsingShaders === value) {
      return;
    }
    if (value && this._internalMeshDataInfo._sourcePositions) {
      this.setVerticesData(VertexBuffer.PositionKind, this._internalMeshDataInfo._sourcePositions, true);
      if (this._internalMeshDataInfo._sourceNormals) {
        this.setVerticesData(VertexBuffer.NormalKind, this._internalMeshDataInfo._sourceNormals, true);
      }
      this._internalMeshDataInfo._sourcePositions = null;
      this._internalMeshDataInfo._sourceNormals = null;
    }
    this._internalAbstractMeshDataInfo._computeBonesUsingShaders = value;
    this._markSubMeshesAsAttributesDirty();
  }
  /**
   * An event triggered before rendering the mesh
   */
  get onBeforeRenderObservable() {
    if (!this._internalMeshDataInfo._onBeforeRenderObservable) {
      this._internalMeshDataInfo._onBeforeRenderObservable = new Observable();
    }
    return this._internalMeshDataInfo._onBeforeRenderObservable;
  }
  /**
   * An event triggered before binding the mesh
   */
  get onBeforeBindObservable() {
    if (!this._internalMeshDataInfo._onBeforeBindObservable) {
      this._internalMeshDataInfo._onBeforeBindObservable = new Observable();
    }
    return this._internalMeshDataInfo._onBeforeBindObservable;
  }
  /**
   * An event triggered after rendering the mesh
   */
  get onAfterRenderObservable() {
    if (!this._internalMeshDataInfo._onAfterRenderObservable) {
      this._internalMeshDataInfo._onAfterRenderObservable = new Observable();
    }
    return this._internalMeshDataInfo._onAfterRenderObservable;
  }
  /**
   * An event triggeredbetween rendering pass when using separateCullingPass = true
   */
  get onBetweenPassObservable() {
    if (!this._internalMeshDataInfo._onBetweenPassObservable) {
      this._internalMeshDataInfo._onBetweenPassObservable = new Observable();
    }
    return this._internalMeshDataInfo._onBetweenPassObservable;
  }
  /**
   * An event triggered before drawing the mesh
   */
  get onBeforeDrawObservable() {
    if (!this._internalMeshDataInfo._onBeforeDrawObservable) {
      this._internalMeshDataInfo._onBeforeDrawObservable = new Observable();
    }
    return this._internalMeshDataInfo._onBeforeDrawObservable;
  }
  /**
   * Sets a callback to call before drawing the mesh. It is recommended to use onBeforeDrawObservable instead
   */
  set onBeforeDraw(callback) {
    if (this._onBeforeDrawObserver) {
      this.onBeforeDrawObservable.remove(this._onBeforeDrawObserver);
    }
    this._onBeforeDrawObserver = this.onBeforeDrawObservable.add(callback);
  }
  get hasInstances() {
    return this.instances.length > 0;
  }
  get hasThinInstances() {
    return (this.forcedInstanceCount || this._thinInstanceDataStorage.instancesCount || 0) > 0;
  }
  /**
   * Gets or sets the forced number of instances to display.
   * If 0 (default value), the number of instances is not forced and depends on the draw type
   * (regular / instance / thin instances mesh)
   */
  get forcedInstanceCount() {
    return this._internalMeshDataInfo._forcedInstanceCount;
  }
  set forcedInstanceCount(count) {
    this._internalMeshDataInfo._forcedInstanceCount = count;
  }
  /**
   * Use this property to change the original side orientation defined at construction time
   * Material.sideOrientation will override this value if set
   * User will still be able to change the material sideOrientation afterwards if they really need it
   */
  get sideOrientation() {
    return this._internalMeshDataInfo._sideOrientation;
  }
  set sideOrientation(value) {
    this._internalMeshDataInfo._sideOrientation = value;
    this._internalAbstractMeshDataInfo._sideOrientationHint = this._scene.useRightHandedSystem && value === 1 || !this._scene.useRightHandedSystem && value === 0;
  }
  /**
   * @deprecated Please use sideOrientation instead.
   * @see https://doc.babylonjs.com/breaking-changes#7110
   */
  get overrideMaterialSideOrientation() {
    return this.sideOrientation;
  }
  set overrideMaterialSideOrientation(value) {
    this.sideOrientation = value;
    if (this.material) {
      this.material.sideOrientation = null;
    }
  }
  /**
   * Use this property to override the Material's fillMode value
   */
  get overrideRenderingFillMode() {
    return this._internalMeshDataInfo._overrideRenderingFillMode;
  }
  set overrideRenderingFillMode(fillMode) {
    this._internalMeshDataInfo._overrideRenderingFillMode = fillMode;
  }
  get material() {
    return this._internalAbstractMeshDataInfo._material;
  }
  set material(value) {
    if (value && (this.material && this.material.sideOrientation === null || this._internalAbstractMeshDataInfo._sideOrientationHint)) {
      value.sideOrientation = null;
    }
    this._setMaterial(value);
  }
  /**
   * Gets the source mesh (the one used to clone this one from)
   */
  get source() {
    return this._internalMeshDataInfo._source;
  }
  /**
   * Gets the list of clones of this mesh
   * The scene must have been constructed with useClonedMeshMap=true for this to work!
   * Note that useClonedMeshMap=true is the default setting
   */
  get cloneMeshMap() {
    return this._internalMeshDataInfo.meshMap;
  }
  /**
   * Gets or sets a boolean indicating that this mesh does not use index buffer
   */
  get isUnIndexed() {
    return this._unIndexed;
  }
  set isUnIndexed(value) {
    if (this._unIndexed !== value) {
      this._unIndexed = value;
      this._markSubMeshesAsAttributesDirty();
    }
  }
  /** Gets the array buffer used to store the instanced buffer used for instances' world matrices */
  get worldMatrixInstancedBuffer() {
    return this._instanceDataStorage.instancesData;
  }
  /** Gets the array buffer used to store the instanced buffer used for instances' previous world matrices */
  get previousWorldMatrixInstancedBuffer() {
    return this._instanceDataStorage.instancesPreviousData;
  }
  /** Gets or sets a boolean indicating that the update of the instance buffer of the world matrices is manual */
  get manualUpdateOfWorldMatrixInstancedBuffer() {
    return this._instanceDataStorage.manualUpdate;
  }
  set manualUpdateOfWorldMatrixInstancedBuffer(value) {
    this._instanceDataStorage.manualUpdate = value;
  }
  /** Gets or sets a boolean indicating that the update of the instance buffer of the world matrices is manual */
  get manualUpdateOfPreviousWorldMatrixInstancedBuffer() {
    return this._instanceDataStorage.previousManualUpdate;
  }
  set manualUpdateOfPreviousWorldMatrixInstancedBuffer(value) {
    this._instanceDataStorage.previousManualUpdate = value;
  }
  /** Gets or sets a boolean indicating that the update of the instance buffer of the world matrices must be performed in all cases (and notably even in frozen mode) */
  get forceWorldMatrixInstancedBufferUpdate() {
    return this._instanceDataStorage.forceMatrixUpdates;
  }
  set forceWorldMatrixInstancedBufferUpdate(value) {
    this._instanceDataStorage.forceMatrixUpdates = value;
  }
  _copySource(source, doNotCloneChildren, clonePhysicsImpostor = true, cloneThinInstances = false) {
    var _a, _b;
    const scene = this.getScene();
    if (source._geometry) {
      source._geometry.applyToMesh(this);
    }
    DeepCopier.DeepCopy(source, this, [
      "name",
      "material",
      "skeleton",
      "instances",
      "parent",
      "uniqueId",
      "source",
      "metadata",
      "morphTargetManager",
      "hasInstances",
      "worldMatrixInstancedBuffer",
      "previousWorldMatrixInstancedBuffer",
      "hasLODLevels",
      "geometry",
      "isBlocked",
      "areNormalsFrozen",
      "facetNb",
      "isFacetDataEnabled",
      "lightSources",
      "useBones",
      "isAnInstance",
      "collider",
      "edgesRenderer",
      "forward",
      "up",
      "right",
      "absolutePosition",
      "absoluteScaling",
      "absoluteRotationQuaternion",
      "isWorldMatrixFrozen",
      "nonUniformScaling",
      "behaviors",
      "worldMatrixFromCache",
      "hasThinInstances",
      "cloneMeshMap",
      "hasBoundingInfo",
      "physicsBody",
      "physicsImpostor"
    ], ["_poseMatrix"]);
    this._internalMeshDataInfo._source = source;
    if (scene.useClonedMeshMap) {
      if (!source._internalMeshDataInfo.meshMap) {
        source._internalMeshDataInfo.meshMap = {};
      }
      source._internalMeshDataInfo.meshMap[this.uniqueId] = this;
    }
    this._originalBuilderSideOrientation = source._originalBuilderSideOrientation;
    this._creationDataStorage = source._creationDataStorage;
    if (source._ranges) {
      const ranges = source._ranges;
      for (const name in ranges) {
        if (!Object.prototype.hasOwnProperty.call(ranges, name)) {
          continue;
        }
        if (!ranges[name]) {
          continue;
        }
        this.createAnimationRange(name, ranges[name].from, ranges[name].to);
      }
    }
    if (source.metadata && source.metadata.clone) {
      this.metadata = source.metadata.clone();
    } else {
      this.metadata = source.metadata;
    }
    this._internalMetadata = source._internalMetadata;
    if (Tags && Tags.HasTags(source)) {
      Tags.AddTagsTo(this, Tags.GetTags(source, true));
    }
    this.setEnabled(source.isEnabled(false));
    this.parent = source.parent;
    this.setPivotMatrix(source.getPivotMatrix(), this._postMultiplyPivotMatrix);
    this.id = this.name + "." + source.id;
    this.material = source.material;
    if (!doNotCloneChildren) {
      const directDescendants = source.getDescendants(true);
      for (let index = 0; index < directDescendants.length; index++) {
        const child = directDescendants[index];
        if (child._isMesh) {
          meshCreationOptions.parent = this;
          meshCreationOptions.doNotCloneChildren = doNotCloneChildren;
          meshCreationOptions.clonePhysicsImpostor = clonePhysicsImpostor;
          meshCreationOptions.cloneThinInstances = cloneThinInstances;
          child.clone(this.name + "." + child.name, meshCreationOptions);
        } else if (child.clone) {
          child.clone(this.name + "." + child.name, this);
        }
      }
    }
    if (source.morphTargetManager) {
      this.morphTargetManager = source.morphTargetManager;
    }
    if (scene.getPhysicsEngine) {
      const physicsEngine = scene.getPhysicsEngine();
      if (clonePhysicsImpostor && physicsEngine) {
        if (physicsEngine.getPluginVersion() === 1) {
          const impostor = physicsEngine.getImpostorForPhysicsObject(source);
          if (impostor) {
            this.physicsImpostor = impostor.clone(this);
          }
        } else if (physicsEngine.getPluginVersion() === 2) {
          if (source.physicsBody) {
            source.physicsBody.clone(this);
          }
        }
      }
    }
    for (let index = 0; index < scene.particleSystems.length; index++) {
      const system = scene.particleSystems[index];
      if (system.emitter === source) {
        system.clone(system.name, this);
      }
    }
    this.skeleton = source.skeleton;
    if (cloneThinInstances) {
      if (source._thinInstanceDataStorage.matrixData) {
        this.thinInstanceSetBuffer("matrix", new Float32Array(source._thinInstanceDataStorage.matrixData), 16, !source._thinInstanceDataStorage.matrixBuffer.isUpdatable());
        this._thinInstanceDataStorage.matrixBufferSize = source._thinInstanceDataStorage.matrixBufferSize;
        this._thinInstanceDataStorage.instancesCount = source._thinInstanceDataStorage.instancesCount;
      } else {
        this._thinInstanceDataStorage.matrixBufferSize = source._thinInstanceDataStorage.matrixBufferSize;
      }
      if (source._userThinInstanceBuffersStorage) {
        const userThinInstance = source._userThinInstanceBuffersStorage;
        for (const kind in userThinInstance.data) {
          this.thinInstanceSetBuffer(kind, new Float32Array(userThinInstance.data[kind]), userThinInstance.strides[kind], !((_b = (_a = userThinInstance.vertexBuffers) == null ? void 0 : _a[kind]) == null ? void 0 : _b.isUpdatable()));
          this._userThinInstanceBuffersStorage.sizes[kind] = userThinInstance.sizes[kind];
        }
      }
    }
    this.refreshBoundingInfo(true, true);
    this.computeWorldMatrix(true);
  }
  /** @internal */
  constructor(name, scene = null, parentOrOptions = null, source = null, doNotCloneChildren, clonePhysicsImpostor = true) {
    super(name, scene);
    this._internalMeshDataInfo = new _InternalMeshDataInfo();
    this.delayLoadState = 0;
    this.instances = [];
    this._creationDataStorage = null;
    this._geometry = null;
    this._instanceDataStorage = new _InstanceDataStorage();
    this._thinInstanceDataStorage = new _ThinInstanceDataStorage();
    this._shouldGenerateFlatShading = false;
    this._originalBuilderSideOrientation = _Mesh.DEFAULTSIDE;
    this.ignoreCameraMaxZ = false;
    scene = this.getScene();
    if (this._scene.useRightHandedSystem) {
      this.sideOrientation = 0;
    } else {
      this.sideOrientation = 1;
    }
    this._onBeforeDraw = (isInstance, world, effectiveMaterial) => {
      if (isInstance && effectiveMaterial) {
        if (this._uniformBuffer) {
          this.transferToEffect(world);
        } else {
          effectiveMaterial.bindOnlyWorldMatrix(world);
        }
      }
    };
    let parent = null;
    let cloneThinInstances = false;
    if (parentOrOptions && parentOrOptions._addToSceneRootNodes === void 0) {
      const options = parentOrOptions;
      parent = options.parent ?? null;
      source = options.source ?? null;
      doNotCloneChildren = options.doNotCloneChildren ?? false;
      clonePhysicsImpostor = options.clonePhysicsImpostor ?? true;
      cloneThinInstances = options.cloneThinInstances ?? false;
    } else {
      parent = parentOrOptions;
    }
    if (source) {
      this._copySource(source, doNotCloneChildren, clonePhysicsImpostor, cloneThinInstances);
    }
    if (parent !== null) {
      this.parent = parent;
    }
    this._instanceDataStorage.hardwareInstancedRendering = this.getEngine().getCaps().instancedArrays;
    this._internalMeshDataInfo._onMeshReadyObserverAdded = (observer) => {
      observer.unregisterOnNextCall = true;
      if (this.isReady(true)) {
        this.onMeshReadyObservable.notifyObservers(this);
      } else {
        if (!this._internalMeshDataInfo._checkReadinessObserver) {
          this._internalMeshDataInfo._checkReadinessObserver = this._scene.onBeforeRenderObservable.add(() => {
            if (this.isReady(true)) {
              this._scene.onBeforeRenderObservable.remove(this._internalMeshDataInfo._checkReadinessObserver);
              this._internalMeshDataInfo._checkReadinessObserver = null;
              this.onMeshReadyObservable.notifyObservers(this);
            }
          });
        }
      }
    };
    this.onMeshReadyObservable = new Observable(this._internalMeshDataInfo._onMeshReadyObserverAdded);
    if (source) {
      source.onClonedObservable.notifyObservers(this);
    }
  }
  instantiateHierarchy(newParent = null, options, onNewNodeCreated) {
    const instance = this.getTotalVertices() === 0 || options && options.doNotInstantiate && (options.doNotInstantiate === true || options.doNotInstantiate(this)) ? this.clone("Clone of " + (this.name || this.id), newParent || this.parent, true) : this.createInstance("instance of " + (this.name || this.id));
    instance.parent = newParent || this.parent;
    instance.position = this.position.clone();
    instance.scaling = this.scaling.clone();
    if (this.rotationQuaternion) {
      instance.rotationQuaternion = this.rotationQuaternion.clone();
    } else {
      instance.rotation = this.rotation.clone();
    }
    if (onNewNodeCreated) {
      onNewNodeCreated(this, instance);
    }
    for (const child of this.getChildTransformNodes(true)) {
      if (child.getClassName() === "InstancedMesh" && instance.getClassName() === "Mesh" && child.sourceMesh === this) {
        child.instantiateHierarchy(instance, {
          doNotInstantiate: options && options.doNotInstantiate || false,
          newSourcedMesh: instance
        }, onNewNodeCreated);
      } else {
        child.instantiateHierarchy(instance, options, onNewNodeCreated);
      }
    }
    return instance;
  }
  /**
   * Gets the class name
   * @returns the string "Mesh".
   */
  getClassName() {
    return "Mesh";
  }
  /** @internal */
  get _isMesh() {
    return true;
  }
  /**
   * Returns a description of this mesh
   * @param fullDetails define if full details about this mesh must be used
   * @returns a descriptive string representing this mesh
   */
  toString(fullDetails) {
    let ret = super.toString(fullDetails);
    ret += ", n vertices: " + this.getTotalVertices();
    ret += ", parent: " + (this._waitingParentId ? this._waitingParentId : this.parent ? this.parent.name : "NONE");
    if (this.animations) {
      for (let i = 0; i < this.animations.length; i++) {
        ret += ", animation[0]: " + this.animations[i].toString(fullDetails);
      }
    }
    if (fullDetails) {
      if (this._geometry) {
        const ib = this.getIndices();
        const vb = this.getVerticesData(VertexBuffer.PositionKind);
        if (vb && ib) {
          ret += ", flat shading: " + (vb.length / 3 === ib.length ? "YES" : "NO");
        }
      } else {
        ret += ", flat shading: UNKNOWN";
      }
    }
    return ret;
  }
  /** @internal */
  _unBindEffect() {
    super._unBindEffect();
    for (const instance of this.instances) {
      instance._unBindEffect();
    }
  }
  /**
   * Gets a boolean indicating if this mesh has LOD
   */
  get hasLODLevels() {
    return this._internalMeshDataInfo._LODLevels.length > 0;
  }
  /**
   * Gets the list of MeshLODLevel associated with the current mesh
   * @returns an array of MeshLODLevel
   */
  getLODLevels() {
    return this._internalMeshDataInfo._LODLevels;
  }
  _sortLODLevels() {
    const sortingOrderFactor = this._internalMeshDataInfo._useLODScreenCoverage ? -1 : 1;
    this._internalMeshDataInfo._LODLevels.sort((a, b) => {
      if (a.distanceOrScreenCoverage < b.distanceOrScreenCoverage) {
        return sortingOrderFactor;
      }
      if (a.distanceOrScreenCoverage > b.distanceOrScreenCoverage) {
        return -sortingOrderFactor;
      }
      return 0;
    });
  }
  /**
   * Add a mesh as LOD level triggered at the given distance.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD
   * @param distanceOrScreenCoverage Either distance from the center of the object to show this level or the screen coverage if `useScreenCoverage` is set to `true`.
   * If screen coverage, value is a fraction of the screen's total surface, between 0 and 1.
   * Example Playground for distance https://playground.babylonjs.com/#QE7KM#197
   * Example Playground for screen coverage https://playground.babylonjs.com/#QE7KM#196
   * @param mesh The mesh to be added as LOD level (can be null)
   * @returns This mesh (for chaining)
   */
  addLODLevel(distanceOrScreenCoverage, mesh) {
    if (mesh && mesh._masterMesh) {
      Logger.Warn("You cannot use a mesh as LOD level twice");
      return this;
    }
    const level = new MeshLODLevel(distanceOrScreenCoverage, mesh);
    this._internalMeshDataInfo._LODLevels.push(level);
    if (mesh) {
      mesh._masterMesh = this;
    }
    this._sortLODLevels();
    return this;
  }
  /**
   * Returns the LOD level mesh at the passed distance or null if not found.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD
   * @param distance The distance from the center of the object to show this level
   * @returns a Mesh or `null`
   */
  getLODLevelAtDistance(distance) {
    const internalDataInfo = this._internalMeshDataInfo;
    for (let index = 0; index < internalDataInfo._LODLevels.length; index++) {
      const level = internalDataInfo._LODLevels[index];
      if (level.distanceOrScreenCoverage === distance) {
        return level.mesh;
      }
    }
    return null;
  }
  /**
   * Remove a mesh from the LOD array
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD
   * @param mesh defines the mesh to be removed
   * @returns This mesh (for chaining)
   */
  removeLODLevel(mesh) {
    const internalDataInfo = this._internalMeshDataInfo;
    for (let index = 0; index < internalDataInfo._LODLevels.length; index++) {
      if (internalDataInfo._LODLevels[index].mesh === mesh) {
        internalDataInfo._LODLevels.splice(index, 1);
        if (mesh) {
          mesh._masterMesh = null;
        }
      }
    }
    this._sortLODLevels();
    return this;
  }
  /**
   * Returns the registered LOD mesh distant from the parameter `camera` position if any, else returns the current mesh.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD
   * @param camera defines the camera to use to compute distance
   * @param boundingSphere defines a custom bounding sphere to use instead of the one from this mesh
   * @returns This mesh (for chaining)
   */
  getLOD(camera, boundingSphere) {
    const internalDataInfo = this._internalMeshDataInfo;
    if (!internalDataInfo._LODLevels || internalDataInfo._LODLevels.length === 0) {
      return this;
    }
    const bSphere = boundingSphere || this.getBoundingInfo().boundingSphere;
    const distanceToCamera = camera.mode === Camera.ORTHOGRAPHIC_CAMERA ? camera.minZ : bSphere.centerWorld.subtract(camera.globalPosition).length();
    let compareValue = distanceToCamera;
    let compareSign = 1;
    if (internalDataInfo._useLODScreenCoverage) {
      const screenArea = camera.screenArea;
      let meshArea = bSphere.radiusWorld * camera.minZ / distanceToCamera;
      meshArea = meshArea * meshArea * Math.PI;
      compareValue = meshArea / screenArea;
      compareSign = -1;
    }
    if (compareSign * internalDataInfo._LODLevels[internalDataInfo._LODLevels.length - 1].distanceOrScreenCoverage > compareSign * compareValue) {
      if (this.onLODLevelSelection) {
        this.onLODLevelSelection(compareValue, this, this);
      }
      return this;
    }
    for (let index = 0; index < internalDataInfo._LODLevels.length; index++) {
      const level = internalDataInfo._LODLevels[index];
      if (compareSign * level.distanceOrScreenCoverage < compareSign * compareValue) {
        if (level.mesh) {
          if (level.mesh.delayLoadState === 4) {
            level.mesh._checkDelayState();
            return this;
          }
          if (level.mesh.delayLoadState === 2) {
            return this;
          }
          level.mesh._preActivate();
          level.mesh._updateSubMeshesBoundingInfo(this.worldMatrixFromCache);
        }
        if (this.onLODLevelSelection) {
          this.onLODLevelSelection(compareValue, this, level.mesh);
        }
        return level.mesh;
      }
    }
    if (this.onLODLevelSelection) {
      this.onLODLevelSelection(compareValue, this, this);
    }
    return this;
  }
  /**
   * Gets the mesh internal Geometry object
   */
  get geometry() {
    return this._geometry;
  }
  /**
   * Returns the total number of vertices within the mesh geometry or zero if the mesh has no geometry.
   * @returns the total number of vertices
   */
  getTotalVertices() {
    if (this._geometry === null || this._geometry === void 0) {
      return 0;
    }
    return this._geometry.getTotalVertices();
  }
  /**
   * Returns the content of an associated vertex buffer
   * @param kind defines which buffer to read from (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @param copyWhenShared defines a boolean indicating that if the mesh geometry is shared among some other meshes, the returned array is a copy of the internal one
   * @param forceCopy defines a boolean forcing the copy of the buffer no matter what the value of copyWhenShared is
   * @param bypassInstanceData defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false
   * @returns a FloatArray or null if the mesh has no geometry or no vertex buffer for this kind.
   */
  getVerticesData(kind, copyWhenShared, forceCopy, bypassInstanceData) {
    var _a, _b;
    if (!this._geometry) {
      return null;
    }
    let data = bypassInstanceData ? void 0 : (_b = (_a = this._userInstancedBuffersStorage) == null ? void 0 : _a.vertexBuffers[kind]) == null ? void 0 : _b.getFloatData(
      this.instances.length + 1,
      // +1 because the master mesh is not included in the instances array
      forceCopy || copyWhenShared && this._geometry.meshes.length !== 1
    );
    if (!data) {
      data = this._geometry.getVerticesData(kind, copyWhenShared, forceCopy);
    }
    return data;
  }
  copyVerticesData(kind, vertexData) {
    if (this._geometry) {
      this._geometry.copyVerticesData(kind, vertexData);
    }
  }
  /**
   * Returns the mesh VertexBuffer object from the requested `kind`
   * @param kind defines which buffer to read from (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.NormalKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @param bypassInstanceData defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false
   * @returns a FloatArray or null if the mesh has no vertex buffer for this kind.
   */
  getVertexBuffer(kind, bypassInstanceData) {
    var _a;
    if (!this._geometry) {
      return null;
    }
    return (bypassInstanceData ? void 0 : (_a = this._userInstancedBuffersStorage) == null ? void 0 : _a.vertexBuffers[kind]) ?? this._geometry.getVertexBuffer(kind);
  }
  /**
   * Tests if a specific vertex buffer is associated with this mesh
   * @param kind defines which buffer to check (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.NormalKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @param bypassInstanceData defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false
   * @returns a boolean
   */
  isVerticesDataPresent(kind, bypassInstanceData) {
    var _a;
    if (!this._geometry) {
      if (this._delayInfo) {
        return this._delayInfo.indexOf(kind) !== -1;
      }
      return false;
    }
    return !bypassInstanceData && ((_a = this._userInstancedBuffersStorage) == null ? void 0 : _a.vertexBuffers[kind]) !== void 0 || this._geometry.isVerticesDataPresent(kind);
  }
  /**
   * Returns a boolean defining if the vertex data for the requested `kind` is updatable.
   * @param kind defines which buffer to check (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @param bypassInstanceData defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false
   * @returns a boolean
   */
  isVertexBufferUpdatable(kind, bypassInstanceData) {
    var _a;
    if (!this._geometry) {
      if (this._delayInfo) {
        return this._delayInfo.indexOf(kind) !== -1;
      }
      return false;
    }
    if (!bypassInstanceData) {
      const buffer = (_a = this._userInstancedBuffersStorage) == null ? void 0 : _a.vertexBuffers[kind];
      if (buffer) {
        return buffer.isUpdatable();
      }
    }
    return this._geometry.isVertexBufferUpdatable(kind);
  }
  /**
   * Returns a string which contains the list of existing `kinds` of Vertex Data associated with this mesh.
   * @param bypassInstanceData defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false
   * @returns an array of strings
   */
  getVerticesDataKinds(bypassInstanceData) {
    if (!this._geometry) {
      const result = [];
      if (this._delayInfo) {
        this._delayInfo.forEach(function(kind) {
          result.push(kind);
        });
      }
      return result;
    }
    const kinds = this._geometry.getVerticesDataKinds();
    if (!bypassInstanceData && this._userInstancedBuffersStorage) {
      for (const kind in this._userInstancedBuffersStorage.vertexBuffers) {
        if (kinds.indexOf(kind) === -1) {
          kinds.push(kind);
        }
      }
    }
    return kinds;
  }
  /**
   * Returns a positive integer : the total number of indices in this mesh geometry.
   * @returns the numner of indices or zero if the mesh has no geometry.
   */
  getTotalIndices() {
    if (!this._geometry) {
      return 0;
    }
    return this._geometry.getTotalIndices();
  }
  /**
   * Returns an array of integers or a typed array (Int32Array, Uint32Array, Uint16Array) populated with the mesh indices.
   * @param copyWhenShared If true (default false) and and if the mesh geometry is shared among some other meshes, the returned array is a copy of the internal one.
   * @param forceCopy defines a boolean indicating that the returned array must be cloned upon returning it
   * @returns the indices array or an empty array if the mesh has no geometry
   */
  getIndices(copyWhenShared, forceCopy) {
    if (!this._geometry) {
      return [];
    }
    return this._geometry.getIndices(copyWhenShared, forceCopy);
  }
  get isBlocked() {
    return this._masterMesh !== null && this._masterMesh !== void 0;
  }
  /**
   * Determine if the current mesh is ready to be rendered
   * @param completeCheck defines if a complete check (including materials and lights) has to be done (false by default)
   * @param forceInstanceSupport will check if the mesh will be ready when used with instances (false by default)
   * @returns true if all associated assets are ready (material, textures, shaders)
   */
  isReady(completeCheck = false, forceInstanceSupport = false) {
    var _a, _b, _c, _d, _e;
    if (this.delayLoadState === 2) {
      return false;
    }
    if (!super.isReady(completeCheck)) {
      return false;
    }
    if (!this.subMeshes || this.subMeshes.length === 0) {
      return true;
    }
    if (!completeCheck) {
      return true;
    }
    const engine = this.getEngine();
    const scene = this.getScene();
    const hardwareInstancedRendering = forceInstanceSupport || engine.getCaps().instancedArrays && (this.instances.length > 0 || this.hasThinInstances);
    this.computeWorldMatrix();
    const mat = this.material || scene.defaultMaterial;
    if (mat) {
      if (mat._storeEffectOnSubMeshes) {
        for (const subMesh of this.subMeshes) {
          const effectiveMaterial = subMesh.getMaterial();
          if (effectiveMaterial) {
            if (effectiveMaterial._storeEffectOnSubMeshes) {
              if (!effectiveMaterial.isReadyForSubMesh(this, subMesh, hardwareInstancedRendering)) {
                return false;
              }
            } else {
              if (!effectiveMaterial.isReady(this, hardwareInstancedRendering)) {
                return false;
              }
            }
          }
        }
      } else {
        if (!mat.isReady(this, hardwareInstancedRendering)) {
          return false;
        }
      }
    }
    const currentRenderPassId = engine.currentRenderPassId;
    for (const light of this.lightSources) {
      const generators = light.getShadowGenerators();
      if (!generators) {
        continue;
      }
      const iterator = generators.values();
      for (let key = iterator.next(); key.done !== true; key = iterator.next()) {
        const generator = key.value;
        if (generator && (!((_a = generator.getShadowMap()) == null ? void 0 : _a.renderList) || ((_b = generator.getShadowMap()) == null ? void 0 : _b.renderList) && ((_d = (_c = generator.getShadowMap()) == null ? void 0 : _c.renderList) == null ? void 0 : _d.indexOf(this)) !== -1)) {
          const shadowMap = generator.getShadowMap();
          const renderPassIds = shadowMap.renderPassIds ?? [engine.currentRenderPassId];
          for (let p = 0; p < renderPassIds.length; ++p) {
            engine.currentRenderPassId = renderPassIds[p];
            for (const subMesh of this.subMeshes) {
              if (!generator.isReady(subMesh, hardwareInstancedRendering, ((_e = subMesh.getMaterial()) == null ? void 0 : _e.needAlphaBlendingForMesh(this)) ?? false)) {
                engine.currentRenderPassId = currentRenderPassId;
                return false;
              }
            }
          }
          engine.currentRenderPassId = currentRenderPassId;
        }
      }
    }
    for (const lod of this._internalMeshDataInfo._LODLevels) {
      if (lod.mesh && !lod.mesh.isReady(hardwareInstancedRendering)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Gets a boolean indicating if the normals aren't to be recomputed on next mesh `positions` array update. This property is pertinent only for updatable parametric shapes.
   */
  get areNormalsFrozen() {
    return this._internalMeshDataInfo._areNormalsFrozen;
  }
  /**
   * This function affects parametric shapes on vertex position update only : ribbons, tubes, etc. It has no effect at all on other shapes. It prevents the mesh normals from being recomputed on next `positions` array update.
   * @returns the current mesh
   */
  freezeNormals() {
    this._internalMeshDataInfo._areNormalsFrozen = true;
    return this;
  }
  /**
   * This function affects parametric shapes on vertex position update only : ribbons, tubes, etc. It has no effect at all on other shapes. It reactivates the mesh normals computation if it was previously frozen
   * @returns the current mesh
   */
  unfreezeNormals() {
    this._internalMeshDataInfo._areNormalsFrozen = false;
    return this;
  }
  /**
   * Sets a value overriding the instance count. Only applicable when custom instanced InterleavedVertexBuffer are used rather than InstancedMeshs
   */
  set overridenInstanceCount(count) {
    this._instanceDataStorage.overridenInstanceCount = count;
  }
  // Methods
  /** @internal */
  _preActivate() {
    const internalDataInfo = this._internalMeshDataInfo;
    const sceneRenderId = this.getScene().getRenderId();
    if (internalDataInfo._preActivateId === sceneRenderId) {
      return this;
    }
    internalDataInfo._preActivateId = sceneRenderId;
    this._instanceDataStorage.visibleInstances = null;
    return this;
  }
  /**
   * @internal
   */
  _preActivateForIntermediateRendering(renderId) {
    if (this._instanceDataStorage.visibleInstances) {
      this._instanceDataStorage.visibleInstances.intermediateDefaultRenderId = renderId;
    }
    return this;
  }
  /**
   * @internal
   */
  _registerInstanceForRenderId(instance, renderId) {
    if (!this._instanceDataStorage.visibleInstances) {
      this._instanceDataStorage.visibleInstances = {
        defaultRenderId: renderId,
        selfDefaultRenderId: this._renderId
      };
    }
    if (!this._instanceDataStorage.visibleInstances[renderId]) {
      if (this._instanceDataStorage.previousRenderId !== void 0 && this._instanceDataStorage.isFrozen) {
        this._instanceDataStorage.visibleInstances[this._instanceDataStorage.previousRenderId] = null;
      }
      this._instanceDataStorage.previousRenderId = renderId;
      this._instanceDataStorage.visibleInstances[renderId] = new Array();
    }
    this._instanceDataStorage.visibleInstances[renderId].push(instance);
    return this;
  }
  _afterComputeWorldMatrix() {
    super._afterComputeWorldMatrix();
    if (!this.hasThinInstances) {
      return;
    }
    if (!this.doNotSyncBoundingInfo) {
      this.thinInstanceRefreshBoundingInfo(false);
    }
  }
  /** @internal */
  _postActivate() {
    if (this.edgesShareWithInstances && this.edgesRenderer && this.edgesRenderer.isEnabled && this._renderingGroup) {
      this._renderingGroup._edgesRenderers.pushNoDuplicate(this.edgesRenderer);
      this.edgesRenderer.customInstances.push(this.getWorldMatrix());
    }
  }
  /**
   * This method recomputes and sets a new BoundingInfo to the mesh unless it is locked.
   * This means the mesh underlying bounding box and sphere are recomputed.
   * @param applySkeletonOrOptions defines whether to apply the skeleton before computing the bounding info or a set of options
   * @param applyMorph defines whether to apply the morph target before computing the bounding info
   * @returns the current mesh
   */
  refreshBoundingInfo(applySkeletonOrOptions = false, applyMorph = false) {
    if (this.hasBoundingInfo && this.getBoundingInfo().isLocked) {
      return this;
    }
    let options;
    if (typeof applySkeletonOrOptions === "object") {
      options = applySkeletonOrOptions;
    } else {
      options = {
        applySkeleton: applySkeletonOrOptions,
        applyMorph
      };
    }
    const bias = this.geometry ? this.geometry.boundingBias : null;
    this._refreshBoundingInfo(this._getData(options, null, VertexBuffer.PositionKind), bias);
    return this;
  }
  /**
   * @internal
   */
  _createGlobalSubMesh(force) {
    const totalVertices = this.getTotalVertices();
    if (!totalVertices || !this.getIndices()) {
      return null;
    }
    if (this.subMeshes && this.subMeshes.length > 0) {
      const ib = this.getIndices();
      if (!ib) {
        return null;
      }
      const totalIndices = ib.length;
      let needToRecreate = false;
      if (force) {
        needToRecreate = true;
      } else {
        for (const submesh of this.subMeshes) {
          if (submesh.indexStart + submesh.indexCount > totalIndices) {
            needToRecreate = true;
            break;
          }
          if (submesh.verticesStart + submesh.verticesCount > totalVertices) {
            needToRecreate = true;
            break;
          }
        }
      }
      if (!needToRecreate) {
        return this.subMeshes[0];
      }
    }
    this.releaseSubMeshes();
    return new SubMesh(0, 0, totalVertices, 0, this.getTotalIndices() || totalVertices, this);
  }
  /**
   * This function will subdivide the mesh into multiple submeshes
   * @param count defines the expected number of submeshes
   */
  subdivide(count) {
    if (count < 1) {
      return;
    }
    const totalIndices = this.getTotalIndices();
    let subdivisionSize = totalIndices / count | 0;
    let offset = 0;
    while (subdivisionSize % 3 !== 0) {
      subdivisionSize++;
    }
    this.releaseSubMeshes();
    for (let index = 0; index < count; index++) {
      if (offset >= totalIndices) {
        break;
      }
      SubMesh.CreateFromIndices(0, offset, index === count - 1 ? totalIndices - offset : subdivisionSize, this, void 0, false);
      offset += subdivisionSize;
    }
    this.refreshBoundingInfo();
    this.synchronizeInstances();
  }
  /**
   * Copy a FloatArray into a specific associated vertex buffer
   * @param kind defines which buffer to write to (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @param data defines the data source
   * @param updatable defines if the updated vertex buffer must be flagged as updatable
   * @param stride defines the data stride size (can be null)
   * @returns the current mesh
   */
  setVerticesData(kind, data, updatable = false, stride) {
    if (!this._geometry) {
      const vertexData = new VertexData();
      vertexData.set(data, kind);
      const scene = this.getScene();
      new Geometry(Geometry.RandomId(), scene, vertexData, updatable, this);
    } else {
      this._geometry.setVerticesData(kind, data, updatable, stride);
    }
    return this;
  }
  /**
   * Delete a vertex buffer associated with this mesh
   * @param kind defines which buffer to delete (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   */
  removeVerticesData(kind) {
    if (!this._geometry) {
      return;
    }
    this._geometry.removeVerticesData(kind);
  }
  /**
   * Flags an associated vertex buffer as updatable
   * @param kind defines which buffer to use (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @param updatable defines if the updated vertex buffer must be flagged as updatable
   */
  markVerticesDataAsUpdatable(kind, updatable = true) {
    const vb = this.getVertexBuffer(kind);
    if (!vb || vb.isUpdatable() === updatable) {
      return;
    }
    this.setVerticesData(kind, this.getVerticesData(kind), updatable);
  }
  /**
   * Sets the mesh global Vertex Buffer
   * @param buffer defines the buffer to use
   * @param disposeExistingBuffer disposes the existing buffer, if any (default: true)
   * @returns the current mesh
   */
  setVerticesBuffer(buffer, disposeExistingBuffer = true) {
    if (!this._geometry) {
      this._geometry = Geometry.CreateGeometryForMesh(this);
    }
    this._geometry.setVerticesBuffer(buffer, null, disposeExistingBuffer);
    return this;
  }
  /**
   * Update a specific associated vertex buffer
   * @param kind defines which buffer to write to (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @param data defines the data source
   * @param updateExtends defines if extends info of the mesh must be updated (can be null). This is mostly useful for "position" kind
   * @param makeItUnique defines if the geometry associated with the mesh must be cloned to make the change only for this mesh (and not all meshes associated with the same geometry)
   * @returns the current mesh
   */
  updateVerticesData(kind, data, updateExtends, makeItUnique) {
    if (!this._geometry) {
      return this;
    }
    if (!makeItUnique) {
      this._geometry.updateVerticesData(kind, data, updateExtends);
    } else {
      this.makeGeometryUnique();
      this.updateVerticesData(kind, data, updateExtends, false);
    }
    return this;
  }
  /**
   * This method updates the vertex positions of an updatable mesh according to the `positionFunction` returned values.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#other-shapes-updatemeshpositions
   * @param positionFunction is a simple JS function what is passed the mesh `positions` array. It doesn't need to return anything
   * @param computeNormals is a boolean (default true) to enable/disable the mesh normal recomputation after the vertex position update
   * @returns the current mesh
   */
  updateMeshPositions(positionFunction, computeNormals = true) {
    const positions = this.getVerticesData(VertexBuffer.PositionKind);
    if (!positions) {
      return this;
    }
    positionFunction(positions);
    this.updateVerticesData(VertexBuffer.PositionKind, positions, false, false);
    if (computeNormals) {
      const indices = this.getIndices();
      const normals = this.getVerticesData(VertexBuffer.NormalKind);
      if (!normals) {
        return this;
      }
      VertexData.ComputeNormals(positions, indices, normals);
      this.updateVerticesData(VertexBuffer.NormalKind, normals, false, false);
    }
    return this;
  }
  /**
   * Creates a un-shared specific occurence of the geometry for the mesh.
   * @returns the current mesh
   */
  makeGeometryUnique() {
    if (!this._geometry) {
      return this;
    }
    if (this._geometry.meshes.length === 1) {
      return this;
    }
    const oldGeometry = this._geometry;
    const geometry = this._geometry.copy(Geometry.RandomId());
    oldGeometry.releaseForMesh(this, true);
    geometry.applyToMesh(this);
    return this;
  }
  /**
   * Sets the index buffer of this mesh.
   * @param indexBuffer Defines the index buffer to use for this mesh
   * @param totalVertices Defines the total number of vertices used by the buffer
   * @param totalIndices Defines the total number of indices in the index buffer
   * @param is32Bits Defines if the indices are 32 bits. If null (default), the value is guessed from the number of vertices
   */
  setIndexBuffer(indexBuffer, totalVertices, totalIndices, is32Bits = null) {
    let geometry = this._geometry;
    if (!geometry) {
      geometry = new Geometry(Geometry.RandomId(), this.getScene(), void 0, void 0, this);
    }
    geometry.setIndexBuffer(indexBuffer, totalVertices, totalIndices, is32Bits);
  }
  /**
   * Set the index buffer of this mesh
   * @param indices defines the source data
   * @param totalVertices defines the total number of vertices referenced by this index data (can be null)
   * @param updatable defines if the updated index buffer must be flagged as updatable (default is false)
   * @param dontForceSubMeshRecreation defines a boolean indicating that we don't want to force the recreation of sub-meshes if we don't have to (false by default)
   * @returns the current mesh
   */
  setIndices(indices, totalVertices = null, updatable = false, dontForceSubMeshRecreation = false) {
    if (!this._geometry) {
      const vertexData = new VertexData();
      vertexData.indices = indices;
      const scene = this.getScene();
      new Geometry(Geometry.RandomId(), scene, vertexData, updatable, this);
    } else {
      this._geometry.setIndices(indices, totalVertices, updatable, dontForceSubMeshRecreation);
    }
    return this;
  }
  /**
   * Update the current index buffer
   * @param indices defines the source data
   * @param offset defines the offset in the index buffer where to store the new data (can be null)
   * @param gpuMemoryOnly defines a boolean indicating that only the GPU memory must be updated leaving the CPU version of the indices unchanged (false by default)
   * @returns the current mesh
   */
  updateIndices(indices, offset, gpuMemoryOnly = false) {
    if (!this._geometry) {
      return this;
    }
    this._geometry.updateIndices(indices, offset, gpuMemoryOnly);
    return this;
  }
  /**
   * Invert the geometry to move from a right handed system to a left handed one.
   * @returns the current mesh
   */
  toLeftHanded() {
    if (!this._geometry) {
      return this;
    }
    this._geometry.toLeftHanded();
    return this;
  }
  /**
   * @internal
   */
  _bind(subMesh, effect, fillMode, allowInstancedRendering = true) {
    if (!this._geometry) {
      return this;
    }
    const engine = this.getScene().getEngine();
    let indexToBind;
    if (this._unIndexed) {
      switch (this._getRenderingFillMode(fillMode)) {
        case Material.WireFrameFillMode:
          indexToBind = subMesh._getLinesIndexBuffer(this.getIndices(), engine);
          break;
        default:
          indexToBind = null;
          break;
      }
    } else {
      switch (this._getRenderingFillMode(fillMode)) {
        case Material.PointFillMode:
          indexToBind = null;
          break;
        case Material.WireFrameFillMode:
          indexToBind = subMesh._getLinesIndexBuffer(this.getIndices(), engine);
          break;
        default:
        case Material.TriangleFillMode:
          indexToBind = this._geometry.getIndexBuffer();
          break;
      }
    }
    return this._bindDirect(effect, indexToBind, allowInstancedRendering);
  }
  /**
   * @internal
   */
  _bindDirect(effect, indexToBind, allowInstancedRendering = true) {
    if (!this._geometry) {
      return this;
    }
    if (this.morphTargetManager && this.morphTargetManager.isUsingTextureForTargets) {
      this.morphTargetManager._bind(effect);
    }
    if (!allowInstancedRendering || !this._userInstancedBuffersStorage || this.hasThinInstances) {
      this._geometry._bind(effect, indexToBind);
    } else {
      this._geometry._bind(effect, indexToBind, this._userInstancedBuffersStorage.vertexBuffers, this._userInstancedBuffersStorage.vertexArrayObjects);
    }
    return this;
  }
  /**
   * @internal
   */
  _draw(subMesh, fillMode, instancesCount) {
    if (!this._geometry || !this._geometry.getVertexBuffers() || !this._unIndexed && !this._geometry.getIndexBuffer()) {
      return this;
    }
    if (this._internalMeshDataInfo._onBeforeDrawObservable) {
      this._internalMeshDataInfo._onBeforeDrawObservable.notifyObservers(this);
    }
    const scene = this.getScene();
    const engine = scene.getEngine();
    if (this._unIndexed && fillMode !== Material.WireFrameFillMode || fillMode == Material.PointFillMode) {
      engine.drawArraysType(fillMode, subMesh.verticesStart, subMesh.verticesCount, this.forcedInstanceCount || instancesCount);
    } else if (fillMode == Material.WireFrameFillMode) {
      engine.drawElementsType(fillMode, 0, subMesh._linesIndexCount, this.forcedInstanceCount || instancesCount);
    } else {
      engine.drawElementsType(fillMode, subMesh.indexStart, subMesh.indexCount, this.forcedInstanceCount || instancesCount);
    }
    return this;
  }
  /**
   * Registers for this mesh a javascript function called just before the rendering process
   * @param func defines the function to call before rendering this mesh
   * @returns the current mesh
   */
  registerBeforeRender(func) {
    this.onBeforeRenderObservable.add(func);
    return this;
  }
  /**
   * Disposes a previously registered javascript function called before the rendering
   * @param func defines the function to remove
   * @returns the current mesh
   */
  unregisterBeforeRender(func) {
    this.onBeforeRenderObservable.removeCallback(func);
    return this;
  }
  /**
   * Registers for this mesh a javascript function called just after the rendering is complete
   * @param func defines the function to call after rendering this mesh
   * @returns the current mesh
   */
  registerAfterRender(func) {
    this.onAfterRenderObservable.add(func);
    return this;
  }
  /**
   * Disposes a previously registered javascript function called after the rendering.
   * @param func defines the function to remove
   * @returns the current mesh
   */
  unregisterAfterRender(func) {
    this.onAfterRenderObservable.removeCallback(func);
    return this;
  }
  /**
   * @internal
   */
  _getInstancesRenderList(subMeshId, isReplacementMode = false) {
    if (this._instanceDataStorage.isFrozen) {
      if (isReplacementMode) {
        this._instanceDataStorage.batchCacheReplacementModeInFrozenMode.hardwareInstancedRendering[subMeshId] = false;
        this._instanceDataStorage.batchCacheReplacementModeInFrozenMode.renderSelf[subMeshId] = true;
        return this._instanceDataStorage.batchCacheReplacementModeInFrozenMode;
      }
      if (this._instanceDataStorage.previousBatch) {
        return this._instanceDataStorage.previousBatch;
      }
    }
    const scene = this.getScene();
    const isInIntermediateRendering = scene._isInIntermediateRendering();
    const onlyForInstances = isInIntermediateRendering ? this._internalAbstractMeshDataInfo._onlyForInstancesIntermediate : this._internalAbstractMeshDataInfo._onlyForInstances;
    const batchCache = this._instanceDataStorage.batchCache;
    batchCache.mustReturn = false;
    batchCache.renderSelf[subMeshId] = isReplacementMode || !onlyForInstances && this.isEnabled() && this.isVisible;
    batchCache.visibleInstances[subMeshId] = null;
    if (this._instanceDataStorage.visibleInstances && !isReplacementMode) {
      const visibleInstances = this._instanceDataStorage.visibleInstances;
      const currentRenderId = scene.getRenderId();
      const defaultRenderId = isInIntermediateRendering ? visibleInstances.intermediateDefaultRenderId : visibleInstances.defaultRenderId;
      batchCache.visibleInstances[subMeshId] = visibleInstances[currentRenderId];
      if (!batchCache.visibleInstances[subMeshId] && defaultRenderId) {
        batchCache.visibleInstances[subMeshId] = visibleInstances[defaultRenderId];
      }
    }
    batchCache.hardwareInstancedRendering[subMeshId] = !isReplacementMode && this._instanceDataStorage.hardwareInstancedRendering && batchCache.visibleInstances[subMeshId] !== null && batchCache.visibleInstances[subMeshId] !== void 0;
    this._instanceDataStorage.previousBatch = batchCache;
    return batchCache;
  }
  /**
   * This method will also draw the instances if fillMode and effect are passed
   * @internal
   */
  _updateInstancedBuffers(subMesh, batch, currentInstancesBufferSize, engine, fillMode, effect) {
    var _a;
    const visibleInstances = batch.visibleInstances[subMesh._id];
    const visibleInstanceCount = visibleInstances ? visibleInstances.length : 0;
    const instanceStorage = this._instanceDataStorage;
    let instancesBuffer = instanceStorage.instancesBuffer;
    let instancesPreviousBuffer = instanceStorage.instancesPreviousBuffer;
    let offset = 0;
    let instancesCount = 0;
    const renderSelf = batch.renderSelf[subMesh._id];
    const needUpdateBuffer = !instancesBuffer || currentInstancesBufferSize !== instanceStorage.instancesBufferSize || this._scene.needsPreviousWorldMatrices && !instanceStorage.instancesPreviousBuffer;
    if (!this._instanceDataStorage.manualUpdate && (!instanceStorage.isFrozen || needUpdateBuffer)) {
      const world = this.getWorldMatrix();
      if (renderSelf) {
        if (this._scene.needsPreviousWorldMatrices) {
          if (!instanceStorage.masterMeshPreviousWorldMatrix) {
            instanceStorage.masterMeshPreviousWorldMatrix = world.clone();
            instanceStorage.masterMeshPreviousWorldMatrix.copyToArray(instanceStorage.instancesPreviousData, offset);
          } else {
            instanceStorage.masterMeshPreviousWorldMatrix.copyToArray(instanceStorage.instancesPreviousData, offset);
            instanceStorage.masterMeshPreviousWorldMatrix.copyFrom(world);
          }
        }
        world.copyToArray(instanceStorage.instancesData, offset);
        offset += 16;
        instancesCount++;
      }
      if (visibleInstances) {
        if (_Mesh.INSTANCEDMESH_SORT_TRANSPARENT && this._scene.activeCamera && ((_a = subMesh.getMaterial()) == null ? void 0 : _a.needAlphaBlendingForMesh(subMesh.getRenderingMesh()))) {
          const cameraPosition = this._scene.activeCamera.globalPosition;
          for (let instanceIndex = 0; instanceIndex < visibleInstances.length; instanceIndex++) {
            const instanceMesh = visibleInstances[instanceIndex];
            instanceMesh._distanceToCamera = Vector3.Distance(instanceMesh.getBoundingInfo().boundingSphere.centerWorld, cameraPosition);
          }
          visibleInstances.sort((m1, m2) => {
            return m1._distanceToCamera > m2._distanceToCamera ? -1 : m1._distanceToCamera < m2._distanceToCamera ? 1 : 0;
          });
        }
        for (let instanceIndex = 0; instanceIndex < visibleInstances.length; instanceIndex++) {
          const instance = visibleInstances[instanceIndex];
          const matrix = instance.getWorldMatrix();
          matrix.copyToArray(instanceStorage.instancesData, offset);
          if (this._scene.needsPreviousWorldMatrices) {
            if (!instance._previousWorldMatrix) {
              instance._previousWorldMatrix = matrix.clone();
              instance._previousWorldMatrix.copyToArray(instanceStorage.instancesPreviousData, offset);
            } else {
              instance._previousWorldMatrix.copyToArray(instanceStorage.instancesPreviousData, offset);
              instance._previousWorldMatrix.copyFrom(matrix);
            }
          }
          offset += 16;
          instancesCount++;
        }
      }
    } else {
      instancesCount = (renderSelf ? 1 : 0) + visibleInstanceCount;
    }
    if (needUpdateBuffer) {
      if (instancesBuffer) {
        instancesBuffer.dispose();
      }
      if (instancesPreviousBuffer) {
        instancesPreviousBuffer.dispose();
      }
      instancesBuffer = new Buffer(engine, instanceStorage.instancesData, true, 16, false, true);
      instanceStorage.instancesBuffer = instancesBuffer;
      if (!this._userInstancedBuffersStorage) {
        this._userInstancedBuffersStorage = {
          data: {},
          vertexBuffers: {},
          strides: {},
          sizes: {},
          vertexArrayObjects: this.getEngine().getCaps().vertexArrayObject ? {} : void 0
        };
      }
      this._userInstancedBuffersStorage.vertexBuffers["world0"] = instancesBuffer.createVertexBuffer("world0", 0, 4);
      this._userInstancedBuffersStorage.vertexBuffers["world1"] = instancesBuffer.createVertexBuffer("world1", 4, 4);
      this._userInstancedBuffersStorage.vertexBuffers["world2"] = instancesBuffer.createVertexBuffer("world2", 8, 4);
      this._userInstancedBuffersStorage.vertexBuffers["world3"] = instancesBuffer.createVertexBuffer("world3", 12, 4);
      if (this._scene.needsPreviousWorldMatrices) {
        instancesPreviousBuffer = new Buffer(engine, instanceStorage.instancesPreviousData, true, 16, false, true);
        instanceStorage.instancesPreviousBuffer = instancesPreviousBuffer;
        this._userInstancedBuffersStorage.vertexBuffers["previousWorld0"] = instancesPreviousBuffer.createVertexBuffer("previousWorld0", 0, 4);
        this._userInstancedBuffersStorage.vertexBuffers["previousWorld1"] = instancesPreviousBuffer.createVertexBuffer("previousWorld1", 4, 4);
        this._userInstancedBuffersStorage.vertexBuffers["previousWorld2"] = instancesPreviousBuffer.createVertexBuffer("previousWorld2", 8, 4);
        this._userInstancedBuffersStorage.vertexBuffers["previousWorld3"] = instancesPreviousBuffer.createVertexBuffer("previousWorld3", 12, 4);
      }
      this._invalidateInstanceVertexArrayObject();
    } else {
      if (!this._instanceDataStorage.isFrozen || this._instanceDataStorage.forceMatrixUpdates) {
        instancesBuffer.updateDirectly(instanceStorage.instancesData, 0, instancesCount);
        if (this._scene.needsPreviousWorldMatrices && (!this._instanceDataStorage.manualUpdate || this._instanceDataStorage.previousManualUpdate)) {
          instancesPreviousBuffer.updateDirectly(instanceStorage.instancesPreviousData, 0, instancesCount);
        }
      }
    }
    this._processInstancedBuffers(visibleInstances, renderSelf);
    if (effect && fillMode !== void 0) {
      this.getScene()._activeIndices.addCount(subMesh.indexCount * instancesCount, false);
      if (engine._currentDrawContext) {
        engine._currentDrawContext.useInstancing = true;
      }
      this._bind(subMesh, effect, fillMode);
      this._draw(subMesh, fillMode, instancesCount);
    }
    if (this._scene.needsPreviousWorldMatrices && !needUpdateBuffer && this._instanceDataStorage.manualUpdate && (!this._instanceDataStorage.isFrozen || this._instanceDataStorage.forceMatrixUpdates) && !this._instanceDataStorage.previousManualUpdate) {
      instancesPreviousBuffer.updateDirectly(instanceStorage.instancesData, 0, instancesCount);
    }
  }
  /**
   * @internal
   */
  _renderWithInstances(subMesh, fillMode, batch, effect, engine) {
    const visibleInstances = batch.visibleInstances[subMesh._id];
    const visibleInstanceCount = visibleInstances ? visibleInstances.length : 0;
    const instanceStorage = this._instanceDataStorage;
    const currentInstancesBufferSize = instanceStorage.instancesBufferSize;
    const matricesCount = visibleInstanceCount + 1;
    const bufferSize = matricesCount * 16 * 4;
    while (instanceStorage.instancesBufferSize < bufferSize) {
      instanceStorage.instancesBufferSize *= 2;
    }
    if (!instanceStorage.instancesData || currentInstancesBufferSize != instanceStorage.instancesBufferSize) {
      instanceStorage.instancesData = new Float32Array(instanceStorage.instancesBufferSize / 4);
    }
    if (this._scene.needsPreviousWorldMatrices && !instanceStorage.instancesPreviousData || currentInstancesBufferSize != instanceStorage.instancesBufferSize) {
      instanceStorage.instancesPreviousData = new Float32Array(instanceStorage.instancesBufferSize / 4);
    }
    this._updateInstancedBuffers(subMesh, batch, currentInstancesBufferSize, engine, fillMode, effect);
    engine.unbindInstanceAttributes();
    return this;
  }
  /**
   * @internal
   */
  _renderWithThinInstances(subMesh, fillMode, effect, engine) {
    var _a;
    const instancesCount = ((_a = this._thinInstanceDataStorage) == null ? void 0 : _a.instancesCount) ?? 0;
    this.getScene()._activeIndices.addCount(subMesh.indexCount * instancesCount, false);
    if (engine._currentDrawContext) {
      engine._currentDrawContext.useInstancing = true;
    }
    this._bind(subMesh, effect, fillMode);
    this._draw(subMesh, fillMode, instancesCount);
    if (this._scene.needsPreviousWorldMatrices && !this._thinInstanceDataStorage.previousMatrixData && this._thinInstanceDataStorage.matrixData) {
      if (!this._thinInstanceDataStorage.previousMatrixBuffer) {
        this._thinInstanceDataStorage.previousMatrixBuffer = this._thinInstanceCreateMatrixBuffer("previousWorld", this._thinInstanceDataStorage.matrixData, false);
      } else {
        this._thinInstanceDataStorage.previousMatrixBuffer.updateDirectly(this._thinInstanceDataStorage.matrixData, 0, instancesCount);
      }
    }
    engine.unbindInstanceAttributes();
  }
  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _processInstancedBuffers(visibleInstances, renderSelf) {
  }
  /**
   * @internal
   */
  _processRendering(renderingMesh, subMesh, effect, fillMode, batch, hardwareInstancedRendering, onBeforeDraw, effectiveMaterial) {
    const scene = this.getScene();
    const engine = scene.getEngine();
    fillMode = this._getRenderingFillMode(fillMode);
    if (hardwareInstancedRendering && subMesh.getRenderingMesh().hasThinInstances) {
      this._renderWithThinInstances(subMesh, fillMode, effect, engine);
      return this;
    }
    if (hardwareInstancedRendering) {
      this._renderWithInstances(subMesh, fillMode, batch, effect, engine);
    } else {
      if (engine._currentDrawContext) {
        engine._currentDrawContext.useInstancing = false;
      }
      let instanceCount = 0;
      if (batch.renderSelf[subMesh._id]) {
        if (onBeforeDraw) {
          onBeforeDraw(false, renderingMesh.getWorldMatrix(), effectiveMaterial);
        }
        instanceCount++;
        this._draw(subMesh, fillMode, this._instanceDataStorage.overridenInstanceCount);
      }
      const visibleInstancesForSubMesh = batch.visibleInstances[subMesh._id];
      if (visibleInstancesForSubMesh) {
        const visibleInstanceCount = visibleInstancesForSubMesh.length;
        instanceCount += visibleInstanceCount;
        for (let instanceIndex = 0; instanceIndex < visibleInstanceCount; instanceIndex++) {
          const instance = visibleInstancesForSubMesh[instanceIndex];
          const world = instance.getWorldMatrix();
          if (onBeforeDraw) {
            onBeforeDraw(true, world, effectiveMaterial);
          }
          this._draw(subMesh, fillMode);
        }
      }
      scene._activeIndices.addCount(subMesh.indexCount * instanceCount, false);
    }
    return this;
  }
  /**
   * @internal
   */
  _rebuild(dispose = false) {
    if (this._instanceDataStorage.instancesBuffer) {
      if (dispose) {
        this._instanceDataStorage.instancesBuffer.dispose();
      }
      this._instanceDataStorage.instancesBuffer = null;
    }
    if (this._userInstancedBuffersStorage) {
      for (const kind in this._userInstancedBuffersStorage.vertexBuffers) {
        const buffer = this._userInstancedBuffersStorage.vertexBuffers[kind];
        if (buffer) {
          if (dispose) {
            buffer.dispose();
          }
          this._userInstancedBuffersStorage.vertexBuffers[kind] = null;
        }
      }
      if (this._userInstancedBuffersStorage.vertexArrayObjects) {
        this._userInstancedBuffersStorage.vertexArrayObjects = {};
      }
    }
    this._internalMeshDataInfo._effectiveMaterial = null;
    super._rebuild(dispose);
  }
  /** @internal */
  _freeze() {
    if (!this.subMeshes) {
      return;
    }
    for (let index = 0; index < this.subMeshes.length; index++) {
      this._getInstancesRenderList(index);
    }
    this._internalMeshDataInfo._effectiveMaterial = null;
    this._instanceDataStorage.isFrozen = true;
  }
  /** @internal */
  _unFreeze() {
    this._instanceDataStorage.isFrozen = false;
    this._instanceDataStorage.previousBatch = null;
  }
  /**
   * Triggers the draw call for the mesh (or a submesh), for a specific render pass id
   * @param renderPassId defines the render pass id to use to draw the mesh / submesh. If not provided, use the current renderPassId of the engine.
   * @param enableAlphaMode defines if alpha mode can be changed (default: false)
   * @param effectiveMeshReplacement defines an optional mesh used to provide info for the rendering (default: undefined)
   * @param subMesh defines the subMesh to render. If not provided, draw all mesh submeshes (default: undefined)
   * @param checkFrustumCulling defines if frustum culling must be checked (default: true). If you know the mesh is in the frustum (or if you don't care!), you can pass false to optimize.
   * @returns the current mesh
   */
  renderWithRenderPassId(renderPassId, enableAlphaMode, effectiveMeshReplacement, subMesh, checkFrustumCulling = true) {
    const engine = this._scene.getEngine();
    const currentRenderPassId = engine.currentRenderPassId;
    if (renderPassId !== void 0) {
      engine.currentRenderPassId = renderPassId;
    }
    if (subMesh) {
      if (!checkFrustumCulling || checkFrustumCulling && subMesh.isInFrustum(this._scene._frustumPlanes)) {
        this.render(subMesh, !!enableAlphaMode, effectiveMeshReplacement);
      }
    } else {
      for (let s = 0; s < this.subMeshes.length; s++) {
        const subMesh2 = this.subMeshes[s];
        if (!checkFrustumCulling || checkFrustumCulling && subMesh2.isInFrustum(this._scene._frustumPlanes)) {
          this.render(subMesh2, !!enableAlphaMode, effectiveMeshReplacement);
        }
      }
    }
    if (renderPassId !== void 0) {
      engine.currentRenderPassId = currentRenderPassId;
    }
    return this;
  }
  /**
   * Render a complete mesh by going through all submeshes
   * @returns the current mesh
   * @see [simple test](https://playground.babylonjs.com/#5SPY1V#2)
   * @see [perf test](https://playground.babylonjs.com/#5SPY1V#5)
   */
  directRender() {
    if (!this.subMeshes) {
      return this;
    }
    for (const submesh of this.subMeshes) {
      this.render(submesh, false);
    }
    return this;
  }
  /**
   * Triggers the draw call for the mesh. Usually, you don't need to call this method by your own because the mesh rendering is handled by the scene rendering manager
   * @param subMesh defines the subMesh to render
   * @param enableAlphaMode defines if alpha mode can be changed
   * @param effectiveMeshReplacement defines an optional mesh used to provide info for the rendering
   * @returns the current mesh
   */
  render(subMesh, enableAlphaMode, effectiveMeshReplacement) {
    var _a, _b;
    const scene = this.getScene();
    if (this._internalAbstractMeshDataInfo._isActiveIntermediate) {
      this._internalAbstractMeshDataInfo._isActiveIntermediate = false;
    } else {
      this._internalAbstractMeshDataInfo._isActive = false;
    }
    const numActiveCameras = ((_a = scene.activeCameras) == null ? void 0 : _a.length) ?? 0;
    const canCheckOcclusionQuery = numActiveCameras > 1 && scene.activeCamera === scene.activeCameras[0] || numActiveCameras <= 1;
    if (canCheckOcclusionQuery && this._checkOcclusionQuery() && !this._occlusionDataStorage.forceRenderingWhenOccluded) {
      return this;
    }
    const batch = this._getInstancesRenderList(subMesh._id, !!effectiveMeshReplacement);
    if (batch.mustReturn) {
      return this;
    }
    if (!this._geometry || !this._geometry.getVertexBuffers() || !this._unIndexed && !this._geometry.getIndexBuffer()) {
      return this;
    }
    const engine = scene.getEngine();
    let oldCameraMaxZ = 0;
    let oldCamera = null;
    if (this.ignoreCameraMaxZ && scene.activeCamera && !scene._isInIntermediateRendering()) {
      oldCameraMaxZ = scene.activeCamera.maxZ;
      oldCamera = scene.activeCamera;
      scene.activeCamera.maxZ = 0;
      scene.updateTransformMatrix(true);
    }
    if (this._internalMeshDataInfo._onBeforeRenderObservable) {
      this._internalMeshDataInfo._onBeforeRenderObservable.notifyObservers(this);
    }
    const renderingMesh = subMesh.getRenderingMesh();
    const hardwareInstancedRendering = batch.hardwareInstancedRendering[subMesh._id] || renderingMesh.hasThinInstances || !!this._userInstancedBuffersStorage && !subMesh.getMesh()._internalAbstractMeshDataInfo._actAsRegularMesh;
    const instanceDataStorage = this._instanceDataStorage;
    const material = subMesh.getMaterial();
    if (!material) {
      if (oldCamera) {
        oldCamera.maxZ = oldCameraMaxZ;
        scene.updateTransformMatrix(true);
      }
      return this;
    }
    if (!instanceDataStorage.isFrozen || !this._internalMeshDataInfo._effectiveMaterial || this._internalMeshDataInfo._effectiveMaterial !== material) {
      if (material._storeEffectOnSubMeshes) {
        if (!material.isReadyForSubMesh(this, subMesh, hardwareInstancedRendering)) {
          if (oldCamera) {
            oldCamera.maxZ = oldCameraMaxZ;
            scene.updateTransformMatrix(true);
          }
          return this;
        }
      } else if (!material.isReady(this, hardwareInstancedRendering)) {
        if (oldCamera) {
          oldCamera.maxZ = oldCameraMaxZ;
          scene.updateTransformMatrix(true);
        }
        return this;
      }
      this._internalMeshDataInfo._effectiveMaterial = material;
    } else if (material._storeEffectOnSubMeshes && !((_b = subMesh._drawWrapper) == null ? void 0 : _b._wasPreviouslyReady) || !material._storeEffectOnSubMeshes && !material._getDrawWrapper()._wasPreviouslyReady) {
      if (oldCamera) {
        oldCamera.maxZ = oldCameraMaxZ;
        scene.updateTransformMatrix(true);
      }
      return this;
    }
    if (enableAlphaMode) {
      engine.setAlphaMode(this._internalMeshDataInfo._effectiveMaterial.alphaMode);
    }
    let drawWrapper;
    if (this._internalMeshDataInfo._effectiveMaterial._storeEffectOnSubMeshes) {
      drawWrapper = subMesh._drawWrapper;
    } else {
      drawWrapper = this._internalMeshDataInfo._effectiveMaterial._getDrawWrapper();
    }
    const effect = (drawWrapper == null ? void 0 : drawWrapper.effect) ?? null;
    for (const step of scene._beforeRenderingMeshStage) {
      step.action(this, subMesh, batch, effect);
    }
    if (!drawWrapper || !effect) {
      if (oldCamera) {
        oldCamera.maxZ = oldCameraMaxZ;
        scene.updateTransformMatrix(true);
      }
      return this;
    }
    const effectiveMesh = effectiveMeshReplacement || this;
    let sideOrientation;
    if (!instanceDataStorage.isFrozen && (this._internalMeshDataInfo._effectiveMaterial.backFaceCulling || this._internalMeshDataInfo._effectiveMaterial.sideOrientation !== null || this._internalMeshDataInfo._effectiveMaterial.twoSidedLighting)) {
      const mainDeterminant = effectiveMesh._getWorldMatrixDeterminant();
      sideOrientation = this._internalMeshDataInfo._effectiveMaterial._getEffectiveOrientation(this);
      if (mainDeterminant < 0) {
        sideOrientation = sideOrientation === Material.ClockWiseSideOrientation ? Material.CounterClockWiseSideOrientation : Material.ClockWiseSideOrientation;
      }
      instanceDataStorage.sideOrientation = sideOrientation;
    } else {
      sideOrientation = instanceDataStorage.sideOrientation;
    }
    const reverse = this._internalMeshDataInfo._effectiveMaterial._preBind(drawWrapper, sideOrientation);
    if (this._internalMeshDataInfo._effectiveMaterial.forceDepthWrite) {
      engine.setDepthWrite(true);
    }
    const effectiveMaterial = this._internalMeshDataInfo._effectiveMaterial;
    const fillMode = effectiveMaterial.fillMode;
    if (this._internalMeshDataInfo._onBeforeBindObservable) {
      this._internalMeshDataInfo._onBeforeBindObservable.notifyObservers(this);
    }
    if (!hardwareInstancedRendering) {
      this._bind(subMesh, effect, fillMode, false);
    }
    const world = effectiveMesh.getWorldMatrix();
    if (effectiveMaterial._storeEffectOnSubMeshes) {
      effectiveMaterial.bindForSubMesh(world, this, subMesh);
    } else {
      effectiveMaterial.bind(world, this);
    }
    if (!effectiveMaterial.backFaceCulling && effectiveMaterial.separateCullingPass) {
      engine.setState(true, effectiveMaterial.zOffset, false, !reverse, effectiveMaterial.cullBackFaces, effectiveMaterial.stencil, effectiveMaterial.zOffsetUnits);
      this._processRendering(this, subMesh, effect, fillMode, batch, hardwareInstancedRendering, this._onBeforeDraw, this._internalMeshDataInfo._effectiveMaterial);
      engine.setState(true, effectiveMaterial.zOffset, false, reverse, effectiveMaterial.cullBackFaces, effectiveMaterial.stencil, effectiveMaterial.zOffsetUnits);
      if (this._internalMeshDataInfo._onBetweenPassObservable) {
        this._internalMeshDataInfo._onBetweenPassObservable.notifyObservers(subMesh);
      }
    }
    this._processRendering(this, subMesh, effect, fillMode, batch, hardwareInstancedRendering, this._onBeforeDraw, this._internalMeshDataInfo._effectiveMaterial);
    this._internalMeshDataInfo._effectiveMaterial.unbind();
    for (const step of scene._afterRenderingMeshStage) {
      step.action(this, subMesh, batch, effect);
    }
    if (this._internalMeshDataInfo._onAfterRenderObservable) {
      this._internalMeshDataInfo._onAfterRenderObservable.notifyObservers(this);
    }
    if (oldCamera) {
      oldCamera.maxZ = oldCameraMaxZ;
      scene.updateTransformMatrix(true);
    }
    if (scene.performancePriority === 2 && !instanceDataStorage.isFrozen) {
      this._freeze();
    }
    return this;
  }
  /**
   *   Renormalize the mesh and patch it up if there are no weights
   *   Similar to normalization by adding the weights compute the reciprocal and multiply all elements, this wil ensure that everything adds to 1.
   *   However in the case of zero weights then we set just a single influence to 1.
   *   We check in the function for extra's present and if so we use the normalizeSkinWeightsWithExtras rather than the FourWeights version.
   */
  cleanMatrixWeights() {
    if (this.isVerticesDataPresent(VertexBuffer.MatricesWeightsKind)) {
      if (this.isVerticesDataPresent(VertexBuffer.MatricesWeightsExtraKind)) {
        this._normalizeSkinWeightsAndExtra();
      } else {
        this._normalizeSkinFourWeights();
      }
    }
  }
  // faster 4 weight version.
  _normalizeSkinFourWeights() {
    const matricesWeights = this.getVerticesData(VertexBuffer.MatricesWeightsKind);
    const numWeights = matricesWeights.length;
    for (let a = 0; a < numWeights; a += 4) {
      const t = matricesWeights[a] + matricesWeights[a + 1] + matricesWeights[a + 2] + matricesWeights[a + 3];
      if (t === 0) {
        matricesWeights[a] = 1;
      } else {
        const recip = 1 / t;
        matricesWeights[a] *= recip;
        matricesWeights[a + 1] *= recip;
        matricesWeights[a + 2] *= recip;
        matricesWeights[a + 3] *= recip;
      }
    }
    this.setVerticesData(VertexBuffer.MatricesWeightsKind, matricesWeights);
  }
  // handle special case of extra verts.  (in theory gltf can handle 12 influences)
  _normalizeSkinWeightsAndExtra() {
    const matricesWeightsExtra = this.getVerticesData(VertexBuffer.MatricesWeightsExtraKind);
    const matricesWeights = this.getVerticesData(VertexBuffer.MatricesWeightsKind);
    const numWeights = matricesWeights.length;
    for (let a = 0; a < numWeights; a += 4) {
      let t = matricesWeights[a] + matricesWeights[a + 1] + matricesWeights[a + 2] + matricesWeights[a + 3];
      t += matricesWeightsExtra[a] + matricesWeightsExtra[a + 1] + matricesWeightsExtra[a + 2] + matricesWeightsExtra[a + 3];
      if (t === 0) {
        matricesWeights[a] = 1;
      } else {
        const recip = 1 / t;
        matricesWeights[a] *= recip;
        matricesWeights[a + 1] *= recip;
        matricesWeights[a + 2] *= recip;
        matricesWeights[a + 3] *= recip;
        matricesWeightsExtra[a] *= recip;
        matricesWeightsExtra[a + 1] *= recip;
        matricesWeightsExtra[a + 2] *= recip;
        matricesWeightsExtra[a + 3] *= recip;
      }
    }
    this.setVerticesData(VertexBuffer.MatricesWeightsKind, matricesWeights);
    this.setVerticesData(VertexBuffer.MatricesWeightsKind, matricesWeightsExtra);
  }
  /**
   * ValidateSkinning is used to determine that a mesh has valid skinning data along with skin metrics, if missing weights,
   * or not normalized it is returned as invalid mesh the string can be used for console logs, or on screen messages to let
   * the user know there was an issue with importing the mesh
   * @returns a validation object with skinned, valid and report string
   */
  validateSkinning() {
    const matricesWeightsExtra = this.getVerticesData(VertexBuffer.MatricesWeightsExtraKind);
    const matricesWeights = this.getVerticesData(VertexBuffer.MatricesWeightsKind);
    if (matricesWeights === null || this.skeleton == null) {
      return { skinned: false, valid: true, report: "not skinned" };
    }
    const numWeights = matricesWeights.length;
    let numberNotSorted = 0;
    let missingWeights = 0;
    let maxUsedWeights = 0;
    let numberNotNormalized = 0;
    const numInfluences = matricesWeightsExtra === null ? 4 : 8;
    const usedWeightCounts = [];
    for (let a = 0; a <= numInfluences; a++) {
      usedWeightCounts[a] = 0;
    }
    const toleranceEpsilon = 1e-3;
    for (let a = 0; a < numWeights; a += 4) {
      let lastWeight = matricesWeights[a];
      let t = lastWeight;
      let usedWeights = t === 0 ? 0 : 1;
      for (let b = 1; b < numInfluences; b++) {
        const d = b < 4 ? matricesWeights[a + b] : matricesWeightsExtra[a + b - 4];
        if (d > lastWeight) {
          numberNotSorted++;
        }
        if (d !== 0) {
          usedWeights++;
        }
        t += d;
        lastWeight = d;
      }
      usedWeightCounts[usedWeights]++;
      if (usedWeights > maxUsedWeights) {
        maxUsedWeights = usedWeights;
      }
      if (t === 0) {
        missingWeights++;
      } else {
        const recip = 1 / t;
        let tolerance = 0;
        for (let b = 0; b < numInfluences; b++) {
          if (b < 4) {
            tolerance += Math.abs(matricesWeights[a + b] - matricesWeights[a + b] * recip);
          } else {
            tolerance += Math.abs(matricesWeightsExtra[a + b - 4] - matricesWeightsExtra[a + b - 4] * recip);
          }
        }
        if (tolerance > toleranceEpsilon) {
          numberNotNormalized++;
        }
      }
    }
    const numBones = this.skeleton.bones.length;
    const matricesIndices = this.getVerticesData(VertexBuffer.MatricesIndicesKind);
    const matricesIndicesExtra = this.getVerticesData(VertexBuffer.MatricesIndicesExtraKind);
    let numBadBoneIndices = 0;
    for (let a = 0; a < numWeights; a += 4) {
      for (let b = 0; b < numInfluences; b++) {
        const index = b < 4 ? matricesIndices[a + b] : matricesIndicesExtra[a + b - 4];
        if (index >= numBones || index < 0) {
          numBadBoneIndices++;
        }
      }
    }
    const output = "Number of Weights = " + numWeights / 4 + "\nMaximum influences = " + maxUsedWeights + "\nMissing Weights = " + missingWeights + "\nNot Sorted = " + numberNotSorted + "\nNot Normalized = " + numberNotNormalized + "\nWeightCounts = [" + usedWeightCounts + "]\nNumber of bones = " + numBones + "\nBad Bone Indices = " + numBadBoneIndices;
    return { skinned: true, valid: missingWeights === 0 && numberNotNormalized === 0 && numBadBoneIndices === 0, report: output };
  }
  /** @internal */
  _checkDelayState() {
    const scene = this.getScene();
    if (this._geometry) {
      this._geometry.load(scene);
    } else if (this.delayLoadState === 4) {
      this.delayLoadState = 2;
      this._queueLoad(scene);
    }
    return this;
  }
  _queueLoad(scene) {
    scene.addPendingData(this);
    const getBinaryData = this.delayLoadingFile.indexOf(".babylonbinarymeshdata") !== -1;
    Tools.LoadFile(this.delayLoadingFile, (data) => {
      if (data instanceof ArrayBuffer) {
        this._delayLoadingFunction(data, this);
      } else {
        this._delayLoadingFunction(JSON.parse(data), this);
      }
      this.instances.forEach((instance) => {
        instance.refreshBoundingInfo();
        instance._syncSubMeshes();
      });
      this.delayLoadState = 1;
      scene.removePendingData(this);
    }, () => {
    }, scene.offlineProvider, getBinaryData);
    return this;
  }
  /**
   * Returns `true` if the mesh is within the frustum defined by the passed array of planes.
   * A mesh is in the frustum if its bounding box intersects the frustum
   * @param frustumPlanes defines the frustum to test
   * @returns true if the mesh is in the frustum planes
   */
  isInFrustum(frustumPlanes) {
    if (this.delayLoadState === 2) {
      return false;
    }
    if (!super.isInFrustum(frustumPlanes)) {
      return false;
    }
    this._checkDelayState();
    return true;
  }
  /**
   * Sets the mesh material by the material or multiMaterial `id` property
   * @param id is a string identifying the material or the multiMaterial
   * @returns the current mesh
   */
  setMaterialById(id) {
    const materials = this.getScene().materials;
    let index;
    for (index = materials.length - 1; index > -1; index--) {
      if (materials[index].id === id) {
        this.material = materials[index];
        return this;
      }
    }
    const multiMaterials = this.getScene().multiMaterials;
    for (index = multiMaterials.length - 1; index > -1; index--) {
      if (multiMaterials[index].id === id) {
        this.material = multiMaterials[index];
        return this;
      }
    }
    return this;
  }
  /**
   * Returns as a new array populated with the mesh material and/or skeleton, if any.
   * @returns an array of IAnimatable
   */
  getAnimatables() {
    const results = [];
    if (this.material) {
      results.push(this.material);
    }
    if (this.skeleton) {
      results.push(this.skeleton);
    }
    return results;
  }
  /**
   * Modifies the mesh geometry according to the passed transformation matrix.
   * This method returns nothing, but it really modifies the mesh even if it's originally not set as updatable.
   * The mesh normals are modified using the same transformation.
   * Note that, under the hood, this method sets a new VertexBuffer each call.
   * @param transform defines the transform matrix to use
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/center_origin/bakingTransforms
   * @returns the current mesh
   */
  bakeTransformIntoVertices(transform) {
    if (!this.isVerticesDataPresent(VertexBuffer.PositionKind)) {
      return this;
    }
    const submeshes = this.subMeshes.splice(0);
    this._resetPointsArrayCache();
    let data = this.getVerticesData(VertexBuffer.PositionKind);
    const temp = Vector3.Zero();
    let index;
    for (index = 0; index < data.length; index += 3) {
      Vector3.TransformCoordinatesFromFloatsToRef(data[index], data[index + 1], data[index + 2], transform, temp).toArray(data, index);
    }
    this.setVerticesData(VertexBuffer.PositionKind, data, this.getVertexBuffer(VertexBuffer.PositionKind).isUpdatable());
    if (this.isVerticesDataPresent(VertexBuffer.NormalKind)) {
      data = this.getVerticesData(VertexBuffer.NormalKind);
      for (index = 0; index < data.length; index += 3) {
        Vector3.TransformNormalFromFloatsToRef(data[index], data[index + 1], data[index + 2], transform, temp).normalize().toArray(data, index);
      }
      this.setVerticesData(VertexBuffer.NormalKind, data, this.getVertexBuffer(VertexBuffer.NormalKind).isUpdatable());
    }
    if (this.isVerticesDataPresent(VertexBuffer.TangentKind)) {
      data = this.getVerticesData(VertexBuffer.TangentKind);
      for (index = 0; index < data.length; index += 4) {
        Vector3.TransformNormalFromFloatsToRef(data[index], data[index + 1], data[index + 2], transform, temp).normalize().toArray(data, index);
      }
      this.setVerticesData(VertexBuffer.TangentKind, data, this.getVertexBuffer(VertexBuffer.TangentKind).isUpdatable());
    }
    if (transform.determinant() < 0) {
      this.flipFaces();
    }
    this.releaseSubMeshes();
    this.subMeshes = submeshes;
    return this;
  }
  /**
   * Modifies the mesh geometry according to its own current World Matrix.
   * The mesh World Matrix is then reset.
   * This method returns nothing but really modifies the mesh even if it's originally not set as updatable.
   * Note that, under the hood, this method sets a new VertexBuffer each call.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/center_origin/bakingTransforms
   * @param bakeIndependentlyOfChildren indicates whether to preserve all child nodes' World Matrix during baking
   * @param forceUnique indicates whether to force the mesh geometry to be unique
   * @returns the current mesh
   */
  bakeCurrentTransformIntoVertices(bakeIndependentlyOfChildren = true, forceUnique = false) {
    if (forceUnique) {
      this.makeGeometryUnique();
    }
    this.bakeTransformIntoVertices(this.computeWorldMatrix(true));
    this.resetLocalMatrix(bakeIndependentlyOfChildren);
    return this;
  }
  // Cache
  /** @internal */
  get _positions() {
    return this._internalAbstractMeshDataInfo._positions || this._geometry && this._geometry._positions || null;
  }
  /** @internal */
  _resetPointsArrayCache() {
    if (this._geometry) {
      this._geometry._resetPointsArrayCache();
    }
    return this;
  }
  /** @internal */
  _generatePointsArray() {
    if (this._geometry) {
      return this._geometry._generatePointsArray();
    }
    return false;
  }
  /**
   * Returns a new Mesh object generated from the current mesh properties.
   * This method must not get confused with createInstance()
   * @param name is a string, the name given to the new mesh
   * @param newParent can be any Node object (default `null`) or an instance of MeshCloneOptions. If the latter, doNotCloneChildren and clonePhysicsImpostor are unused.
   * @param doNotCloneChildren allows/denies the recursive cloning of the original mesh children if any (default `false`)
   * @param clonePhysicsImpostor allows/denies the cloning in the same time of the original mesh `body` used by the physics engine, if any (default `true`)
   * @returns a new mesh
   */
  clone(name = "", newParent = null, doNotCloneChildren, clonePhysicsImpostor = true) {
    if (newParent && newParent._addToSceneRootNodes === void 0) {
      const cloneOptions = newParent;
      meshCreationOptions.source = this;
      meshCreationOptions.doNotCloneChildren = cloneOptions.doNotCloneChildren;
      meshCreationOptions.clonePhysicsImpostor = cloneOptions.clonePhysicsImpostor;
      meshCreationOptions.cloneThinInstances = cloneOptions.cloneThinInstances;
      return new _Mesh(name, this.getScene(), meshCreationOptions);
    }
    return new _Mesh(name, this.getScene(), newParent, this, doNotCloneChildren, clonePhysicsImpostor);
  }
  /**
   * Releases resources associated with this mesh.
   * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
   * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
   */
  dispose(doNotRecurse, disposeMaterialAndTextures = false) {
    this.morphTargetManager = null;
    if (this._geometry) {
      this._geometry.releaseForMesh(this, true);
    }
    const internalDataInfo = this._internalMeshDataInfo;
    if (internalDataInfo._onBeforeDrawObservable) {
      internalDataInfo._onBeforeDrawObservable.clear();
    }
    if (internalDataInfo._onBeforeBindObservable) {
      internalDataInfo._onBeforeBindObservable.clear();
    }
    if (internalDataInfo._onBeforeRenderObservable) {
      internalDataInfo._onBeforeRenderObservable.clear();
    }
    if (internalDataInfo._onAfterRenderObservable) {
      internalDataInfo._onAfterRenderObservable.clear();
    }
    if (internalDataInfo._onBetweenPassObservable) {
      internalDataInfo._onBetweenPassObservable.clear();
    }
    if (this._scene.useClonedMeshMap) {
      if (internalDataInfo.meshMap) {
        for (const uniqueId in internalDataInfo.meshMap) {
          const mesh = internalDataInfo.meshMap[uniqueId];
          if (mesh) {
            mesh._internalMeshDataInfo._source = null;
            internalDataInfo.meshMap[uniqueId] = void 0;
          }
        }
      }
      if (internalDataInfo._source && internalDataInfo._source._internalMeshDataInfo.meshMap) {
        internalDataInfo._source._internalMeshDataInfo.meshMap[this.uniqueId] = void 0;
      }
    } else {
      const meshes = this.getScene().meshes;
      for (const abstractMesh of meshes) {
        const mesh = abstractMesh;
        if (mesh._internalMeshDataInfo && mesh._internalMeshDataInfo._source && mesh._internalMeshDataInfo._source === this) {
          mesh._internalMeshDataInfo._source = null;
        }
      }
    }
    internalDataInfo._source = null;
    this._instanceDataStorage.visibleInstances = {};
    this._disposeInstanceSpecificData();
    this._disposeThinInstanceSpecificData();
    if (this._internalMeshDataInfo._checkReadinessObserver) {
      this._scene.onBeforeRenderObservable.remove(this._internalMeshDataInfo._checkReadinessObserver);
    }
    super.dispose(doNotRecurse, disposeMaterialAndTextures);
  }
  /** @internal */
  _disposeInstanceSpecificData() {
  }
  /** @internal */
  _disposeThinInstanceSpecificData() {
  }
  /** @internal */
  _invalidateInstanceVertexArrayObject() {
  }
  /**
   * Modifies the mesh geometry according to a displacement map.
   * A displacement map is a colored image. Each pixel color value (actually a gradient computed from red, green, blue values) will give the displacement to apply to each mesh vertex.
   * The mesh must be set as updatable. Its internal geometry is directly modified, no new buffer are allocated.
   * @param url is a string, the URL from the image file is to be downloaded.
   * @param minHeight is the lower limit of the displacement.
   * @param maxHeight is the upper limit of the displacement.
   * @param onSuccess is an optional Javascript function to be called just after the mesh is modified. It is passed the modified mesh and must return nothing.
   * @param uvOffset is an optional vector2 used to offset UV.
   * @param uvScale is an optional vector2 used to scale UV.
   * @param forceUpdate defines whether or not to force an update of the generated buffers. This is useful to apply on a deserialized model for instance.
   * @param onError defines a callback called when an error occurs during the processing of the request.
   * @returns the Mesh.
   */
  applyDisplacementMap(url, minHeight, maxHeight, onSuccess, uvOffset, uvScale, forceUpdate = false, onError) {
    const scene = this.getScene();
    const onload = (img) => {
      const heightMapWidth = img.width;
      const heightMapHeight = img.height;
      const canvas = this.getEngine().createCanvas(heightMapWidth, heightMapHeight);
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
      const buffer = context.getImageData(0, 0, heightMapWidth, heightMapHeight).data;
      this.applyDisplacementMapFromBuffer(buffer, heightMapWidth, heightMapHeight, minHeight, maxHeight, uvOffset, uvScale, forceUpdate);
      if (onSuccess) {
        onSuccess(this);
      }
    };
    Tools.LoadImage(url, onload, onError ? onError : () => {
    }, scene.offlineProvider);
    return this;
  }
  /**
   * Modifies the mesh geometry according to a displacementMap buffer.
   * A displacement map is a colored image. Each pixel color value (actually a gradient computed from red, green, blue values) will give the displacement to apply to each mesh vertex.
   * The mesh must be set as updatable. Its internal geometry is directly modified, no new buffer are allocated.
   * @param buffer is a `Uint8Array` buffer containing series of `Uint8` lower than 255, the red, green, blue and alpha values of each successive pixel.
   * @param heightMapWidth is the width of the buffer image.
   * @param heightMapHeight is the height of the buffer image.
   * @param minHeight is the lower limit of the displacement.
   * @param maxHeight is the upper limit of the displacement.
   * @param uvOffset is an optional vector2 used to offset UV.
   * @param uvScale is an optional vector2 used to scale UV.
   * @param forceUpdate defines whether or not to force an update of the generated buffers. This is useful to apply on a deserialized model for instance.
   * @returns the Mesh.
   */
  applyDisplacementMapFromBuffer(buffer, heightMapWidth, heightMapHeight, minHeight, maxHeight, uvOffset, uvScale, forceUpdate = false) {
    if (!this.isVerticesDataPresent(VertexBuffer.PositionKind) || !this.isVerticesDataPresent(VertexBuffer.NormalKind) || !this.isVerticesDataPresent(VertexBuffer.UVKind)) {
      Logger.Warn("Cannot call applyDisplacementMap: Given mesh is not complete. Position, Normal or UV are missing");
      return this;
    }
    const positions = this.getVerticesData(VertexBuffer.PositionKind, true, true);
    const normals = this.getVerticesData(VertexBuffer.NormalKind);
    const uvs = this.getVerticesData(VertexBuffer.UVKind);
    let position = Vector3.Zero();
    const normal = Vector3.Zero();
    const uv = Vector2.Zero();
    uvOffset = uvOffset || Vector2.Zero();
    uvScale = uvScale || new Vector2(1, 1);
    for (let index = 0; index < positions.length; index += 3) {
      Vector3.FromArrayToRef(positions, index, position);
      Vector3.FromArrayToRef(normals, index, normal);
      Vector2.FromArrayToRef(uvs, index / 3 * 2, uv);
      const u = Math.abs(uv.x * uvScale.x + uvOffset.x % 1) * (heightMapWidth - 1) % heightMapWidth | 0;
      const v = Math.abs(uv.y * uvScale.y + uvOffset.y % 1) * (heightMapHeight - 1) % heightMapHeight | 0;
      const pos = (u + v * heightMapWidth) * 4;
      const r = buffer[pos] / 255;
      const g = buffer[pos + 1] / 255;
      const b = buffer[pos + 2] / 255;
      const gradient = r * 0.3 + g * 0.59 + b * 0.11;
      normal.normalize();
      normal.scaleInPlace(minHeight + (maxHeight - minHeight) * gradient);
      position = position.add(normal);
      position.toArray(positions, index);
    }
    VertexData.ComputeNormals(positions, this.getIndices(), normals);
    if (forceUpdate) {
      this.setVerticesData(VertexBuffer.PositionKind, positions);
      this.setVerticesData(VertexBuffer.NormalKind, normals);
      this.setVerticesData(VertexBuffer.UVKind, uvs);
    } else {
      this.updateVerticesData(VertexBuffer.PositionKind, positions);
      this.updateVerticesData(VertexBuffer.NormalKind, normals);
    }
    return this;
  }
  _getFlattenedNormals(indices, positions) {
    const normals = new Float32Array(indices.length * 3);
    let normalsCount = 0;
    const flipNormalGeneration = this.sideOrientation === (this._scene.useRightHandedSystem ? 1 : 0);
    for (let index = 0; index < indices.length; index += 3) {
      const p1 = Vector3.FromArray(positions, indices[index] * 3);
      const p2 = Vector3.FromArray(positions, indices[index + 1] * 3);
      const p3 = Vector3.FromArray(positions, indices[index + 2] * 3);
      const p1p2 = p1.subtract(p2);
      const p3p2 = p3.subtract(p2);
      const normal = Vector3.Normalize(Vector3.Cross(p1p2, p3p2));
      if (flipNormalGeneration) {
        normal.scaleInPlace(-1);
      }
      for (let localIndex = 0; localIndex < 3; localIndex++) {
        normals[normalsCount++] = normal.x;
        normals[normalsCount++] = normal.y;
        normals[normalsCount++] = normal.z;
      }
    }
    return normals;
  }
  _convertToUnIndexedMesh(flattenNormals = false) {
    const kinds = this.getVerticesDataKinds().filter((kind) => {
      var _a;
      return !((_a = this.getVertexBuffer(kind)) == null ? void 0 : _a.getIsInstanced());
    });
    const indices = this.getIndices();
    const data = {};
    const separateVertices = (data2, size) => {
      const newData = new Float32Array(indices.length * size);
      let count = 0;
      for (let index = 0; index < indices.length; index++) {
        for (let offset = 0; offset < size; offset++) {
          newData[count++] = data2[indices[index] * size + offset];
        }
      }
      return newData;
    };
    const meshBoundingInfo = this.getBoundingInfo();
    const previousSubmeshes = this.geometry ? this.subMeshes.slice(0) : [];
    for (const kind of kinds) {
      data[kind] = this.getVerticesData(kind);
    }
    for (const kind of kinds) {
      const vertexBuffer = this.getVertexBuffer(kind);
      const size = vertexBuffer.getSize();
      if (flattenNormals && kind === VertexBuffer.NormalKind) {
        const normals = this._getFlattenedNormals(indices, data[VertexBuffer.PositionKind]);
        this.setVerticesData(VertexBuffer.NormalKind, normals, vertexBuffer.isUpdatable(), size);
      } else {
        this.setVerticesData(kind, separateVertices(data[kind], size), vertexBuffer.isUpdatable(), size);
      }
    }
    if (this.morphTargetManager) {
      for (let targetIndex = 0; targetIndex < this.morphTargetManager.numTargets; targetIndex++) {
        const target = this.morphTargetManager.getTarget(targetIndex);
        const positions = target.getPositions();
        target.setPositions(separateVertices(positions, 3));
        const normals = target.getNormals();
        if (normals) {
          target.setNormals(flattenNormals ? this._getFlattenedNormals(indices, positions) : separateVertices(normals, 3));
        }
        const tangents = target.getTangents();
        if (tangents) {
          target.setTangents(separateVertices(tangents, 3));
        }
        const uvs = target.getUVs();
        if (uvs) {
          target.setUVs(separateVertices(uvs, 2));
        }
        const colors = target.getColors();
        if (colors) {
          target.setColors(separateVertices(colors, 4));
        }
      }
      this.morphTargetManager.synchronize();
    }
    for (let index = 0; index < indices.length; index++) {
      indices[index] = index;
    }
    this.setIndices(indices);
    this._unIndexed = true;
    this.releaseSubMeshes();
    for (const previousOne of previousSubmeshes) {
      const boundingInfo = previousOne.getBoundingInfo();
      const subMesh = SubMesh.AddToMesh(previousOne.materialIndex, previousOne.indexStart, previousOne.indexCount, previousOne.indexStart, previousOne.indexCount, this);
      subMesh.setBoundingInfo(boundingInfo);
    }
    this.setBoundingInfo(meshBoundingInfo);
    this.synchronizeInstances();
    return this;
  }
  /**
   * Modify the mesh to get a flat shading rendering.
   * This means each mesh facet will then have its own normals. Usually new vertices are added in the mesh geometry to get this result.
   * Warning : the mesh is really modified even if not set originally as updatable and, under the hood, a new VertexBuffer is allocated.
   * @returns current mesh
   */
  convertToFlatShadedMesh() {
    return this._convertToUnIndexedMesh(true);
  }
  /**
   * This method removes all the mesh indices and add new vertices (duplication) in order to unfold facets into buffers.
   * In other words, more vertices, no more indices and a single bigger VBO.
   * The mesh is really modified even if not set originally as updatable. Under the hood, a new VertexBuffer is allocated.
   * @returns current mesh
   */
  convertToUnIndexedMesh() {
    return this._convertToUnIndexedMesh();
  }
  /**
   * Inverses facet orientations.
   * Warning : the mesh is really modified even if not set originally as updatable. A new VertexBuffer is created under the hood each call.
   * @param flipNormals will also inverts the normals
   * @returns current mesh
   */
  flipFaces(flipNormals = false) {
    const vertex_data = VertexData.ExtractFromMesh(this);
    let i;
    if (flipNormals && this.isVerticesDataPresent(VertexBuffer.NormalKind) && vertex_data.normals) {
      for (i = 0; i < vertex_data.normals.length; i++) {
        vertex_data.normals[i] *= -1;
      }
      this.setVerticesData(VertexBuffer.NormalKind, vertex_data.normals, this.isVertexBufferUpdatable(VertexBuffer.NormalKind));
    }
    if (vertex_data.indices) {
      let temp;
      for (i = 0; i < vertex_data.indices.length; i += 3) {
        temp = vertex_data.indices[i + 1];
        vertex_data.indices[i + 1] = vertex_data.indices[i + 2];
        vertex_data.indices[i + 2] = temp;
      }
      this.setIndices(vertex_data.indices, null, this.isVertexBufferUpdatable(VertexBuffer.PositionKind), true);
    }
    return this;
  }
  /**
   * Increase the number of facets and hence vertices in a mesh
   * Vertex normals are interpolated from existing vertex normals
   * Warning : the mesh is really modified even if not set originally as updatable. A new VertexBuffer is created under the hood each call.
   * @param numberPerEdge the number of new vertices to add to each edge of a facet, optional default 1
   */
  increaseVertices(numberPerEdge = 1) {
    const vertex_data = VertexData.ExtractFromMesh(this);
    const currentIndices = vertex_data.indices && !Array.isArray(vertex_data.indices) && Array.from ? Array.from(vertex_data.indices) : vertex_data.indices;
    const positions = vertex_data.positions && !Array.isArray(vertex_data.positions) && Array.from ? Array.from(vertex_data.positions) : vertex_data.positions;
    const uvs = vertex_data.uvs && !Array.isArray(vertex_data.uvs) && Array.from ? Array.from(vertex_data.uvs) : vertex_data.uvs;
    const normals = vertex_data.normals && !Array.isArray(vertex_data.normals) && Array.from ? Array.from(vertex_data.normals) : vertex_data.normals;
    if (!currentIndices || !positions) {
      Logger.Warn("Couldn't increase number of vertices : VertexData must contain at least indices and positions");
    } else {
      vertex_data.indices = currentIndices;
      vertex_data.positions = positions;
      if (uvs) {
        vertex_data.uvs = uvs;
      }
      if (normals) {
        vertex_data.normals = normals;
      }
      const segments = numberPerEdge + 1;
      const tempIndices = new Array();
      for (let i = 0; i < segments + 1; i++) {
        tempIndices[i] = new Array();
      }
      let a;
      let b;
      const deltaPosition = new Vector3(0, 0, 0);
      const deltaNormal = new Vector3(0, 0, 0);
      const deltaUV = new Vector2(0, 0);
      const indices = new Array();
      const vertexIndex = new Array();
      const side = new Array();
      let len;
      let positionPtr = positions.length;
      let uvPtr;
      if (uvs) {
        uvPtr = uvs.length;
      }
      let normalsPtr;
      if (normals) {
        normalsPtr = normals.length;
      }
      for (let i = 0; i < currentIndices.length; i += 3) {
        vertexIndex[0] = currentIndices[i];
        vertexIndex[1] = currentIndices[i + 1];
        vertexIndex[2] = currentIndices[i + 2];
        for (let j = 0; j < 3; j++) {
          a = vertexIndex[j];
          b = vertexIndex[(j + 1) % 3];
          if (side[a] === void 0 && side[b] === void 0) {
            side[a] = new Array();
            side[b] = new Array();
          } else {
            if (side[a] === void 0) {
              side[a] = new Array();
            }
            if (side[b] === void 0) {
              side[b] = new Array();
            }
          }
          if (side[a][b] === void 0 && side[b][a] === void 0) {
            side[a][b] = [];
            deltaPosition.x = (positions[3 * b] - positions[3 * a]) / segments;
            deltaPosition.y = (positions[3 * b + 1] - positions[3 * a + 1]) / segments;
            deltaPosition.z = (positions[3 * b + 2] - positions[3 * a + 2]) / segments;
            if (normals) {
              deltaNormal.x = (normals[3 * b] - normals[3 * a]) / segments;
              deltaNormal.y = (normals[3 * b + 1] - normals[3 * a + 1]) / segments;
              deltaNormal.z = (normals[3 * b + 2] - normals[3 * a + 2]) / segments;
            }
            if (uvs) {
              deltaUV.x = (uvs[2 * b] - uvs[2 * a]) / segments;
              deltaUV.y = (uvs[2 * b + 1] - uvs[2 * a + 1]) / segments;
            }
            side[a][b].push(a);
            for (let k = 1; k < segments; k++) {
              side[a][b].push(positions.length / 3);
              positions[positionPtr++] = positions[3 * a] + k * deltaPosition.x;
              positions[positionPtr++] = positions[3 * a + 1] + k * deltaPosition.y;
              positions[positionPtr++] = positions[3 * a + 2] + k * deltaPosition.z;
              if (normals) {
                normals[normalsPtr++] = normals[3 * a] + k * deltaNormal.x;
                normals[normalsPtr++] = normals[3 * a + 1] + k * deltaNormal.y;
                normals[normalsPtr++] = normals[3 * a + 2] + k * deltaNormal.z;
              }
              if (uvs) {
                uvs[uvPtr++] = uvs[2 * a] + k * deltaUV.x;
                uvs[uvPtr++] = uvs[2 * a + 1] + k * deltaUV.y;
              }
            }
            side[a][b].push(b);
            side[b][a] = new Array();
            len = side[a][b].length;
            for (let idx = 0; idx < len; idx++) {
              side[b][a][idx] = side[a][b][len - 1 - idx];
            }
          }
        }
        tempIndices[0][0] = currentIndices[i];
        tempIndices[1][0] = side[currentIndices[i]][currentIndices[i + 1]][1];
        tempIndices[1][1] = side[currentIndices[i]][currentIndices[i + 2]][1];
        for (let k = 2; k < segments; k++) {
          tempIndices[k][0] = side[currentIndices[i]][currentIndices[i + 1]][k];
          tempIndices[k][k] = side[currentIndices[i]][currentIndices[i + 2]][k];
          deltaPosition.x = (positions[3 * tempIndices[k][k]] - positions[3 * tempIndices[k][0]]) / k;
          deltaPosition.y = (positions[3 * tempIndices[k][k] + 1] - positions[3 * tempIndices[k][0] + 1]) / k;
          deltaPosition.z = (positions[3 * tempIndices[k][k] + 2] - positions[3 * tempIndices[k][0] + 2]) / k;
          if (normals) {
            deltaNormal.x = (normals[3 * tempIndices[k][k]] - normals[3 * tempIndices[k][0]]) / k;
            deltaNormal.y = (normals[3 * tempIndices[k][k] + 1] - normals[3 * tempIndices[k][0] + 1]) / k;
            deltaNormal.z = (normals[3 * tempIndices[k][k] + 2] - normals[3 * tempIndices[k][0] + 2]) / k;
          }
          if (uvs) {
            deltaUV.x = (uvs[2 * tempIndices[k][k]] - uvs[2 * tempIndices[k][0]]) / k;
            deltaUV.y = (uvs[2 * tempIndices[k][k] + 1] - uvs[2 * tempIndices[k][0] + 1]) / k;
          }
          for (let j = 1; j < k; j++) {
            tempIndices[k][j] = positions.length / 3;
            positions[positionPtr++] = positions[3 * tempIndices[k][0]] + j * deltaPosition.x;
            positions[positionPtr++] = positions[3 * tempIndices[k][0] + 1] + j * deltaPosition.y;
            positions[positionPtr++] = positions[3 * tempIndices[k][0] + 2] + j * deltaPosition.z;
            if (normals) {
              normals[normalsPtr++] = normals[3 * tempIndices[k][0]] + j * deltaNormal.x;
              normals[normalsPtr++] = normals[3 * tempIndices[k][0] + 1] + j * deltaNormal.y;
              normals[normalsPtr++] = normals[3 * tempIndices[k][0] + 2] + j * deltaNormal.z;
            }
            if (uvs) {
              uvs[uvPtr++] = uvs[2 * tempIndices[k][0]] + j * deltaUV.x;
              uvs[uvPtr++] = uvs[2 * tempIndices[k][0] + 1] + j * deltaUV.y;
            }
          }
        }
        tempIndices[segments] = side[currentIndices[i + 1]][currentIndices[i + 2]];
        indices.push(tempIndices[0][0], tempIndices[1][0], tempIndices[1][1]);
        for (let k = 1; k < segments; k++) {
          let j;
          for (j = 0; j < k; j++) {
            indices.push(tempIndices[k][j], tempIndices[k + 1][j], tempIndices[k + 1][j + 1]);
            indices.push(tempIndices[k][j], tempIndices[k + 1][j + 1], tempIndices[k][j + 1]);
          }
          indices.push(tempIndices[k][j], tempIndices[k + 1][j], tempIndices[k + 1][j + 1]);
        }
      }
      vertex_data.indices = indices;
      vertex_data.applyToMesh(this, this.isVertexBufferUpdatable(VertexBuffer.PositionKind));
    }
  }
  /**
   * Force adjacent facets to share vertices and remove any facets that have all vertices in a line
   * This will undo any application of covertToFlatShadedMesh
   * Warning : the mesh is really modified even if not set originally as updatable. A new VertexBuffer is created under the hood each call.
   */
  forceSharedVertices() {
    const vertex_data = VertexData.ExtractFromMesh(this);
    const currentUVs = vertex_data.uvs;
    const currentIndices = vertex_data.indices;
    const currentPositions = vertex_data.positions;
    const currentColors = vertex_data.colors;
    const currentMatrixIndices = vertex_data.matricesIndices;
    const currentMatrixWeights = vertex_data.matricesWeights;
    const currentMatrixIndicesExtra = vertex_data.matricesIndicesExtra;
    const currentMatrixWeightsExtra = vertex_data.matricesWeightsExtra;
    if (currentIndices === void 0 || currentPositions === void 0 || currentIndices === null || currentPositions === null) {
      Logger.Warn("VertexData contains empty entries");
    } else {
      const positions = new Array();
      const indices = new Array();
      const uvs = new Array();
      const colors = new Array();
      const matrixIndices = new Array();
      const matrixWeights = new Array();
      const matrixIndicesExtra = new Array();
      const matrixWeightsExtra = new Array();
      let pstring = new Array();
      let indexPtr = 0;
      const uniquePositions = {};
      let ptr;
      let facet;
      for (let i = 0; i < currentIndices.length; i += 3) {
        facet = [currentIndices[i], currentIndices[i + 1], currentIndices[i + 2]];
        pstring = [];
        for (let j = 0; j < 3; j++) {
          pstring[j] = "";
          for (let k = 0; k < 3; k++) {
            if (Math.abs(currentPositions[3 * facet[j] + k]) < 1e-8) {
              currentPositions[3 * facet[j] + k] = 0;
            }
            pstring[j] += currentPositions[3 * facet[j] + k] + "|";
          }
        }
        if (!(pstring[0] == pstring[1] || pstring[0] == pstring[2] || pstring[1] == pstring[2])) {
          for (let j = 0; j < 3; j++) {
            ptr = uniquePositions[pstring[j]];
            if (ptr === void 0) {
              uniquePositions[pstring[j]] = indexPtr;
              ptr = indexPtr++;
              for (let k = 0; k < 3; k++) {
                positions.push(currentPositions[3 * facet[j] + k]);
              }
              if (currentColors !== null && currentColors !== void 0) {
                for (let k = 0; k < 4; k++) {
                  colors.push(currentColors[4 * facet[j] + k]);
                }
              }
              if (currentUVs !== null && currentUVs !== void 0) {
                for (let k = 0; k < 2; k++) {
                  uvs.push(currentUVs[2 * facet[j] + k]);
                }
              }
              if (currentMatrixIndices !== null && currentMatrixIndices !== void 0) {
                for (let k = 0; k < 4; k++) {
                  matrixIndices.push(currentMatrixIndices[4 * facet[j] + k]);
                }
              }
              if (currentMatrixWeights !== null && currentMatrixWeights !== void 0) {
                for (let k = 0; k < 4; k++) {
                  matrixWeights.push(currentMatrixWeights[4 * facet[j] + k]);
                }
              }
              if (currentMatrixIndicesExtra !== null && currentMatrixIndicesExtra !== void 0) {
                for (let k = 0; k < 4; k++) {
                  matrixIndicesExtra.push(currentMatrixIndicesExtra[4 * facet[j] + k]);
                }
              }
              if (currentMatrixWeightsExtra !== null && currentMatrixWeightsExtra !== void 0) {
                for (let k = 0; k < 4; k++) {
                  matrixWeightsExtra.push(currentMatrixWeightsExtra[4 * facet[j] + k]);
                }
              }
            }
            indices.push(ptr);
          }
        }
      }
      const normals = new Array();
      VertexData.ComputeNormals(positions, indices, normals);
      vertex_data.positions = positions;
      vertex_data.indices = indices;
      vertex_data.normals = normals;
      if (currentUVs !== null && currentUVs !== void 0) {
        vertex_data.uvs = uvs;
      }
      if (currentColors !== null && currentColors !== void 0) {
        vertex_data.colors = colors;
      }
      if (currentMatrixIndices !== null && currentMatrixIndices !== void 0) {
        vertex_data.matricesIndices = matrixIndices;
      }
      if (currentMatrixWeights !== null && currentMatrixWeights !== void 0) {
        vertex_data.matricesWeights = matrixWeights;
      }
      if (currentMatrixIndicesExtra !== null && currentMatrixIndicesExtra !== void 0) {
        vertex_data.matricesIndicesExtra = matrixIndicesExtra;
      }
      if (currentMatrixWeights !== null && currentMatrixWeights !== void 0) {
        vertex_data.matricesWeightsExtra = matrixWeightsExtra;
      }
      vertex_data.applyToMesh(this, this.isVertexBufferUpdatable(VertexBuffer.PositionKind));
    }
  }
  // Instances
  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
  static _instancedMeshFactory(name, mesh) {
    throw _WarnImport("InstancedMesh");
  }
  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static _PhysicsImpostorParser(scene, physicObject, jsonObject) {
    throw _WarnImport("PhysicsImpostor");
  }
  /**
   * Creates a new InstancedMesh object from the mesh model.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
   * @param name defines the name of the new instance
   * @returns a new InstancedMesh
   */
  createInstance(name) {
    const instance = _Mesh._instancedMeshFactory(name, this);
    instance.parent = this.parent;
    return instance;
  }
  /**
   * Synchronises all the mesh instance submeshes to the current mesh submeshes, if any.
   * After this call, all the mesh instances have the same submeshes than the current mesh.
   * @returns the current mesh
   */
  synchronizeInstances() {
    for (let instanceIndex = 0; instanceIndex < this.instances.length; instanceIndex++) {
      const instance = this.instances[instanceIndex];
      instance._syncSubMeshes();
    }
    return this;
  }
  /**
   * Optimization of the mesh's indices, in case a mesh has duplicated vertices.
   * The function will only reorder the indices and will not remove unused vertices to avoid problems with submeshes.
   * This should be used together with the simplification to avoid disappearing triangles.
   * @param successCallback an optional success callback to be called after the optimization finished.
   * @returns the current mesh
   */
  optimizeIndices(successCallback) {
    const indices = this.getIndices();
    const positions = this.getVerticesData(VertexBuffer.PositionKind);
    if (!positions || !indices) {
      return this;
    }
    const vectorPositions = [];
    for (let pos = 0; pos < positions.length; pos = pos + 3) {
      vectorPositions.push(Vector3.FromArray(positions, pos));
    }
    const dupes = [];
    AsyncLoop.SyncAsyncForLoop(vectorPositions.length, 40, (iteration) => {
      const realPos = vectorPositions.length - 1 - iteration;
      const testedPosition = vectorPositions[realPos];
      for (let j = 0; j < realPos; ++j) {
        const againstPosition = vectorPositions[j];
        if (testedPosition.equals(againstPosition)) {
          dupes[realPos] = j;
          break;
        }
      }
    }, () => {
      for (let i = 0; i < indices.length; ++i) {
        indices[i] = dupes[indices[i]] || indices[i];
      }
      const originalSubMeshes = this.subMeshes.slice(0);
      this.setIndices(indices);
      this.subMeshes = originalSubMeshes;
      if (successCallback) {
        successCallback(this);
      }
    });
    return this;
  }
  /**
   * Serialize current mesh
   * @param serializationObject defines the object which will receive the serialization data
   * @returns the serialized object
   */
  serialize(serializationObject = {}) {
    serializationObject.name = this.name;
    serializationObject.id = this.id;
    serializationObject.uniqueId = this.uniqueId;
    serializationObject.type = this.getClassName();
    if (Tags && Tags.HasTags(this)) {
      serializationObject.tags = Tags.GetTags(this);
    }
    serializationObject.position = this.position.asArray();
    if (this.rotationQuaternion) {
      serializationObject.rotationQuaternion = this.rotationQuaternion.asArray();
    } else if (this.rotation) {
      serializationObject.rotation = this.rotation.asArray();
    }
    serializationObject.scaling = this.scaling.asArray();
    if (this._postMultiplyPivotMatrix) {
      serializationObject.pivotMatrix = this.getPivotMatrix().asArray();
    } else {
      serializationObject.localMatrix = this.getPivotMatrix().asArray();
    }
    serializationObject.isEnabled = this.isEnabled(false);
    serializationObject.isVisible = this.isVisible;
    serializationObject.infiniteDistance = this.infiniteDistance;
    serializationObject.pickable = this.isPickable;
    serializationObject.receiveShadows = this.receiveShadows;
    serializationObject.billboardMode = this.billboardMode;
    serializationObject.visibility = this.visibility;
    serializationObject.alwaysSelectAsActiveMesh = this.alwaysSelectAsActiveMesh;
    serializationObject.checkCollisions = this.checkCollisions;
    serializationObject.ellipsoid = this.ellipsoid.asArray();
    serializationObject.ellipsoidOffset = this.ellipsoidOffset.asArray();
    serializationObject.doNotSyncBoundingInfo = this.doNotSyncBoundingInfo;
    serializationObject.isBlocker = this.isBlocker;
    serializationObject.sideOrientation = this.sideOrientation;
    if (this.parent) {
      this.parent._serializeAsParent(serializationObject);
    }
    serializationObject.isUnIndexed = this.isUnIndexed;
    const geometry = this._geometry;
    if (geometry && this.subMeshes) {
      serializationObject.geometryUniqueId = geometry.uniqueId;
      serializationObject.geometryId = geometry.id;
      serializationObject.subMeshes = [];
      for (let subIndex = 0; subIndex < this.subMeshes.length; subIndex++) {
        const subMesh = this.subMeshes[subIndex];
        serializationObject.subMeshes.push({
          materialIndex: subMesh.materialIndex,
          verticesStart: subMesh.verticesStart,
          verticesCount: subMesh.verticesCount,
          indexStart: subMesh.indexStart,
          indexCount: subMesh.indexCount
        });
      }
    }
    if (this.material) {
      if (!this.material.doNotSerialize) {
        serializationObject.materialUniqueId = this.material.uniqueId;
        serializationObject.materialId = this.material.id;
      }
    } else {
      this.material = null;
      serializationObject.materialUniqueId = this._scene.defaultMaterial.uniqueId;
      serializationObject.materialId = this._scene.defaultMaterial.id;
    }
    if (this.morphTargetManager) {
      serializationObject.morphTargetManagerId = this.morphTargetManager.uniqueId;
    }
    if (this.skeleton) {
      serializationObject.skeletonId = this.skeleton.id;
      serializationObject.numBoneInfluencers = this.numBoneInfluencers;
    }
    if (this.getScene()._getComponent(SceneComponentConstants.NAME_PHYSICSENGINE)) {
      const impostor = this.getPhysicsImpostor();
      if (impostor) {
        serializationObject.physicsMass = impostor.getParam("mass");
        serializationObject.physicsFriction = impostor.getParam("friction");
        serializationObject.physicsRestitution = impostor.getParam("mass");
        serializationObject.physicsImpostor = impostor.type;
      }
    }
    if (this.metadata) {
      serializationObject.metadata = this.metadata;
    }
    serializationObject.instances = [];
    for (let index = 0; index < this.instances.length; index++) {
      const instance = this.instances[index];
      if (instance.doNotSerialize) {
        continue;
      }
      const serializationInstance = {
        name: instance.name,
        id: instance.id,
        isEnabled: instance.isEnabled(false),
        isVisible: instance.isVisible,
        isPickable: instance.isPickable,
        checkCollisions: instance.checkCollisions,
        position: instance.position.asArray(),
        scaling: instance.scaling.asArray()
      };
      if (instance.parent) {
        instance.parent._serializeAsParent(serializationInstance);
      }
      if (instance.rotationQuaternion) {
        serializationInstance.rotationQuaternion = instance.rotationQuaternion.asArray();
      } else if (instance.rotation) {
        serializationInstance.rotation = instance.rotation.asArray();
      }
      if (this.getScene()._getComponent(SceneComponentConstants.NAME_PHYSICSENGINE)) {
        const impostor = instance.getPhysicsImpostor();
        if (impostor) {
          serializationInstance.physicsMass = impostor.getParam("mass");
          serializationInstance.physicsFriction = impostor.getParam("friction");
          serializationInstance.physicsRestitution = impostor.getParam("mass");
          serializationInstance.physicsImpostor = impostor.type;
        }
      }
      if (instance.metadata) {
        serializationInstance.metadata = instance.metadata;
      }
      if (instance.actionManager) {
        serializationInstance.actions = instance.actionManager.serialize(instance.name);
      }
      serializationObject.instances.push(serializationInstance);
      SerializationHelper.AppendSerializedAnimations(instance, serializationInstance);
      serializationInstance.ranges = instance.serializeAnimationRanges();
    }
    if (this._thinInstanceDataStorage.instancesCount && this._thinInstanceDataStorage.matrixData) {
      serializationObject.thinInstances = {
        instancesCount: this._thinInstanceDataStorage.instancesCount,
        matrixData: Array.from(this._thinInstanceDataStorage.matrixData),
        matrixBufferSize: this._thinInstanceDataStorage.matrixBufferSize,
        enablePicking: this.thinInstanceEnablePicking
      };
      if (this._userThinInstanceBuffersStorage) {
        const userThinInstance = {
          data: {},
          sizes: {},
          strides: {}
        };
        for (const kind in this._userThinInstanceBuffersStorage.data) {
          userThinInstance.data[kind] = Array.from(this._userThinInstanceBuffersStorage.data[kind]);
          userThinInstance.sizes[kind] = this._userThinInstanceBuffersStorage.sizes[kind];
          userThinInstance.strides[kind] = this._userThinInstanceBuffersStorage.strides[kind];
        }
        serializationObject.thinInstances.userThinInstance = userThinInstance;
      }
    }
    SerializationHelper.AppendSerializedAnimations(this, serializationObject);
    serializationObject.ranges = this.serializeAnimationRanges();
    serializationObject.layerMask = this.layerMask;
    serializationObject.alphaIndex = this.alphaIndex;
    serializationObject.hasVertexAlpha = this.hasVertexAlpha;
    serializationObject.overlayAlpha = this.overlayAlpha;
    serializationObject.overlayColor = this.overlayColor.asArray();
    serializationObject.renderOverlay = this.renderOverlay;
    serializationObject.applyFog = this.applyFog;
    if (this.actionManager) {
      serializationObject.actions = this.actionManager.serialize(this.name);
    }
    return serializationObject;
  }
  /** @internal */
  _syncGeometryWithMorphTargetManager() {
    if (!this.geometry) {
      return;
    }
    this._markSubMeshesAsAttributesDirty();
    const morphTargetManager = this._internalAbstractMeshDataInfo._morphTargetManager;
    if (morphTargetManager && morphTargetManager.vertexCount) {
      if (morphTargetManager.vertexCount !== this.getTotalVertices()) {
        Logger.Error("Mesh is incompatible with morph targets. Targets and mesh must all have the same vertices count.");
        this.morphTargetManager = null;
        return;
      }
      if (morphTargetManager.isUsingTextureForTargets) {
        return;
      }
      for (let index = 0; index < morphTargetManager.numInfluencers; index++) {
        const morphTarget = morphTargetManager.getActiveTarget(index);
        const positions = morphTarget.getPositions();
        if (!positions) {
          Logger.Error("Invalid morph target. Target must have positions.");
          return;
        }
        this.geometry.setVerticesData(VertexBuffer.PositionKind + index, positions, false, 3);
        const normals = morphTarget.getNormals();
        if (normals) {
          this.geometry.setVerticesData(VertexBuffer.NormalKind + index, normals, false, 3);
        }
        const tangents = morphTarget.getTangents();
        if (tangents) {
          this.geometry.setVerticesData(VertexBuffer.TangentKind + index, tangents, false, 3);
        }
        const uvs = morphTarget.getUVs();
        if (uvs) {
          this.geometry.setVerticesData(VertexBuffer.UVKind + "_" + index, uvs, false, 2);
        }
        const uv2s = morphTarget.getUV2s();
        if (uv2s) {
          this.geometry.setVerticesData(VertexBuffer.UV2Kind + "_" + index, uv2s, false, 2);
        }
        const colors = morphTarget.getColors();
        if (colors) {
          this.geometry.setVerticesData(VertexBuffer.ColorKind + index, colors, false, 4);
        }
      }
    } else {
      let index = 0;
      while (this.geometry.isVerticesDataPresent(VertexBuffer.PositionKind + index)) {
        this.geometry.removeVerticesData(VertexBuffer.PositionKind + index);
        if (this.geometry.isVerticesDataPresent(VertexBuffer.NormalKind + index)) {
          this.geometry.removeVerticesData(VertexBuffer.NormalKind + index);
        }
        if (this.geometry.isVerticesDataPresent(VertexBuffer.TangentKind + index)) {
          this.geometry.removeVerticesData(VertexBuffer.TangentKind + index);
        }
        if (this.geometry.isVerticesDataPresent(VertexBuffer.UVKind + index)) {
          this.geometry.removeVerticesData(VertexBuffer.UVKind + "_" + index);
        }
        if (this.geometry.isVerticesDataPresent(VertexBuffer.UV2Kind + index)) {
          this.geometry.removeVerticesData(VertexBuffer.UV2Kind + "_" + index);
        }
        if (this.geometry.isVerticesDataPresent(VertexBuffer.ColorKind + index)) {
          this.geometry.removeVerticesData(VertexBuffer.ColorKind + index);
        }
        index++;
      }
    }
  }
  /**
   * Returns a new Mesh object parsed from the source provided.
   * @param parsedMesh is the source
   * @param scene defines the hosting scene
   * @param rootUrl is the root URL to prefix the `delayLoadingFile` property with
   * @returns a new Mesh
   */
  static Parse(parsedMesh, scene, rootUrl) {
    let mesh;
    if (parsedMesh.type && parsedMesh.type === "LinesMesh") {
      mesh = _Mesh._LinesMeshParser(parsedMesh, scene);
    } else if (parsedMesh.type && parsedMesh.type === "GroundMesh") {
      mesh = _Mesh._GroundMeshParser(parsedMesh, scene);
    } else if (parsedMesh.type && parsedMesh.type === "GoldbergMesh") {
      mesh = _Mesh._GoldbergMeshParser(parsedMesh, scene);
    } else if (parsedMesh.type && parsedMesh.type === "GreasedLineMesh") {
      mesh = _Mesh._GreasedLineMeshParser(parsedMesh, scene);
    } else if (parsedMesh.type && parsedMesh.type === "TrailMesh") {
      mesh = _Mesh._TrailMeshParser(parsedMesh, scene);
    } else {
      mesh = new _Mesh(parsedMesh.name, scene);
    }
    mesh.id = parsedMesh.id;
    mesh._waitingParsedUniqueId = parsedMesh.uniqueId;
    if (Tags) {
      Tags.AddTagsTo(mesh, parsedMesh.tags);
    }
    mesh.position = Vector3.FromArray(parsedMesh.position);
    if (parsedMesh.metadata !== void 0) {
      mesh.metadata = parsedMesh.metadata;
    }
    if (parsedMesh.rotationQuaternion) {
      mesh.rotationQuaternion = Quaternion.FromArray(parsedMesh.rotationQuaternion);
    } else if (parsedMesh.rotation) {
      mesh.rotation = Vector3.FromArray(parsedMesh.rotation);
    }
    mesh.scaling = Vector3.FromArray(parsedMesh.scaling);
    if (parsedMesh.localMatrix) {
      mesh.setPreTransformMatrix(Matrix.FromArray(parsedMesh.localMatrix));
    } else if (parsedMesh.pivotMatrix) {
      mesh.setPivotMatrix(Matrix.FromArray(parsedMesh.pivotMatrix));
    }
    mesh.setEnabled(parsedMesh.isEnabled);
    mesh.isVisible = parsedMesh.isVisible;
    mesh.infiniteDistance = parsedMesh.infiniteDistance;
    mesh.alwaysSelectAsActiveMesh = !!parsedMesh.alwaysSelectAsActiveMesh;
    mesh.showBoundingBox = parsedMesh.showBoundingBox;
    mesh.showSubMeshesBoundingBox = parsedMesh.showSubMeshesBoundingBox;
    if (parsedMesh.applyFog !== void 0) {
      mesh.applyFog = parsedMesh.applyFog;
    }
    if (parsedMesh.pickable !== void 0) {
      mesh.isPickable = parsedMesh.pickable;
    }
    if (parsedMesh.alphaIndex !== void 0) {
      mesh.alphaIndex = parsedMesh.alphaIndex;
    }
    mesh.receiveShadows = parsedMesh.receiveShadows;
    if (parsedMesh.billboardMode !== void 0) {
      mesh.billboardMode = parsedMesh.billboardMode;
    }
    if (parsedMesh.visibility !== void 0) {
      mesh.visibility = parsedMesh.visibility;
    }
    mesh.checkCollisions = parsedMesh.checkCollisions;
    mesh.doNotSyncBoundingInfo = !!parsedMesh.doNotSyncBoundingInfo;
    if (parsedMesh.ellipsoid) {
      mesh.ellipsoid = Vector3.FromArray(parsedMesh.ellipsoid);
    }
    if (parsedMesh.ellipsoidOffset) {
      mesh.ellipsoidOffset = Vector3.FromArray(parsedMesh.ellipsoidOffset);
    }
    if (parsedMesh.overrideMaterialSideOrientation != null) {
      mesh.sideOrientation = parsedMesh.overrideMaterialSideOrientation;
    }
    if (parsedMesh.sideOrientation !== void 0) {
      mesh.sideOrientation = parsedMesh.sideOrientation;
    }
    if (parsedMesh.isBlocker !== void 0) {
      mesh.isBlocker = parsedMesh.isBlocker;
    }
    mesh._shouldGenerateFlatShading = parsedMesh.useFlatShading;
    if (parsedMesh.freezeWorldMatrix) {
      mesh._waitingData.freezeWorldMatrix = parsedMesh.freezeWorldMatrix;
    }
    if (parsedMesh.parentId !== void 0) {
      mesh._waitingParentId = parsedMesh.parentId;
    }
    if (parsedMesh.parentInstanceIndex !== void 0) {
      mesh._waitingParentInstanceIndex = parsedMesh.parentInstanceIndex;
    }
    if (parsedMesh.actions !== void 0) {
      mesh._waitingData.actions = parsedMesh.actions;
    }
    if (parsedMesh.overlayAlpha !== void 0) {
      mesh.overlayAlpha = parsedMesh.overlayAlpha;
    }
    if (parsedMesh.overlayColor !== void 0) {
      mesh.overlayColor = Color3.FromArray(parsedMesh.overlayColor);
    }
    if (parsedMesh.renderOverlay !== void 0) {
      mesh.renderOverlay = parsedMesh.renderOverlay;
    }
    mesh.isUnIndexed = !!parsedMesh.isUnIndexed;
    mesh.hasVertexAlpha = parsedMesh.hasVertexAlpha;
    if (parsedMesh.delayLoadingFile) {
      mesh.delayLoadState = 4;
      mesh.delayLoadingFile = rootUrl + parsedMesh.delayLoadingFile;
      mesh.buildBoundingInfo(Vector3.FromArray(parsedMesh.boundingBoxMinimum), Vector3.FromArray(parsedMesh.boundingBoxMaximum));
      if (parsedMesh._binaryInfo) {
        mesh._binaryInfo = parsedMesh._binaryInfo;
      }
      mesh._delayInfo = [];
      if (parsedMesh.hasUVs) {
        mesh._delayInfo.push(VertexBuffer.UVKind);
      }
      if (parsedMesh.hasUVs2) {
        mesh._delayInfo.push(VertexBuffer.UV2Kind);
      }
      if (parsedMesh.hasUVs3) {
        mesh._delayInfo.push(VertexBuffer.UV3Kind);
      }
      if (parsedMesh.hasUVs4) {
        mesh._delayInfo.push(VertexBuffer.UV4Kind);
      }
      if (parsedMesh.hasUVs5) {
        mesh._delayInfo.push(VertexBuffer.UV5Kind);
      }
      if (parsedMesh.hasUVs6) {
        mesh._delayInfo.push(VertexBuffer.UV6Kind);
      }
      if (parsedMesh.hasColors) {
        mesh._delayInfo.push(VertexBuffer.ColorKind);
      }
      if (parsedMesh.hasMatricesIndices) {
        mesh._delayInfo.push(VertexBuffer.MatricesIndicesKind);
      }
      if (parsedMesh.hasMatricesWeights) {
        mesh._delayInfo.push(VertexBuffer.MatricesWeightsKind);
      }
      mesh._delayLoadingFunction = Geometry._ImportGeometry;
      if (SceneLoaderFlags.ForceFullSceneLoadingForIncremental) {
        mesh._checkDelayState();
      }
    } else {
      Geometry._ImportGeometry(parsedMesh, mesh);
    }
    if (parsedMesh.materialUniqueId) {
      mesh._waitingMaterialId = parsedMesh.materialUniqueId;
    } else if (parsedMesh.materialId) {
      mesh._waitingMaterialId = parsedMesh.materialId;
    }
    if (parsedMesh.morphTargetManagerId > -1) {
      mesh._waitingMorphTargetManagerId = parsedMesh.morphTargetManagerId;
    }
    if (parsedMesh.skeletonId !== void 0 && parsedMesh.skeletonId !== null) {
      mesh.skeleton = scene.getLastSkeletonById(parsedMesh.skeletonId);
      if (parsedMesh.numBoneInfluencers) {
        mesh.numBoneInfluencers = parsedMesh.numBoneInfluencers;
      }
    }
    if (parsedMesh.animations) {
      for (let animationIndex = 0; animationIndex < parsedMesh.animations.length; animationIndex++) {
        const parsedAnimation = parsedMesh.animations[animationIndex];
        const internalClass = GetClass("BABYLON.Animation");
        if (internalClass) {
          mesh.animations.push(internalClass.Parse(parsedAnimation));
        }
      }
      Node.ParseAnimationRanges(mesh, parsedMesh, scene);
    }
    if (parsedMesh.autoAnimate) {
      scene.beginAnimation(mesh, parsedMesh.autoAnimateFrom, parsedMesh.autoAnimateTo, parsedMesh.autoAnimateLoop, parsedMesh.autoAnimateSpeed || 1);
    }
    if (parsedMesh.layerMask && !isNaN(parsedMesh.layerMask)) {
      mesh.layerMask = Math.abs(parseInt(parsedMesh.layerMask));
    } else {
      mesh.layerMask = 268435455;
    }
    if (parsedMesh.physicsImpostor) {
      mesh.physicsImpostor = _Mesh._PhysicsImpostorParser(scene, mesh, parsedMesh);
    }
    if (parsedMesh.lodMeshIds) {
      mesh._waitingData.lods = {
        ids: parsedMesh.lodMeshIds,
        distances: parsedMesh.lodDistances ? parsedMesh.lodDistances : null,
        coverages: parsedMesh.lodCoverages ? parsedMesh.lodCoverages : null
      };
    }
    if (parsedMesh.instances) {
      for (let index = 0; index < parsedMesh.instances.length; index++) {
        const parsedInstance = parsedMesh.instances[index];
        const instance = mesh.createInstance(parsedInstance.name);
        if (parsedInstance.id) {
          instance.id = parsedInstance.id;
        }
        if (Tags) {
          if (parsedInstance.tags) {
            Tags.AddTagsTo(instance, parsedInstance.tags);
          } else {
            Tags.AddTagsTo(instance, parsedMesh.tags);
          }
        }
        instance.position = Vector3.FromArray(parsedInstance.position);
        if (parsedInstance.metadata !== void 0) {
          instance.metadata = parsedInstance.metadata;
        }
        if (parsedInstance.parentId !== void 0) {
          instance._waitingParentId = parsedInstance.parentId;
        }
        if (parsedInstance.parentInstanceIndex !== void 0) {
          instance._waitingParentInstanceIndex = parsedInstance.parentInstanceIndex;
        }
        if (parsedInstance.isEnabled !== void 0 && parsedInstance.isEnabled !== null) {
          instance.setEnabled(parsedInstance.isEnabled);
        }
        if (parsedInstance.isVisible !== void 0 && parsedInstance.isVisible !== null) {
          instance.isVisible = parsedInstance.isVisible;
        }
        if (parsedInstance.isPickable !== void 0 && parsedInstance.isPickable !== null) {
          instance.isPickable = parsedInstance.isPickable;
        }
        if (parsedInstance.rotationQuaternion) {
          instance.rotationQuaternion = Quaternion.FromArray(parsedInstance.rotationQuaternion);
        } else if (parsedInstance.rotation) {
          instance.rotation = Vector3.FromArray(parsedInstance.rotation);
        }
        instance.scaling = Vector3.FromArray(parsedInstance.scaling);
        if (parsedInstance.checkCollisions != void 0 && parsedInstance.checkCollisions != null) {
          instance.checkCollisions = parsedInstance.checkCollisions;
        }
        if (parsedInstance.pickable != void 0 && parsedInstance.pickable != null) {
          instance.isPickable = parsedInstance.pickable;
        }
        if (parsedInstance.showBoundingBox != void 0 && parsedInstance.showBoundingBox != null) {
          instance.showBoundingBox = parsedInstance.showBoundingBox;
        }
        if (parsedInstance.showSubMeshesBoundingBox != void 0 && parsedInstance.showSubMeshesBoundingBox != null) {
          instance.showSubMeshesBoundingBox = parsedInstance.showSubMeshesBoundingBox;
        }
        if (parsedInstance.alphaIndex != void 0 && parsedInstance.showSubMeshesBoundingBox != null) {
          instance.alphaIndex = parsedInstance.alphaIndex;
        }
        if (parsedInstance.physicsImpostor) {
          instance.physicsImpostor = _Mesh._PhysicsImpostorParser(scene, instance, parsedInstance);
        }
        if (parsedInstance.actions !== void 0) {
          instance._waitingData.actions = parsedInstance.actions;
        }
        if (parsedInstance.animations) {
          for (let animationIndex = 0; animationIndex < parsedInstance.animations.length; animationIndex++) {
            const parsedAnimation = parsedInstance.animations[animationIndex];
            const internalClass = GetClass("BABYLON.Animation");
            if (internalClass) {
              instance.animations.push(internalClass.Parse(parsedAnimation));
            }
          }
          Node.ParseAnimationRanges(instance, parsedInstance, scene);
          if (parsedInstance.autoAnimate) {
            scene.beginAnimation(instance, parsedInstance.autoAnimateFrom, parsedInstance.autoAnimateTo, parsedInstance.autoAnimateLoop, parsedInstance.autoAnimateSpeed || 1);
          }
        }
      }
    }
    if (parsedMesh.thinInstances) {
      const thinInstances = parsedMesh.thinInstances;
      mesh.thinInstanceEnablePicking = !!thinInstances.enablePicking;
      if (thinInstances.matrixData) {
        mesh.thinInstanceSetBuffer("matrix", new Float32Array(thinInstances.matrixData), 16, false);
        mesh._thinInstanceDataStorage.matrixBufferSize = thinInstances.matrixBufferSize;
        mesh._thinInstanceDataStorage.instancesCount = thinInstances.instancesCount;
      } else {
        mesh._thinInstanceDataStorage.matrixBufferSize = thinInstances.matrixBufferSize;
      }
      if (parsedMesh.thinInstances.userThinInstance) {
        const userThinInstance = parsedMesh.thinInstances.userThinInstance;
        for (const kind in userThinInstance.data) {
          mesh.thinInstanceSetBuffer(kind, new Float32Array(userThinInstance.data[kind]), userThinInstance.strides[kind], false);
          mesh._userThinInstanceBuffersStorage.sizes[kind] = userThinInstance.sizes[kind];
        }
      }
    }
    return mesh;
  }
  // Skeletons
  /**
   * Prepare internal position array for software CPU skinning
   * @returns original positions used for CPU skinning. Useful for integrating Morphing with skeletons in same mesh
   */
  setPositionsForCPUSkinning() {
    const internalDataInfo = this._internalMeshDataInfo;
    if (!internalDataInfo._sourcePositions) {
      const source = this.getVerticesData(VertexBuffer.PositionKind);
      if (!source) {
        return internalDataInfo._sourcePositions;
      }
      internalDataInfo._sourcePositions = new Float32Array(source);
      if (!this.isVertexBufferUpdatable(VertexBuffer.PositionKind)) {
        this.setVerticesData(VertexBuffer.PositionKind, source, true);
      }
    }
    return internalDataInfo._sourcePositions;
  }
  /**
   * Prepare internal normal array for software CPU skinning
   * @returns original normals used for CPU skinning. Useful for integrating Morphing with skeletons in same mesh.
   */
  setNormalsForCPUSkinning() {
    const internalDataInfo = this._internalMeshDataInfo;
    if (!internalDataInfo._sourceNormals) {
      const source = this.getVerticesData(VertexBuffer.NormalKind);
      if (!source) {
        return internalDataInfo._sourceNormals;
      }
      internalDataInfo._sourceNormals = new Float32Array(source);
      if (!this.isVertexBufferUpdatable(VertexBuffer.NormalKind)) {
        this.setVerticesData(VertexBuffer.NormalKind, source, true);
      }
    }
    return internalDataInfo._sourceNormals;
  }
  /**
   * Updates the vertex buffer by applying transformation from the bones
   * @param skeleton defines the skeleton to apply to current mesh
   * @returns the current mesh
   */
  applySkeleton(skeleton) {
    if (!this.geometry) {
      return this;
    }
    if (this.geometry._softwareSkinningFrameId == this.getScene().getFrameId()) {
      return this;
    }
    this.geometry._softwareSkinningFrameId = this.getScene().getFrameId();
    if (!this.isVerticesDataPresent(VertexBuffer.PositionKind)) {
      return this;
    }
    if (!this.isVerticesDataPresent(VertexBuffer.MatricesIndicesKind)) {
      return this;
    }
    if (!this.isVerticesDataPresent(VertexBuffer.MatricesWeightsKind)) {
      return this;
    }
    const hasNormals = this.isVerticesDataPresent(VertexBuffer.NormalKind);
    const internalDataInfo = this._internalMeshDataInfo;
    if (!internalDataInfo._sourcePositions) {
      const submeshes = this.subMeshes.slice();
      this.setPositionsForCPUSkinning();
      this.subMeshes = submeshes;
    }
    if (hasNormals && !internalDataInfo._sourceNormals) {
      this.setNormalsForCPUSkinning();
    }
    let positionsData = this.getVerticesData(VertexBuffer.PositionKind);
    if (!positionsData) {
      return this;
    }
    if (!(positionsData instanceof Float32Array)) {
      positionsData = new Float32Array(positionsData);
    }
    let normalsData = this.getVerticesData(VertexBuffer.NormalKind);
    if (hasNormals) {
      if (!normalsData) {
        return this;
      }
      if (!(normalsData instanceof Float32Array)) {
        normalsData = new Float32Array(normalsData);
      }
    }
    const matricesIndicesData = this.getVerticesData(VertexBuffer.MatricesIndicesKind);
    const matricesWeightsData = this.getVerticesData(VertexBuffer.MatricesWeightsKind);
    if (!matricesWeightsData || !matricesIndicesData) {
      return this;
    }
    const needExtras = this.numBoneInfluencers > 4;
    const matricesIndicesExtraData = needExtras ? this.getVerticesData(VertexBuffer.MatricesIndicesExtraKind) : null;
    const matricesWeightsExtraData = needExtras ? this.getVerticesData(VertexBuffer.MatricesWeightsExtraKind) : null;
    const skeletonMatrices = skeleton.getTransformMatrices(this);
    const tempVector3 = Vector3.Zero();
    const finalMatrix = new Matrix();
    const tempMatrix = new Matrix();
    let matWeightIdx = 0;
    let inf;
    for (let index = 0; index < positionsData.length; index += 3, matWeightIdx += 4) {
      let weight;
      for (inf = 0; inf < 4; inf++) {
        weight = matricesWeightsData[matWeightIdx + inf];
        if (weight > 0) {
          Matrix.FromFloat32ArrayToRefScaled(skeletonMatrices, Math.floor(matricesIndicesData[matWeightIdx + inf] * 16), weight, tempMatrix);
          finalMatrix.addToSelf(tempMatrix);
        }
      }
      if (needExtras) {
        for (inf = 0; inf < 4; inf++) {
          weight = matricesWeightsExtraData[matWeightIdx + inf];
          if (weight > 0) {
            Matrix.FromFloat32ArrayToRefScaled(skeletonMatrices, Math.floor(matricesIndicesExtraData[matWeightIdx + inf] * 16), weight, tempMatrix);
            finalMatrix.addToSelf(tempMatrix);
          }
        }
      }
      Vector3.TransformCoordinatesFromFloatsToRef(internalDataInfo._sourcePositions[index], internalDataInfo._sourcePositions[index + 1], internalDataInfo._sourcePositions[index + 2], finalMatrix, tempVector3);
      tempVector3.toArray(positionsData, index);
      if (hasNormals) {
        Vector3.TransformNormalFromFloatsToRef(internalDataInfo._sourceNormals[index], internalDataInfo._sourceNormals[index + 1], internalDataInfo._sourceNormals[index + 2], finalMatrix, tempVector3);
        tempVector3.toArray(normalsData, index);
      }
      finalMatrix.reset();
    }
    this.updateVerticesData(VertexBuffer.PositionKind, positionsData);
    if (hasNormals) {
      this.updateVerticesData(VertexBuffer.NormalKind, normalsData);
    }
    return this;
  }
  // Tools
  /**
   * Returns an object containing a min and max Vector3 which are the minimum and maximum vectors of each mesh bounding box from the passed array, in the world coordinates
   * @param meshes defines the list of meshes to scan
   * @returns an object `{min:` Vector3`, max:` Vector3`}`
   */
  static MinMax(meshes) {
    let minVector = null;
    let maxVector = null;
    meshes.forEach(function(mesh) {
      const boundingInfo = mesh.getBoundingInfo();
      const boundingBox = boundingInfo.boundingBox;
      if (!minVector || !maxVector) {
        minVector = boundingBox.minimumWorld;
        maxVector = boundingBox.maximumWorld;
      } else {
        minVector.minimizeInPlace(boundingBox.minimumWorld);
        maxVector.maximizeInPlace(boundingBox.maximumWorld);
      }
    });
    if (!minVector || !maxVector) {
      return {
        min: Vector3.Zero(),
        max: Vector3.Zero()
      };
    }
    return {
      min: minVector,
      max: maxVector
    };
  }
  /**
   * Returns the center of the `{min:` Vector3`, max:` Vector3`}` or the center of MinMax vector3 computed from a mesh array
   * @param meshesOrMinMaxVector could be an array of meshes or a `{min:` Vector3`, max:` Vector3`}` object
   * @returns a vector3
   */
  static Center(meshesOrMinMaxVector) {
    const minMaxVector = meshesOrMinMaxVector instanceof Array ? _Mesh.MinMax(meshesOrMinMaxVector) : meshesOrMinMaxVector;
    return Vector3.Center(minMaxVector.min, minMaxVector.max);
  }
  /**
   * Merge the array of meshes into a single mesh for performance reasons.
   * @param meshes array of meshes with the vertices to merge. Entries cannot be empty meshes.
   * @param disposeSource when true (default), dispose of the vertices from the source meshes.
   * @param allow32BitsIndices when the sum of the vertices > 64k, this must be set to true.
   * @param meshSubclass (optional) can be set to a Mesh where the merged vertices will be inserted.
   * @param subdivideWithSubMeshes when true (false default), subdivide mesh into subMeshes.
   * @param multiMultiMaterials when true (false default), subdivide mesh into subMeshes with multiple materials, ignores subdivideWithSubMeshes.
   * @returns a new mesh
   */
  static MergeMeshes(meshes, disposeSource = true, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterials) {
    return runCoroutineSync(_Mesh._MergeMeshesCoroutine(meshes, disposeSource, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterials, false));
  }
  /**
   * Merge the array of meshes into a single mesh for performance reasons.
   * @param meshes array of meshes with the vertices to merge. Entries cannot be empty meshes.
   * @param disposeSource when true (default), dispose of the vertices from the source meshes.
   * @param allow32BitsIndices when the sum of the vertices > 64k, this must be set to true.
   * @param meshSubclass (optional) can be set to a Mesh where the merged vertices will be inserted.
   * @param subdivideWithSubMeshes when true (false default), subdivide mesh into subMeshes.
   * @param multiMultiMaterials when true (false default), subdivide mesh into subMeshes with multiple materials, ignores subdivideWithSubMeshes.
   * @returns a new mesh
   */
  static MergeMeshesAsync(meshes, disposeSource = true, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterials) {
    return runCoroutineAsync(_Mesh._MergeMeshesCoroutine(meshes, disposeSource, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterials, true), createYieldingScheduler());
  }
  static *_MergeMeshesCoroutine(meshes, disposeSource = true, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterials, isAsync) {
    meshes = meshes.filter(Boolean);
    if (meshes.length === 0) {
      return null;
    }
    let index;
    if (!allow32BitsIndices) {
      let totalVertices = 0;
      for (index = 0; index < meshes.length; index++) {
        totalVertices += meshes[index].getTotalVertices();
        if (totalVertices >= 65536) {
          Logger.Warn("Cannot merge meshes because resulting mesh will have more than 65536 vertices. Please use allow32BitsIndices = true to use 32 bits indices");
          return null;
        }
      }
    }
    if (multiMultiMaterials) {
      subdivideWithSubMeshes = false;
    }
    const materialArray = new Array();
    const materialIndexArray = new Array();
    const indiceArray = new Array();
    const currentsideOrientation = meshes[0].sideOrientation;
    for (index = 0; index < meshes.length; index++) {
      const mesh = meshes[index];
      if (mesh.isAnInstance) {
        Logger.Warn("Cannot merge instance meshes.");
        return null;
      }
      if (currentsideOrientation !== mesh.sideOrientation) {
        Logger.Warn("Cannot merge meshes with different sideOrientation values.");
        return null;
      }
      if (subdivideWithSubMeshes) {
        indiceArray.push(mesh.getTotalIndices());
      }
      if (multiMultiMaterials) {
        if (mesh.material) {
          const material = mesh.material;
          if (material instanceof MultiMaterial) {
            for (let matIndex = 0; matIndex < material.subMaterials.length; matIndex++) {
              if (materialArray.indexOf(material.subMaterials[matIndex]) < 0) {
                materialArray.push(material.subMaterials[matIndex]);
              }
            }
            for (let subIndex = 0; subIndex < mesh.subMeshes.length; subIndex++) {
              materialIndexArray.push(materialArray.indexOf(material.subMaterials[mesh.subMeshes[subIndex].materialIndex]));
              indiceArray.push(mesh.subMeshes[subIndex].indexCount);
            }
          } else {
            if (materialArray.indexOf(material) < 0) {
              materialArray.push(material);
            }
            for (let subIndex = 0; subIndex < mesh.subMeshes.length; subIndex++) {
              materialIndexArray.push(materialArray.indexOf(material));
              indiceArray.push(mesh.subMeshes[subIndex].indexCount);
            }
          }
        } else {
          for (let subIndex = 0; subIndex < mesh.subMeshes.length; subIndex++) {
            materialIndexArray.push(0);
            indiceArray.push(mesh.subMeshes[subIndex].indexCount);
          }
        }
      }
    }
    const source = meshes[0];
    const getVertexDataFromMesh = (mesh) => {
      const wm = mesh.computeWorldMatrix(true);
      const vertexData2 = VertexData.ExtractFromMesh(mesh, false, false);
      return { vertexData: vertexData2, transform: wm };
    };
    const { vertexData: sourceVertexData, transform: sourceTransform } = getVertexDataFromMesh(source);
    if (isAsync) {
      yield;
    }
    const meshVertexDatas = new Array(meshes.length - 1);
    for (let i = 1; i < meshes.length; i++) {
      meshVertexDatas[i - 1] = getVertexDataFromMesh(meshes[i]);
      if (isAsync) {
        yield;
      }
    }
    const mergeCoroutine = sourceVertexData._mergeCoroutine(sourceTransform, meshVertexDatas, allow32BitsIndices, isAsync, !disposeSource);
    let mergeCoroutineStep = mergeCoroutine.next();
    while (!mergeCoroutineStep.done) {
      if (isAsync) {
        yield;
      }
      mergeCoroutineStep = mergeCoroutine.next();
    }
    const vertexData = mergeCoroutineStep.value;
    if (!meshSubclass) {
      meshSubclass = new _Mesh(source.name + "_merged", source.getScene());
    }
    const applyToCoroutine = vertexData._applyToCoroutine(meshSubclass, void 0, isAsync);
    let applyToCoroutineStep = applyToCoroutine.next();
    while (!applyToCoroutineStep.done) {
      if (isAsync) {
        yield;
      }
      applyToCoroutineStep = applyToCoroutine.next();
    }
    meshSubclass.checkCollisions = source.checkCollisions;
    meshSubclass.sideOrientation = source.sideOrientation;
    if (disposeSource) {
      for (index = 0; index < meshes.length; index++) {
        meshes[index].dispose();
      }
    }
    if (subdivideWithSubMeshes || multiMultiMaterials) {
      meshSubclass.releaseSubMeshes();
      index = 0;
      let offset = 0;
      while (index < indiceArray.length) {
        SubMesh.CreateFromIndices(0, offset, indiceArray[index], meshSubclass, void 0, false);
        offset += indiceArray[index];
        index++;
      }
      for (const subMesh of meshSubclass.subMeshes) {
        subMesh.refreshBoundingInfo();
      }
      meshSubclass.computeWorldMatrix(true);
    }
    if (multiMultiMaterials) {
      const newMultiMaterial = new MultiMaterial(source.name + "_merged", source.getScene());
      newMultiMaterial.subMaterials = materialArray;
      for (let subIndex = 0; subIndex < meshSubclass.subMeshes.length; subIndex++) {
        meshSubclass.subMeshes[subIndex].materialIndex = materialIndexArray[subIndex];
      }
      meshSubclass.material = newMultiMaterial;
    } else {
      meshSubclass.material = source.material;
    }
    return meshSubclass;
  }
  /**
   * @internal
   */
  addInstance(instance) {
    instance._indexInSourceMeshInstanceArray = this.instances.length;
    this.instances.push(instance);
  }
  /**
   * @internal
   */
  removeInstance(instance) {
    const index = instance._indexInSourceMeshInstanceArray;
    if (index != -1) {
      if (index !== this.instances.length - 1) {
        const last = this.instances[this.instances.length - 1];
        this.instances[index] = last;
        last._indexInSourceMeshInstanceArray = index;
      }
      instance._indexInSourceMeshInstanceArray = -1;
      this.instances.pop();
    }
  }
  /** @internal */
  _shouldConvertRHS() {
    return this._scene.useRightHandedSystem && this.sideOrientation === Material.CounterClockWiseSideOrientation;
  }
  /** @internal */
  _getRenderingFillMode(fillMode) {
    const scene = this.getScene();
    if (scene.forcePointsCloud)
      return Material.PointFillMode;
    if (scene.forceWireframe)
      return Material.WireFrameFillMode;
    return this.overrideRenderingFillMode ?? fillMode;
  }
  // deprecated methods
  /**
   * Sets the mesh material by the material or multiMaterial `id` property
   * @param id is a string identifying the material or the multiMaterial
   * @returns the current mesh
   * @deprecated Please use MeshBuilder instead Please use setMaterialById instead
   */
  setMaterialByID(id) {
    return this.setMaterialById(id);
  }
  /**
   * Creates a ribbon mesh.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param
   * @param name defines the name of the mesh to create
   * @param pathArray is a required array of paths, what are each an array of successive Vector3. The pathArray parameter depicts the ribbon geometry.
   * @param closeArray creates a seam between the first and the last paths of the path array (default is false)
   * @param closePath creates a seam between the first and the last points of each path of the path array
   * @param offset is taken in account only if the `pathArray` is containing a single path
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @param instance defines an instance of an existing Ribbon object to be updated with the passed `pathArray` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#ribbon)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateRibbon(name, pathArray, closeArray, closePath, offset, scene, updatable, sideOrientation, instance) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a plane polygonal mesh.  By default, this is a disc.
   * @param name defines the name of the mesh to create
   * @param radius sets the radius size (float) of the polygon (default 0.5)
   * @param tessellation sets the number of polygon sides (positive integer, default 64). So a tessellation valued to 3 will build a triangle, to 4 a square, etc
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateDisc(name, radius, tessellation, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a box mesh.
   * @param name defines the name of the mesh to create
   * @param size sets the size (float) of each box side (default 1)
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateBox(name, size, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a sphere mesh.
   * @param name defines the name of the mesh to create
   * @param segments sets the sphere number of horizontal stripes (positive integer, default 32)
   * @param diameter sets the diameter size (float) of the sphere (default 1)
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateSphere(name, segments, diameter, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a hemisphere mesh.
   * @param name defines the name of the mesh to create
   * @param segments sets the sphere number of horizontal stripes (positive integer, default 32)
   * @param diameter sets the diameter size (float) of the sphere (default 1)
   * @param scene defines the hosting scene
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateHemisphere(name, segments, diameter, scene) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a cylinder or a cone mesh.
   * @param name defines the name of the mesh to create
   * @param height sets the height size (float) of the cylinder/cone (float, default 2)
   * @param diameterTop set the top cap diameter (floats, default 1)
   * @param diameterBottom set the bottom cap diameter (floats, default 1). This value can't be zero
   * @param tessellation sets the number of cylinder sides (positive integer, default 24). Set it to 3 to get a prism for instance
   * @param subdivisions sets the number of rings along the cylinder height (positive integer, default 1)
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateCylinder(name, height, diameterTop, diameterBottom, tessellation, subdivisions, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  // Torus  (Code from SharpDX.org)
  /**
   * Creates a torus mesh.
   * @param name defines the name of the mesh to create
   * @param diameter sets the diameter size (float) of the torus (default 1)
   * @param thickness sets the diameter size of the tube of the torus (float, default 0.5)
   * @param tessellation sets the number of torus sides (positive integer, default 16)
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateTorus(name, diameter, thickness, tessellation, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a torus knot mesh.
   * @param name defines the name of the mesh to create
   * @param radius sets the global radius size (float) of the torus knot (default 2)
   * @param tube sets the diameter size of the tube of the torus (float, default 0.5)
   * @param radialSegments sets the number of sides on each tube segments (positive integer, default 32)
   * @param tubularSegments sets the number of tubes to decompose the knot into (positive integer, default 32)
   * @param p the number of windings on X axis (positive integers, default 2)
   * @param q the number of windings on Y axis (positive integers, default 3)
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateTorusKnot(name, radius, tube, radialSegments, tubularSegments, p, q, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a line mesh..
   * @param name defines the name of the mesh to create
   * @param points is an array successive Vector3
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param instance is an instance of an existing LineMesh object to be updated with the passed `points` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#lines-and-dashedlines).
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateLines(name, points, scene, updatable, instance) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a dashed line mesh.
   * @param name defines the name of the mesh to create
   * @param points is an array successive Vector3
   * @param dashSize is the size of the dashes relatively the dash number (positive float, default 3)
   * @param gapSize is the size of the gap between two successive dashes relatively the dash number (positive float, default 1)
   * @param dashNb is the intended total number of dashes (positive integer, default 200)
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param instance is an instance of an existing LineMesh object to be updated with the passed `points` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#lines-and-dashedlines)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateDashedLines(name, points, dashSize, gapSize, dashNb, scene, updatable, instance) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a polygon mesh.Please consider using the same method from the MeshBuilder class instead
   * The polygon's shape will depend on the input parameters and is constructed parallel to a ground mesh.
   * The parameter `shape` is a required array of successive Vector3 representing the corners of the polygon in th XoZ plane, that is y = 0 for all vectors.
   * You can set the mesh side orientation with the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
   * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created.
   * Remember you can only change the shape positions, not their number when updating a polygon.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#non-regular-polygon
   * @param name defines the name of the mesh to create
   * @param shape is a required array of successive Vector3 representing the corners of the polygon in th XoZ plane, that is y = 0 for all vectors
   * @param scene defines the hosting scene
   * @param holes is a required array of arrays of successive Vector3 used to defines holes in the polygon
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @param earcutInjection can be used to inject your own earcut reference
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreatePolygon(name, shape, scene, holes, updatable, sideOrientation, earcutInjection) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates an extruded polygon mesh, with depth in the Y direction..
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#extruded-non-regular-polygon
   * @param name defines the name of the mesh to create
   * @param shape is a required array of successive Vector3 representing the corners of the polygon in th XoZ plane, that is y = 0 for all vectors
   * @param depth defines the height of extrusion
   * @param scene defines the hosting scene
   * @param holes is a required array of arrays of successive Vector3 used to defines holes in the polygon
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @param earcutInjection can be used to inject your own earcut reference
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static ExtrudePolygon(name, shape, depth, scene, holes, updatable, sideOrientation, earcutInjection) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates an extruded shape mesh.
   * The extrusion is a parametric shape. It has no predefined shape. Its final shape will depend on the input parameters.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#extruded-shapes
   * @param name defines the name of the mesh to create
   * @param shape is a required array of successive Vector3. This array depicts the shape to be extruded in its local space : the shape must be designed in the xOy plane and will be extruded along the Z axis
   * @param path is a required array of successive Vector3. This is the axis curve the shape is extruded along
   * @param scale is the value to scale the shape
   * @param rotation is the angle value to rotate the shape each step (each path point), from the former step (so rotation added each step) along the curve
   * @param cap sets the way the extruded shape is capped. Possible values : Mesh.NO_CAP (default), Mesh.CAP_START, Mesh.CAP_END, Mesh.CAP_ALL
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @param instance is an instance of an existing ExtrudedShape object to be updated with the passed `shape`, `path`, `scale` or `rotation` parameters (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#extruded-shape)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static ExtrudeShape(name, shape, path, scale, rotation, cap, scene, updatable, sideOrientation, instance) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates an custom extruded shape mesh.
   * The custom extrusion is a parametric shape.
   * It has no predefined shape. Its final shape will depend on the input parameters.
   *
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#extruded-shapes
   * @param name defines the name of the mesh to create
   * @param shape is a required array of successive Vector3. This array depicts the shape to be extruded in its local space : the shape must be designed in the xOy plane and will be extruded along the Z axis
   * @param path is a required array of successive Vector3. This is the axis curve the shape is extruded along
   * @param scaleFunction is a custom Javascript function called on each path point
   * @param rotationFunction is a custom Javascript function called on each path point
   * @param ribbonCloseArray forces the extrusion underlying ribbon to close all the paths in its `pathArray`
   * @param ribbonClosePath forces the extrusion underlying ribbon to close its `pathArray`
   * @param cap sets the way the extruded shape is capped. Possible values : Mesh.NO_CAP (default), Mesh.CAP_START, Mesh.CAP_END, Mesh.CAP_ALL
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @param instance is an instance of an existing ExtrudedShape object to be updated with the passed `shape`, `path`, `scale` or `rotation` parameters (https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#extruded-shape)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static ExtrudeShapeCustom(name, shape, path, scaleFunction, rotationFunction, ribbonCloseArray, ribbonClosePath, cap, scene, updatable, sideOrientation, instance) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates lathe mesh.
   * The lathe is a shape with a symmetry axis : a 2D model shape is rotated around this axis to design the lathe.
   * @param name defines the name of the mesh to create
   * @param shape is a required array of successive Vector3. This array depicts the shape to be rotated in its local space : the shape must be designed in the xOy plane and will be rotated around the Y axis. It's usually a 2D shape, so the Vector3 z coordinates are often set to zero
   * @param radius is the radius value of the lathe
   * @param tessellation is the side number of the lathe.
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateLathe(name, shape, radius, tessellation, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a plane mesh.
   * @param name defines the name of the mesh to create
   * @param size sets the size (float) of both sides of the plane at once (default 1)
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreatePlane(name, size, scene, updatable, sideOrientation) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a ground mesh.
   * @param name defines the name of the mesh to create
   * @param width set the width of the ground
   * @param height set the height of the ground
   * @param subdivisions sets the number of subdivisions per side
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateGround(name, width, height, subdivisions, scene, updatable) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a tiled ground mesh.
   * @param name defines the name of the mesh to create
   * @param xmin set the ground minimum X coordinate
   * @param zmin set the ground minimum Y coordinate
   * @param xmax set the ground maximum X coordinate
   * @param zmax set the ground maximum Z coordinate
   * @param subdivisions is an object `{w: positive integer, h: positive integer}` (default `{w: 6, h: 6}`). `w` and `h` are the numbers of subdivisions on the ground width and height. Each subdivision is called a tile
   * @param precision is an object `{w: positive integer, h: positive integer}` (default `{w: 2, h: 2}`). `w` and `h` are the numbers of subdivisions on the ground width and height of each tile
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateTiledGround(name, xmin, zmin, xmax, zmax, subdivisions, precision, scene, updatable) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a ground mesh from a height map.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/height_map
   * @param name defines the name of the mesh to create
   * @param url sets the URL of the height map image resource
   * @param width set the ground width size
   * @param height set the ground height size
   * @param subdivisions sets the number of subdivision per side
   * @param minHeight is the minimum altitude on the ground
   * @param maxHeight is the maximum altitude on the ground
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param onReady  is a callback function that will be called  once the mesh is built (the height map download can last some time)
   * @param alphaFilter will filter any data where the alpha channel is below this value, defaults 0 (all data visible)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateGroundFromHeightMap(name, url, width, height, subdivisions, minHeight, maxHeight, scene, updatable, onReady, alphaFilter) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a tube mesh.
   * The tube is a parametric shape.
   * It has no predefined shape. Its final shape will depend on the input parameters.
   *
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param
   * @param name defines the name of the mesh to create
   * @param path is a required array of successive Vector3. It is the curve used as the axis of the tube
   * @param radius sets the tube radius size
   * @param tessellation is the number of sides on the tubular surface
   * @param radiusFunction is a custom function. If it is not null, it overrides the parameter `radius`. This function is called on each point of the tube path and is passed the index `i` of the i-th point and the distance of this point from the first point of the path
   * @param cap sets the way the extruded shape is capped. Possible values : Mesh.NO_CAP (default), Mesh.CAP_START, Mesh.CAP_END, Mesh.CAP_ALL
   * @param scene defines the hosting scene
   * @param updatable defines if the mesh must be flagged as updatable
   * @param sideOrientation defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation)
   * @param instance is an instance of an existing Tube object to be updated with the passed `pathArray` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#tube)
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateTube(name, path, radius, tessellation, radiusFunction, cap, scene, updatable, sideOrientation, instance) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a polyhedron mesh.
   *.
   * * The parameter `type` (positive integer, max 14, default 0) sets the polyhedron type to build among the 15 embedded types. Please refer to the type sheet in the tutorial to choose the wanted type
   * * The parameter `size` (positive float, default 1) sets the polygon size
   * * You can overwrite the `size` on each dimension bu using the parameters `sizeX`, `sizeY` or `sizeZ` (positive floats, default to `size` value)
   * * You can build other polyhedron types than the 15 embbeded ones by setting the parameter `custom` (`polyhedronObject`, default null). If you set the parameter `custom`, this overwrittes the parameter `type`
   * * A `polyhedronObject` is a formatted javascript object. You'll find a full file with pre-set polyhedra here : https://github.com/BabylonJS/Extensions/tree/master/Polyhedron
   * * You can set the color and the UV of each side of the polyhedron with the parameters `faceColors` (Color4, default `(1, 1, 1, 1)`) and faceUV (Vector4, default `(0, 0, 1, 1)`)
   * * To understand how to set `faceUV` or `faceColors`, please read this by considering the right number of faces of your polyhedron, instead of only 6 for the box : https://doc.babylonjs.com/features/featuresDeepDive/materials/using/texturePerBoxFace
   * * The parameter `flat` (boolean, default true). If set to false, it gives the polyhedron a single global face, so less vertices and shared normals. In this case, `faceColors` and `faceUV` are ignored
   * * You can also set the mesh side orientation with the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
   * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
   * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
   * @param name defines the name of the mesh to create
   * @param options defines the options used to create the mesh
   * @param scene defines the hosting scene
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreatePolyhedron(name, options, scene) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a sphere based upon an icosahedron with 20 triangular faces which can be subdivided
   * * The parameter `radius` sets the radius size (float) of the icosphere (default 1)
   * * You can set some different icosphere dimensions, for instance to build an ellipsoid, by using the parameters `radiusX`, `radiusY` and `radiusZ` (all by default have the same value than `radius`)
   * * The parameter `subdivisions` sets the number of subdivisions (positive integer, default 4). The more subdivisions, the more faces on the icosphere whatever its size
   * * The parameter `flat` (boolean, default true) gives each side its own normals. Set it to false to get a smooth continuous light reflection on the surface
   * * You can also set the mesh side orientation with the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
   * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
   * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/polyhedra#icosphere
   * @param name defines the name of the mesh
   * @param options defines the options used to create the mesh
   * @param scene defines the hosting scene
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateIcoSphere(name, options, scene) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Creates a decal mesh.
   *.
   * A decal is a mesh usually applied as a model onto the surface of another mesh
   * @param name  defines the name of the mesh
   * @param sourceMesh defines the mesh receiving the decal
   * @param position sets the position of the decal in world coordinates
   * @param normal sets the normal of the mesh where the decal is applied onto in world coordinates
   * @param size sets the decal scaling
   * @param angle sets the angle to rotate the decal
   * @returns a new Mesh
   * @deprecated Please use MeshBuilder instead
   */
  static CreateDecal(name, sourceMesh, position, normal, size, angle) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /** Creates a Capsule Mesh
   * @param name defines the name of the mesh.
   * @param options the constructors options used to shape the mesh.
   * @param scene defines the scene the mesh is scoped to.
   * @returns the capsule mesh
   * @see https://doc.babylonjs.com/how_to/capsule_shape
   * @deprecated Please use MeshBuilder instead
   */
  static CreateCapsule(name, options, scene) {
    throw new Error("Import MeshBuilder to populate this function");
  }
  /**
   * Extends a mesh to a Goldberg mesh
   * Warning  the mesh to convert MUST be an import of a perviously exported Goldberg mesh
   * @param mesh the mesh to convert
   * @returns the extended mesh
   * @deprecated Please use ExtendMeshToGoldberg instead
   */
  static ExtendToGoldberg(mesh) {
    throw new Error("Import MeshBuilder to populate this function");
  }
};
Mesh.FRONTSIDE = VertexData.FRONTSIDE;
Mesh.BACKSIDE = VertexData.BACKSIDE;
Mesh.DOUBLESIDE = VertexData.DOUBLESIDE;
Mesh.DEFAULTSIDE = VertexData.DEFAULTSIDE;
Mesh.NO_CAP = 0;
Mesh.CAP_START = 1;
Mesh.CAP_END = 2;
Mesh.CAP_ALL = 3;
Mesh.NO_FLIP = 0;
Mesh.FLIP_TILE = 1;
Mesh.ROTATE_TILE = 2;
Mesh.FLIP_ROW = 3;
Mesh.ROTATE_ROW = 4;
Mesh.FLIP_N_ROTATE_TILE = 5;
Mesh.FLIP_N_ROTATE_ROW = 6;
Mesh.CENTER = 0;
Mesh.LEFT = 1;
Mesh.RIGHT = 2;
Mesh.TOP = 3;
Mesh.BOTTOM = 4;
Mesh.INSTANCEDMESH_SORT_TRANSPARENT = false;
Mesh._GroundMeshParser = (parsedMesh, scene) => {
  throw _WarnImport("GroundMesh");
};
Mesh._GoldbergMeshParser = (parsedMesh, scene) => {
  throw _WarnImport("GoldbergMesh");
};
Mesh._LinesMeshParser = (parsedMesh, scene) => {
  throw _WarnImport("LinesMesh");
};
Mesh._GreasedLineMeshParser = (parsedMesh, scene) => {
  throw _WarnImport("GreasedLineMesh");
};
Mesh._GreasedLineRibbonMeshParser = (parsedMesh, scene) => {
  throw _WarnImport("GreasedLineRibbonMesh");
};
Mesh._TrailMeshParser = (parsedMesh, scene) => {
  throw _WarnImport("TrailMesh");
};
RegisterClass("BABYLON.Mesh", Mesh);

// node_modules/@babylonjs/core/Meshes/Builders/ribbonBuilder.js
function CreateRibbonVertexData(options) {
  let pathArray = options.pathArray;
  const closeArray = options.closeArray || false;
  const closePath = options.closePath || false;
  const invertUV = options.invertUV || false;
  const defaultOffset = Math.floor(pathArray[0].length / 2);
  let offset = options.offset || defaultOffset;
  offset = offset > defaultOffset ? defaultOffset : Math.floor(offset);
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const customUV = options.uvs;
  const customColors = options.colors;
  const positions = [];
  const indices = [];
  const normals = [];
  const uvs = [];
  const us = [];
  const vs = [];
  const uTotalDistance = [];
  const vTotalDistance = [];
  let minlg;
  const lg = [];
  const idx = [];
  let p;
  let i;
  let j;
  if (pathArray.length < 2) {
    const ar1 = [];
    const ar2 = [];
    for (i = 0; i < pathArray[0].length - offset; i++) {
      ar1.push(pathArray[0][i]);
      ar2.push(pathArray[0][i + offset]);
    }
    pathArray = [ar1, ar2];
  }
  let idc = 0;
  const closePathCorr = closePath ? 1 : 0;
  const closeArrayCorr = closeArray ? 1 : 0;
  let path;
  let l;
  minlg = pathArray[0].length;
  let vectlg;
  let dist;
  for (p = 0; p < pathArray.length + closeArrayCorr; p++) {
    uTotalDistance[p] = 0;
    us[p] = [0];
    path = p === pathArray.length ? pathArray[0] : pathArray[p];
    l = path.length;
    minlg = minlg < l ? minlg : l;
    j = 0;
    while (j < l) {
      positions.push(path[j].x, path[j].y, path[j].z);
      if (j > 0) {
        vectlg = path[j].subtract(path[j - 1]).length();
        dist = vectlg + uTotalDistance[p];
        us[p].push(dist);
        uTotalDistance[p] = dist;
      }
      j++;
    }
    if (closePath) {
      j--;
      positions.push(path[0].x, path[0].y, path[0].z);
      vectlg = path[j].subtract(path[0]).length();
      dist = vectlg + uTotalDistance[p];
      us[p].push(dist);
      uTotalDistance[p] = dist;
    }
    lg[p] = l + closePathCorr;
    idx[p] = idc;
    idc += l + closePathCorr;
  }
  let path1;
  let path2;
  let vertex1 = null;
  let vertex2 = null;
  for (i = 0; i < minlg + closePathCorr; i++) {
    vTotalDistance[i] = 0;
    vs[i] = [0];
    for (p = 0; p < pathArray.length - 1 + closeArrayCorr; p++) {
      path1 = pathArray[p];
      path2 = p === pathArray.length - 1 ? pathArray[0] : pathArray[p + 1];
      if (i === minlg) {
        vertex1 = path1[0];
        vertex2 = path2[0];
      } else {
        vertex1 = path1[i];
        vertex2 = path2[i];
      }
      vectlg = vertex2.subtract(vertex1).length();
      dist = vectlg + vTotalDistance[i];
      vs[i].push(dist);
      vTotalDistance[i] = dist;
    }
  }
  let u;
  let v;
  if (customUV) {
    for (p = 0; p < customUV.length; p++) {
      uvs.push(customUV[p].x, useOpenGLOrientationForUV ? 1 - customUV[p].y : customUV[p].y);
    }
  } else {
    for (p = 0; p < pathArray.length + closeArrayCorr; p++) {
      for (i = 0; i < minlg + closePathCorr; i++) {
        u = uTotalDistance[p] != 0 ? us[p][i] / uTotalDistance[p] : 0;
        v = vTotalDistance[i] != 0 ? vs[i][p] / vTotalDistance[i] : 0;
        if (invertUV) {
          uvs.push(v, u);
        } else {
          uvs.push(u, useOpenGLOrientationForUV ? 1 - v : v);
        }
      }
    }
  }
  p = 0;
  let pi = 0;
  let l1 = lg[p] - 1;
  let l2 = lg[p + 1] - 1;
  let min = l1 < l2 ? l1 : l2;
  let shft = idx[1] - idx[0];
  const path1nb = lg.length - 1;
  while (pi <= min && p < path1nb) {
    indices.push(pi, pi + shft, pi + 1);
    indices.push(pi + shft + 1, pi + 1, pi + shft);
    pi += 1;
    if (pi === min) {
      p++;
      shft = idx[p + 1] - idx[p];
      l1 = lg[p] - 1;
      l2 = lg[p + 1] - 1;
      pi = idx[p];
      min = l1 < l2 ? l1 + pi : l2 + pi;
    }
  }
  VertexData.ComputeNormals(positions, indices, normals);
  if (closePath) {
    let indexFirst = 0;
    let indexLast = 0;
    for (p = 0; p < pathArray.length; p++) {
      indexFirst = idx[p] * 3;
      if (p + 1 < pathArray.length) {
        indexLast = (idx[p + 1] - 1) * 3;
      } else {
        indexLast = normals.length - 3;
      }
      normals[indexFirst] = (normals[indexFirst] + normals[indexLast]) * 0.5;
      normals[indexFirst + 1] = (normals[indexFirst + 1] + normals[indexLast + 1]) * 0.5;
      normals[indexFirst + 2] = (normals[indexFirst + 2] + normals[indexLast + 2]) * 0.5;
      const l3 = Math.sqrt(normals[indexFirst] * normals[indexFirst] + normals[indexFirst + 1] * normals[indexFirst + 1] + normals[indexFirst + 2] * normals[indexFirst + 2]);
      normals[indexFirst] /= l3;
      normals[indexFirst + 1] /= l3;
      normals[indexFirst + 2] /= l3;
      normals[indexLast] = normals[indexFirst];
      normals[indexLast + 1] = normals[indexFirst + 1];
      normals[indexLast + 2] = normals[indexFirst + 2];
    }
  }
  if (closeArray) {
    let indexFirst = idx[0] * 3;
    let indexLast = idx[pathArray.length] * 3;
    for (i = 0; i < minlg + closePathCorr; i++) {
      normals[indexFirst] = (normals[indexFirst] + normals[indexLast]) * 0.5;
      normals[indexFirst + 1] = (normals[indexFirst + 1] + normals[indexLast + 1]) * 0.5;
      normals[indexFirst + 2] = (normals[indexFirst + 2] + normals[indexLast + 2]) * 0.5;
      const l3 = Math.sqrt(normals[indexFirst] * normals[indexFirst] + normals[indexFirst + 1] * normals[indexFirst + 1] + normals[indexFirst + 2] * normals[indexFirst + 2]);
      normals[indexFirst] /= l3;
      normals[indexFirst + 1] /= l3;
      normals[indexFirst + 2] /= l3;
      normals[indexLast] = normals[indexFirst];
      normals[indexLast + 1] = normals[indexFirst + 1];
      normals[indexLast + 2] = normals[indexFirst + 2];
      indexFirst += 3;
      indexLast += 3;
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  let colors = null;
  if (customColors) {
    colors = new Float32Array(customColors.length * 4);
    for (let c = 0; c < customColors.length; c++) {
      colors[c * 4] = customColors[c].r;
      colors[c * 4 + 1] = customColors[c].g;
      colors[c * 4 + 2] = customColors[c].b;
      colors[c * 4 + 3] = customColors[c].a;
    }
  }
  const vertexData = new VertexData();
  const positions32 = new Float32Array(positions);
  const normals32 = new Float32Array(normals);
  const uvs32 = new Float32Array(uvs);
  vertexData.indices = indices;
  vertexData.positions = positions32;
  vertexData.normals = normals32;
  vertexData.uvs = uvs32;
  if (colors) {
    vertexData.set(colors, VertexBuffer.ColorKind);
  }
  if (closePath) {
    vertexData._idx = idx;
  }
  return vertexData;
}
function CreateRibbon(name, options, scene = null) {
  const pathArray = options.pathArray;
  const closeArray = options.closeArray;
  const closePath = options.closePath;
  const sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  const instance = options.instance;
  const updatable = options.updatable;
  if (instance) {
    const minimum = TmpVectors.Vector3[0].setAll(Number.MAX_VALUE);
    const maximum = TmpVectors.Vector3[1].setAll(-Number.MAX_VALUE);
    const positionFunction = (positions2) => {
      let minlg = pathArray[0].length;
      const mesh = instance;
      let i = 0;
      const ns = mesh._originalBuilderSideOrientation === Mesh.DOUBLESIDE ? 2 : 1;
      for (let si = 1; si <= ns; ++si) {
        for (let p = 0; p < pathArray.length; ++p) {
          const path = pathArray[p];
          const l = path.length;
          minlg = minlg < l ? minlg : l;
          for (let j = 0; j < minlg; ++j) {
            const pathPoint = path[j];
            positions2[i] = pathPoint.x;
            positions2[i + 1] = pathPoint.y;
            positions2[i + 2] = pathPoint.z;
            minimum.minimizeInPlaceFromFloats(pathPoint.x, pathPoint.y, pathPoint.z);
            maximum.maximizeInPlaceFromFloats(pathPoint.x, pathPoint.y, pathPoint.z);
            i += 3;
          }
          if (mesh._creationDataStorage && mesh._creationDataStorage.closePath) {
            const pathPoint = path[0];
            positions2[i] = pathPoint.x;
            positions2[i + 1] = pathPoint.y;
            positions2[i + 2] = pathPoint.z;
            i += 3;
          }
        }
      }
    };
    const positions = instance.getVerticesData(VertexBuffer.PositionKind);
    positionFunction(positions);
    if (instance.hasBoundingInfo) {
      instance.getBoundingInfo().reConstruct(minimum, maximum, instance._worldMatrix);
    } else {
      instance.buildBoundingInfo(minimum, maximum, instance._worldMatrix);
    }
    instance.updateVerticesData(VertexBuffer.PositionKind, positions, false, false);
    if (options.colors) {
      const colors = instance.getVerticesData(VertexBuffer.ColorKind);
      for (let c = 0, colorIndex = 0; c < options.colors.length; c++, colorIndex += 4) {
        const color = options.colors[c];
        colors[colorIndex] = color.r;
        colors[colorIndex + 1] = color.g;
        colors[colorIndex + 2] = color.b;
        colors[colorIndex + 3] = color.a;
      }
      instance.updateVerticesData(VertexBuffer.ColorKind, colors, false, false);
    }
    if (options.uvs) {
      const uvs = instance.getVerticesData(VertexBuffer.UVKind);
      for (let i = 0; i < options.uvs.length; i++) {
        uvs[i * 2] = options.uvs[i].x;
        uvs[i * 2 + 1] = useOpenGLOrientationForUV ? 1 - options.uvs[i].y : options.uvs[i].y;
      }
      instance.updateVerticesData(VertexBuffer.UVKind, uvs, false, false);
    }
    if (!instance.areNormalsFrozen || instance.isFacetDataEnabled) {
      const indices = instance.getIndices();
      const normals = instance.getVerticesData(VertexBuffer.NormalKind);
      const params = instance.isFacetDataEnabled ? instance.getFacetDataParameters() : null;
      VertexData.ComputeNormals(positions, indices, normals, params);
      if (instance._creationDataStorage && instance._creationDataStorage.closePath) {
        let indexFirst = 0;
        let indexLast = 0;
        for (let p = 0; p < pathArray.length; p++) {
          indexFirst = instance._creationDataStorage.idx[p] * 3;
          if (p + 1 < pathArray.length) {
            indexLast = (instance._creationDataStorage.idx[p + 1] - 1) * 3;
          } else {
            indexLast = normals.length - 3;
          }
          normals[indexFirst] = (normals[indexFirst] + normals[indexLast]) * 0.5;
          normals[indexFirst + 1] = (normals[indexFirst + 1] + normals[indexLast + 1]) * 0.5;
          normals[indexFirst + 2] = (normals[indexFirst + 2] + normals[indexLast + 2]) * 0.5;
          normals[indexLast] = normals[indexFirst];
          normals[indexLast + 1] = normals[indexFirst + 1];
          normals[indexLast + 2] = normals[indexFirst + 2];
        }
      }
      if (!instance.areNormalsFrozen) {
        instance.updateVerticesData(VertexBuffer.NormalKind, normals, false, false);
      }
    }
    return instance;
  } else {
    const ribbon = new Mesh(name, scene);
    ribbon._originalBuilderSideOrientation = sideOrientation;
    ribbon._creationDataStorage = new _CreationDataStorage();
    const vertexData = CreateRibbonVertexData(options);
    if (closePath) {
      ribbon._creationDataStorage.idx = vertexData._idx;
    }
    ribbon._creationDataStorage.closePath = closePath;
    ribbon._creationDataStorage.closeArray = closeArray;
    vertexData.applyToMesh(ribbon, updatable);
    return ribbon;
  }
}
VertexData.CreateRibbon = CreateRibbonVertexData;
Mesh.CreateRibbon = (name, pathArray, closeArray = false, closePath, offset, scene, updatable = false, sideOrientation, instance) => {
  return CreateRibbon(name, {
    pathArray,
    closeArray,
    closePath,
    offset,
    updatable,
    sideOrientation,
    instance
  }, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/discBuilder.js
function CreateDiscVertexData(options) {
  const positions = [];
  const indices = [];
  const normals = [];
  const uvs = [];
  const radius = options.radius || 0.5;
  const tessellation = options.tessellation || 64;
  const arc = options.arc && (options.arc <= 0 || options.arc > 1) ? 1 : options.arc || 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  positions.push(0, 0, 0);
  uvs.push(0.5, 0.5);
  const theta = Math.PI * 2 * arc;
  const step = arc === 1 ? theta / tessellation : theta / (tessellation - 1);
  let a = 0;
  for (let t = 0; t < tessellation; t++) {
    const x = Math.cos(a);
    const y = Math.sin(a);
    const u = (x + 1) / 2;
    const v = (1 - y) / 2;
    positions.push(radius * x, radius * y, 0);
    uvs.push(u, useOpenGLOrientationForUV ? 1 - v : v);
    a += step;
  }
  if (arc === 1) {
    positions.push(positions[3], positions[4], positions[5]);
    uvs.push(uvs[2], useOpenGLOrientationForUV ? 1 - uvs[3] : uvs[3]);
  }
  const vertexNb = positions.length / 3;
  for (let i = 1; i < vertexNb - 1; i++) {
    indices.push(i + 1, 0, i);
  }
  VertexData.ComputeNormals(positions, indices, normals);
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateDisc(name, options = {}, scene = null) {
  const disc = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  disc._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateDiscVertexData(options);
  vertexData.applyToMesh(disc, options.updatable);
  return disc;
}
VertexData.CreateDisc = CreateDiscVertexData;
Mesh.CreateDisc = (name, radius, tessellation, scene = null, updatable, sideOrientation) => {
  const options = {
    radius,
    tessellation,
    sideOrientation,
    updatable
  };
  return CreateDisc(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/groundMesh.js
Mesh._GroundMeshParser = (parsedMesh, scene) => {
  return GroundMesh.Parse(parsedMesh, scene);
};
var GroundMesh = class _GroundMesh extends Mesh {
  constructor(name, scene) {
    super(name, scene);
    this.generateOctree = false;
  }
  /**
   * "GroundMesh"
   * @returns "GroundMesh"
   */
  getClassName() {
    return "GroundMesh";
  }
  /**
   * The minimum of x and y subdivisions
   */
  get subdivisions() {
    return Math.min(this._subdivisionsX, this._subdivisionsY);
  }
  /**
   * X subdivisions
   */
  get subdivisionsX() {
    return this._subdivisionsX;
  }
  /**
   * Y subdivisions
   */
  get subdivisionsY() {
    return this._subdivisionsY;
  }
  /**
   * This function will divide the mesh into submeshes and update an octree to help to select the right submeshes
   * for rendering, picking and collision computations. Please note that you must have a decent number of submeshes
   * to get performance improvements when using an octree.
   * @param chunksCount the number of submeshes the mesh will be divided into
   * @param octreeBlocksSize the maximum size of the octree blocks (Default: 32)
   */
  optimize(chunksCount, octreeBlocksSize = 32) {
    this._subdivisionsX = chunksCount;
    this._subdivisionsY = chunksCount;
    this.subdivide(chunksCount);
    const thisAsAny = this;
    if (thisAsAny.createOrUpdateSubmeshesOctree) {
      thisAsAny.createOrUpdateSubmeshesOctree(octreeBlocksSize);
    }
  }
  /**
   * Returns a height (y) value in the World system :
   * the ground altitude at the coordinates (x, z) expressed in the World system.
   * @param x x coordinate
   * @param z z coordinate
   * @returns the ground y position if (x, z) are outside the ground surface.
   */
  getHeightAtCoordinates(x, z) {
    const world = this.getWorldMatrix();
    const invMat = TmpVectors.Matrix[5];
    world.invertToRef(invMat);
    const tmpVect = TmpVectors.Vector3[8];
    Vector3.TransformCoordinatesFromFloatsToRef(x, 0, z, invMat, tmpVect);
    x = tmpVect.x;
    z = tmpVect.z;
    if (x < this._minX || x >= this._maxX || z <= this._minZ || z > this._maxZ) {
      return this.position.y;
    }
    if (!this._heightQuads || this._heightQuads.length == 0) {
      this._initHeightQuads();
      this._computeHeightQuads();
    }
    const facet = this._getFacetAt(x, z);
    const y = -(facet.x * x + facet.z * z + facet.w) / facet.y;
    Vector3.TransformCoordinatesFromFloatsToRef(0, y, 0, world, tmpVect);
    return tmpVect.y;
  }
  /**
   * Returns a normalized vector (Vector3) orthogonal to the ground
   * at the ground coordinates (x, z) expressed in the World system.
   * @param x x coordinate
   * @param z z coordinate
   * @returns Vector3(0.0, 1.0, 0.0) if (x, z) are outside the ground surface.
   */
  getNormalAtCoordinates(x, z) {
    const normal = new Vector3(0, 1, 0);
    this.getNormalAtCoordinatesToRef(x, z, normal);
    return normal;
  }
  /**
   * Updates the Vector3 passed a reference with a normalized vector orthogonal to the ground
   * at the ground coordinates (x, z) expressed in the World system.
   * Doesn't update the reference Vector3 if (x, z) are outside the ground surface.
   * @param x x coordinate
   * @param z z coordinate
   * @param ref vector to store the result
   * @returns the GroundMesh.
   */
  getNormalAtCoordinatesToRef(x, z, ref) {
    const world = this.getWorldMatrix();
    const tmpMat = TmpVectors.Matrix[5];
    world.invertToRef(tmpMat);
    const tmpVect = TmpVectors.Vector3[8];
    Vector3.TransformCoordinatesFromFloatsToRef(x, 0, z, tmpMat, tmpVect);
    x = tmpVect.x;
    z = tmpVect.z;
    if (x < this._minX || x > this._maxX || z < this._minZ || z > this._maxZ) {
      return this;
    }
    if (!this._heightQuads || this._heightQuads.length == 0) {
      this._initHeightQuads();
      this._computeHeightQuads();
    }
    const facet = this._getFacetAt(x, z);
    Vector3.TransformNormalFromFloatsToRef(facet.x, facet.y, facet.z, world, ref);
    return this;
  }
  /**
   * Force the heights to be recomputed for getHeightAtCoordinates() or getNormalAtCoordinates()
   * if the ground has been updated.
   * This can be used in the render loop.
   * @returns the GroundMesh.
   */
  updateCoordinateHeights() {
    if (!this._heightQuads || this._heightQuads.length == 0) {
      this._initHeightQuads();
    }
    this._computeHeightQuads();
    return this;
  }
  // Returns the element "facet" from the heightQuads array relative to (x, z) local coordinates
  _getFacetAt(x, z) {
    const col = Math.floor((x + this._maxX) * this._subdivisionsX / this._width);
    const row = Math.floor(-(z + this._maxZ) * this._subdivisionsY / this._height + this._subdivisionsY);
    const quad = this._heightQuads[row * this._subdivisionsX + col];
    let facet;
    if (z < quad.slope.x * x + quad.slope.y) {
      facet = quad.facet1;
    } else {
      facet = quad.facet2;
    }
    return facet;
  }
  //  Creates and populates the heightMap array with "facet" elements :
  // a quad is two triangular facets separated by a slope, so a "facet" element is 1 slope + 2 facets
  // slope : Vector2(c, h) = 2D diagonal line equation setting apart two triangular facets in a quad : z = cx + h
  // facet1 : Vector4(a, b, c, d) = first facet 3D plane equation : ax + by + cz + d = 0
  // facet2 :  Vector4(a, b, c, d) = second facet 3D plane equation : ax + by + cz + d = 0
  // Returns the GroundMesh.
  _initHeightQuads() {
    const subdivisionsX = this._subdivisionsX;
    const subdivisionsY = this._subdivisionsY;
    this._heightQuads = new Array();
    for (let row = 0; row < subdivisionsY; row++) {
      for (let col = 0; col < subdivisionsX; col++) {
        const quad = { slope: Vector2.Zero(), facet1: new Vector4(0, 0, 0, 0), facet2: new Vector4(0, 0, 0, 0) };
        this._heightQuads[row * subdivisionsX + col] = quad;
      }
    }
    return this;
  }
  // Compute each quad element values and update the heightMap array :
  // slope : Vector2(c, h) = 2D diagonal line equation setting apart two triangular facets in a quad : z = cx + h
  // facet1 : Vector4(a, b, c, d) = first facet 3D plane equation : ax + by + cz + d = 0
  // facet2 :  Vector4(a, b, c, d) = second facet 3D plane equation : ax + by + cz + d = 0
  // Returns the GroundMesh.
  _computeHeightQuads() {
    const positions = this.getVerticesData(VertexBuffer.PositionKind);
    if (!positions) {
      return this;
    }
    const v1 = TmpVectors.Vector3[3];
    const v2 = TmpVectors.Vector3[2];
    const v3 = TmpVectors.Vector3[1];
    const v4 = TmpVectors.Vector3[0];
    const v1v2 = TmpVectors.Vector3[4];
    const v1v3 = TmpVectors.Vector3[5];
    const v1v4 = TmpVectors.Vector3[6];
    const norm1 = TmpVectors.Vector3[7];
    const norm2 = TmpVectors.Vector3[8];
    let i = 0;
    let j = 0;
    let k = 0;
    let cd = 0;
    let h = 0;
    let d1 = 0;
    let d2 = 0;
    const subdivisionsX = this._subdivisionsX;
    const subdivisionsY = this._subdivisionsY;
    for (let row = 0; row < subdivisionsY; row++) {
      for (let col = 0; col < subdivisionsX; col++) {
        i = col * 3;
        j = row * (subdivisionsX + 1) * 3;
        k = (row + 1) * (subdivisionsX + 1) * 3;
        v1.x = positions[j + i];
        v1.y = positions[j + i + 1];
        v1.z = positions[j + i + 2];
        v2.x = positions[j + i + 3];
        v2.y = positions[j + i + 4];
        v2.z = positions[j + i + 5];
        v3.x = positions[k + i];
        v3.y = positions[k + i + 1];
        v3.z = positions[k + i + 2];
        v4.x = positions[k + i + 3];
        v4.y = positions[k + i + 4];
        v4.z = positions[k + i + 5];
        cd = (v4.z - v1.z) / (v4.x - v1.x);
        h = v1.z - cd * v1.x;
        v2.subtractToRef(v1, v1v2);
        v3.subtractToRef(v1, v1v3);
        v4.subtractToRef(v1, v1v4);
        Vector3.CrossToRef(v1v4, v1v3, norm1);
        Vector3.CrossToRef(v1v2, v1v4, norm2);
        norm1.normalize();
        norm2.normalize();
        d1 = -(norm1.x * v1.x + norm1.y * v1.y + norm1.z * v1.z);
        d2 = -(norm2.x * v2.x + norm2.y * v2.y + norm2.z * v2.z);
        const quad = this._heightQuads[row * subdivisionsX + col];
        quad.slope.copyFromFloats(cd, h);
        quad.facet1.copyFromFloats(norm1.x, norm1.y, norm1.z, d1);
        quad.facet2.copyFromFloats(norm2.x, norm2.y, norm2.z, d2);
      }
    }
    return this;
  }
  /**
   * Serializes this ground mesh
   * @param serializationObject object to write serialization to
   */
  serialize(serializationObject) {
    super.serialize(serializationObject);
    serializationObject.subdivisionsX = this._subdivisionsX;
    serializationObject.subdivisionsY = this._subdivisionsY;
    serializationObject.minX = this._minX;
    serializationObject.maxX = this._maxX;
    serializationObject.minZ = this._minZ;
    serializationObject.maxZ = this._maxZ;
    serializationObject.width = this._width;
    serializationObject.height = this._height;
  }
  /**
   * Parses a serialized ground mesh
   * @param parsedMesh the serialized mesh
   * @param scene the scene to create the ground mesh in
   * @returns the created ground mesh
   */
  static Parse(parsedMesh, scene) {
    const result = new _GroundMesh(parsedMesh.name, scene);
    result._subdivisionsX = parsedMesh.subdivisionsX || 1;
    result._subdivisionsY = parsedMesh.subdivisionsY || 1;
    result._minX = parsedMesh.minX;
    result._maxX = parsedMesh.maxX;
    result._minZ = parsedMesh.minZ;
    result._maxZ = parsedMesh.maxZ;
    result._width = parsedMesh.width;
    result._height = parsedMesh.height;
    return result;
  }
};

// node_modules/@babylonjs/core/Meshes/Builders/groundBuilder.js
function CreateGroundVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  let row, col;
  const width = options.width || options.size || 1;
  const height = options.height || options.size || 1;
  const subdivisionsX = (options.subdivisionsX || options.subdivisions || 1) | 0;
  const subdivisionsY = (options.subdivisionsY || options.subdivisions || 1) | 0;
  for (row = 0; row <= subdivisionsY; row++) {
    for (col = 0; col <= subdivisionsX; col++) {
      const position = new Vector3(col * width / subdivisionsX - width / 2, 0, (subdivisionsY - row) * height / subdivisionsY - height / 2);
      const normal = new Vector3(0, 1, 0);
      positions.push(position.x, position.y, position.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(col / subdivisionsX, useOpenGLOrientationForUV ? row / subdivisionsY : 1 - row / subdivisionsY);
    }
  }
  for (row = 0; row < subdivisionsY; row++) {
    for (col = 0; col < subdivisionsX; col++) {
      indices.push(col + 1 + (row + 1) * (subdivisionsX + 1));
      indices.push(col + 1 + row * (subdivisionsX + 1));
      indices.push(col + row * (subdivisionsX + 1));
      indices.push(col + (row + 1) * (subdivisionsX + 1));
      indices.push(col + 1 + (row + 1) * (subdivisionsX + 1));
      indices.push(col + row * (subdivisionsX + 1));
    }
  }
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateTiledGroundVertexData(options) {
  const xmin = options.xmin !== void 0 && options.xmin !== null ? options.xmin : -1;
  const zmin = options.zmin !== void 0 && options.zmin !== null ? options.zmin : -1;
  const xmax = options.xmax !== void 0 && options.xmax !== null ? options.xmax : 1;
  const zmax = options.zmax !== void 0 && options.zmax !== null ? options.zmax : 1;
  const subdivisions = options.subdivisions || { w: 1, h: 1 };
  const precision = options.precision || { w: 1, h: 1 };
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  let row, col, tileRow, tileCol;
  subdivisions.h = subdivisions.h < 1 ? 1 : subdivisions.h;
  subdivisions.w = subdivisions.w < 1 ? 1 : subdivisions.w;
  precision.w = precision.w < 1 ? 1 : precision.w;
  precision.h = precision.h < 1 ? 1 : precision.h;
  const tileSize = {
    w: (xmax - xmin) / subdivisions.w,
    h: (zmax - zmin) / subdivisions.h
  };
  function applyTile(xTileMin, zTileMin, xTileMax, zTileMax) {
    const base = positions.length / 3;
    const rowLength = precision.w + 1;
    for (row = 0; row < precision.h; row++) {
      for (col = 0; col < precision.w; col++) {
        const square = [base + col + row * rowLength, base + (col + 1) + row * rowLength, base + (col + 1) + (row + 1) * rowLength, base + col + (row + 1) * rowLength];
        indices.push(square[1]);
        indices.push(square[2]);
        indices.push(square[3]);
        indices.push(square[0]);
        indices.push(square[1]);
        indices.push(square[3]);
      }
    }
    const position = Vector3.Zero();
    const normal = new Vector3(0, 1, 0);
    for (row = 0; row <= precision.h; row++) {
      position.z = row * (zTileMax - zTileMin) / precision.h + zTileMin;
      for (col = 0; col <= precision.w; col++) {
        position.x = col * (xTileMax - xTileMin) / precision.w + xTileMin;
        position.y = 0;
        positions.push(position.x, position.y, position.z);
        normals.push(normal.x, normal.y, normal.z);
        uvs.push(col / precision.w, row / precision.h);
      }
    }
  }
  for (tileRow = 0; tileRow < subdivisions.h; tileRow++) {
    for (tileCol = 0; tileCol < subdivisions.w; tileCol++) {
      applyTile(xmin + tileCol * tileSize.w, zmin + tileRow * tileSize.h, xmin + (tileCol + 1) * tileSize.w, zmin + (tileRow + 1) * tileSize.h);
    }
  }
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateGroundFromHeightMapVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  let row, col;
  const filter = options.colorFilter || new Color3(0.3, 0.59, 0.11);
  const alphaFilter = options.alphaFilter || 0;
  let invert = false;
  if (options.minHeight > options.maxHeight) {
    invert = true;
    const temp = options.maxHeight;
    options.maxHeight = options.minHeight;
    options.minHeight = temp;
  }
  for (row = 0; row <= options.subdivisions; row++) {
    for (col = 0; col <= options.subdivisions; col++) {
      const position = new Vector3(col * options.width / options.subdivisions - options.width / 2, 0, (options.subdivisions - row) * options.height / options.subdivisions - options.height / 2);
      const heightMapX = (position.x + options.width / 2) / options.width * (options.bufferWidth - 1) | 0;
      const heightMapY = (1 - (position.z + options.height / 2) / options.height) * (options.bufferHeight - 1) | 0;
      const pos = (heightMapX + heightMapY * options.bufferWidth) * 4;
      let r = options.buffer[pos] / 255;
      let g = options.buffer[pos + 1] / 255;
      let b = options.buffer[pos + 2] / 255;
      const a = options.buffer[pos + 3] / 255;
      if (invert) {
        r = 1 - r;
        g = 1 - g;
        b = 1 - b;
      }
      const gradient = r * filter.r + g * filter.g + b * filter.b;
      if (a >= alphaFilter) {
        position.y = options.minHeight + (options.maxHeight - options.minHeight) * gradient;
      } else {
        position.y = options.minHeight - Epsilon;
      }
      if (options.heightBuffer) {
        options.heightBuffer[row * (options.subdivisions + 1) + col] = position.y;
      }
      positions.push(position.x, position.y, position.z);
      normals.push(0, 0, 0);
      uvs.push(col / options.subdivisions, 1 - row / options.subdivisions);
    }
  }
  for (row = 0; row < options.subdivisions; row++) {
    for (col = 0; col < options.subdivisions; col++) {
      const idx1 = col + 1 + (row + 1) * (options.subdivisions + 1);
      const idx2 = col + 1 + row * (options.subdivisions + 1);
      const idx3 = col + row * (options.subdivisions + 1);
      const idx4 = col + (row + 1) * (options.subdivisions + 1);
      const isVisibleIdx1 = positions[idx1 * 3 + 1] >= options.minHeight;
      const isVisibleIdx2 = positions[idx2 * 3 + 1] >= options.minHeight;
      const isVisibleIdx3 = positions[idx3 * 3 + 1] >= options.minHeight;
      if (isVisibleIdx1 && isVisibleIdx2 && isVisibleIdx3) {
        indices.push(idx1);
        indices.push(idx2);
        indices.push(idx3);
      }
      const isVisibleIdx4 = positions[idx4 * 3 + 1] >= options.minHeight;
      if (isVisibleIdx4 && isVisibleIdx1 && isVisibleIdx3) {
        indices.push(idx4);
        indices.push(idx1);
        indices.push(idx3);
      }
    }
  }
  VertexData.ComputeNormals(positions, indices, normals);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateGround(name, options = {}, scene) {
  const ground = new GroundMesh(name, scene);
  ground._setReady(false);
  ground._subdivisionsX = options.subdivisionsX || options.subdivisions || 1;
  ground._subdivisionsY = options.subdivisionsY || options.subdivisions || 1;
  ground._width = options.width || 1;
  ground._height = options.height || 1;
  ground._maxX = ground._width / 2;
  ground._maxZ = ground._height / 2;
  ground._minX = -ground._maxX;
  ground._minZ = -ground._maxZ;
  const vertexData = CreateGroundVertexData(options);
  vertexData.applyToMesh(ground, options.updatable);
  ground._setReady(true);
  return ground;
}
function CreateTiledGround(name, options, scene = null) {
  const tiledGround = new Mesh(name, scene);
  const vertexData = CreateTiledGroundVertexData(options);
  vertexData.applyToMesh(tiledGround, options.updatable);
  return tiledGround;
}
function CreateGroundFromHeightMap(name, url, options = {}, scene = null) {
  const width = options.width || 10;
  const height = options.height || 10;
  const subdivisions = options.subdivisions || 1 | 0;
  const minHeight = options.minHeight || 0;
  const maxHeight = options.maxHeight || 1;
  const filter = options.colorFilter || new Color3(0.3, 0.59, 0.11);
  const alphaFilter = options.alphaFilter || 0;
  const updatable = options.updatable;
  const onReady = options.onReady;
  scene = scene || EngineStore.LastCreatedScene;
  const ground = new GroundMesh(name, scene);
  ground._subdivisionsX = subdivisions;
  ground._subdivisionsY = subdivisions;
  ground._width = width;
  ground._height = height;
  ground._maxX = ground._width / 2;
  ground._maxZ = ground._height / 2;
  ground._minX = -ground._maxX;
  ground._minZ = -ground._maxZ;
  ground._setReady(false);
  let heightBuffer;
  if (options.passHeightBufferInCallback) {
    heightBuffer = new Float32Array((subdivisions + 1) * (subdivisions + 1));
  }
  const onBufferLoaded = (buffer, bufferWidth, bufferHeight) => {
    const vertexData = CreateGroundFromHeightMapVertexData({
      width,
      height,
      subdivisions,
      minHeight,
      maxHeight,
      colorFilter: filter,
      buffer,
      bufferWidth,
      bufferHeight,
      alphaFilter,
      heightBuffer
    });
    vertexData.applyToMesh(ground, updatable);
    if (onReady) {
      onReady(ground, heightBuffer);
    }
    ground._setReady(true);
  };
  if (typeof url === "string") {
    const onload = (img) => {
      const bufferWidth = img.width;
      const bufferHeight = img.height;
      if (scene.isDisposed) {
        return;
      }
      const buffer = scene == null ? void 0 : scene.getEngine().resizeImageBitmap(img, bufferWidth, bufferHeight);
      onBufferLoaded(buffer, bufferWidth, bufferHeight);
    };
    Tools.LoadImage(url, onload, options.onError ? options.onError : () => {
    }, scene.offlineProvider);
  } else {
    onBufferLoaded(url.data, url.width, url.height);
  }
  return ground;
}
VertexData.CreateGround = CreateGroundVertexData;
VertexData.CreateTiledGround = CreateTiledGroundVertexData;
VertexData.CreateGroundFromHeightMap = CreateGroundFromHeightMapVertexData;
Mesh.CreateGround = (name, width, height, subdivisions, scene, updatable) => {
  const options = {
    width,
    height,
    subdivisions,
    updatable
  };
  return CreateGround(name, options, scene);
};
Mesh.CreateTiledGround = (name, xmin, zmin, xmax, zmax, subdivisions, precision, scene, updatable) => {
  const options = {
    xmin,
    zmin,
    xmax,
    zmax,
    subdivisions,
    precision,
    updatable
  };
  return CreateTiledGround(name, options, scene);
};
Mesh.CreateGroundFromHeightMap = (name, url, width, height, subdivisions, minHeight, maxHeight, scene, updatable, onReady, alphaFilter) => {
  const options = {
    width,
    height,
    subdivisions,
    minHeight,
    maxHeight,
    updatable,
    onReady,
    alphaFilter
  };
  return CreateGroundFromHeightMap(name, url, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/boxBuilder.js
function CreateBoxVertexData(options) {
  const nbFaces = 6;
  let indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  const normals = [
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0
  ];
  const uvs = [];
  let positions = [];
  const width = options.width || options.size || 1;
  const height = options.height || options.size || 1;
  const depth = options.depth || options.size || 1;
  const wrap = options.wrap || false;
  let topBaseAt = options.topBaseAt === void 0 ? 1 : options.topBaseAt;
  let bottomBaseAt = options.bottomBaseAt === void 0 ? 0 : options.bottomBaseAt;
  topBaseAt = (topBaseAt + 4) % 4;
  bottomBaseAt = (bottomBaseAt + 4) % 4;
  const topOrder = [2, 0, 3, 1];
  const bottomOrder = [2, 0, 1, 3];
  let topIndex = topOrder[topBaseAt];
  let bottomIndex = bottomOrder[bottomBaseAt];
  let basePositions = [
    1,
    -1,
    1,
    -1,
    -1,
    1,
    -1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1,
    -1,
    -1,
    1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1,
    -1,
    1,
    1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1
  ];
  if (wrap) {
    indices = [2, 3, 0, 2, 0, 1, 4, 5, 6, 4, 6, 7, 9, 10, 11, 9, 11, 8, 12, 14, 15, 12, 13, 14];
    basePositions = [
      -1,
      1,
      1,
      1,
      1,
      1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1
    ];
    let topFaceBase = [
      [1, 1, 1],
      [-1, 1, 1],
      [-1, 1, -1],
      [1, 1, -1]
    ];
    let bottomFaceBase = [
      [-1, -1, 1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, -1, -1]
    ];
    const topFaceOrder = [17, 18, 19, 16];
    const bottomFaceOrder = [22, 23, 20, 21];
    while (topIndex > 0) {
      topFaceBase.unshift(topFaceBase.pop());
      topFaceOrder.unshift(topFaceOrder.pop());
      topIndex--;
    }
    while (bottomIndex > 0) {
      bottomFaceBase.unshift(bottomFaceBase.pop());
      bottomFaceOrder.unshift(bottomFaceOrder.pop());
      bottomIndex--;
    }
    topFaceBase = topFaceBase.flat();
    bottomFaceBase = bottomFaceBase.flat();
    basePositions = basePositions.concat(topFaceBase).concat(bottomFaceBase);
    indices.push(topFaceOrder[0], topFaceOrder[2], topFaceOrder[3], topFaceOrder[0], topFaceOrder[1], topFaceOrder[2]);
    indices.push(bottomFaceOrder[0], bottomFaceOrder[2], bottomFaceOrder[3], bottomFaceOrder[0], bottomFaceOrder[1], bottomFaceOrder[2]);
  }
  const scaleArray = [width / 2, height / 2, depth / 2];
  positions = basePositions.reduce((accumulator, currentValue, currentIndex) => accumulator.concat(currentValue * scaleArray[currentIndex % 3]), []);
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const faceUV = options.faceUV || new Array(6);
  const faceColors = options.faceColors;
  const colors = [];
  for (let f = 0; f < 6; f++) {
    if (faceUV[f] === void 0) {
      faceUV[f] = new Vector4(0, 0, 1, 1);
    }
    if (faceColors && faceColors[f] === void 0) {
      faceColors[f] = new Color4(1, 1, 1, 1);
    }
  }
  for (let index = 0; index < nbFaces; index++) {
    uvs.push(faceUV[index].z, useOpenGLOrientationForUV ? 1 - faceUV[index].w : faceUV[index].w);
    uvs.push(faceUV[index].x, useOpenGLOrientationForUV ? 1 - faceUV[index].w : faceUV[index].w);
    uvs.push(faceUV[index].x, useOpenGLOrientationForUV ? 1 - faceUV[index].y : faceUV[index].y);
    uvs.push(faceUV[index].z, useOpenGLOrientationForUV ? 1 - faceUV[index].y : faceUV[index].y);
    if (faceColors) {
      for (let c = 0; c < 4; c++) {
        colors.push(faceColors[index].r, faceColors[index].g, faceColors[index].b, faceColors[index].a);
      }
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  if (faceColors) {
    const totalColors = sideOrientation === VertexData.DOUBLESIDE ? colors.concat(colors) : colors;
    vertexData.colors = totalColors;
  }
  return vertexData;
}
function CreateBox(name, options = {}, scene = null) {
  const box = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  box._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateBoxVertexData(options);
  vertexData.applyToMesh(box, options.updatable);
  return box;
}
VertexData.CreateBox = CreateBoxVertexData;
Mesh.CreateBox = (name, size, scene = null, updatable, sideOrientation) => {
  const options = {
    size,
    sideOrientation,
    updatable
  };
  return CreateBox(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/tiledPlaneBuilder.js
function CreateTiledPlaneVertexData(options) {
  const flipTile = options.pattern || Mesh.NO_FLIP;
  const tileWidth = options.tileWidth || options.tileSize || 1;
  const tileHeight = options.tileHeight || options.tileSize || 1;
  const alignH = options.alignHorizontal || 0;
  const alignV = options.alignVertical || 0;
  const width = options.width || options.size || 1;
  const tilesX = Math.floor(width / tileWidth);
  let offsetX = width - tilesX * tileWidth;
  const height = options.height || options.size || 1;
  const tilesY = Math.floor(height / tileHeight);
  let offsetY = height - tilesY * tileHeight;
  const halfWidth = tileWidth * tilesX / 2;
  const halfHeight = tileHeight * tilesY / 2;
  let adjustX = 0;
  let adjustY = 0;
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  if (offsetX > 0 || offsetY > 0) {
    startX = -halfWidth;
    startY = -halfHeight;
    endX = halfWidth;
    endY = halfHeight;
    switch (alignH) {
      case Mesh.CENTER:
        offsetX /= 2;
        startX -= offsetX;
        endX += offsetX;
        break;
      case Mesh.LEFT:
        endX += offsetX;
        adjustX = -offsetX / 2;
        break;
      case Mesh.RIGHT:
        startX -= offsetX;
        adjustX = offsetX / 2;
        break;
    }
    switch (alignV) {
      case Mesh.CENTER:
        offsetY /= 2;
        startY -= offsetY;
        endY += offsetY;
        break;
      case Mesh.BOTTOM:
        endY += offsetY;
        adjustY = -offsetY / 2;
        break;
      case Mesh.TOP:
        startY -= offsetY;
        adjustY = offsetY / 2;
        break;
    }
  }
  const positions = [];
  const normals = [];
  const uvBase = [];
  uvBase[0] = [0, 0, 1, 0, 1, 1, 0, 1];
  uvBase[1] = [0, 0, 1, 0, 1, 1, 0, 1];
  if (flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.ROTATE_ROW) {
    uvBase[1] = [1, 1, 0, 1, 0, 0, 1, 0];
  }
  if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.FLIP_ROW) {
    uvBase[1] = [1, 0, 0, 0, 0, 1, 1, 1];
  }
  if (flipTile === Mesh.FLIP_N_ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
    uvBase[1] = [0, 1, 1, 1, 1, 0, 0, 0];
  }
  let uvs = [];
  const colors = [];
  const indices = [];
  let index = 0;
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      positions.push(-halfWidth + x * tileWidth + adjustX, -halfHeight + y * tileHeight + adjustY, 0);
      positions.push(-halfWidth + (x + 1) * tileWidth + adjustX, -halfHeight + y * tileHeight + adjustY, 0);
      positions.push(-halfWidth + (x + 1) * tileWidth + adjustX, -halfHeight + (y + 1) * tileHeight + adjustY, 0);
      positions.push(-halfWidth + x * tileWidth + adjustX, -halfHeight + (y + 1) * tileHeight + adjustY, 0);
      indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
      if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_TILE) {
        uvs = uvs.concat(uvBase[(x % 2 + y % 2) % 2]);
      } else if (flipTile === Mesh.FLIP_ROW || flipTile === Mesh.ROTATE_ROW || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
        uvs = uvs.concat(uvBase[y % 2]);
      } else {
        uvs = uvs.concat(uvBase[0]);
      }
      colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
      index += 4;
    }
  }
  if (offsetX > 0 || offsetY > 0) {
    const partialBottomRow = offsetY > 0 && (alignV === Mesh.CENTER || alignV === Mesh.TOP);
    const partialTopRow = offsetY > 0 && (alignV === Mesh.CENTER || alignV === Mesh.BOTTOM);
    const partialLeftCol = offsetX > 0 && (alignH === Mesh.CENTER || alignH === Mesh.RIGHT);
    const partialRightCol = offsetX > 0 && (alignH === Mesh.CENTER || alignH === Mesh.LEFT);
    let uvPart = [];
    let a, b, c, d;
    if (partialBottomRow && partialLeftCol) {
      positions.push(startX + adjustX, startY + adjustY, 0);
      positions.push(-halfWidth + adjustX, startY + adjustY, 0);
      positions.push(-halfWidth + adjustX, startY + offsetY + adjustY, 0);
      positions.push(startX + adjustX, startY + offsetY + adjustY, 0);
      indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
      index += 4;
      a = 1 - offsetX / tileWidth;
      b = 1 - offsetY / tileHeight;
      c = 1;
      d = 1;
      uvPart = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_ROW) {
        uvPart = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_ROW) {
        uvPart = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_ROW) {
        uvPart = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      uvs = uvs.concat(uvPart);
      colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
    }
    if (partialBottomRow && partialRightCol) {
      positions.push(halfWidth + adjustX, startY + adjustY, 0);
      positions.push(endX + adjustX, startY + adjustY, 0);
      positions.push(endX + adjustX, startY + offsetY + adjustY, 0);
      positions.push(halfWidth + adjustX, startY + offsetY + adjustY, 0);
      indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
      index += 4;
      a = 0;
      b = 1 - offsetY / tileHeight;
      c = offsetX / tileWidth;
      d = 1;
      uvPart = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_ROW || flipTile === Mesh.ROTATE_TILE && tilesX % 2 === 0) {
        uvPart = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_ROW || flipTile === Mesh.FLIP_TILE && tilesX % 2 === 0) {
        uvPart = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_ROW || flipTile === Mesh.FLIP_N_ROTATE_TILE && tilesX % 2 === 0) {
        uvPart = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      uvs = uvs.concat(uvPart);
      colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
    }
    if (partialTopRow && partialLeftCol) {
      positions.push(startX + adjustX, halfHeight + adjustY, 0);
      positions.push(-halfWidth + adjustX, halfHeight + adjustY, 0);
      positions.push(-halfWidth + adjustX, endY + adjustY, 0);
      positions.push(startX + adjustX, endY + adjustY, 0);
      indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
      index += 4;
      a = 1 - offsetX / tileWidth;
      b = 0;
      c = 1;
      d = offsetY / tileHeight;
      uvPart = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_ROW && tilesY % 2 === 1 || flipTile === Mesh.ROTATE_TILE && tilesY % 1 === 0) {
        uvPart = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_ROW && tilesY % 2 === 1 || flipTile === Mesh.FLIP_TILE && tilesY % 2 === 0) {
        uvPart = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_ROW && tilesY % 2 === 1 || flipTile === Mesh.FLIP_N_ROTATE_TILE && tilesY % 2 === 0) {
        uvPart = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      uvs = uvs.concat(uvPart);
      colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
    }
    if (partialTopRow && partialRightCol) {
      positions.push(halfWidth + adjustX, halfHeight + adjustY, 0);
      positions.push(endX + adjustX, halfHeight + adjustY, 0);
      positions.push(endX + adjustX, endY + adjustY, 0);
      positions.push(halfWidth + adjustX, endY + adjustY, 0);
      indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
      index += 4;
      a = 0;
      b = 0;
      c = offsetX / tileWidth;
      d = offsetY / tileHeight;
      uvPart = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_ROW && tilesY % 2 === 1 || flipTile === Mesh.ROTATE_TILE && (tilesY + tilesX) % 2 === 1) {
        uvPart = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_ROW && tilesY % 2 === 1 || flipTile === Mesh.FLIP_TILE && (tilesY + tilesX) % 2 === 1) {
        uvPart = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_ROW && tilesY % 2 === 1 || flipTile === Mesh.FLIP_N_ROTATE_TILE && (tilesY + tilesX) % 2 === 1) {
        uvPart = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      uvs = uvs.concat(uvPart);
      colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
    }
    if (partialBottomRow) {
      const uvBaseBR = [];
      a = 0;
      b = 1 - offsetY / tileHeight;
      c = 1;
      d = 1;
      uvBaseBR[0] = [a, b, c, b, c, d, a, d];
      uvBaseBR[1] = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.ROTATE_ROW) {
        uvBaseBR[1] = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.FLIP_ROW) {
        uvBaseBR[1] = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
        uvBaseBR[1] = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      for (let x = 0; x < tilesX; x++) {
        positions.push(-halfWidth + x * tileWidth + adjustX, startY + adjustY, 0);
        positions.push(-halfWidth + (x + 1) * tileWidth + adjustX, startY + adjustY, 0);
        positions.push(-halfWidth + (x + 1) * tileWidth + adjustX, startY + offsetY + adjustY, 0);
        positions.push(-halfWidth + x * tileWidth + adjustX, startY + offsetY + adjustY, 0);
        indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
        index += 4;
        if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_TILE) {
          uvs = uvs.concat(uvBaseBR[(x + 1) % 2]);
        } else if (flipTile === Mesh.FLIP_ROW || flipTile === Mesh.ROTATE_ROW || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
          uvs = uvs.concat(uvBaseBR[1]);
        } else {
          uvs = uvs.concat(uvBaseBR[0]);
        }
        colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
      }
    }
    if (partialTopRow) {
      const uvBaseTR = [];
      a = 0;
      b = 0;
      c = 1;
      d = offsetY / tileHeight;
      uvBaseTR[0] = [a, b, c, b, c, d, a, d];
      uvBaseTR[1] = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.ROTATE_ROW) {
        uvBaseTR[1] = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.FLIP_ROW) {
        uvBaseTR[1] = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
        uvBaseTR[1] = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      for (let x = 0; x < tilesX; x++) {
        positions.push(-halfWidth + x * tileWidth + adjustX, endY - offsetY + adjustY, 0);
        positions.push(-halfWidth + (x + 1) * tileWidth + adjustX, endY - offsetY + adjustY, 0);
        positions.push(-halfWidth + (x + 1) * tileWidth + adjustX, endY + adjustY, 0);
        positions.push(-halfWidth + x * tileWidth + adjustX, endY + adjustY, 0);
        indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
        index += 4;
        if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_TILE) {
          uvs = uvs.concat(uvBaseTR[(x + tilesY) % 2]);
        } else if (flipTile === Mesh.FLIP_ROW || flipTile === Mesh.ROTATE_ROW || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
          uvs = uvs.concat(uvBaseTR[tilesY % 2]);
        } else {
          uvs = uvs.concat(uvBaseTR[0]);
        }
        colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
      }
    }
    if (partialLeftCol) {
      const uvBaseLC = [];
      a = 1 - offsetX / tileWidth;
      b = 0;
      c = 1;
      d = 1;
      uvBaseLC[0] = [a, b, c, b, c, d, a, d];
      uvBaseLC[1] = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.ROTATE_ROW) {
        uvBaseLC[1] = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.FLIP_ROW) {
        uvBaseLC[1] = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
        uvBaseLC[1] = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      for (let y = 0; y < tilesY; y++) {
        positions.push(startX + adjustX, -halfHeight + y * tileHeight + adjustY, 0);
        positions.push(startX + offsetX + adjustX, -halfHeight + y * tileHeight + adjustY, 0);
        positions.push(startX + offsetX + adjustX, -halfHeight + (y + 1) * tileHeight + adjustY, 0);
        positions.push(startX + adjustX, -halfHeight + (y + 1) * tileHeight + adjustY, 0);
        indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
        index += 4;
        if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_TILE) {
          uvs = uvs.concat(uvBaseLC[(y + 1) % 2]);
        } else if (flipTile === Mesh.FLIP_ROW || flipTile === Mesh.ROTATE_ROW || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
          uvs = uvs.concat(uvBaseLC[y % 2]);
        } else {
          uvs = uvs.concat(uvBaseLC[0]);
        }
        colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
      }
    }
    if (partialRightCol) {
      const uvBaseRC = [];
      a = 0;
      b = 0;
      c = offsetX / tileHeight;
      d = 1;
      uvBaseRC[0] = [a, b, c, b, c, d, a, d];
      uvBaseRC[1] = [a, b, c, b, c, d, a, d];
      if (flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.ROTATE_ROW) {
        uvBaseRC[1] = [1 - a, 1 - b, 1 - c, 1 - b, 1 - c, 1 - d, 1 - a, 1 - d];
      }
      if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.FLIP_ROW) {
        uvBaseRC[1] = [1 - a, b, 1 - c, b, 1 - c, d, 1 - a, d];
      }
      if (flipTile === Mesh.FLIP_N_ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
        uvBaseRC[1] = [a, 1 - b, c, 1 - b, c, 1 - d, a, 1 - d];
      }
      for (let y = 0; y < tilesY; y++) {
        positions.push(endX - offsetX + adjustX, -halfHeight + y * tileHeight + adjustY, 0);
        positions.push(endX + adjustX, -halfHeight + y * tileHeight + adjustY, 0);
        positions.push(endX + adjustX, -halfHeight + (y + 1) * tileHeight + adjustY, 0);
        positions.push(endX - offsetX + adjustX, -halfHeight + (y + 1) * tileHeight + adjustY, 0);
        indices.push(index, index + 1, index + 3, index + 1, index + 2, index + 3);
        index += 4;
        if (flipTile === Mesh.FLIP_TILE || flipTile === Mesh.ROTATE_TILE || flipTile === Mesh.FLIP_N_ROTATE_TILE) {
          uvs = uvs.concat(uvBaseRC[(y + tilesX) % 2]);
        } else if (flipTile === Mesh.FLIP_ROW || flipTile === Mesh.ROTATE_ROW || flipTile === Mesh.FLIP_N_ROTATE_ROW) {
          uvs = uvs.concat(uvBaseRC[y % 2]);
        } else {
          uvs = uvs.concat(uvBaseRC[0]);
        }
        colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
      }
    }
  }
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  const totalColors = sideOrientation === VertexData.DOUBLESIDE ? colors.concat(colors) : colors;
  vertexData.colors = totalColors;
  return vertexData;
}
function CreateTiledPlane(name, options, scene = null) {
  const plane = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  plane._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateTiledPlaneVertexData(options);
  vertexData.applyToMesh(plane, options.updatable);
  return plane;
}
VertexData.CreateTiledPlane = CreateTiledPlaneVertexData;

// node_modules/@babylonjs/core/Meshes/Builders/tiledBoxBuilder.js
function CreateTiledBoxVertexData(options) {
  const nbFaces = 6;
  const faceUV = options.faceUV || new Array(6);
  const faceColors = options.faceColors;
  const flipTile = options.pattern || Mesh.NO_FLIP;
  const width = options.width || options.size || 1;
  const height = options.height || options.size || 1;
  const depth = options.depth || options.size || 1;
  const tileWidth = options.tileWidth || options.tileSize || 1;
  const tileHeight = options.tileHeight || options.tileSize || 1;
  const alignH = options.alignHorizontal || 0;
  const alignV = options.alignVertical || 0;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  for (let f = 0; f < nbFaces; f++) {
    if (faceUV[f] === void 0) {
      faceUV[f] = new Vector4(0, 0, 1, 1);
    }
    if (faceColors && faceColors[f] === void 0) {
      faceColors[f] = new Color4(1, 1, 1, 1);
    }
  }
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;
  const faceVertexData = [];
  for (let f = 0; f < 2; f++) {
    faceVertexData[f] = CreateTiledPlaneVertexData({
      pattern: flipTile,
      tileWidth,
      tileHeight,
      width,
      height,
      alignVertical: alignV,
      alignHorizontal: alignH,
      sideOrientation
    });
  }
  for (let f = 2; f < 4; f++) {
    faceVertexData[f] = CreateTiledPlaneVertexData({
      pattern: flipTile,
      tileWidth,
      tileHeight,
      width: depth,
      height,
      alignVertical: alignV,
      alignHorizontal: alignH,
      sideOrientation
    });
  }
  let baseAlignV = alignV;
  if (alignV === Mesh.BOTTOM) {
    baseAlignV = Mesh.TOP;
  } else if (alignV === Mesh.TOP) {
    baseAlignV = Mesh.BOTTOM;
  }
  for (let f = 4; f < 6; f++) {
    faceVertexData[f] = CreateTiledPlaneVertexData({
      pattern: flipTile,
      tileWidth,
      tileHeight,
      width,
      height: depth,
      alignVertical: baseAlignV,
      alignHorizontal: alignH,
      sideOrientation
    });
  }
  let positions = [];
  let normals = [];
  let uvs = [];
  let indices = [];
  const colors = [];
  const facePositions = [];
  const faceNormals = [];
  const newFaceUV = [];
  let lu = 0;
  let li = 0;
  for (let f = 0; f < nbFaces; f++) {
    const len = faceVertexData[f].positions.length;
    facePositions[f] = [];
    faceNormals[f] = [];
    for (let p = 0; p < len / 3; p++) {
      facePositions[f].push(new Vector3(faceVertexData[f].positions[3 * p], faceVertexData[f].positions[3 * p + 1], faceVertexData[f].positions[3 * p + 2]));
      faceNormals[f].push(new Vector3(faceVertexData[f].normals[3 * p], faceVertexData[f].normals[3 * p + 1], faceVertexData[f].normals[3 * p + 2]));
    }
    lu = faceVertexData[f].uvs.length;
    newFaceUV[f] = [];
    for (let i = 0; i < lu; i += 2) {
      newFaceUV[f][i] = faceUV[f].x + (faceUV[f].z - faceUV[f].x) * faceVertexData[f].uvs[i];
      newFaceUV[f][i + 1] = faceUV[f].y + (faceUV[f].w - faceUV[f].y) * faceVertexData[f].uvs[i + 1];
      if (useOpenGLOrientationForUV) {
        newFaceUV[f][i + 1] = 1 - newFaceUV[f][i + 1];
      }
    }
    uvs = uvs.concat(newFaceUV[f]);
    indices = indices.concat(faceVertexData[f].indices.map((x) => x + li));
    li += facePositions[f].length;
    if (faceColors) {
      for (let c = 0; c < 4; c++) {
        colors.push(faceColors[f].r, faceColors[f].g, faceColors[f].b, faceColors[f].a);
      }
    }
  }
  const vec0 = new Vector3(0, 0, halfDepth);
  const mtrx0 = Matrix.RotationY(Math.PI);
  positions = facePositions[0].map((entry) => Vector3.TransformNormal(entry, mtrx0).add(vec0)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
  normals = faceNormals[0].map((entry) => Vector3.TransformNormal(entry, mtrx0)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
  positions = positions.concat(facePositions[1].map((entry) => entry.subtract(vec0)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  normals = normals.concat(faceNormals[1].map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  const vec2 = new Vector3(halfWidth, 0, 0);
  const mtrx2 = Matrix.RotationY(-Math.PI / 2);
  positions = positions.concat(facePositions[2].map((entry) => Vector3.TransformNormal(entry, mtrx2).add(vec2)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  normals = normals.concat(faceNormals[2].map((entry) => Vector3.TransformNormal(entry, mtrx2)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  const mtrx3 = Matrix.RotationY(Math.PI / 2);
  positions = positions.concat(facePositions[3].map((entry) => Vector3.TransformNormal(entry, mtrx3).subtract(vec2)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  normals = normals.concat(faceNormals[3].map((entry) => Vector3.TransformNormal(entry, mtrx3)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  const vec4 = new Vector3(0, halfHeight, 0);
  const mtrx4 = Matrix.RotationX(Math.PI / 2);
  positions = positions.concat(facePositions[4].map((entry) => Vector3.TransformNormal(entry, mtrx4).add(vec4)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  normals = normals.concat(faceNormals[4].map((entry) => Vector3.TransformNormal(entry, mtrx4)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  const mtrx5 = Matrix.RotationX(-Math.PI / 2);
  positions = positions.concat(facePositions[5].map((entry) => Vector3.TransformNormal(entry, mtrx5).subtract(vec4)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  normals = normals.concat(faceNormals[5].map((entry) => Vector3.TransformNormal(entry, mtrx5)).map((entry) => [entry.x, entry.y, entry.z]).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  if (faceColors) {
    const totalColors = sideOrientation === VertexData.DOUBLESIDE ? colors.concat(colors) : colors;
    vertexData.colors = totalColors;
  }
  return vertexData;
}
function CreateTiledBox(name, options, scene = null) {
  const box = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  box._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateTiledBoxVertexData(options);
  vertexData.applyToMesh(box, options.updatable);
  return box;
}
VertexData.CreateTiledBox = CreateTiledBoxVertexData;

// node_modules/@babylonjs/core/Meshes/Builders/sphereBuilder.js
function CreateSphereVertexData(options) {
  const segments = (options.segments || 32) | 0;
  const diameterX = options.diameterX || options.diameter || 1;
  const diameterY = options.diameterY || options.diameter || 1;
  const diameterZ = options.diameterZ || options.diameter || 1;
  const arc = options.arc && (options.arc <= 0 || options.arc > 1) ? 1 : options.arc || 1;
  const slice = options.slice && options.slice <= 0 ? 1 : options.slice || 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const dedupTopBottomIndices = !!options.dedupTopBottomIndices;
  const radius = new Vector3(diameterX / 2, diameterY / 2, diameterZ / 2);
  const totalZRotationSteps = 2 + segments;
  const totalYRotationSteps = 2 * totalZRotationSteps;
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  for (let zRotationStep = 0; zRotationStep <= totalZRotationSteps; zRotationStep++) {
    const normalizedZ = zRotationStep / totalZRotationSteps;
    const angleZ = normalizedZ * Math.PI * slice;
    for (let yRotationStep = 0; yRotationStep <= totalYRotationSteps; yRotationStep++) {
      const normalizedY = yRotationStep / totalYRotationSteps;
      const angleY = normalizedY * Math.PI * 2 * arc;
      const rotationZ = Matrix.RotationZ(-angleZ);
      const rotationY = Matrix.RotationY(angleY);
      const afterRotZ = Vector3.TransformCoordinates(Vector3.Up(), rotationZ);
      const complete = Vector3.TransformCoordinates(afterRotZ, rotationY);
      const vertex = complete.multiply(radius);
      const normal = complete.divide(radius).normalize();
      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(normalizedY, useOpenGLOrientationForUV ? 1 - normalizedZ : normalizedZ);
    }
    if (zRotationStep > 0) {
      const verticesCount = positions.length / 3;
      for (let firstIndex = verticesCount - 2 * (totalYRotationSteps + 1); firstIndex + totalYRotationSteps + 2 < verticesCount; firstIndex++) {
        if (dedupTopBottomIndices) {
          if (zRotationStep > 1) {
            indices.push(firstIndex);
            indices.push(firstIndex + 1);
            indices.push(firstIndex + totalYRotationSteps + 1);
          }
          if (zRotationStep < totalZRotationSteps || slice < 1) {
            indices.push(firstIndex + totalYRotationSteps + 1);
            indices.push(firstIndex + 1);
            indices.push(firstIndex + totalYRotationSteps + 2);
          }
        } else {
          indices.push(firstIndex);
          indices.push(firstIndex + 1);
          indices.push(firstIndex + totalYRotationSteps + 1);
          indices.push(firstIndex + totalYRotationSteps + 1);
          indices.push(firstIndex + 1);
          indices.push(firstIndex + totalYRotationSteps + 2);
        }
      }
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateSphere(name, options = {}, scene = null) {
  const sphere = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  sphere._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateSphereVertexData(options);
  vertexData.applyToMesh(sphere, options.updatable);
  return sphere;
}
VertexData.CreateSphere = CreateSphereVertexData;
Mesh.CreateSphere = (name, segments, diameter, scene, updatable, sideOrientation) => {
  const options = {
    segments,
    diameterX: diameter,
    diameterY: diameter,
    diameterZ: diameter,
    sideOrientation,
    updatable
  };
  return CreateSphere(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/cylinderBuilder.js
function CreateCylinderVertexData(options) {
  const height = options.height || 2;
  let diameterTop = options.diameterTop === 0 ? 0 : options.diameterTop || options.diameter || 1;
  let diameterBottom = options.diameterBottom === 0 ? 0 : options.diameterBottom || options.diameter || 1;
  diameterTop = diameterTop || 1e-5;
  diameterBottom = diameterBottom || 1e-5;
  const tessellation = (options.tessellation || 24) | 0;
  const subdivisions = (options.subdivisions || 1) | 0;
  const hasRings = options.hasRings ? true : false;
  const enclose = options.enclose ? true : false;
  const cap = options.cap === 0 ? 0 : options.cap || Mesh.CAP_ALL;
  const arc = options.arc && (options.arc <= 0 || options.arc > 1) ? 1 : options.arc || 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const faceUV = options.faceUV || new Array(3);
  const faceColors = options.faceColors;
  const quadNb = arc !== 1 && enclose ? 2 : 0;
  const ringNb = hasRings ? subdivisions : 1;
  const surfaceNb = 2 + (1 + quadNb) * ringNb;
  let f;
  for (f = 0; f < surfaceNb; f++) {
    if (faceColors && faceColors[f] === void 0) {
      faceColors[f] = new Color4(1, 1, 1, 1);
    }
  }
  for (f = 0; f < surfaceNb; f++) {
    if (faceUV && faceUV[f] === void 0) {
      faceUV[f] = new Vector4(0, 0, 1, 1);
    }
  }
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  const colors = [];
  const angleStep = Math.PI * 2 * arc / tessellation;
  let angle;
  let h;
  let radius;
  const tan = (diameterBottom - diameterTop) / 2 / height;
  const ringVertex = Vector3.Zero();
  const ringNormal = Vector3.Zero();
  const ringFirstVertex = Vector3.Zero();
  const ringFirstNormal = Vector3.Zero();
  const quadNormal = Vector3.Zero();
  const Y = Axis.Y;
  let i;
  let j;
  let r;
  let ringIdx = 1;
  let s = 1;
  let cs = 0;
  let v = 0;
  for (i = 0; i <= subdivisions; i++) {
    h = i / subdivisions;
    radius = (h * (diameterTop - diameterBottom) + diameterBottom) / 2;
    ringIdx = hasRings && i !== 0 && i !== subdivisions ? 2 : 1;
    for (r = 0; r < ringIdx; r++) {
      if (hasRings) {
        s += r;
      }
      if (enclose) {
        s += 2 * r;
      }
      for (j = 0; j <= tessellation; j++) {
        angle = j * angleStep;
        ringVertex.x = Math.cos(-angle) * radius;
        ringVertex.y = -height / 2 + h * height;
        ringVertex.z = Math.sin(-angle) * radius;
        if (diameterTop === 0 && i === subdivisions) {
          ringNormal.x = normals[normals.length - (tessellation + 1) * 3];
          ringNormal.y = normals[normals.length - (tessellation + 1) * 3 + 1];
          ringNormal.z = normals[normals.length - (tessellation + 1) * 3 + 2];
        } else {
          ringNormal.x = ringVertex.x;
          ringNormal.z = ringVertex.z;
          ringNormal.y = Math.sqrt(ringNormal.x * ringNormal.x + ringNormal.z * ringNormal.z) * tan;
          ringNormal.normalize();
        }
        if (j === 0) {
          ringFirstVertex.copyFrom(ringVertex);
          ringFirstNormal.copyFrom(ringNormal);
        }
        positions.push(ringVertex.x, ringVertex.y, ringVertex.z);
        normals.push(ringNormal.x, ringNormal.y, ringNormal.z);
        if (hasRings) {
          v = cs !== s ? faceUV[s].y : faceUV[s].w;
        } else {
          v = faceUV[s].y + (faceUV[s].w - faceUV[s].y) * h;
        }
        uvs.push(faceUV[s].x + (faceUV[s].z - faceUV[s].x) * j / tessellation, useOpenGLOrientationForUV ? 1 - v : v);
        if (faceColors) {
          colors.push(faceColors[s].r, faceColors[s].g, faceColors[s].b, faceColors[s].a);
        }
      }
      if (arc !== 1 && enclose) {
        positions.push(ringVertex.x, ringVertex.y, ringVertex.z);
        positions.push(0, ringVertex.y, 0);
        positions.push(0, ringVertex.y, 0);
        positions.push(ringFirstVertex.x, ringFirstVertex.y, ringFirstVertex.z);
        Vector3.CrossToRef(Y, ringNormal, quadNormal);
        quadNormal.normalize();
        normals.push(quadNormal.x, quadNormal.y, quadNormal.z, quadNormal.x, quadNormal.y, quadNormal.z);
        Vector3.CrossToRef(ringFirstNormal, Y, quadNormal);
        quadNormal.normalize();
        normals.push(quadNormal.x, quadNormal.y, quadNormal.z, quadNormal.x, quadNormal.y, quadNormal.z);
        if (hasRings) {
          v = cs !== s ? faceUV[s + 1].y : faceUV[s + 1].w;
        } else {
          v = faceUV[s + 1].y + (faceUV[s + 1].w - faceUV[s + 1].y) * h;
        }
        uvs.push(faceUV[s + 1].x, useOpenGLOrientationForUV ? 1 - v : v);
        uvs.push(faceUV[s + 1].z, useOpenGLOrientationForUV ? 1 - v : v);
        if (hasRings) {
          v = cs !== s ? faceUV[s + 2].y : faceUV[s + 2].w;
        } else {
          v = faceUV[s + 2].y + (faceUV[s + 2].w - faceUV[s + 2].y) * h;
        }
        uvs.push(faceUV[s + 2].x, useOpenGLOrientationForUV ? 1 - v : v);
        uvs.push(faceUV[s + 2].z, useOpenGLOrientationForUV ? 1 - v : v);
        if (faceColors) {
          colors.push(faceColors[s + 1].r, faceColors[s + 1].g, faceColors[s + 1].b, faceColors[s + 1].a);
          colors.push(faceColors[s + 1].r, faceColors[s + 1].g, faceColors[s + 1].b, faceColors[s + 1].a);
          colors.push(faceColors[s + 2].r, faceColors[s + 2].g, faceColors[s + 2].b, faceColors[s + 2].a);
          colors.push(faceColors[s + 2].r, faceColors[s + 2].g, faceColors[s + 2].b, faceColors[s + 2].a);
        }
      }
      if (cs !== s) {
        cs = s;
      }
    }
  }
  const e = arc !== 1 && enclose ? tessellation + 4 : tessellation;
  i = 0;
  for (s = 0; s < subdivisions; s++) {
    let i0 = 0;
    let i1 = 0;
    let i2 = 0;
    let i3 = 0;
    for (j = 0; j < tessellation; j++) {
      i0 = i * (e + 1) + j;
      i1 = (i + 1) * (e + 1) + j;
      i2 = i * (e + 1) + (j + 1);
      i3 = (i + 1) * (e + 1) + (j + 1);
      indices.push(i0, i1, i2);
      indices.push(i3, i2, i1);
    }
    if (arc !== 1 && enclose) {
      indices.push(i0 + 2, i1 + 2, i2 + 2);
      indices.push(i3 + 2, i2 + 2, i1 + 2);
      indices.push(i0 + 4, i1 + 4, i2 + 4);
      indices.push(i3 + 4, i2 + 4, i1 + 4);
    }
    i = hasRings ? i + 2 : i + 1;
  }
  const createCylinderCap = (isTop) => {
    const radius2 = isTop ? diameterTop / 2 : diameterBottom / 2;
    if (radius2 === 0) {
      return;
    }
    let angle2;
    let circleVector;
    let i2;
    const u = isTop ? faceUV[surfaceNb - 1] : faceUV[0];
    let c = null;
    if (faceColors) {
      c = isTop ? faceColors[surfaceNb - 1] : faceColors[0];
    }
    const vbase = positions.length / 3;
    const offset = isTop ? height / 2 : -height / 2;
    const center = new Vector3(0, offset, 0);
    positions.push(center.x, center.y, center.z);
    normals.push(0, isTop ? 1 : -1, 0);
    const v2 = u.y + (u.w - u.y) * 0.5;
    uvs.push(u.x + (u.z - u.x) * 0.5, useOpenGLOrientationForUV ? 1 - v2 : v2);
    if (c) {
      colors.push(c.r, c.g, c.b, c.a);
    }
    const textureScale = new Vector2(0.5, 0.5);
    for (i2 = 0; i2 <= tessellation; i2++) {
      angle2 = Math.PI * 2 * i2 * arc / tessellation;
      const cos = Math.cos(-angle2);
      const sin = Math.sin(-angle2);
      circleVector = new Vector3(cos * radius2, offset, sin * radius2);
      const textureCoordinate = new Vector2(cos * textureScale.x + 0.5, sin * textureScale.y + 0.5);
      positions.push(circleVector.x, circleVector.y, circleVector.z);
      normals.push(0, isTop ? 1 : -1, 0);
      const v3 = u.y + (u.w - u.y) * textureCoordinate.y;
      uvs.push(u.x + (u.z - u.x) * textureCoordinate.x, useOpenGLOrientationForUV ? 1 - v3 : v3);
      if (c) {
        colors.push(c.r, c.g, c.b, c.a);
      }
    }
    for (i2 = 0; i2 < tessellation; i2++) {
      if (!isTop) {
        indices.push(vbase);
        indices.push(vbase + (i2 + 1));
        indices.push(vbase + (i2 + 2));
      } else {
        indices.push(vbase);
        indices.push(vbase + (i2 + 2));
        indices.push(vbase + (i2 + 1));
      }
    }
  };
  if (cap === Mesh.CAP_START || cap === Mesh.CAP_ALL) {
    createCylinderCap(false);
  }
  if (cap === Mesh.CAP_END || cap === Mesh.CAP_ALL) {
    createCylinderCap(true);
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  if (faceColors) {
    vertexData.colors = colors;
  }
  return vertexData;
}
function CreateCylinder(name, options = {}, scene) {
  const cylinder = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  cylinder._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateCylinderVertexData(options);
  vertexData.applyToMesh(cylinder, options.updatable);
  return cylinder;
}
VertexData.CreateCylinder = CreateCylinderVertexData;
Mesh.CreateCylinder = (name, height, diameterTop, diameterBottom, tessellation, subdivisions, scene, updatable, sideOrientation) => {
  if (scene === void 0 || !(scene instanceof Scene)) {
    if (scene !== void 0) {
      sideOrientation = updatable || Mesh.DEFAULTSIDE;
      updatable = scene;
    }
    scene = subdivisions;
    subdivisions = 1;
  }
  const options = {
    height,
    diameterTop,
    diameterBottom,
    tessellation,
    subdivisions,
    sideOrientation,
    updatable
  };
  return CreateCylinder(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/torusBuilder.js
function CreateTorusVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  const diameter = options.diameter || 1;
  const thickness = options.thickness || 0.5;
  const tessellation = (options.tessellation || 16) | 0;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const stride = tessellation + 1;
  for (let i = 0; i <= tessellation; i++) {
    const u = i / tessellation;
    const outerAngle = i * Math.PI * 2 / tessellation - Math.PI / 2;
    const transform = Matrix.Translation(diameter / 2, 0, 0).multiply(Matrix.RotationY(outerAngle));
    for (let j = 0; j <= tessellation; j++) {
      const v = 1 - j / tessellation;
      const innerAngle = j * Math.PI * 2 / tessellation + Math.PI;
      const dx = Math.cos(innerAngle);
      const dy = Math.sin(innerAngle);
      let normal = new Vector3(dx, dy, 0);
      let position = normal.scale(thickness / 2);
      const textureCoordinate = new Vector2(u, v);
      position = Vector3.TransformCoordinates(position, transform);
      normal = Vector3.TransformNormal(normal, transform);
      positions.push(position.x, position.y, position.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(textureCoordinate.x, useOpenGLOrientationForUV ? 1 - textureCoordinate.y : textureCoordinate.y);
      const nextI = (i + 1) % stride;
      const nextJ = (j + 1) % stride;
      indices.push(i * stride + j);
      indices.push(i * stride + nextJ);
      indices.push(nextI * stride + j);
      indices.push(i * stride + nextJ);
      indices.push(nextI * stride + nextJ);
      indices.push(nextI * stride + j);
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateTorus(name, options = {}, scene) {
  const torus = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  torus._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateTorusVertexData(options);
  vertexData.applyToMesh(torus, options.updatable);
  return torus;
}
VertexData.CreateTorus = CreateTorusVertexData;
Mesh.CreateTorus = (name, diameter, thickness, tessellation, scene, updatable, sideOrientation) => {
  const options = {
    diameter,
    thickness,
    tessellation,
    sideOrientation,
    updatable
  };
  return CreateTorus(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/torusKnotBuilder.js
function CreateTorusKnotVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  const radius = options.radius || 2;
  const tube = options.tube || 0.5;
  const radialSegments = options.radialSegments || 32;
  const tubularSegments = options.tubularSegments || 32;
  const p = options.p || 2;
  const q = options.q || 3;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const getPos = (angle) => {
    const cu = Math.cos(angle);
    const su = Math.sin(angle);
    const quOverP = q / p * angle;
    const cs = Math.cos(quOverP);
    const tx = radius * (2 + cs) * 0.5 * cu;
    const ty = radius * (2 + cs) * su * 0.5;
    const tz = radius * Math.sin(quOverP) * 0.5;
    return new Vector3(tx, ty, tz);
  };
  let i;
  let j;
  for (i = 0; i <= radialSegments; i++) {
    const modI = i % radialSegments;
    const u = modI / radialSegments * 2 * p * Math.PI;
    const p1 = getPos(u);
    const p2 = getPos(u + 0.01);
    const tang = p2.subtract(p1);
    let n = p2.add(p1);
    const bitan = Vector3.Cross(tang, n);
    n = Vector3.Cross(bitan, tang);
    bitan.normalize();
    n.normalize();
    for (j = 0; j < tubularSegments; j++) {
      const modJ = j % tubularSegments;
      const v = modJ / tubularSegments * 2 * Math.PI;
      const cx = -tube * Math.cos(v);
      const cy = tube * Math.sin(v);
      positions.push(p1.x + cx * n.x + cy * bitan.x);
      positions.push(p1.y + cx * n.y + cy * bitan.y);
      positions.push(p1.z + cx * n.z + cy * bitan.z);
      uvs.push(i / radialSegments);
      uvs.push(useOpenGLOrientationForUV ? 1 - j / tubularSegments : j / tubularSegments);
    }
  }
  for (i = 0; i < radialSegments; i++) {
    for (j = 0; j < tubularSegments; j++) {
      const jNext = (j + 1) % tubularSegments;
      const a = i * tubularSegments + j;
      const b = (i + 1) * tubularSegments + j;
      const c = (i + 1) * tubularSegments + jNext;
      const d = i * tubularSegments + jNext;
      indices.push(d);
      indices.push(b);
      indices.push(a);
      indices.push(d);
      indices.push(c);
      indices.push(b);
    }
  }
  VertexData.ComputeNormals(positions, indices, normals);
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateTorusKnot(name, options = {}, scene) {
  const torusKnot = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  torusKnot._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateTorusKnotVertexData(options);
  vertexData.applyToMesh(torusKnot, options.updatable);
  return torusKnot;
}
VertexData.CreateTorusKnot = CreateTorusKnotVertexData;
Mesh.CreateTorusKnot = (name, radius, tube, radialSegments, tubularSegments, p, q, scene, updatable, sideOrientation) => {
  const options = {
    radius,
    tube,
    radialSegments,
    tubularSegments,
    p,
    q,
    sideOrientation,
    updatable
  };
  return CreateTorusKnot(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/instancedMesh.js
Mesh._instancedMeshFactory = (name, mesh) => {
  const instance = new InstancedMesh(name, mesh);
  if (mesh.instancedBuffers) {
    instance.instancedBuffers = {};
    for (const key in mesh.instancedBuffers) {
      instance.instancedBuffers[key] = mesh.instancedBuffers[key];
    }
  }
  return instance;
};
var InstancedMesh = class extends AbstractMesh {
  /**
   * Creates a new InstancedMesh object from the mesh source.
   * @param name defines the name of the instance
   * @param source the mesh to create the instance from
   */
  constructor(name, source) {
    super(name, source.getScene());
    this._indexInSourceMeshInstanceArray = -1;
    this._distanceToCamera = 0;
    source.addInstance(this);
    this._sourceMesh = source;
    this._unIndexed = source._unIndexed;
    this.position.copyFrom(source.position);
    this.rotation.copyFrom(source.rotation);
    this.scaling.copyFrom(source.scaling);
    if (source.rotationQuaternion) {
      this.rotationQuaternion = source.rotationQuaternion.clone();
    }
    this.animations = source.animations.slice();
    for (const range of source.getAnimationRanges()) {
      if (range != null) {
        this.createAnimationRange(range.name, range.from, range.to);
      }
    }
    this.infiniteDistance = source.infiniteDistance;
    this.setPivotMatrix(source.getPivotMatrix());
    this.refreshBoundingInfo(true, true);
    this._syncSubMeshes();
  }
  /**
   * @returns the string "InstancedMesh".
   */
  getClassName() {
    return "InstancedMesh";
  }
  /** Gets the list of lights affecting that mesh */
  get lightSources() {
    return this._sourceMesh._lightSources;
  }
  _resyncLightSources() {
  }
  _resyncLightSource() {
  }
  _removeLightSource() {
  }
  // Methods
  /**
   * If the source mesh receives shadows
   */
  get receiveShadows() {
    return this._sourceMesh.receiveShadows;
  }
  set receiveShadows(_value) {
    var _a;
    if (((_a = this._sourceMesh) == null ? void 0 : _a.receiveShadows) !== _value) {
      Tools.Warn("Setting receiveShadows on an instanced mesh has no effect");
    }
  }
  /**
   * The material of the source mesh
   */
  get material() {
    return this._sourceMesh.material;
  }
  set material(_value) {
    var _a;
    if (((_a = this._sourceMesh) == null ? void 0 : _a.material) !== _value) {
      Tools.Warn("Setting material on an instanced mesh has no effect");
    }
  }
  /**
   * Visibility of the source mesh
   */
  get visibility() {
    return this._sourceMesh.visibility;
  }
  set visibility(_value) {
    var _a;
    if (((_a = this._sourceMesh) == null ? void 0 : _a.visibility) !== _value) {
      Tools.Warn("Setting visibility on an instanced mesh has no effect");
    }
  }
  /**
   * Skeleton of the source mesh
   */
  get skeleton() {
    return this._sourceMesh.skeleton;
  }
  set skeleton(_value) {
    var _a;
    if (((_a = this._sourceMesh) == null ? void 0 : _a.skeleton) !== _value) {
      Tools.Warn("Setting skeleton on an instanced mesh has no effect");
    }
  }
  /**
   * Rendering ground id of the source mesh
   */
  get renderingGroupId() {
    return this._sourceMesh.renderingGroupId;
  }
  set renderingGroupId(value) {
    if (!this._sourceMesh || value === this._sourceMesh.renderingGroupId) {
      return;
    }
    Logger.Warn("Note - setting renderingGroupId of an instanced mesh has no effect on the scene");
  }
  /**
   * @returns the total number of vertices (integer).
   */
  getTotalVertices() {
    return this._sourceMesh ? this._sourceMesh.getTotalVertices() : 0;
  }
  /**
   * Returns a positive integer : the total number of indices in this mesh geometry.
   * @returns the number of indices or zero if the mesh has no geometry.
   */
  getTotalIndices() {
    return this._sourceMesh.getTotalIndices();
  }
  /**
   * The source mesh of the instance
   */
  get sourceMesh() {
    return this._sourceMesh;
  }
  /**
   * Gets the mesh internal Geometry object
   */
  get geometry() {
    return this._sourceMesh._geometry;
  }
  /**
   * Creates a new InstancedMesh object from the mesh model.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
   * @param name defines the name of the new instance
   * @returns a new InstancedMesh
   */
  createInstance(name) {
    return this._sourceMesh.createInstance(name);
  }
  /**
   * Is this node ready to be used/rendered
   * @param completeCheck defines if a complete check (including materials and lights) has to be done (false by default)
   * @returns {boolean} is it ready
   */
  isReady(completeCheck = false) {
    return this._sourceMesh.isReady(completeCheck, true);
  }
  /**
   * Returns an array of integers or a typed array (Int32Array, Uint32Array, Uint16Array) populated with the mesh indices.
   * @param kind kind of verticies to retrieve (eg. positions, normals, uvs, etc.)
   * @param copyWhenShared If true (default false) and and if the mesh geometry is shared among some other meshes, the returned array is a copy of the internal one.
   * @param forceCopy defines a boolean forcing the copy of the buffer no matter what the value of copyWhenShared is
   * @returns a float array or a Float32Array of the requested kind of data : positions, normals, uvs, etc.
   */
  getVerticesData(kind, copyWhenShared, forceCopy) {
    return this._sourceMesh.getVerticesData(kind, copyWhenShared, forceCopy);
  }
  copyVerticesData(kind, vertexData) {
    this._sourceMesh.copyVerticesData(kind, vertexData);
  }
  /**
   * Sets the vertex data of the mesh geometry for the requested `kind`.
   * If the mesh has no geometry, a new Geometry object is set to the mesh and then passed this vertex data.
   * The `data` are either a numeric array either a Float32Array.
   * The parameter `updatable` is passed as is to the underlying Geometry object constructor (if initially none) or updater.
   * The parameter `stride` is an optional positive integer, it is usually automatically deducted from the `kind` (3 for positions or normals, 2 for UV, etc).
   * Note that a new underlying VertexBuffer object is created each call.
   * If the `kind` is the `PositionKind`, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
   *
   * Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   *
   * Returns the Mesh.
   * @param kind defines vertex data kind
   * @param data defines the data source
   * @param updatable defines if the data must be flagged as updatable (false as default)
   * @param stride defines the vertex stride (optional)
   * @returns the current mesh
   */
  setVerticesData(kind, data, updatable, stride) {
    if (this.sourceMesh) {
      this.sourceMesh.setVerticesData(kind, data, updatable, stride);
    }
    return this.sourceMesh;
  }
  /**
   * Updates the existing vertex data of the mesh geometry for the requested `kind`.
   * If the mesh has no geometry, it is simply returned as it is.
   * The `data` are either a numeric array either a Float32Array.
   * No new underlying VertexBuffer object is created.
   * If the `kind` is the `PositionKind` and if `updateExtends` is true, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
   * If the parameter `makeItUnique` is true, a new global geometry is created from this positions and is set to the mesh.
   *
   * Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   *
   * Returns the Mesh.
   * @param kind defines vertex data kind
   * @param data defines the data source
   * @param updateExtends defines if extends info of the mesh must be updated (can be null). This is mostly useful for "position" kind
   * @param makeItUnique defines it the updated vertex buffer must be flagged as unique (false by default)
   * @returns the source mesh
   */
  updateVerticesData(kind, data, updateExtends, makeItUnique) {
    if (this.sourceMesh) {
      this.sourceMesh.updateVerticesData(kind, data, updateExtends, makeItUnique);
    }
    return this.sourceMesh;
  }
  /**
   * Sets the mesh indices.
   * Expects an array populated with integers or a typed array (Int32Array, Uint32Array, Uint16Array).
   * If the mesh has no geometry, a new Geometry object is created and set to the mesh.
   * This method creates a new index buffer each call.
   * Returns the Mesh.
   * @param indices the source data
   * @param totalVertices defines the total number of vertices referenced by indices (could be null)
   * @returns source mesh
   */
  setIndices(indices, totalVertices = null) {
    if (this.sourceMesh) {
      this.sourceMesh.setIndices(indices, totalVertices);
    }
    return this.sourceMesh;
  }
  /**
   * Boolean : True if the mesh owns the requested kind of data.
   * @param kind defines which buffer to check (positions, indices, normals, etc). Possible `kind` values :
   * - VertexBuffer.PositionKind
   * - VertexBuffer.UVKind
   * - VertexBuffer.UV2Kind
   * - VertexBuffer.UV3Kind
   * - VertexBuffer.UV4Kind
   * - VertexBuffer.UV5Kind
   * - VertexBuffer.UV6Kind
   * - VertexBuffer.ColorKind
   * - VertexBuffer.MatricesIndicesKind
   * - VertexBuffer.MatricesIndicesExtraKind
   * - VertexBuffer.MatricesWeightsKind
   * - VertexBuffer.MatricesWeightsExtraKind
   * @returns true if data kind is present
   */
  isVerticesDataPresent(kind) {
    return this._sourceMesh.isVerticesDataPresent(kind);
  }
  /**
   * @returns an array of indices (IndicesArray).
   */
  getIndices() {
    return this._sourceMesh.getIndices();
  }
  get _positions() {
    return this._sourceMesh._positions;
  }
  refreshBoundingInfo(applySkeletonOrOptions = false, applyMorph = false) {
    if (this.hasBoundingInfo && this.getBoundingInfo().isLocked) {
      return this;
    }
    let options;
    if (typeof applySkeletonOrOptions === "object") {
      options = applySkeletonOrOptions;
    } else {
      options = {
        applySkeleton: applySkeletonOrOptions,
        applyMorph
      };
    }
    const bias = this._sourceMesh.geometry ? this._sourceMesh.geometry.boundingBias : null;
    this._refreshBoundingInfo(this._sourceMesh._getData(options, null, VertexBuffer.PositionKind), bias);
    return this;
  }
  /** @internal */
  _preActivate() {
    if (this._currentLOD) {
      this._currentLOD._preActivate();
    }
    return this;
  }
  /**
   * @internal
   */
  _activate(renderId, intermediateRendering) {
    super._activate(renderId, intermediateRendering);
    if (!this._sourceMesh.subMeshes) {
      Logger.Warn("Instances should only be created for meshes with geometry.");
    }
    if (this._currentLOD) {
      const differentSign = this._currentLOD._getWorldMatrixDeterminant() >= 0 !== this._getWorldMatrixDeterminant() >= 0;
      if (differentSign) {
        this._internalAbstractMeshDataInfo._actAsRegularMesh = true;
        return true;
      }
      this._internalAbstractMeshDataInfo._actAsRegularMesh = false;
      this._currentLOD._registerInstanceForRenderId(this, renderId);
      if (intermediateRendering) {
        if (!this._currentLOD._internalAbstractMeshDataInfo._isActiveIntermediate) {
          this._currentLOD._internalAbstractMeshDataInfo._onlyForInstancesIntermediate = true;
          return true;
        }
      } else {
        if (!this._currentLOD._internalAbstractMeshDataInfo._isActive) {
          this._currentLOD._internalAbstractMeshDataInfo._onlyForInstances = true;
          return true;
        }
      }
    }
    return false;
  }
  /** @internal */
  _postActivate() {
    if (this._sourceMesh.edgesShareWithInstances && this._sourceMesh._edgesRenderer && this._sourceMesh._edgesRenderer.isEnabled && this._sourceMesh._renderingGroup) {
      this._sourceMesh._renderingGroup._edgesRenderers.pushNoDuplicate(this._sourceMesh._edgesRenderer);
      this._sourceMesh._edgesRenderer.customInstances.push(this.getWorldMatrix());
    } else if (this._edgesRenderer && this._edgesRenderer.isEnabled && this._sourceMesh._renderingGroup) {
      this._sourceMesh._renderingGroup._edgesRenderers.push(this._edgesRenderer);
    }
  }
  getWorldMatrix() {
    if (this._currentLOD && this._currentLOD.billboardMode !== TransformNode.BILLBOARDMODE_NONE && this._currentLOD._masterMesh !== this) {
      if (!this._billboardWorldMatrix) {
        this._billboardWorldMatrix = new Matrix();
      }
      const tempMaster = this._currentLOD._masterMesh;
      this._currentLOD._masterMesh = this;
      TmpVectors.Vector3[7].copyFrom(this._currentLOD.position);
      this._currentLOD.position.set(0, 0, 0);
      this._billboardWorldMatrix.copyFrom(this._currentLOD.computeWorldMatrix(true));
      this._currentLOD.position.copyFrom(TmpVectors.Vector3[7]);
      this._currentLOD._masterMesh = tempMaster;
      return this._billboardWorldMatrix;
    }
    return super.getWorldMatrix();
  }
  get isAnInstance() {
    return true;
  }
  /**
   * Returns the current associated LOD AbstractMesh.
   * @param camera defines the camera to use to pick the LOD level
   * @returns a Mesh or `null` if no LOD is associated with the AbstractMesh
   */
  getLOD(camera) {
    if (!camera) {
      return this;
    }
    const sourceMeshLODLevels = this.sourceMesh.getLODLevels();
    if (!sourceMeshLODLevels || sourceMeshLODLevels.length === 0) {
      this._currentLOD = this.sourceMesh;
    } else {
      const boundingInfo = this.getBoundingInfo();
      this._currentLOD = this.sourceMesh.getLOD(camera, boundingInfo.boundingSphere);
    }
    return this._currentLOD;
  }
  /**
   * @internal
   */
  _preActivateForIntermediateRendering(renderId) {
    return this.sourceMesh._preActivateForIntermediateRendering(renderId);
  }
  /** @internal */
  _syncSubMeshes() {
    this.releaseSubMeshes();
    if (this._sourceMesh.subMeshes) {
      for (let index = 0; index < this._sourceMesh.subMeshes.length; index++) {
        this._sourceMesh.subMeshes[index].clone(this, this._sourceMesh);
      }
    }
    return this;
  }
  /** @internal */
  _generatePointsArray() {
    return this._sourceMesh._generatePointsArray();
  }
  /** @internal */
  _updateBoundingInfo() {
    if (this.hasBoundingInfo) {
      this.getBoundingInfo().update(this.worldMatrixFromCache);
    } else {
      this.buildBoundingInfo(this.absolutePosition, this.absolutePosition, this.worldMatrixFromCache);
    }
    this._updateSubMeshesBoundingInfo(this.worldMatrixFromCache);
    return this;
  }
  /**
   * Creates a new InstancedMesh from the current mesh.
   *
   * Returns the clone.
   * @param name the cloned mesh name
   * @param newParent the optional Node to parent the clone to.
   * @param doNotCloneChildren if `true` the model children aren't cloned.
   * @param newSourceMesh if set this mesh will be used as the source mesh instead of ths instance's one
   * @returns the clone
   */
  clone(name, newParent = null, doNotCloneChildren, newSourceMesh) {
    const result = (newSourceMesh || this._sourceMesh).createInstance(name);
    DeepCopier.DeepCopy(this, result, [
      "name",
      "subMeshes",
      "uniqueId",
      "parent",
      "lightSources",
      "receiveShadows",
      "material",
      "visibility",
      "skeleton",
      "sourceMesh",
      "isAnInstance",
      "facetNb",
      "isFacetDataEnabled",
      "isBlocked",
      "useBones",
      "hasInstances",
      "collider",
      "edgesRenderer",
      "forward",
      "up",
      "right",
      "absolutePosition",
      "absoluteScaling",
      "absoluteRotationQuaternion",
      "isWorldMatrixFrozen",
      "nonUniformScaling",
      "behaviors",
      "worldMatrixFromCache",
      "hasThinInstances",
      "hasBoundingInfo"
    ], []);
    this.refreshBoundingInfo();
    if (newParent) {
      result.parent = newParent;
    }
    if (!doNotCloneChildren) {
      for (let index = 0; index < this.getScene().meshes.length; index++) {
        const mesh = this.getScene().meshes[index];
        if (mesh.parent === this) {
          mesh.clone(mesh.name, result);
        }
      }
    }
    result.computeWorldMatrix(true);
    this.onClonedObservable.notifyObservers(result);
    return result;
  }
  /**
   * Disposes the InstancedMesh.
   * Returns nothing.
   * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
   * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
   */
  dispose(doNotRecurse, disposeMaterialAndTextures = false) {
    this._sourceMesh.removeInstance(this);
    super.dispose(doNotRecurse, disposeMaterialAndTextures);
  }
  /**
   * @internal
   */
  _serializeAsParent(serializationObject) {
    super._serializeAsParent(serializationObject);
    serializationObject.parentId = this._sourceMesh.uniqueId;
    serializationObject.parentInstanceIndex = this._indexInSourceMeshInstanceArray;
  }
  /**
   * Instantiate (when possible) or clone that node with its hierarchy
   * @param newParent defines the new parent to use for the instance (or clone)
   * @param options defines options to configure how copy is done
   * @param options.doNotInstantiate defines if the model must be instantiated or just cloned
   * @param options.newSourcedMesh newSourcedMesh the new source mesh for the instance (or clone)
   * @param onNewNodeCreated defines an option callback to call when a clone or an instance is created
   * @returns an instance (or a clone) of the current node with its hierarchy
   */
  instantiateHierarchy(newParent = null, options, onNewNodeCreated) {
    const clone = this.clone("Clone of " + (this.name || this.id), newParent || this.parent, true, options && options.newSourcedMesh);
    if (clone) {
      if (onNewNodeCreated) {
        onNewNodeCreated(this, clone);
      }
    }
    for (const child of this.getChildTransformNodes(true)) {
      child.instantiateHierarchy(clone, options, onNewNodeCreated);
    }
    return clone;
  }
};
Mesh.prototype.registerInstancedBuffer = function(kind, stride) {
  var _a, _b;
  (_b = (_a = this._userInstancedBuffersStorage) == null ? void 0 : _a.vertexBuffers[kind]) == null ? void 0 : _b.dispose();
  if (!this.instancedBuffers) {
    this.instancedBuffers = {};
    for (const instance of this.instances) {
      instance.instancedBuffers = {};
    }
  }
  if (!this._userInstancedBuffersStorage) {
    this._userInstancedBuffersStorage = {
      data: {},
      vertexBuffers: {},
      strides: {},
      sizes: {},
      vertexArrayObjects: this.getEngine().getCaps().vertexArrayObject ? {} : void 0
    };
  }
  this.instancedBuffers[kind] = null;
  this._userInstancedBuffersStorage.strides[kind] = stride;
  this._userInstancedBuffersStorage.sizes[kind] = stride * 32;
  this._userInstancedBuffersStorage.data[kind] = new Float32Array(this._userInstancedBuffersStorage.sizes[kind]);
  this._userInstancedBuffersStorage.vertexBuffers[kind] = new VertexBuffer(this.getEngine(), this._userInstancedBuffersStorage.data[kind], kind, true, false, stride, true);
  for (const instance of this.instances) {
    instance.instancedBuffers[kind] = null;
  }
  this._invalidateInstanceVertexArrayObject();
  this._markSubMeshesAsAttributesDirty();
};
Mesh.prototype._processInstancedBuffers = function(visibleInstances, renderSelf) {
  const instanceCount = visibleInstances ? visibleInstances.length : 0;
  for (const kind in this.instancedBuffers) {
    let size = this._userInstancedBuffersStorage.sizes[kind];
    const stride = this._userInstancedBuffersStorage.strides[kind];
    const expectedSize = (instanceCount + 1) * stride;
    while (size < expectedSize) {
      size *= 2;
    }
    if (this._userInstancedBuffersStorage.data[kind].length != size) {
      this._userInstancedBuffersStorage.data[kind] = new Float32Array(size);
      this._userInstancedBuffersStorage.sizes[kind] = size;
      if (this._userInstancedBuffersStorage.vertexBuffers[kind]) {
        this._userInstancedBuffersStorage.vertexBuffers[kind].dispose();
        this._userInstancedBuffersStorage.vertexBuffers[kind] = null;
      }
    }
    const data = this._userInstancedBuffersStorage.data[kind];
    let offset = 0;
    if (renderSelf) {
      const value = this.instancedBuffers[kind];
      if (value.toArray) {
        value.toArray(data, offset);
      } else if (value.copyToArray) {
        value.copyToArray(data, offset);
      } else {
        data[offset] = value;
      }
      offset += stride;
    }
    for (let instanceIndex = 0; instanceIndex < instanceCount; instanceIndex++) {
      const instance = visibleInstances[instanceIndex];
      const value = instance.instancedBuffers[kind];
      if (value.toArray) {
        value.toArray(data, offset);
      } else if (value.copyToArray) {
        value.copyToArray(data, offset);
      } else {
        data[offset] = value;
      }
      offset += stride;
    }
    if (!this._userInstancedBuffersStorage.vertexBuffers[kind]) {
      this._userInstancedBuffersStorage.vertexBuffers[kind] = new VertexBuffer(this.getEngine(), this._userInstancedBuffersStorage.data[kind], kind, true, false, stride, true);
      this._invalidateInstanceVertexArrayObject();
    } else {
      this._userInstancedBuffersStorage.vertexBuffers[kind].updateDirectly(data, 0);
    }
  }
};
Mesh.prototype._invalidateInstanceVertexArrayObject = function() {
  if (!this._userInstancedBuffersStorage || this._userInstancedBuffersStorage.vertexArrayObjects === void 0) {
    return;
  }
  for (const kind in this._userInstancedBuffersStorage.vertexArrayObjects) {
    this.getEngine().releaseVertexArrayObject(this._userInstancedBuffersStorage.vertexArrayObjects[kind]);
  }
  this._userInstancedBuffersStorage.vertexArrayObjects = {};
};
Mesh.prototype._disposeInstanceSpecificData = function() {
  if (this._instanceDataStorage.instancesBuffer) {
    this._instanceDataStorage.instancesBuffer.dispose();
    this._instanceDataStorage.instancesBuffer = null;
  }
  while (this.instances.length) {
    this.instances[0].dispose();
  }
  for (const kind in this.instancedBuffers) {
    if (this._userInstancedBuffersStorage.vertexBuffers[kind]) {
      this._userInstancedBuffersStorage.vertexBuffers[kind].dispose();
    }
  }
  this._invalidateInstanceVertexArrayObject();
  this.instancedBuffers = {};
};
RegisterClass("BABYLON.InstancedMesh", InstancedMesh);

// node_modules/@babylonjs/core/Materials/shaderMaterial.js
var onCreatedEffectParameters = { effect: null, subMesh: null };
var ShaderMaterial = class _ShaderMaterial extends PushMaterial {
  /**
   * Instantiate a new shader material.
   * The ShaderMaterial object has the necessary methods to pass data from your scene to the Vertex and Fragment Shaders and returns a material that can be applied to any mesh.
   * This returned material effects how the mesh will look based on the code in the shaders.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/shaders/shaderMaterial
   * @param name Define the name of the material in the scene
   * @param scene Define the scene the material belongs to
   * @param shaderPath Defines  the route to the shader code.
   * @param options Define the options used to create the shader
   * @param storeEffectOnSubMeshes true to store effect on submeshes, false to store the effect directly in the material class.
   */
  constructor(name, scene, shaderPath, options = {}, storeEffectOnSubMeshes = true) {
    super(name, scene, storeEffectOnSubMeshes);
    this._textures = {};
    this._textureArrays = {};
    this._externalTextures = {};
    this._floats = {};
    this._ints = {};
    this._uints = {};
    this._floatsArrays = {};
    this._colors3 = {};
    this._colors3Arrays = {};
    this._colors4 = {};
    this._colors4Arrays = {};
    this._vectors2 = {};
    this._vectors3 = {};
    this._vectors4 = {};
    this._quaternions = {};
    this._quaternionsArrays = {};
    this._matrices = {};
    this._matrixArrays = {};
    this._matrices3x3 = {};
    this._matrices2x2 = {};
    this._vectors2Arrays = {};
    this._vectors3Arrays = {};
    this._vectors4Arrays = {};
    this._uniformBuffers = {};
    this._textureSamplers = {};
    this._storageBuffers = {};
    this._cachedWorldViewMatrix = new Matrix();
    this._cachedWorldViewProjectionMatrix = new Matrix();
    this._multiview = false;
    this._materialHelperNeedsPreviousMatrices = false;
    this._shaderPath = shaderPath;
    this._options = {
      needAlphaBlending: false,
      needAlphaTesting: false,
      attributes: ["position", "normal", "uv"],
      uniforms: ["worldViewProjection"],
      uniformBuffers: [],
      samplers: [],
      externalTextures: [],
      samplerObjects: [],
      storageBuffers: [],
      defines: [],
      useClipPlane: false,
      ...options
    };
  }
  /**
   * Gets the shader path used to define the shader code
   * It can be modified to trigger a new compilation
   */
  get shaderPath() {
    return this._shaderPath;
  }
  /**
   * Sets the shader path used to define the shader code
   * It can be modified to trigger a new compilation
   */
  set shaderPath(shaderPath) {
    this._shaderPath = shaderPath;
  }
  /**
   * Gets the options used to compile the shader.
   * They can be modified to trigger a new compilation
   */
  get options() {
    return this._options;
  }
  /**
   * is multiview set to true?
   */
  get isMultiview() {
    return this._multiview;
  }
  /**
   * Gets the current class name of the material e.g. "ShaderMaterial"
   * Mainly use in serialization.
   * @returns the class name
   */
  getClassName() {
    return "ShaderMaterial";
  }
  /**
   * Specifies if the material will require alpha blending
   * @returns a boolean specifying if alpha blending is needed
   */
  needAlphaBlending() {
    return this.alpha < 1 || this._options.needAlphaBlending;
  }
  /**
   * Specifies if this material should be rendered in alpha test mode
   * @returns a boolean specifying if an alpha test is needed.
   */
  needAlphaTesting() {
    return this._options.needAlphaTesting;
  }
  _checkUniform(uniformName) {
    if (this._options.uniforms.indexOf(uniformName) === -1) {
      this._options.uniforms.push(uniformName);
    }
  }
  /**
   * Set a texture in the shader.
   * @param name Define the name of the uniform samplers as defined in the shader
   * @param texture Define the texture to bind to this sampler
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setTexture(name, texture) {
    if (this._options.samplers.indexOf(name) === -1) {
      this._options.samplers.push(name);
    }
    this._textures[name] = texture;
    return this;
  }
  /**
   * Remove a texture from the material.
   * @param name Define the name of the texture to remove
   */
  removeTexture(name) {
    delete this._textures[name];
  }
  /**
   * Set a texture array in the shader.
   * @param name Define the name of the uniform sampler array as defined in the shader
   * @param textures Define the list of textures to bind to this sampler
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setTextureArray(name, textures) {
    if (this._options.samplers.indexOf(name) === -1) {
      this._options.samplers.push(name);
    }
    this._checkUniform(name);
    this._textureArrays[name] = textures;
    return this;
  }
  /**
   * Set an internal texture in the shader.
   * @param name Define the name of the uniform samplers as defined in the shader
   * @param texture Define the texture to bind to this sampler
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setExternalTexture(name, texture) {
    if (this._options.externalTextures.indexOf(name) === -1) {
      this._options.externalTextures.push(name);
    }
    this._externalTextures[name] = texture;
    return this;
  }
  /**
   * Set a float in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setFloat(name, value) {
    this._checkUniform(name);
    this._floats[name] = value;
    return this;
  }
  /**
   * Set a int in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setInt(name, value) {
    this._checkUniform(name);
    this._ints[name] = value;
    return this;
  }
  /**
   * Set a unsigned int in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setUInt(name, value) {
    this._checkUniform(name);
    this._uints[name] = value;
    return this;
  }
  /**
   * Set an array of floats in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setFloats(name, value) {
    this._checkUniform(name);
    this._floatsArrays[name] = value;
    return this;
  }
  /**
   * Set a vec3 in the shader from a Color3.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setColor3(name, value) {
    this._checkUniform(name);
    this._colors3[name] = value;
    return this;
  }
  /**
   * Set a vec3 array in the shader from a Color3 array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setColor3Array(name, value) {
    this._checkUniform(name);
    this._colors3Arrays[name] = value.reduce((arr, color) => {
      color.toArray(arr, arr.length);
      return arr;
    }, []);
    return this;
  }
  /**
   * Set a vec4 in the shader from a Color4.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setColor4(name, value) {
    this._checkUniform(name);
    this._colors4[name] = value;
    return this;
  }
  /**
   * Set a vec4 array in the shader from a Color4 array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setColor4Array(name, value) {
    this._checkUniform(name);
    this._colors4Arrays[name] = value.reduce((arr, color) => {
      color.toArray(arr, arr.length);
      return arr;
    }, []);
    return this;
  }
  /**
   * Set a vec2 in the shader from a Vector2.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setVector2(name, value) {
    this._checkUniform(name);
    this._vectors2[name] = value;
    return this;
  }
  /**
   * Set a vec3 in the shader from a Vector3.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setVector3(name, value) {
    this._checkUniform(name);
    this._vectors3[name] = value;
    return this;
  }
  /**
   * Set a vec4 in the shader from a Vector4.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setVector4(name, value) {
    this._checkUniform(name);
    this._vectors4[name] = value;
    return this;
  }
  /**
   * Set a vec4 in the shader from a Quaternion.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setQuaternion(name, value) {
    this._checkUniform(name);
    this._quaternions[name] = value;
    return this;
  }
  /**
   * Set a vec4 array in the shader from a Quaternion array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setQuaternionArray(name, value) {
    this._checkUniform(name);
    this._quaternionsArrays[name] = value.reduce((arr, quaternion) => {
      quaternion.toArray(arr, arr.length);
      return arr;
    }, []);
    return this;
  }
  /**
   * Set a mat4 in the shader from a Matrix.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setMatrix(name, value) {
    this._checkUniform(name);
    this._matrices[name] = value;
    return this;
  }
  /**
   * Set a float32Array in the shader from a matrix array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setMatrices(name, value) {
    this._checkUniform(name);
    const float32Array = new Float32Array(value.length * 16);
    for (let index = 0; index < value.length; index++) {
      const matrix = value[index];
      matrix.copyToArray(float32Array, index * 16);
    }
    this._matrixArrays[name] = float32Array;
    return this;
  }
  /**
   * Set a mat3 in the shader from a Float32Array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setMatrix3x3(name, value) {
    this._checkUniform(name);
    this._matrices3x3[name] = value;
    return this;
  }
  /**
   * Set a mat2 in the shader from a Float32Array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setMatrix2x2(name, value) {
    this._checkUniform(name);
    this._matrices2x2[name] = value;
    return this;
  }
  /**
   * Set a vec2 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setArray2(name, value) {
    this._checkUniform(name);
    this._vectors2Arrays[name] = value;
    return this;
  }
  /**
   * Set a vec3 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setArray3(name, value) {
    this._checkUniform(name);
    this._vectors3Arrays[name] = value;
    return this;
  }
  /**
   * Set a vec4 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setArray4(name, value) {
    this._checkUniform(name);
    this._vectors4Arrays[name] = value;
    return this;
  }
  /**
   * Set a uniform buffer in the shader
   * @param name Define the name of the uniform as defined in the shader
   * @param buffer Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setUniformBuffer(name, buffer) {
    if (this._options.uniformBuffers.indexOf(name) === -1) {
      this._options.uniformBuffers.push(name);
    }
    this._uniformBuffers[name] = buffer;
    return this;
  }
  /**
   * Set a texture sampler in the shader
   * @param name Define the name of the uniform as defined in the shader
   * @param sampler Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setTextureSampler(name, sampler) {
    if (this._options.samplerObjects.indexOf(name) === -1) {
      this._options.samplerObjects.push(name);
    }
    this._textureSamplers[name] = sampler;
    return this;
  }
  /**
   * Set a storage buffer in the shader
   * @param name Define the name of the storage buffer as defined in the shader
   * @param buffer Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setStorageBuffer(name, buffer) {
    if (this._options.storageBuffers.indexOf(name) === -1) {
      this._options.storageBuffers.push(name);
    }
    this._storageBuffers[name] = buffer;
    return this;
  }
  /**
   * Adds, removes, or replaces the specified shader define and value.
   * * setDefine("MY_DEFINE", true); // enables a boolean define
   * * setDefine("MY_DEFINE", "0.5"); // adds "#define MY_DEFINE 0.5" to the shader (or sets and replaces the value of any existing define with that name)
   * * setDefine("MY_DEFINE", false); // disables and removes the define
   * Note if the active defines do change, the shader will be recompiled and this can be expensive.
   * @param define the define name e.g., "OUTPUT_TO_SRGB" or "#define OUTPUT_TO_SRGB". If the define was passed into the constructor already, the version used should match that, and in either case, it should not include any appended value.
   * @param value either the value of the define (e.g. a numerical value) or for booleans, true if the define should be enabled or false if it should be disabled
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setDefine(define, value) {
    const defineName = define.trimEnd() + " ";
    const existingDefineIdx = this.options.defines.findIndex((x) => x === define || x.startsWith(defineName));
    if (existingDefineIdx >= 0) {
      this.options.defines.splice(existingDefineIdx, 1);
    }
    if (typeof value !== "boolean" || value) {
      this.options.defines.push(defineName + value);
    }
    return this;
  }
  /**
   * Specifies that the submesh is ready to be used
   * @param mesh defines the mesh to check
   * @param subMesh defines which submesh to check
   * @param useInstances specifies that instances should be used
   * @returns a boolean indicating that the submesh is ready or not
   */
  isReadyForSubMesh(mesh, subMesh, useInstances) {
    return this.isReady(mesh, useInstances, subMesh);
  }
  /**
   * Checks if the material is ready to render the requested mesh
   * @param mesh Define the mesh to render
   * @param useInstances Define whether or not the material is used with instances
   * @param subMesh defines which submesh to render
   * @returns true if ready, otherwise false
   */
  isReady(mesh, useInstances, subMesh) {
    const storeEffectOnSubMeshes = subMesh && this._storeEffectOnSubMeshes;
    if (this.isFrozen) {
      const drawWrapper2 = storeEffectOnSubMeshes ? subMesh._drawWrapper : this._drawWrapper;
      if (drawWrapper2.effect && drawWrapper2._wasPreviouslyReady && drawWrapper2._wasPreviouslyUsingInstances === useInstances) {
        return true;
      }
    }
    const scene = this.getScene();
    const engine = scene.getEngine();
    const defines = [];
    const attribs = [];
    let fallbacks = null;
    let shaderName = this._shaderPath, uniforms = this._options.uniforms, uniformBuffers = this._options.uniformBuffers, samplers = this._options.samplers;
    if (engine.getCaps().multiview && scene.activeCamera && scene.activeCamera.outputRenderTarget && scene.activeCamera.outputRenderTarget.getViewCount() > 1) {
      this._multiview = true;
      defines.push("#define MULTIVIEW");
      if (uniforms.indexOf("viewProjection") !== -1 && uniforms.indexOf("viewProjectionR") === -1) {
        uniforms.push("viewProjectionR");
      }
    }
    for (let index = 0; index < this._options.defines.length; index++) {
      const defineToAdd = this._options.defines[index].indexOf("#define") === 0 ? this._options.defines[index] : `#define ${this._options.defines[index]}`;
      defines.push(defineToAdd);
    }
    for (let index = 0; index < this._options.attributes.length; index++) {
      attribs.push(this._options.attributes[index]);
    }
    if (mesh && mesh.isVerticesDataPresent(VertexBuffer.ColorKind)) {
      if (attribs.indexOf(VertexBuffer.ColorKind) === -1) {
        attribs.push(VertexBuffer.ColorKind);
      }
      defines.push("#define VERTEXCOLOR");
    }
    if (useInstances) {
      defines.push("#define INSTANCES");
      PushAttributesForInstances(attribs, this._materialHelperNeedsPreviousMatrices);
      if (mesh == null ? void 0 : mesh.hasThinInstances) {
        defines.push("#define THIN_INSTANCES");
        if (mesh && mesh.isVerticesDataPresent(VertexBuffer.ColorInstanceKind)) {
          attribs.push(VertexBuffer.ColorInstanceKind);
          defines.push("#define INSTANCESCOLOR");
        }
      }
    }
    if (mesh && mesh.useBones && mesh.computeBonesUsingShaders && mesh.skeleton) {
      attribs.push(VertexBuffer.MatricesIndicesKind);
      attribs.push(VertexBuffer.MatricesWeightsKind);
      if (mesh.numBoneInfluencers > 4) {
        attribs.push(VertexBuffer.MatricesIndicesExtraKind);
        attribs.push(VertexBuffer.MatricesWeightsExtraKind);
      }
      const skeleton = mesh.skeleton;
      defines.push("#define NUM_BONE_INFLUENCERS " + mesh.numBoneInfluencers);
      fallbacks = new EffectFallbacks();
      fallbacks.addCPUSkinningFallback(0, mesh);
      if (skeleton.isUsingTextureForMatrices) {
        defines.push("#define BONETEXTURE");
        if (uniforms.indexOf("boneTextureWidth") === -1) {
          uniforms.push("boneTextureWidth");
        }
        if (this._options.samplers.indexOf("boneSampler") === -1) {
          this._options.samplers.push("boneSampler");
        }
      } else {
        defines.push("#define BonesPerMesh " + (skeleton.bones.length + 1));
        if (uniforms.indexOf("mBones") === -1) {
          uniforms.push("mBones");
        }
      }
    } else {
      defines.push("#define NUM_BONE_INFLUENCERS 0");
    }
    let numInfluencers = 0;
    const manager = mesh ? mesh.morphTargetManager : null;
    if (manager) {
      const uv = defines.indexOf("#define UV1") !== -1;
      const uv2 = defines.indexOf("#define UV2") !== -1;
      const tangent = defines.indexOf("#define TANGENT") !== -1;
      const normal = defines.indexOf("#define NORMAL") !== -1;
      const color = defines.indexOf("#define VERTEXCOLOR") !== -1;
      numInfluencers = PrepareDefinesAndAttributesForMorphTargets(
        manager,
        defines,
        attribs,
        mesh,
        true,
        // usePositionMorph
        normal,
        // useNormalMorph
        tangent,
        // useTangentMorph
        uv,
        // useUVMorph
        uv2,
        // useUV2Morph
        color
        // useColorMorph
      );
      if (manager.isUsingTextureForTargets) {
        if (uniforms.indexOf("morphTargetTextureIndices") === -1) {
          uniforms.push("morphTargetTextureIndices");
        }
        if (this._options.samplers.indexOf("morphTargets") === -1) {
          this._options.samplers.push("morphTargets");
        }
      }
      if (numInfluencers > 0) {
        uniforms = uniforms.slice();
        uniforms.push("morphTargetInfluences");
        uniforms.push("morphTargetCount");
        uniforms.push("morphTargetTextureInfo");
        uniforms.push("morphTargetTextureIndices");
      }
    } else {
      defines.push("#define NUM_MORPH_INFLUENCERS 0");
    }
    if (mesh) {
      const bvaManager = mesh.bakedVertexAnimationManager;
      if (bvaManager && bvaManager.isEnabled) {
        defines.push("#define BAKED_VERTEX_ANIMATION_TEXTURE");
        if (uniforms.indexOf("bakedVertexAnimationSettings") === -1) {
          uniforms.push("bakedVertexAnimationSettings");
        }
        if (uniforms.indexOf("bakedVertexAnimationTextureSizeInverted") === -1) {
          uniforms.push("bakedVertexAnimationTextureSizeInverted");
        }
        if (uniforms.indexOf("bakedVertexAnimationTime") === -1) {
          uniforms.push("bakedVertexAnimationTime");
        }
        if (this._options.samplers.indexOf("bakedVertexAnimationTexture") === -1) {
          this._options.samplers.push("bakedVertexAnimationTexture");
        }
      }
      PrepareAttributesForBakedVertexAnimation(attribs, mesh, defines);
    }
    for (const name in this._textures) {
      if (!this._textures[name].isReady()) {
        return false;
      }
    }
    if (mesh && this.needAlphaTestingForMesh(mesh)) {
      defines.push("#define ALPHATEST");
    }
    if (this._options.useClipPlane !== false) {
      addClipPlaneUniforms(uniforms);
      prepareStringDefinesForClipPlanes(this, scene, defines);
    }
    if (scene.fogEnabled && (mesh == null ? void 0 : mesh.applyFog) && scene.fogMode !== Scene.FOGMODE_NONE) {
      defines.push("#define FOG");
      if (uniforms.indexOf("view") === -1) {
        uniforms.push("view");
      }
      if (uniforms.indexOf("vFogInfos") === -1) {
        uniforms.push("vFogInfos");
      }
      if (uniforms.indexOf("vFogColor") === -1) {
        uniforms.push("vFogColor");
      }
    }
    if (this._useLogarithmicDepth) {
      defines.push("#define LOGARITHMICDEPTH");
      if (uniforms.indexOf("logarithmicDepthConstant") === -1) {
        uniforms.push("logarithmicDepthConstant");
      }
    }
    if (this.customShaderNameResolve) {
      uniforms = uniforms.slice();
      uniformBuffers = uniformBuffers.slice();
      samplers = samplers.slice();
      shaderName = this.customShaderNameResolve(this.name, uniforms, uniformBuffers, samplers, defines, attribs);
    }
    const drawWrapper = storeEffectOnSubMeshes ? subMesh._getDrawWrapper(void 0, true) : this._drawWrapper;
    const previousEffect = (drawWrapper == null ? void 0 : drawWrapper.effect) ?? null;
    const previousDefines = (drawWrapper == null ? void 0 : drawWrapper.defines) ?? null;
    const join = defines.join("\n");
    let effect = previousEffect;
    if (previousDefines !== join) {
      effect = engine.createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousMorphTargets: numInfluencers },
        shaderLanguage: this._options.shaderLanguage,
        extraInitializationsAsync: this._options.extraInitializationsAsync
      }, engine);
      if (storeEffectOnSubMeshes) {
        subMesh.setEffect(effect, join, this._materialContext);
      } else if (drawWrapper) {
        drawWrapper.setEffect(effect, join);
      }
      if (this._onEffectCreatedObservable) {
        onCreatedEffectParameters.effect = effect;
        onCreatedEffectParameters.subMesh = subMesh ?? (mesh == null ? void 0 : mesh.subMeshes[0]) ?? null;
        this._onEffectCreatedObservable.notifyObservers(onCreatedEffectParameters);
      }
    }
    drawWrapper._wasPreviouslyUsingInstances = !!useInstances;
    if (!(effect == null ? void 0 : effect.isReady())) {
      return false;
    }
    if (previousEffect !== effect) {
      scene.resetCachedMaterial();
    }
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  /**
   * Binds the world matrix to the material
   * @param world defines the world transformation matrix
   * @param effectOverride - If provided, use this effect instead of internal effect
   */
  bindOnlyWorldMatrix(world, effectOverride) {
    const effect = effectOverride ?? this.getEffect();
    if (!effect) {
      return;
    }
    const uniforms = this._options.uniforms;
    if (uniforms.indexOf("world") !== -1) {
      effect.setMatrix("world", world);
    }
    const scene = this.getScene();
    if (uniforms.indexOf("worldView") !== -1) {
      world.multiplyToRef(scene.getViewMatrix(), this._cachedWorldViewMatrix);
      effect.setMatrix("worldView", this._cachedWorldViewMatrix);
    }
    if (uniforms.indexOf("worldViewProjection") !== -1) {
      world.multiplyToRef(scene.getTransformMatrix(), this._cachedWorldViewProjectionMatrix);
      effect.setMatrix("worldViewProjection", this._cachedWorldViewProjectionMatrix);
    }
    if (uniforms.indexOf("view") !== -1) {
      effect.setMatrix("view", scene.getViewMatrix());
    }
  }
  /**
   * Binds the submesh to this material by preparing the effect and shader to draw
   * @param world defines the world transformation matrix
   * @param mesh defines the mesh containing the submesh
   * @param subMesh defines the submesh to bind the material to
   */
  bindForSubMesh(world, mesh, subMesh) {
    var _a;
    this.bind(world, mesh, (_a = subMesh._drawWrapperOverride) == null ? void 0 : _a.effect, subMesh);
  }
  /**
   * Binds the material to the mesh
   * @param world defines the world transformation matrix
   * @param mesh defines the mesh to bind the material to
   * @param effectOverride - If provided, use this effect instead of internal effect
   * @param subMesh defines the submesh to bind the material to
   */
  bind(world, mesh, effectOverride, subMesh) {
    var _a;
    const storeEffectOnSubMeshes = subMesh && this._storeEffectOnSubMeshes;
    const effect = effectOverride ?? (storeEffectOnSubMeshes ? subMesh.effect : this.getEffect());
    if (!effect) {
      return;
    }
    const scene = this.getScene();
    this._activeEffect = effect;
    this.bindOnlyWorldMatrix(world, effectOverride);
    const uniformBuffers = this._options.uniformBuffers;
    let useSceneUBO = false;
    if (effect && uniformBuffers && uniformBuffers.length > 0 && scene.getEngine().supportsUniformBuffers) {
      for (let i = 0; i < uniformBuffers.length; ++i) {
        const bufferName = uniformBuffers[i];
        switch (bufferName) {
          case "Mesh":
            if (mesh) {
              mesh.getMeshUniformBuffer().bindToEffect(effect, "Mesh");
              mesh.transferToEffect(world);
            }
            break;
          case "Scene":
            BindSceneUniformBuffer(effect, scene.getSceneUniformBuffer());
            scene.finalizeSceneUbo();
            useSceneUBO = true;
            break;
        }
      }
    }
    const mustRebind = mesh && storeEffectOnSubMeshes ? this._mustRebind(scene, effect, subMesh, mesh.visibility) : scene.getCachedMaterial() !== this;
    if (effect && mustRebind) {
      if (!useSceneUBO && this._options.uniforms.indexOf("view") !== -1) {
        effect.setMatrix("view", scene.getViewMatrix());
      }
      if (!useSceneUBO && this._options.uniforms.indexOf("projection") !== -1) {
        effect.setMatrix("projection", scene.getProjectionMatrix());
      }
      if (!useSceneUBO && this._options.uniforms.indexOf("viewProjection") !== -1) {
        effect.setMatrix("viewProjection", scene.getTransformMatrix());
        if (this._multiview) {
          effect.setMatrix("viewProjectionR", scene._transformMatrixR);
        }
      }
      if (scene.activeCamera && this._options.uniforms.indexOf("cameraPosition") !== -1) {
        effect.setVector3("cameraPosition", scene.activeCamera.globalPosition);
      }
      BindBonesParameters(mesh, effect);
      bindClipPlane(effect, this, scene);
      if (this._useLogarithmicDepth) {
        BindLogDepth(storeEffectOnSubMeshes ? subMesh.materialDefines : effect.defines, effect, scene);
      }
      if (mesh) {
        BindFogParameters(scene, mesh, effect);
      }
      let name;
      for (name in this._textures) {
        effect.setTexture(name, this._textures[name]);
      }
      for (name in this._textureArrays) {
        effect.setTextureArray(name, this._textureArrays[name]);
      }
      for (name in this._ints) {
        effect.setInt(name, this._ints[name]);
      }
      for (name in this._uints) {
        effect.setUInt(name, this._uints[name]);
      }
      for (name in this._floats) {
        effect.setFloat(name, this._floats[name]);
      }
      for (name in this._floatsArrays) {
        effect.setArray(name, this._floatsArrays[name]);
      }
      for (name in this._colors3) {
        effect.setColor3(name, this._colors3[name]);
      }
      for (name in this._colors3Arrays) {
        effect.setArray3(name, this._colors3Arrays[name]);
      }
      for (name in this._colors4) {
        const color = this._colors4[name];
        effect.setFloat4(name, color.r, color.g, color.b, color.a);
      }
      for (name in this._colors4Arrays) {
        effect.setArray4(name, this._colors4Arrays[name]);
      }
      for (name in this._vectors2) {
        effect.setVector2(name, this._vectors2[name]);
      }
      for (name in this._vectors3) {
        effect.setVector3(name, this._vectors3[name]);
      }
      for (name in this._vectors4) {
        effect.setVector4(name, this._vectors4[name]);
      }
      for (name in this._quaternions) {
        effect.setQuaternion(name, this._quaternions[name]);
      }
      for (name in this._matrices) {
        effect.setMatrix(name, this._matrices[name]);
      }
      for (name in this._matrixArrays) {
        effect.setMatrices(name, this._matrixArrays[name]);
      }
      for (name in this._matrices3x3) {
        effect.setMatrix3x3(name, this._matrices3x3[name]);
      }
      for (name in this._matrices2x2) {
        effect.setMatrix2x2(name, this._matrices2x2[name]);
      }
      for (name in this._vectors2Arrays) {
        effect.setArray2(name, this._vectors2Arrays[name]);
      }
      for (name in this._vectors3Arrays) {
        effect.setArray3(name, this._vectors3Arrays[name]);
      }
      for (name in this._vectors4Arrays) {
        effect.setArray4(name, this._vectors4Arrays[name]);
      }
      for (name in this._quaternionsArrays) {
        effect.setArray4(name, this._quaternionsArrays[name]);
      }
      for (name in this._uniformBuffers) {
        const buffer = this._uniformBuffers[name].getBuffer();
        if (buffer) {
          effect.bindUniformBuffer(buffer, name);
        }
      }
      const engineWebGPU = scene.getEngine();
      const setExternalTexture = engineWebGPU.setExternalTexture;
      if (setExternalTexture) {
        for (name in this._externalTextures) {
          setExternalTexture.call(engineWebGPU, name, this._externalTextures[name]);
        }
      }
      const setTextureSampler = engineWebGPU.setTextureSampler;
      if (setTextureSampler) {
        for (name in this._textureSamplers) {
          setTextureSampler.call(engineWebGPU, name, this._textureSamplers[name]);
        }
      }
      const setStorageBuffer = engineWebGPU.setStorageBuffer;
      if (setStorageBuffer) {
        for (name in this._storageBuffers) {
          setStorageBuffer.call(engineWebGPU, name, this._storageBuffers[name]);
        }
      }
    }
    if (effect && mesh && (mustRebind || !this.isFrozen)) {
      BindMorphTargetParameters(mesh, effect);
      if (mesh.morphTargetManager && mesh.morphTargetManager.isUsingTextureForTargets) {
        mesh.morphTargetManager._bind(effect);
      }
      const bvaManager = mesh.bakedVertexAnimationManager;
      if (bvaManager && bvaManager.isEnabled) {
        const drawWrapper = storeEffectOnSubMeshes ? subMesh._drawWrapper : this._drawWrapper;
        (_a = mesh.bakedVertexAnimationManager) == null ? void 0 : _a.bind(effect, !!drawWrapper._wasPreviouslyUsingInstances);
      }
    }
    this._afterBind(mesh, effect, subMesh);
  }
  /**
   * Gets the active textures from the material
   * @returns an array of textures
   */
  getActiveTextures() {
    const activeTextures = super.getActiveTextures();
    for (const name in this._textures) {
      activeTextures.push(this._textures[name]);
    }
    for (const name in this._textureArrays) {
      const array = this._textureArrays[name];
      for (let index = 0; index < array.length; index++) {
        activeTextures.push(array[index]);
      }
    }
    return activeTextures;
  }
  /**
   * Specifies if the material uses a texture
   * @param texture defines the texture to check against the material
   * @returns a boolean specifying if the material uses the texture
   */
  hasTexture(texture) {
    if (super.hasTexture(texture)) {
      return true;
    }
    for (const name in this._textures) {
      if (this._textures[name] === texture) {
        return true;
      }
    }
    for (const name in this._textureArrays) {
      const array = this._textureArrays[name];
      for (let index = 0; index < array.length; index++) {
        if (array[index] === texture) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Makes a duplicate of the material, and gives it a new name
   * @param name defines the new name for the duplicated material
   * @returns the cloned material
   */
  clone(name) {
    const result = SerializationHelper.Clone(() => new _ShaderMaterial(name, this.getScene(), this._shaderPath, this._options, this._storeEffectOnSubMeshes), this);
    result.name = name;
    result.id = name;
    if (typeof result._shaderPath === "object") {
      result._shaderPath = { ...result._shaderPath };
    }
    this._options = { ...this._options };
    Object.keys(this._options).forEach((propName) => {
      const propValue = this._options[propName];
      if (Array.isArray(propValue)) {
        this._options[propName] = propValue.slice(0);
      }
    });
    this.stencil.copyTo(result.stencil);
    for (const key in this._textures) {
      result.setTexture(key, this._textures[key]);
    }
    for (const key in this._textureArrays) {
      result.setTextureArray(key, this._textureArrays[key]);
    }
    for (const key in this._externalTextures) {
      result.setExternalTexture(key, this._externalTextures[key]);
    }
    for (const key in this._ints) {
      result.setInt(key, this._ints[key]);
    }
    for (const key in this._uints) {
      result.setUInt(key, this._uints[key]);
    }
    for (const key in this._floats) {
      result.setFloat(key, this._floats[key]);
    }
    for (const key in this._floatsArrays) {
      result.setFloats(key, this._floatsArrays[key]);
    }
    for (const key in this._colors3) {
      result.setColor3(key, this._colors3[key]);
    }
    for (const key in this._colors3Arrays) {
      result._colors3Arrays[key] = this._colors3Arrays[key];
    }
    for (const key in this._colors4) {
      result.setColor4(key, this._colors4[key]);
    }
    for (const key in this._colors4Arrays) {
      result._colors4Arrays[key] = this._colors4Arrays[key];
    }
    for (const key in this._vectors2) {
      result.setVector2(key, this._vectors2[key]);
    }
    for (const key in this._vectors3) {
      result.setVector3(key, this._vectors3[key]);
    }
    for (const key in this._vectors4) {
      result.setVector4(key, this._vectors4[key]);
    }
    for (const key in this._quaternions) {
      result.setQuaternion(key, this._quaternions[key]);
    }
    for (const key in this._quaternionsArrays) {
      result._quaternionsArrays[key] = this._quaternionsArrays[key];
    }
    for (const key in this._matrices) {
      result.setMatrix(key, this._matrices[key]);
    }
    for (const key in this._matrixArrays) {
      result._matrixArrays[key] = this._matrixArrays[key].slice();
    }
    for (const key in this._matrices3x3) {
      result.setMatrix3x3(key, this._matrices3x3[key]);
    }
    for (const key in this._matrices2x2) {
      result.setMatrix2x2(key, this._matrices2x2[key]);
    }
    for (const key in this._vectors2Arrays) {
      result.setArray2(key, this._vectors2Arrays[key]);
    }
    for (const key in this._vectors3Arrays) {
      result.setArray3(key, this._vectors3Arrays[key]);
    }
    for (const key in this._vectors4Arrays) {
      result.setArray4(key, this._vectors4Arrays[key]);
    }
    for (const key in this._uniformBuffers) {
      result.setUniformBuffer(key, this._uniformBuffers[key]);
    }
    for (const key in this._textureSamplers) {
      result.setTextureSampler(key, this._textureSamplers[key]);
    }
    for (const key in this._storageBuffers) {
      result.setStorageBuffer(key, this._storageBuffers[key]);
    }
    return result;
  }
  /**
   * Disposes the material
   * @param forceDisposeEffect specifies if effects should be forcefully disposed
   * @param forceDisposeTextures specifies if textures should be forcefully disposed
   * @param notBoundToMesh specifies if the material that is being disposed is known to be not bound to any mesh
   */
  dispose(forceDisposeEffect, forceDisposeTextures, notBoundToMesh) {
    if (forceDisposeTextures) {
      let name;
      for (name in this._textures) {
        this._textures[name].dispose();
      }
      for (name in this._textureArrays) {
        const array = this._textureArrays[name];
        for (let index = 0; index < array.length; index++) {
          array[index].dispose();
        }
      }
    }
    this._textures = {};
    super.dispose(forceDisposeEffect, forceDisposeTextures, notBoundToMesh);
  }
  /**
   * Serializes this material in a JSON representation
   * @returns the serialized material object
   */
  serialize() {
    const serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.ShaderMaterial";
    serializationObject.uniqueId = this.uniqueId;
    serializationObject.options = this._options;
    serializationObject.shaderPath = this._shaderPath;
    serializationObject.storeEffectOnSubMeshes = this._storeEffectOnSubMeshes;
    let name;
    serializationObject.stencil = this.stencil.serialize();
    serializationObject.textures = {};
    for (name in this._textures) {
      serializationObject.textures[name] = this._textures[name].serialize();
    }
    serializationObject.textureArrays = {};
    for (name in this._textureArrays) {
      serializationObject.textureArrays[name] = [];
      const array = this._textureArrays[name];
      for (let index = 0; index < array.length; index++) {
        serializationObject.textureArrays[name].push(array[index].serialize());
      }
    }
    serializationObject.ints = {};
    for (name in this._ints) {
      serializationObject.ints[name] = this._ints[name];
    }
    serializationObject.uints = {};
    for (name in this._uints) {
      serializationObject.uints[name] = this._uints[name];
    }
    serializationObject.floats = {};
    for (name in this._floats) {
      serializationObject.floats[name] = this._floats[name];
    }
    serializationObject.floatsArrays = {};
    for (name in this._floatsArrays) {
      serializationObject.floatsArrays[name] = this._floatsArrays[name];
    }
    serializationObject.colors3 = {};
    for (name in this._colors3) {
      serializationObject.colors3[name] = this._colors3[name].asArray();
    }
    serializationObject.colors3Arrays = {};
    for (name in this._colors3Arrays) {
      serializationObject.colors3Arrays[name] = this._colors3Arrays[name];
    }
    serializationObject.colors4 = {};
    for (name in this._colors4) {
      serializationObject.colors4[name] = this._colors4[name].asArray();
    }
    serializationObject.colors4Arrays = {};
    for (name in this._colors4Arrays) {
      serializationObject.colors4Arrays[name] = this._colors4Arrays[name];
    }
    serializationObject.vectors2 = {};
    for (name in this._vectors2) {
      const v2 = this._vectors2[name];
      serializationObject.vectors2[name] = [v2.x, v2.y];
    }
    serializationObject.vectors3 = {};
    for (name in this._vectors3) {
      const v3 = this._vectors3[name];
      serializationObject.vectors3[name] = [v3.x, v3.y, v3.z];
    }
    serializationObject.vectors4 = {};
    for (name in this._vectors4) {
      const v4 = this._vectors4[name];
      serializationObject.vectors4[name] = [v4.x, v4.y, v4.z, v4.w];
    }
    serializationObject.quaternions = {};
    for (name in this._quaternions) {
      serializationObject.quaternions[name] = this._quaternions[name].asArray();
    }
    serializationObject.matrices = {};
    for (name in this._matrices) {
      serializationObject.matrices[name] = this._matrices[name].asArray();
    }
    serializationObject.matrixArray = {};
    for (name in this._matrixArrays) {
      serializationObject.matrixArray[name] = this._matrixArrays[name];
    }
    serializationObject.matrices3x3 = {};
    for (name in this._matrices3x3) {
      serializationObject.matrices3x3[name] = this._matrices3x3[name];
    }
    serializationObject.matrices2x2 = {};
    for (name in this._matrices2x2) {
      serializationObject.matrices2x2[name] = this._matrices2x2[name];
    }
    serializationObject.vectors2Arrays = {};
    for (name in this._vectors2Arrays) {
      serializationObject.vectors2Arrays[name] = this._vectors2Arrays[name];
    }
    serializationObject.vectors3Arrays = {};
    for (name in this._vectors3Arrays) {
      serializationObject.vectors3Arrays[name] = this._vectors3Arrays[name];
    }
    serializationObject.vectors4Arrays = {};
    for (name in this._vectors4Arrays) {
      serializationObject.vectors4Arrays[name] = this._vectors4Arrays[name];
    }
    serializationObject.quaternionsArrays = {};
    for (name in this._quaternionsArrays) {
      serializationObject.quaternionsArrays[name] = this._quaternionsArrays[name];
    }
    return serializationObject;
  }
  /**
   * Creates a shader material from parsed shader material data
   * @param source defines the JSON representation of the material
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a new material
   */
  static Parse(source, scene, rootUrl) {
    const material = SerializationHelper.Parse(() => new _ShaderMaterial(source.name, scene, source.shaderPath, source.options, source.storeEffectOnSubMeshes), source, scene, rootUrl);
    let name;
    if (source.stencil) {
      material.stencil.parse(source.stencil, scene, rootUrl);
    }
    for (name in source.textures) {
      material.setTexture(name, Texture.Parse(source.textures[name], scene, rootUrl));
    }
    for (name in source.textureArrays) {
      const array = source.textureArrays[name];
      const textureArray = [];
      for (let index = 0; index < array.length; index++) {
        textureArray.push(Texture.Parse(array[index], scene, rootUrl));
      }
      material.setTextureArray(name, textureArray);
    }
    for (name in source.ints) {
      material.setInt(name, source.ints[name]);
    }
    for (name in source.uints) {
      material.setUInt(name, source.uints[name]);
    }
    for (name in source.floats) {
      material.setFloat(name, source.floats[name]);
    }
    for (name in source.floatsArrays) {
      material.setFloats(name, source.floatsArrays[name]);
    }
    for (name in source.colors3) {
      material.setColor3(name, Color3.FromArray(source.colors3[name]));
    }
    for (name in source.colors3Arrays) {
      const colors = source.colors3Arrays[name].reduce((arr, num, i) => {
        if (i % 3 === 0) {
          arr.push([num]);
        } else {
          arr[arr.length - 1].push(num);
        }
        return arr;
      }, []).map((color) => Color3.FromArray(color));
      material.setColor3Array(name, colors);
    }
    for (name in source.colors4) {
      material.setColor4(name, Color4.FromArray(source.colors4[name]));
    }
    for (name in source.colors4Arrays) {
      const colors = source.colors4Arrays[name].reduce((arr, num, i) => {
        if (i % 4 === 0) {
          arr.push([num]);
        } else {
          arr[arr.length - 1].push(num);
        }
        return arr;
      }, []).map((color) => Color4.FromArray(color));
      material.setColor4Array(name, colors);
    }
    for (name in source.vectors2) {
      material.setVector2(name, Vector2.FromArray(source.vectors2[name]));
    }
    for (name in source.vectors3) {
      material.setVector3(name, Vector3.FromArray(source.vectors3[name]));
    }
    for (name in source.vectors4) {
      material.setVector4(name, Vector4.FromArray(source.vectors4[name]));
    }
    for (name in source.quaternions) {
      material.setQuaternion(name, Quaternion.FromArray(source.quaternions[name]));
    }
    for (name in source.matrices) {
      material.setMatrix(name, Matrix.FromArray(source.matrices[name]));
    }
    for (name in source.matrixArray) {
      material._matrixArrays[name] = new Float32Array(source.matrixArray[name]);
    }
    for (name in source.matrices3x3) {
      material.setMatrix3x3(name, source.matrices3x3[name]);
    }
    for (name in source.matrices2x2) {
      material.setMatrix2x2(name, source.matrices2x2[name]);
    }
    for (name in source.vectors2Arrays) {
      material.setArray2(name, source.vectors2Arrays[name]);
    }
    for (name in source.vectors3Arrays) {
      material.setArray3(name, source.vectors3Arrays[name]);
    }
    for (name in source.vectors4Arrays) {
      material.setArray4(name, source.vectors4Arrays[name]);
    }
    for (name in source.quaternionsArrays) {
      material.setArray4(name, source.quaternionsArrays[name]);
    }
    return material;
  }
  /**
   * Creates a new ShaderMaterial from a snippet saved in a remote file
   * @param name defines the name of the ShaderMaterial to create (can be null or empty to use the one from the json data)
   * @param url defines the url to load from
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a promise that will resolve to the new ShaderMaterial
   */
  static ParseFromFileAsync(name, url, scene, rootUrl = "") {
    return new Promise((resolve, reject) => {
      const request = new WebRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState == 4) {
          if (request.status == 200) {
            const serializationObject = JSON.parse(request.responseText);
            const output = this.Parse(serializationObject, scene || EngineStore.LastCreatedScene, rootUrl);
            if (name) {
              output.name = name;
            }
            resolve(output);
          } else {
            reject("Unable to load the ShaderMaterial");
          }
        }
      });
      request.open("GET", url);
      request.send();
    });
  }
  /**
   * Creates a ShaderMaterial from a snippet saved by the Inspector
   * @param snippetId defines the snippet to load
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a promise that will resolve to the new ShaderMaterial
   */
  static ParseFromSnippetAsync(snippetId, scene, rootUrl = "") {
    return new Promise((resolve, reject) => {
      const request = new WebRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState == 4) {
          if (request.status == 200) {
            const snippet = JSON.parse(JSON.parse(request.responseText).jsonPayload);
            const serializationObject = JSON.parse(snippet.shaderMaterial);
            const output = this.Parse(serializationObject, scene || EngineStore.LastCreatedScene, rootUrl);
            output.snippetId = snippetId;
            resolve(output);
          } else {
            reject("Unable to load the snippet " + snippetId);
          }
        }
      });
      request.open("GET", this.SnippetUrl + "/" + snippetId.replace(/#/g, "/"));
      request.send();
    });
  }
};
ShaderMaterial.SnippetUrl = `https://snippet.babylonjs.com`;
ShaderMaterial.CreateFromSnippetAsync = ShaderMaterial.ParseFromSnippetAsync;
RegisterClass("BABYLON.ShaderMaterial", ShaderMaterial);

// node_modules/@babylonjs/core/Meshes/linesMesh.js
Mesh._LinesMeshParser = (parsedMesh, scene) => {
  return LinesMesh.Parse(parsedMesh, scene);
};
var LinesMesh = class _LinesMesh extends Mesh {
  _isShaderMaterial(shader) {
    return shader.getClassName() === "ShaderMaterial";
  }
  /**
   * Creates a new LinesMesh
   * @param name defines the name
   * @param scene defines the hosting scene
   * @param parent defines the parent mesh if any
   * @param source defines the optional source LinesMesh used to clone data from
   * @param doNotCloneChildren When cloning, skip cloning child meshes of source, default False.
   * When false, achieved by calling a clone(), also passing False.
   * This will make creation of children, recursive.
   * @param useVertexColor defines if this LinesMesh supports vertex color
   * @param useVertexAlpha defines if this LinesMesh supports vertex alpha
   * @param material material to use to draw the line. If not provided, will create a new one
   */
  constructor(name, scene = null, parent = null, source = null, doNotCloneChildren, useVertexColor, useVertexAlpha, material) {
    super(name, scene, parent, source, doNotCloneChildren);
    this.useVertexColor = useVertexColor;
    this.useVertexAlpha = useVertexAlpha;
    this.color = new Color3(1, 1, 1);
    this.alpha = 1;
    this._shaderLanguage = 0;
    if (source) {
      this.color = source.color.clone();
      this.alpha = source.alpha;
      this.useVertexColor = source.useVertexColor;
      this.useVertexAlpha = source.useVertexAlpha;
    }
    this.intersectionThreshold = 0.1;
    const defines = [];
    const options = {
      attributes: [VertexBuffer.PositionKind],
      uniforms: ["world", "viewProjection"],
      needAlphaBlending: true,
      defines,
      useClipPlane: null,
      shaderLanguage: 0
    };
    if (!this.useVertexAlpha) {
      options.needAlphaBlending = false;
    } else {
      options.defines.push("#define VERTEXALPHA");
    }
    if (!this.useVertexColor) {
      options.uniforms.push("color");
      this._color4 = new Color4();
    } else {
      options.defines.push("#define VERTEXCOLOR");
      options.attributes.push(VertexBuffer.ColorKind);
    }
    if (material) {
      this.material = material;
    } else {
      const engine = this.getScene().getEngine();
      if (engine.isWebGPU && !_LinesMesh.ForceGLSL) {
        this._shaderLanguage = 1;
      }
      options.shaderLanguage = this._shaderLanguage;
      options.extraInitializationsAsync = async () => {
        if (this._shaderLanguage === 1) {
          await Promise.all([import("./color.vertex-IAPQIB46.js"), import("./color.fragment-XC47MZCP.js")]);
        } else {
          await Promise.all([import("./color.vertex-6L4LQGL6.js"), import("./color.fragment-2XXKIP26.js")]);
        }
      };
      this.material = new ShaderMaterial("colorShader", this.getScene(), "color", options, false);
      this.material.doNotSerialize = true;
    }
  }
  isReady() {
    if (!this._lineMaterial.isReady(this, !!this._userInstancedBuffersStorage || this.hasThinInstances)) {
      return false;
    }
    return super.isReady();
  }
  /**
   * @returns the string "LineMesh"
   */
  getClassName() {
    return "LinesMesh";
  }
  /**
   * @internal
   */
  get material() {
    return this._lineMaterial;
  }
  /**
   * @internal
   */
  set material(value) {
    this._lineMaterial = value;
    this._lineMaterial.fillMode = Material.LineListDrawMode;
  }
  /**
   * @internal
   */
  get checkCollisions() {
    return false;
  }
  set checkCollisions(value) {
  }
  /**
   * @internal
   */
  _bind(_subMesh, colorEffect) {
    if (!this._geometry) {
      return this;
    }
    const indexToBind = this.isUnIndexed ? null : this._geometry.getIndexBuffer();
    if (!this._userInstancedBuffersStorage || this.hasThinInstances) {
      this._geometry._bind(colorEffect, indexToBind);
    } else {
      this._geometry._bind(colorEffect, indexToBind, this._userInstancedBuffersStorage.vertexBuffers, this._userInstancedBuffersStorage.vertexArrayObjects);
    }
    if (!this.useVertexColor && this._isShaderMaterial(this._lineMaterial)) {
      const { r, g, b } = this.color;
      this._color4.set(r, g, b, this.alpha);
      this._lineMaterial.setColor4("color", this._color4);
    }
    return this;
  }
  /**
   * @internal
   */
  _draw(subMesh, fillMode, instancesCount) {
    if (!this._geometry || !this._geometry.getVertexBuffers() || !this._unIndexed && !this._geometry.getIndexBuffer()) {
      return this;
    }
    const engine = this.getScene().getEngine();
    if (this._unIndexed) {
      engine.drawArraysType(Material.LineListDrawMode, subMesh.verticesStart, subMesh.verticesCount, instancesCount);
    } else {
      engine.drawElementsType(Material.LineListDrawMode, subMesh.indexStart, subMesh.indexCount, instancesCount);
    }
    return this;
  }
  /**
   * Disposes of the line mesh
   * @param doNotRecurse If children should be disposed
   * @param disposeMaterialAndTextures This parameter is not used by the LineMesh class
   * @param doNotDisposeMaterial If the material should not be disposed (default: false, meaning the material is disposed)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispose(doNotRecurse, disposeMaterialAndTextures = false, doNotDisposeMaterial) {
    if (!doNotDisposeMaterial) {
      this._lineMaterial.dispose(false, false, true);
    }
    super.dispose(doNotRecurse);
  }
  /**
   * Returns a new LineMesh object cloned from the current one.
   * @param name defines the cloned mesh name
   * @param newParent defines the new mesh parent
   * @param doNotCloneChildren if set to true, none of the mesh children are cloned (false by default)
   * @returns the new mesh
   */
  clone(name, newParent = null, doNotCloneChildren) {
    return new _LinesMesh(name, this.getScene(), newParent, this, doNotCloneChildren);
  }
  /**
   * Creates a new InstancedLinesMesh object from the mesh model.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
   * @param name defines the name of the new instance
   * @returns a new InstancedLinesMesh
   */
  createInstance(name) {
    const instance = new InstancedLinesMesh(name, this);
    if (this.instancedBuffers) {
      instance.instancedBuffers = {};
      for (const key in this.instancedBuffers) {
        instance.instancedBuffers[key] = this.instancedBuffers[key];
      }
    }
    return instance;
  }
  /**
   * Serializes this ground mesh
   * @param serializationObject object to write serialization to
   */
  serialize(serializationObject) {
    super.serialize(serializationObject);
    serializationObject.color = this.color.asArray();
    serializationObject.alpha = this.alpha;
  }
  /**
   * Parses a serialized ground mesh
   * @param parsedMesh the serialized mesh
   * @param scene the scene to create the ground mesh in
   * @returns the created ground mesh
   */
  static Parse(parsedMesh, scene) {
    const result = new _LinesMesh(parsedMesh.name, scene);
    result.color = Color3.FromArray(parsedMesh.color);
    result.alpha = parsedMesh.alpha;
    return result;
  }
};
LinesMesh.ForceGLSL = false;
var InstancedLinesMesh = class extends InstancedMesh {
  constructor(name, source) {
    super(name, source);
    this.intersectionThreshold = source.intersectionThreshold;
  }
  /**
   * @returns the string "InstancedLinesMesh".
   */
  getClassName() {
    return "InstancedLinesMesh";
  }
};

// node_modules/@babylonjs/core/Meshes/Builders/linesBuilder.js
function CreateLineSystemVertexData(options) {
  const indices = [];
  const positions = [];
  const lines = options.lines;
  const colors = options.colors;
  const vertexColors = [];
  let idx = 0;
  for (let l = 0; l < lines.length; l++) {
    const points = lines[l];
    for (let index = 0; index < points.length; index++) {
      const { x, y, z } = points[index];
      positions.push(x, y, z);
      if (colors) {
        const color = colors[l];
        const { r, g, b, a } = color[index];
        vertexColors.push(r, g, b, a);
      }
      if (index > 0) {
        indices.push(idx - 1);
        indices.push(idx);
      }
      idx++;
    }
  }
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  if (colors) {
    vertexData.colors = vertexColors;
  }
  return vertexData;
}
function CreateDashedLinesVertexData(options) {
  const dashSize = options.dashSize || 3;
  const gapSize = options.gapSize || 1;
  const dashNb = options.dashNb || 200;
  const points = options.points;
  const positions = [];
  const indices = [];
  const curvect = Vector3.Zero();
  let lg = 0;
  let nb = 0;
  let shft = 0;
  let dashshft = 0;
  let curshft = 0;
  let idx = 0;
  let i = 0;
  for (i = 0; i < points.length - 1; i++) {
    points[i + 1].subtractToRef(points[i], curvect);
    lg += curvect.length();
  }
  shft = lg / dashNb;
  dashshft = dashSize * shft / (dashSize + gapSize);
  for (i = 0; i < points.length - 1; i++) {
    points[i + 1].subtractToRef(points[i], curvect);
    nb = Math.floor(curvect.length() / shft);
    curvect.normalize();
    for (let j = 0; j < nb; j++) {
      curshft = shft * j;
      positions.push(points[i].x + curshft * curvect.x, points[i].y + curshft * curvect.y, points[i].z + curshft * curvect.z);
      positions.push(points[i].x + (curshft + dashshft) * curvect.x, points[i].y + (curshft + dashshft) * curvect.y, points[i].z + (curshft + dashshft) * curvect.z);
      indices.push(idx, idx + 1);
      idx += 2;
    }
  }
  const vertexData = new VertexData();
  vertexData.positions = positions;
  vertexData.indices = indices;
  return vertexData;
}
function CreateLineSystem(name, options, scene = null) {
  const instance = options.instance;
  const lines = options.lines;
  const colors = options.colors;
  if (instance) {
    const positions = instance.getVerticesData(VertexBuffer.PositionKind);
    let vertexColor;
    let lineColors;
    if (colors) {
      vertexColor = instance.getVerticesData(VertexBuffer.ColorKind);
    }
    let i = 0;
    let c = 0;
    for (let l = 0; l < lines.length; l++) {
      const points = lines[l];
      for (let p = 0; p < points.length; p++) {
        positions[i] = points[p].x;
        positions[i + 1] = points[p].y;
        positions[i + 2] = points[p].z;
        if (colors && vertexColor) {
          lineColors = colors[l];
          vertexColor[c] = lineColors[p].r;
          vertexColor[c + 1] = lineColors[p].g;
          vertexColor[c + 2] = lineColors[p].b;
          vertexColor[c + 3] = lineColors[p].a;
          c += 4;
        }
        i += 3;
      }
    }
    instance.updateVerticesData(VertexBuffer.PositionKind, positions, false, false);
    if (colors && vertexColor) {
      instance.updateVerticesData(VertexBuffer.ColorKind, vertexColor, false, false);
    }
    instance.refreshBoundingInfo();
    return instance;
  }
  const useVertexColor = colors ? true : false;
  const lineSystem = new LinesMesh(name, scene, null, void 0, void 0, useVertexColor, options.useVertexAlpha, options.material);
  const vertexData = CreateLineSystemVertexData(options);
  vertexData.applyToMesh(lineSystem, options.updatable);
  return lineSystem;
}
function CreateLines(name, options, scene = null) {
  const colors = options.colors ? [options.colors] : null;
  const lines = CreateLineSystem(name, { lines: [options.points], updatable: options.updatable, instance: options.instance, colors, useVertexAlpha: options.useVertexAlpha, material: options.material }, scene);
  return lines;
}
function CreateDashedLines(name, options, scene = null) {
  const points = options.points;
  const instance = options.instance;
  const gapSize = options.gapSize || 1;
  const dashSize = options.dashSize || 3;
  if (instance) {
    const positionFunction = (positions) => {
      const curvect = Vector3.Zero();
      const nbSeg = positions.length / 6;
      let lg = 0;
      let nb = 0;
      let shft = 0;
      let dashshft = 0;
      let curshft = 0;
      let p = 0;
      let i = 0;
      let j = 0;
      for (i = 0; i < points.length - 1; i++) {
        points[i + 1].subtractToRef(points[i], curvect);
        lg += curvect.length();
      }
      shft = lg / nbSeg;
      const dashSize2 = instance._creationDataStorage.dashSize;
      const gapSize2 = instance._creationDataStorage.gapSize;
      dashshft = dashSize2 * shft / (dashSize2 + gapSize2);
      for (i = 0; i < points.length - 1; i++) {
        points[i + 1].subtractToRef(points[i], curvect);
        nb = Math.floor(curvect.length() / shft);
        curvect.normalize();
        j = 0;
        while (j < nb && p < positions.length) {
          curshft = shft * j;
          positions[p] = points[i].x + curshft * curvect.x;
          positions[p + 1] = points[i].y + curshft * curvect.y;
          positions[p + 2] = points[i].z + curshft * curvect.z;
          positions[p + 3] = points[i].x + (curshft + dashshft) * curvect.x;
          positions[p + 4] = points[i].y + (curshft + dashshft) * curvect.y;
          positions[p + 5] = points[i].z + (curshft + dashshft) * curvect.z;
          p += 6;
          j++;
        }
      }
      while (p < positions.length) {
        positions[p] = points[i].x;
        positions[p + 1] = points[i].y;
        positions[p + 2] = points[i].z;
        p += 3;
      }
    };
    if (options.dashNb || options.dashSize || options.gapSize || options.useVertexAlpha || options.material) {
      Logger.Warn("You have used an option other than points with the instance option. Please be aware that these other options will be ignored.");
    }
    instance.updateMeshPositions(positionFunction, false);
    return instance;
  }
  const dashedLines = new LinesMesh(name, scene, null, void 0, void 0, void 0, options.useVertexAlpha, options.material);
  const vertexData = CreateDashedLinesVertexData(options);
  vertexData.applyToMesh(dashedLines, options.updatable);
  dashedLines._creationDataStorage = new _CreationDataStorage();
  dashedLines._creationDataStorage.dashSize = dashSize;
  dashedLines._creationDataStorage.gapSize = gapSize;
  return dashedLines;
}
VertexData.CreateLineSystem = CreateLineSystemVertexData;
VertexData.CreateDashedLines = CreateDashedLinesVertexData;
Mesh.CreateLines = (name, points, scene = null, updatable = false, instance = null) => {
  const options = {
    points,
    updatable,
    instance
  };
  return CreateLines(name, options, scene);
};
Mesh.CreateDashedLines = (name, points, dashSize, gapSize, dashNb, scene = null, updatable, instance) => {
  const options = {
    points,
    dashSize,
    gapSize,
    dashNb,
    updatable,
    instance
  };
  return CreateDashedLines(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/polygonMesh.js
var IndexedVector2 = class extends Vector2 {
  constructor(original, index) {
    super(original.x, original.y);
    this.index = index;
  }
};
var PolygonPoints = class {
  constructor() {
    this.elements = [];
  }
  add(originalPoints) {
    const result = [];
    originalPoints.forEach((point) => {
      const newPoint = new IndexedVector2(point, this.elements.length);
      result.push(newPoint);
      this.elements.push(newPoint);
    });
    return result;
  }
  computeBounds() {
    const lmin = new Vector2(this.elements[0].x, this.elements[0].y);
    const lmax = new Vector2(this.elements[0].x, this.elements[0].y);
    this.elements.forEach((point) => {
      if (point.x < lmin.x) {
        lmin.x = point.x;
      } else if (point.x > lmax.x) {
        lmax.x = point.x;
      }
      if (point.y < lmin.y) {
        lmin.y = point.y;
      } else if (point.y > lmax.y) {
        lmax.y = point.y;
      }
    });
    return {
      min: lmin,
      max: lmax,
      width: lmax.x - lmin.x,
      height: lmax.y - lmin.y
    };
  }
};
var PolygonMeshBuilder = class {
  _addToepoint(points) {
    for (const p of points) {
      this._epoints.push(p.x, p.y);
    }
  }
  /**
   * Creates a PolygonMeshBuilder
   * @param name name of the builder
   * @param contours Path of the polygon
   * @param scene scene to add to when creating the mesh
   * @param earcutInjection can be used to inject your own earcut reference
   */
  constructor(name, contours, scene, earcutInjection = earcut) {
    this._points = new PolygonPoints();
    this._outlinepoints = new PolygonPoints();
    this._holes = new Array();
    this._epoints = new Array();
    this._eholes = new Array();
    this.bjsEarcut = earcutInjection;
    this._name = name;
    this._scene = scene || EngineStore.LastCreatedScene;
    let points;
    if (contours instanceof Path2) {
      points = contours.getPoints();
    } else {
      points = contours;
    }
    this._addToepoint(points);
    this._points.add(points);
    this._outlinepoints.add(points);
    if (typeof this.bjsEarcut === "undefined") {
      Logger.Warn("Earcut was not found, the polygon will not be built.");
    }
  }
  /**
   * Adds a hole within the polygon
   * @param hole Array of points defining the hole
   * @returns this
   */
  addHole(hole) {
    this._points.add(hole);
    const holepoints = new PolygonPoints();
    holepoints.add(hole);
    this._holes.push(holepoints);
    this._eholes.push(this._epoints.length / 2);
    this._addToepoint(hole);
    return this;
  }
  /**
   * Creates the polygon
   * @param updatable If the mesh should be updatable
   * @param depth The depth of the mesh created
   * @param smoothingThreshold Dot product threshold for smoothed normals
   * @returns the created mesh
   */
  build(updatable = false, depth = 0, smoothingThreshold = 2) {
    const result = new Mesh(this._name, this._scene);
    const vertexData = this.buildVertexData(depth, smoothingThreshold);
    result.setVerticesData(VertexBuffer.PositionKind, vertexData.positions, updatable);
    result.setVerticesData(VertexBuffer.NormalKind, vertexData.normals, updatable);
    result.setVerticesData(VertexBuffer.UVKind, vertexData.uvs, updatable);
    result.setIndices(vertexData.indices);
    return result;
  }
  /**
   * Creates the polygon
   * @param depth The depth of the mesh created
   * @param smoothingThreshold Dot product threshold for smoothed normals
   * @returns the created VertexData
   */
  buildVertexData(depth = 0, smoothingThreshold = 2) {
    const result = new VertexData();
    const normals = [];
    const positions = [];
    const uvs = [];
    const bounds = this._points.computeBounds();
    this._points.elements.forEach((p) => {
      normals.push(0, 1, 0);
      positions.push(p.x, 0, p.y);
      uvs.push((p.x - bounds.min.x) / bounds.width, (p.y - bounds.min.y) / bounds.height);
    });
    const indices = [];
    const res = this.bjsEarcut(this._epoints, this._eholes, 2);
    for (let i = 0; i < res.length; i++) {
      indices.push(res[i]);
    }
    if (depth > 0) {
      const positionscount = positions.length / 3;
      this._points.elements.forEach((p) => {
        normals.push(0, -1, 0);
        positions.push(p.x, -depth, p.y);
        uvs.push(1 - (p.x - bounds.min.x) / bounds.width, 1 - (p.y - bounds.min.y) / bounds.height);
      });
      const totalCount = indices.length;
      for (let i = 0; i < totalCount; i += 3) {
        const i0 = indices[i + 0];
        const i1 = indices[i + 1];
        const i2 = indices[i + 2];
        indices.push(i2 + positionscount);
        indices.push(i1 + positionscount);
        indices.push(i0 + positionscount);
      }
      this._addSide(positions, normals, uvs, indices, bounds, this._outlinepoints, depth, false, smoothingThreshold);
      this._holes.forEach((hole) => {
        this._addSide(positions, normals, uvs, indices, bounds, hole, depth, true, smoothingThreshold);
      });
    }
    result.indices = indices;
    result.positions = positions;
    result.normals = normals;
    result.uvs = uvs;
    return result;
  }
  /**
   * Adds a side to the polygon
   * @param positions points that make the polygon
   * @param normals normals of the polygon
   * @param uvs uvs of the polygon
   * @param indices indices of the polygon
   * @param bounds bounds of the polygon
   * @param points points of the polygon
   * @param depth depth of the polygon
   * @param flip flip of the polygon
   * @param smoothingThreshold
   */
  _addSide(positions, normals, uvs, indices, bounds, points, depth, flip, smoothingThreshold) {
    let startIndex = positions.length / 3;
    let ulength = 0;
    for (let i = 0; i < points.elements.length; i++) {
      const p = points.elements[i];
      const p1 = points.elements[(i + 1) % points.elements.length];
      positions.push(p.x, 0, p.y);
      positions.push(p.x, -depth, p.y);
      positions.push(p1.x, 0, p1.y);
      positions.push(p1.x, -depth, p1.y);
      const p0 = points.elements[(i + points.elements.length - 1) % points.elements.length];
      const p2 = points.elements[(i + 2) % points.elements.length];
      let vc = new Vector3(-(p1.y - p.y), 0, p1.x - p.x);
      let vp = new Vector3(-(p.y - p0.y), 0, p.x - p0.x);
      let vn = new Vector3(-(p2.y - p1.y), 0, p2.x - p1.x);
      if (!flip) {
        vc = vc.scale(-1);
        vp = vp.scale(-1);
        vn = vn.scale(-1);
      }
      const vc_norm = vc.normalizeToNew();
      let vp_norm = vp.normalizeToNew();
      let vn_norm = vn.normalizeToNew();
      const dotp = Vector3.Dot(vp_norm, vc_norm);
      if (dotp > smoothingThreshold) {
        if (dotp < Epsilon - 1) {
          vp_norm = new Vector3(p.x, 0, p.y).subtract(new Vector3(p1.x, 0, p1.y)).normalize();
        } else {
          vp_norm = vp.add(vc).normalize();
        }
      } else {
        vp_norm = vc_norm;
      }
      const dotn = Vector3.Dot(vn, vc);
      if (dotn > smoothingThreshold) {
        if (dotn < Epsilon - 1) {
          vn_norm = new Vector3(p1.x, 0, p1.y).subtract(new Vector3(p.x, 0, p.y)).normalize();
        } else {
          vn_norm = vn.add(vc).normalize();
        }
      } else {
        vn_norm = vc_norm;
      }
      uvs.push(ulength / bounds.width, 0);
      uvs.push(ulength / bounds.width, 1);
      ulength += vc.length();
      uvs.push(ulength / bounds.width, 0);
      uvs.push(ulength / bounds.width, 1);
      normals.push(vp_norm.x, vp_norm.y, vp_norm.z);
      normals.push(vp_norm.x, vp_norm.y, vp_norm.z);
      normals.push(vn_norm.x, vn_norm.y, vn_norm.z);
      normals.push(vn_norm.x, vn_norm.y, vn_norm.z);
      if (!flip) {
        indices.push(startIndex);
        indices.push(startIndex + 1);
        indices.push(startIndex + 2);
        indices.push(startIndex + 1);
        indices.push(startIndex + 3);
        indices.push(startIndex + 2);
      } else {
        indices.push(startIndex);
        indices.push(startIndex + 2);
        indices.push(startIndex + 1);
        indices.push(startIndex + 1);
        indices.push(startIndex + 2);
        indices.push(startIndex + 3);
      }
      startIndex += 4;
    }
  }
};

// node_modules/@babylonjs/core/Meshes/Builders/polygonBuilder.js
function CreatePolygonVertexData(polygon, sideOrientation, fUV, fColors, frontUVs, backUVs, wrp) {
  const faceUV = fUV || new Array(3);
  const faceColors = fColors;
  const colors = [];
  const wrap = wrp || false;
  for (let f = 0; f < 3; f++) {
    if (faceUV[f] === void 0) {
      faceUV[f] = new Vector4(0, 0, 1, 1);
    }
    if (faceColors && faceColors[f] === void 0) {
      faceColors[f] = new Color4(1, 1, 1, 1);
    }
  }
  const positions = polygon.getVerticesData(VertexBuffer.PositionKind);
  const normals = polygon.getVerticesData(VertexBuffer.NormalKind);
  const uvs = polygon.getVerticesData(VertexBuffer.UVKind);
  const indices = polygon.getIndices();
  const startIndex = positions.length / 9;
  let disp = 0;
  let distX = 0;
  let distZ = 0;
  let dist = 0;
  let totalLen = 0;
  const cumulate = [0];
  if (wrap) {
    for (let idx2 = startIndex; idx2 < positions.length / 3; idx2 += 4) {
      distX = positions[3 * (idx2 + 2)] - positions[3 * idx2];
      distZ = positions[3 * (idx2 + 2) + 2] - positions[3 * idx2 + 2];
      dist = Math.sqrt(distX * distX + distZ * distZ);
      totalLen += dist;
      cumulate.push(totalLen);
    }
  }
  let idx = 0;
  let face = 0;
  for (let index = 0; index < normals.length; index += 3) {
    if (Math.abs(normals[index + 1]) < 1e-3) {
      face = 1;
    }
    if (Math.abs(normals[index + 1] - 1) < 1e-3) {
      face = 0;
    }
    if (Math.abs(normals[index + 1] + 1) < 1e-3) {
      face = 2;
    }
    idx = index / 3;
    if (face === 1) {
      disp = idx - startIndex;
      if (disp % 4 < 1.5) {
        if (wrap) {
          uvs[2 * idx] = faceUV[face].x + (faceUV[face].z - faceUV[face].x) * cumulate[Math.floor(disp / 4)] / totalLen;
        } else {
          uvs[2 * idx] = faceUV[face].x;
        }
      } else {
        if (wrap) {
          uvs[2 * idx] = faceUV[face].x + (faceUV[face].z - faceUV[face].x) * cumulate[Math.floor(disp / 4) + 1] / totalLen;
        } else {
          uvs[2 * idx] = faceUV[face].z;
        }
      }
      if (disp % 2 === 0) {
        uvs[2 * idx + 1] = useOpenGLOrientationForUV ? 1 - faceUV[face].w : faceUV[face].w;
      } else {
        uvs[2 * idx + 1] = useOpenGLOrientationForUV ? 1 - faceUV[face].y : faceUV[face].y;
      }
    } else {
      uvs[2 * idx] = (1 - uvs[2 * idx]) * faceUV[face].x + uvs[2 * idx] * faceUV[face].z;
      uvs[2 * idx + 1] = (1 - uvs[2 * idx + 1]) * faceUV[face].y + uvs[2 * idx + 1] * faceUV[face].w;
      if (useOpenGLOrientationForUV) {
        uvs[2 * idx + 1] = 1 - uvs[2 * idx + 1];
      }
    }
    if (faceColors) {
      colors.push(faceColors[face].r, faceColors[face].g, faceColors[face].b, faceColors[face].a);
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, frontUVs, backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  if (faceColors) {
    const totalColors = sideOrientation === VertexData.DOUBLESIDE ? colors.concat(colors) : colors;
    vertexData.colors = totalColors;
  }
  return vertexData;
}
function CreatePolygon(name, options, scene = null, earcutInjection = earcut) {
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  const shape = options.shape;
  const holes = options.holes || [];
  const depth = options.depth || 0;
  const smoothingThreshold = options.smoothingThreshold || 2;
  const contours = [];
  let hole = [];
  for (let i = 0; i < shape.length; i++) {
    contours[i] = new Vector2(shape[i].x, shape[i].z);
  }
  const epsilon = 1e-8;
  if (contours[0].equalsWithEpsilon(contours[contours.length - 1], epsilon)) {
    contours.pop();
  }
  const polygonTriangulation = new PolygonMeshBuilder(name, contours, scene || EngineStore.LastCreatedScene, earcutInjection);
  for (let hNb = 0; hNb < holes.length; hNb++) {
    hole = [];
    for (let hPoint = 0; hPoint < holes[hNb].length; hPoint++) {
      hole.push(new Vector2(holes[hNb][hPoint].x, holes[hNb][hPoint].z));
    }
    polygonTriangulation.addHole(hole);
  }
  const polygon = polygonTriangulation.build(false, depth, smoothingThreshold);
  polygon._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreatePolygonVertexData(polygon, options.sideOrientation, options.faceUV, options.faceColors, options.frontUVs, options.backUVs, options.wrap);
  vertexData.applyToMesh(polygon, options.updatable);
  return polygon;
}
function ExtrudePolygon(name, options, scene = null, earcutInjection = earcut) {
  return CreatePolygon(name, options, scene, earcutInjection);
}
VertexData.CreatePolygon = CreatePolygonVertexData;
Mesh.CreatePolygon = (name, shape, scene, holes, updatable, sideOrientation, earcutInjection = earcut) => {
  const options = {
    shape,
    holes,
    updatable,
    sideOrientation
  };
  return CreatePolygon(name, options, scene, earcutInjection);
};
Mesh.ExtrudePolygon = (name, shape, depth, scene, holes, updatable, sideOrientation, earcutInjection = earcut) => {
  const options = {
    shape,
    holes,
    depth,
    updatable,
    sideOrientation
  };
  return ExtrudePolygon(name, options, scene, earcutInjection);
};

// node_modules/@babylonjs/core/Meshes/Builders/shapeBuilder.js
function ExtrudeShape(name, options, scene = null) {
  const path = options.path;
  const shape = options.shape;
  const scale = options.scale || 1;
  const rotation = options.rotation || 0;
  const cap = options.cap === 0 ? 0 : options.cap || Mesh.NO_CAP;
  const updatable = options.updatable;
  const sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  const instance = options.instance || null;
  const invertUV = options.invertUV || false;
  const closeShape = options.closeShape || false;
  const closePath = options.closePath || false;
  const capFunction = options.capFunction || null;
  return _ExtrudeShapeGeneric(name, shape, path, scale, rotation, null, null, closePath, closeShape, cap, false, scene, updatable ? true : false, sideOrientation, instance, invertUV, options.frontUVs || null, options.backUVs || null, options.firstNormal || null, options.adjustFrame ? true : false, capFunction);
}
function ExtrudeShapeCustom(name, options, scene = null) {
  const path = options.path;
  const shape = options.shape;
  const scaleFunction = options.scaleFunction || (() => {
    return 1;
  });
  const rotationFunction = options.rotationFunction || (() => {
    return 0;
  });
  const ribbonCloseArray = options.closePath || options.ribbonCloseArray || false;
  const ribbonClosePath = options.closeShape || options.ribbonClosePath || false;
  const cap = options.cap === 0 ? 0 : options.cap || Mesh.NO_CAP;
  const updatable = options.updatable;
  const firstNormal = options.firstNormal || null;
  const adjustFrame = options.adjustFrame || false;
  const sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  const instance = options.instance;
  const invertUV = options.invertUV || false;
  const capFunction = options.capFunction || null;
  return _ExtrudeShapeGeneric(name, shape, path, null, null, scaleFunction, rotationFunction, ribbonCloseArray, ribbonClosePath, cap, true, scene, updatable ? true : false, sideOrientation, instance || null, invertUV, options.frontUVs || null, options.backUVs || null, firstNormal, adjustFrame, capFunction || null);
}
function _ExtrudeShapeGeneric(name, shape, curve, scale, rotation, scaleFunction, rotateFunction, rbCA, rbCP, cap, custom, scene, updtbl, side, instance, invertUV, frontUVs, backUVs, firstNormal, adjustFrame, capFunction) {
  const extrusionPathArray = (shape2, curve2, path3D2, shapePaths, scale2, rotation2, scaleFunction2, rotateFunction2, cap2, custom2, adjustFrame2) => {
    const tangents = path3D2.getTangents();
    const normals = path3D2.getNormals();
    const binormals = path3D2.getBinormals();
    const distances = path3D2.getDistances();
    if (adjustFrame2) {
      for (let i = 0; i < tangents.length; i++) {
        if (tangents[i].x == 0 && tangents[i].y == 0 && tangents[i].z == 0) {
          tangents[i].copyFrom(tangents[i - 1]);
        }
        if (normals[i].x == 0 && normals[i].y == 0 && normals[i].z == 0) {
          normals[i].copyFrom(normals[i - 1]);
        }
        if (binormals[i].x == 0 && binormals[i].y == 0 && binormals[i].z == 0) {
          binormals[i].copyFrom(binormals[i - 1]);
        }
        if (i > 0) {
          let v = tangents[i - 1];
          if (Vector3.Dot(v, tangents[i]) < 0) {
            tangents[i].scaleInPlace(-1);
          }
          v = normals[i - 1];
          if (Vector3.Dot(v, normals[i]) < 0) {
            normals[i].scaleInPlace(-1);
          }
          v = binormals[i - 1];
          if (Vector3.Dot(v, binormals[i]) < 0) {
            binormals[i].scaleInPlace(-1);
          }
        }
      }
    }
    let angle = 0;
    const returnScale = () => {
      return scale2 !== null ? scale2 : 1;
    };
    const returnRotation = () => {
      return rotation2 !== null ? rotation2 : 0;
    };
    const rotate = custom2 && rotateFunction2 ? rotateFunction2 : returnRotation;
    const scl = custom2 && scaleFunction2 ? scaleFunction2 : returnScale;
    let index = cap2 === Mesh.NO_CAP || cap2 === Mesh.CAP_END ? 0 : 2;
    const rotationMatrix = TmpVectors.Matrix[0];
    for (let i = 0; i < curve2.length; i++) {
      const shapePath = [];
      const angleStep = rotate(i, distances[i]);
      const scaleRatio = scl(i, distances[i]);
      Matrix.RotationAxisToRef(tangents[i], angle, rotationMatrix);
      for (let p = 0; p < shape2.length; p++) {
        const planed = tangents[i].scale(shape2[p].z).add(normals[i].scale(shape2[p].x)).add(binormals[i].scale(shape2[p].y));
        const rotated = Vector3.Zero();
        Vector3.TransformCoordinatesToRef(planed, rotationMatrix, rotated);
        rotated.scaleInPlace(scaleRatio).addInPlace(curve2[i]);
        shapePath[p] = rotated;
      }
      shapePaths[index] = shapePath;
      angle += angleStep;
      index++;
    }
    const defaultCapPath = (shapePath) => {
      const pointCap = Array();
      const barycenter = Vector3.Zero();
      let i;
      for (i = 0; i < shapePath.length; i++) {
        barycenter.addInPlace(shapePath[i]);
      }
      barycenter.scaleInPlace(1 / shapePath.length);
      for (i = 0; i < shapePath.length; i++) {
        pointCap.push(barycenter);
      }
      return pointCap;
    };
    const capPath = capFunction || defaultCapPath;
    switch (cap2) {
      case Mesh.NO_CAP:
        break;
      case Mesh.CAP_START:
        shapePaths[0] = capPath(shapePaths[2]);
        shapePaths[1] = shapePaths[2];
        break;
      case Mesh.CAP_END:
        shapePaths[index] = shapePaths[index - 1];
        shapePaths[index + 1] = capPath(shapePaths[index - 1]);
        break;
      case Mesh.CAP_ALL:
        shapePaths[0] = capPath(shapePaths[2]);
        shapePaths[1] = shapePaths[2];
        shapePaths[index] = shapePaths[index - 1];
        shapePaths[index + 1] = capPath(shapePaths[index - 1]);
        break;
      default:
        break;
    }
    return shapePaths;
  };
  let path3D;
  let pathArray;
  if (instance) {
    const storage = instance._creationDataStorage;
    path3D = firstNormal ? storage.path3D.update(curve, firstNormal) : storage.path3D.update(curve);
    pathArray = extrusionPathArray(shape, curve, storage.path3D, storage.pathArray, scale, rotation, scaleFunction, rotateFunction, storage.cap, custom, adjustFrame);
    instance = CreateRibbon("", { pathArray, closeArray: false, closePath: false, offset: 0, updatable: false, sideOrientation: 0, instance }, scene || void 0);
    return instance;
  }
  path3D = firstNormal ? new Path3D(curve, firstNormal) : new Path3D(curve);
  const newShapePaths = new Array();
  cap = cap < 0 || cap > 3 ? 0 : cap;
  pathArray = extrusionPathArray(shape, curve, path3D, newShapePaths, scale, rotation, scaleFunction, rotateFunction, cap, custom, adjustFrame);
  const extrudedGeneric = CreateRibbon(name, {
    pathArray,
    closeArray: rbCA,
    closePath: rbCP,
    updatable: updtbl,
    sideOrientation: side,
    invertUV,
    frontUVs: frontUVs || void 0,
    backUVs: backUVs || void 0
  }, scene);
  extrudedGeneric._creationDataStorage.pathArray = pathArray;
  extrudedGeneric._creationDataStorage.path3D = path3D;
  extrudedGeneric._creationDataStorage.cap = cap;
  return extrudedGeneric;
}
Mesh.ExtrudeShape = (name, shape, path, scale, rotation, cap, scene = null, updatable, sideOrientation, instance) => {
  const options = {
    shape,
    path,
    scale,
    rotation,
    cap: cap === 0 ? 0 : cap || Mesh.NO_CAP,
    sideOrientation,
    instance,
    updatable
  };
  return ExtrudeShape(name, options, scene);
};
Mesh.ExtrudeShapeCustom = (name, shape, path, scaleFunction, rotationFunction, ribbonCloseArray, ribbonClosePath, cap, scene, updatable, sideOrientation, instance) => {
  const options = {
    shape,
    path,
    scaleFunction,
    rotationFunction,
    ribbonCloseArray,
    ribbonClosePath,
    cap: cap === 0 ? 0 : cap || Mesh.NO_CAP,
    sideOrientation,
    instance,
    updatable
  };
  return ExtrudeShapeCustom(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/latheBuilder.js
function CreateLathe(name, options, scene = null) {
  const arc = options.arc ? options.arc <= 0 || options.arc > 1 ? 1 : options.arc : 1;
  const closed = options.closed === void 0 ? true : options.closed;
  const shape = options.shape;
  const radius = options.radius || 1;
  const tessellation = options.tessellation || 64;
  const clip = options.clip || 0;
  const updatable = options.updatable;
  const sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  const cap = options.cap || Mesh.NO_CAP;
  const pi2 = Math.PI * 2;
  const paths = [];
  const invertUV = options.invertUV || false;
  let i = 0;
  let p = 0;
  const step = pi2 / tessellation * arc;
  let rotated;
  let path;
  for (i = 0; i <= tessellation - clip; i++) {
    path = [];
    if (cap == Mesh.CAP_START || cap == Mesh.CAP_ALL) {
      path.push(new Vector3(0, shape[0].y, 0));
      path.push(new Vector3(Math.cos(i * step) * shape[0].x * radius, shape[0].y, Math.sin(i * step) * shape[0].x * radius));
    }
    for (p = 0; p < shape.length; p++) {
      rotated = new Vector3(Math.cos(i * step) * shape[p].x * radius, shape[p].y, Math.sin(i * step) * shape[p].x * radius);
      path.push(rotated);
    }
    if (cap == Mesh.CAP_END || cap == Mesh.CAP_ALL) {
      path.push(new Vector3(Math.cos(i * step) * shape[shape.length - 1].x * radius, shape[shape.length - 1].y, Math.sin(i * step) * shape[shape.length - 1].x * radius));
      path.push(new Vector3(0, shape[shape.length - 1].y, 0));
    }
    paths.push(path);
  }
  const lathe = CreateRibbon(name, { pathArray: paths, closeArray: closed, sideOrientation, updatable, invertUV, frontUVs: options.frontUVs, backUVs: options.backUVs }, scene);
  return lathe;
}
Mesh.CreateLathe = (name, shape, radius, tessellation, scene, updatable, sideOrientation) => {
  const options = {
    shape,
    radius,
    tessellation,
    sideOrientation,
    updatable
  };
  return CreateLathe(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/planeBuilder.js
function CreatePlaneVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  const width = options.width !== void 0 ? options.width : options.size !== void 0 ? options.size : 1;
  const height = options.height !== void 0 ? options.height : options.size !== void 0 ? options.size : 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  positions.push(-halfWidth, -halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(0, useOpenGLOrientationForUV ? 1 : 0);
  positions.push(halfWidth, -halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(1, useOpenGLOrientationForUV ? 1 : 0);
  positions.push(halfWidth, halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(1, useOpenGLOrientationForUV ? 0 : 1);
  positions.push(-halfWidth, halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(0, useOpenGLOrientationForUV ? 0 : 1);
  indices.push(0);
  indices.push(1);
  indices.push(2);
  indices.push(0);
  indices.push(2);
  indices.push(3);
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreatePlane(name, options = {}, scene = null) {
  const plane = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  plane._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreatePlaneVertexData(options);
  vertexData.applyToMesh(plane, options.updatable);
  if (options.sourcePlane) {
    plane.translate(options.sourcePlane.normal, -options.sourcePlane.d);
    plane.setDirection(options.sourcePlane.normal.scale(-1));
  }
  return plane;
}
VertexData.CreatePlane = CreatePlaneVertexData;
Mesh.CreatePlane = (name, size, scene, updatable, sideOrientation) => {
  const options = {
    size,
    width: size,
    height: size,
    sideOrientation,
    updatable
  };
  return CreatePlane(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/tubeBuilder.js
function CreateTube(name, options, scene = null) {
  const path = options.path;
  let instance = options.instance;
  let radius = 1;
  if (options.radius !== void 0) {
    radius = options.radius;
  } else if (instance) {
    radius = instance._creationDataStorage.radius;
  }
  const tessellation = options.tessellation || 64 | 0;
  const radiusFunction = options.radiusFunction || null;
  let cap = options.cap || Mesh.NO_CAP;
  const invertUV = options.invertUV || false;
  const updatable = options.updatable;
  const sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  options.arc = options.arc && (options.arc <= 0 || options.arc > 1) ? 1 : options.arc || 1;
  const tubePathArray = (path2, path3D2, circlePaths, radius2, tessellation2, radiusFunction2, cap2, arc) => {
    const tangents = path3D2.getTangents();
    const normals = path3D2.getNormals();
    const distances = path3D2.getDistances();
    const pi2 = Math.PI * 2;
    const step = pi2 / tessellation2 * arc;
    const returnRadius = () => radius2;
    const radiusFunctionFinal = radiusFunction2 || returnRadius;
    let circlePath;
    let rad;
    let normal;
    let rotated;
    const rotationMatrix = TmpVectors.Matrix[0];
    let index = cap2 === Mesh.NO_CAP || cap2 === Mesh.CAP_END ? 0 : 2;
    for (let i = 0; i < path2.length; i++) {
      rad = radiusFunctionFinal(i, distances[i]);
      circlePath = Array();
      normal = normals[i];
      for (let t = 0; t < tessellation2; t++) {
        Matrix.RotationAxisToRef(tangents[i], step * t, rotationMatrix);
        rotated = circlePath[t] ? circlePath[t] : Vector3.Zero();
        Vector3.TransformCoordinatesToRef(normal, rotationMatrix, rotated);
        rotated.scaleInPlace(rad).addInPlace(path2[i]);
        circlePath[t] = rotated;
      }
      circlePaths[index] = circlePath;
      index++;
    }
    const capPath = (nbPoints, pathIndex) => {
      const pointCap = Array();
      for (let i = 0; i < nbPoints; i++) {
        pointCap.push(path2[pathIndex]);
      }
      return pointCap;
    };
    switch (cap2) {
      case Mesh.NO_CAP:
        break;
      case Mesh.CAP_START:
        circlePaths[0] = capPath(tessellation2, 0);
        circlePaths[1] = circlePaths[2].slice(0);
        break;
      case Mesh.CAP_END:
        circlePaths[index] = circlePaths[index - 1].slice(0);
        circlePaths[index + 1] = capPath(tessellation2, path2.length - 1);
        break;
      case Mesh.CAP_ALL:
        circlePaths[0] = capPath(tessellation2, 0);
        circlePaths[1] = circlePaths[2].slice(0);
        circlePaths[index] = circlePaths[index - 1].slice(0);
        circlePaths[index + 1] = capPath(tessellation2, path2.length - 1);
        break;
      default:
        break;
    }
    return circlePaths;
  };
  let path3D;
  let pathArray;
  if (instance) {
    const storage = instance._creationDataStorage;
    const arc = options.arc || storage.arc;
    path3D = storage.path3D.update(path);
    pathArray = tubePathArray(path, path3D, storage.pathArray, radius, storage.tessellation, radiusFunction, storage.cap, arc);
    instance = CreateRibbon("", { pathArray, instance });
    storage.path3D = path3D;
    storage.pathArray = pathArray;
    storage.arc = arc;
    storage.radius = radius;
    return instance;
  }
  path3D = new Path3D(path);
  const newPathArray = new Array();
  cap = cap < 0 || cap > 3 ? 0 : cap;
  pathArray = tubePathArray(path, path3D, newPathArray, radius, tessellation, radiusFunction, cap, options.arc);
  const tube = CreateRibbon(name, {
    pathArray,
    closePath: true,
    closeArray: false,
    updatable,
    sideOrientation,
    invertUV,
    frontUVs: options.frontUVs,
    backUVs: options.backUVs
  }, scene);
  tube._creationDataStorage.pathArray = pathArray;
  tube._creationDataStorage.path3D = path3D;
  tube._creationDataStorage.tessellation = tessellation;
  tube._creationDataStorage.cap = cap;
  tube._creationDataStorage.arc = options.arc;
  tube._creationDataStorage.radius = radius;
  return tube;
}
Mesh.CreateTube = (name, path, radius, tessellation, radiusFunction, cap, scene, updatable, sideOrientation, instance) => {
  const options = {
    path,
    radius,
    tessellation,
    radiusFunction,
    arc: 1,
    cap,
    updatable,
    sideOrientation,
    instance
  };
  return CreateTube(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/polyhedronBuilder.js
function CreatePolyhedronVertexData(options) {
  const polyhedra = [];
  polyhedra[0] = {
    vertex: [
      [0, 0, 1.732051],
      [1.632993, 0, -0.5773503],
      [-0.8164966, 1.414214, -0.5773503],
      [-0.8164966, -1.414214, -0.5773503]
    ],
    face: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 1],
      [1, 3, 2]
    ]
  };
  polyhedra[1] = {
    vertex: [
      [0, 0, 1.414214],
      [1.414214, 0, 0],
      [0, 1.414214, 0],
      [-1.414214, 0, 0],
      [0, -1.414214, 0],
      [0, 0, -1.414214]
    ],
    face: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1],
      [1, 4, 5],
      [1, 5, 2],
      [2, 5, 3],
      [3, 5, 4]
    ]
  };
  polyhedra[2] = {
    vertex: [
      [0, 0, 1.070466],
      [0.7136442, 0, 0.7978784],
      [-0.3568221, 0.618034, 0.7978784],
      [-0.3568221, -0.618034, 0.7978784],
      [0.7978784, 0.618034, 0.3568221],
      [0.7978784, -0.618034, 0.3568221],
      [-0.9341724, 0.381966, 0.3568221],
      [0.1362939, 1, 0.3568221],
      [0.1362939, -1, 0.3568221],
      [-0.9341724, -0.381966, 0.3568221],
      [0.9341724, 0.381966, -0.3568221],
      [0.9341724, -0.381966, -0.3568221],
      [-0.7978784, 0.618034, -0.3568221],
      [-0.1362939, 1, -0.3568221],
      [-0.1362939, -1, -0.3568221],
      [-0.7978784, -0.618034, -0.3568221],
      [0.3568221, 0.618034, -0.7978784],
      [0.3568221, -0.618034, -0.7978784],
      [-0.7136442, 0, -0.7978784],
      [0, 0, -1.070466]
    ],
    face: [
      [0, 1, 4, 7, 2],
      [0, 2, 6, 9, 3],
      [0, 3, 8, 5, 1],
      [1, 5, 11, 10, 4],
      [2, 7, 13, 12, 6],
      [3, 9, 15, 14, 8],
      [4, 10, 16, 13, 7],
      [5, 8, 14, 17, 11],
      [6, 12, 18, 15, 9],
      [10, 11, 17, 19, 16],
      [12, 13, 16, 19, 18],
      [14, 15, 18, 19, 17]
    ]
  };
  polyhedra[3] = {
    vertex: [
      [0, 0, 1.175571],
      [1.051462, 0, 0.5257311],
      [0.3249197, 1, 0.5257311],
      [-0.8506508, 0.618034, 0.5257311],
      [-0.8506508, -0.618034, 0.5257311],
      [0.3249197, -1, 0.5257311],
      [0.8506508, 0.618034, -0.5257311],
      [0.8506508, -0.618034, -0.5257311],
      [-0.3249197, 1, -0.5257311],
      [-1.051462, 0, -0.5257311],
      [-0.3249197, -1, -0.5257311],
      [0, 0, -1.175571]
    ],
    face: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 5],
      [0, 5, 1],
      [1, 5, 7],
      [1, 7, 6],
      [1, 6, 2],
      [2, 6, 8],
      [2, 8, 3],
      [3, 8, 9],
      [3, 9, 4],
      [4, 9, 10],
      [4, 10, 5],
      [5, 10, 7],
      [6, 7, 11],
      [6, 11, 8],
      [7, 10, 11],
      [8, 11, 9],
      [9, 11, 10]
    ]
  };
  polyhedra[4] = {
    vertex: [
      [0, 0, 1.070722],
      [0.7148135, 0, 0.7971752],
      [-0.104682, 0.7071068, 0.7971752],
      [-0.6841528, 0.2071068, 0.7971752],
      [-0.104682, -0.7071068, 0.7971752],
      [0.6101315, 0.7071068, 0.5236279],
      [1.04156, 0.2071068, 0.1367736],
      [0.6101315, -0.7071068, 0.5236279],
      [-0.3574067, 1, 0.1367736],
      [-0.7888348, -0.5, 0.5236279],
      [-0.9368776, 0.5, 0.1367736],
      [-0.3574067, -1, 0.1367736],
      [0.3574067, 1, -0.1367736],
      [0.9368776, -0.5, -0.1367736],
      [0.7888348, 0.5, -0.5236279],
      [0.3574067, -1, -0.1367736],
      [-0.6101315, 0.7071068, -0.5236279],
      [-1.04156, -0.2071068, -0.1367736],
      [-0.6101315, -0.7071068, -0.5236279],
      [0.104682, 0.7071068, -0.7971752],
      [0.6841528, -0.2071068, -0.7971752],
      [0.104682, -0.7071068, -0.7971752],
      [-0.7148135, 0, -0.7971752],
      [0, 0, -1.070722]
    ],
    face: [
      [0, 2, 3],
      [1, 6, 5],
      [4, 9, 11],
      [7, 15, 13],
      [8, 16, 10],
      [12, 14, 19],
      [17, 22, 18],
      [20, 21, 23],
      [0, 1, 5, 2],
      [0, 3, 9, 4],
      [0, 4, 7, 1],
      [1, 7, 13, 6],
      [2, 5, 12, 8],
      [2, 8, 10, 3],
      [3, 10, 17, 9],
      [4, 11, 15, 7],
      [5, 6, 14, 12],
      [6, 13, 20, 14],
      [8, 12, 19, 16],
      [9, 17, 18, 11],
      [10, 16, 22, 17],
      [11, 18, 21, 15],
      [13, 15, 21, 20],
      [14, 20, 23, 19],
      [16, 19, 23, 22],
      [18, 22, 23, 21]
    ]
  };
  polyhedra[5] = {
    vertex: [
      [0, 0, 1.322876],
      [1.309307, 0, 0.1889822],
      [-0.9819805, 0.8660254, 0.1889822],
      [0.1636634, -1.299038, 0.1889822],
      [0.3273268, 0.8660254, -0.9449112],
      [-0.8183171, -0.4330127, -0.9449112]
    ],
    face: [
      [0, 3, 1],
      [2, 4, 5],
      [0, 1, 4, 2],
      [0, 2, 5, 3],
      [1, 3, 5, 4]
    ]
  };
  polyhedra[6] = {
    vertex: [
      [0, 0, 1.159953],
      [1.013464, 0, 0.5642542],
      [-0.3501431, 0.9510565, 0.5642542],
      [-0.7715208, -0.6571639, 0.5642542],
      [0.6633206, 0.9510565, -0.03144481],
      [0.8682979, -0.6571639, -0.3996071],
      [-1.121664, 0.2938926, -0.03144481],
      [-0.2348831, -1.063314, -0.3996071],
      [0.5181548, 0.2938926, -0.9953061],
      [-0.5850262, -0.112257, -0.9953061]
    ],
    face: [
      [0, 1, 4, 2],
      [0, 2, 6, 3],
      [1, 5, 8, 4],
      [3, 6, 9, 7],
      [5, 7, 9, 8],
      [0, 3, 7, 5, 1],
      [2, 4, 8, 9, 6]
    ]
  };
  polyhedra[7] = {
    vertex: [
      [0, 0, 1.118034],
      [0.8944272, 0, 0.6708204],
      [-0.2236068, 0.8660254, 0.6708204],
      [-0.7826238, -0.4330127, 0.6708204],
      [0.6708204, 0.8660254, 0.2236068],
      [1.006231, -0.4330127, -0.2236068],
      [-1.006231, 0.4330127, 0.2236068],
      [-0.6708204, -0.8660254, -0.2236068],
      [0.7826238, 0.4330127, -0.6708204],
      [0.2236068, -0.8660254, -0.6708204],
      [-0.8944272, 0, -0.6708204],
      [0, 0, -1.118034]
    ],
    face: [
      [0, 1, 4, 2],
      [0, 2, 6, 3],
      [1, 5, 8, 4],
      [3, 6, 10, 7],
      [5, 9, 11, 8],
      [7, 10, 11, 9],
      [0, 3, 7, 9, 5, 1],
      [2, 4, 8, 11, 10, 6]
    ]
  };
  polyhedra[8] = {
    vertex: [
      [-0.729665, 0.670121, 0.319155],
      [-0.655235, -0.29213, -0.754096],
      [-0.093922, -0.607123, 0.537818],
      [0.702196, 0.595691, 0.485187],
      [0.776626, -0.36656, -0.588064]
    ],
    face: [
      [1, 4, 2],
      [0, 1, 2],
      [3, 0, 2],
      [4, 3, 2],
      [4, 1, 0, 3]
    ]
  };
  polyhedra[9] = {
    vertex: [
      [-0.868849, -0.100041, 0.61257],
      [-0.329458, 0.976099, 0.28078],
      [-0.26629, -0.013796, -0.477654],
      [-0.13392, -1.034115, 0.229829],
      [0.738834, 0.707117, -0.307018],
      [0.859683, -0.535264, -0.338508]
    ],
    face: [
      [3, 0, 2],
      [5, 3, 2],
      [4, 5, 2],
      [1, 4, 2],
      [0, 1, 2],
      [0, 3, 5, 4, 1]
    ]
  };
  polyhedra[10] = {
    vertex: [
      [-0.610389, 0.243975, 0.531213],
      [-0.187812, -0.48795, -0.664016],
      [-0.187812, 0.9759, -0.664016],
      [0.187812, -0.9759, 0.664016],
      [0.798201, 0.243975, 0.132803]
    ],
    face: [
      [1, 3, 0],
      [3, 4, 0],
      [3, 1, 4],
      [0, 2, 1],
      [0, 4, 2],
      [2, 4, 1]
    ]
  };
  polyhedra[11] = {
    vertex: [
      [-1.028778, 0.392027, -0.048786],
      [-0.640503, -0.646161, 0.621837],
      [-0.125162, -0.395663, -0.540059],
      [4683e-6, 0.888447, -0.651988],
      [0.125161, 0.395663, 0.540059],
      [0.632925, -0.791376, 0.433102],
      [1.031672, 0.157063, -0.354165]
    ],
    face: [
      [3, 2, 0],
      [2, 1, 0],
      [2, 5, 1],
      [0, 4, 3],
      [0, 1, 4],
      [4, 1, 5],
      [2, 3, 6],
      [3, 4, 6],
      [5, 2, 6],
      [4, 5, 6]
    ]
  };
  polyhedra[12] = {
    vertex: [
      [-0.669867, 0.334933, -0.529576],
      [-0.669867, 0.334933, 0.529577],
      [-0.4043, 1.212901, 0],
      [-0.334933, -0.669867, -0.529576],
      [-0.334933, -0.669867, 0.529577],
      [0.334933, 0.669867, -0.529576],
      [0.334933, 0.669867, 0.529577],
      [0.4043, -1.212901, 0],
      [0.669867, -0.334933, -0.529576],
      [0.669867, -0.334933, 0.529577]
    ],
    face: [
      [8, 9, 7],
      [6, 5, 2],
      [3, 8, 7],
      [5, 0, 2],
      [4, 3, 7],
      [0, 1, 2],
      [9, 4, 7],
      [1, 6, 2],
      [9, 8, 5, 6],
      [8, 3, 0, 5],
      [3, 4, 1, 0],
      [4, 9, 6, 1]
    ]
  };
  polyhedra[13] = {
    vertex: [
      [-0.931836, 0.219976, -0.264632],
      [-0.636706, 0.318353, 0.692816],
      [-0.613483, -0.735083, -0.264632],
      [-0.326545, 0.979634, 0],
      [-0.318353, -0.636706, 0.692816],
      [-0.159176, 0.477529, -0.856368],
      [0.159176, -0.477529, -0.856368],
      [0.318353, 0.636706, 0.692816],
      [0.326545, -0.979634, 0],
      [0.613482, 0.735082, -0.264632],
      [0.636706, -0.318353, 0.692816],
      [0.931835, -0.219977, -0.264632]
    ],
    face: [
      [11, 10, 8],
      [7, 9, 3],
      [6, 11, 8],
      [9, 5, 3],
      [2, 6, 8],
      [5, 0, 3],
      [4, 2, 8],
      [0, 1, 3],
      [10, 4, 8],
      [1, 7, 3],
      [10, 11, 9, 7],
      [11, 6, 5, 9],
      [6, 2, 0, 5],
      [2, 4, 1, 0],
      [4, 10, 7, 1]
    ]
  };
  polyhedra[14] = {
    vertex: [
      [-0.93465, 0.300459, -0.271185],
      [-0.838689, -0.260219, -0.516017],
      [-0.711319, 0.717591, 0.128359],
      [-0.710334, -0.156922, 0.080946],
      [-0.599799, 0.556003, -0.725148],
      [-0.503838, -4675e-6, -0.969981],
      [-0.487004, 0.26021, 0.48049],
      [-0.460089, -0.750282, -0.512622],
      [-0.376468, 0.973135, -0.325605],
      [-0.331735, -0.646985, 0.084342],
      [-0.254001, 0.831847, 0.530001],
      [-0.125239, -0.494738, -0.966586],
      [0.029622, 0.027949, 0.730817],
      [0.056536, -0.982543, -0.262295],
      [0.08085, 1.087391, 0.076037],
      [0.125583, -0.532729, 0.485984],
      [0.262625, 0.599586, 0.780328],
      [0.391387, -0.726999, -0.716259],
      [0.513854, -0.868287, 0.139347],
      [0.597475, 0.85513, 0.326364],
      [0.641224, 0.109523, 0.783723],
      [0.737185, -0.451155, 0.538891],
      [0.848705, -0.612742, -0.314616],
      [0.976075, 0.365067, 0.32976],
      [1.072036, -0.19561, 0.084927]
    ],
    face: [
      [15, 18, 21],
      [12, 20, 16],
      [6, 10, 2],
      [3, 0, 1],
      [9, 7, 13],
      [2, 8, 4, 0],
      [0, 4, 5, 1],
      [1, 5, 11, 7],
      [7, 11, 17, 13],
      [13, 17, 22, 18],
      [18, 22, 24, 21],
      [21, 24, 23, 20],
      [20, 23, 19, 16],
      [16, 19, 14, 10],
      [10, 14, 8, 2],
      [15, 9, 13, 18],
      [12, 15, 21, 20],
      [6, 12, 16, 10],
      [3, 6, 2, 0],
      [9, 3, 1, 7],
      [9, 15, 12, 6, 3],
      [22, 17, 11, 5, 4, 8, 14, 19, 23, 24]
    ]
  };
  const type = options.type && (options.type < 0 || options.type >= polyhedra.length) ? 0 : options.type || 0;
  const size = options.size;
  const sizeX = options.sizeX || size || 1;
  const sizeY = options.sizeY || size || 1;
  const sizeZ = options.sizeZ || size || 1;
  const data = options.custom || polyhedra[type];
  const nbfaces = data.face.length;
  const faceUV = options.faceUV || new Array(nbfaces);
  const faceColors = options.faceColors;
  const flat = options.flat === void 0 ? true : options.flat;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const positions = [];
  const indices = [];
  const normals = [];
  const uvs = [];
  const colors = [];
  let index = 0;
  let faceIdx = 0;
  const indexes = [];
  let i = 0;
  let f = 0;
  let u, v, ang, x, y, tmp;
  if (flat) {
    for (f = 0; f < nbfaces; f++) {
      if (faceColors && faceColors[f] === void 0) {
        faceColors[f] = new Color4(1, 1, 1, 1);
      }
      if (faceUV && faceUV[f] === void 0) {
        faceUV[f] = new Vector4(0, 0, 1, 1);
      }
    }
  }
  if (!flat) {
    for (i = 0; i < data.vertex.length; i++) {
      positions.push(data.vertex[i][0] * sizeX, data.vertex[i][1] * sizeY, data.vertex[i][2] * sizeZ);
      uvs.push(0, useOpenGLOrientationForUV ? 1 : 0);
    }
    for (f = 0; f < nbfaces; f++) {
      for (i = 0; i < data.face[f].length - 2; i++) {
        indices.push(data.face[f][0], data.face[f][i + 2], data.face[f][i + 1]);
      }
    }
  } else {
    for (f = 0; f < nbfaces; f++) {
      const fl = data.face[f].length;
      ang = 2 * Math.PI / fl;
      x = 0.5 * Math.tan(ang / 2);
      y = 0.5;
      for (i = 0; i < fl; i++) {
        positions.push(data.vertex[data.face[f][i]][0] * sizeX, data.vertex[data.face[f][i]][1] * sizeY, data.vertex[data.face[f][i]][2] * sizeZ);
        indexes.push(index);
        index++;
        u = faceUV[f].x + (faceUV[f].z - faceUV[f].x) * (0.5 + x);
        v = faceUV[f].y + (faceUV[f].w - faceUV[f].y) * (y - 0.5);
        uvs.push(u, useOpenGLOrientationForUV ? 1 - v : v);
        tmp = x * Math.cos(ang) - y * Math.sin(ang);
        y = x * Math.sin(ang) + y * Math.cos(ang);
        x = tmp;
        if (faceColors) {
          colors.push(faceColors[f].r, faceColors[f].g, faceColors[f].b, faceColors[f].a);
        }
      }
      for (i = 0; i < fl - 2; i++) {
        indices.push(indexes[0 + faceIdx], indexes[i + 2 + faceIdx], indexes[i + 1 + faceIdx]);
      }
      faceIdx += fl;
    }
  }
  VertexData.ComputeNormals(positions, indices, normals);
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.positions = positions;
  vertexData.indices = indices;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  if (faceColors && flat) {
    vertexData.colors = colors;
  }
  return vertexData;
}
function CreatePolyhedron(name, options = {}, scene = null) {
  const polyhedron = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  polyhedron._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreatePolyhedronVertexData(options);
  vertexData.applyToMesh(polyhedron, options.updatable);
  return polyhedron;
}
VertexData.CreatePolyhedron = CreatePolyhedronVertexData;
Mesh.CreatePolyhedron = (name, options, scene) => {
  return CreatePolyhedron(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/icoSphereBuilder.js
function CreateIcoSphereVertexData(options) {
  const sideOrientation = options.sideOrientation || VertexData.DEFAULTSIDE;
  const radius = options.radius || 1;
  const flat = options.flat === void 0 ? true : options.flat;
  const subdivisions = (options.subdivisions || 4) | 0;
  const radiusX = options.radiusX || radius;
  const radiusY = options.radiusY || radius;
  const radiusZ = options.radiusZ || radius;
  const t = (1 + Math.sqrt(5)) / 2;
  const icoVertices = [
    -1,
    t,
    -0,
    1,
    t,
    0,
    -1,
    -t,
    0,
    1,
    -t,
    0,
    // v0-3
    0,
    -1,
    -t,
    0,
    1,
    -t,
    0,
    -1,
    t,
    0,
    1,
    t,
    // v4-7
    t,
    0,
    1,
    t,
    0,
    -1,
    -t,
    0,
    1,
    -t,
    0,
    -1
    // v8-11
  ];
  const ico_indices = [
    0,
    11,
    5,
    0,
    5,
    1,
    0,
    1,
    7,
    0,
    7,
    10,
    12,
    22,
    23,
    1,
    5,
    20,
    5,
    11,
    4,
    23,
    22,
    13,
    22,
    18,
    6,
    7,
    1,
    8,
    14,
    21,
    4,
    14,
    4,
    2,
    16,
    13,
    6,
    15,
    6,
    19,
    3,
    8,
    9,
    4,
    21,
    5,
    13,
    17,
    23,
    6,
    13,
    22,
    19,
    6,
    18,
    9,
    8,
    1
  ];
  const vertices_unalias_id = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    // vertex alias
    0,
    // 12: 0 + 12
    2,
    // 13: 2 + 11
    3,
    // 14: 3 + 11
    3,
    // 15: 3 + 12
    3,
    // 16: 3 + 13
    4,
    // 17: 4 + 13
    7,
    // 18: 7 + 11
    8,
    // 19: 8 + 11
    9,
    // 20: 9 + 11
    9,
    // 21: 9 + 12
    10,
    // 22: A + 12
    11
    // 23: B + 12
  ];
  const ico_vertexuv = [
    5,
    1,
    3,
    1,
    6,
    4,
    0,
    0,
    // v0-3
    5,
    3,
    4,
    2,
    2,
    2,
    4,
    0,
    // v4-7
    2,
    0,
    1,
    1,
    6,
    0,
    6,
    2,
    // v8-11
    // vertex alias (for same vertex on different faces)
    0,
    4,
    // 12: 0 + 12
    3,
    3,
    // 13: 2 + 11
    4,
    4,
    // 14: 3 + 11
    3,
    1,
    // 15: 3 + 12
    4,
    2,
    // 16: 3 + 13
    4,
    4,
    // 17: 4 + 13
    0,
    2,
    // 18: 7 + 11
    1,
    1,
    // 19: 8 + 11
    2,
    2,
    // 20: 9 + 11
    3,
    3,
    // 21: 9 + 12
    1,
    3,
    // 22: A + 12
    2,
    4
    // 23: B + 12
  ];
  const ustep = 138 / 1024;
  const vstep = 239 / 1024;
  const uoffset = 60 / 1024;
  const voffset = 26 / 1024;
  const island_u_offset = -40 / 1024;
  const island_v_offset = 20 / 1024;
  const island = [
    0,
    0,
    0,
    0,
    1,
    //  0 - 4
    0,
    0,
    1,
    1,
    0,
    //  5 - 9
    0,
    0,
    1,
    1,
    0,
    //  10 - 14
    0,
    1,
    1,
    1,
    0
    //  15 - 19
  ];
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  let current_indice = 0;
  const face_vertex_pos = new Array(3);
  const face_vertex_uv = new Array(3);
  let v012;
  for (v012 = 0; v012 < 3; v012++) {
    face_vertex_pos[v012] = Vector3.Zero();
    face_vertex_uv[v012] = Vector2.Zero();
  }
  for (let face = 0; face < 20; face++) {
    for (v012 = 0; v012 < 3; v012++) {
      const v_id = ico_indices[3 * face + v012];
      face_vertex_pos[v012].copyFromFloats(icoVertices[3 * vertices_unalias_id[v_id]], icoVertices[3 * vertices_unalias_id[v_id] + 1], icoVertices[3 * vertices_unalias_id[v_id] + 2]);
      face_vertex_pos[v012].normalize();
      face_vertex_uv[v012].copyFromFloats(ico_vertexuv[2 * v_id] * ustep + uoffset + island[face] * island_u_offset, ico_vertexuv[2 * v_id + 1] * vstep + voffset + island[face] * island_v_offset);
    }
    const interp_vertex = (i1, i2, c1, c2) => {
      const pos_x0 = Vector3.Lerp(face_vertex_pos[0], face_vertex_pos[2], i2 / subdivisions);
      const pos_x1 = Vector3.Lerp(face_vertex_pos[1], face_vertex_pos[2], i2 / subdivisions);
      const pos_interp = subdivisions === i2 ? face_vertex_pos[2] : Vector3.Lerp(pos_x0, pos_x1, i1 / (subdivisions - i2));
      pos_interp.normalize();
      let vertex_normal;
      if (flat) {
        const centroid_x0 = Vector3.Lerp(face_vertex_pos[0], face_vertex_pos[2], c2 / subdivisions);
        const centroid_x1 = Vector3.Lerp(face_vertex_pos[1], face_vertex_pos[2], c2 / subdivisions);
        vertex_normal = Vector3.Lerp(centroid_x0, centroid_x1, c1 / (subdivisions - c2));
      } else {
        vertex_normal = new Vector3(pos_interp.x, pos_interp.y, pos_interp.z);
      }
      vertex_normal.x /= radiusX;
      vertex_normal.y /= radiusY;
      vertex_normal.z /= radiusZ;
      vertex_normal.normalize();
      const uv_x0 = Vector2.Lerp(face_vertex_uv[0], face_vertex_uv[2], i2 / subdivisions);
      const uv_x1 = Vector2.Lerp(face_vertex_uv[1], face_vertex_uv[2], i2 / subdivisions);
      const uv_interp = subdivisions === i2 ? face_vertex_uv[2] : Vector2.Lerp(uv_x0, uv_x1, i1 / (subdivisions - i2));
      positions.push(pos_interp.x * radiusX, pos_interp.y * radiusY, pos_interp.z * radiusZ);
      normals.push(vertex_normal.x, vertex_normal.y, vertex_normal.z);
      uvs.push(uv_interp.x, useOpenGLOrientationForUV ? 1 - uv_interp.y : uv_interp.y);
      indices.push(current_indice);
      current_indice++;
    };
    for (let i2 = 0; i2 < subdivisions; i2++) {
      for (let i1 = 0; i1 + i2 < subdivisions; i1++) {
        interp_vertex(i1, i2, i1 + 1 / 3, i2 + 1 / 3);
        interp_vertex(i1 + 1, i2, i1 + 1 / 3, i2 + 1 / 3);
        interp_vertex(i1, i2 + 1, i1 + 1 / 3, i2 + 1 / 3);
        if (i1 + i2 + 1 < subdivisions) {
          interp_vertex(i1 + 1, i2, i1 + 2 / 3, i2 + 2 / 3);
          interp_vertex(i1 + 1, i2 + 1, i1 + 2 / 3, i2 + 2 / 3);
          interp_vertex(i1, i2 + 1, i1 + 2 / 3, i2 + 2 / 3);
        }
      }
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateIcoSphere(name, options = {}, scene = null) {
  const sphere = new Mesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  sphere._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateIcoSphereVertexData(options);
  vertexData.applyToMesh(sphere, options.updatable);
  return sphere;
}
VertexData.CreateIcoSphere = CreateIcoSphereVertexData;
Mesh.CreateIcoSphere = (name, options, scene) => {
  return CreateIcoSphere(name, options, scene);
};

// node_modules/@babylonjs/core/Meshes/Builders/decalBuilder.js
var xpAxis = new Vector3(1, 0, 0);
var xnAxis = new Vector3(-1, 0, 0);
var ypAxis = new Vector3(0, 1, 0);
var ynAxis = new Vector3(0, -1, 0);
var zpAxis = new Vector3(0, 0, 1);
var znAxis = new Vector3(0, 0, -1);
var DecalVertex = class _DecalVertex {
  constructor(position = Vector3.Zero(), normal = Vector3.Up(), uv = Vector2.Zero(), vertexIdx = 0, vertexIdxForBones = 0, localPositionOverride = null, localNormalOverride = null, matrixIndicesOverride = null, matrixWeightsOverride = null) {
    this.position = position;
    this.normal = normal;
    this.uv = uv;
    this.vertexIdx = vertexIdx;
    this.vertexIdxForBones = vertexIdxForBones;
    this.localPositionOverride = localPositionOverride;
    this.localNormalOverride = localNormalOverride;
    this.matrixIndicesOverride = matrixIndicesOverride;
    this.matrixWeightsOverride = matrixWeightsOverride;
  }
  clone() {
    var _a, _b, _c, _d;
    return new _DecalVertex(this.position.clone(), this.normal.clone(), this.uv.clone(), this.vertexIdx, this.vertexIdxForBones, (_a = this.localPositionOverride) == null ? void 0 : _a.slice(), (_b = this.localNormalOverride) == null ? void 0 : _b.slice(), (_c = this.matrixIndicesOverride) == null ? void 0 : _c.slice(), (_d = this.matrixWeightsOverride) == null ? void 0 : _d.slice());
  }
};
function CreateDecal(name, sourceMesh, options) {
  var _a, _b, _c, _d;
  const hasSkeleton = !!sourceMesh.skeleton;
  const useLocalComputation = options.localMode || hasSkeleton;
  const indices = sourceMesh.getIndices();
  const positions = hasSkeleton ? sourceMesh.getPositionData(true, true) : sourceMesh.getVerticesData(VertexBuffer.PositionKind);
  const normals = hasSkeleton ? sourceMesh.getNormalsData(true, true) : sourceMesh.getVerticesData(VertexBuffer.NormalKind);
  const localPositions = useLocalComputation ? hasSkeleton ? sourceMesh.getVerticesData(VertexBuffer.PositionKind) : positions : null;
  const localNormals = useLocalComputation ? hasSkeleton ? sourceMesh.getVerticesData(VertexBuffer.NormalKind) : normals : null;
  const uvs = sourceMesh.getVerticesData(VertexBuffer.UVKind);
  const matIndices = hasSkeleton ? sourceMesh.getVerticesData(VertexBuffer.MatricesIndicesKind) : null;
  const matWeights = hasSkeleton ? sourceMesh.getVerticesData(VertexBuffer.MatricesWeightsKind) : null;
  const matIndicesExtra = hasSkeleton ? sourceMesh.getVerticesData(VertexBuffer.MatricesIndicesExtraKind) : null;
  const matWeightsExtra = hasSkeleton ? sourceMesh.getVerticesData(VertexBuffer.MatricesWeightsExtraKind) : null;
  const position = options.position || Vector3.Zero();
  let normal = options.normal || Vector3.Up();
  const size = options.size || Vector3.One();
  const angle = options.angle || 0;
  if (!normal) {
    const target = new Vector3(0, 0, 1);
    const camera = sourceMesh.getScene().activeCamera;
    const cameraWorldTarget = Vector3.TransformCoordinates(target, camera.getWorldMatrix());
    normal = camera.globalPosition.subtract(cameraWorldTarget);
  }
  const yaw = -Math.atan2(normal.z, normal.x) - Math.PI / 2;
  const len = Math.sqrt(normal.x * normal.x + normal.z * normal.z);
  const pitch = Math.atan2(normal.y, len);
  const vertexData = new VertexData();
  vertexData.indices = [];
  vertexData.positions = [];
  vertexData.normals = [];
  vertexData.uvs = [];
  vertexData.matricesIndices = hasSkeleton ? [] : null;
  vertexData.matricesWeights = hasSkeleton ? [] : null;
  vertexData.matricesIndicesExtra = matIndicesExtra ? [] : null;
  vertexData.matricesWeightsExtra = matWeightsExtra ? [] : null;
  let currentVertexDataIndex = 0;
  const extractDecalVector3 = (indexId, transformMatrix) => {
    const result = new DecalVertex();
    if (!indices || !positions || !normals) {
      return result;
    }
    const vertexId = indices[indexId];
    result.vertexIdx = vertexId * 3;
    result.vertexIdxForBones = vertexId * 4;
    result.position = new Vector3(positions[vertexId * 3], positions[vertexId * 3 + 1], positions[vertexId * 3 + 2]);
    Vector3.TransformCoordinatesToRef(result.position, transformMatrix, result.position);
    result.normal = new Vector3(normals[vertexId * 3], normals[vertexId * 3 + 1], normals[vertexId * 3 + 2]);
    Vector3.TransformNormalToRef(result.normal, transformMatrix, result.normal);
    if (options.captureUVS && uvs) {
      const v = uvs[vertexId * 2 + 1];
      result.uv = new Vector2(uvs[vertexId * 2], useOpenGLOrientationForUV ? 1 - v : v);
    }
    return result;
  };
  const emptyArray = [0, 0, 0, 0];
  const clip = (vertices, axis) => {
    if (vertices.length === 0) {
      return vertices;
    }
    const clipSize = 0.5 * Math.abs(Vector3.Dot(size, axis));
    const indexOf = (arr, val, start, num) => {
      for (let i = 0; i < num; ++i) {
        if (arr[start + i] === val) {
          return start + i;
        }
      }
      return -1;
    };
    const clipVertices = (v0, v1) => {
      const clipFactor = Vector3.GetClipFactor(v0.position, v1.position, axis, clipSize);
      let indices2 = emptyArray;
      let weights = emptyArray;
      if (matIndices && matWeights) {
        const mat0Index = v0.matrixIndicesOverride ? 0 : v0.vertexIdxForBones;
        const v0Indices = v0.matrixIndicesOverride ?? matIndices;
        const v0Weights = v0.matrixWeightsOverride ?? matWeights;
        const mat1Index = v1.matrixIndicesOverride ? 0 : v1.vertexIdxForBones;
        const v1Indices = v1.matrixIndicesOverride ?? matIndices;
        const v1Weights = v1.matrixWeightsOverride ?? matWeights;
        indices2 = [0, 0, 0, 0];
        weights = [0, 0, 0, 0];
        let index = 0;
        for (let i = 0; i < 4; ++i) {
          if (v0Weights[mat0Index + i] > 0) {
            const idx = indexOf(v1Indices, v0Indices[mat0Index + i], mat1Index, 4);
            indices2[index] = v0Indices[mat0Index + i];
            weights[index] = Lerp(v0Weights[mat0Index + i], idx >= 0 ? v1Weights[idx] : 0, clipFactor);
            index++;
          }
        }
        for (let i = 0; i < 4 && index < 4; ++i) {
          const ind = v1Indices[mat1Index + i];
          if (indexOf(v0Indices, ind, mat0Index, 4) !== -1)
            continue;
          indices2[index] = ind;
          weights[index] = Lerp(0, v1Weights[mat1Index + i], clipFactor);
          index++;
        }
        const sumw = weights[0] + weights[1] + weights[2] + weights[3];
        weights[0] /= sumw;
        weights[1] /= sumw;
        weights[2] /= sumw;
        weights[3] /= sumw;
      }
      const v0LocalPositionX = v0.localPositionOverride ? v0.localPositionOverride[0] : (localPositions == null ? void 0 : localPositions[v0.vertexIdx]) ?? 0;
      const v0LocalPositionY = v0.localPositionOverride ? v0.localPositionOverride[1] : (localPositions == null ? void 0 : localPositions[v0.vertexIdx + 1]) ?? 0;
      const v0LocalPositionZ = v0.localPositionOverride ? v0.localPositionOverride[2] : (localPositions == null ? void 0 : localPositions[v0.vertexIdx + 2]) ?? 0;
      const v1LocalPositionX = v1.localPositionOverride ? v1.localPositionOverride[0] : (localPositions == null ? void 0 : localPositions[v1.vertexIdx]) ?? 0;
      const v1LocalPositionY = v1.localPositionOverride ? v1.localPositionOverride[1] : (localPositions == null ? void 0 : localPositions[v1.vertexIdx + 1]) ?? 0;
      const v1LocalPositionZ = v1.localPositionOverride ? v1.localPositionOverride[2] : (localPositions == null ? void 0 : localPositions[v1.vertexIdx + 2]) ?? 0;
      const v0LocalNormalX = v0.localNormalOverride ? v0.localNormalOverride[0] : (localNormals == null ? void 0 : localNormals[v0.vertexIdx]) ?? 0;
      const v0LocalNormalY = v0.localNormalOverride ? v0.localNormalOverride[1] : (localNormals == null ? void 0 : localNormals[v0.vertexIdx + 1]) ?? 0;
      const v0LocalNormalZ = v0.localNormalOverride ? v0.localNormalOverride[2] : (localNormals == null ? void 0 : localNormals[v0.vertexIdx + 2]) ?? 0;
      const v1LocalNormalX = v1.localNormalOverride ? v1.localNormalOverride[0] : (localNormals == null ? void 0 : localNormals[v1.vertexIdx]) ?? 0;
      const v1LocalNormalY = v1.localNormalOverride ? v1.localNormalOverride[1] : (localNormals == null ? void 0 : localNormals[v1.vertexIdx + 1]) ?? 0;
      const v1LocalNormalZ = v1.localNormalOverride ? v1.localNormalOverride[2] : (localNormals == null ? void 0 : localNormals[v1.vertexIdx + 2]) ?? 0;
      const interpNormalX = v0LocalNormalX + (v1LocalNormalX - v0LocalNormalX) * clipFactor;
      const interpNormalY = v0LocalNormalY + (v1LocalNormalY - v0LocalNormalY) * clipFactor;
      const interpNormalZ = v0LocalNormalZ + (v1LocalNormalZ - v0LocalNormalZ) * clipFactor;
      const norm = Math.sqrt(interpNormalX * interpNormalX + interpNormalY * interpNormalY + interpNormalZ * interpNormalZ);
      return new DecalVertex(Vector3.Lerp(v0.position, v1.position, clipFactor), Vector3.Lerp(v0.normal, v1.normal, clipFactor).normalize(), Vector2.Lerp(v0.uv, v1.uv, clipFactor), -1, -1, localPositions ? [
        v0LocalPositionX + (v1LocalPositionX - v0LocalPositionX) * clipFactor,
        v0LocalPositionY + (v1LocalPositionY - v0LocalPositionY) * clipFactor,
        v0LocalPositionZ + (v1LocalPositionZ - v0LocalPositionZ) * clipFactor
      ] : null, localNormals ? [interpNormalX / norm, interpNormalY / norm, interpNormalZ / norm] : null, indices2, weights);
    };
    let clipResult = null;
    if (vertices.length > 3) {
      clipResult = [];
    }
    for (let index = 0; index < vertices.length; index += 3) {
      let total = 0;
      let nV1 = null;
      let nV2 = null;
      let nV3 = null;
      let nV4 = null;
      const d1 = Vector3.Dot(vertices[index].position, axis) - clipSize;
      const d2 = Vector3.Dot(vertices[index + 1].position, axis) - clipSize;
      const d3 = Vector3.Dot(vertices[index + 2].position, axis) - clipSize;
      const v1Out = d1 > 0;
      const v2Out = d2 > 0;
      const v3Out = d3 > 0;
      total = (v1Out ? 1 : 0) + (v2Out ? 1 : 0) + (v3Out ? 1 : 0);
      switch (total) {
        case 0:
          if (vertices.length > 3) {
            clipResult.push(vertices[index]);
            clipResult.push(vertices[index + 1]);
            clipResult.push(vertices[index + 2]);
          } else {
            clipResult = vertices;
          }
          break;
        case 1:
          clipResult = clipResult ?? new Array();
          if (v1Out) {
            nV1 = vertices[index + 1];
            nV2 = vertices[index + 2];
            nV3 = clipVertices(vertices[index], nV1);
            nV4 = clipVertices(vertices[index], nV2);
          }
          if (v2Out) {
            nV1 = vertices[index];
            nV2 = vertices[index + 2];
            nV3 = clipVertices(vertices[index + 1], nV1);
            nV4 = clipVertices(vertices[index + 1], nV2);
            clipResult.push(nV3);
            clipResult.push(nV2.clone());
            clipResult.push(nV1.clone());
            clipResult.push(nV2.clone());
            clipResult.push(nV3.clone());
            clipResult.push(nV4);
            break;
          }
          if (v3Out) {
            nV1 = vertices[index];
            nV2 = vertices[index + 1];
            nV3 = clipVertices(vertices[index + 2], nV1);
            nV4 = clipVertices(vertices[index + 2], nV2);
          }
          if (nV1 && nV2 && nV3 && nV4) {
            clipResult.push(nV1.clone());
            clipResult.push(nV2.clone());
            clipResult.push(nV3);
            clipResult.push(nV4);
            clipResult.push(nV3.clone());
            clipResult.push(nV2.clone());
          }
          break;
        case 2:
          clipResult = clipResult ?? new Array();
          if (!v1Out) {
            nV1 = vertices[index].clone();
            nV2 = clipVertices(nV1, vertices[index + 1]);
            nV3 = clipVertices(nV1, vertices[index + 2]);
            clipResult.push(nV1);
            clipResult.push(nV2);
            clipResult.push(nV3);
          }
          if (!v2Out) {
            nV1 = vertices[index + 1].clone();
            nV2 = clipVertices(nV1, vertices[index + 2]);
            nV3 = clipVertices(nV1, vertices[index]);
            clipResult.push(nV1);
            clipResult.push(nV2);
            clipResult.push(nV3);
          }
          if (!v3Out) {
            nV1 = vertices[index + 2].clone();
            nV2 = clipVertices(nV1, vertices[index]);
            nV3 = clipVertices(nV1, vertices[index + 1]);
            clipResult.push(nV1);
            clipResult.push(nV2);
            clipResult.push(nV3);
          }
          break;
        case 3:
          break;
      }
    }
    return clipResult;
  };
  const sourceMeshAsMesh = sourceMesh instanceof Mesh ? sourceMesh : null;
  const matrixData = sourceMeshAsMesh == null ? void 0 : sourceMeshAsMesh._thinInstanceDataStorage.matrixData;
  const numMatrices = (sourceMeshAsMesh == null ? void 0 : sourceMeshAsMesh.thinInstanceCount) || 1;
  const thinInstanceMatrix = TmpVectors.Matrix[0];
  thinInstanceMatrix.copyFrom(Matrix.IdentityReadOnly);
  for (let m = 0; m < numMatrices; ++m) {
    if ((sourceMeshAsMesh == null ? void 0 : sourceMeshAsMesh.hasThinInstances) && matrixData) {
      const ofst = m * 16;
      thinInstanceMatrix.setRowFromFloats(0, matrixData[ofst + 0], matrixData[ofst + 1], matrixData[ofst + 2], matrixData[ofst + 3]);
      thinInstanceMatrix.setRowFromFloats(1, matrixData[ofst + 4], matrixData[ofst + 5], matrixData[ofst + 6], matrixData[ofst + 7]);
      thinInstanceMatrix.setRowFromFloats(2, matrixData[ofst + 8], matrixData[ofst + 9], matrixData[ofst + 10], matrixData[ofst + 11]);
      thinInstanceMatrix.setRowFromFloats(3, matrixData[ofst + 12], matrixData[ofst + 13], matrixData[ofst + 14], matrixData[ofst + 15]);
    }
    const decalWorldMatrix = Matrix.RotationYawPitchRoll(yaw, pitch, angle).multiply(Matrix.Translation(position.x, position.y, position.z));
    const inverseDecalWorldMatrix = Matrix.Invert(decalWorldMatrix);
    const meshWorldMatrix = sourceMesh.getWorldMatrix();
    const transformMatrix = thinInstanceMatrix.multiply(meshWorldMatrix).multiply(inverseDecalWorldMatrix);
    const oneFaceVertices = new Array(3);
    for (let index = 0; index < indices.length; index += 3) {
      let faceVertices = oneFaceVertices;
      faceVertices[0] = extractDecalVector3(index, transformMatrix);
      faceVertices[1] = extractDecalVector3(index + 1, transformMatrix);
      faceVertices[2] = extractDecalVector3(index + 2, transformMatrix);
      if (options.cullBackFaces) {
        if (-faceVertices[0].normal.z <= 0 && -faceVertices[1].normal.z <= 0 && -faceVertices[2].normal.z <= 0) {
          continue;
        }
      }
      faceVertices = clip(faceVertices, xpAxis);
      if (!faceVertices)
        continue;
      faceVertices = clip(faceVertices, xnAxis);
      if (!faceVertices)
        continue;
      faceVertices = clip(faceVertices, ypAxis);
      if (!faceVertices)
        continue;
      faceVertices = clip(faceVertices, ynAxis);
      if (!faceVertices)
        continue;
      faceVertices = clip(faceVertices, zpAxis);
      if (!faceVertices)
        continue;
      faceVertices = clip(faceVertices, znAxis);
      if (!faceVertices)
        continue;
      for (let vIndex = 0; vIndex < faceVertices.length; vIndex++) {
        const vertex = faceVertices[vIndex];
        vertexData.indices.push(currentVertexDataIndex);
        if (useLocalComputation) {
          if (vertex.localPositionOverride) {
            vertexData.positions[currentVertexDataIndex * 3] = vertex.localPositionOverride[0];
            vertexData.positions[currentVertexDataIndex * 3 + 1] = vertex.localPositionOverride[1];
            vertexData.positions[currentVertexDataIndex * 3 + 2] = vertex.localPositionOverride[2];
          } else if (localPositions) {
            vertexData.positions[currentVertexDataIndex * 3] = localPositions[vertex.vertexIdx];
            vertexData.positions[currentVertexDataIndex * 3 + 1] = localPositions[vertex.vertexIdx + 1];
            vertexData.positions[currentVertexDataIndex * 3 + 2] = localPositions[vertex.vertexIdx + 2];
          }
          if (vertex.localNormalOverride) {
            vertexData.normals[currentVertexDataIndex * 3] = vertex.localNormalOverride[0];
            vertexData.normals[currentVertexDataIndex * 3 + 1] = vertex.localNormalOverride[1];
            vertexData.normals[currentVertexDataIndex * 3 + 2] = vertex.localNormalOverride[2];
          } else if (localNormals) {
            vertexData.normals[currentVertexDataIndex * 3] = localNormals[vertex.vertexIdx];
            vertexData.normals[currentVertexDataIndex * 3 + 1] = localNormals[vertex.vertexIdx + 1];
            vertexData.normals[currentVertexDataIndex * 3 + 2] = localNormals[vertex.vertexIdx + 2];
          }
        } else {
          vertex.position.toArray(vertexData.positions, currentVertexDataIndex * 3);
          vertex.normal.toArray(vertexData.normals, currentVertexDataIndex * 3);
        }
        if (vertexData.matricesIndices && vertexData.matricesWeights) {
          if (vertex.matrixIndicesOverride) {
            vertexData.matricesIndices[currentVertexDataIndex * 4] = vertex.matrixIndicesOverride[0];
            vertexData.matricesIndices[currentVertexDataIndex * 4 + 1] = vertex.matrixIndicesOverride[1];
            vertexData.matricesIndices[currentVertexDataIndex * 4 + 2] = vertex.matrixIndicesOverride[2];
            vertexData.matricesIndices[currentVertexDataIndex * 4 + 3] = vertex.matrixIndicesOverride[3];
          } else {
            if (matIndices) {
              vertexData.matricesIndices[currentVertexDataIndex * 4] = matIndices[vertex.vertexIdxForBones];
              vertexData.matricesIndices[currentVertexDataIndex * 4 + 1] = matIndices[vertex.vertexIdxForBones + 1];
              vertexData.matricesIndices[currentVertexDataIndex * 4 + 2] = matIndices[vertex.vertexIdxForBones + 2];
              vertexData.matricesIndices[currentVertexDataIndex * 4 + 3] = matIndices[vertex.vertexIdxForBones + 3];
            }
            if (matIndicesExtra && vertexData.matricesIndicesExtra) {
              vertexData.matricesIndicesExtra[currentVertexDataIndex * 4] = matIndicesExtra[vertex.vertexIdxForBones];
              vertexData.matricesIndicesExtra[currentVertexDataIndex * 4 + 1] = matIndicesExtra[vertex.vertexIdxForBones + 1];
              vertexData.matricesIndicesExtra[currentVertexDataIndex * 4 + 2] = matIndicesExtra[vertex.vertexIdxForBones + 2];
              vertexData.matricesIndicesExtra[currentVertexDataIndex * 4 + 3] = matIndicesExtra[vertex.vertexIdxForBones + 3];
            }
          }
          if (vertex.matrixWeightsOverride) {
            vertexData.matricesWeights[currentVertexDataIndex * 4] = vertex.matrixWeightsOverride[0];
            vertexData.matricesWeights[currentVertexDataIndex * 4 + 1] = vertex.matrixWeightsOverride[1];
            vertexData.matricesWeights[currentVertexDataIndex * 4 + 2] = vertex.matrixWeightsOverride[2];
            vertexData.matricesWeights[currentVertexDataIndex * 4 + 3] = vertex.matrixWeightsOverride[3];
          } else {
            if (matWeights) {
              vertexData.matricesWeights[currentVertexDataIndex * 4] = matWeights[vertex.vertexIdxForBones];
              vertexData.matricesWeights[currentVertexDataIndex * 4 + 1] = matWeights[vertex.vertexIdxForBones + 1];
              vertexData.matricesWeights[currentVertexDataIndex * 4 + 2] = matWeights[vertex.vertexIdxForBones + 2];
              vertexData.matricesWeights[currentVertexDataIndex * 4 + 3] = matWeights[vertex.vertexIdxForBones + 3];
            }
            if (matWeightsExtra && vertexData.matricesWeightsExtra) {
              vertexData.matricesWeightsExtra[currentVertexDataIndex * 4] = matWeightsExtra[vertex.vertexIdxForBones];
              vertexData.matricesWeightsExtra[currentVertexDataIndex * 4 + 1] = matWeightsExtra[vertex.vertexIdxForBones + 1];
              vertexData.matricesWeightsExtra[currentVertexDataIndex * 4 + 2] = matWeightsExtra[vertex.vertexIdxForBones + 2];
              vertexData.matricesWeightsExtra[currentVertexDataIndex * 4 + 3] = matWeightsExtra[vertex.vertexIdxForBones + 3];
            }
          }
        }
        if (!options.captureUVS) {
          vertexData.uvs.push(0.5 + vertex.position.x / size.x);
          const v = 0.5 + vertex.position.y / size.y;
          vertexData.uvs.push(useOpenGLOrientationForUV ? 1 - v : v);
        } else {
          vertex.uv.toArray(vertexData.uvs, currentVertexDataIndex * 2);
        }
        currentVertexDataIndex++;
      }
    }
  }
  if (vertexData.indices.length === 0)
    vertexData.indices = null;
  if (vertexData.positions.length === 0)
    vertexData.positions = null;
  if (vertexData.normals.length === 0)
    vertexData.normals = null;
  if (vertexData.uvs.length === 0)
    vertexData.uvs = null;
  if (((_a = vertexData.matricesIndices) == null ? void 0 : _a.length) === 0)
    vertexData.matricesIndices = null;
  if (((_b = vertexData.matricesWeights) == null ? void 0 : _b.length) === 0)
    vertexData.matricesWeights = null;
  if (((_c = vertexData.matricesIndicesExtra) == null ? void 0 : _c.length) === 0)
    vertexData.matricesIndicesExtra = null;
  if (((_d = vertexData.matricesWeightsExtra) == null ? void 0 : _d.length) === 0)
    vertexData.matricesWeightsExtra = null;
  const decal = new Mesh(name, sourceMesh.getScene());
  vertexData.applyToMesh(decal);
  if (useLocalComputation) {
    decal.skeleton = sourceMesh.skeleton;
    decal.parent = sourceMesh;
  } else {
    decal.position = position.clone();
    decal.rotation = new Vector3(pitch, yaw, angle);
  }
  decal.computeWorldMatrix(true);
  decal.refreshBoundingInfo(true, true);
  return decal;
}
Mesh.CreateDecal = (name, sourceMesh, position, normal, size, angle) => {
  const options = {
    position,
    normal,
    size,
    angle
  };
  return CreateDecal(name, sourceMesh, options);
};

// node_modules/@babylonjs/core/Meshes/Builders/capsuleBuilder.js
function CreateCapsuleVertexData(options = {
  subdivisions: 2,
  tessellation: 16,
  height: 1,
  radius: 0.25,
  capSubdivisions: 6
}) {
  const subdivisions = Math.max(options.subdivisions ? options.subdivisions : 2, 1) | 0;
  const tessellation = Math.max(options.tessellation ? options.tessellation : 16, 3) | 0;
  const height = Math.max(options.height ? options.height : 1, 0);
  const radius = Math.max(options.radius ? options.radius : 0.25, 0);
  const capDetail = Math.max(options.capSubdivisions ? options.capSubdivisions : 6, 1) | 0;
  const radialSegments = tessellation;
  const heightSegments = subdivisions;
  const radiusTop = Math.max(options.radiusTop ? options.radiusTop : radius, 0);
  const radiusBottom = Math.max(options.radiusBottom ? options.radiusBottom : radius, 0);
  const heightMinusCaps = height - (radiusTop + radiusBottom);
  const thetaStart = 0;
  const thetaLength = 2 * Math.PI;
  const capsTopSegments = Math.max(options.topCapSubdivisions ? options.topCapSubdivisions : capDetail, 1);
  const capsBottomSegments = Math.max(options.bottomCapSubdivisions ? options.bottomCapSubdivisions : capDetail, 1);
  const alpha = Math.acos((radiusBottom - radiusTop) / height);
  let indices = [];
  const vertices = [];
  const normals = [];
  const uvs = [];
  let index = 0;
  const indexArray = [], halfHeight = heightMinusCaps * 0.5;
  const pi2 = Math.PI * 0.5;
  let x, y;
  const normal = Vector3.Zero();
  const vertex = Vector3.Zero();
  const cosAlpha = Math.cos(alpha);
  const sinAlpha = Math.sin(alpha);
  const coneLength = new Vector2(radiusTop * sinAlpha, halfHeight + radiusTop * cosAlpha).subtract(new Vector2(radiusBottom * sinAlpha, -halfHeight + radiusBottom * cosAlpha)).length();
  const vl = radiusTop * alpha + coneLength + radiusBottom * (pi2 - alpha);
  let v = 0;
  for (y = 0; y <= capsTopSegments; y++) {
    const indexRow = [];
    const a = pi2 - alpha * (y / capsTopSegments);
    v += radiusTop * alpha / capsTopSegments;
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);
    const _radius = cosA * radiusTop;
    for (x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * thetaLength + thetaStart;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      vertex.x = _radius * sinTheta;
      vertex.y = halfHeight + sinA * radiusTop;
      vertex.z = _radius * cosTheta;
      vertices.push(vertex.x, vertex.y, vertex.z);
      normal.set(cosA * sinTheta, sinA, cosA * cosTheta);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u, useOpenGLOrientationForUV ? v / vl : 1 - v / vl);
      indexRow.push(index);
      index++;
    }
    indexArray.push(indexRow);
  }
  const coneHeight = height - radiusTop - radiusBottom + cosAlpha * radiusTop - cosAlpha * radiusBottom;
  const slope = sinAlpha * (radiusBottom - radiusTop) / coneHeight;
  for (y = 1; y <= heightSegments; y++) {
    const indexRow = [];
    v += coneLength / heightSegments;
    const _radius = sinAlpha * (y * (radiusBottom - radiusTop) / heightSegments + radiusTop);
    for (x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * thetaLength + thetaStart;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      vertex.x = _radius * sinTheta;
      vertex.y = halfHeight + cosAlpha * radiusTop - y * coneHeight / heightSegments;
      vertex.z = _radius * cosTheta;
      vertices.push(vertex.x, vertex.y, vertex.z);
      normal.set(sinTheta, slope, cosTheta).normalize();
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u, useOpenGLOrientationForUV ? v / vl : 1 - v / vl);
      indexRow.push(index);
      index++;
    }
    indexArray.push(indexRow);
  }
  for (y = 1; y <= capsBottomSegments; y++) {
    const indexRow = [];
    const a = pi2 - alpha - (Math.PI - alpha) * (y / capsBottomSegments);
    v += radiusBottom * alpha / capsBottomSegments;
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);
    const _radius = cosA * radiusBottom;
    for (x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * thetaLength + thetaStart;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      vertex.x = _radius * sinTheta;
      vertex.y = -halfHeight + sinA * radiusBottom;
      vertex.z = _radius * cosTheta;
      vertices.push(vertex.x, vertex.y, vertex.z);
      normal.set(cosA * sinTheta, sinA, cosA * cosTheta);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u, useOpenGLOrientationForUV ? v / vl : 1 - v / vl);
      indexRow.push(index);
      index++;
    }
    indexArray.push(indexRow);
  }
  for (x = 0; x < radialSegments; x++) {
    for (y = 0; y < capsTopSegments + heightSegments + capsBottomSegments; y++) {
      const i1 = indexArray[y][x];
      const i2 = indexArray[y + 1][x];
      const i3 = indexArray[y + 1][x + 1];
      const i4 = indexArray[y][x + 1];
      indices.push(i1);
      indices.push(i2);
      indices.push(i4);
      indices.push(i2);
      indices.push(i3);
      indices.push(i4);
    }
  }
  indices = indices.reverse();
  if (options.orientation && !options.orientation.equals(Vector3.Up())) {
    const m = new Matrix();
    options.orientation.clone().scale(Math.PI * 0.5).cross(Vector3.Up()).toQuaternion().toRotationMatrix(m);
    const v2 = Vector3.Zero();
    for (let i = 0; i < vertices.length; i += 3) {
      v2.set(vertices[i], vertices[i + 1], vertices[i + 2]);
      Vector3.TransformCoordinatesToRef(v2.clone(), m, v2);
      vertices[i] = v2.x;
      vertices[i + 1] = v2.y;
      vertices[i + 2] = v2.z;
    }
  }
  const vDat = new VertexData();
  vDat.positions = vertices;
  vDat.normals = normals;
  vDat.uvs = uvs;
  vDat.indices = indices;
  return vDat;
}
function CreateCapsule(name, options = {
  orientation: Vector3.Up(),
  subdivisions: 2,
  tessellation: 16,
  height: 1,
  radius: 0.25,
  capSubdivisions: 6,
  updatable: false
}, scene = null) {
  const capsule = new Mesh(name, scene);
  const vertexData = CreateCapsuleVertexData(options);
  vertexData.applyToMesh(capsule, options.updatable);
  return capsule;
}
Mesh.CreateCapsule = (name, options, scene) => {
  return CreateCapsule(name, options, scene);
};
VertexData.CreateCapsule = CreateCapsuleVertexData;

// node_modules/@babylonjs/core/Maths/math.isovector.js
var _IsoVector = class __IsoVector {
  /**
   * Creates a new isovector from the given x and y coordinates
   * @param x defines the first coordinate, must be an integer
   * @param y defines the second coordinate, must be an integer
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    if (x !== Math.floor(x)) {
      x = Math.floor(x);
      Logger.Warn("x is not an integer, floor(x) used");
    }
    if (y !== Math.floor(y)) {
      y = Math.floor(y);
      Logger.Warn("y is not an integer, floor(y) used");
    }
  }
  // Operators
  /**
   * Gets a new IsoVector copied from the IsoVector
   * @returns a new IsoVector
   */
  clone() {
    return new __IsoVector(this.x, this.y);
  }
  /**
   * Rotates one IsoVector 60 degrees counter clockwise about another
   * Please note that this is an in place operation
   * @param other an IsoVector a center of rotation
   * @returns the rotated IsoVector
   */
  rotate60About(other) {
    const x = this.x;
    this.x = other.x + other.y - this.y;
    this.y = x + this.y - other.x;
    return this;
  }
  /**
   * Rotates one IsoVector 60 degrees clockwise about another
   * Please note that this is an in place operation
   * @param other an IsoVector as center of rotation
   * @returns the rotated IsoVector
   */
  rotateNeg60About(other) {
    const x = this.x;
    this.x = x + this.y - other.y;
    this.y = other.x + other.y - x;
    return this;
  }
  /**
   * For an equilateral triangle OAB with O at isovector (0, 0) and A at isovector (m, n)
   * Rotates one IsoVector 120 degrees counter clockwise about the center of the triangle
   * Please note that this is an in place operation
   * @param m integer a measure a Primary triangle of order (m, n) m > n
   * @param n >= 0 integer a measure for a Primary triangle of order (m, n)
   * @returns the rotated IsoVector
   */
  rotate120(m, n) {
    if (m !== Math.floor(m)) {
      m = Math.floor(m);
      Logger.Warn("m not an integer only floor(m) used");
    }
    if (n !== Math.floor(n)) {
      n = Math.floor(n);
      Logger.Warn("n not an integer only floor(n) used");
    }
    const x = this.x;
    this.x = m - x - this.y;
    this.y = n + x;
    return this;
  }
  /**
   * For an equilateral triangle OAB with O at isovector (0, 0) and A at isovector (m, n)
   * Rotates one IsoVector 120 degrees clockwise about the center of the triangle
   * Please note that this is an in place operation
   * @param m integer a measure a Primary triangle of order (m, n) m > n
   * @param n >= 0 integer a measure for a Primary triangle of order (m, n)
   * @returns the rotated IsoVector
   */
  rotateNeg120(m, n) {
    if (m !== Math.floor(m)) {
      m = Math.floor(m);
      Logger.Warn("m is not an integer, floor(m) used");
    }
    if (n !== Math.floor(n)) {
      n = Math.floor(n);
      Logger.Warn("n is not an integer,   floor(n) used");
    }
    const x = this.x;
    this.x = this.y - n;
    this.y = m + n - x - this.y;
    return this;
  }
  /**
   * Transforms an IsoVector to one in Cartesian 3D space based on an isovector
   * @param origin an IsoVector
   * @param isoGridSize
   * @returns Point as a Vector3
   */
  toCartesianOrigin(origin, isoGridSize) {
    const point = Vector3.Zero();
    point.x = origin.x + 2 * this.x * isoGridSize + this.y * isoGridSize;
    point.y = origin.y + Math.sqrt(3) * this.y * isoGridSize;
    return point;
  }
  // Statics
  /**
   * Gets a new IsoVector(0, 0)
   * @returns a new IsoVector
   */
  static Zero() {
    return new __IsoVector(0, 0);
  }
};

// node_modules/@babylonjs/core/Meshes/geodesicMesh.js
var _PrimaryIsoTriangle = class {
  constructor() {
    this.cartesian = [];
    this.vertices = [];
    this.max = [];
    this.min = [];
    this.closestTo = [];
    this.innerFacets = [];
    this.isoVecsABOB = [];
    this.isoVecsOBOA = [];
    this.isoVecsBAOA = [];
    this.vertexTypes = [];
    this.IDATA = new PolyhedronData("icosahedron", "Regular", [
      [0, PHI, -1],
      [-PHI, 1, 0],
      [-1, 0, -PHI],
      [1, 0, -PHI],
      [PHI, 1, 0],
      [0, PHI, 1],
      [-1, 0, PHI],
      [-PHI, -1, 0],
      [0, -PHI, -1],
      [PHI, -1, 0],
      [1, 0, PHI],
      [0, -PHI, 1]
    ], [
      [0, 2, 1],
      [0, 3, 2],
      [0, 4, 3],
      [0, 5, 4],
      [0, 1, 5],
      [7, 6, 1],
      [8, 7, 2],
      [9, 8, 3],
      [10, 9, 4],
      [6, 10, 5],
      [2, 7, 1],
      [3, 8, 2],
      [4, 9, 3],
      [5, 10, 4],
      [1, 6, 5],
      [11, 6, 7],
      [11, 7, 8],
      [11, 8, 9],
      [11, 9, 10],
      [11, 10, 6]
    ]);
  }
  /**
   * Creates the PrimaryIsoTriangle Triangle OAB
   * @param m an integer
   * @param n an integer
   */
  //operators
  setIndices() {
    let indexCount = 12;
    const vecToidx = {};
    const m = this.m;
    const n = this.n;
    let g = m;
    let m1 = 1;
    let n1 = 0;
    if (n !== 0) {
      g = HighestCommonFactor(m, n);
    }
    m1 = m / g;
    n1 = n / g;
    let fr;
    let rot;
    let O;
    let A;
    let B;
    const oVec = _IsoVector.Zero();
    const aVec = new _IsoVector(m, n);
    const bVec = new _IsoVector(-n, m + n);
    const oaVec = _IsoVector.Zero();
    const abVec = _IsoVector.Zero();
    const obVec = _IsoVector.Zero();
    let verts = [];
    let idx;
    let idxR;
    let isoId;
    let isoIdR;
    const closestTo = [];
    const vDist = this.vertByDist;
    const matchIdx = (f, fr2, isoId2, isoIdR2) => {
      idx = f + "|" + isoId2;
      idxR = fr2 + "|" + isoIdR2;
      if (!(idx in vecToidx || idxR in vecToidx)) {
        vecToidx[idx] = indexCount;
        vecToidx[idxR] = indexCount;
        indexCount++;
      } else if (idx in vecToidx && !(idxR in vecToidx)) {
        vecToidx[idxR] = vecToidx[idx];
      } else if (idxR in vecToidx && !(idx in vecToidx)) {
        vecToidx[idx] = vecToidx[idxR];
      }
      if (vDist[isoId2][0] > 2) {
        closestTo[vecToidx[idx]] = [-vDist[isoId2][0], vDist[isoId2][1], vecToidx[idx]];
      } else {
        closestTo[vecToidx[idx]] = [verts[vDist[isoId2][0]], vDist[isoId2][1], vecToidx[idx]];
      }
    };
    this.IDATA.edgematch = [
      [1, "B"],
      [2, "B"],
      [3, "B"],
      [4, "B"],
      [0, "B"],
      [10, "O", 14, "A"],
      [11, "O", 10, "A"],
      [12, "O", 11, "A"],
      [13, "O", 12, "A"],
      [14, "O", 13, "A"],
      [0, "O"],
      [1, "O"],
      [2, "O"],
      [3, "O"],
      [4, "O"],
      [19, "B", 5, "A"],
      [15, "B", 6, "A"],
      [16, "B", 7, "A"],
      [17, "B", 8, "A"],
      [18, "B", 9, "A"]
    ];
    for (let f = 0; f < 20; f++) {
      verts = this.IDATA.face[f];
      O = verts[2];
      A = verts[1];
      B = verts[0];
      isoId = oVec.x + "|" + oVec.y;
      idx = f + "|" + isoId;
      if (!(idx in vecToidx)) {
        vecToidx[idx] = O;
        closestTo[O] = [verts[vDist[isoId][0]], vDist[isoId][1]];
      }
      isoId = aVec.x + "|" + aVec.y;
      idx = f + "|" + isoId;
      if (!(idx in vecToidx)) {
        vecToidx[idx] = A;
        closestTo[A] = [verts[vDist[isoId][0]], vDist[isoId][1]];
      }
      isoId = bVec.x + "|" + bVec.y;
      idx = f + "|" + isoId;
      if (!(idx in vecToidx)) {
        vecToidx[idx] = B;
        closestTo[B] = [verts[vDist[isoId][0]], vDist[isoId][1]];
      }
      fr = this.IDATA.edgematch[f][0];
      rot = this.IDATA.edgematch[f][1];
      if (rot === "B") {
        for (let i = 1; i < g; i++) {
          abVec.x = m - i * (m1 + n1);
          abVec.y = n + i * m1;
          obVec.x = -i * n1;
          obVec.y = i * (m1 + n1);
          isoId = abVec.x + "|" + abVec.y;
          isoIdR = obVec.x + "|" + obVec.y;
          matchIdx(f, fr, isoId, isoIdR);
        }
      }
      if (rot === "O") {
        for (let i = 1; i < g; i++) {
          obVec.x = -i * n1;
          obVec.y = i * (m1 + n1);
          oaVec.x = i * m1;
          oaVec.y = i * n1;
          isoId = obVec.x + "|" + obVec.y;
          isoIdR = oaVec.x + "|" + oaVec.y;
          matchIdx(f, fr, isoId, isoIdR);
        }
      }
      fr = this.IDATA.edgematch[f][2];
      rot = this.IDATA.edgematch[f][3];
      if (rot && rot === "A") {
        for (let i = 1; i < g; i++) {
          oaVec.x = i * m1;
          oaVec.y = i * n1;
          abVec.x = m - (g - i) * (m1 + n1);
          abVec.y = n + (g - i) * m1;
          isoId = oaVec.x + "|" + oaVec.y;
          isoIdR = abVec.x + "|" + abVec.y;
          matchIdx(f, fr, isoId, isoIdR);
        }
      }
      for (let i = 0; i < this.vertices.length; i++) {
        isoId = this.vertices[i].x + "|" + this.vertices[i].y;
        idx = f + "|" + isoId;
        if (!(idx in vecToidx)) {
          vecToidx[idx] = indexCount++;
          if (vDist[isoId][0] > 2) {
            closestTo[vecToidx[idx]] = [-vDist[isoId][0], vDist[isoId][1], vecToidx[idx]];
          } else {
            closestTo[vecToidx[idx]] = [verts[vDist[isoId][0]], vDist[isoId][1], vecToidx[idx]];
          }
        }
      }
    }
    this.closestTo = closestTo;
    this.vecToidx = vecToidx;
  }
  calcCoeffs() {
    const m = this.m;
    const n = this.n;
    const thirdR3 = Math.sqrt(3) / 3;
    const LSQD = m * m + n * n + m * n;
    this.coau = (m + n) / LSQD;
    this.cobu = -n / LSQD;
    this.coav = -thirdR3 * (m - n) / LSQD;
    this.cobv = thirdR3 * (2 * m + n) / LSQD;
  }
  createInnerFacets() {
    const m = this.m;
    const n = this.n;
    for (let y = 0; y < n + m + 1; y++) {
      for (let x = this.min[y]; x < this.max[y] + 1; x++) {
        if (x < this.max[y] && x < this.max[y + 1] + 1) {
          this.innerFacets.push(["|" + x + "|" + y, "|" + x + "|" + (y + 1), "|" + (x + 1) + "|" + y]);
        }
        if (y > 0 && x < this.max[y - 1] && x + 1 < this.max[y] + 1) {
          this.innerFacets.push(["|" + x + "|" + y, "|" + (x + 1) + "|" + y, "|" + (x + 1) + "|" + (y - 1)]);
        }
      }
    }
  }
  edgeVecsABOB() {
    const m = this.m;
    const n = this.n;
    const B = new _IsoVector(-n, m + n);
    for (let y = 1; y < m + n; y++) {
      const point = new _IsoVector(this.min[y], y);
      const prev = new _IsoVector(this.min[y - 1], y - 1);
      const next = new _IsoVector(this.min[y + 1], y + 1);
      const pointR = point.clone();
      const prevR = prev.clone();
      const nextR = next.clone();
      pointR.rotate60About(B);
      prevR.rotate60About(B);
      nextR.rotate60About(B);
      const maxPoint = new _IsoVector(this.max[pointR.y], pointR.y);
      const maxPrev = new _IsoVector(this.max[pointR.y - 1], pointR.y - 1);
      const maxLeftPrev = new _IsoVector(this.max[pointR.y - 1] - 1, pointR.y - 1);
      if (pointR.x !== maxPoint.x || pointR.y !== maxPoint.y) {
        if (pointR.x !== maxPrev.x) {
          this.vertexTypes.push([1, 0, 0]);
          this.isoVecsABOB.push([point, maxPrev, maxLeftPrev]);
          this.vertexTypes.push([1, 0, 0]);
          this.isoVecsABOB.push([point, maxLeftPrev, maxPoint]);
        } else if (pointR.y === nextR.y) {
          this.vertexTypes.push([1, 1, 0]);
          this.isoVecsABOB.push([point, prev, maxPrev]);
          this.vertexTypes.push([1, 0, 1]);
          this.isoVecsABOB.push([point, maxPrev, next]);
        } else {
          this.vertexTypes.push([1, 1, 0]);
          this.isoVecsABOB.push([point, prev, maxPrev]);
          this.vertexTypes.push([1, 0, 0]);
          this.isoVecsABOB.push([point, maxPrev, maxPoint]);
        }
      }
    }
  }
  mapABOBtoOBOA() {
    const point = new _IsoVector(0, 0);
    for (let i = 0; i < this.isoVecsABOB.length; i++) {
      const temp = [];
      for (let j = 0; j < 3; j++) {
        point.x = this.isoVecsABOB[i][j].x;
        point.y = this.isoVecsABOB[i][j].y;
        if (this.vertexTypes[i][j] === 0) {
          point.rotateNeg120(this.m, this.n);
        }
        temp.push(point.clone());
      }
      this.isoVecsOBOA.push(temp);
    }
  }
  mapABOBtoBAOA() {
    const point = new _IsoVector(0, 0);
    for (let i = 0; i < this.isoVecsABOB.length; i++) {
      const temp = [];
      for (let j = 0; j < 3; j++) {
        point.x = this.isoVecsABOB[i][j].x;
        point.y = this.isoVecsABOB[i][j].y;
        if (this.vertexTypes[i][j] === 1) {
          point.rotate120(this.m, this.n);
        }
        temp.push(point.clone());
      }
      this.isoVecsBAOA.push(temp);
    }
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MapToFace(faceNb, geodesicData) {
    const F = this.IDATA.face[faceNb];
    const oidx = F[2];
    const aidx = F[1];
    const bidx = F[0];
    const O = Vector3.FromArray(this.IDATA.vertex[oidx]);
    const A = Vector3.FromArray(this.IDATA.vertex[aidx]);
    const B = Vector3.FromArray(this.IDATA.vertex[bidx]);
    const OA = A.subtract(O);
    const OB = B.subtract(O);
    const x = OA.scale(this.coau).add(OB.scale(this.cobu));
    const y = OA.scale(this.coav).add(OB.scale(this.cobv));
    const mapped = [];
    let idx;
    let tempVec = TmpVectors.Vector3[0];
    for (let i = 0; i < this.cartesian.length; i++) {
      tempVec = x.scale(this.cartesian[i].x).add(y.scale(this.cartesian[i].y)).add(O);
      mapped[i] = [tempVec.x, tempVec.y, tempVec.z];
      idx = faceNb + "|" + this.vertices[i].x + "|" + this.vertices[i].y;
      geodesicData.vertex[this.vecToidx[idx]] = [tempVec.x, tempVec.y, tempVec.z];
    }
  }
  //statics
  /**Creates a primary triangle
   * @internal
   */
  build(m, n) {
    const vertices = [];
    const O = _IsoVector.Zero();
    const A = new _IsoVector(m, n);
    const B = new _IsoVector(-n, m + n);
    vertices.push(O, A, B);
    for (let y2 = n; y2 < m + 1; y2++) {
      for (let x2 = 0; x2 < m + 1 - y2; x2++) {
        vertices.push(new _IsoVector(x2, y2));
      }
    }
    if (n > 0) {
      const g = HighestCommonFactor(m, n);
      const m1 = m / g;
      const n1 = n / g;
      for (let i = 1; i < g; i++) {
        vertices.push(new _IsoVector(i * m1, i * n1));
        vertices.push(new _IsoVector(-i * n1, i * (m1 + n1)));
        vertices.push(new _IsoVector(m - i * (m1 + n1), n + i * m1));
      }
      const ratio = m / n;
      for (let y2 = 1; y2 < n; y2++) {
        for (let x2 = 0; x2 < y2 * ratio; x2++) {
          vertices.push(new _IsoVector(x2, y2));
          vertices.push(new _IsoVector(x2, y2).rotate120(m, n));
          vertices.push(new _IsoVector(x2, y2).rotateNeg120(m, n));
        }
      }
    }
    vertices.sort((a, b) => {
      return a.x - b.x;
    });
    vertices.sort((a, b) => {
      return a.y - b.y;
    });
    const min = new Array(m + n + 1);
    const max = new Array(m + n + 1);
    for (let i = 0; i < min.length; i++) {
      min[i] = Infinity;
      max[i] = -Infinity;
    }
    let y = 0;
    let x = 0;
    const len = vertices.length;
    for (let i = 0; i < len; i++) {
      x = vertices[i].x;
      y = vertices[i].y;
      min[y] = Math.min(x, min[y]);
      max[y] = Math.max(x, max[y]);
    }
    const distFrom = (vert, primVert) => {
      const v = vert.clone();
      if (primVert === "A") {
        v.rotateNeg120(m, n);
      }
      if (primVert === "B") {
        v.rotate120(m, n);
      }
      if (v.x < 0) {
        return v.y;
      }
      return v.x + v.y;
    };
    const cartesian = [];
    const distFromO = [];
    const distFromA = [];
    const distFromB = [];
    const vertByDist = {};
    const vertData = [];
    let closest = -1;
    let dist = -1;
    for (let i = 0; i < len; i++) {
      cartesian[i] = vertices[i].toCartesianOrigin(new _IsoVector(0, 0), 0.5);
      distFromO[i] = distFrom(vertices[i], "O");
      distFromA[i] = distFrom(vertices[i], "A");
      distFromB[i] = distFrom(vertices[i], "B");
      if (distFromO[i] === distFromA[i] && distFromA[i] === distFromB[i]) {
        closest = 3;
        dist = distFromO[i];
      } else if (distFromO[i] === distFromA[i]) {
        closest = 4;
        dist = distFromO[i];
      } else if (distFromA[i] === distFromB[i]) {
        closest = 5;
        dist = distFromA[i];
      } else if (distFromB[i] === distFromO[i]) {
        closest = 6;
        dist = distFromO[i];
      }
      if (distFromO[i] < distFromA[i] && distFromO[i] < distFromB[i]) {
        closest = 2;
        dist = distFromO[i];
      }
      if (distFromA[i] < distFromO[i] && distFromA[i] < distFromB[i]) {
        closest = 1;
        dist = distFromA[i];
      }
      if (distFromB[i] < distFromA[i] && distFromB[i] < distFromO[i]) {
        closest = 0;
        dist = distFromB[i];
      }
      vertData.push([closest, dist, vertices[i].x, vertices[i].y]);
    }
    vertData.sort((a, b) => {
      return a[2] - b[2];
    });
    vertData.sort((a, b) => {
      return a[3] - b[3];
    });
    vertData.sort((a, b) => {
      return a[1] - b[1];
    });
    vertData.sort((a, b) => {
      return a[0] - b[0];
    });
    for (let v = 0; v < vertData.length; v++) {
      vertByDist[vertData[v][2] + "|" + vertData[v][3]] = [vertData[v][0], vertData[v][1], v];
    }
    this.m = m;
    this.n = n;
    this.vertices = vertices;
    this.vertByDist = vertByDist;
    this.cartesian = cartesian;
    this.min = min;
    this.max = max;
    return this;
  }
};
var PolyhedronData = class {
  constructor(name, category, vertex, face) {
    this.name = name;
    this.category = category;
    this.vertex = vertex;
    this.face = face;
  }
};
var GeodesicData = class _GeodesicData extends PolyhedronData {
  /**
   * @internal
   */
  innerToData(face, primTri) {
    for (let i = 0; i < primTri.innerFacets.length; i++) {
      this.face.push(primTri.innerFacets[i].map((el) => primTri.vecToidx[face + el]));
    }
  }
  /**
   * @internal
   */
  mapABOBtoDATA(faceNb, primTri) {
    const fr = primTri.IDATA.edgematch[faceNb][0];
    for (let i = 0; i < primTri.isoVecsABOB.length; i++) {
      const temp = [];
      for (let j = 0; j < 3; j++) {
        if (primTri.vertexTypes[i][j] === 0) {
          temp.push(faceNb + "|" + primTri.isoVecsABOB[i][j].x + "|" + primTri.isoVecsABOB[i][j].y);
        } else {
          temp.push(fr + "|" + primTri.isoVecsABOB[i][j].x + "|" + primTri.isoVecsABOB[i][j].y);
        }
      }
      this.face.push([primTri.vecToidx[temp[0]], primTri.vecToidx[temp[1]], primTri.vecToidx[temp[2]]]);
    }
  }
  /**
   * @internal
   */
  mapOBOAtoDATA(faceNb, primTri) {
    const fr = primTri.IDATA.edgematch[faceNb][0];
    for (let i = 0; i < primTri.isoVecsOBOA.length; i++) {
      const temp = [];
      for (let j = 0; j < 3; j++) {
        if (primTri.vertexTypes[i][j] === 1) {
          temp.push(faceNb + "|" + primTri.isoVecsOBOA[i][j].x + "|" + primTri.isoVecsOBOA[i][j].y);
        } else {
          temp.push(fr + "|" + primTri.isoVecsOBOA[i][j].x + "|" + primTri.isoVecsOBOA[i][j].y);
        }
      }
      this.face.push([primTri.vecToidx[temp[0]], primTri.vecToidx[temp[1]], primTri.vecToidx[temp[2]]]);
    }
  }
  /**
   * @internal
   */
  mapBAOAtoDATA(faceNb, primTri) {
    const fr = primTri.IDATA.edgematch[faceNb][2];
    for (let i = 0; i < primTri.isoVecsBAOA.length; i++) {
      const temp = [];
      for (let j = 0; j < 3; j++) {
        if (primTri.vertexTypes[i][j] === 1) {
          temp.push(faceNb + "|" + primTri.isoVecsBAOA[i][j].x + "|" + primTri.isoVecsBAOA[i][j].y);
        } else {
          temp.push(fr + "|" + primTri.isoVecsBAOA[i][j].x + "|" + primTri.isoVecsBAOA[i][j].y);
        }
      }
      this.face.push([primTri.vecToidx[temp[0]], primTri.vecToidx[temp[1]], primTri.vecToidx[temp[2]]]);
    }
  }
  /**
   * @internal
   */
  orderData(primTri) {
    const nearTo = [];
    for (let i = 0; i < 13; i++) {
      nearTo[i] = [];
    }
    const close = primTri.closestTo;
    for (let i = 0; i < close.length; i++) {
      if (close[i][0] > -1) {
        if (close[i][1] > 0) {
          nearTo[close[i][0]].push([i, close[i][1]]);
        }
      } else {
        nearTo[12].push([i, close[i][0]]);
      }
    }
    const near = [];
    for (let i = 0; i < 12; i++) {
      near[i] = i;
    }
    let nearIndex = 12;
    for (let i = 0; i < 12; i++) {
      nearTo[i].sort((a, b) => {
        return a[1] - b[1];
      });
      for (let j = 0; j < nearTo[i].length; j++) {
        near[nearTo[i][j][0]] = nearIndex++;
      }
    }
    for (let j = 0; j < nearTo[12].length; j++) {
      near[nearTo[12][j][0]] = nearIndex++;
    }
    for (let i = 0; i < this.vertex.length; i++) {
      this.vertex[i].push(near[i]);
    }
    this.vertex.sort((a, b) => {
      return a[3] - b[3];
    });
    for (let i = 0; i < this.vertex.length; i++) {
      this.vertex[i].pop();
    }
    for (let i = 0; i < this.face.length; i++) {
      for (let j = 0; j < this.face[i].length; j++) {
        this.face[i][j] = near[this.face[i][j]];
      }
    }
    this.sharedNodes = nearTo[12].length;
    this.poleNodes = this.vertex.length - this.sharedNodes;
  }
  /**
   * @internal
   */
  setOrder(m, faces) {
    const adjVerts = [];
    const dualFaces = [];
    let face = faces.pop();
    dualFaces.push(face);
    let index = this.face[face].indexOf(m);
    index = (index + 2) % 3;
    let v = this.face[face][index];
    adjVerts.push(v);
    let f = 0;
    while (faces.length > 0) {
      face = faces[f];
      if (this.face[face].indexOf(v) > -1) {
        index = (this.face[face].indexOf(v) + 1) % 3;
        v = this.face[face][index];
        adjVerts.push(v);
        dualFaces.push(face);
        faces.splice(f, 1);
        f = 0;
      } else {
        f++;
      }
    }
    this.adjacentFaces.push(adjVerts);
    return dualFaces;
  }
  /**
   * @internal
   */
  toGoldbergPolyhedronData() {
    const goldbergPolyhedronData = new PolyhedronData("GeoDual", "Goldberg", [], []);
    goldbergPolyhedronData.name = "GD dual";
    const verticesNb = this.vertex.length;
    const map = new Array(verticesNb);
    for (let v = 0; v < verticesNb; v++) {
      map[v] = [];
    }
    for (let f = 0; f < this.face.length; f++) {
      for (let i = 0; i < 3; i++) {
        map[this.face[f][i]].push(f);
      }
    }
    let cx = 0;
    let cy = 0;
    let cz = 0;
    let face = [];
    let vertex = [];
    this.adjacentFaces = [];
    for (let m = 0; m < map.length; m++) {
      goldbergPolyhedronData.face[m] = this.setOrder(m, map[m].concat([]));
      map[m].forEach((el) => {
        cx = 0;
        cy = 0;
        cz = 0;
        face = this.face[el];
        for (let i = 0; i < 3; i++) {
          vertex = this.vertex[face[i]];
          cx += vertex[0];
          cy += vertex[1];
          cz += vertex[2];
        }
        goldbergPolyhedronData.vertex[el] = [cx / 3, cy / 3, cz / 3];
      });
    }
    return goldbergPolyhedronData;
  }
  //statics
  /**Builds the data for a Geodesic Polyhedron from a primary triangle
   * @param primTri the primary triangle
   * @internal
   */
  static BuildGeodesicData(primTri) {
    const geodesicData = new _GeodesicData("Geodesic-m-n", "Geodesic", [
      [0, PHI, -1],
      [-PHI, 1, 0],
      [-1, 0, -PHI],
      [1, 0, -PHI],
      [PHI, 1, 0],
      [0, PHI, 1],
      [-1, 0, PHI],
      [-PHI, -1, 0],
      [0, -PHI, -1],
      [PHI, -1, 0],
      [1, 0, PHI],
      [0, -PHI, 1]
    ], []);
    primTri.setIndices();
    primTri.calcCoeffs();
    primTri.createInnerFacets();
    primTri.edgeVecsABOB();
    primTri.mapABOBtoOBOA();
    primTri.mapABOBtoBAOA();
    for (let f = 0; f < primTri.IDATA.face.length; f++) {
      primTri.MapToFace(f, geodesicData);
      geodesicData.innerToData(f, primTri);
      if (primTri.IDATA.edgematch[f][1] === "B") {
        geodesicData.mapABOBtoDATA(f, primTri);
      }
      if (primTri.IDATA.edgematch[f][1] === "O") {
        geodesicData.mapOBOAtoDATA(f, primTri);
      }
      if (primTri.IDATA.edgematch[f][3] === "A") {
        geodesicData.mapBAOAtoDATA(f, primTri);
      }
    }
    geodesicData.orderData(primTri);
    const radius = 1;
    geodesicData.vertex = geodesicData.vertex.map(function(el) {
      const a = el[0];
      const b = el[1];
      const c = el[2];
      const d = Math.sqrt(a * a + b * b + c * c);
      el[0] *= radius / d;
      el[1] *= radius / d;
      el[2] *= radius / d;
      return el;
    });
    return geodesicData;
  }
};

// node_modules/@babylonjs/core/Meshes/Builders/geodesicBuilder.js
function CreateGeodesic(name, options, scene = null) {
  let m = options.m || 1;
  if (m !== Math.floor(m)) {
    m = Math.floor(m);
    Logger.Warn("m not an integer only floor(m) used");
  }
  let n = options.n || 0;
  if (n !== Math.floor(n)) {
    n = Math.floor(n);
    Logger.Warn("n not an integer only floor(n) used");
  }
  if (n > m) {
    const temp = n;
    n = m;
    m = temp;
    Logger.Warn("n > m therefore m and n swapped");
  }
  const primTri = new _PrimaryIsoTriangle();
  primTri.build(m, n);
  const geodesicData = GeodesicData.BuildGeodesicData(primTri);
  const geoOptions = {
    custom: geodesicData,
    size: options.size,
    sizeX: options.sizeX,
    sizeY: options.sizeY,
    sizeZ: options.sizeZ,
    faceUV: options.faceUV,
    faceColors: options.faceColors,
    flat: options.flat,
    updatable: options.updatable,
    sideOrientation: options.sideOrientation,
    frontUVs: options.frontUVs,
    backUVs: options.backUVs
  };
  const geodesic = CreatePolyhedron(name, geoOptions, scene);
  return geodesic;
}

// node_modules/@babylonjs/core/Meshes/goldbergMesh.js
Mesh._GoldbergMeshParser = (parsedMesh, scene) => {
  return GoldbergMesh.Parse(parsedMesh, scene);
};
var GoldbergMesh = class _GoldbergMesh extends Mesh {
  constructor() {
    super(...arguments);
    this.goldbergData = {
      faceColors: [],
      faceCenters: [],
      faceZaxis: [],
      faceXaxis: [],
      faceYaxis: [],
      nbSharedFaces: 0,
      nbUnsharedFaces: 0,
      nbFaces: 0,
      nbFacesAtPole: 0,
      adjacentFaces: []
    };
  }
  /**
   * Gets the related Goldberg face from pole infos
   * @param poleOrShared Defines the pole index or the shared face index if the fromPole parameter is passed in
   * @param fromPole Defines an optional pole index to find the related info from
   * @returns the goldberg face number
   */
  relatedGoldbergFace(poleOrShared, fromPole) {
    if (fromPole === void 0) {
      if (poleOrShared > this.goldbergData.nbUnsharedFaces - 1) {
        Logger.Warn("Maximum number of unshared faces used");
        poleOrShared = this.goldbergData.nbUnsharedFaces - 1;
      }
      return this.goldbergData.nbUnsharedFaces + poleOrShared;
    }
    if (poleOrShared > 11) {
      Logger.Warn("Last pole used");
      poleOrShared = 11;
    }
    if (fromPole > this.goldbergData.nbFacesAtPole - 1) {
      Logger.Warn("Maximum number of faces at a pole used");
      fromPole = this.goldbergData.nbFacesAtPole - 1;
    }
    return 12 + poleOrShared * this.goldbergData.nbFacesAtPole + fromPole;
  }
  _changeGoldbergFaceColors(colorRange) {
    for (let i = 0; i < colorRange.length; i++) {
      const min = colorRange[i][0];
      const max = colorRange[i][1];
      const col = colorRange[i][2];
      for (let f = min; f < max + 1; f++) {
        this.goldbergData.faceColors[f] = col;
      }
    }
    const newCols = [];
    for (let f = 0; f < 12; f++) {
      for (let i = 0; i < 5; i++) {
        newCols.push(this.goldbergData.faceColors[f].r, this.goldbergData.faceColors[f].g, this.goldbergData.faceColors[f].b, this.goldbergData.faceColors[f].a);
      }
    }
    for (let f = 12; f < this.goldbergData.faceColors.length; f++) {
      for (let i = 0; i < 6; i++) {
        newCols.push(this.goldbergData.faceColors[f].r, this.goldbergData.faceColors[f].g, this.goldbergData.faceColors[f].b, this.goldbergData.faceColors[f].a);
      }
    }
    return newCols;
  }
  /**
   * Set new goldberg face colors
   * @param colorRange the new color to apply to the mesh
   */
  setGoldbergFaceColors(colorRange) {
    const newCols = this._changeGoldbergFaceColors(colorRange);
    this.setVerticesData(VertexBuffer.ColorKind, newCols);
  }
  /**
   * Updates new goldberg face colors
   * @param colorRange the new color to apply to the mesh
   */
  updateGoldbergFaceColors(colorRange) {
    const newCols = this._changeGoldbergFaceColors(colorRange);
    this.updateVerticesData(VertexBuffer.ColorKind, newCols);
  }
  _changeGoldbergFaceUVs(uvRange) {
    const uvs = this.getVerticesData(VertexBuffer.UVKind);
    for (let i = 0; i < uvRange.length; i++) {
      const min = uvRange[i][0];
      const max = uvRange[i][1];
      const center = uvRange[i][2];
      const radius = uvRange[i][3];
      const angle = uvRange[i][4];
      const points5 = [];
      const points6 = [];
      let u;
      let v;
      for (let p = 0; p < 5; p++) {
        u = center.x + radius * Math.cos(angle + p * Math.PI / 2.5);
        v = center.y + radius * Math.sin(angle + p * Math.PI / 2.5);
        if (u < 0) {
          u = 0;
        }
        if (u > 1) {
          u = 1;
        }
        points5.push(u, v);
      }
      for (let p = 0; p < 6; p++) {
        u = center.x + radius * Math.cos(angle + p * Math.PI / 3);
        v = center.y + radius * Math.sin(angle + p * Math.PI / 3);
        if (u < 0) {
          u = 0;
        }
        if (u > 1) {
          u = 1;
        }
        points6.push(u, v);
      }
      for (let f = min; f < Math.min(12, max + 1); f++) {
        for (let p = 0; p < 5; p++) {
          uvs[10 * f + 2 * p] = points5[2 * p];
          uvs[10 * f + 2 * p + 1] = points5[2 * p + 1];
        }
      }
      for (let f = Math.max(12, min); f < max + 1; f++) {
        for (let p = 0; p < 6; p++) {
          uvs[12 * f - 24 + 2 * p] = points6[2 * p];
          uvs[12 * f - 23 + 2 * p] = points6[2 * p + 1];
        }
      }
    }
    return uvs;
  }
  /**
   * set new goldberg face UVs
   * @param uvRange the new UVs to apply to the mesh
   */
  setGoldbergFaceUVs(uvRange) {
    const newUVs = this._changeGoldbergFaceUVs(uvRange);
    this.setVerticesData(VertexBuffer.UVKind, newUVs);
  }
  /**
   * Updates new goldberg face UVs
   * @param uvRange the new UVs to apply to the mesh
   */
  updateGoldbergFaceUVs(uvRange) {
    const newUVs = this._changeGoldbergFaceUVs(uvRange);
    this.updateVerticesData(VertexBuffer.UVKind, newUVs);
  }
  /**
   * Places a mesh on a particular face of the goldberg polygon
   * @param mesh Defines the mesh to position
   * @param face Defines the face to position onto
   * @param position Defines the position relative to the face we are positioning the mesh onto
   */
  placeOnGoldbergFaceAt(mesh, face, position) {
    const orientation = Vector3.RotationFromAxis(this.goldbergData.faceXaxis[face], this.goldbergData.faceYaxis[face], this.goldbergData.faceZaxis[face]);
    mesh.rotation = orientation;
    mesh.position = this.goldbergData.faceCenters[face].add(this.goldbergData.faceXaxis[face].scale(position.x)).add(this.goldbergData.faceYaxis[face].scale(position.y)).add(this.goldbergData.faceZaxis[face].scale(position.z));
  }
  /**
   * Serialize current mesh
   * @param serializationObject defines the object which will receive the serialization data
   */
  serialize(serializationObject) {
    super.serialize(serializationObject);
    serializationObject.type = "GoldbergMesh";
    const goldbergData = {};
    goldbergData.adjacentFaces = this.goldbergData.adjacentFaces;
    goldbergData.nbSharedFaces = this.goldbergData.nbSharedFaces;
    goldbergData.nbUnsharedFaces = this.goldbergData.nbUnsharedFaces;
    goldbergData.nbFaces = this.goldbergData.nbFaces;
    goldbergData.nbFacesAtPole = this.goldbergData.nbFacesAtPole;
    if (this.goldbergData.faceColors) {
      goldbergData.faceColors = [];
      for (const color of this.goldbergData.faceColors) {
        goldbergData.faceColors.push(color.asArray());
      }
    }
    if (this.goldbergData.faceCenters) {
      goldbergData.faceCenters = [];
      for (const vector of this.goldbergData.faceCenters) {
        goldbergData.faceCenters.push(vector.asArray());
      }
    }
    if (this.goldbergData.faceZaxis) {
      goldbergData.faceZaxis = [];
      for (const vector of this.goldbergData.faceZaxis) {
        goldbergData.faceZaxis.push(vector.asArray());
      }
    }
    if (this.goldbergData.faceYaxis) {
      goldbergData.faceYaxis = [];
      for (const vector of this.goldbergData.faceYaxis) {
        goldbergData.faceYaxis.push(vector.asArray());
      }
    }
    if (this.goldbergData.faceXaxis) {
      goldbergData.faceXaxis = [];
      for (const vector of this.goldbergData.faceXaxis) {
        goldbergData.faceXaxis.push(vector.asArray());
      }
    }
    serializationObject.goldbergData = goldbergData;
  }
  /**
   * Parses a serialized goldberg mesh
   * @param parsedMesh the serialized mesh
   * @param scene the scene to create the goldberg mesh in
   * @returns the created goldberg mesh
   */
  static Parse(parsedMesh, scene) {
    const goldbergData = parsedMesh.goldbergData;
    goldbergData.faceColors = goldbergData.faceColors.map((el) => Color4.FromArray(el));
    goldbergData.faceCenters = goldbergData.faceCenters.map((el) => Vector3.FromArray(el));
    goldbergData.faceZaxis = goldbergData.faceZaxis.map((el) => Vector3.FromArray(el));
    goldbergData.faceXaxis = goldbergData.faceXaxis.map((el) => Vector3.FromArray(el));
    goldbergData.faceYaxis = goldbergData.faceYaxis.map((el) => Vector3.FromArray(el));
    const goldberg = new _GoldbergMesh(parsedMesh.name, scene);
    goldberg.goldbergData = goldbergData;
    return goldberg;
  }
};

// node_modules/@babylonjs/core/Meshes/Builders/goldbergBuilder.js
function CreateGoldbergVertexData(options, goldbergData) {
  const size = options.size;
  const sizeX = options.sizeX || size || 1;
  const sizeY = options.sizeY || size || 1;
  const sizeZ = options.sizeZ || size || 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const positions = [];
  const indices = [];
  const normals = [];
  const uvs = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let v = 0; v < goldbergData.vertex.length; v++) {
    minX = Math.min(minX, goldbergData.vertex[v][0] * sizeX);
    maxX = Math.max(maxX, goldbergData.vertex[v][0] * sizeX);
    minY = Math.min(minY, goldbergData.vertex[v][1] * sizeY);
    maxY = Math.max(maxY, goldbergData.vertex[v][1] * sizeY);
  }
  let index = 0;
  for (let f = 0; f < goldbergData.face.length; f++) {
    const verts = goldbergData.face[f];
    const a = Vector3.FromArray(goldbergData.vertex[verts[0]]);
    const b = Vector3.FromArray(goldbergData.vertex[verts[2]]);
    const c = Vector3.FromArray(goldbergData.vertex[verts[1]]);
    const ba = b.subtract(a);
    const ca = c.subtract(a);
    const norm = Vector3.Cross(ca, ba).normalize();
    for (let v = 0; v < verts.length; v++) {
      normals.push(norm.x, norm.y, norm.z);
      const pdata = goldbergData.vertex[verts[v]];
      positions.push(pdata[0] * sizeX, pdata[1] * sizeY, pdata[2] * sizeZ);
      const vCoord = (pdata[1] * sizeY - minY) / (maxY - minY);
      uvs.push((pdata[0] * sizeX - minX) / (maxX - minX), useOpenGLOrientationForUV ? 1 - vCoord : vCoord);
    }
    for (let v = 0; v < verts.length - 2; v++) {
      indices.push(index, index + v + 2, index + v + 1);
    }
    index += verts.length;
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs);
  const vertexData = new VertexData();
  vertexData.positions = positions;
  vertexData.indices = indices;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateGoldberg(name, options, scene = null) {
  const size = options.size;
  const sizeX = options.sizeX || size || 1;
  const sizeY = options.sizeY || size || 1;
  const sizeZ = options.sizeZ || size || 1;
  let m = options.m || 1;
  if (m !== Math.floor(m)) {
    m = Math.floor(m);
    Logger.Warn("m not an integer only floor(m) used");
  }
  let n = options.n || 0;
  if (n !== Math.floor(n)) {
    n = Math.floor(n);
    Logger.Warn("n not an integer only floor(n) used");
  }
  if (n > m) {
    const temp = n;
    n = m;
    m = temp;
    Logger.Warn("n > m therefore m and n swapped");
  }
  const primTri = new _PrimaryIsoTriangle();
  primTri.build(m, n);
  const geodesicData = GeodesicData.BuildGeodesicData(primTri);
  const goldbergData = geodesicData.toGoldbergPolyhedronData();
  const goldberg = new GoldbergMesh(name, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  goldberg._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateGoldbergVertexData(options, goldbergData);
  vertexData.applyToMesh(goldberg, options.updatable);
  goldberg.goldbergData.nbSharedFaces = geodesicData.sharedNodes;
  goldberg.goldbergData.nbUnsharedFaces = geodesicData.poleNodes;
  goldberg.goldbergData.adjacentFaces = geodesicData.adjacentFaces;
  goldberg.goldbergData.nbFaces = goldberg.goldbergData.nbSharedFaces + goldberg.goldbergData.nbUnsharedFaces;
  goldberg.goldbergData.nbFacesAtPole = (goldberg.goldbergData.nbUnsharedFaces - 12) / 12;
  for (let f = 0; f < geodesicData.vertex.length; f++) {
    goldberg.goldbergData.faceCenters.push(Vector3.FromArray(geodesicData.vertex[f]));
    goldberg.goldbergData.faceCenters[f].x *= sizeX;
    goldberg.goldbergData.faceCenters[f].y *= sizeY;
    goldberg.goldbergData.faceCenters[f].z *= sizeZ;
    goldberg.goldbergData.faceColors.push(new Color4(1, 1, 1, 1));
  }
  for (let f = 0; f < goldbergData.face.length; f++) {
    const verts = goldbergData.face[f];
    const a = Vector3.FromArray(goldbergData.vertex[verts[0]]);
    const b = Vector3.FromArray(goldbergData.vertex[verts[2]]);
    const c = Vector3.FromArray(goldbergData.vertex[verts[1]]);
    const ba = b.subtract(a);
    const ca = c.subtract(a);
    const norm = Vector3.Cross(ca, ba).normalize();
    const z = Vector3.Cross(ca, norm).normalize();
    goldberg.goldbergData.faceXaxis.push(ca.normalize());
    goldberg.goldbergData.faceYaxis.push(norm);
    goldberg.goldbergData.faceZaxis.push(z);
  }
  return goldberg;
}

// node_modules/@babylonjs/core/Meshes/Builders/textBuilder.js
var ShapePath = class {
  /** Create the ShapePath used to support glyphs
   * @param resolution defines the resolution used to determine the number of points per curve (default is 4)
   */
  constructor(resolution) {
    this._paths = [];
    this._tempPaths = [];
    this._holes = [];
    this._resolution = resolution;
  }
  /** Move the virtual cursor to a coordinate
   * @param x defines the x coordinate
   * @param y defines the y coordinate
   */
  moveTo(x, y) {
    this._currentPath = new Path2(x, y);
    this._tempPaths.push(this._currentPath);
  }
  /** Draw a line from the virtual cursor to a given coordinate
   * @param x defines the x coordinate
   * @param y defines the y coordinate
   */
  lineTo(x, y) {
    this._currentPath.addLineTo(x, y);
  }
  /** Create a quadratic curve from the virtual cursor to a given coordinate
   * @param cpx defines the x coordinate of the control point
   * @param cpy defines the y coordinate of the control point
   * @param x defines the x coordinate of the end point
   * @param y defines the y coordinate of the end point
   */
  quadraticCurveTo(cpx, cpy, x, y) {
    this._currentPath.addQuadraticCurveTo(cpx, cpy, x, y, this._resolution);
  }
  /**
   * Create a bezier curve from the virtual cursor to a given coordinate
   * @param cpx1 defines the x coordinate of the first control point
   * @param cpy1 defines the y coordinate of the first control point
   * @param cpx2 defines the x coordinate of the second control point
   * @param cpy2 defines the y coordinate of the second control point
   * @param x defines the x coordinate of the end point
   * @param y defines the y coordinate of the end point
   */
  bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y) {
    this._currentPath.addBezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y, this._resolution);
  }
  /** Extract holes based on CW / CCW */
  extractHoles() {
    for (const path of this._tempPaths) {
      if (path.area() > 0) {
        this._holes.push(path);
      } else {
        this._paths.push(path);
      }
    }
    if (!this._paths.length && this._holes.length) {
      const temp = this._holes;
      this._holes = this._paths;
      this._paths = temp;
    }
    this._tempPaths.length = 0;
  }
  /** Gets the list of paths */
  get paths() {
    return this._paths;
  }
  /** Gets the list of holes */
  get holes() {
    return this._holes;
  }
};
function CreateShapePath(char, scale, offsetX, offsetY, resolution, fontData) {
  const glyph = fontData.glyphs[char] || fontData.glyphs["?"];
  if (!glyph) {
    return null;
  }
  const shapePath = new ShapePath(resolution);
  if (glyph.o) {
    const outline = glyph.o.split(" ");
    for (let i = 0, l = outline.length; i < l; ) {
      const action = outline[i++];
      switch (action) {
        case "m": {
          const x = parseInt(outline[i++]) * scale + offsetX;
          const y = parseInt(outline[i++]) * scale + offsetY;
          shapePath.moveTo(x, y);
          break;
        }
        case "l": {
          const x = parseInt(outline[i++]) * scale + offsetX;
          const y = parseInt(outline[i++]) * scale + offsetY;
          shapePath.lineTo(x, y);
          break;
        }
        case "q": {
          const cpx = parseInt(outline[i++]) * scale + offsetX;
          const cpy = parseInt(outline[i++]) * scale + offsetY;
          const cpx1 = parseInt(outline[i++]) * scale + offsetX;
          const cpy1 = parseInt(outline[i++]) * scale + offsetY;
          shapePath.quadraticCurveTo(cpx1, cpy1, cpx, cpy);
          break;
        }
        case "b": {
          const cpx = parseInt(outline[i++]) * scale + offsetX;
          const cpy = parseInt(outline[i++]) * scale + offsetY;
          const cpx1 = parseInt(outline[i++]) * scale + offsetX;
          const cpy1 = parseInt(outline[i++]) * scale + offsetY;
          const cpx2 = parseInt(outline[i++]) * scale + offsetX;
          const cpy2 = parseInt(outline[i++]) * scale + offsetY;
          shapePath.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy);
          break;
        }
      }
    }
  }
  shapePath.extractHoles();
  return { offsetX: glyph.ha * scale, shapePath };
}
function CreateTextShapePaths(text, size, resolution, fontData) {
  const chars = Array.from(text);
  const scale = size / fontData.resolution;
  const line_height = (fontData.boundingBox.yMax - fontData.boundingBox.yMin + fontData.underlineThickness) * scale;
  const shapePaths = [];
  let offsetX = 0, offsetY = 0;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === "\n") {
      offsetX = 0;
      offsetY -= line_height;
    } else {
      const ret = CreateShapePath(char, scale, offsetX, offsetY, resolution, fontData);
      if (ret) {
        offsetX += ret.offsetX;
        shapePaths.push(ret.shapePath);
      }
    }
  }
  return shapePaths;
}
function CreateText(name, text, fontData, options = {
  size: 50,
  resolution: 8,
  depth: 1
}, scene = null, earcutInjection = earcut) {
  var _a, _b;
  const shapePaths = CreateTextShapePaths(text, options.size || 50, options.resolution || 8, fontData);
  const meshes = [];
  let letterIndex = 0;
  for (const shapePath of shapePaths) {
    if (!shapePath.paths.length) {
      continue;
    }
    const holes = shapePath.holes.slice();
    for (const path of shapePath.paths) {
      const holeVectors = [];
      const shapeVectors = [];
      const points = path.getPoints();
      for (const point of points) {
        shapeVectors.push(new Vector3(point.x, 0, point.y));
      }
      const localHolesCopy = holes.slice();
      for (const hole of localHolesCopy) {
        const points2 = hole.getPoints();
        let found = false;
        for (const point of points2) {
          if (path.isPointInside(point)) {
            found = true;
            break;
          }
        }
        if (!found) {
          continue;
        }
        const holePoints = [];
        for (const point of points2) {
          holePoints.push(new Vector3(point.x, 0, point.y));
        }
        holeVectors.push(holePoints);
        holes.splice(holes.indexOf(hole), 1);
      }
      if (!holeVectors.length && holes.length) {
        for (const hole of holes) {
          const points2 = hole.getPoints();
          const holePoints = [];
          for (const point of points2) {
            holePoints.push(new Vector3(point.x, 0, point.y));
          }
          holeVectors.push(holePoints);
        }
      }
      const mesh = ExtrudePolygon(name, {
        shape: shapeVectors,
        holes: holeVectors.length ? holeVectors : void 0,
        depth: options.depth || 1,
        faceUV: options.faceUV || ((_a = options.perLetterFaceUV) == null ? void 0 : _a.call(options, letterIndex)),
        faceColors: options.faceColors || ((_b = options.perLetterFaceColors) == null ? void 0 : _b.call(options, letterIndex)),
        sideOrientation: Mesh._GetDefaultSideOrientation(options.sideOrientation || Mesh.DOUBLESIDE)
      }, scene, earcutInjection);
      meshes.push(mesh);
      letterIndex++;
    }
  }
  const newMesh = Mesh.MergeMeshes(meshes, true, true);
  if (newMesh) {
    const bbox = newMesh.getBoundingInfo().boundingBox;
    newMesh.position.x += -(bbox.minimumWorld.x + bbox.maximumWorld.x) / 2;
    newMesh.position.y += -(bbox.minimumWorld.y + bbox.maximumWorld.y) / 2;
    newMesh.position.z += -(bbox.minimumWorld.z + bbox.maximumWorld.z) / 2 + bbox.extendSize.z;
    newMesh.name = name;
    const pivot = new TransformNode("pivot", scene);
    pivot.rotation.x = -Math.PI / 2;
    newMesh.parent = pivot;
    newMesh.bakeCurrentTransformIntoVertices();
    newMesh.parent = null;
    pivot.dispose();
  }
  return newMesh;
}

// node_modules/@babylonjs/core/Meshes/meshBuilder.js
var MeshBuilder = {
  CreateBox,
  CreateTiledBox,
  CreateSphere,
  CreateDisc,
  CreateIcoSphere,
  CreateRibbon,
  CreateCylinder,
  CreateTorus,
  CreateTorusKnot,
  CreateLineSystem,
  CreateLines,
  CreateDashedLines,
  ExtrudeShape,
  ExtrudeShapeCustom,
  CreateLathe,
  CreateTiledPlane,
  CreatePlane,
  CreateGround,
  CreateTiledGround,
  CreateGroundFromHeightMap,
  CreatePolygon,
  ExtrudePolygon,
  CreateTube,
  CreatePolyhedron,
  CreateGeodesic,
  CreateGoldberg,
  CreateDecal,
  CreateCapsule,
  CreateText
};
export {
  MeshBuilder
};
//# sourceMappingURL=@babylonjs_core_Meshes_meshBuilder.js.map
