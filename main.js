import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GUI from 'lil-gui'

const gui = new GUI()

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

function animate() {
  renderer.render(scene, camera)
}

document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader()

// Task 1-3

let egorovAgencyCube

loader.load(
  '/models/EgorovAgencyCube.gltf',
  (gltf) => {
    egorovAgencyCube = gltf
  },
  undefined,
  (err) => {
    console.error(err)
  }
)

gui
  .add({ showTask_1_2_3: false }, 'showTask_1_2_3')
  .name('Show task 1-3')
  .onChange((isShown) => {
    if (isShown) {
      scene.add(egorovAgencyCube.scene)
      directionalLight.target = egorovAgencyCube.scene
      console.log('EgorovAgencyCube animations:', egorovAgencyCube.animations)
    } else {
      scene.remove(egorovAgencyCube.scene)
    }
  })

// Task 5

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.rotation.set(0, 45, 45)
cube.position.x = -3

const circleGeometry = new THREE.CircleGeometry(1)
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff2d00 })
const circle = new THREE.Mesh(circleGeometry, circleMaterial)

const ringGeometry = new THREE.RingGeometry(1, 2)
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const ring = new THREE.Mesh(ringGeometry, ringMaterial)
ring.position.x = 4

gui
  .add({ showTask_5: false }, 'showTask_5')
  .name('Show task 5')
  .onChange((isShown) => {
    if (isShown) {
      scene.add(cube)
      scene.add(circle)
      scene.add(ring)
    } else {
      scene.remove(cube)
      scene.remove(circle)
      scene.remove(ring)
    }
  })
