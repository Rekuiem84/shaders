precision mediump float;

// Bringing in the vRandom varying from the vertex shader
varying float vRandom;

void main(){
  gl_FragColor = vec4(0.1, vRandom, 1.0, 1.0);
}