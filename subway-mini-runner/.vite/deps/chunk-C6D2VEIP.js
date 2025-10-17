import {
  ShaderStore
} from "./chunk-SEACPUNZ.js";

// node_modules/@babylonjs/core/Shaders/ShadersInclude/sceneUboDeclaration.js
var name = "sceneUboDeclaration";
var shader = `layout(std140,column_major) uniform;uniform Scene {mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;mat4 projection;vec4 vEyePosition;};
`;
if (!ShaderStore.IncludesShadersStore[name]) {
  ShaderStore.IncludesShadersStore[name] = shader;
}

// node_modules/@babylonjs/core/Shaders/ShadersInclude/meshUboDeclaration.js
var name2 = "meshUboDeclaration";
var shader2 = `#ifdef WEBGL2
uniform mat4 world;uniform float visibility;
#else
layout(std140,column_major) uniform;uniform Mesh
{mat4 world;float visibility;};
#endif
#define WORLD_UBO
`;
if (!ShaderStore.IncludesShadersStore[name2]) {
  ShaderStore.IncludesShadersStore[name2] = shader2;
}

// node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultUboDeclaration.js
var name3 = "defaultUboDeclaration";
var shader3 = `layout(std140,column_major) uniform;uniform Material
{vec4 diffuseLeftColor;vec4 diffuseRightColor;vec4 opacityParts;vec4 reflectionLeftColor;vec4 reflectionRightColor;vec4 refractionLeftColor;vec4 refractionRightColor;vec4 emissiveLeftColor;vec4 emissiveRightColor;vec2 vDiffuseInfos;vec2 vAmbientInfos;vec2 vOpacityInfos;vec2 vReflectionInfos;vec3 vReflectionPosition;vec3 vReflectionSize;vec2 vEmissiveInfos;vec2 vLightmapInfos;vec2 vSpecularInfos;vec3 vBumpInfos;mat4 diffuseMatrix;mat4 ambientMatrix;mat4 opacityMatrix;mat4 reflectionMatrix;mat4 emissiveMatrix;mat4 lightmapMatrix;mat4 specularMatrix;mat4 bumpMatrix;vec2 vTangentSpaceParams;float pointSize;float alphaCutOff;mat4 refractionMatrix;vec4 vRefractionInfos;vec3 vRefractionPosition;vec3 vRefractionSize;vec4 vSpecularColor;vec3 vEmissiveColor;vec4 vDiffuseColor;vec3 vAmbientColor;
#define ADDITIONAL_UBO_DECLARATION
};
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
if (!ShaderStore.IncludesShadersStore[name3]) {
  ShaderStore.IncludesShadersStore[name3] = shader3;
}

// node_modules/@babylonjs/core/Shaders/ShadersInclude/mainUVVaryingDeclaration.js
var name4 = "mainUVVaryingDeclaration";
var shader4 = `#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;
if (!ShaderStore.IncludesShadersStore[name4]) {
  ShaderStore.IncludesShadersStore[name4] = shader4;
}

// node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthDeclaration.js
var name5 = "logDepthDeclaration";
var shader5 = `#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;
if (!ShaderStore.IncludesShadersStore[name5]) {
  ShaderStore.IncludesShadersStore[name5] = shader5;
}
//# sourceMappingURL=chunk-C6D2VEIP.js.map
