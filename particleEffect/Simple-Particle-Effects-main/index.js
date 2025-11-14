import * as THREE from "three";
import getLayer from "./getLayer.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { getParticleSystem } from "./getParticleSystem.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.y = -1;
scene.add(cube);

const fireEffect = getParticleSystem({
  camera,
  emitter: cube,
  parent: scene,
  rate: 50.0,
  texture: "img/fire.png",
});

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(100, 1000, 100);
const hemiLight2 = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight2.position.set(-100, -1000, -100);
const hemiLight3 = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight3.position.set(50, 50, 50);
const hemiLight4 = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight4.position.set(-50, -50, -50);
scene.add(hemiLight);
scene.add(hemiLight2, hemiLight3, hemiLight4);

scene.add(hemiLight);
scene.add(hemiLight2);

// Sprites BG
const gradientBackground = getLayer({
  hue: 0.6,
  numSprites: 8,
  opacity: 0.2,
  radius: 10,
  size: 24,
  z: -10.5,
});
scene.add(gradientBackground);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.009;
  cube.rotation.y += 0.009;
  fireEffect.update(0.016);
  renderer.render(scene, camera);
  controls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
