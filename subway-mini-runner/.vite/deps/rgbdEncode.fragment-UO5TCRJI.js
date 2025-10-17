import "./chunk-V76IVFKE.js";
import {
  ShaderStore
} from "./chunk-SEACPUNZ.js";

// node_modules/@babylonjs/core/ShadersWGSL/rgbdEncode.fragment.js
var name = "rgbdEncodePixelShader";
var shader = `varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=toRGBD(textureSample(textureSampler,textureSamplerSampler,input.vUV).rgb);}`;
if (!ShaderStore.ShadersStoreWGSL[name]) {
  ShaderStore.ShadersStoreWGSL[name] = shader;
}
var rgbdEncodePixelShaderWGSL = { name, shader };
export {
  rgbdEncodePixelShaderWGSL
};
//# sourceMappingURL=rgbdEncode.fragment-UO5TCRJI.js.map
