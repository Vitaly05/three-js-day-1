import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GUI from 'lil-gui'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

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

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)

function animate() {
  EACubeAnimation()

  clippedEACubeAnimation()

  task10Animation()

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

// Task 6

const task6Folder = gui.addFolder('Task 6')

const task6Options = {
  showTask_6: false,
  rotationSpeed: 0.03,
  rotationDirection: 1,
  toggleAnimation: toggleRotation,
}

task6Folder
  .add(task6Options, 'showTask_6')
  .name('Show task 6')
  .onChange((isShown) => {
    if (isShown) {
      scene.add(egorovAgencyCube.scene)
    } else {
      scene.remove(egorovAgencyCube.scene)
    }
  })

task6Folder.add(task6Options, 'toggleAnimation').name('Run/Stop rotation')

task6Folder
  .add(task6Options, 'rotationSpeed', 0.001, 0.1)
  .name('Rotation speed')

function toggleRotation() {
  if (task6Options.rotationDirection !== 0) {
    task6Options.rotationDirection = 0
  } else {
    task6Options.rotationDirection = 1
  }
}

function EACubeAnimation() {
  if (egorovAgencyCube && task6Options.showTask_6) {
    egorovAgencyCube.scene.rotation.y +=
      task6Options.rotationSpeed * task6Options.rotationDirection
  }
}

// Task 8

addEventListener('resize', () => {
  const newWidth = window.innerWidth
  const newHeight = window.innerHeight

  camera.aspect = newWidth / newHeight
  camera.updateProjectionMatrix()
  renderer.setSize(newWidth, newHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Task 9

let clippedEACube

loader.load(
  '/models/EgorovAgencyCube.gltf',
  (gltf) => {
    clippedEACube = gltf.scene

    const clippingPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)

    clippedEACube.traverse((child) => {
      if (child.isMesh) {
        child.material.clippingPlanes = [clippingPlane]
      }
    })
  },
  undefined,
  (err) => {
    console.error(err)
  }
)

gui
  .add({ showTask_9: false }, 'showTask_9')
  .name('Show task 9')
  .onChange((isShown) => {
    if (isShown) {
      renderer.localClippingEnabled = true
      camera.position.x = -2
      scene.add(clippedEACube)
    } else {
      renderer.localClippingEnabled = false
      camera.position.x = 0
      scene.remove(clippedEACube)
    }
  })

function clippedEACubeAnimation() {
  if (clippedEACube) {
    clippedEACube.rotation.y += 0.01
  }
}

// Task 10

let task10EACube
let task10Animations
let task10Action
let task10Mixer
let task10ActionIndex = 0

loader.load(
  '/models/EgorovAgencyCube.gltf',
  (gltf) => {
    task10EACube = gltf.scene

    task10Animations = gltf.animations.reverse()
    task10Mixer = new THREE.AnimationMixer(task10EACube)
    task10Mixer.addEventListener('loop', () => {
      playTask10NextAction()
    })
  },
  undefined,
  (err) => {
    console.error(err)
  }
)

const task10Folder = gui.addFolder('Task 10')

const task10Options = {
  showTask_10: false,
  toggleAnimation: toggleButtonsAnimation,
  cubeRotateYAngle: 0,
}

task10Folder
  .add(task10Options, 'showTask_10')
  .name('Show task 10')
  .onChange((isShown) => {
    if (isShown) {
      scene.add(task10EACube)

      // Task 11
      transformControls.attach(task10EACube)
    } else {
      scene.remove(task10EACube)
      // Task 11
      transformControls.detach(task10EACube)
    }
  })

task10Folder.add(task10Options, 'toggleAnimation').name('Start/Stop animation')

function toggleButtonsAnimation() {
  if (task10Action?.isRunning()) {
    task10Action.stop()
  } else {
    playTask10NextAction()
  }
}

function task10Animation() {
  if (task10Mixer) {
    task10Mixer.update(0.01)
  }
}

function playTask10NextAction() {
  if (task10Action) {
    task10Action.stop()
  }
  task10Action = task10Mixer.clipAction(task10Animations[task10ActionIndex])
  task10Action.play()

  task10ActionIndex = (task10ActionIndex + 1) % task10Animations.length
}

// Task 11

const transformControls = new TransformControls(camera, renderer.domElement)
transformControls.setMode('rotate')
transformControls
scene.add(transformControls)

// Task 12

gui
  .add({ showTask_12_13: false }, 'showTask_12_13')
  .name('Show task 12-13')
  .onChange((isShown) => {
    if (isShown) {
      scene.add(textGroup)
      window.addEventListener('click', changeTextColor)
    } else {
      scene.remove(textGroup)
      window.removeEventListener('click', changeTextColor)
    }
  })

const textGroup = new THREE.Group()
const fontLoader = new FontLoader()

fontLoader.load('fonts/gentilis_bold.typeface.json', (font) => {
  const myText = createText('VitalyA', 1, font, -2, 0xffffff)
  myText.forEach((symbol) => textGroup.add(symbol))
})

// Task 13

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

function changeTextColor(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(textGroup.children, true)
  if (intersects.length > 0) {
    const firstObject = intersects[0].object
    firstObject.material.color.set(Math.random() * 0xffffff)
  }
}

function createText(text, letterSpacing, font, startX, color) {
  let currentPosX = startX
  return Array.from(text).map((symbol) => {
    const textGeometry = new TextGeometry(symbol, {
      font: font,
      size: 1,
      height: 0.2,
      curveSegments: 12,
    })
    const textMaterial = new THREE.MeshBasicMaterial({ color: color })
    const text = new THREE.Mesh(textGeometry, textMaterial)
    text.translateX(currentPosX)
    currentPosX += letterSpacing
    return text
  })
}

// Task 1*

scene.background = new THREE.CubeTextureLoader()
  .setPath('cubemap/')
  .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
scene.backgroundBlurriness = 0.07
