<template>
  <div ref="container" class="nuclear-field" aria-hidden="true"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let renderer
let scene
let camera
let fieldGroup
let frameId
let resizeObserver
let pointerX = 0
let pointerY = 0

const createOrbit = (radius, rotation, opacity) => {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.48, 0, Math.PI * 2)
  const points = curve.getPoints(160).map((point) => new THREE.Vector3(point.x, point.y, 0))
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color: 0x8da2ff,
    transparent: true,
    opacity
  })
  const line = new THREE.LineLoop(geometry, material)
  line.rotation.set(...rotation)
  return line
}

const seededRandom = (() => {
  let seed = 8247
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
})()

const handlePointer = (event) => {
  if (!container.value) return
  const bounds = container.value.getBoundingClientRect()
  pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.22
  pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.16
}

const resize = () => {
  if (!container.value || !renderer || !camera) return
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  renderer.setSize(width, height, false)
  camera.aspect = width / Math.max(height, 1)
  camera.updateProjectionMatrix()
}

onMounted(() => {
  if (!container.value) return

  try {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 8.6)

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.value.appendChild(renderer.domElement)

    fieldGroup = new THREE.Group()
    fieldGroup.rotation.x = -0.12
    scene.add(fieldGroup)

    const particleCount = 360
    const positions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 1.2 + Math.pow(seededRandom(), 0.72) * 2.45
      const theta = seededRandom() * Math.PI * 2
      const phi = Math.acos(2 * seededRandom() - 1)
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72
      positions[index * 3 + 2] = radius * Math.cos(phi)
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xdbe2ff,
      size: 0.027,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true
    })
    fieldGroup.add(new THREE.Points(particlesGeometry, particlesMaterial))

    const coreGeometry = new THREE.IcosahedronGeometry(1.18, 2)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x5c70ff,
      wireframe: true,
      transparent: true,
      opacity: 0.52
    })
    fieldGroup.add(new THREE.Mesh(coreGeometry, coreMaterial))

    fieldGroup.add(createOrbit(2.25, [0.12, 0.18, 0.52], 0.42))
    fieldGroup.add(createOrbit(2.62, [1.18, 0.35, -0.28], 0.26))
    fieldGroup.add(createOrbit(3.04, [0.58, 1.08, 0.18], 0.16))

    const electronGeometry = new THREE.SphereGeometry(0.075, 18, 18)
    const electronMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const electron = new THREE.Mesh(electronGeometry, electronMaterial)
    electron.position.set(2.1, 0.56, 0.4)
    fieldGroup.add(electron)

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container.value)
    resize()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clock = new THREE.Clock()

    const render = () => {
      const elapsed = clock.getElapsedTime()
      fieldGroup.rotation.y += (pointerX - fieldGroup.rotation.y) * 0.025
      fieldGroup.rotation.x += (-0.12 - pointerY - fieldGroup.rotation.x) * 0.025
      fieldGroup.rotation.z = Math.sin(elapsed * 0.16) * 0.045
      renderer.render(scene, camera)

      if (!reduceMotion) frameId = requestAnimationFrame(render)
    }

    container.value.addEventListener('pointermove', handlePointer, { passive: true })
    render()
  } catch {
    container.value.classList.add('webgl-fallback')
  }
})

onBeforeUnmount(() => {
  if (frameId) cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  container.value?.removeEventListener('pointermove', handlePointer)
  scene?.traverse((object) => {
    object.geometry?.dispose()
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
    else object.material?.dispose()
  })
  renderer?.dispose()
  renderer?.domElement?.remove()
})
</script>
