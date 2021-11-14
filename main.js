import "./style.css";

import * as THREE from "three";

//three main components: scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(-3);

renderer.render(scene, camera);

//add and show an object

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x660300,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const texture = new THREE.TextureLoader().load("images/question_mark.jpg");
const normalTexture = new THREE.TextureLoader().load("images/normal_map.jpg");

const questionMark = new THREE.Mesh(
  new THREE.IcosahedronGeometry(10),
  new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.6,
    color: 0xe6dec6,
    normalMap: normalTexture,
  })
);
scene.add(questionMark);
questionMark.position.y = 11;
questionMark.position.x = 33;
questionMark.position.z = -11;

const geo3 = new THREE.TorusKnotGeometry(2.3, 3, 100, 16);
const background = new THREE.TextureLoader().load("images/background.jpg");
const tube = new THREE.Mesh(
  geo3,
  new THREE.MeshStandardMaterial({ map: background })
);
scene.add(tube);
tube.position.x = 60;
tube.position.z = -15;

//lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

const pointLight2 = new THREE.PointLight(0xff5950);
pointLight2.position.set(40, 60, -30);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, pointLight2, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 12, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xc772db });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("images/milky_way.jpg");
scene.background = spaceTexture;

//recursive function to continously render
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.1;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.01;

  questionMark.rotation.x -= 0.15;
  questionMark.rotation.y += 0.05;
  questionMark.rotation.z -= 0.09;

  tube.rotation.x += 0.95;
  tube.rotation.y += 0.95;

  renderer.render(scene, camera);
}

animate();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  console.log(t);

  torus.rotation.x += 0.1;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.01;

  questionMark.rotation.x -= 0.15;
  questionMark.rotation.y += 0.05;
  questionMark.rotation.z -= 0.09;

  tube.rotation.x += 1;
  tube.rotation.y += 1;
  //tube.rotation.z -= 0.09;

  camera.position.z = t * -0.015;
  camera.position.y = t * -0.002;
  camera.position.x = t * -0.002;
}
document.body.onscroll = moveCamera;
