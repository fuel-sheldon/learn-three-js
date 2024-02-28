// import * as THREE from "three";
// import "./style.css";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import * as dat from "dat.gui";
// import { gsap } from "gsap";

// Set up scene
// const scene = new THREE.Scene();

// // Create sphere
// const geometry = new THREE.SphereGeometry(3, 64, 64);
// const material = new THREE.MeshBasicMaterial({
//   color: "#FFA500",
// });
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// //Sizes
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   1000
// );
// // camera.position.z = 20;
// camera.position.set(0, 0, 20);
// scene.add(camera);

// //Renderer

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(sizes.width, sizes.height);
// renderer.render(scene, camera);
// document.body.appendChild(renderer.domElement);

// // Position cube
// sphere.position.z = -10;

// // Add rotation animation
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();

// // gsap.to(sphere.rotation, {
// //   duration: 5,
// //   x: 10,
// //   repeat: -1,
// // });

// gsap.to(sphere.position, {
//   duration: 10,
//   x: 50,
//   repeat: -1,
//   ease: "back.inOut",
// });

// // Resize
// window.addEventListener("resize", () => {
//   //update sizes
//   sizes.width = window.innerHeight;
//   sizes.height = window.innerHeight;

//   //Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.width, sizes.height);
// });

import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const geometry2 = new THREE.SphereGeometry(3, 64, 64);
const material2 = new THREE.MeshStandardMaterial({
  color: "#00FF00", // Green color
  roughness: 0.5,
});
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(-10, 0, 0); // Adjust position as desired
scene.add(mesh2);

const geometry3 = new THREE.SphereGeometry(3, 64, 64);
const material3 = new THREE.MeshStandardMaterial({
  color: "#0000FF", // Blue color
  roughness: 0.5,
});
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0, 10, 0); // Adjust position as desired
scene.add(mesh3);

const geometry4 = new THREE.SphereGeometry(3, 64, 64);
const material4 = new THREE.MeshStandardMaterial({
  color: "#FF00FF", // Purple color
  roughness: 0.5,
});
const mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(0, -10, 0); // Adjust position as desired
scene.add(mesh4);

const geometry5 = new THREE.SphereGeometry(3, 64, 64);
const material5 = new THREE.MeshStandardMaterial({
  color: "#FFFF00", // Yellow color
  roughness: 0.5,
});
const mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.set(0, 0, -10); // Adjust position as desired
scene.add(mesh5);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.24;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 20;

//Resize
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//timeline
const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo(mesh2.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo(mesh3.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo(mesh4.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo(mesh5.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

//mouse animation
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];

    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});

// GSAP Tween Animation to move the sphere from left to right
// mesh.position.set(-5, 0, 0); // Initial position of the sphere

gsap.to(mesh.position, {
  x: 5,
  y: 0,
  z: 5,
  duration: 2,
  // ease: "power2.inOut", // Easing function for smooth motion
});
