<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PracticeVisual from './PracticeVisual.vue'

const props = defineProps({ practices: { type: Array, required: true } })
const activeIndex = ref(0)
const tabButtons = ref([])
const orientation = ref('horizontal')
let layoutQuery
const updateOrientation = () => { orientation.value = layoutQuery.matches ? 'horizontal' : 'vertical' }
onMounted(() => {
  layoutQuery = window.matchMedia('(max-width: 860px)')
  updateOrientation()
  layoutQuery.addEventListener('change', updateOrientation)
})
onBeforeUnmount(() => layoutQuery?.removeEventListener('change', updateOrientation))

function navigateTabs(event, index) {
  const last = props.practices.length - 1
  const next = {
    ArrowDown: (index + 1) % props.practices.length,
    ArrowRight: (index + 1) % props.practices.length,
    ArrowUp: (index + last) % props.practices.length,
    ArrowLeft: (index + last) % props.practices.length,
    Home: 0,
    End: last
  }[event.key]
  if (next === undefined) return
  event.preventDefault()
  activeIndex.value = next
  tabButtons.value[next]?.focus()
}
</script>

<template>
  <div class="practice-guide">
    <div class="practice-guide__index" role="tablist" :aria-orientation="orientation" aria-label="Explore my creative interests">
      <button
        v-for="(practice, index) in practices"
        :id="`interest-${practice.key}`"
        :key="practice.key"
        :ref="element => { tabButtons[index] = element }"
        type="button"
        role="tab"
        :aria-selected="activeIndex === index"
        :aria-controls="`interest-panel-${practice.key}`"
        :tabindex="activeIndex === index ? 0 : -1"
        @click="activeIndex = index"
        @keydown="navigateTabs($event, index)"
      >
        <span>{{ practice.label }}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
      </button>
      <p>Different ways of looking.<br>The same curiosity.</p>
    </div>

    <div class="practice-guide__stage">
        <section
          v-for="(practice, index) in practices"
          :id="`interest-panel-${practice.key}`"
          :key="practice.key"
          :hidden="activeIndex !== index"
          class="practice-guide__panel"
          role="tabpanel"
          :aria-labelledby="`interest-${practice.key}`"
          tabindex="0"
        >
          <PracticeVisual :kind="practice.key" />
          <div class="practice-guide__copy">
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
            <ul class="practice-guide__tags" aria-label="Areas of interest">
              <li v-for="tag in practice.tags" :key="tag">{{ tag }}</li>
            </ul>
            <a v-if="practice.href" :href="practice.href" target="_blank" rel="noopener noreferrer">
              {{ practice.linkLabel }}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg>
            </a>
          </div>
        </section>
    </div>
  </div>
</template>

<style scoped>
.practice-guide { display: grid; grid-template-columns: minmax(240px, .8fr) minmax(0, 2fr); border-block: 1px solid var(--line-strong); }
.practice-guide__index { display: flex; flex-direction: column; align-items: stretch; padding: 32px 32px 32px 0; }
.practice-guide__index button { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; padding: 16px 0; border: 0; border-bottom: 1px solid var(--line); background: transparent; color: var(--muted-strong); text-align: left; font-size: 1rem; line-height: 1.4; cursor: pointer; transition: color 180ms ease; }
.practice-guide__index button:hover { color: var(--accent); }
.practice-guide__index button[aria-selected='true'] { color: var(--ink); font-weight: 700; }
.practice-guide__index button svg { flex: 0 0 24px; width: 24px; height: 24px; opacity: 0; transform: translateX(-4px); transition: opacity 180ms ease, transform 180ms ease; }
.practice-guide__index button[aria-selected='true'] svg { opacity: 1; transform: none; color: var(--accent); }
.practice-guide svg { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.practice-guide__index > p { margin: auto 0 0; padding-top: 40px; color: var(--muted); font-size: .85rem; line-height: 1.7; }
.practice-guide__stage { min-width: 0; border-left: 1px solid var(--line); background: var(--surface); }
.practice-guide__panel { min-height: 568px; }
.practice-guide__copy { padding: 8px 40px 40px; }
.practice-guide__copy h3 { margin: 0 0 16px; max-width: 22ch; font-family: 'Newsreader', Georgia, serif; font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 450; line-height: 1.12; letter-spacing: -.025em; text-wrap: balance; }
.practice-guide__copy > p { max-width: 65ch; margin: 0; color: var(--muted-strong); font-size: .98rem; line-height: 1.75; }
.practice-guide__tags { display: flex; flex-wrap: wrap; gap: 8px 24px; margin: 24px 0 0; padding: 0; list-style: none; color: var(--muted); font-size: .78rem; }
.practice-guide__tags li { display: flex; align-items: center; gap: 8px; }
.practice-guide__tags li::before { content: ''; width: 4px; height: 4px; background: var(--accent); border-radius: 50%; }
.practice-guide__copy a { display: inline-flex; align-items: center; gap: 12px; min-height: 44px; margin-top: 20px; color: var(--accent); font-size: .85rem; font-weight: 600; text-decoration: underline; text-underline-offset: 6px; text-decoration-color: transparent; transition: text-decoration-color 180ms ease; }
.practice-guide__copy a:hover { text-decoration-color: currentColor; }
.practice-guide__copy a svg { width: 18px; height: 18px; }
@media (max-width: 860px) {
  .practice-guide { grid-template-columns: 1fr; }
  .practice-guide__index { flex-direction: row; flex-wrap: wrap; gap: 8px; padding: 20px 0; }
  .practice-guide__index button { justify-content: center; min-height: 44px; padding: 10px 14px; border: 1px solid var(--line); font-size: .85rem; }
  .practice-guide__index button[aria-selected='true'] { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }
  .practice-guide__index button svg, .practice-guide__index > p { display: none; }
  .practice-guide__stage { border-left: 0; border-top: 1px solid var(--line); }
  .practice-guide__panel { min-height: 540px; }
}
@media (max-width: 620px) {
  .practice-guide__copy { padding: 4px 24px 32px; }
  .practice-guide__copy h3 { font-size: 2rem; }
  .practice-guide__index button { padding-inline: 12px; font-size: .8rem; }
  .practice-guide__panel { min-height: 560px; }
}
@media (prefers-reduced-motion: reduce) {
  .practice-guide * { transition: none; }
}
</style>
