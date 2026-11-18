<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HL from '../lib/hairline/kernel.js'
import photography from '../lib/hairline/photography.js'
import computation from '../lib/hairline/computation.js'
import communication from '../lib/hairline/communication.js'
import outdoors from '../lib/hairline/outdoors.js'
import astronomy from '../lib/hairline/astronomy.js'

const props = defineProps({ kind: { type: String, required: true } })
const definitions = { photography, computation, communication, outdoors, astronomy }
const host = ref(null)
let figure

onMounted(() => {
  const stage = host.value
  HL.inject(stage.getRootNode())
  definitions[props.kind](HL, ({ means, range, mount }) => {
    stage.setAttribute('aria-label', means)
    const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage)
    figure = mount({ stage, svg, read: { textContent: '' } }, range[1])
  })
})

onBeforeUnmount(() => figure?.destroy())
</script>

<template>
  <div class="practice-figure">
    <div ref="host" class="practice-figure__stage" :data-hairline="kind" role="img"></div>
  </div>
</template>

<style scoped>
.practice-figure {
  display: grid;
  place-items: center;
  height: 264px;
  padding: 8px 24px 0;
}

.practice-figure__stage {
  width: min(100%, 320px);
  aspect-ratio: 5 / 4;
  --hairline-plate: var(--surface);
  --hairline-hi: var(--accent);
  --hairline-edge: color-mix(in srgb, var(--accent) 32%, var(--muted-strong));
  --hairline-mid: color-mix(in srgb, var(--accent) 30%, var(--muted));
  --hairline-lo: color-mix(in srgb, var(--accent) 24%, var(--surface));
}

@media (max-width: 620px) {
  .practice-figure { height: 204px; padding: 8px 16px 0; }
  .practice-figure__stage { width: min(100%, 244px); }
}

@media (prefers-reduced-motion: reduce) {
  .practice-figure__stage { pointer-events: none; }
}
</style>
