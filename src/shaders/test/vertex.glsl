uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;
uniform float uWindForce;

attribute vec3 position;

// On prend l'attribute uv de la géométrie
attribute vec2 uv;

// On passe le vUv au fragment shader
varying vec2 vUv;

varying float vElevation;

void main(){
  //This is how to do it in one line
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  // Or break it down step by step in THIS order
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x - uTime * uWindForce) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y - uTime * uWindForce) * 0.025;

  float wavingFactor = uv.x * 1.5; // 0 à gauche, 1 à droite

  modelPosition.z += elevation * wavingFactor;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // On passe la valeur de l'uv au fragment shader
  vUv = uv;
  vElevation = elevation;
}