import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87c1ff);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load("./textures/mugiwara.png");

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 0.666, 32, 32);

// Create an array of random values (with as many values as there are vertices in our geometry)
const count = geometry.attributes.position.count;
const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
	randoms[i] = Math.random();
}

// Add the array to the geometry as an attribute
// 1 means that each vertex be assigned 1 value from the array (for its displacement)
// geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

// We also need the uv attribute for textures
// Each vertex gets 2 values from the array
geometry.setAttribute(
	"uv",
	new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
);

// Material
const material = new THREE.RawShaderMaterial({
	vertexShader: testVertexShader,
	fragmentShader: testFragmentShader,
	// wireframe: true,
	side: THREE.DoubleSide,
	uniforms: {
		uFrequency: { value: new THREE.Vector2(8, 5) },
		uTime: { value: 0 },
		uWindForce: { value: 6 },
		uColor: { value: new THREE.Color("salmon") },
		uTexture: { value: flagTexture },
	},
});

// GUI pour la vitesse des vagues
gui
	.add(material.uniforms.uWindForce, "value")
	.min(0)
	.max(20)
	.step(0.01)
	.name("Wind Force");

gui
	.add(material.uniforms.uFrequency.value, "x")
	.min(0)
	.max(20)
	.step(0.01)
	.name("Frequency X");
gui
	.add(material.uniforms.uFrequency.value, "y")
	.min(0)
	.max(20)
	.step(0.01)
	.name("Frequency Y");

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Flag pole
const poleGeometry = new THREE.CylinderGeometry(0.025, 0.025, 2, 24);
const poleMaterial = new THREE.MeshBasicMaterial({ color: "#553626" });
const poleMesh = new THREE.Mesh(poleGeometry, poleMaterial);
poleMesh.position.set(-0.525, -0.6, 0);
scene.add(poleMesh);

// Hill
const hillGroup = new THREE.Group();
scene.add(hillGroup);

const hillGeometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI);
hillGeometry.rotateX(-Math.PI / 2);

const hillMaterial = new THREE.MeshBasicMaterial({
	color: "#197135",
	side: THREE.DoubleSide,
});
const hillMesh = new THREE.Mesh(hillGeometry, hillMaterial);
hillGroup.add(hillMesh);

const hillBottomGeometry = new THREE.CircleGeometry(1, 32);
hillBottomGeometry.rotateX(-Math.PI / 2);
const hillBottomMesh = new THREE.Mesh(hillBottomGeometry, hillMaterial);
hillGroup.add(hillBottomMesh);

hillGroup.position.set(-0.525, -2.5, 0);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);

camera.position.set(0.1, -0.25, 1.5);
camera.quaternion.set(-0.05, -0.03, 0, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(-0.05, -0.33, 0.75);
controls.update();
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update the time uniform
	material.uniforms.uTime.value = elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
