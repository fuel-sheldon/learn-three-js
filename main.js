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
mesh2.position.set(-10, 0, 0); // Adjust position as desired
scene.add(mesh2);

const geometry3 = new THREE.SphereGeometry(3, 64, 64);
const material3 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0, 10, 0); // Adjust position as desired
scene.add(mesh3);

const geometry4 = new THREE.SphereGeometry(3, 64, 64);
const material4 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(0, -10, 0); // Adjust position as desired
scene.add(mesh4);

const geometry5 = new THREE.SphereGeometry(3, 64, 64);
const material5 = new THREE.MeshStandardMaterial({
  color: "#FFA500",
  roughness: 0.5,
  emissive: "green",
});
const mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.set(10, 0, 0); // Adjust position as desired
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
light.distance = 1000;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
  5, //fov
  sizes.width / sizes.height, //aspect
  0.1, // near
  500 // far
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
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 20;

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

let angle = 0;
const loop = () => {
  // controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//timeline
const t1 = gsap.timeline({ defaults: { duration: 20 } });
//from far to near
// t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
// t1.fromTo(
//   mesh.scale,
//   { z: 0, x: 0, y: 0 },
//   { z: 1, x: 1, y: 1, ease: "bounce.out" }
// );

//bounce effect
// t1.fromTo(mesh.position, { y: 0 }, { y: -10, ease: "bounce.out" });

// First, set the initial position of the sphere in front
// t1.fromTo(mesh.position, { z: -20 }, { z: 0 });

// Then, animate the sphere to move to its final position at the back
t1.to(
  [
    mesh.position,
    mesh2.position,
    mesh3.position,
    mesh4.position,
    mesh5.position,
  ],
  { z: -350 }
);

// After the spheres reach their final position, start the rotation
t1.add(() => {
  let angle = 0;
  const rotateSpheres = () => {
    angle += 0.01;
    const radius = 10;

    // Update positions of all spheres based on angle
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    mesh.position.x = x;
    mesh.position.z = z;

    mesh2.position.x = -x;
    mesh2.position.z = -z;

    mesh3.position.x = -z;
    mesh3.position.z = x;

    mesh4.position.x = z;
    mesh4.position.z = -x;

    mesh5.position.x = -z;
    mesh5.position.z = -x;

    // Rotate all spheres around their own axis
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh2.rotation.x += 0.01;
    mesh2.rotation.y += 0.01;
    mesh3.rotation.x += 0.01;
    mesh3.rotation.y += 0.01;
    mesh4.rotation.x += 0.01;
    mesh4.rotation.y += 0.01;
    mesh5.rotation.x += 0.01;
    mesh5.rotation.y += 0.01;

    // Call the function recursively
    requestAnimationFrame(rotateSpheres);
  };

  // Start the rotation
  rotateSpheres();
});
// t1.fromTo(mesh2.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
// t1.fromTo(mesh3.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
// t1.fromTo(mesh4.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
// t1.fromTo(mesh5.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

//mouse animation
// let mouseDown = false;
// let rgb = [];
// window.addEventListener("mousedown", () => (mouseDown = true));
// window.addEventListener("mouseup", () => (mouseDown = false));

// window.addEventListener("mousemove", (e) => {
//   if (mouseDown) {
//     rgb = [
//       Math.round((e.pageX / sizes.width) * 255),
//       Math.round((e.pageY / sizes.height) * 255),
//       150,
//     ];

//     let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
//     gsap.to(mesh.material.color, {
//       r: newColor.r,
//       g: newColor.g,
//       b: newColor.b,
//     });
//   }
// });
