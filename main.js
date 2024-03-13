import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//Create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const geometry2 = new THREE.SphereGeometry(3, 64, 64);
const material2 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);

const geometry3 = new THREE.SphereGeometry(3, 64, 64);
const material3 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh3 = new THREE.Mesh(geometry3, material3);
scene.add(mesh3);

const geometry4 = new THREE.SphereGeometry(3, 64, 64);
const material4 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh4 = new THREE.Mesh(geometry4, material4);
scene.add(mesh4);

const geometry5 = new THREE.SphereGeometry(3, 64, 64);
const material5 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh5 = new THREE.Mesh(geometry5, material5);
scene.add(mesh5);

const geometry6 = new THREE.SphereGeometry(3, 64, 64);
const material6 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh6 = new THREE.Mesh(geometry6, material6);
scene.add(mesh6);

const geometry7 = new THREE.SphereGeometry(3, 64, 64);
const material7 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh7 = new THREE.Mesh(geometry7, material7);
scene.add(mesh7);

const geometry8 = new THREE.SphereGeometry(3, 64, 64);
const material8 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh8 = new THREE.Mesh(geometry8, material8);
scene.add(mesh8);

let sphereArray = [mesh, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8];

//sphere position
mesh.position.set(0, 0, 0);
mesh2.position.set(-8, 8, 0);
mesh3.position.set(8, 8, 0);
mesh4.position.set(8, -8, 0);
mesh5.position.set(-8, -8, 0);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
// light.position.set(0, 0, 30);
// light.intensity = 1.24;
// light.distance = 500;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
  65, //fov
  sizes.width / sizes.height, //aspect
  0.1, // near
  1000 // far
);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ antialias: true, canvas });
renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(2);

renderer.render(scene, camera);

//Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 20;

//Resize
// window.addEventListener("resize", () => {
//   //update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   //update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.width, sizes.height);
// });

const loop = () => {
  // controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

let pivot = new THREE.Object3D();
pivot.add(mesh, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8);
scene.add(pivot);

pivot.position.z = 10;

//timeline
const t1 = gsap.timeline({ defaults: { duration: 3 }, ease: "power2.inOut" });
t1.to(
  [
    mesh.position,
    mesh2.position,
    mesh3.position,
    mesh4.position,
    mesh5.position,
    mesh6.position,
    mesh7.position,
    mesh8.position,
  ],
  { z: -10 }
);

//move the sphere to a position
t1.fromTo(mesh2.position, { x: -8, y: 8 }, { x: -10, y: 1, duration: 1 });
t1.to(mesh.position, { x: -7, y: 10, duration: 1 }, "<");
t1.to(mesh3.position, { x: 2, y: 12, duration: 1 }, "<");
t1.to(mesh4.position, { x: 1, y: -10, duration: 1 }, "<");

t1.fromTo(
  mesh6.position,
  { x: 18, y: 30, duration: 1 },
  { x: 11, y: 10, duration: 1 },
  "<"
);
t1.fromTo(
  mesh7.position,
  { x: 20, y: -30, duration: 1 },
  { x: 10, y: -8, duration: 1 },
  "<"
);
t1.fromTo(
  mesh8.position,
  { x: 20, y: 30, duration: 1 },
  { x: 12, y: 1, duration: 1 },
  "<"
);

//rotate the sphere
t1.to(pivot.rotation, { duration: 10, z: -10 });

//after the rotation will do??
// t1.to(mesh4.position, { x: 10, y: -20, duration: 1 });

function setXFromCenter(totalSpheres, sphereNumber, distance) {
  return Math.sin(Math.PI * 2 * (sphereNumber / totalSpheres)) * distance;
}
function setYFromCenter(totalSpheres, sphereNumber, distance) {
  return Math.cos(Math.PI * 2 * (sphereNumber / totalSpheres)) * distance;
}

let sphereArraySmall = sphereArray.slice(3);
let sphereArrayRemain = sphereArray.slice(0, 3);
