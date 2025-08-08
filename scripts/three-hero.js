// Three.js hero scene with a silver 3D object
// Uses RoomEnvironment for realistic PBR reflections without external HDR files

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { RoomEnvironment } from 'https://unpkg.com/three@0.160.0/examples/jsm/environments/RoomEnvironment.js';

(function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  scene.background = null; // keep transparent over the gradient card

  // Camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0.6, 0.4, 1.6);

  // Environment for metallic reflections
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  // Silver TorusKnot
  const geometry = new THREE.TorusKnotGeometry(0.45, 0.14, 256, 32);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xc0c0c0), // silver base
    metalness: 1.0,
    roughness: 0.18,
    envMapIntensity: 1.0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  scene.add(mesh);

  // Key lights to accentuate edges
  const rim = new THREE.DirectionalLight(0xffffff, 1.1);
  rim.position.set(-2, 1.5, 1);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0x9aa8ff, 0.5);
  fill.position.set(2, -1, 2);
  scene.add(fill);

  const subtle = new THREE.AmbientLight(0xffffff, 0.15);
  scene.add(subtle);

  // Resize handling
  function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  // Animation
  let isPaused = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function animate() {
    if (isPaused) return; // stop loop entirely
    resizeRendererToDisplaySize();
    mesh.rotation.x += 0.0035;
    mesh.rotation.y += 0.0055;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function start() {
    if (isPaused) {
      isPaused = false;
      requestAnimationFrame(animate);
    }
  }
  function stop() { isPaused = true; }

  // Visibility pause to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  // Respect reduced motion preference
  if (prefersReducedMotion.matches) {
    isPaused = true;
    renderer.render(scene, camera);
  } else {
    requestAnimationFrame(animate);
  }

  // Handle resizes (observer keeps CSS-driven sizes authoritative)
  const ro = new ResizeObserver(() => {
    resizeRendererToDisplaySize();
    renderer.render(scene, camera);
  });
  ro.observe(canvas);
})();


