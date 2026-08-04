<template>
  <div ref="container" class="particle-collision-field" aria-hidden="true">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const container = ref(null)
const canvas = ref(null)
const particles = []
const pointer = { x: 0, y: 0, active: false }

let context
let frameId
let resizeObserver
let width = 0
let height = 0
let pixelRatio = 1
let lastTime = 0

const palette = [
  { fill: 'rgba(98, 218, 232, .22)', stroke: 'rgba(98, 218, 232, .92)' },
  { fill: 'rgba(121, 139, 255, .2)', stroke: 'rgba(139, 154, 255, .9)' },
  { fill: 'rgba(237, 240, 255, .11)', stroke: 'rgba(218, 223, 255, .6)' }
]

const seededRandom = (() => {
  let seed = 8247
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
})()

const createParticle = (index) => {
  const radius = 6 + seededRandom() * 9
  const speed = 26 + seededRandom() * 30
  const angle = seededRandom() * Math.PI * 2

  return {
    x: radius + seededRandom() * Math.max(width - radius * 2, 1),
    y: radius + seededRandom() * Math.max(height - radius * 2, 1),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius,
    mass: radius * radius,
    impact: 0,
    color: palette[index % palette.length]
  }
}

const resetParticles = () => {
  particles.length = 0
  const count = 36

  for (let index = 0; index < count; index += 1) {
    const particle = createParticle(index)
    let attempts = 0

    while (
      attempts < 120
      && particles.some((other) => Math.hypot(other.x - particle.x, other.y - particle.y) < other.radius + particle.radius + 8)
    ) {
      particle.x = particle.radius + seededRandom() * Math.max(width - particle.radius * 2, 1)
      particle.y = particle.radius + seededRandom() * Math.max(height - particle.radius * 2, 1)
      attempts += 1
    }

    particles.push(particle)
  }

  const totalMass = particles.reduce((sum, particle) => sum + particle.mass, 0)
  const momentum = particles.reduce((sum, particle) => ({
    x: sum.x + particle.vx * particle.mass,
    y: sum.y + particle.vy * particle.mass
  }), { x: 0, y: 0 })

  particles.forEach((particle) => {
    particle.vx -= momentum.x / totalMass
    particle.vy -= momentum.y / totalMass
  })
}

const resize = () => {
  if (!container.value || !canvas.value) return

  const rect = container.value.getBoundingClientRect()
  const nextWidth = Math.max(rect.width, 1)
  const nextHeight = Math.max(rect.height, 1)
  const sizeChanged = Math.abs(nextWidth - width) > 2 || Math.abs(nextHeight - height) > 2

  width = nextWidth
  height = nextHeight
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(width * pixelRatio)
  canvas.value.height = Math.round(height * pixelRatio)
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

  if (sizeChanged || particles.length === 0) resetParticles()
  draw()
}

const resolveCollision = (a, b) => {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const minimumDistance = a.radius + b.radius
  const distanceSquared = dx * dx + dy * dy
  if (distanceSquared >= minimumDistance * minimumDistance) return

  const distance = Math.max(Math.sqrt(distanceSquared), .001)
  const normalX = dx / distance
  const normalY = dy / distance
  const inverseMassA = 1 / a.mass
  const inverseMassB = 1 / b.mass
  const inverseMassTotal = inverseMassA + inverseMassB
  const overlap = minimumDistance - distance

  a.x -= normalX * overlap * (inverseMassA / inverseMassTotal)
  a.y -= normalY * overlap * (inverseMassA / inverseMassTotal)
  b.x += normalX * overlap * (inverseMassB / inverseMassTotal)
  b.y += normalY * overlap * (inverseMassB / inverseMassTotal)

  const relativeX = b.vx - a.vx
  const relativeY = b.vy - a.vy
  const velocityAlongNormal = relativeX * normalX + relativeY * normalY
  if (velocityAlongNormal >= 0) return

  const impulse = -(2 * velocityAlongNormal) / inverseMassTotal
  a.vx -= impulse * normalX * inverseMassA
  a.vy -= impulse * normalY * inverseMassA
  b.vx += impulse * normalX * inverseMassB
  b.vy += impulse * normalY * inverseMassB
  a.impact = 1
  b.impact = 1
}

const update = (deltaTime) => {
  particles.forEach((particle) => {
    if (pointer.active) {
      const dx = particle.x - pointer.x
      const dy = particle.y - pointer.y
      const distanceSquared = dx * dx + dy * dy
      if (distanceSquared < 11000 && distanceSquared > 4) {
        const force = (1 - Math.sqrt(distanceSquared) / 105) * 22 * deltaTime
        particle.vx += (dx / Math.sqrt(distanceSquared)) * force
        particle.vy += (dy / Math.sqrt(distanceSquared)) * force
      }
    }

    particle.x += particle.vx * deltaTime
    particle.y += particle.vy * deltaTime
    particle.impact = Math.max(0, particle.impact - deltaTime * 2.4)

    if (particle.x + particle.radius > width) {
      particle.x = width - particle.radius
      particle.vx = -Math.abs(particle.vx)
      particle.impact = 1
    } else if (particle.x - particle.radius < 0) {
      particle.x = particle.radius
      particle.vx = Math.abs(particle.vx)
      particle.impact = 1
    }

    if (particle.y + particle.radius > height) {
      particle.y = height - particle.radius
      particle.vy = -Math.abs(particle.vy)
      particle.impact = 1
    } else if (particle.y - particle.radius < 0) {
      particle.y = particle.radius
      particle.vy = Math.abs(particle.vy)
      particle.impact = 1
    }
  })

  for (let a = 0; a < particles.length; a += 1) {
    for (let b = a + 1; b < particles.length; b += 1) resolveCollision(particles[a], particles[b])
  }
}

const draw = () => {
  if (!context) return
  context.clearRect(0, 0, width, height)

  context.save()
  context.strokeStyle = 'rgba(153, 169, 255, .065)'
  context.lineWidth = 1
  const gridSize = 56
  for (let x = gridSize; x < width; x += gridSize) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.stroke()
  }
  for (let y = gridSize; y < height; y += gridSize) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }
  context.restore()

  particles.forEach((particle) => {
    context.beginPath()
    context.moveTo(particle.x, particle.y)
    context.lineTo(particle.x - particle.vx * .28, particle.y - particle.vy * .28)
    context.strokeStyle = particle.color.fill
    context.lineWidth = 1
    context.stroke()

    if (particle.impact > 0) {
      context.beginPath()
      context.arc(particle.x, particle.y, particle.radius + (1 - particle.impact) * 18, 0, Math.PI * 2)
      context.strokeStyle = particle.color.fill
      context.lineWidth = 1
      context.stroke()
    }

    context.beginPath()
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    context.fillStyle = particle.color.fill
    context.fill()
    context.strokeStyle = particle.color.stroke
    context.lineWidth = 1.25
    context.stroke()

    context.beginPath()
    context.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2)
    context.fillStyle = particle.color.stroke
    context.fill()
  })
}

const animate = (time) => {
  const deltaTime = Math.min((time - lastTime) / 1000 || 0, .035)
  lastTime = time
  update(deltaTime)
  draw()
  frameId = requestAnimationFrame(animate)
}

const handlePointerMove = (event) => {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  if (
    event.clientX < rect.left || event.clientX > rect.right
    || event.clientY < rect.top || event.clientY > rect.bottom
  ) {
    pointer.active = false
    return
  }
  pointer.x = event.clientX - rect.left
  pointer.y = event.clientY - rect.top
  pointer.active = true
}

const handlePointerLeave = () => {
  pointer.active = false
}

onMounted(() => {
  if (!canvas.value || !container.value) return
  context = canvas.value.getContext('2d')
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container.value)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerleave', handlePointerLeave)
  resize()

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    frameId = requestAnimationFrame(animate)
  }
})

onBeforeUnmount(() => {
  if (frameId) cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerleave', handlePointerLeave)
})
</script>
