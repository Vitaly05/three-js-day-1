import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(20, 20, 20)
scene.add(directionalLight)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)

document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader()
loader.load(
  '/models/EgorovAgencyCube.gltf',
  (gltf) => {
    console.log('EgorovAgencyCube animations:', gltf.animations)
    scene.add(gltf.scene)
    directionalLight.target = gltf.scene
  },
  undefined,
  (err) => {
    console.error(err)
  }
)

function animate() {
  renderer.render(scene, camera)
}
