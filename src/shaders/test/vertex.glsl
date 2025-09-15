uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;

attribute vec3 position;

// Custom attributes
// Bringing the aRandom attribute from the geometry to the shader
attribute float aRandom;

// Custom varyings
// We can send data from the vertex shader to the fragment shader with varyings
// Here we create a varying to send the aRandom attribute to the fragment shader
varying float vRandom;

void main(){
  // float a = 1.2;
  // int b = 4;
  // float c = a * float(b);

  // vec2 pos = vec2(1.0, 2.0);
  // pos.x = 4.0;

  //This is how to do it in one line
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  // Or break it down step by step in THIS order
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float intensity = 0.2;

  modelPosition.z = aRandom * intensity;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // We assign the aRandom attribute to the vRandom varying
  vRandom = aRandom;
}