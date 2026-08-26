import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

// Setup Szene, Kamera, Renderer, Lichter (wie bisher)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);

// STL Loader & Variablen
const loader = new STLLoader();
const material = new THREE.MeshPhongMaterial({ color: 0x4f8cff, specular: 0x111111, shininess: 200 });
let currentMesh = null;

// Funktion zum Laden und Auswechseln der STL
function loadSTL(filename) {
  if (!filename) return;

  // Altes Modell entfernen
  if (currentMesh) {
    scene.remove(currentMesh);
    currentMesh.geometry.dispose();
  }

  // Neues Modell laden
  loader.load(`stl/${filename}`, (geometry) => {
    geometry.center(); // Modell zentrieren
    currentMesh = new THREE.Mesh(geometry, material);
    scene.add(currentMesh);
  });
}

// -------------------------------------------------------------
// Dateiliste laden (Beispiel statisch über files.json)
// -------------------------------------------------------------
const selectElement = document.getElementById('stl-select');

fetch('stl/files.json')
  .then(response => response.json())
  .then(files => {
    files.forEach(file => {
      const option = document.createElement('option');
      option.value = file;
      option.textContent = file;
      selectElement.appendChild(option);
    });

    // Erster Eintrag automatisch laden
    if (files.length > 0) {
      selectElement.value = files[0];
      loadSTL(files[0]);
    }
  });

// Event-Listener bei Änderung im Dropdown
selectElement.addEventListener('change', (e) => {
  loadSTL(e.target.value);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();