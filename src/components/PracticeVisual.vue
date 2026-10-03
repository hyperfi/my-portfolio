<script setup>
defineProps({ kind: { type: String, required: true } })

// Decorative geometric studies, not photographs, maps, or calculated data.
const waves = Array.from({ length: 17 }, (_, row) => {
  const points = Array.from({ length: 101 }, (_, index) => {
    const x = 50 + index * 5
    const envelope = Math.sin(index / 100 * Math.PI) ** 2
    const y = 126 + (row - 8) * 8 + Math.sin(index / 100 * Math.PI * 4 + row * .22) * 36 * envelope
    return `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  })
  return points.join(' ')
})
const contours = Array.from({ length: 12 }, (_, ring) => {
  const points = Array.from({ length: 121 }, (_, index) => {
    const angle = index / 120 * Math.PI * 2
    const radius = 18 + ring * 7 + Math.sin(angle * 3 + ring * .1) * (6 + ring) + Math.cos(angle * 5) * 3
    return `${index ? 'L' : 'M'}${(300 + Math.cos(angle) * radius * 1.8).toFixed(1)} ${(132 + Math.sin(angle) * radius * .75).toFixed(1)}`
  })
  return `${points.join(' ')} Z`
})
const stars = Array.from({ length: 44 }, (_, index) => ({
  x: 48 + (index * 137.5) % 504,
  y: 22 + (index * 73.3) % 212,
  r: index % 9 === 0 ? 2.2 : 1,
  opacity: .24 + (index % 5) * .12
}))
</script>

<template>
  <div class="practice-visual" aria-hidden="true">
    <svg viewBox="0 0 600 264" preserveAspectRatio="xMidYMid meet" focusable="false">
      <g v-if="kind === 'photography'" fill="none">
        <path class="subtle" d="M62 74V42h32m412 0h32v32M62 190v32h32m412 0h32v-32" />
        <g v-for="ring in 15" :key="ring" :opacity=".2 + ring * .035">
          <path :d="`M${300 - (ring * 7 + 12)} 132 a${ring * 7 + 12} ${ring * 7 + 12} 0 1 1 ${ring * 14 + 24} 0`" :transform="`rotate(${ring * 8 - 60} 300 132)`" />
        </g>
        <circle cx="300" cy="132" r="10" class="solid" stroke="none" />
        <path class="subtle" d="M122 132h44m268 0h44" />
      </g>
      <g v-else-if="kind === 'computation'" fill="none">
        <path v-for="(wave, index) in waves" :key="index" :d="wave" :opacity=".25 + (1 - Math.abs(index - 8) / 8) * .65" />
        <circle cx="50" cy="126" r="4" class="solid" stroke="none" />
        <circle cx="550" cy="126" r="4" class="solid" stroke="none" />
      </g>
      <g v-else-if="kind === 'communication'" fill="none">
        <path v-for="line in 7" :key="line" :d="`M60 ${48 + line * 21} C170 ${16 + line * 29}, 210 132, 290 132`" :opacity=".2 + line * .08" />
        <circle cx="300" cy="132" r="36" />
        <circle cx="300" cy="132" r="25" class="subtle" />
        <path d="M336 132h44c16 0 16-38 32-38s16 76 32 76 16-76 32-76 16 38 32 38h32" />
        <circle cx="540" cy="132" r="4" class="solid" stroke="none" />
      </g>
      <g v-else-if="kind === 'outdoors'" fill="none">
        <path v-for="(contour, index) in contours" :key="index" :d="contour" :opacity=".3 + index * .055" />
        <path class="subtle" stroke-dasharray="3 7" d="M120 206C195 185 195 104 252 108s42 53 79 26 47-52 102-66" />
      </g>
      <g v-else fill="none">
        <circle v-for="(star, index) in stars" :key="index" :cx="star.x" :cy="star.y" :r="star.r" :opacity="star.opacity" class="solid" stroke="none" />
        <g transform="rotate(-24 300 132)">
          <ellipse v-for="orbit in 4" :key="orbit" cx="300" cy="132" :rx="54 + orbit * 33" :ry="22 + orbit * 14" :opacity=".15 + orbit * .14" />
          <circle cx="300" cy="132" r="13" class="solid" stroke="none" />
          <circle cx="420" cy="90" r="5" class="solid" stroke="none" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.practice-visual { display: grid; place-items: center; height: 264px; padding: 12px 24px 0; color: var(--accent); overflow: hidden; }
.practice-visual svg { display: block; width: 100%; height: 100%; stroke: currentColor; stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; }
.practice-visual .subtle { stroke: var(--ink); opacity: .25; }
.practice-visual .solid { fill: currentColor; }
@media (max-width: 620px) { .practice-visual { height: 204px; padding: 8px 0 0; } }
</style>
