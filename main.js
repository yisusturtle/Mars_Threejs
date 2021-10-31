import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TetrahedronGeometry } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const marsMaterial = new THREE.TextureLoader().load('marstexture.png');
const marsTexture = new THREE.TextureLoader().load('texture.png');

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshStandardMaterial({ map: marsMaterial, normalMap: marsTexture });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

/* const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper); */

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFCBC });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('background.png')
scene.background = spaceTexture;

function movCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.x = t * -0.02;
    camera.position.y = t * -0.02;
}

document.body.onscroll = movCamera

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.00;
    torus.rotation.y += 0.001;
    torus.rotation.z += 0.001;

    controls.update();

    renderer.render(scene, camera);
}

animate();