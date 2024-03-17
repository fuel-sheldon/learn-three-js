import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//Create spheres
const sphereCount = 8;
const sphereArray = [];

for (let i = 0; i < sphereCount; i++) {
  const geometry = new THREE.SphereGeometry(3, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: "#FFA500",
    roughness: 0.5,
    emissive: "green",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  sphereArray.push(mesh);
}

// Calculate position with consistent gap
function setXFromCenter(totalSpheres, sphereNumber, distance) {
  return Math.sin(Math.PI * 2 * (sphereNumber / totalSpheres)) * distance;
}

function setYFromCenter(totalSpheres, sphereNumber, distance) {
  return Math.cos(Math.PI * 2 * (sphereNumber / totalSpheres)) * distance;
}

const gapDistance = 10; // Adjust this value to change the gap between spheres

//Set positions for each sphere with consistent gaps
sphereArray.forEach((sphere, index) => {
  const x = setXFromCenter(sphereArray.length, index, gapDistance);
  const y = setYFromCenter(sphereArray.length, index, gapDistance);
  sphere.position.set(x, y, 0);
});

sphereArray[0].position.set(
  setXFromCenter(8, 0, gapDistance),
  setYFromCenter(8, 0, gapDistance),
  0
);
sphereArray[1].position.set(
  setXFromCenter(8, 1, gapDistance),
  setYFromCenter(8, 1, gapDistance),
  0
);
sphereArray[2].position.set(
  setXFromCenter(8, 2, gapDistance),
  setYFromCenter(8, 2, gapDistance),
  0
);
sphereArray[3].position.set(
  setXFromCenter(8, 3, gapDistance),
  setYFromCenter(8, 3, gapDistance),
  0
);
sphereArray[4].position.set(
  setXFromCenter(8, 4, gapDistance),
  setYFromCenter(8, 4, gapDistance),
  0
);
sphereArray[5].position.set(
  setXFromCenter(8, 5, gapDistance),
  setYFromCenter(8, 5, gapDistance),
  0
);
sphereArray[6].position.set(
  setXFromCenter(8, 6, gapDistance),
  setYFromCenter(8, 6, gapDistance),
  0
);
sphereArray[7].position.set(
  setXFromCenter(8, 7, gapDistance),
  setYFromCenter(8, 7, gapDistance),
  0
);
// console.log(sphereArray);
//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
  65, //fov
  sizes.width / sizes.height, //aspect
  0.1, // near
  1000 // far
);
camera.position.z = 30;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ antialias: true, canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 20;

const pivot = new THREE.Object3D();
pivot.add(...sphereArray);
scene.add(pivot);

pivot.position.z = 10;

//timeline
const t1 = gsap.timeline({ defaults: { duration: 2 } });

//move the sphere to show only five,means remove the sphere 2,4,6
t1.set(sphereArray[2].position, { x: 100, y: 0, z: -10 }); //right hand side
t1.set(sphereArray[4].position, { x: 0, y: -100, z: -10 }); // middle bottom
t1.set(sphereArray[6].position, { x: 100, y: 0, z: -10 }); //left hand side

// Move the sphere group to their initial positions
// t1.to(sphereGroup.position, { x: 0, y: 0, z: -10 });

//set the 5 sphere init pos
t1.fromTo(
  sphereArray[0].position,
  { x: 0, y: 0, z: 10 },
  { z: -10, duration: 2 },
  "<"
);
t1.to(sphereArray[1].position, { x: 7, y: 7, z: -10, duration: 2 }, "<");
t1.to(sphereArray[3].position, { x: 7, y: -7, z: -10, duration: 2 }, "<");
t1.to(sphereArray[5].position, { x: -7, y: -7, z: -10, duration: 2 }, "<");
t1.to(sphereArray[7].position, { x: -7, y: 7, z: -10, duration: 2 }, "<");

//move the sphere into circle rotation
t1.to(sphereArray[7].position, { x: -10, y: 0, duration: 1 }); // [3]bottom right [5]left bottom
t1.to(sphereArray[0].position, { x: -7, y: 7, duration: 1 }, "<"); // move [0] to top left
t1.to(sphereArray[1].position, { x: 0, y: 10, duration: 1 }, "<"); // move [1] to [0] position
t1.to(sphereArray[4].position, { x: 0, y: -10, duration: 1 }, "<"); // move [4] back to ori middle bottom
t1.to(sphereArray[2].position, { x: 7, y: 7, duration: 1 }, "<");
t1.to(sphereArray[6].position, { x: 10, y: 0, duration: 1 }, "<");

// Rotate the sphere
// t1.to(pivot.rotation, { duration: 10, z: -2 });
// t1.to(
//   pivot.rotation,
//   { duration: 20, x: -0, y: 0.5, z: -(Math.PI * 2) * 2 },
//   "<"
// );

// sphereArray.forEach((gsapSphere, i) => {
//   t1.to(
//     gsapSphere.position,
//     {
//       duration: 10,
//       x: setXFromCenter(8, i, 20 - i),
//       y: setYFromCenter(8, i, 20 - i),
//     },
//     "<"
//   );
//   console.log(gsapSphere.position);
// });

// Resize
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
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
