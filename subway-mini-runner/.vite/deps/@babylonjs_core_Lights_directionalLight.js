import {
  Light
} from "./chunk-44DNM2GM.js";
import "./chunk-WZM6GV37.js";
import {
  Node
} from "./chunk-HI5D57IO.js";
import "./chunk-S7FLS6J4.js";
import "./chunk-VLQF4VVG.js";
import {
  Axis
} from "./chunk-M6X33RZV.js";
import {
  __decorate,
  serialize,
  serializeAsVector3
} from "./chunk-SVMC4EBE.js";
import "./chunk-PIASBTZO.js";
import {
  Matrix,
  TmpVectors,
  Vector3
} from "./chunk-NSAPKY2D.js";
import "./chunk-WEEGRZSP.js";
import "./chunk-U2ZTKOT3.js";
import "./chunk-XPTICEO2.js";
import "./chunk-SEACPUNZ.js";
import "./chunk-5AJSY7TL.js";
import "./chunk-EFRFZ7OU.js";
import {
  RegisterClass
} from "./chunk-P24HYHXQ.js";
import "./chunk-DSTTD374.js";

// node_modules/@babylonjs/core/Lights/shadowLight.js
var ShadowLight = class extends Light {
  constructor() {
    super(...arguments);
    this._needProjectionMatrixCompute = true;
    this._viewMatrix = Matrix.Identity();
    this._projectionMatrix = Matrix.Identity();
  }
  _setPosition(value) {
    this._position = value;
  }
  /**
   * Sets the position the shadow will be casted from. Also use as the light position for both
   * point and spot lights.
   */
  get position() {
    return this._position;
  }
  /**
   * Sets the position the shadow will be casted from. Also use as the light position for both
   * point and spot lights.
   */
  set position(value) {
    this._setPosition(value);
  }
  _setDirection(value) {
    this._direction = value;
  }
  /**
   * In 2d mode (needCube being false), gets the direction used to cast the shadow.
   * Also use as the light direction on spot and directional lights.
   */
  get direction() {
    return this._direction;
  }
  /**
   * In 2d mode (needCube being false), sets the direction used to cast the shadow.
   * Also use as the light direction on spot and directional lights.
   */
  set direction(value) {
    this._setDirection(value);
  }
  /**
   * Gets the shadow projection clipping minimum z value.
   */
  get shadowMinZ() {
    return this._shadowMinZ;
  }
  /**
   * Sets the shadow projection clipping minimum z value.
   */
  set shadowMinZ(value) {
    this._shadowMinZ = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Sets the shadow projection clipping maximum z value.
   */
  get shadowMaxZ() {
    return this._shadowMaxZ;
  }
  /**
   * Gets the shadow projection clipping maximum z value.
   */
  set shadowMaxZ(value) {
    this._shadowMaxZ = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Computes the transformed information (transformedPosition and transformedDirection in World space) of the current light
   * @returns true if the information has been computed, false if it does not need to (no parenting)
   */
  computeTransformedInformation() {
    if (this.parent && this.parent.getWorldMatrix) {
      if (!this.transformedPosition) {
        this.transformedPosition = Vector3.Zero();
      }
      Vector3.TransformCoordinatesToRef(this.position, this.parent.getWorldMatrix(), this.transformedPosition);
      if (this.direction) {
        if (!this.transformedDirection) {
          this.transformedDirection = Vector3.Zero();
        }
        Vector3.TransformNormalToRef(this.direction, this.parent.getWorldMatrix(), this.transformedDirection);
      }
      return true;
    }
    return false;
  }
  /**
   * Return the depth scale used for the shadow map.
   * @returns the depth scale.
   */
  getDepthScale() {
    return 50;
  }
  /**
   * Get the direction to use to render the shadow map. In case of cube texture, the face index can be passed.
   * @param faceIndex The index of the face we are computed the direction to generate shadow
   * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getShadowDirection(faceIndex) {
    return this.transformedDirection ? this.transformedDirection : this.direction;
  }
  /**
   * If computeTransformedInformation has been called, returns the ShadowLight absolute position in the world. Otherwise, returns the local position.
   * @returns the position vector in world space
   */
  getAbsolutePosition() {
    return this.transformedPosition ? this.transformedPosition : this.position;
  }
  /**
   * Sets the ShadowLight direction toward the passed target.
   * @param target The point to target in local space
   * @returns the updated ShadowLight direction
   */
  setDirectionToTarget(target) {
    this.direction = Vector3.Normalize(target.subtract(this.position));
    return this.direction;
  }
  /**
   * Returns the light rotation in euler definition.
   * @returns the x y z rotation in local space.
   */
  getRotation() {
    this.direction.normalize();
    const xaxis = Vector3.Cross(this.direction, Axis.Y);
    const yaxis = Vector3.Cross(xaxis, this.direction);
    return Vector3.RotationFromAxis(xaxis, yaxis, this.direction);
  }
  /**
   * Returns whether or not the shadow generation require a cube texture or a 2d texture.
   * @returns true if a cube texture needs to be use
   */
  needCube() {
    return false;
  }
  /**
   * Detects if the projection matrix requires to be recomputed this frame.
   * @returns true if it requires to be recomputed otherwise, false.
   */
  needProjectionMatrixCompute() {
    return this._needProjectionMatrixCompute;
  }
  /**
   * Forces the shadow generator to recompute the projection matrix even if position and direction did not changed.
   */
  forceProjectionMatrixCompute() {
    this._needProjectionMatrixCompute = true;
  }
  /** @internal */
  _initCache() {
    super._initCache();
    this._cache.position = Vector3.Zero();
  }
  /** @internal */
  _isSynchronized() {
    if (!this._cache.position.equals(this.position)) {
      return false;
    }
    return true;
  }
  /**
   * Computes the world matrix of the node
   * @param force defines if the cache version should be invalidated forcing the world matrix to be created from scratch
   * @returns the world matrix
   */
  computeWorldMatrix(force) {
    if (!force && this.isSynchronized()) {
      this._currentRenderId = this.getScene().getRenderId();
      return this._worldMatrix;
    }
    this._updateCache();
    this._cache.position.copyFrom(this.position);
    if (!this._worldMatrix) {
      this._worldMatrix = Matrix.Identity();
    }
    Matrix.TranslationToRef(this.position.x, this.position.y, this.position.z, this._worldMatrix);
    if (this.parent && this.parent.getWorldMatrix) {
      this._worldMatrix.multiplyToRef(this.parent.getWorldMatrix(), this._worldMatrix);
      this._markSyncedWithParent();
    }
    this._worldMatrixDeterminantIsDirty = true;
    return this._worldMatrix;
  }
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the min for
   * @returns the depth min z
   */
  getDepthMinZ(activeCamera) {
    return this.shadowMinZ !== void 0 ? this.shadowMinZ : (activeCamera == null ? void 0 : activeCamera.minZ) || 0;
  }
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the max for
   * @returns the depth max z
   */
  getDepthMaxZ(activeCamera) {
    return this.shadowMaxZ !== void 0 ? this.shadowMaxZ : (activeCamera == null ? void 0 : activeCamera.maxZ) || 1e4;
  }
  /**
   * Sets the shadow projection matrix in parameter to the generated projection matrix.
   * @param matrix The matrix to updated with the projection information
   * @param viewMatrix The transform matrix of the light
   * @param renderList The list of mesh to render in the map
   * @returns The current light
   */
  setShadowProjectionMatrix(matrix, viewMatrix, renderList) {
    if (this.customProjectionMatrixBuilder) {
      this.customProjectionMatrixBuilder(viewMatrix, renderList, matrix);
    } else {
      this._setDefaultShadowProjectionMatrix(matrix, viewMatrix, renderList);
    }
    return this;
  }
  /** @internal */
  _syncParentEnabledState() {
    super._syncParentEnabledState();
    if (!this.parent || !this.parent.getWorldMatrix) {
      this.transformedPosition = null;
      this.transformedDirection = null;
    }
  }
  /**
   * Returns the view matrix.
   * @param faceIndex The index of the face for which we want to extract the view matrix. Only used for point light types.
   * @returns The view matrix. Can be null, if a view matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
   */
  getViewMatrix(faceIndex) {
    const lightDirection = TmpVectors.Vector3[0];
    let lightPosition = this.position;
    if (this.computeTransformedInformation()) {
      lightPosition = this.transformedPosition;
    }
    Vector3.NormalizeToRef(this.getShadowDirection(faceIndex), lightDirection);
    if (Math.abs(Vector3.Dot(lightDirection, Vector3.Up())) === 1) {
      lightDirection.z = 1e-13;
    }
    const lightTarget = TmpVectors.Vector3[1];
    lightPosition.addToRef(lightDirection, lightTarget);
    Matrix.LookAtLHToRef(lightPosition, lightTarget, Vector3.Up(), this._viewMatrix);
    return this._viewMatrix;
  }
  /**
   * Returns the projection matrix.
   * Note that viewMatrix and renderList are optional and are only used by lights that calculate the projection matrix from a list of meshes (e.g. directional lights with automatic extents calculation).
   * @param viewMatrix The view transform matrix of the light (optional).
   * @param renderList The list of meshes to take into account when calculating the projection matrix (optional).
   * @returns The projection matrix. Can be null, if a projection matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
   */
  getProjectionMatrix(viewMatrix, renderList) {
    this.setShadowProjectionMatrix(this._projectionMatrix, viewMatrix ?? this._viewMatrix, renderList ?? []);
    return this._projectionMatrix;
  }
};
__decorate([
  serializeAsVector3()
], ShadowLight.prototype, "position", null);
__decorate([
  serializeAsVector3()
], ShadowLight.prototype, "direction", null);
__decorate([
  serialize()
], ShadowLight.prototype, "shadowMinZ", null);
__decorate([
  serialize()
], ShadowLight.prototype, "shadowMaxZ", null);

// node_modules/@babylonjs/core/Lights/directionalLight.js
Node.AddNodeConstructor("Light_Type_1", (name, scene) => {
  return () => new DirectionalLight(name, Vector3.Zero(), scene);
});
var DirectionalLight = class extends ShadowLight {
  /**
   * Fix frustum size for the shadow generation. This is disabled if the value is 0.
   */
  get shadowFrustumSize() {
    return this._shadowFrustumSize;
  }
  /**
   * Specifies a fix frustum size for the shadow generation.
   */
  set shadowFrustumSize(value) {
    this._shadowFrustumSize = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Gets the shadow projection scale against the optimal computed one.
   * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
   * This does not impact in fixed frustum size (shadowFrustumSize being set)
   */
  get shadowOrthoScale() {
    return this._shadowOrthoScale;
  }
  /**
   * Sets the shadow projection scale against the optimal computed one.
   * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
   * This does not impact in fixed frustum size (shadowFrustumSize being set)
   */
  set shadowOrthoScale(value) {
    this._shadowOrthoScale = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Gets or sets the orthoLeft property used to build the light frustum
   */
  get orthoLeft() {
    return this._orthoLeft;
  }
  set orthoLeft(left) {
    this._orthoLeft = left;
  }
  /**
   * Gets or sets the orthoRight property used to build the light frustum
   */
  get orthoRight() {
    return this._orthoRight;
  }
  set orthoRight(right) {
    this._orthoRight = right;
  }
  /**
   * Gets or sets the orthoTop property used to build the light frustum
   */
  get orthoTop() {
    return this._orthoTop;
  }
  set orthoTop(top) {
    this._orthoTop = top;
  }
  /**
   * Gets or sets the orthoBottom property used to build the light frustum
   */
  get orthoBottom() {
    return this._orthoBottom;
  }
  set orthoBottom(bottom) {
    this._orthoBottom = bottom;
  }
  /**
   * Creates a DirectionalLight object in the scene, oriented towards the passed direction (Vector3).
   * The directional light is emitted from everywhere in the given direction.
   * It can cast shadows.
   * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
   * @param name The friendly name of the light
   * @param direction The direction of the light
   * @param scene The scene the light belongs to
   */
  constructor(name, direction, scene) {
    super(name, scene);
    this._shadowFrustumSize = 0;
    this._shadowOrthoScale = 0.1;
    this.autoUpdateExtends = true;
    this.autoCalcShadowZBounds = false;
    this._orthoLeft = Number.MAX_VALUE;
    this._orthoRight = Number.MIN_VALUE;
    this._orthoTop = Number.MIN_VALUE;
    this._orthoBottom = Number.MAX_VALUE;
    this.position = direction.scale(-1);
    this.direction = direction;
  }
  /**
   * Returns the string "DirectionalLight".
   * @returns The class name
   */
  getClassName() {
    return "DirectionalLight";
  }
  /**
   * Returns the integer 1.
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */
  getTypeID() {
    return Light.LIGHTTYPEID_DIRECTIONALLIGHT;
  }
  /**
   * Sets the passed matrix "matrix" as projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   * @param viewMatrix
   * @param renderList
   */
  _setDefaultShadowProjectionMatrix(matrix, viewMatrix, renderList) {
    if (this.shadowFrustumSize > 0) {
      this._setDefaultFixedFrustumShadowProjectionMatrix(matrix);
    } else {
      this._setDefaultAutoExtendShadowProjectionMatrix(matrix, viewMatrix, renderList);
    }
  }
  /**
   * Sets the passed matrix "matrix" as fixed frustum projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   */
  _setDefaultFixedFrustumShadowProjectionMatrix(matrix) {
    const activeCamera = this.getScene().activeCamera;
    if (!activeCamera) {
      return;
    }
    Matrix.OrthoLHToRef(this.shadowFrustumSize, this.shadowFrustumSize, this.shadowMinZ !== void 0 ? this.shadowMinZ : activeCamera.minZ, this.shadowMaxZ !== void 0 ? this.shadowMaxZ : activeCamera.maxZ, matrix, this.getScene().getEngine().isNDCHalfZRange);
  }
  /**
   * Sets the passed matrix "matrix" as auto extend projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   * @param viewMatrix
   * @param renderList
   */
  _setDefaultAutoExtendShadowProjectionMatrix(matrix, viewMatrix, renderList) {
    const activeCamera = this.getScene().activeCamera;
    if (this.autoUpdateExtends || this._orthoLeft === Number.MAX_VALUE) {
      const tempVector3 = Vector3.Zero();
      this._orthoLeft = Number.MAX_VALUE;
      this._orthoRight = -Number.MAX_VALUE;
      this._orthoTop = -Number.MAX_VALUE;
      this._orthoBottom = Number.MAX_VALUE;
      let shadowMinZ = Number.MAX_VALUE;
      let shadowMaxZ = -Number.MAX_VALUE;
      for (let meshIndex = 0; meshIndex < renderList.length; meshIndex++) {
        const mesh = renderList[meshIndex];
        if (!mesh) {
          continue;
        }
        const boundingInfo = mesh.getBoundingInfo();
        const boundingBox = boundingInfo.boundingBox;
        for (let index = 0; index < boundingBox.vectorsWorld.length; index++) {
          Vector3.TransformCoordinatesToRef(boundingBox.vectorsWorld[index], viewMatrix, tempVector3);
          if (tempVector3.x < this._orthoLeft) {
            this._orthoLeft = tempVector3.x;
          }
          if (tempVector3.y < this._orthoBottom) {
            this._orthoBottom = tempVector3.y;
          }
          if (tempVector3.x > this._orthoRight) {
            this._orthoRight = tempVector3.x;
          }
          if (tempVector3.y > this._orthoTop) {
            this._orthoTop = tempVector3.y;
          }
          if (this.autoCalcShadowZBounds) {
            if (tempVector3.z < shadowMinZ) {
              shadowMinZ = tempVector3.z;
            }
            if (tempVector3.z > shadowMaxZ) {
              shadowMaxZ = tempVector3.z;
            }
          }
        }
      }
      if (this.autoCalcShadowZBounds) {
        this._shadowMinZ = shadowMinZ;
        this._shadowMaxZ = shadowMaxZ;
      }
    }
    const xOffset = this._orthoRight - this._orthoLeft;
    const yOffset = this._orthoTop - this._orthoBottom;
    const minZ = this.shadowMinZ !== void 0 ? this.shadowMinZ : (activeCamera == null ? void 0 : activeCamera.minZ) || 0;
    const maxZ = this.shadowMaxZ !== void 0 ? this.shadowMaxZ : (activeCamera == null ? void 0 : activeCamera.maxZ) || 1e4;
    const useReverseDepthBuffer = this.getScene().getEngine().useReverseDepthBuffer;
    Matrix.OrthoOffCenterLHToRef(this._orthoLeft - xOffset * this.shadowOrthoScale, this._orthoRight + xOffset * this.shadowOrthoScale, this._orthoBottom - yOffset * this.shadowOrthoScale, this._orthoTop + yOffset * this.shadowOrthoScale, useReverseDepthBuffer ? maxZ : minZ, useReverseDepthBuffer ? minZ : maxZ, matrix, this.getScene().getEngine().isNDCHalfZRange);
  }
  _buildUniformLayout() {
    this._uniformBuffer.addUniform("vLightData", 4);
    this._uniformBuffer.addUniform("vLightDiffuse", 4);
    this._uniformBuffer.addUniform("vLightSpecular", 4);
    this._uniformBuffer.addUniform("shadowsInfo", 3);
    this._uniformBuffer.addUniform("depthValues", 2);
    this._uniformBuffer.create();
  }
  /**
   * Sets the passed Effect object with the DirectionalLight transformed position (or position if not parented) and the passed name.
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The directional light
   */
  transferToEffect(effect, lightIndex) {
    if (this.computeTransformedInformation()) {
      this._uniformBuffer.updateFloat4("vLightData", this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z, 1, lightIndex);
      return this;
    }
    this._uniformBuffer.updateFloat4("vLightData", this.direction.x, this.direction.y, this.direction.z, 1, lightIndex);
    return this;
  }
  transferToNodeMaterialEffect(effect, lightDataUniformName) {
    if (this.computeTransformedInformation()) {
      effect.setFloat3(lightDataUniformName, this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z);
      return this;
    }
    effect.setFloat3(lightDataUniformName, this.direction.x, this.direction.y, this.direction.z);
    return this;
  }
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * (when not using reverse depth buffer / NDC half Z range)
   * @param _activeCamera The camera we are returning the min for (not used)
   * @returns the depth min z
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDepthMinZ(_activeCamera) {
    const engine = this._scene.getEngine();
    return !engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? 0 : 1;
  }
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * (when not using reverse depth buffer / NDC half Z range)
   * @param _activeCamera The camera we are returning the max for
   * @returns the depth max z
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDepthMaxZ(_activeCamera) {
    const engine = this._scene.getEngine();
    return engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? 0 : 1;
  }
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */
  prepareLightSpecificDefines(defines, lightIndex) {
    defines["DIRLIGHT" + lightIndex] = true;
  }
};
__decorate([
  serialize()
], DirectionalLight.prototype, "shadowFrustumSize", null);
__decorate([
  serialize()
], DirectionalLight.prototype, "shadowOrthoScale", null);
__decorate([
  serialize()
], DirectionalLight.prototype, "autoUpdateExtends", void 0);
__decorate([
  serialize()
], DirectionalLight.prototype, "autoCalcShadowZBounds", void 0);
__decorate([
  serialize("orthoLeft")
], DirectionalLight.prototype, "_orthoLeft", void 0);
__decorate([
  serialize("orthoRight")
], DirectionalLight.prototype, "_orthoRight", void 0);
__decorate([
  serialize("orthoTop")
], DirectionalLight.prototype, "_orthoTop", void 0);
__decorate([
  serialize("orthoBottom")
], DirectionalLight.prototype, "_orthoBottom", void 0);
RegisterClass("BABYLON.DirectionalLight", DirectionalLight);
export {
  DirectionalLight
};
//# sourceMappingURL=@babylonjs_core_Lights_directionalLight.js.map
