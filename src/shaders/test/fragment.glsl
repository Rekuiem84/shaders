precision mediump float;

uniform vec3 uColor;
// Type for texture is sampler2D
uniform sampler2D uTexture;

varying vec2 vUv;

void main(){
  vec4 textureColor = texture2D(uTexture, vUv);
  gl_FragColor = textureColor;
}