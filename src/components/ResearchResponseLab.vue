<template>
  <div
    ref="lab"
    class="research-response-lab"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <div class="response-lab-topline" aria-hidden="true">
      <span>Collective response study</span>
      <span class="response-lab-live">Live field</span>
    </div>

    <canvas
      ref="canvas"
      role="img"
      aria-label="An interactive two-dimensional illustration of a deformed nucleus responding to an external field and producing a strength spectrum"
    ></canvas>

    <div class="response-lab-labels" aria-hidden="true">
      <span>Density evolution</span>
      <span>Strength function</span>
    </div>

    <div class="response-lab-footer" aria-hidden="true">
      <span>External field</span>
      <span>Time evolution</span>
      <span>Linear response</span>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const lab = ref(null)
const canvas = ref(null)

let context
let resizeObserver
let themeObserver
let animationFrame
let width = 0
let height = 0
let pointerX = 0
let pointerY = 0
let targetPointerX = 0
let targetPointerY = 0
let reducedMotion = false
let palette

const particles = Array.from({ length: 36 }, (_, index) => {
  const angle = index * 2.399963229728653
  const radius = Math.sqrt((index + 0.55) / 36)
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    type: index % 2
  }
})

const readPalette = () => {
  const styles = getComputedStyle(document.documentElement)
  return {
    accent: styles.getPropertyValue('--accent').trim() || '#304ffe',
    ink: styles.getPropertyValue('--ink').trim() || '#15171a',
    line: styles.getPropertyValue('--line').trim() || 'rgba(21,23,26,.14)',
    muted: styles.getPropertyValue('--muted').trim() || '#686c72',
    surface: styles.getPropertyValue('--surface').trim() || '#fbfaf6'
  }
}

const gaussian = (value, centre, widthValue) => {
  const distance = (value - centre) / widthValue
  return Math.exp(-0.5 * distance * distance)
}

const draw = (timestamp = 0) => {
  if (!context || !width || !height) return

  pointerX += (targetPointerX - pointerX) * 0.045
  pointerY += (targetPointerY - pointerY) * 0.045

  if (!palette) palette = readPalette()
  const time = reducedMotion ? 0.7 : timestamp * 0.001
  const compact = width < 620
  const nucleusX = compact ? width * 0.27 : width * 0.22
  const nucleusY = height * 0.52
  const radiusX = Math.min(width * (compact ? 0.17 : 0.13), height * 0.29)
  const radiusY = radiusX * (0.76 + pointerY * 0.09)
  const spectrumStart = compact ? width * 0.48 : width * 0.43
  const spectrumEnd = width * 0.95
  const spectrumTop = height * 0.22
  const spectrumBase = height * 0.8
  const oscillation = Math.sin(time * 1.35) * radiusX * 0.06

  context.clearRect(0, 0, width, height)

  context.save()
  context.strokeStyle = palette.line
  context.lineWidth = 1
  for (let index = 1; index < 6; index += 1) {
    const gridY = (height / 6) * index
    context.beginPath()
    context.moveTo(0, gridY)
    context.lineTo(width, gridY)
    context.stroke()
  }
  for (let index = 1; index < 12; index += 1) {
    const gridX = (width / 12) * index
    context.beginPath()
    context.moveTo(gridX, 0)
    context.lineTo(gridX, height)
    context.stroke()
  }
  context.restore()

  context.save()
  context.strokeStyle = palette.accent
  context.globalAlpha = 0.28
  context.lineWidth = 1
  for (let ring = 0; ring < 3; ring += 1) {
    const pulseRadius = radiusX * (1.15 + ring * 0.22 + Math.sin(time * 1.1 + ring) * 0.025)
    context.beginPath()
    context.arc(nucleusX - radiusX * 1.42, nucleusY, pulseRadius, -0.62, 0.62)
    context.stroke()
  }
  context.restore()

  context.save()
  context.translate(nucleusX, nucleusY)
  context.rotate(pointerX * 0.08)
  context.strokeStyle = palette.accent
  context.globalAlpha = 0.48
  context.lineWidth = 1.25
  context.beginPath()
  context.ellipse(0, 0, radiusX * 1.08, radiusY * 1.08, 0, 0, Math.PI * 2)
  context.stroke()

  particles.forEach((particle, index) => {
    const typeShift = particle.type ? oscillation : -oscillation
    const breathing = 1 + Math.sin(time * 0.92 + index * 0.17) * 0.012
    const x = particle.x * radiusX * breathing + typeShift
    const y = particle.y * radiusY * breathing
    const particleRadius = Math.max(2, Math.min(4.2, radiusX * 0.035))

    context.beginPath()
    context.fillStyle = particle.type ? palette.accent : palette.ink
    context.globalAlpha = particle.type ? 0.82 : 0.56
    context.arc(x, y, particleRadius, 0, Math.PI * 2)
    context.fill()
  })
  context.restore()

  context.save()
  context.strokeStyle = palette.line
  context.lineWidth = 1
  context.beginPath()
  context.moveTo(spectrumStart, spectrumTop)
  context.lineTo(spectrumStart, spectrumBase)
  context.lineTo(spectrumEnd, spectrumBase)
  context.stroke()

  const points = 110
  const firstPeak = 0.34 + pointerX * 0.025
  const secondPeak = 0.62 - pointerX * 0.02
  const firstAmplitude = 0.62 + Math.sin(time * 0.8) * 0.025
  const secondAmplitude = 0.88 - pointerY * 0.06

  context.beginPath()
  for (let index = 0; index <= points; index += 1) {
    const normalizedX = index / points
    const response =
      gaussian(normalizedX, firstPeak, 0.075) * firstAmplitude +
      gaussian(normalizedX, secondPeak, 0.105) * secondAmplitude +
      gaussian(normalizedX, 0.8, 0.055) * 0.16
    const x = spectrumStart + normalizedX * (spectrumEnd - spectrumStart)
    const y = spectrumBase - response * (spectrumBase - spectrumTop) * 0.83
    if (index === 0) context.moveTo(x, y)
    else context.lineTo(x, y)
  }
  context.strokeStyle = palette.accent
  context.lineWidth = compact ? 1.6 : 2
  context.globalAlpha = 0.92
  context.stroke()

  context.lineTo(spectrumEnd, spectrumBase)
  context.lineTo(spectrumStart, spectrumBase)
  context.closePath()
  const gradient = context.createLinearGradient(0, spectrumTop, 0, spectrumBase)
  gradient.addColorStop(0, `${palette.accent}2f`)
  gradient.addColorStop(1, `${palette.accent}00`)
  context.fillStyle = gradient
  context.fill()

  const scanPosition = (Math.sin(time * 0.42) * 0.5 + 0.5) * (spectrumEnd - spectrumStart)
  context.beginPath()
  context.moveTo(spectrumStart + scanPosition, spectrumTop)
  context.lineTo(spectrumStart + scanPosition, spectrumBase)
  context.strokeStyle = palette.muted
  context.globalAlpha = 0.22
  context.lineWidth = 1
  context.stroke()
  context.restore()

  if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
}

const resize = () => {
  if (!lab.value || !canvas.value) return
  const rect = lab.value.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = Math.max(1, rect.width)
  height = Math.max(1, rect.height)
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`
  context = canvas.value.getContext('2d')
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  if (reducedMotion) draw()
}

const handlePointerMove = (event) => {
  if (!lab.value) return
  const rect = lab.value.getBoundingClientRect()
  targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  targetPointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  if (reducedMotion) {
    pointerX = targetPointerX
    pointerY = targetPointerY
    draw()
  }
}

const handlePointerLeave = () => {
  targetPointerX = 0
  targetPointerY = 0
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  palette = readPalette()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(lab.value)
  themeObserver = new MutationObserver(() => {
    palette = readPalette()
    if (reducedMotion) draw()
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  resize()
  if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
  cancelAnimationFrame(animationFrame)
})
</script>
