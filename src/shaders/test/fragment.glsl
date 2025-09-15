precision mediump float;

// Bringing in the vRandom varying from the vertex shader
varying float vRandom;

void main(){
  gl_FragColor = vec4(vRandom * 0.8, vRandom, 1.0, 1.0);
}