import {
  CubeMapToSphericalPolynomialTools
} from "./chunk-J4YISJJI.js";
import "./chunk-RTVWLEG2.js";
import {
  PostProcess
} from "./chunk-PKTWLCMT.js";
import "./chunk-3Z776HTZ.js";
import "./chunk-LUCTKE24.js";
import "./chunk-3RLAZYYX.js";
import "./chunk-Z4VNN5BC.js";
import "./chunk-CTKWF4NM.js";
import "./chunk-TYU74FDJ.js";
import "./chunk-YB2OV3US.js";
import "./chunk-2YRX745D.js";
import "./chunk-OR4V6S2U.js";
import "./chunk-JYV5EUUU.js";
import "./chunk-DAQCNZDC.js";
import "./chunk-WZM6GV37.js";
import {
  Tools
} from "./chunk-S7FLS6J4.js";
import "./chunk-VLQF4VVG.js";
import {
  SphericalPolynomial
} from "./chunk-3IZN45W4.js";
import "./chunk-NBZIJBQN.js";
import "./chunk-2SNQ3HEF.js";
import "./chunk-ESZPSMLU.js";
import {
  BaseTexture
} from "./chunk-QXJOWFYZ.js";
import "./chunk-2ROLPC73.js";
import "./chunk-56R6SLXN.js";
import "./chunk-XPCOJVRL.js";
import "./chunk-IIRLJDXL.js";
import "./chunk-M6X33RZV.js";
import "./chunk-SVMC4EBE.js";
import "./chunk-PIASBTZO.js";
import {
  Vector3
} from "./chunk-NSAPKY2D.js";
import {
  InternalTexture
} from "./chunk-WEEGRZSP.js";
import {
  Logger
} from "./chunk-U2ZTKOT3.js";
import "./chunk-XPTICEO2.js";
import "./chunk-SEACPUNZ.js";
import "./chunk-5AJSY7TL.js";
import "./chunk-EFRFZ7OU.js";
import "./chunk-P24HYHXQ.js";
import {
  ILog2
} from "./chunk-DSTTD374.js";

// node_modules/@babylonjs/core/Materials/Textures/baseTexture.polynomial.js
BaseTexture.prototype.forceSphericalPolynomialsRecompute = function() {
  if (this._texture) {
    this._texture._sphericalPolynomial = null;
    this._texture._sphericalPolynomialPromise = null;
    this._texture._sphericalPolynomialComputed = false;
  }
};
Object.defineProperty(BaseTexture.prototype, "sphericalPolynomial", {
  get: function() {
    if (this._texture) {
      if (this._texture._sphericalPolynomial || this._texture._sphericalPolynomialComputed) {
        return this._texture._sphericalPolynomial;
      }
      if (this._texture.isReady) {
        if (!this._texture._sphericalPolynomialPromise) {
          this._texture._sphericalPolynomialPromise = CubeMapToSphericalPolynomialTools.ConvertCubeMapTextureToSphericalPolynomial(this);
          if (this._texture._sphericalPolynomialPromise === null) {
            this._texture._sphericalPolynomialComputed = true;
          } else {
            this._texture._sphericalPolynomialPromise.then((sphericalPolynomial) => {
              this._texture._sphericalPolynomial = sphericalPolynomial;
              this._texture._sphericalPolynomialComputed = true;
            });
          }
        }
        return null;
      }
    }
    return null;
  },
  set: function(value) {
    if (this._texture) {
      this._texture._sphericalPolynomial = value;
    }
  },
  enumerable: true,
  configurable: true
});

// node_modules/@babylonjs/core/Misc/environmentTextureTools.js
var DefaultEnvironmentTextureImageType = "image/png";
var CurrentVersion = 2;
var MagicBytes = [134, 22, 135, 150, 246, 214, 150, 54];
function GetEnvInfo(data) {
  const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let pos = 0;
  for (let i = 0; i < MagicBytes.length; i++) {
    if (dataView.getUint8(pos++) !== MagicBytes[i]) {
      Logger.Error("Not a babylon environment map");
      return null;
    }
  }
  let manifestString = "";
  let charCode = 0;
  while (charCode = dataView.getUint8(pos++)) {
    manifestString += String.fromCharCode(charCode);
  }
  let manifest = JSON.parse(manifestString);
  manifest = normalizeEnvInfo(manifest);
  manifest.binaryDataPosition = pos;
  if (manifest.specular) {
    manifest.specular.lodGenerationScale = manifest.specular.lodGenerationScale || 0.8;
  }
  return manifest;
}
function normalizeEnvInfo(info) {
  if (info.version > CurrentVersion) {
    throw new Error(`Unsupported babylon environment map version "${info.version}". Latest supported version is "${CurrentVersion}".`);
  }
  if (info.version === 2) {
    return info;
  }
  info = { ...info, version: 2, imageType: DefaultEnvironmentTextureImageType };
  return info;
}
function CreateRadianceImageDataArrayBufferViews(data, info) {
  info = normalizeEnvInfo(info);
  const specularInfo = info.specular;
  let mipmapsCount = Math.log2(info.width);
  mipmapsCount = Math.round(mipmapsCount) + 1;
  if (specularInfo.mipmaps.length !== 6 * mipmapsCount) {
    throw new Error(`Unsupported specular mipmaps number "${specularInfo.mipmaps.length}"`);
  }
  const imageData = new Array(mipmapsCount);
  for (let i = 0; i < mipmapsCount; i++) {
    imageData[i] = new Array(6);
    for (let face = 0; face < 6; face++) {
      const imageInfo = specularInfo.mipmaps[i * 6 + face];
      imageData[i][face] = new Uint8Array(data.buffer, data.byteOffset + info.binaryDataPosition + imageInfo.position, imageInfo.length);
    }
  }
  return imageData;
}
function CreateIrradianceImageDataArrayBufferViews(data, info) {
  var _a;
  info = normalizeEnvInfo(info);
  const imageData = new Array(6);
  const irradianceTexture = (_a = info.irradiance) == null ? void 0 : _a.irradianceTexture;
  if (irradianceTexture) {
    if (irradianceTexture.faces.length !== 6) {
      throw new Error(`Incorrect irradiance texture faces number "${irradianceTexture.faces.length}"`);
    }
    for (let face = 0; face < 6; face++) {
      const imageInfo = irradianceTexture.faces[face];
      imageData[face] = new Uint8Array(data.buffer, data.byteOffset + info.binaryDataPosition + imageInfo.position, imageInfo.length);
    }
  }
  return imageData;
}
function UploadEnvLevelsAsync(texture, data, info) {
  var _a;
  info = normalizeEnvInfo(info);
  const specularInfo = info.specular;
  if (!specularInfo) {
    return Promise.resolve([]);
  }
  texture._lodGenerationScale = specularInfo.lodGenerationScale;
  const promises = [];
  const radianceImageData = CreateRadianceImageDataArrayBufferViews(data, info);
  promises.push(UploadRadianceLevelsAsync(texture, radianceImageData, info.imageType));
  const irradianceTexture = (_a = info.irradiance) == null ? void 0 : _a.irradianceTexture;
  if (irradianceTexture) {
    const irradianceImageData = CreateIrradianceImageDataArrayBufferViews(data, info);
    promises.push(UploadIrradianceLevelsAsync(texture, irradianceImageData, irradianceTexture.size, info.imageType));
  }
  return Promise.all(promises);
}
function _OnImageReadyAsync(image, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture) {
  return new Promise((resolve, reject) => {
    if (expandTexture) {
      const tempTexture = engine.createTexture(null, true, true, null, 1, null, (message) => {
        reject(message);
      }, image);
      rgbdPostProcess == null ? void 0 : rgbdPostProcess.onEffectCreatedObservable.addOnce((effect) => {
        effect.executeWhenCompiled(() => {
          rgbdPostProcess.externalTextureSamplerBinding = true;
          rgbdPostProcess.onApply = (effect2) => {
            effect2._bindTexture("textureSampler", tempTexture);
            effect2.setFloat2("scale", 1, engine._features.needsInvertingBitmap && image instanceof ImageBitmap ? -1 : 1);
          };
          if (!engine.scenes.length) {
            return;
          }
          engine.scenes[0].postProcessManager.directRender([rgbdPostProcess], cubeRtt, true, face, i);
          engine.restoreDefaultFramebuffer();
          tempTexture.dispose();
          URL.revokeObjectURL(url);
          resolve();
        });
      });
    } else {
      engine._uploadImageToTexture(texture, image, face, i);
      if (generateNonLODTextures) {
        const lodTexture = lodTextures[i];
        if (lodTexture) {
          engine._uploadImageToTexture(lodTexture._texture, image, face, 0);
        }
      }
      resolve();
    }
  });
}
async function UploadRadianceLevelsAsync(texture, imageData, imageType = DefaultEnvironmentTextureImageType) {
  const engine = texture.getEngine();
  texture.format = 5;
  texture.type = 0;
  texture.generateMipMaps = true;
  texture._cachedAnisotropicFilteringLevel = null;
  engine.updateTextureSamplingMode(3, texture);
  await _UploadLevelsAsync(texture, imageData, true, imageType);
  texture.isReady = true;
}
async function UploadIrradianceLevelsAsync(mainTexture, imageData, size, imageType = DefaultEnvironmentTextureImageType) {
  const engine = mainTexture.getEngine();
  const texture = new InternalTexture(
    engine,
    5
    /* InternalTextureSource.RenderTarget */
  );
  const baseTexture = new BaseTexture(engine, texture);
  mainTexture._irradianceTexture = baseTexture;
  texture.isCube = true;
  texture.format = 5;
  texture.type = 0;
  texture.generateMipMaps = true;
  texture._cachedAnisotropicFilteringLevel = null;
  texture.generateMipMaps = true;
  texture.width = size;
  texture.height = size;
  engine.updateTextureSamplingMode(3, texture);
  await _UploadLevelsAsync(texture, [imageData], false, imageType);
  engine.generateMipMapsForCubemap(texture);
  texture.isReady = true;
}
async function _UploadLevelsAsync(texture, imageData, canGenerateNonLODTextures, imageType = DefaultEnvironmentTextureImageType) {
  if (!Tools.IsExponentOfTwo(texture.width)) {
    throw new Error("Texture size must be a power of two");
  }
  const mipmapsCount = ILog2(texture.width) + 1;
  const engine = texture.getEngine();
  let expandTexture = false;
  let generateNonLODTextures = false;
  let rgbdPostProcess = null;
  let cubeRtt = null;
  let lodTextures = null;
  const caps = engine.getCaps();
  if (!caps.textureLOD) {
    expandTexture = false;
    generateNonLODTextures = canGenerateNonLODTextures;
  } else if (!engine._features.supportRenderAndCopyToLodForFloatTextures) {
    expandTexture = false;
  } else if (caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering) {
    expandTexture = true;
    texture.type = 2;
  } else if (caps.textureFloatRender && caps.textureFloatLinearFiltering) {
    expandTexture = true;
    texture.type = 1;
  }
  let shaderLanguage = 0;
  if (expandTexture) {
    if (engine.isWebGPU) {
      shaderLanguage = 1;
      await import("./rgbdDecode.fragment-7BIIQDJI.js");
    } else {
      await import("./rgbdDecode.fragment-S2A24YYR.js");
    }
    rgbdPostProcess = new PostProcess("rgbdDecode", "rgbdDecode", null, null, 1, null, 3, engine, false, void 0, texture.type, void 0, null, false, void 0, shaderLanguage);
    texture._isRGBD = false;
    texture.invertY = false;
    cubeRtt = engine.createRenderTargetCubeTexture(texture.width, {
      generateDepthBuffer: false,
      generateMipMaps: true,
      generateStencilBuffer: false,
      samplingMode: 3,
      type: texture.type,
      format: 5
    });
  } else {
    texture._isRGBD = true;
    texture.invertY = true;
    if (generateNonLODTextures) {
      const mipSlices = 3;
      lodTextures = {};
      const scale = texture._lodGenerationScale;
      const offset = texture._lodGenerationOffset;
      for (let i = 0; i < mipSlices; i++) {
        const smoothness = i / (mipSlices - 1);
        const roughness = 1 - smoothness;
        const minLODIndex = offset;
        const maxLODIndex = (mipmapsCount - 1) * scale + offset;
        const lodIndex = minLODIndex + (maxLODIndex - minLODIndex) * roughness;
        const mipmapIndex = Math.round(Math.min(Math.max(lodIndex, 0), maxLODIndex));
        const glTextureFromLod = new InternalTexture(
          engine,
          2
          /* InternalTextureSource.Temp */
        );
        glTextureFromLod.isCube = true;
        glTextureFromLod.invertY = true;
        glTextureFromLod.generateMipMaps = false;
        engine.updateTextureSamplingMode(2, glTextureFromLod);
        const lodTexture = new BaseTexture(null);
        lodTexture._isCube = true;
        lodTexture._texture = glTextureFromLod;
        lodTextures[mipmapIndex] = lodTexture;
        switch (i) {
          case 0:
            texture._lodTextureLow = lodTexture;
            break;
          case 1:
            texture._lodTextureMid = lodTexture;
            break;
          case 2:
            texture._lodTextureHigh = lodTexture;
            break;
        }
      }
    }
  }
  const promises = [];
  for (let i = 0; i < imageData.length; i++) {
    for (let face = 0; face < 6; face++) {
      const bytes = imageData[i][face];
      const blob = new Blob([bytes], { type: imageType });
      const url = URL.createObjectURL(blob);
      let promise;
      if (engine._features.forceBitmapOverHTMLImageElement) {
        promise = engine.createImageBitmap(blob, { premultiplyAlpha: "none" }).then((img) => {
          return _OnImageReadyAsync(img, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture);
        });
      } else {
        const image = new Image();
        image.src = url;
        promise = new Promise((resolve, reject) => {
          image.onload = () => {
            _OnImageReadyAsync(image, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture).then(() => resolve()).catch((reason) => {
              reject(reason);
            });
          };
          image.onerror = (error) => {
            reject(error);
          };
        });
      }
      promises.push(promise);
    }
  }
  await Promise.all(promises);
  if (imageData.length < mipmapsCount) {
    let data;
    const size = Math.pow(2, mipmapsCount - 1 - imageData.length);
    const dataLength = size * size * 4;
    switch (texture.type) {
      case 0: {
        data = new Uint8Array(dataLength);
        break;
      }
      case 2: {
        data = new Uint16Array(dataLength);
        break;
      }
      case 1: {
        data = new Float32Array(dataLength);
        break;
      }
    }
    for (let i = imageData.length; i < mipmapsCount; i++) {
      for (let face = 0; face < 6; face++) {
        engine._uploadArrayBufferViewToTexture((cubeRtt == null ? void 0 : cubeRtt.texture) || texture, data, face, i);
      }
    }
  }
  if (cubeRtt) {
    const irradiance = texture._irradianceTexture;
    texture._irradianceTexture = null;
    engine._releaseTexture(texture);
    cubeRtt._swapAndDie(texture);
    texture._irradianceTexture = irradiance;
  }
  if (rgbdPostProcess) {
    rgbdPostProcess.dispose();
  }
  if (generateNonLODTextures) {
    if (texture._lodTextureHigh && texture._lodTextureHigh._texture) {
      texture._lodTextureHigh._texture.isReady = true;
    }
    if (texture._lodTextureMid && texture._lodTextureMid._texture) {
      texture._lodTextureMid._texture.isReady = true;
    }
    if (texture._lodTextureLow && texture._lodTextureLow._texture) {
      texture._lodTextureLow._texture.isReady = true;
    }
  }
}
function UploadEnvSpherical(texture, info) {
  info = normalizeEnvInfo(info);
  const irradianceInfo = info.irradiance;
  if (!irradianceInfo) {
    return;
  }
  const sp = new SphericalPolynomial();
  Vector3.FromArrayToRef(irradianceInfo.x, 0, sp.x);
  Vector3.FromArrayToRef(irradianceInfo.y, 0, sp.y);
  Vector3.FromArrayToRef(irradianceInfo.z, 0, sp.z);
  Vector3.FromArrayToRef(irradianceInfo.xx, 0, sp.xx);
  Vector3.FromArrayToRef(irradianceInfo.yy, 0, sp.yy);
  Vector3.FromArrayToRef(irradianceInfo.zz, 0, sp.zz);
  Vector3.FromArrayToRef(irradianceInfo.yz, 0, sp.yz);
  Vector3.FromArrayToRef(irradianceInfo.zx, 0, sp.zx);
  Vector3.FromArrayToRef(irradianceInfo.xy, 0, sp.xy);
  texture._sphericalPolynomial = sp;
}

// node_modules/@babylonjs/core/Materials/Textures/Loaders/envTextureLoader.js
var _ENVTextureLoader = class {
  constructor() {
    this.supportCascades = false;
  }
  /**
   * Uploads the cube texture data to the WebGL texture. It has already been bound.
   * @param data contains the texture data
   * @param texture defines the BabylonJS internal texture
   * @param createPolynomials will be true if polynomials have been requested
   * @param onLoad defines the callback to trigger once the texture is ready
   * @param onError defines the callback to trigger in case of error
   */
  loadCubeData(data, texture, createPolynomials, onLoad, onError) {
    if (Array.isArray(data)) {
      return;
    }
    const info = GetEnvInfo(data);
    if (info) {
      texture.width = info.width;
      texture.height = info.width;
      try {
        UploadEnvSpherical(texture, info);
        UploadEnvLevelsAsync(texture, data, info).then(() => {
          texture.isReady = true;
          texture.onLoadedObservable.notifyObservers(texture);
          texture.onLoadedObservable.clear();
          if (onLoad) {
            onLoad();
          }
        }, (reason) => {
          onError == null ? void 0 : onError("Can not upload environment levels", reason);
        });
      } catch (e) {
        onError == null ? void 0 : onError("Can not upload environment file", e);
      }
    } else if (onError) {
      onError("Can not parse the environment file", null);
    }
  }
  /**
   * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
   */
  loadData() {
    throw ".env not supported in 2d.";
  }
};
export {
  _ENVTextureLoader
};
//# sourceMappingURL=envTextureLoader-R3AWQD4T.js.map
