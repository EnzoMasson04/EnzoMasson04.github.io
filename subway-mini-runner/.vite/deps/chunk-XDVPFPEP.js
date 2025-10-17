import {
  ShaderStore
} from "./chunk-SEACPUNZ.js";

// node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/sceneUboDeclaration.js
var name = "sceneUboDeclaration";
var shader = `struct Scene {viewProjection : mat4x4<f32>,
#ifdef MULTIVIEW
viewProjectionR : mat4x4<f32>,
#endif 
view : mat4x4<f32>,
projection : mat4x4<f32>,
vEyePosition : vec4<f32>,};
#define SCENE_UBO
var<uniform> scene : Scene;
`;
if (!ShaderStore.IncludesShadersStoreWGSL[name]) {
  ShaderStore.IncludesShadersStoreWGSL[name] = shader;
}

// node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/meshUboDeclaration.js
var name2 = "meshUboDeclaration";
var shader2 = `struct Mesh {world : mat4x4<f32>,
visibility : f32,};var<uniform> mesh : Mesh;
#define WORLD_UBO
`;
if (!ShaderStore.IncludesShadersStoreWGSL[name2]) {
  ShaderStore.IncludesShadersStoreWGSL[name2] = shader2;
}

// node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/defaultUboDeclaration.js
var name3 = "defaultUboDeclaration";
var shader3 = `uniform diffuseLeftColor: vec4f;uniform diffuseRightColor: vec4f;uniform opacityParts: vec4f;uniform reflectionLeftColor: vec4f;uniform reflectionRightColor: vec4f;uniform refractionLeftColor: vec4f;uniform refractionRightColor: vec4f;uniform emissiveLeftColor: vec4f;uniform emissiveRightColor: vec4f;uniform vDiffuseInfos: vec2f;uniform vAmbientInfos: vec2f;uniform vOpacityInfos: vec2f;uniform vReflectionInfos: vec2f;uniform vReflectionPosition: vec3f;uniform vReflectionSize: vec3f;uniform vEmissiveInfos: vec2f;uniform vLightmapInfos: vec2f;uniform vSpecularInfos: vec2f;uniform vBumpInfos: vec3f;uniform diffuseMatrix: mat4x4f;uniform ambientMatrix: mat4x4f;uniform opacityMatrix: mat4x4f;uniform reflectionMatrix: mat4x4f;uniform emissiveMatrix: mat4x4f;uniform lightmapMatrix: mat4x4f;uniform specularMatrix: mat4x4f;uniform bumpMatrix: mat4x4f;uniform vTangentSpaceParams: vec2f;uniform pointSize: f32;uniform alphaCutOff: f32;uniform refractionMatrix: mat4x4f;uniform vRefractionInfos: vec4f;uniform vRefractionPosition: vec3f;uniform vRefractionSize: vec3f;uniform vSpecularColor: vec4f;uniform vEmissiveColor: vec3f;uniform vDiffuseColor: vec4f;uniform vAmbientColor: vec3f;
#define ADDITIONAL_UBO_DECLARATION
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
if (!ShaderStore.IncludesShadersStoreWGSL[name3]) {
  ShaderStore.IncludesShadersStoreWGSL[name3] = shader3;
}

// node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/mainUVVaryingDeclaration.js
var name4 = "mainUVVaryingDeclaration";
var shader4 = `#ifdef MAINUV{X}
varying vMainUV{X}: vec2f;
#endif
`;
if (!ShaderStore.IncludesShadersStoreWGSL[name4]) {
  ShaderStore.IncludesShadersStoreWGSL[name4] = shader4;
}

// node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/logDepthDeclaration.js
var name5 = "logDepthDeclaration";
var shader5 = `#ifdef LOGARITHMICDEPTH
uniform logarithmicDepthConstant: f32;varying vFragmentDepth: f32;
#endif
`;
if (!ShaderStore.IncludesShadersStoreWGSL[name5]) {
  ShaderStore.IncludesShadersStoreWGSL[name5] = shader5;
}
//# sourceMappingURL=chunk-XDVPFPEP.js.map
