precision mediump float;

uniform vec3 uColor;
// Type for texture is sampler2D
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main(){
  // We apply the texture using the uv coordinates
  vec4 textureColor = texture2D(uTexture, vUv);
  // We darken the "deep" parts of the flag
  textureColor.rgb *= vElevation * 2.0 + 0.8;
  gl_FragColor = textureColor;
}