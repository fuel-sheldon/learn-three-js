import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#2a6c68");

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
  40, //fov
  sizes.width / sizes.height, //aspect
  0.1, // near
  1000 // far
);
camera.position.z = 40;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ antialias: true, canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});

const Sphere_0 = new THREE.Mesh(geometry, material);
const Sphere_1 = new THREE.Mesh(geometry, material);
const Sphere_2 = new THREE.Mesh(geometry, material);
const Sphere_3 = new THREE.Mesh(geometry, material);
const Sphere_4 = new THREE.Mesh(geometry, material);
const Sphere_5 = new THREE.Mesh(geometry, material);
const Sphere_6 = new THREE.Mesh(geometry, material);
const Sphere_7 = new THREE.Mesh(geometry, material);

let distanceFromCenter = 12;

Sphere_0.position.set(
  setXFromCenter(8, 0, distanceFromCenter),
  setYFromCenter(8, 0, distanceFromCenter)
);

// Calculate position with consistent gap
function setXFromCenter(totalSpheres, sphereNumber, distance) {
  return Math.sin(Math.PI * 2 * (sphereNumber / totalSpheres)) * distance;
}

function setYFromCenter(totalSpheres, sphereNumber, distance) {
  return Math.cos(Math.PI * 2 * (sphereNumber / totalSpheres)) * distance;
}

const gsapPivot = new THREE.Object3D();

let spheresArray = [
  Sphere_0,
  Sphere_1,
  Sphere_2,
  Sphere_3,
  Sphere_4,
  Sphere_5,
  Sphere_6,
  Sphere_7,
];

let totalSpheres = spheresArray.length;
spheresArray.forEach((sphere, i) => {
  sphere.position.set(
    setXFromCenter(8, i, distanceFromCenter),
    setYFromCenter(8, i, distanceFromCenter)
  );
  gsapPivot.add(sphere);
});

scene.add(gsapPivot);

//Controls
const controls = new OrbitControls(camera, canvas);

//timeline
const t1 = gsap.timeline();

t1.from(gsapPivot.position, {
  duration: 3,
  z: 70,
})
  .from(Sphere_0.position, { duration: 1, x: 0, y: 0 })

  .from(Sphere_2.position, { duration: 1, x: 50, y: -50 }, "<")

  .from(Sphere_4.position, { duration: 1, x: 50, y: -50 }, "<")

  .from(Sphere_6.position, { duration: 1, x: 50, y: -50 }, "<")

  // first rotate
  .to(gsapPivot.rotation, { duration: 10, z: -(Math.PI * 2) });

//second rotate
t1.to(gsapPivot.rotation, {
  duration: 10,
  x: -0.5,
  y: -0.5,
  z: -(Math.PI * 2) * 2,
});
spheresArray.forEach((spheres, i) => {
  let options1 = i + 8;
  let options2 = i - 5;

  // let distanceAwayFromCenter = 30 - options2 * 10;
  let distanceAwayFromCenter = 80 - i * 10;

  t1.to(
    spheres.position,
    {
      duration: 10,
      x: setXFromCenter(8, i + 1, distanceAwayFromCenter),
      y: setYFromCenter(8, i + 1, distanceAwayFromCenter),
    },
    "<"
  );
});

//third rotation
// let sphereArraySmaller = spheresArray.slice(totalSpheres - 8, totalSpheres - 7);
// let sphereArrayRemainder = spheresArray.slice(totalSpheres - 2);
let sphereArraySmaller = spheresArray.slice(3);
let sphereArrayRemainder = spheresArray.slice(0, 3);

t1.to(gsapPivot.rotation, { duration: 5, z: -(Math.PI * 2) * 3 });

t1.to(gsapPivot.position, { duration: 10, x: 0, y: 0 }, "<");
sphereArraySmaller.forEach((spheres, i) => {
  t1.to(
    spheres.position,
    {
      duration: 5,
      x: setXFromCenter(5, i + 1, 6),
      y: setYFromCenter(5, i + 1, 6),
    },
    "<"
  );
});
sphereArrayRemainder.forEach((spheres, i) => {
  t1.to(
    spheres.position,
    {
      duration: 5,
      x: setXFromCenter(8, i + 1, 2000),
      y: setXFromCenter(8, i + 1, 1000),
    },
    "<"
  );
});

t1.to(gsapPivot.rotation, { duration: 10, z: -30 });

//leave the circle
// t1.to(gsapPivot.rotation, { duration: 5, z: -(Math.PI * 2) * 3 - 0.5 });

t1.to(Sphere_4.position, { duration: 5, x: -2, y: -15 }); //top right
t1.to(Sphere_3.position, { duration: 5, x: 6, y: -8 }, "<"); //middle single one
t1.to(Sphere_7.position, { duration: 5, x: 12, y: 2 }, "<"); // top left
// t1.to(Sphere_6.position, { duration: 5, x: -10, y: 5 }); // bottom left
t1.to(Sphere_5.position, { duration: 5, x: -10, y: -10 }, "<"); //bottom right
// 6  up
//5
//4
//3
//7

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
