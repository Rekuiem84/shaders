uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;

// On prend l'attribute uv de la géométrie
attribute vec2 uv;

// On passe le vUv au fragment shader
varying vec2 vUv;

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
  modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.025;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // On passe la valeur de l'uv au fragment shader
  vUv = uv;
}